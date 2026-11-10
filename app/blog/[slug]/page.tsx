import { Suspense } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { CustomMDXComponents } from '@/components/mdx-components';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">{post.frontmatter.title}</h1>
        <p className="text-gray-500">{post.frontmatter.date}</p>
      </header>

      <div className="prose prose-blue max-w-none">
        <MDXRemote
          source={post.content}
          components={CustomMDXComponents}
        />
      </div>
    </>
  );
}

export default function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <Suspense fallback={<div className="text-center py-10">İçerik yükleniyor...</div>}>
        <Post params={params} />
      </Suspense>
    </article>
  );
}
