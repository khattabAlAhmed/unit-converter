import type { UnitConverter } from '../types';

const units = [
  { id: 'byte', name: { ar: 'بايت', en: 'Byte' }, symbol: 'B', category: 'digitalData' as const },
  { id: 'kilobyte', name: { ar: 'كيلوبايت', en: 'Kilobyte' }, symbol: 'KB', category: 'digitalData' as const },
  { id: 'megabyte', name: { ar: 'ميجابايت', en: 'Megabyte' }, symbol: 'MB', category: 'digitalData' as const },
  { id: 'gigabyte', name: { ar: 'جيجابايت', en: 'Gigabyte' }, symbol: 'GB', category: 'digitalData' as const },
  { id: 'terabyte', name: { ar: 'تيرابايت', en: 'Terabyte' }, symbol: 'TB', category: 'digitalData' as const },
  { id: 'petabyte', name: { ar: 'بيتابايت', en: 'Petabyte' }, symbol: 'PB', category: 'digitalData' as const },
  { id: 'bit', name: { ar: 'بت', en: 'Bit' }, symbol: 'bit', category: 'digitalData' as const },
];

// Base unit: byte
const conversions: Record<string, number> = {
  bit: 0.125,
  byte: 1,
  kilobyte: 1024,
  megabyte: 1048576, // 1024^2
  gigabyte: 1073741824, // 1024^3
  terabyte: 1099511627776, // 1024^4
  petabyte: 1125899906842624, // 1024^5
};

export const digitalDataConverter: UnitConverter = {
  category: 'digitalData',
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

