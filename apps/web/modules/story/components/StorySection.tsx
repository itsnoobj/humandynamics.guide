export type StorySectionType =
  'situation' | 'story' | 'contrast' | 'principle' | 'psychology' | 'trap' | 'move';

export interface StorySectionProps {
  /** Which kind of section this is; drives the header label and styling. */
  type: StorySectionType;
  /** Optional override for the section header label. */
  title?: string;
  /** Section body text; blank lines split it into paragraphs. */
  content: string;
}

/** Renders one labelled section of a chapter with type-aware styling. */
export function StorySection({ type, title, content }: StorySectionProps) {
  const isPrinciple = type === 'principle';
  const paragraphs = content.split(/\n{2,}/).filter((p) => p.trim().length > 0);

  return (
    <section style={{ marginBottom: 'var(--spacing-xl, 2.5rem)' }}>
      <h2
        style={{
          fontSize: isPrinciple ? '1.3rem' : '1.1rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: isPrinciple ? 'var(--color-gold)' : 'var(--color-text-dim)',
          margin: '0 0 var(--spacing-sm)',
        }}
      >
        {title ?? type}
      </h2>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          style={{
            fontSize: isPrinciple ? '1.2rem' : '1rem',
            fontWeight: isPrinciple ? 600 : 400,
            fontStyle: isPrinciple ? 'italic' : 'normal',
            lineHeight: 1.7,
            margin: '0 0 var(--spacing-md)',
            color: isPrinciple ? 'var(--color-gold)' : 'var(--color-text)',
          }}
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}
