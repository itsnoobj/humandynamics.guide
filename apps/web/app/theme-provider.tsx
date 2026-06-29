'use client';

import { useEffect, type ReactNode } from 'react';
import { useThemeStore } from '@/store/themeStore';

/**
 * Applies the persisted theme to the document root.
 * Wrap the app so every page reflects the current theme.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
}
