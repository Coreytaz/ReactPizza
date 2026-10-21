import { Link, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import logoSvg from '../assets/img/pizza-logo.svg';
import Search from './Search';
import ThemeToggle from './ThemeToggle';
import { RootState } from '../redux/store';

const Header = () => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="container">
        <Link className="header__home" to="/" aria-label="React Pizza — главная">
          <div className="header__logo">
            <img width="38" height="38" src={logoSvg} alt="" />
            <div><span className="header__brand">React Pizza</span><p>самая вкусная пицца во вселенной</p></div>
          </div>
        </Link>
        {pathname === '/' && <Search />}
        <div className="header__actions">
        <ThemeToggle />
        {pathname !== '/cart' && (
          <Link to="/cart" className="button button--cart" aria-label={`Корзина: ${totalCount} шт., ${totalPrice} рублей`}>
            <span>{totalPrice} ₽</span><span className="button__delimiter" aria-hidden="true" />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M6.33 16.33a1.33 1.33 0 1 0 0-2.66 1.33 1.33 0 0 0 0 2.66ZM14.33 16.33a1.33 1.33 0 1 0 0-2.66 1.33 1.33 0 0 0 0 2.66ZM4.78 5h11.55l-1.12 5.6a1.33 1.33 0 0 1-1.33 1.07H6.83a1.33 1.33 0 0 1-1.33-1.17L4.49 2.83a1.33 1.33 0 0 0-1.32-1.16h-1.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span>{totalCount}</span>
          </Link>
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;
