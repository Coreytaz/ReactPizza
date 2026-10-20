import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import fallbackPizzas from '../../assets/pizzas.json';

export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
  category: number;
};
export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type PizzaState = { items: PizzaItem[]; status: Status };
const initialState: PizzaState = { items: [], status: Status.LOADING };

export type SearchPizzaParams = {
  categoryId: number;
  sortBy: 'rating' | 'price' | 'title';
  order: 'asc' | 'desc';
  search: string;
};

export function filterLocalPizzas(params: SearchPizzaParams): PizzaItem[] {
  const query = params.search.toLocaleLowerCase('ru').trim();
  const filtered = fallbackPizzas.filter((pizza) =>
    (params.categoryId === 0 || pizza.category === params.categoryId) &&
    pizza.title.toLocaleLowerCase('ru').includes(query)
  );
  const multiplier = params.order === 'asc' ? 1 : -1;
  return filtered.sort((a, b) => {
    if (params.sortBy === 'title') return multiplier * a.title.localeCompare(b.title, 'ru');
    return multiplier * (a[params.sortBy] - b[params.sortBy]);
  }).map((item) => ({ ...item, id: String(item.id) }));
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizzas/fetch',
  async (params, { signal }) => {
    try {
      const { data } = await axios.get<PizzaItem[]>(
        'https://62a7887297b6156bff8ff64b.mockapi.io/items',
        {
          params: {
            ...(params.categoryId ? { category: params.categoryId } : {}),
            sortBy: params.sortBy,
            order: params.order,
            ...(params.search ? { search: params.search } : {}),
          },
          signal,
          timeout: 3500,
        },
      );
      return data.map((pizza) => ({ ...pizza, id: String(pizza.id) }));
    } catch (error) {
      if (signal.aborted) throw error;
      // The original MockAPI is a demo endpoint; retain a usable catalogue offline.
      return filterLocalPizzas(params);
    }
  },
);

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.items = [];
        state.status = Status.ERROR;
      });
  },
});

export default pizzasSlice.reducer;
