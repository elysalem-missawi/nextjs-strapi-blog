import { notFound } from "next/navigation";

// دالة جلب البيانات من Strapi باستخدام الـ slug
async function getPost(slug: string) {
  try {
    const res = await fetch(
      `http://localhost:1337/api/posts?filters[slug][$eq]=${slug}&populate=*`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// ⚠️ لاحظ إضافة export default هنا
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  // إذا لم يتم العثور على المقال
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-300">
        <p className="text-xl font-semibold">المقال غير موجود أو لم يتم نشره بعد.</p>
      </div>
    );
  }

  const { title, content, publishedAt } = post.attributes || post;

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-slate-800 dark:text-slate-100" dir="rtl">
      <article className="space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{title}</h1>
        
        {publishedAt && (
          <p className="text-sm text-sky-500 font-medium">
            {new Date(publishedAt).toLocaleDateString("ar-EG", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}

        <hr className="border-slate-200 dark:border-slate-800 my-6" />

        <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed whitespace-pre-line">
          {content}
        </div>
      </article>
    </main>
  );
}