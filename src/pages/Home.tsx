import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import Category from '../components/Category';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { getSort } from '../constants/sort';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchPizzas, Status } from '../redux/slices/pizzasSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = Number(searchParams.get('categoryId'));
  const categoryId = Number.isInteger(categoryParam) && categoryParam >= 0 && categoryParam <= 5
    ? categoryParam : 0;
  const sort = getSort(searchParams.get('sortProperty'));
  const search = searchParams.get('search') || '';
  const { items, status } = useSelector((state: RootState) => state.pizzas);
  const dispatch = useAppDispatch();
  useDocumentTitle('Каталог пиццы');

  useEffect(() => {
    const request = dispatch(fetchPizzas({
      categoryId,
      sortBy: sort.value.replace('-', '') as 'rating' | 'price' | 'title',
      order: sort.value.startsWith('-') ? 'asc' : 'desc',
      search,
    }));
    window.scrollTo({ top: 0, behavior: 'auto' });
    return () => { request.abort(); };
  }, [dispatch, categoryId, sort.value, search]);

  const updateParam = (key: string, value: string, replace = false) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (!value || (key === 'categoryId' && value === '0') ||
          (key === 'sortProperty' && value === 'rating')) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      return next;
    }, { replace });
  };

  return (
    <div className="container">
      <div className="content__top">
        <Category value={categoryId} onChangeCategory={(id) => updateParam('categoryId', String(id))} />
        <Sort sort={sort} onChangeSort={(value) => updateParam('sortProperty', value)} />
      </div>
      <h1 className="content__title">Все пиццы</h1>
      {status === Status.ERROR ? (
        <p className="content__state" role="alert">Не удалось загрузить список пицц. Обновите страницу.</p>
      ) : status === Status.SUCCESS && items.length === 0 ? (
        <p className="content__state">По вашему запросу ничего не найдено.</p>
      ) : (
        <div className="content__items" aria-busy={status === Status.LOADING}>
          {status === Status.LOADING
            ? Array.from({ length: 6 }, (_, index) => <Skeleton key={index} />)
            : items.map((pizza, index) => <PizzaBlock key={pizza.id} {...pizza} priority={index === 0} />)}
        </div>
      )}
    </div>
  );
};

export default Home;
