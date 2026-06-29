'use client';

import { useCallback, useEffect, useState } from 'react';
import { logger } from '../lib/logger';

/**
 * Generic localStorage-backed state hook.
 * SSR-safe: reads from storage only after mount.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored) as T);
      }
    } catch (err) {
      logger.warn('useLocalStorage read failed', key, err);
    }
  }, [key]);

  const setStoredValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch (err) {
          logger.warn('useLocalStorage write failed', key, err);
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, setStoredValue];
}
