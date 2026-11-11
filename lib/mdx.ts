import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export async function getAllPosts() {
  try {
    const files = await fs.readdir(contentDir);

    // Asenkron dosya okumaları eş zamanlı (concurrent) yapmak için Promise.all kullanımı
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
        .map(async (file) => {
          const filePath = path.join(contentDir, file);
          const fileContent = await fs.readFile(filePath, 'utf8');
          const { data } = matter(fileContent);

          return {
            slug: file.replace(/\.mdx?$/, ''),
            title: data.title,
            date: data.date,
            description: data.description,
          };
        })
    );
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const mdPath = path.join(contentDir, `${slug}.md`);
    const mdxPath = path.join(contentDir, `${slug}.mdx`);

    let filePath = '';

    // Asenkron dosya varlık kontrolü
    try {
      await fs.access(mdPath);
      filePath = mdPath;
    } catch {
      try {
        await fs.access(mdxPath);
        filePath = mdxPath;
      } catch {
        return null; // İki dosya da bulunamadı
      }
    }

    // Asenkron okuma
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      frontmatter: data,
      content,
    };
  } catch {
    return null;
  }
}
