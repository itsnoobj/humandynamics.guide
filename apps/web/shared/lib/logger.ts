/**
 * Centralized front-end logger.
 * A thin console wrapper so the implementation can be swapped
 * (e.g. for a remote sink) without touching call sites.
 */

type LogArgs = unknown[];

const isDev = process.env.NODE_ENV !== 'production';

export const logger = {
  debug: (...args: LogArgs): void => {
    if (isDev) {
      console.debug('[debug]', ...args);
    }
  },
  info: (...args: LogArgs): void => {
    console.info('[info]', ...args);
  },
  warn: (...args: LogArgs): void => {
    console.warn('[warn]', ...args);
  },
  error: (...args: LogArgs): void => {
    console.error('[error]', ...args);
  },
};
