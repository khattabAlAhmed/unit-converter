import type { UnitConverter } from '../types';

const units = [
  { id: 'celsius', name: { ar: 'سيلسيوس', en: 'Celsius' }, symbol: '°C', category: 'temperature' as const },
  { id: 'fahrenheit', name: { ar: 'فهرنهايت', en: 'Fahrenheit' }, symbol: '°F', category: 'temperature' as const },
  { id: 'kelvin', name: { ar: 'كلفن', en: 'Kelvin' }, symbol: 'K', category: 'temperature' as const },
];

export const temperatureConverter: UnitConverter = {
  category: 'temperature',
  units,
  convert: (value: number, fromUnit: string, toUnit: string): number => {
    if (fromUnit === toUnit) return value;

    // Convert to Celsius first
    let celsius: number;
    if (fromUnit === 'celsius') {
      celsius = value;
    } else if (fromUnit === 'fahrenheit') {
      celsius = (value - 32) * (5 / 9);
    } else if (fromUnit === 'kelvin') {
      celsius = value - 273.15;
    } else {
      throw new Error(`Invalid unit: ${fromUnit}`);
    }

    // Convert from Celsius to target unit
    if (toUnit === 'celsius') {
      return celsius;
    } else if (toUnit === 'fahrenheit') {
      return celsius * (9 / 5) + 32;
    } else if (toUnit === 'kelvin') {
      return celsius + 273.15;
    } else {
      throw new Error(`Invalid unit: ${toUnit}`);
    }
  },
};

