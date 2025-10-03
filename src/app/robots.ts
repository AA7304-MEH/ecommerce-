import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/checkout/', '/account/', '/api/'],
    },
    sitemap: 'https://gadgetstore.com/sitemap.xml',
  };
}