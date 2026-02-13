import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // 範例：不讓爬蟲抓私人路徑
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}