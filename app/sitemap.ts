import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.neshatamar.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['he', 'en'];
  const routes = ['', '/about', '/course', '/preview', '/purchase'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and route combination
  locales.forEach((locale) => {
    routes.forEach((route) => {
      // Determine priority based on route
      let priority: number;
      if (route === '') {
        // Home page has highest priority
        priority = 1.0;
      } else if (route === '/about' || route === '/preview') {
        // Important pages
        priority = 0.9;
      } else {
        // Other pages
        priority = 0.8;
      }

      // Determine change frequency
      const changeFrequency: 'weekly' | 'monthly' = route === '' ? 'weekly' : 'monthly';

      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: {
            he: `${BASE_URL}/he${route}`,
            en: `${BASE_URL}/en${route}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
