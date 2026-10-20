import { describe, it, expect } from 'vitest';
import { filterLocalPizzas } from './pizzasSlice';

describe('offline catalog', () => {
  it('filters by category and case-insensitive search', () => {
    const items = filterLocalPizzas({ categoryId: 1, search: 'СЫРНАЯ', sortBy: 'rating', order: 'desc' });
    expect(items.map((item) => item.title)).toEqual(['Сырная']);
  });

  it('sorts prices in ascending order', () => {
    const prices = filterLocalPizzas({ categoryId: 0, search: '', sortBy: 'price', order: 'asc' }).map((item) => item.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
});
