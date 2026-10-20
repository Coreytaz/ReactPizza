import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cartReducer from './slices/cartSlice';
import pizzasReducer from './slices/pizzasSlice';

const store = configureStore({
  reducer: { cart: cartReducer, pizzas: pizzasReducer },
});

// Persistence belongs to the store, not the Header render lifecycle.
let lastCart = store.getState().cart.items;
store.subscribe(() => {
  const nextCart = store.getState().cart.items;
  if (lastCart !== nextCart) {
    lastCart = nextCart;
    try {
      localStorage.setItem('cart', JSON.stringify(nextCart));
    } catch {
      // Storage may be unavailable in private browsing or when its quota is full.
    }
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
