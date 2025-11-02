'use client';

import { useLocale } from 'next-intl';

export default function FeaturesSection() {
  const locale = useLocale();

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === 'ar' ? 'سريع' : 'Fast'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {locale === 'ar'
                ? 'تحويل فوري بدون تأخير'
                : 'Instant conversion without delay'}
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === 'ar' ? 'دقيق' : 'Accurate'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {locale === 'ar'
                ? 'نتائج دقيقة بنسبة 100%'
                : '100% accurate results'}
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === 'ar' ? 'متعدد اللغات' : 'Multilingual'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {locale === 'ar'
                ? 'يدعم العربية والإنجليزية'
                : 'Supports Arabic and English'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

