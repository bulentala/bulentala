Dosya Yolu: app\mdconvert\actions.ts

```ts
"use server";

import fs from "fs";
import path from "path";

// ==========================================
// ⚙️ KONFİGÜRASYON (AYARLAR)
// ==========================================

// Sadece bu uzantılara sahip dosyalar okunacak
const ALLOWED_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".mdx", ".css"];

// Taranmayacak, es geçilecek KÖK klasörler (Performans için çok önemli)
const IGNORED_FOLDERS = ["node_modules", ".next", ".git", "mdcodes", "public"];

// Taranmayacak, es geçilecek özel dosyalar (Güvenlik için .env eklendi)
const IGNORED_FILES = [
  "package-lock.json",
  "pnpm-lock.yaml",
  ".DS_Store",
  "README.md",
  "AGENTS.md",
  ".env",
  ".env.local"
];

// ==========================================

export async function convertFilesToMd() {
  const rootDir = process.cwd(); // Projenin ana dizini
  const outputDir = path.join(rootDir, "mdcodes"); // Çıktı klasörü

  // mdcodes klasörü yoksa oluştur
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  let processedCount = 0;

  // Klasörleri iç içe okuyan (recursive) fonksiyon
  function scanDirectory(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      const relativePath = path.relative(rootDir, fullPath);

      if (entry.isDirectory()) {
        // Klasör yasaklı listesinde yoksa içine gir
        if (!IGNORED_FOLDERS.includes(entry.name)) {
          scanDirectory(fullPath);
        }
      } else {
        const ext = path.extname(entry.name);

        // Dosya uzantısı izinlilerdeyse ve dosya adı yasaklılarda değilse işlemi yap
        if (
          ALLOWED_EXTENSIONS.includes(ext) &&
          !IGNORED_FILES.includes(entry.name)
        ) {
          // Örn: "app/blog/page.tsx" -> "app-blog-page.tsx.md"
          // path.sep işletim sistemine göre / veya \ karakterlerini bulur
          const safeName = relativePath.split(path.sep).join("-") + ".md";
          const outputPath = path.join(outputDir, safeName);

          const content = fs.readFileSync(fullPath, "utf8");

          // Yapay zekanın daha iyi anlaması için içeriği kod bloğu (```) içine alıyoruz
          const mdContent = `Dosya Yolu: ${relativePath}\n\n\`\`\`${ext.replace('.', '')}\n${content}\n\`\`\``;

          fs.writeFileSync(outputPath, mdContent, "utf8");
          processedCount++;
        }
      }
    }
  }

  try {
    scanDirectory(rootDir);
    return {
      success: true,
      message: `İşlem başarılı! Toplam ${processedCount} dosya "mdcodes" klasörüne dönüştürüldü.`
    };
  } catch (error: unknown) {
    // 1. error'un bir Error objesi olup olmadığını kontrol ediyoruz
    if (error instanceof Error) {
      return { success: false, message: `Hata oluştu: ${error.message}` };
    }
    // 2. Eğer JS'de nadiren de olsa throw "bir string mesaj" gibi bir durum varsa yedek senaryo
    return { success: false, message: "Bilinmeyen bir hata oluştu." };
  }
}

```