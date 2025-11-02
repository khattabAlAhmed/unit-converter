import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { generateCategoryMetadata } from '@/lib/seo/generateMetadata';
import { generateStructuredData } from '@/lib/seo/structuredData';
import { getConverter } from '@/lib/units/converters';
import type { UnitCategory } from '@/lib/units/types';
import ConverterForm from '@/components/converter/ConverterForm';
import AdPlacement from '@/components/ads/AdPlacement';

const validCategories: UnitCategory[] = [
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

interface PageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export async function generateStaticParams() {
  const locales = ['ar', 'en'];
  const params = [];

  for (const locale of locales) {
    for (const category of validCategories) {
      params.push({ locale, category });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, category } = await params;

  if (!validCategories.includes(category as UnitCategory)) {
    return {};
  }

  return generateCategoryMetadata(category as UnitCategory, locale);
}

export default async function CategoryPage({ params }: PageProps) {
  const { locale, category } = await params;

  if (!validCategories.includes(category as UnitCategory)) {
    notFound();
  }

  const unitCategory = category as UnitCategory;
  const converter = getConverter(unitCategory);
  const t = await getTranslations('Categories');
  const tSEO = await getTranslations('SEO.description');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
  const url = `${baseUrl}/${locale}/convert/${category}`;
  const structuredData = generateStructuredData(unitCategory, locale, url);

  // AdSense slots (replace with your actual AdSense ad slot IDs)
  const adSlotContent = process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT || '';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t(category)}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {tSEO(category)}
            </p>
          </div>

          {/* Content Ad */}
          {adSlotContent && (
            <AdPlacement position="content" adSlot={adSlotContent} />
          )}

          <ConverterForm category={unitCategory} />
        </div>
      </div>
    </>
  );
}

