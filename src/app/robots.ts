import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/dashboard/',
          '/api/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/dashboard/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://rbzclimatesolutions.com/sitemap.xml',
    host: 'https://rbzclimatesolutions.com',
  };
}
