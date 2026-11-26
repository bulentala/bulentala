import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "kaynak-x");
const OUT_DIR = path.join(ROOT, "kaynak-md");
const OLLAMA_URL = "http://127.0.0.1:11434/api/generate";
const VISION_MODEL = "gemma4:e4b";
const FORCE = process.argv.includes("--force");

const pagesArgIdx = process.argv.indexOf("--pages");
const pageRange = pagesArgIdx !== -1 ? process.argv[pagesArgIdx + 1] : null;
const [startPage, endPage] = pageRange ? pageRange.split("-").map(Number) : [null, null];

fs.mkdirSync(OUT_DIR, { recursive: true });

function buildFrontmatter(meta) {
  const lines = ["---"];
  for (const [k, v] of Object.entries(meta)) {
    lines.push(`${k}: ${JSON.stringify(v)}`);
  }
  lines.push("---", "");
  return lines.join("\n");
}

async function extractImageWithOllama(filePath) {
  const base64Image = fs.readFileSync(filePath).toString("base64");
  const res = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: VISION_MODEL,
      prompt:
        "Bu görseldeki tüm metni, dipnotları veya yazıt transkripsiyonunu eksiksiz biçimde temiz Markdown formatında yaz. Görselde olmayan hiçbir yorum veya ek bilgi ekleme.",
      images: [base64Image],
      stream: false,
      options: { temperature: 0.1 },
    }),
  });

  if (!res.ok) {
    throw new Error(`Ollama hatasi (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return data.response.trim();
}

async function ocrScannedPdf(pdfPath) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "likya-ocr-"));
  try {
    const args = ["-png", "-r", "150"];
    if (startPage) args.push("-f", String(startPage));
    if (endPage) args.push("-l", String(endPage));
    args.push(pdfPath, path.join(tmpDir, "page"));

    execFileSync("pdftoppm", args);

    const pageFiles = fs
      .readdirSync(tmpDir)
      .filter((f) => f.endsWith(".png"))
      .sort();

    const chunks = [];
    for (let i = 0; i < pageFiles.length; i++) {
      const pageNum = (startPage || 1) + i;
      console.log(`  OCR işleniyor (${i + 1}/${pageFiles.length}) -> Sayfa ${pageNum}...`);
      const pageText = await extractImageWithOllama(path.join(tmpDir, pageFiles[i]));
      chunks.push(`## Sayfa ${pageNum}\n\n${pageText}`);
    }
    return chunks.join("\n\n");
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

async function run() {
  const entries = fs.readdirSync(SRC_DIR, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile() && !e.name.startsWith("."));

  if (files.length === 0) {
    console.log("kaynak-x klasöründe işlenecek dosya bulunamadı.");
    return;
  }

  for (const entry of files) {
    const srcPath = path.join(SRC_DIR, entry.name);
    const ext = path.extname(entry.name).toLowerCase();
    const baseName = path.basename(entry.name, ext);
    const outPath = path.join(OUT_DIR, `${baseName}.md`);

    if (!FORCE && fs.existsSync(outPath)) {
      const srcStat = fs.statSync(srcPath);
      const outStat = fs.statSync(outPath);
      const existingSize = outStat.size;
      if (outStat.mtimeMs >= srcStat.mtimeMs && existingSize > 300) {
        console.log(`Atlandı (güncel): ${baseName}.md`);
        continue;
      }
    }

    const today = new Date().toISOString().slice(0, 10);

    if (ext === ".pdf") {
      console.log(`PDF kontrol ediliyor: ${entry.name}...`);
      const pdfArgs = ["-layout"];
      if (startPage) pdfArgs.push("-f", String(startPage));
      if (endPage) pdfArgs.push("-l", String(endPage));
      pdfArgs.push(srcPath, "-");

      const rawText = execFileSync("pdftotext", pdfArgs, {
        encoding: "utf8",
        maxBuffer: 1024 * 1024 * 100,
      }).trim();

      if (rawText.length >= 100) {
        const header = buildFrontmatter({
          kaynak_dosya: entry.name,
          kaynak_turu: "pdf-metin",
          donusum_tarihi: today,
          durum: "ham-metin",
        });
        fs.writeFileSync(outPath, `${header}${rawText}\n`, "utf8");
        console.log(`Tamamlandı (metin katmanı): kaynak-md/${baseName}.md`);
      } else {
        console.log(`Metin katmanı boş -> Tarama PDF OCR (${VISION_MODEL}) başlatılıyor...`);
        const ocrText = await ocrScannedPdf(srcPath);
        const header = buildFrontmatter({
          kaynak_dosya: entry.name,
          kaynak_turu: "pdf-tarama-ocr",
          model: VISION_MODEL,
          sayfa_araligi: pageRange || "tumu",
          donusum_tarihi: today,
          durum: "ham-metin",
        });
        fs.writeFileSync(outPath, `${header}${ocrText}\n`, "utf8");
        console.log(`Tamamlandı (OCR): kaynak-md/${baseName}.md`);
      }
    } else if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      console.log(`Görsel OCR (Ollama ${VISION_MODEL}) işleniyor: ${entry.name}...`);
      const text = await extractImageWithOllama(srcPath);
      const header = buildFrontmatter({
        kaynak_dosya: entry.name,
        kaynak_turu: "gorsel-ocr",
        model: VISION_MODEL,
        donusum_tarihi: today,
        durum: "ham-metin",
      });
      fs.writeFileSync(outPath, `${header}${text}\n`, "utf8");
      console.log(`Tamamlandı: kaynak-md/${baseName}.md`);
    } else if ([".md", ".txt"].includes(ext)) {
      console.log(`Metin aktarılıyor: ${entry.name}...`);
      const raw = fs.readFileSync(srcPath, "utf8");
      if (raw.startsWith("---\n")) {
        fs.writeFileSync(outPath, raw, "utf8");
      } else {
        const header = buildFrontmatter({
          kaynak_dosya: entry.name,
          kaynak_turu: ext.slice(1),
          donusum_tarihi: today,
          durum: "ham-metin",
        });
        fs.writeFileSync(outPath, `${header}${raw.trim()}\n`, "utf8");
      }
      console.log(`Tamamlandı: kaynak-md/${baseName}.md`);
    } else {
      console.log(`Desteklenmeyen format atlandı: ${entry.name}`);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
