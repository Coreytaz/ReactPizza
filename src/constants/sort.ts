export const sortOptions = [
  { name: 'популярности (убыв.)', value: 'rating' },
  { name: 'популярности (возр.)', value: '-rating' },
  { name: 'цене (убыв.)', value: 'price' },
  { name: 'цене (возр.)', value: '-price' },
  { name: 'алфавиту (Я–А)', value: 'title' },
  { name: 'алфавиту (А–Я)', value: '-title' },
] as const;

export type SortValue = (typeof sortOptions)[number]['value'];

export function getSort(value: string | null) {
  return sortOptions.find((item) => item.value === value) ?? sortOptions[0];
}
