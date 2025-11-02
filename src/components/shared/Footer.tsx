'use client';

import { useLocale } from 'next-intl';

const Footer = () => {
  const locale = useLocale();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
            {locale === 'ar' ? (
              <>© {new Date().getFullYear()} محول الوحدات الشامل. جميع الحقوق محفوظة.</>
            ) : (
              <>© {new Date().getFullYear()} Universal Unit Converter. All rights reserved.</>
            )}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-500">
            {locale === 'ar' ? (
              <>مصمم ليكون سريعاً ودقيقاً وسهل الاستخدام</>
            ) : (
              <>Designed to be fast, accurate, and easy to use</>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;