import { memo } from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type Props = { value: number; onChangeCategory: (id: number) => void };

const Category = memo(({ value, onChangeCategory }: Props) => (
  <nav className="categories" aria-label="Категории пиццы">
    <ul>
      {categories.map((category, id) => (
        <li key={category}>
          <button type="button" className={value === id ? 'active' : ''} aria-pressed={value === id} onClick={() => onChangeCategory(id)}>{category}</button>
        </li>
      ))}
    </ul>
  </nav>
));

export default Category;
