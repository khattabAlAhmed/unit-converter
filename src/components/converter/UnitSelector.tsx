'use client';

import { useLocale } from 'next-intl';
import type { Unit } from '@/lib/units/types';

interface UnitSelectorProps {
  units: Unit[];
  selectedUnit: string;
  onUnitChange: (unitId: string) => void;
  label?: string;
  id?: string;
}

export default function UnitSelector({
  units,
  selectedUnit,
  onUnitChange,
  label,
  id,
}: UnitSelectorProps) {
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        id={id}
        value={selectedUnit}
        onChange={(e) => onUnitChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      >
        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.name[locale as 'ar' | 'en']} ({unit.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}

