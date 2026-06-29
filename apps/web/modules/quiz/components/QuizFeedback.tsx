'use client';

/** Props for {@link QuizFeedback}. */
export interface QuizFeedbackProps {
  /** Explanatory text to show the learner. */
  text: string;
  /** Whether the feedback relates to a correct answer. */
  isCorrect: boolean;
}

/**
 * A small feedback panel shown after an answer is chosen.
 * Surface background, rounded, with a left border colored by correctness.
 */
export function QuizFeedback({ text, isCorrect }: QuizFeedbackProps) {
  return (
    <div
      role="status"
      style={{
        borderLeft: `4px solid ${isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)'}`,
        background: 'var(--color-surface)',
        color: 'var(--color-text)',
        borderRadius: 'var(--radius)',
        padding: 'var(--spacing-md)',
      }}
    >
      {text}
    </div>
  );
}
