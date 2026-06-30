import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger } from '../logger';

describe('logger', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('info logs with [info] prefix', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    logger.info('hello');
    expect(spy).toHaveBeenCalledWith('[info]', 'hello');
  });

  it('warn logs with [warn] prefix', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    logger.warn('caution');
    expect(spy).toHaveBeenCalledWith('[warn]', 'caution');
  });

  it('error logs with [error] prefix', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('fail');
    expect(spy).toHaveBeenCalledWith('[error]', 'fail');
  });

  it('debug logs in non-production env', () => {
    const spy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    logger.debug('trace');
    expect(spy).toHaveBeenCalledWith('[debug]', 'trace');
  });
});
