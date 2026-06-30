import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePannable } from '../usePannable';

describe('usePannable', () => {
  it('starts with zero offset and not dragging', () => {
    const { result } = renderHook(() => usePannable());
    expect(result.current.offset).toEqual({ x: 0, y: 0 });
    expect(result.current.isDragging).toBe(false);
  });

  it('does not start dragging below threshold', () => {
    const { result } = renderHook(() => usePannable());
    act(() => {
      result.current.handlers.onMouseDown({ clientX: 100, clientY: 100 } as any);
      result.current.handlers.onMouseMove({ clientX: 102, clientY: 102 } as any);
    });
    expect(result.current.isDragging).toBe(false);
    expect(result.current.offset).toEqual({ x: 0, y: 0 });
  });

  it('starts dragging once past threshold', () => {
    const { result } = renderHook(() => usePannable());
    act(() => {
      result.current.handlers.onMouseDown({ clientX: 100, clientY: 100 } as any);
    });
    act(() => {
      result.current.handlers.onMouseMove({ clientX: 120, clientY: 100 } as any);
    });
    expect(result.current.isDragging).toBe(true);
    expect(result.current.offset.x).toBe(20);
  });

  it('stops dragging on mouseUp', () => {
    const { result } = renderHook(() => usePannable());
    act(() => {
      result.current.handlers.onMouseDown({ clientX: 100, clientY: 100 } as any);
    });
    act(() => {
      result.current.handlers.onMouseMove({ clientX: 120, clientY: 100 } as any);
    });
    act(() => {
      result.current.handlers.onMouseUp();
    });
    expect(result.current.isDragging).toBe(false);
  });

  it('stops dragging on mouseLeave', () => {
    const { result } = renderHook(() => usePannable());
    act(() => {
      result.current.handlers.onMouseDown({ clientX: 100, clientY: 100 } as any);
    });
    act(() => {
      result.current.handlers.onMouseMove({ clientX: 120, clientY: 100 } as any);
    });
    act(() => {
      result.current.handlers.onMouseLeave();
    });
    expect(result.current.isDragging).toBe(false);
  });

  it('handles touch events', () => {
    const { result } = renderHook(() => usePannable());
    act(() => {
      result.current.handlers.onTouchStart({ touches: [{ clientX: 50, clientY: 50 }] } as any);
    });
    act(() => {
      result.current.handlers.onTouchMove({ touches: [{ clientX: 80, clientY: 50 }] } as any);
    });
    expect(result.current.isDragging).toBe(true);
    expect(result.current.offset.x).toBe(30);
    act(() => {
      result.current.handlers.onTouchEnd();
    });
    expect(result.current.isDragging).toBe(false);
  });
});
