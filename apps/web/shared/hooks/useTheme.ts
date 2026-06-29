'use client';

import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type Theme = 'light' | 'dark';

/**
 * Light/dark theme hook persisted to localStorage.
 * Syncs the chosen theme to the document's data-theme attribute.
 */
export function useTheme(): {
  theme: Theme;
  toggle: () => void;
  setTheme: (theme: Theme) => void;
} {
  const [theme, setTheme] = useLocalStorage<Theme>('field-guide-theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  return { theme, toggle, setTheme };
}
