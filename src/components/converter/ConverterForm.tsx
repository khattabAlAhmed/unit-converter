'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { convert, getUnitsByCategory } from '@/lib/units/converters';
import type { UnitCategory } from '@/lib/units/types';
import UnitSelector from './UnitSelector';
import ConversionResult from './ConversionResult';

interface ConverterFormProps {
  category: UnitCategory;
}

export default function ConverterForm({ category }: ConverterFormProps) {
  const locale = useLocale();
  const units = getUnitsByCategory(category);
  const [fromUnit, setFromUnit] = useState(units[0]?.id || '');
  const [toUnit, setToUnit] = useState(units[1]?.id || units[0]?.id || '');
  const [inputValue, setInputValue] = useState('');
  const [convertedValue, setConvertedValue] = useState(0);

  // Update default units when category changes
  useEffect(() => {
    if (units.length > 0) {
      setFromUnit(units[0].id);
      setToUnit(units.length > 1 ? units[1].id : units[0].id);
    }
  }, [category]);

  // Perform conversion when inputs change
  useEffect(() => {
    if (inputValue === '' || inputValue === '.') {
      setConvertedValue(0);
      return;
    }

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      setConvertedValue(0);
      return;
    }

    try {
      const result = convert(numValue, fromUnit, toUnit, category);
      setConvertedValue(result);
    } catch (error) {
      console.error('Conversion error:', error);
      setConvertedValue(0);
    }
  }, [inputValue, fromUnit, toUnit, category]);

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setInputValue(convertedValue.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string, numbers, decimal point, and negative sign
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="input-value"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {locale === 'ar' ? 'القيمة' : 'Value'}
            </label>
            <input
              id="input-value"
              type="text"
              inputMode="decimal"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={locale === 'ar' ? 'أدخل القيمة' : 'Enter value'}
              className="w-full px-4 py-3 text-2xl font-semibold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UnitSelector
              units={units}
              selectedUnit={fromUnit}
              onUnitChange={setFromUnit}
              label={locale === 'ar' ? 'من' : 'From'}
              id="from-unit"
            />
            <UnitSelector
              units={units}
              selectedUnit={toUnit}
              onUnitChange={setToUnit}
              label={locale === 'ar' ? 'إلى' : 'To'}
              id="to-unit"
            />
          </div>

          <button
            onClick={handleSwapUnits}
            className="w-full md:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center justify-center gap-2"
            aria-label={locale === 'ar' ? 'تبديل الوحدات' : 'Swap units'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M6 8L2 12L6 16" />
              <path d="M2 12H22" />
            </svg>
            <span>{locale === 'ar' ? 'تبديل الوحدات' : 'Swap Units'}</span>
          </button>
        </div>
      </div>

      {/* Result Section */}
      {inputValue && !isNaN(parseFloat(inputValue)) && (
        <ConversionResult
          value={convertedValue}
          fromUnit={fromUnit}
          toUnit={toUnit}
          category={category}
          inputValue={inputValue}
        />
      )}
    </div>
  );
}

