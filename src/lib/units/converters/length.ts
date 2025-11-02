import type { UnitConverter } from '../types';

const units = [
  { id: 'meter', name: { ar: 'متر', en: 'Meter' }, symbol: 'm', category: 'length' as const },
  { id: 'kilometer', name: { ar: 'كيلومتر', en: 'Kilometer' }, symbol: 'km', category: 'length' as const },
  { id: 'centimeter', name: { ar: 'سنتيمتر', en: 'Centimeter' }, symbol: 'cm', category: 'length' as const },
  { id: 'millimeter', name: { ar: 'ملليمتر', en: 'Millimeter' }, symbol: 'mm', category: 'length' as const },
  { id: 'mile', name: { ar: 'ميل', en: 'Mile' }, symbol: 'mi', category: 'length' as const },
  { id: 'yard', name: { ar: 'ياردة', en: 'Yard' }, symbol: 'yd', category: 'length' as const },
  { id: 'foot', name: { ar: 'قدم', en: 'Foot' }, symbol: 'ft', category: 'length' as const },
  { id: 'inch', name: { ar: 'إنش', en: 'Inch' }, symbol: 'in', category: 'length' as const },
  { id: 'nauticalMile', name: { ar: 'ميل بحري', en: 'Nautical Mile' }, symbol: 'nmi', category: 'length' as const },
];

// Base unit: meter
const conversions: Record<string, number> = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  mile: 1609.344,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
  nauticalMile: 1852,
};

export const lengthConverter: UnitConverter = {
  category: 'length',
  units,
  convert: (value: number, fromUnit: string, toUnit: string): number => {
    if (fromUnit === toUnit) return value;
    const fromFactor = conversions[fromUnit];
    const toFactor = conversions[toUnit];
    if (!fromFactor || !toFactor) {
      throw new Error(`Invalid unit: ${fromUnit} or ${toUnit}`);
    }
    // Convert to base unit (meter) then to target unit
    return (value * fromFactor) / toFactor;
  },
};

