import { useEffect, useRef, useState } from 'react';
import { sortOptions, SortValue } from '../constants/sort';

type Props = {
  sort: (typeof sortOptions)[number];
  onChangeSort: (value: SortValue) => void;
};

const Sort = ({ sort, onChangeSort }: Props) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="sort">
      <div className="sort__label">
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M0 5 5 0l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        <span className="sort__caption">Сортировка по:</span>
        <button ref={triggerRef} type="button" className="sort__trigger" aria-expanded={open} aria-controls={open ? 'sort-options' : undefined} onClick={() => setOpen(!open)}>{sort.name}</button>
      </div>
      {open && (
        <div className="sort__popup" id="sort-options">
          <ul>
            {sortOptions.map((option) => (
              <li key={option.value}>
                <button type="button" className={sort.value === option.value ? 'active' : ''} aria-current={sort.value === option.value ? 'true' : undefined} onClick={() => { onChangeSort(option.value); setOpen(false); }}>
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
