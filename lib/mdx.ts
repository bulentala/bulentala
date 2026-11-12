import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const contentDir = path.join(process.cwd(), 'content');

// Zod Şeması (Tip güvenliği ve doğrulama için)
const FrontmatterSchema = z.object({
  title: z.string().min(1, "Başlık (title) alanı zorunludur."),
  date: z.string().min(1, "Tarih (date) alanı zorunludur."),
  description: z.string().optional(),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

/**
 * 1. BELLEK OPTİMİZASYONU
 * Dosyanın tamamını parse etmek yerine, Regex ile sadece "---" arasındaki
 * YAML bloğunu kesip alır. Makale sayısı arttığında (örn. 500+) gray-matter'ın
 * binlerce kelimelik gövdeleri işlemesini engelleyerek CPU ve bellek tasarrufu sağlar.
 */
function extractFrontmatter(fileContent: string) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (match) {
    // Sadece yakalanan küçük bloğu gray-matter'a veriyoruz
    return matter(match[0]).data;
  }
  return {};
}

export async function getAllPosts() {
  try {
    const files = await fs.readdir(contentDir); //

    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith('.md') || file.endsWith('.mdx')) //[cite: 13]
        .map(async (file) => {
          try {
            const filePath = path.join(contentDir, file);
            const fileContent = await fs.readFile(filePath, 'utf8');

            // Bellek optimizasyonlu hafif ayrıştırma kullanılıyor
            const rawData = extractFrontmatter(fileContent);
            const parsedData = FrontmatterSchema.safeParse(rawData);

            if (!parsedData.success) {
              // 2. SESSİZCE YUTULAN HATALARIN GİDERİLMESİ: Dosya bazlı detaylı hata logu
              console.error(`[Zod Hatası] "${file}" dosyasının frontmatter verisi eksik/hatalı:`, parsedData.error.format());
              return null;
            }

            return {
              slug: file.replace(/\.mdx?$/, ''), //[cite: 13]
              title: parsedData.data.title,
              date: parsedData.data.date,
              description: parsedData.data.description,
            };
          } catch (fileError) {
            console.error(`[Dosya Okuma Hatası] "${file}" işlenirken bir sorun oluştu:`, fileError);
            return null;
          }
        })
    );

    // Hatalı (null) dönen makaleleri listeden filtrele ve tarihe göre sırala
    return posts
      .filter((post): post is NonNullable<typeof post> => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); //[cite: 13]
  } catch (error) {
    // Ana dizin okunamadığında derleme aşamasında sorunu net görmek için logla
    console.error("[Kritik Hata] getAllPosts içerik dizinini okuyamadı:", error);
    return []; //[cite: 13]
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const mdPath = path.join(contentDir, `${slug}.md`); //[cite: 13]
    const mdxPath = path.join(contentDir, `${slug}.mdx`); //[cite: 13]

    let filePath = '';

    try {
      await fs.access(mdPath); //[cite: 13]
      filePath = mdPath;
    } catch {
      try {
        await fs.access(mdxPath); //[cite: 13]
        filePath = mdxPath;
      } catch {
        console.warn(`[Uyarı] "${slug}" için geçerli bir .md veya .mdx dosyası bulunamadı.`);
        return null; //[cite: 13]
      }
    }

    const fileContent = await fs.readFile(filePath, 'utf8'); //[cite: 13]

    // Tekil yazıda gövdeye (content) ihtiyacımız olduğu için normal gray-matter kullanımı devam ediyor
    const { data, content } = matter(fileContent); //[cite: 13]

    const parsedData = FrontmatterSchema.safeParse(data);

    if (!parsedData.success) {
      console.error(`[Zod Hatası] "${slug}" frontmatter verisi geçersiz:`, parsedData.error.format());
      return null;
    }

    return {
      frontmatter: parsedData.data,
      content, //[cite: 13]
    };
  } catch (error) {
    console.error(`[Kritik Hata] getPostBySlug "${slug}" okunurken başarısız oldu:`, error);
    return null; //[cite: 13]
  }
}
