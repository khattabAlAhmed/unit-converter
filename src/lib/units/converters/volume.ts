import type { UnitConverter } from '../types';

const units = [
  { id: 'liter', name: { ar: 'لتر', en: 'Liter' }, symbol: 'L', category: 'volume' as const },
  { id: 'milliliter', name: { ar: 'ملليلتر', en: 'Milliliter' }, symbol: 'mL', category: 'volume' as const },
  { id: 'cubicMeter', name: { ar: 'متر مكعب', en: 'Cubic Meter' }, symbol: 'm³', category: 'volume' as const },
  { id: 'gallon', name: { ar: 'جالون', en: 'Gallon' }, symbol: 'gal', category: 'volume' as const },
  { id: 'cup', name: { ar: 'كوب', en: 'Cup' }, symbol: 'cup', category: 'volume' as const },
  { id: 'pint', name: { ar: 'باينت', en: 'Pint' }, symbol: 'pt', category: 'volume' as const },
  { id: 'quart', name: { ar: 'كوارت', en: 'Quart' }, symbol: 'qt', category: 'volume' as const },
  { id: 'fluidOunce', name: { ar: 'أونصة سائلة', en: 'Fluid Ounce' }, symbol: 'fl oz', category: 'volume' as const },
  { id: 'cubicCentimeter', name: { ar: 'سنتيمتر مكعب', en: 'Cubic Centimeter' }, symbol: 'cm³', category: 'volume' as const },
];

// Base unit: liter
const conversions: Record<string, number> = {
  liter: 1,
  milliliter: 0.001,
  cubicMeter: 1000,
  gallon: 3.78541, // US gallon
  cup: 0.236588,
  pint: 0.473176,
  quart: 0.946353,
  fluidOunce: 0.0295735,
  cubicCentimeter: 0.001,
};

export const volumeConverter: UnitConverter = {
  category: 'volume',
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

