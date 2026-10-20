import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import CartEmpty from '../components/CartEmpty';
import CartItem from '../components/CartItem';
import { cartItemKey, clearItems } from '../redux/slices/cartSlice';
import { RootState, useAppDispatch } from '../redux/store';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const Cart = () => {
  const dispatch = useAppDispatch();
  useDocumentTitle('Корзина');
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const totalCount = items.reduce((total, item) => total + item.count, 0);

  if (!items.length) return <CartEmpty />;

  return (
    <div className="container container--cart">
      <section className="cart" aria-labelledby="cart-title">
        <div className="cart__top">
          <h1 className="content__title" id="cart-title">Корзина</h1>
          <button type="button" className="cart__clear" onClick={() => {
            if (window.confirm('Очистить корзину?')) dispatch(clearItems());
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M2.5 5h15M6.5 5V3.5h7V5m2.5 0v11.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5m4 4v6m4-6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span>Очистить корзину</span>
          </button>
        </div>
        <div className="cart__items">
          {items.map((item) => <CartItem key={cartItemKey(item)} {...item} />)}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details"><span>Всего пицц: <b>{totalCount} шт.</b></span><span>Сумма заказа: <b>{totalPrice} ₽</b></span></div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline go-back-btn"><span>← Вернуться назад</span></Link>
            <button type="button" className="button pay-btn" disabled title="Онлайн-оплата не подключена" aria-label="Оплатить сейчас — оплата пока недоступна">Оплатить сейчас</button>
          </div>
          <p className="cart__payment-note">Онлайн-оплата пока недоступна.</p>
        </div>
      </section>
    </div>
  );
};
export default Cart;
