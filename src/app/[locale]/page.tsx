import {getTranslations} from 'next-intl/server';
import UnitSearchBar from '@/components/converter/UnitSearchBar';
import CategoryGrid from '@/components/converter/CategoryGrid';
import FeaturesSection from '@/components/home-sections/FeaturesSection';

export default async function Home() {
  const t = await getTranslations('HomePage');

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
            {t('heroSubtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="pt-8">
            <UnitSearchBar placeholder={t('searchPlaceholder')} />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="converters" className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          {t('popularCategories')}
        </h2>
        <CategoryGrid />
      </section>

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
}
