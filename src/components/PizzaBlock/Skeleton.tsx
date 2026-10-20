const Skeleton = () => (
  <div className="pizza-block pizza-block__skeleton" role="status" aria-label="Загрузка пиццы">
    <span className="pizza-block__skeleton-image" aria-hidden="true" />
    <span className="pizza-block__skeleton-title" aria-hidden="true" />
    <span className="pizza-block__skeleton-options" aria-hidden="true" />
    <span className="pizza-block__skeleton-bottom" aria-hidden="true" />
  </div>
);

export default Skeleton;
