import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameLoop } from '../useGameLoop';

describe('useGameLoop', () => {
  let rafCallbacks: ((time: number) => void)[] = [];
  let rafId = 0;

  beforeEach(() => {
    rafCallbacks = [];
    rafId = 0;
    vi.stubGlobal('requestAnimationFrame', (cb: (time: number) => void) => {
      rafCallbacks.push(cb);
      return ++rafId;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('is not running initially', () => {
    const onFrame = vi.fn();
    const { result } = renderHook(() => useGameLoop(onFrame));
    expect(result.current.isRunning).toBe(false);
  });

  it('starts the loop', () => {
    const onFrame = vi.fn();
    const { result } = renderHook(() => useGameLoop(onFrame));
    act(() => result.current.start());
    expect(result.current.isRunning).toBe(true);
    expect(rafCallbacks.length).toBe(1);
  });

  it('calls onFrame with delta on tick', () => {
    const onFrame = vi.fn();
    const { result } = renderHook(() => useGameLoop(onFrame));
    act(() => result.current.start());

    // First frame: delta is 0 (initializes lastTime)
    act(() => rafCallbacks[0](1000));
    expect(onFrame).toHaveBeenCalledWith(0);

    // Second frame: delta should be 16ms
    act(() => rafCallbacks[rafCallbacks.length - 1](1016));
    expect(onFrame).toHaveBeenCalledWith(16);
  });

  it('pauses the loop', () => {
    const onFrame = vi.fn();
    const { result } = renderHook(() => useGameLoop(onFrame));
    act(() => result.current.start());
    act(() => result.current.pause());
    expect(result.current.isRunning).toBe(false);
  });

  it('resumes the loop after pause', () => {
    const onFrame = vi.fn();
    const { result } = renderHook(() => useGameLoop(onFrame));
    act(() => result.current.start());
    act(() => result.current.pause());
    act(() => result.current.resume());
    expect(result.current.isRunning).toBe(true);
  });

  it('does not double-start', () => {
    const onFrame = vi.fn();
    const { result } = renderHook(() => useGameLoop(onFrame));
    act(() => result.current.start());
    const countBefore = rafCallbacks.length;
    act(() => result.current.start());
    expect(rafCallbacks.length).toBe(countBefore);
  });
});
