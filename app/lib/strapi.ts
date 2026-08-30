export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://strapi-backend-1pie.onrender.com';

export async function fetchStrapi(path: string) {
  const response = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }, // إعادة تحديث البيانات تلقائياً كل دقيقة
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from Strapi: ${response.statusText}`);
  }

  return response.json();
}