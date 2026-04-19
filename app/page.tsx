// app/page.tsx

// 🟢 Bu bir Server Component olduğu için 'use client' ifadesine gerek yok
export default async function HomePage() {
  // 1. JSONPlaceholder'dan gönderileri çek
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json(); // JSON verisini al

  // 2. Header kısmı (Tasarımınızın üst kısmı)
  return (
    <>
      <div className="grid grid-cols-[auto_1fr_auto] items-center uppercase text-xs pt-8">
        <div className="col-start-1">Son Blog Yazıları</div>
        <div className="col-start-3">Bütün yazılar</div>
      </div>

      {/* 3. Gönderileri listele */}
      {posts.map((post: any) => (
        <article key={post.id} className="pt-8">
          <div className="text-xs">Tarih: 2025</div> {/* Sabit tarih örneği */}
          <div className="text-black uppercase">{post.title}</div>
          <div className="text-gray-600">{post.body}</div>
        </article>
      ))}
    </>
  );
}
