import type { UnitConverter } from '../types';

const units = [
  { id: 'meterPerSecond', name: { ar: 'متر/ثانية', en: 'Meter/Second' }, symbol: 'm/s', category: 'speed' as const },
  { id: 'kilometerPerHour', name: { ar: 'كيلومتر/ساعة', en: 'Kilometer/Hour' }, symbol: 'km/h', category: 'speed' as const },
  { id: 'milePerHour', name: { ar: 'ميل/ساعة', en: 'Mile/Hour' }, symbol: 'mph', category: 'speed' as const },
  { id: 'knot', name: { ar: 'عقدة', en: 'Knot' }, symbol: 'kn', category: 'speed' as const },
  { id: 'footPerSecond', name: { ar: 'قدم/ثانية', en: 'Foot/Second' }, symbol: 'ft/s', category: 'speed' as const },
];

// Base unit: meter per second
const conversions: Record<string, number> = {
  meterPerSecond: 1,
  kilometerPerHour: 0.277778, // 1 km/h = 1000m / 3600s
  milePerHour: 0.44704, // 1 mph = 1609.344m / 3600s
  knot: 0.514444, // 1 knot = 1852m / 3600s
  footPerSecond: 0.3048, // 1 ft/s = 0.3048 m/s
};

export const speedConverter: UnitConverter = {
  category: 'speed',
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

