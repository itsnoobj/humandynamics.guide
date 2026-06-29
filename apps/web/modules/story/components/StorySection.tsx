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
    <section style={{ marginBottom: 'var(--spacing-lg)' }}>
      <h2
        style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-text-dim)',
          margin: '0 0 var(--spacing-sm)',
        }}
      >
        {title ?? type}
      </h2>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          style={{
            fontSize: isPrinciple ? '1.15rem' : '1rem',
            fontWeight: isPrinciple ? 600 : 400,
            lineHeight: 1.7,
            margin: '0 0 var(--spacing-md)',
            color: 'var(--color-text)',
          }}
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}
