export interface ReflectionPromptProps {
  /** The reflection question posed to the learner. */
  question: string;
}

/**
 * A divider-led reflection block: an uppercase "Reflect" label above an
 * italicized question that invites the learner to apply the principle.
 */
export function ReflectionPrompt({ question }: ReflectionPromptProps) {
  return (
    <div
      style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: 'var(--spacing-lg)',
        marginTop: 'var(--spacing-lg)',
      }}
    >
      <p
        style={{
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontSize: '0.7rem',
          fontWeight: 600,
          color: 'var(--color-text-dim)',
          margin: '0 0 var(--spacing-sm)',
        }}
      >
        Reflect
      </p>
      <p
        style={{
          fontStyle: 'italic',
          fontSize: '1.05rem',
          color: 'var(--color-text)',
          margin: 0,
        }}
      >
        {question}
      </p>
    </div>
  );
}

export default ReflectionPrompt;
