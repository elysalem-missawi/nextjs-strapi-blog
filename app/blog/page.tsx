import Link from 'next/link';
import Image from 'next/image';
import { fetchStrapi, STRAPI_URL } from '../lib/strapi';

interface Post {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  publishedAt: string;
  cover?: {
    url?: string;
  };
}

async function getPosts(): Promise<Post[]> {
  try {
    // جلب المقالات مع رابط صورة الغلاف والفرز حسب الأحدث
    const res = await fetchStrapi('/posts?populate=cover&sort=publishedAt:desc');
    
    // التوافق مع هيكلية Strapi v5 و v4
    return (res.data || []).map((item: any) => {
      const attributes = item.attributes || item;
      return {
        id: item.id,
        documentId: item.documentId,
        title: attributes.title,
        slug: attributes.slug,
        excerpt: attributes.excerpt,
        content: attributes.content,
        publishedAt: attributes.publishedAt,
        cover: attributes.cover?.data?.attributes || attributes.cover,
      };
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-10" dir="rtl">
      {/* رأس الصفحة */}
      <div className="space-y-3 text-center sm:text-right border-b border-sky-100 dark:border-slate-800 pb-6">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">
          مدونة التقنية
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          أفكار، دروس برمجية، وتجارب في تطوير الويب.
        </p>
      </div>

      {/* بطاقات المقالات */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          لا توجد مقالات حالياً. تأكد من نشر المقال من لوحة تحكم Strapi عبر الضغط على (Publish).
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const imageUrl = post.cover?.url ? `${STRAPI_URL}${post.cover.url}` : null;

            return (
              <article
                key={post.id}
                className="bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {imageUrl && (
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-3">
                    <span className="text-xs font-semibold text-sky-500">
                      {new Date(post.publishedAt).toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 font-semibold text-sm hover:underline"
                  >
                    اقرأ المقال كاملًا <span>←</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}