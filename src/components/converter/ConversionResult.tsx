'use client';

import { useLocale } from 'next-intl';
import { getConverter } from '@/lib/units/converters';
import type { UnitCategory } from '@/lib/units/types';

interface ConversionResultProps {
  value: number;
  fromUnit: string;
  toUnit: string;
  category: UnitCategory;
  inputValue: string;
}

export default function ConversionResult({
  value,
  fromUnit,
  toUnit,
  category,
  inputValue,
}: ConversionResultProps) {
  const locale = useLocale();
  const converter = getConverter(category);
  const fromUnitObj = converter.units.find((u) => u.id === fromUnit);
  const toUnitObj = converter.units.find((u) => u.id === toUnit);

  if (!fromUnitObj || !toUnitObj) {
    return null;
  }

  const fromName = fromUnitObj.name[locale as 'ar' | 'en'];
  const toName = toUnitObj.name[locale as 'ar' | 'en'];
  const fromSymbol = fromUnitObj.symbol;
  const toSymbol = toUnitObj.symbol;

  const formatNumber = (num: number): string => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001 || Math.abs(num) >= 1e12) {
      return num.toExponential(4);
    }
    if (Math.abs(num) >= 1e6) {
      return num.toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-US', {
        maximumFractionDigits: 2,
      });
    }
    return num.toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      maximumFractionDigits: 6,
      minimumFractionDigits: num % 1 !== 0 ? 1 : 0,
    });
  };

  return (
    <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-gray-700">
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {formatNumber(value)}
          </div>
          <div className="text-lg text-gray-700 dark:text-gray-300">
            {toName} ({toSymbol})
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-blue-200 dark:border-gray-700">
          <span>
            {inputValue || '0'} {fromSymbol}
          </span>
          <span className="text-gray-400 dark:text-gray-500">=</span>
          <span>
            {formatNumber(value)} {toSymbol}
          </span>
        </div>

        <div className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2">
          {locale === 'ar' ? (
            <>
              {inputValue || '0'} {fromName} = {formatNumber(value)} {toName}
            </>
          ) : (
            <>
              {inputValue || '0'} {fromName} = {formatNumber(value)} {toName}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

