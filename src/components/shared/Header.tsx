'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from '../LanguageSwitcher';
import ThemeToggle from '../theme/ThemeToggle';

const Header = () => {
  const locale = useLocale();
  const t = useTranslations('Navigation');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link
              href={`/${locale}`}
              className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {locale === 'ar' ? 'محول الوحدات' : 'Unit Converter'}
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href={`/${locale}`}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t('home')}
              </Link>
              <Link
                href={`/${locale}#converters`}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t('converters')}
              </Link>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;