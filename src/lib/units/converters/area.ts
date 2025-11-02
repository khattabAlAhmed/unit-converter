import type { UnitConverter } from '../types';

const units = [
  { id: 'squareMeter', name: { ar: 'متر²', en: 'Square Meter' }, symbol: 'm²', category: 'area' as const },
  { id: 'squareKilometer', name: { ar: 'كيلومتر²', en: 'Square Kilometer' }, symbol: 'km²', category: 'area' as const },
  { id: 'squareCentimeter', name: { ar: 'سنتيمتر²', en: 'Square Centimeter' }, symbol: 'cm²', category: 'area' as const },
  { id: 'squareMile', name: { ar: 'ميل²', en: 'Square Mile' }, symbol: 'mi²', category: 'area' as const },
  { id: 'squareFoot', name: { ar: 'قدم²', en: 'Square Foot' }, symbol: 'ft²', category: 'area' as const },
  { id: 'squareInch', name: { ar: 'إنش²', en: 'Square Inch' }, symbol: 'in²', category: 'area' as const },
  { id: 'acre', name: { ar: 'فدان', en: 'Acre' }, symbol: 'ac', category: 'area' as const },
  { id: 'hectare', name: { ar: 'هكتار', en: 'Hectare' }, symbol: 'ha', category: 'area' as const },
];

// Base unit: square meter
const conversions: Record<string, number> = {
  squareMeter: 1,
  squareKilometer: 1000000,
  squareCentimeter: 0.0001,
  squareMile: 2589988.11,
  squareFoot: 0.092903,
  squareInch: 0.00064516,
  acre: 4046.86,
  hectare: 10000,
};

export const areaConverter: UnitConverter = {
  category: 'area',
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

