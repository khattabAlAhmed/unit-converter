import type { UnitConverter } from '../types';

const units = [
  { id: 'pascal', name: { ar: 'باسكال', en: 'Pascal' }, symbol: 'Pa', category: 'pressure' as const },
  { id: 'kilopascal', name: { ar: 'كيلوباسكال', en: 'Kilopascal' }, symbol: 'kPa', category: 'pressure' as const },
  { id: 'bar', name: { ar: 'بار', en: 'Bar' }, symbol: 'bar', category: 'pressure' as const },
  { id: 'psi', name: { ar: 'رطل/بوصة²', en: 'PSI' }, symbol: 'psi', category: 'pressure' as const },
  { id: 'atmosphere', name: { ar: 'ضغط جوي', en: 'Atmosphere' }, symbol: 'atm', category: 'pressure' as const },
  { id: 'torr', name: { ar: 'تور', en: 'Torr' }, symbol: 'Torr', category: 'pressure' as const },
];

// Base unit: pascal
const conversions: Record<string, number> = {
  pascal: 1,
  kilopascal: 1000,
  bar: 100000,
  psi: 6894.76,
  atmosphere: 101325,
  torr: 133.322,
};

export const pressureConverter: UnitConverter = {
  category: 'pressure',
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

