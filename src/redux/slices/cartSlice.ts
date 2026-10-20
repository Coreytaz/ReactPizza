import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFormLS';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};
export type CartSelection = Omit<CartItem, 'count'>;

export const cartItemKey = (item: Pick<CartItem, 'id' | 'type' | 'size'>) =>
  JSON.stringify([item.id, item.type, item.size]);

interface CartState {
  totalPrice: number;
  items: CartItem[];
}

const items = getCartFromLS();
const initialState: CartState = { items, totalPrice: calcTotalPrice(items) };

const updateTotal = (state: CartState) => {
  state.totalPrice = calcTotalPrice(state.items);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartSelection>) {
      const key = cartItemKey(action.payload);
      const found = state.items.find((item) => cartItemKey(item) === key);
      if (found) {
        found.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      updateTotal(state);
    },
    minusItem(state, action: PayloadAction<string>) {
      const found = state.items.find((item) => cartItemKey(item) === action.payload);
      if (found && found.count > 1) found.count -= 1;
      updateTotal(state);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => cartItemKey(item) !== action.payload);
      updateTotal(state);
    },
    clearItems(state) {
      state.items = [];
      updateTotal(state);
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
