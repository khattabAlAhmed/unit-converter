import type { UnitConverter } from '../types';

const units = [
  { id: 'second', name: { ar: 'ثانية', en: 'Second' }, symbol: 's', category: 'time' as const },
  { id: 'minute', name: { ar: 'دقيقة', en: 'Minute' }, symbol: 'min', category: 'time' as const },
  { id: 'hour', name: { ar: 'ساعة', en: 'Hour' }, symbol: 'h', category: 'time' as const },
  { id: 'day', name: { ar: 'يوم', en: 'Day' }, symbol: 'd', category: 'time' as const },
  { id: 'week', name: { ar: 'أسبوع', en: 'Week' }, symbol: 'wk', category: 'time' as const },
  { id: 'month', name: { ar: 'شهر', en: 'Month' }, symbol: 'mo', category: 'time' as const },
  { id: 'year', name: { ar: 'سنة', en: 'Year' }, symbol: 'yr', category: 'time' as const },
];

// Base unit: second
const conversions: Record<string, number> = {
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2629746, // Average month (30.44 days)
  year: 31556952, // Average year (365.24 days)
};

export const timeConverter: UnitConverter = {
  category: 'time',
  units,
  convert: (value: number, fromUnit: string, toUnit: string): number => {
    if (fromUnit === toUnit) return value;
    const fromFactor = conversions[fromUnit];
    const toFactor = conversions[toUnit];
    if (!fromFactor || !toFactor) {
      throw new Error(`Invalid unit: ${fromUnit} or ${toUnit}`);
    }
    return (value * fromFactor) / toFactor;
  },
};

