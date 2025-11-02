import type { UnitConverter, UnitCategory } from '../types';
import { lengthConverter } from './length';
import { massConverter } from './mass';
import { timeConverter } from './time';
import { temperatureConverter } from './temperature';
import { speedConverter } from './speed';
import { energyConverter } from './energy';
import { pressureConverter } from './pressure';
import { volumeConverter } from './volume';
import { areaConverter } from './area';
import { digitalDataConverter } from './digitalData';

export const converters: Record<UnitCategory, UnitConverter> = {
  length: lengthConverter,
  mass: massConverter,
  time: timeConverter,
  temperature: temperatureConverter,
  speed: speedConverter,
  energy: energyConverter,
  pressure: pressureConverter,
  volume: volumeConverter,
  area: areaConverter,
  digitalData: digitalDataConverter,
};

export function getConverter(category: UnitCategory): UnitConverter {
  return converters[category];
}

export function getAllUnits() {
  return Object.values(converters).flatMap(converter => converter.units);
}

export function getUnitsByCategory(category: UnitCategory) {
  return converters[category]?.units || [];
}

export function convert(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: UnitCategory
): number {
  const converter = getConverter(category);
  if (!converter) {
    throw new Error(`No converter found for category: ${category}`);
  }
  return converter.convert(value, fromUnit, toUnit);
}

