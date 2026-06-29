'use client';

export interface ResultCTAProps {
  /** Invoked when the learner clicks the call-to-action. */
  onContinue: () => void;
  /** Whether the result was reached from the game (vs. the map). */
  fromGame: boolean;
}

/**
 * Full-width call-to-action shown at the end of a result screen.
 *
 * Label depends on entry point: returning to the game ("Continue Running →")
 * or back to the chapter map ("Back to Map ★").
 */
export function ResultCTA({ onContinue, fromGame }: ResultCTAProps) {
  const label = fromGame ? 'Continue Running →' : 'Back to Map ★';

  return (
    <button
      type="button"
      onClick={onContinue}
      style={{
        width: '100%',
        padding: 'var(--spacing-md) var(--spacing-lg)',
        border: 'none',
        borderRadius: 'var(--radius)',
        backgroundColor: 'var(--color-text)',
        color: 'var(--color-bg)',
        fontFamily: 'var(--font-primary)',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

export default ResultCTA;
