import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://unit-converter-blond-eight.vercel.app';

const categories = [
  'length',
  'mass',
  'time',
  'temperature',
  'speed',
  'energy',
  'pressure',
  'volume',
  'area',
  'digitalData',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const routes: MetadataRoute.Sitemap = [];

  // Add homepage for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${baseUrl}/${loc}`])
        ),
      },
    });
  });

  // Add category pages for each locale
  categories.forEach((category) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/convert/${category}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}/convert/${category}`])
          ),
        },
      });
    });
  });

  return routes;
}

