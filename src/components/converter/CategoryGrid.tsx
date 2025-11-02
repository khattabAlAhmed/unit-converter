'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import type { UnitCategory } from '@/lib/units/types';

const categories: { id: UnitCategory; icon: string; color: string }[] = [
  { id: 'length', icon: '📏', color: 'from-blue-500 to-blue-600' },
  { id: 'mass', icon: '⚖️', color: 'from-purple-500 to-purple-600' },
  { id: 'time', icon: '⏰', color: 'from-green-500 to-green-600' },
  { id: 'temperature', icon: '🌡️', color: 'from-red-500 to-red-600' },
  { id: 'speed', icon: '🚀', color: 'from-yellow-500 to-yellow-600' },
  { id: 'energy', icon: '⚡', color: 'from-orange-500 to-orange-600' },
  { id: 'pressure', icon: '📊', color: 'from-pink-500 to-pink-600' },
  { id: 'volume', icon: '💧', color: 'from-cyan-500 to-cyan-600' },
  { id: 'area', icon: '📐', color: 'from-indigo-500 to-indigo-600' },
  { id: 'digitalData', icon: '💾', color: 'from-gray-500 to-gray-600' },
];

export default function CategoryGrid() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('Categories');

  const getCategoryName = (categoryId: UnitCategory) => {
    try {
      return t(categoryId);
    } catch {
      // Fallback if translation not found
      const names: Record<UnitCategory, { ar: string; en: string }> = {
        length: { ar: 'الطول', en: 'Length' },
        mass: { ar: 'الكتلة', en: 'Mass' },
        time: { ar: 'الزمن', en: 'Time' },
        temperature: { ar: 'درجة الحرارة', en: 'Temperature' },
        speed: { ar: 'السرعة', en: 'Speed' },
        energy: { ar: 'الطاقة', en: 'Energy' },
        pressure: { ar: 'الضغط', en: 'Pressure' },
        volume: { ar: 'الحجم', en: 'Volume' },
        area: { ar: 'المساحة', en: 'Area' },
        digitalData: { ar: 'البيانات الرقمية', en: 'Digital Data' },
      };
      return names[categoryId][locale as 'ar' | 'en'];
    }
  };

  const handleCategoryClick = (categoryId: UnitCategory) => {
    router.push(`/${locale}/convert/${categoryId}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className="group relative overflow-hidden bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className={`text-4xl transform group-hover:scale-110 transition-transform duration-300`}
            >
              {category.icon}
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">
                {getCategoryName(category.id)}
              </div>
            </div>
          </div>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          />
        </button>
      ))}
    </div>
  );
}

