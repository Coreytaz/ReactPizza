import { Link } from 'react-router';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => (
  <section className={styles.root}>
    <h1><span aria-hidden="true">😔</span> Страница не найдена</h1>
    <p>Проверьте адрес или перейдите в каталог.</p>
    <Link to="/" className="button">В каталог</Link>
  </section>
);

export default NotFoundBlock;
