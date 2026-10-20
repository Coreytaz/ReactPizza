import { describe, it, expect } from 'vitest';
import cartReducer, { addItem, minusItem, removeItem, clearItems, cartItemKey } from './cartSlice';

const thin = { id: '1', title: 'Сырная', type: 'тонкое', size: 26, price: 250, imageUrl: '/pizza.png' };
const thick = { ...thin, type: 'традиционное', size: 40 };

describe('cart reducer', () => {
  it('keeps different sizes and dough types as separate items', () => {
    let state = cartReducer(undefined, addItem(thin));
    state = cartReducer(state, addItem(thin));
    state = cartReducer(state, addItem(thick));
    expect(state.items).toHaveLength(2);
    expect(state.totalPrice).toBe(750);
    expect(state.items.map((item) => item.count)).toEqual([2, 1]);
  });

  it('recalculates total for minus, removal and clearing', () => {
    let state = cartReducer(undefined, addItem(thin));
    state = cartReducer(state, addItem(thin));
    state = cartReducer(state, addItem(thick));
    state = cartReducer(state, minusItem(cartItemKey(thin)));
    expect(state.totalPrice).toBe(500);
    state = cartReducer(state, minusItem(cartItemKey(thin)));
    expect(state.totalPrice).toBe(500);
    state = cartReducer(state, removeItem(cartItemKey(thick)));
    expect(state.totalPrice).toBe(250);
    state = cartReducer(state, clearItems());
    expect(state.items).toEqual([]);
    expect(state.totalPrice).toBe(0);
  });
});
