import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import fallbackPizzas from '../assets/pizzas.json';
import type { PizzaItem } from '../redux/slices/pizzasSlice';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { handlePizzaImageError } from '../utils/imageFallback';
import { addItem } from '../redux/slices/cartSlice';
import { useAppDispatch, type RootState } from '../redux/store';

const typeNames = ['тонкое', 'традиционное'];

const FullPizza = () => {
  const { id } = useParams<{ id: string }>();
  const [pizza, setPizza] = useState<PizzaItem | null>(null);
  useDocumentTitle(pizza?.title || 'Пицца');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const activeType = selectedType ?? pizza?.types[0] ?? 0;
  const activeSize = selectedSize ?? pizza?.sizes[0] ?? 26;
  const addedCount = useSelector((state: RootState) => state.cart.items.find((item) =>
    item.id === pizza?.id && item.type === typeNames[activeType] && item.size === activeSize,
  )?.count ?? 0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    setPizza(null);
    setSelectedType(null);
    setSelectedSize(null);
    async function load() {
      try {
        const { data } = await axios.get<PizzaItem>(`https://62a7887297b6156bff8ff64b.mockapi.io/items/${encodeURIComponent(id ?? '')}`, { signal: controller.signal, timeout: 3500 });
        if (!controller.signal.aborted) setPizza({ ...data, id: String(data.id) });
      } catch {
        if (controller.signal.aborted) return;
        const local = fallbackPizzas.find((item) => String(item.id) === id);
        if (local) setPizza({ ...local, id: String(local.id) });
        else setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [id]);

  return (
    <section className="container pizza-details">
      <Link to="/" className="pizza-details__back">
        <span aria-hidden="true">←</span> Назад к каталогу
      </Link>
      {loading ? <p className="content__state" role="status">Загрузка пиццы…</p> : error || !pizza ? (
        <div className="content__state"><h1>Пицца не найдена</h1><p>Попробуйте вернуться в каталог.</p></div>
      ) : (
        <div className="pizza-details__layout">
          <div className="pizza-details__visual">
            <span className="pizza-details__badge">React Pizza</span>
            <img className="pizza-details__image" src={pizza.imageUrl} alt={pizza.title} onError={handlePizzaImageError} width="400" height="400" />
          </div>
          <div className="pizza-details__info">
            <p className="pizza-details__eyebrow">Пицца на ваш вкус</p>
            <h1>{pizza.title}</h1>
            <p className="pizza-details__summary">{activeSize} см · {typeNames[activeType]} тесто</p>
            <div className="pizza-details__options">
              <fieldset>
                <legend>Размер пиццы</legend>
                <div className="pizza-details__choices">
                  {pizza.sizes.map((size) => (
                    <button type="button" key={size} aria-pressed={activeSize === size}
                      className={activeSize === size ? 'active' : ''} onClick={() => setSelectedSize(size)}>
                      {size} см
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>Тесто</legend>
                <div className="pizza-details__choices">
                  {pizza.types.map((type) => (
                    <button type="button" key={type} aria-pressed={activeType === type}
                      className={activeType === type ? 'active' : ''} onClick={() => setSelectedType(type)}>
                      {typeNames[type]}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="pizza-details__purchase">
              <div><span className="pizza-details__price-label">Цена</span><strong>{pizza.price} ₽</strong></div>
              <button type="button" className="button" onClick={() => dispatch(addItem({
                id: pizza.id, title: pizza.title, imageUrl: pizza.imageUrl, price: pizza.price,
                type: typeNames[activeType], size: activeSize,
              }))}>
                <span aria-hidden="true">+</span> В корзину
              </button>
            </div>
            <p className="pizza-details__feedback" role="status">
              {addedCount > 0 ? `В корзине: ${addedCount} шт. с такими параметрами` : 'Выберите размер и тесто — и добавьте в корзину'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default FullPizza;
