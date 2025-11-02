import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import type { UnitCategory } from '@/lib/units/types';

export async function generateCategoryMetadata(
  category: UnitCategory,
  locale: string
): Promise<Metadata> {
  const t = await getTranslations('SEO.title');
  const tDesc = await getTranslations('SEO.description');

  const title = t(category);
  const description = tDesc(category);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
  const url = `${baseUrl}/${locale}/convert/${category}`;

  const alternateLanguages: Record<string, string> = {
    ar: `${baseUrl}/ar/convert/${category}`,
    en: `${baseUrl}/en/convert/${category}`,
  };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: alternateLanguages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Universal Unit Converter',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

