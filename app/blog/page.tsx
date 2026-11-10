import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
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
    </div>
  );
}
