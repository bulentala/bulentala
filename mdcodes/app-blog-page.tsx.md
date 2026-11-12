Dosya Yolu: app\blog\page.tsx

```tsx
import Link from 'next/link';
import { Suspense } from 'react';
import { getAllPosts } from '@/lib/mdx';

// 1. Veri çekme ve listeleme işlemini ayrı bir asenkron bileşene (Server Component) ayırıyoruz
async function PostList() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group block p-6 border rounded-lg hover:border-blue-500 transition-colors"
        >
          <h2 className="text-2xl font-semibold group-hover:text-blue-600">
            {post.title}
          </h2>
          <p className="text-gray-500 text-sm mt-2">{post.date}</p>
          <p className="text-gray-700 mt-3">{post.description}</p>
        </Link>
      ))}
    </div>
  );
}

// 2. Ana sayfa bileşeni (Prerender aşamasında bloklanmaz)
export default function BlogIndex() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {/* 3. Suspense ile Next.js'e verinin asenkron yükleneceğini bildiriyoruz */}
      <Suspense fallback={<div className="py-10 text-gray-500">Yazılar yükleniyor...</div>}>
        <PostList />
      </Suspense>
    </div>
  );
}

```