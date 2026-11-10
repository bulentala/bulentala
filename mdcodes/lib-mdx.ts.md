Dosya Yolu: lib\mdx.ts

```ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export async function getAllPosts() {
  // Klasör yoksa hata vermemesi için basit bir kontrol
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir);

  return files
    // 1. Hem .md hem de .mdx dosyalarını filtrele
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      return {
        // 2. Regex ile .md veya .mdx uzantısını temizle
        slug: file.replace(/\.mdx?$/, ''),
        title: data.title,
        date: data.date,
        description: data.description,
      };
    })
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export async function getPostBySlug(slug: string) {
  try {
    // 3. Dosyanın .md mi yoksa .mdx mi olduğunu tespit et
    const mdPath = path.join(contentDir, `${slug}.md`);
    const mdxPath = path.join(contentDir, `${slug}.mdx`);

    let filePath = '';

    if (fs.existsSync(mdPath)) {
      filePath = mdPath;
    } else if (fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    } else {
      return null; // Dosya bulunamadı
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      frontmatter: data,
      content,
    };
  } catch  {
    return null;
  }
}

```