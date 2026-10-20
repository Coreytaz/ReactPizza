import { useEffect, useId, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import styles from './Search.module.scss';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') ?? '';
  const [value, setValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const labelId = useId();

  // URL is the source of truth for browser back/forward navigation.
  useEffect(() => { setValue(query); }, [query]);

  useEffect(() => {
    if (value.trim() === query) return;
    const timeout = window.setTimeout(() => {
      setSearchParams((current) => {
        const next = new URLSearchParams(current);
        if (value.trim()) next.set('search', value.trim());
        else next.delete('search');
        return next;
      }, { replace: true });
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [value, query, setSearchParams]);

  return (
    <div className={styles.root} role="search">
      <svg className={styles.icon} viewBox="0 0 32 32" aria-hidden="true">
        <path d="M27.4 24.6 22.3 19.5A10 10 0 1 0 19.5 22.3l5.1 5.1a2 2 0 0 0 2.8-2.8zM7 14a7 7 0 1 1 14 0 7 7 0 0 1-14 0z" />
      </svg>
      <label className="visually-hidden" htmlFor={labelId}>Поиск пиццы</label>
      <input id={labelId} ref={inputRef} className={styles.input} type="search" autoComplete="off"
        placeholder="Поиск пиццы..." value={value} onChange={(event) => setValue(event.target.value)} />
      {value && (
        <button className={styles.close} aria-label="Очистить поиск" type="button" onClick={() => {
          setValue('');
          setSearchParams((current) => {
            const next = new URLSearchParams(current);
            next.delete('search');
            return next;
          }, { replace: true });
          inputRef.current?.focus();
        }}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      )}
    </div>
  );
};

export default Search;
