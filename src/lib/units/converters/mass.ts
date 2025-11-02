import type { UnitConverter } from '../types';

const units = [
  { id: 'gram', name: { ar: 'غرام', en: 'Gram' }, symbol: 'g', category: 'mass' as const },
  { id: 'kilogram', name: { ar: 'كيلوجرام', en: 'Kilogram' }, symbol: 'kg', category: 'mass' as const },
  { id: 'pound', name: { ar: 'باوند', en: 'Pound' }, symbol: 'lb', category: 'mass' as const },
  { id: 'ounce', name: { ar: 'أونصة', en: 'Ounce' }, symbol: 'oz', category: 'mass' as const },
  { id: 'ton', name: { ar: 'طن', en: 'Ton' }, symbol: 't', category: 'mass' as const },
  { id: 'stone', name: { ar: 'حجر', en: 'Stone' }, symbol: 'st', category: 'mass' as const },
  { id: 'milligram', name: { ar: 'ملليغرام', en: 'Milligram' }, symbol: 'mg', category: 'mass' as const },
];

// Base unit: gram
const conversions: Record<string, number> = {
  gram: 1,
  kilogram: 1000,
  milligram: 0.001,
  pound: 453.592,
  ounce: 28.3495,
  ton: 1000000,
  stone: 6350.29,
};

export const massConverter: UnitConverter = {
  category: 'mass',
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

