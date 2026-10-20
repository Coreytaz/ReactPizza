import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { addItem } from '../../redux/slices/cartSlice';
import type { PizzaItem } from '../../redux/slices/pizzasSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { handlePizzaImageError } from '../../utils/imageFallback';

const typeNames = ['тонкое', 'традиционное'];

const PizzaBlock = ({ id, title, price, imageUrl, sizes, types, priority = false }: PizzaItem & { priority?: boolean }) => {
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const dispatch = useAppDispatch();
  const selection = { id, title, price, imageUrl, type: typeNames[activeType], size: activeSize };
  const addedCount = useSelector((state: RootState) =>
    state.cart.items.filter((item) => item.id === id).reduce((sum, item) => sum + item.count, 0)
  );

  return (
    <article className="pizza-block">
      <Link to={`/pizza/${encodeURIComponent(id)}`} className="pizza-block__link">
        <img className="pizza-block__image" src={imageUrl} alt={title} onError={handlePizzaImageError} loading={priority ? "eager" : "lazy"} width="260" height="260" decoding="async" />
        <h2 className="pizza-block__title">{title}</h2>
      </Link>
      <div className="pizza-block__selector">
        <div className="pizza-block__options" role="group" aria-label={`Тесто: ${title}`}>
          {types.map((typeId) => (
            <button key={typeId} type="button" className={activeType === typeId ? 'active' : ''} aria-pressed={activeType === typeId} onClick={() => setActiveType(typeId)}>{typeNames[typeId]}</button>
          ))}
        </div>
        <div className="pizza-block__options" role="group" aria-label={`Размер: ${title}`}>
          {sizes.map((size) => (
            <button key={size} type="button" className={activeSize === size ? 'active' : ''} aria-pressed={activeSize === size} onClick={() => setActiveSize(size)}>{size} см.</button>
          ))}
        </div>
      </div>
      <div className="pizza-block__bottom">
        <span className="pizza-block__price">от {price} ₽</span>
        <button type="button" className="button button--outline button--add" onClick={() => dispatch(addItem(selection))} aria-label={`Добавить ${title}, ${selection.type}, ${selection.size} см. в корзину`}>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M10.8 4.8H7.2V1.2a1.2 1.2 0 0 0-2.4 0v3.6H1.2a1.2 1.2 0 0 0 0 2.4h3.6v3.6a1.2 1.2 0 0 0 2.4 0V7.2h3.6a1.2 1.2 0 0 0 0-2.4Z" /></svg>
          <span>Добавить</span>
          {addedCount > 0 && <i aria-hidden="true">{addedCount}</i>}
        </button>
      </div>
    </article>
  );
};

export default PizzaBlock;
