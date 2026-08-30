import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchStrapi, STRAPI_URL } from "../../lib/strapi";

// دالة تحويل نصوص Strapi Blocks / Rich Text إلى نص عادي منسق
function renderContent(content: any) {
  if (!content) return "";
  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (block.children && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text).join("");
        }
        return "";
      })
      .join("\n\n");
  }

  return JSON.stringify(content);
}

// دالة جلب المقالة بجميع الطرق الممكنة (slug / documentId / ID)
async function getPost(slugOrId: string) {
  try {
    // 1. التفتيش برمز slug
    let res = await fetchStrapi(`/posts?filters[slug][$eq]=${slugOrId}&populate=*`);
    let item = res?.data?.[0];

    // 2. التفتيش عبر فلتر documentId
    if (!item) {
      res = await fetchStrapi(`/posts?filters[documentId][$eq]=${slugOrId}&populate=*`);
      item = res?.data?.[0];
    }

    // 3. التفتيش المباشر برمز المستند (Strapi v5 API Direct Route)
    if (!item) {
      res = await fetchStrapi(`/posts/${slugOrId}?populate=*`);
      item = res?.data;
    }

    if (!item) return null;

    const attributes = item.attributes || item;

    return {
      id: item.id,
      documentId: item.documentId,
      title: attributes.title,
      slug: attributes.slug,
      content: attributes.content,
      publishedAt: attributes.publishedAt,
      cover: attributes.cover?.data?.attributes || attributes.cover,
    };
  } catch (error) {
    console.error("Error fetching post details:", error);
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  // إذا تعثر العثور على المقالة
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 text-slate-800 dark:text-slate-200" dir="rtl">
        <p className="text-2xl font-bold">المقال غير موجود أو لم يتم نشره بعد.</p>
        <Link href="/blog" className="text-sky-500 hover:underline font-semibold">
          ← العودة إلى قائمة المقالات
        </Link>
      </div>
    );
  }

  const imageUrl = post.cover?.url ? `${STRAPI_URL}${post.cover.url}` : null;
  const formattedContent = renderContent(post.content);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-slate-800 dark:text-slate-100" dir="rtl">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sky-500 font-semibold hover:underline mb-8">
        ← العودة للمدونة
      </Link>

      <article className="space-y-6">
        <h1 className="text-3xl sm:text-5xl font-black leading-tight text-slate-900 dark:text-white">
          {post.title}
        </h1>

        {post.publishedAt && (
          <p className="text-sm text-sky-500 font-medium">
            تم النشر في: {" "}
            {new Date(post.publishedAt).toLocaleDateString("ar-EG", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}

        {imageUrl && (
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden my-6">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <hr className="border-slate-200 dark:border-slate-800 my-6" />

        <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
          {formattedContent}
        </div>
      </article>
    </main>
  );
}