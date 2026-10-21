export type Theme = 'light' | 'dark';

export function getPreferredTheme(): Theme {
  try {
    const saved = localStorage.getItem('react-pizza-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* The theme still works when storage is unavailable. */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content', theme === 'dark' ? '#141210' : '#f7f2e9',
  );
}

export function saveTheme(theme: Theme) {
  applyTheme(theme);
  try { localStorage.setItem('react-pizza-theme', theme); } catch { /* Optional persistence. */ }
}
