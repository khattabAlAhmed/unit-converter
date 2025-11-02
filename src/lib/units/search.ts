import { getAllUnits, getUnitsByCategory } from './converters';
import type { Unit } from './types';

export interface SearchResult {
  unit: Unit;
  score: number;
  matchType: 'name' | 'symbol' | 'category';
}

/**
 * Search for units by query string (supports Arabic and English)
 */
export function searchUnits(query: string, locale: 'ar' | 'en' = 'en'): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const units = getAllUnits();
  const results: SearchResult[] = [];

  for (const unit of units) {
    const unitName = unit.name[locale].toLowerCase();
    const unitSymbol = unit.symbol.toLowerCase();
    const categoryName = unit.category.toLowerCase();

    let score = 0;
    let matchType: 'name' | 'symbol' | 'category' = 'name';

    // Exact name match (highest score)
    if (unitName === normalizedQuery) {
      score = 100;
      matchType = 'name';
    }
    // Starts with query (high score)
    else if (unitName.startsWith(normalizedQuery)) {
      score = 80;
      matchType = 'name';
    }
    // Contains query (medium score)
    else if (unitName.includes(normalizedQuery)) {
      score = 60;
      matchType = 'name';
    }
    // Symbol match (high score)
    else if (unitSymbol === normalizedQuery) {
      score = 90;
      matchType = 'symbol';
    }
    // Symbol contains query (medium score)
    else if (unitSymbol.includes(normalizedQuery)) {
      score = 70;
      matchType = 'symbol';
    }
    // Category match (low score)
    else if (categoryName.includes(normalizedQuery)) {
      score = 30;
      matchType = 'category';
    }

    // Bonus for shorter names (more relevant)
    if (score > 0 && unitName.length < normalizedQuery.length * 2) {
      score += 5;
    }

    if (score > 0) {
      results.push({ unit, score, matchType });
    }
  }

  // Sort by score (descending)
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Get suggestions for autocomplete
 */
export function getSuggestions(query: string, locale: 'ar' | 'en' = 'en', limit: number = 5): Unit[] {
  const results = searchUnits(query, locale);
  return results.slice(0, limit).map(result => result.unit);
}

/**
 * Search units by category
 */
export function searchUnitsByCategory(
  category: string,
  query: string = '',
  locale: 'ar' | 'en' = 'en'
): Unit[] {
  let units = category ? getUnitsByCategory(category as any) : getAllUnits();

  if (!query.trim()) {
    return units;
  }

  const searchResults = searchUnits(query, locale);
  const matchingUnitIds = new Set(searchResults.map(r => r.unit.id));
  
  return units.filter(unit => matchingUnitIds.has(unit.id));
}

