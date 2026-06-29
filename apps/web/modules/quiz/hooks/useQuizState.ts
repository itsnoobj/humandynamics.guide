'use client';

import { useCallback, useMemo, useState } from 'react';

/** A single recorded answer for a challenge. */
export interface QuizAnswer {
  /** Whether the learner ultimately answered correctly. */
  correct: boolean;
}

/** State and actions for stepping through a sequence of quiz challenges. */
export interface QuizState {
  /** Index of the challenge currently being shown. */
  currentIndex: number;
  /** Recorded answers, one per completed challenge. */
  answers: QuizAnswer[];
  /** Number of challenges answered correctly. */
  score: number;
  /** Record an answer for the current challenge. */
  answer: (correct: boolean) => void;
  /** Advance to the next challenge. */
  next: () => void;
  /** Whether every challenge has been completed. */
  isComplete: () => boolean;
}

/**
 * Tracks progress through a fixed number of quiz challenges.
 * Keeps the current index, the list of answers, and a derived score.
 */
export function useQuizState(total: number): QuizState {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const score = useMemo(() => answers.filter((a) => a.correct).length, [answers]);

  const answer = useCallback((correct: boolean) => {
    setAnswers((prev) => [...prev, { correct }]);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => i + 1);
  }, []);

  const isComplete = useCallback(() => currentIndex >= total, [currentIndex, total]);

  return { currentIndex, answers, score, answer, next, isComplete };
}
