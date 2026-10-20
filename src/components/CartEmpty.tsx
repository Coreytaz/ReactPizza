import { Link } from 'react-router';
import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => (
  <section className="container cart cart--empty">
    <h1>Корзина пустая <span aria-hidden="true">😕</span></h1>
    <p>Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейдите на главную страницу.</p>
    <img src={cartEmptyImg} width="300" height="256" alt="" />
    <Link className="button button--black" to="/">Вернуться назад</Link>
  </section>
);

export default CartEmpty;
