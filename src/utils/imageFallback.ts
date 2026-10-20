import type { SyntheticEvent } from 'react';
import logo from '../assets/img/pizza-logo.svg';

export function handlePizzaImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  image.onerror = null;
  image.src = logo;
}
