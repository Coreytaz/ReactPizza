import { useState } from 'react';
import { getPreferredTheme, saveTheme, type Theme } from '../utils/theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getPreferredTheme);
  const label = theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему';

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    saveTheme(next);
    setTheme(next);
  };

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme}
      aria-label={label} title={label} aria-pressed={theme === 'dark'}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {theme === 'light' ? <path d="M20.9 13a9 9 0 0 1-9.9-9.9A9 9 0 1 0 20.9 13Z" /> : <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </>}
      </svg>
    </button>
  );
}
