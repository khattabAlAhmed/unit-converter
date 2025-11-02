export type UnitCategory = 
  | 'length'
  | 'mass'
  | 'time'
  | 'temperature'
  | 'speed'
  | 'energy'
  | 'pressure'
  | 'volume'
  | 'area'
  | 'digitalData';

export interface Unit {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  symbol: string;
  category: UnitCategory;
}

export interface ConverterFunction {
  (value: number, fromUnit: string, toUnit: string): number;
}

export interface UnitConverter {
  category: UnitCategory;
  units: Unit[];
  convert: (value: number, fromUnit: string, toUnit: string) => number;
}

