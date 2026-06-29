import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedChapters: string[];
  score: number;
  currentChapter?: string;
  completeChapter: (chapterId: string, points?: number) => void;
  setCurrentChapter: (chapterId: string) => void;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedChapters: [],
      score: 0,
      currentChapter: undefined,
      completeChapter: (chapterId, points = 0) =>
        set((state) => {
          if (state.completedChapters.includes(chapterId)) {
            return state;
          }
          return {
            completedChapters: [...state.completedChapters, chapterId],
            score: state.score + points,
          };
        }),
      setCurrentChapter: (chapterId) => set({ currentChapter: chapterId }),
      reset: () => set({ completedChapters: [], score: 0, currentChapter: undefined }),
    }),
    { name: 'field-guide-progress' },
  ),
);
