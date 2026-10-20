import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router';
import fallbackPizzas from '../assets/pizzas.json';
import type { PizzaItem } from '../redux/slices/pizzasSlice';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { handlePizzaImageError } from '../utils/imageFallback';

const FullPizza = () => {
  const { id } = useParams<{ id: string }>();
  const [pizza, setPizza] = useState<PizzaItem | null>(null);
  useDocumentTitle(pizza?.title || 'Пицца');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    setPizza(null);
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
      {loading ? <p className="content__state" role="status">Загрузка пиццы…</p> : error || !pizza ? (
        <div className="content__state"><h1>Пицца не найдена</h1><p>Попробуйте вернуться в каталог.</p></div>
      ) : (
        <>
          <img className="pizza-details__image" src={pizza.imageUrl} alt={pizza.title} onError={handlePizzaImageError} width="400" height="400" />
          <div className="pizza-details__info"><h1>{pizza.title}</h1><p>от {pizza.price} ₽</p><Link to="/" className="button">Назад к каталогу</Link></div>
        </>
      )}
      {(loading || error) && <Link to="/" className="button">Назад к каталогу</Link>}
    </section>
  );
};

export default FullPizza;
