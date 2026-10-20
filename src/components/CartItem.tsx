import { addItem, cartItemKey, minusItem, removeItem } from '../redux/slices/cartSlice';
import type { CartItem as CartItemType } from '../redux/slices/cartSlice';
import { useAppDispatch } from '../redux/store';
import { handlePizzaImageError } from '../utils/imageFallback';

type Props = CartItemType;
const CartItem = ({ id, title, type, size, price, count, imageUrl }: Props) => {
  const dispatch = useAppDispatch();
  const key = cartItemKey({ id, type, size });
  const selection = { id, title, type, size, price, imageUrl };

  return (
    <article className="cart__item">
      <div className="cart__item-img"><img src={imageUrl} alt="" onError={handlePizzaImageError} width="80" height="80" loading="lazy" /></div>
      <div className="cart__item-info"><h2>{title}</h2><p>{type}, {size} см.</p></div>
      <div className="cart__item-count">
        <button type="button" className="button button--outline button--circle" disabled={count <= 1} aria-label={`Уменьшить количество: ${title}, ${size} см.`} onClick={() => dispatch(minusItem(key))}>−</button>
        <b aria-label={`Количество: ${count}`}>{count}</b>
        <button type="button" className="button button--outline button--circle" aria-label={`Увеличить количество: ${title}, ${size} см.`} onClick={() => dispatch(addItem(selection))}>+</button>
      </div>
      <div className="cart__item-price"><b>{price * count} ₽</b></div>
      <div className="cart__item-remove">
        <button type="button" className="button button--outline button--circle" aria-label={`Удалить ${title}, ${type}, ${size} см.`} onClick={() => {
          if (window.confirm('Удалить выбранную пиццу из корзины?')) dispatch(removeItem(key));
        }}>×</button>
      </div>
    </article>
  );
};

export default CartItem;
