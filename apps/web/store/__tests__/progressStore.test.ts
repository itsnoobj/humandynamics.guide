import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock zustand persist middleware to be a pass-through (no localStorage needed)
vi.mock('zustand/middleware', () => ({
  persist: (fn: Function) => fn,
}));

import { useProgressStore } from '../progressStore';

describe('progressStore', () => {
  beforeEach(() => {
    useProgressStore.setState({
      completedChapters: [],
      score: 0,
      currentChapter: undefined,
    });
  });

  it('starts with empty state', () => {
    const state = useProgressStore.getState();
    expect(state.completedChapters).toEqual([]);
    expect(state.score).toBe(0);
    expect(state.currentChapter).toBeUndefined();
  });

  it('completeChapter adds a chapter and increments score', () => {
    useProgressStore.getState().completeChapter('1', 10);
    const state = useProgressStore.getState();
    expect(state.completedChapters).toEqual(['1']);
    expect(state.score).toBe(10);
  });

  it('completeChapter defaults points to 0', () => {
    useProgressStore.getState().completeChapter('2');
    const state = useProgressStore.getState();
    expect(state.completedChapters).toEqual(['2']);
    expect(state.score).toBe(0);
  });

  it('completeChapter does not duplicate chapters', () => {
    useProgressStore.getState().completeChapter('1', 10);
    useProgressStore.getState().completeChapter('1', 10);
    const state = useProgressStore.getState();
    expect(state.completedChapters).toEqual(['1']);
    expect(state.score).toBe(10);
  });

  it('setCurrentChapter updates currentChapter', () => {
    useProgressStore.getState().setCurrentChapter('3');
    expect(useProgressStore.getState().currentChapter).toBe('3');
  });

  it('reset clears all progress', () => {
    useProgressStore.getState().completeChapter('1', 10);
    useProgressStore.getState().setCurrentChapter('2');
    useProgressStore.getState().reset();
    const state = useProgressStore.getState();
    expect(state.completedChapters).toEqual([]);
    expect(state.score).toBe(0);
    expect(state.currentChapter).toBeUndefined();
  });
});
