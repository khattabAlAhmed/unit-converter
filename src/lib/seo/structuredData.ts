import type { UnitCategory } from '@/lib/units/types';

export function generateStructuredData(
  category: UnitCategory,
  locale: string,
  url: string
): object {
  const categoryNames: Record<UnitCategory, { ar: string; en: string }> = {
    length: { ar: 'محول الطول', en: 'Length Converter' },
    mass: { ar: 'محول الكتلة', en: 'Mass Converter' },
    time: { ar: 'محول الزمن', en: 'Time Converter' },
    temperature: { ar: 'محول درجة الحرارة', en: 'Temperature Converter' },
    speed: { ar: 'محول السرعة', en: 'Speed Converter' },
    energy: { ar: 'محول الطاقة', en: 'Energy Converter' },
    pressure: { ar: 'محول الضغط', en: 'Pressure Converter' },
    volume: { ar: 'محول الحجم', en: 'Volume Converter' },
    area: { ar: 'محول المساحة', en: 'Area Converter' },
    digitalData: { ar: 'محول البيانات الرقمية', en: 'Digital Data Converter' },
  };

  const name = categoryNames[category][locale as 'ar' | 'en'];

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description: `${name} - Universal Unit Converter`,
    url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
    featureList: [
      'Instant conversion',
      'Multiple units support',
      'Accurate calculations',
      'Multilingual interface',
      'Dark mode support',
    ],
  };
}

