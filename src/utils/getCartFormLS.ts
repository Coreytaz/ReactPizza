import type { CartItem } from '../redux/slices/cartSlice';

/** Ignore corrupted or outdated localStorage instead of crashing the entire app. */
export function getCartFromLS(): CartItem[] {
  try {
    const raw = localStorage.getItem('cart');
    if (!raw) return [];
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter((item): item is CartItem => {
      if (!item || typeof item !== 'object') return false;
      const value = item as Partial<CartItem>;
      return (typeof value.id === 'string' || typeof value.id === 'number') &&
        typeof value.title === 'string' && typeof value.imageUrl === 'string' &&
        typeof value.type === 'string' && typeof value.size === 'number' &&
        Number.isFinite(value.size) && typeof value.price === 'number' &&
        Number.isFinite(value.price) && value.price >= 0 &&
        typeof value.count === 'number' && Number.isSafeInteger(value.count) && value.count > 0;
    }).map((item) => ({ ...item, id: String(item.id) }));
  } catch {
    return [];
  }
}
