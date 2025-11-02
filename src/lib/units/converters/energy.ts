import type { UnitConverter } from '../types';

const units = [
  { id: 'joule', name: { ar: 'جول', en: 'Joule' }, symbol: 'J', category: 'energy' as const },
  { id: 'kilojoule', name: { ar: 'كيلوجول', en: 'Kilojoule' }, symbol: 'kJ', category: 'energy' as const },
  { id: 'calorie', name: { ar: 'سعرة حرارية', en: 'Calorie' }, symbol: 'cal', category: 'energy' as const },
  { id: 'kilocalorie', name: { ar: 'كيلوسعرة حرارية', en: 'Kilocalorie' }, symbol: 'kcal', category: 'energy' as const },
  { id: 'kilowattHour', name: { ar: 'كيلوواط ساعة', en: 'Kilowatt Hour' }, symbol: 'kWh', category: 'energy' as const },
  { id: 'britishThermalUnit', name: { ar: 'وحدة حرارية بريطانية', en: 'British Thermal Unit' }, symbol: 'BTU', category: 'energy' as const },
];

// Base unit: joule
const conversions: Record<string, number> = {
  joule: 1,
  kilojoule: 1000,
  calorie: 4.184,
  kilocalorie: 4184,
  kilowattHour: 3600000, // 1 kWh = 3.6 MJ
  britishThermalUnit: 1055.06,
};

export const energyConverter: UnitConverter = {
  category: 'energy',
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

