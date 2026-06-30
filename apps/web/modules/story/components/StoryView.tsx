import { StorySection, type StorySectionProps } from './StorySection';

interface StoryViewProps {
  /** Chapter title rendered as the page heading. */
  title: string;
  /** Ordered sections that make up the chapter body. */
  sections: StorySectionProps[];
}

/** Renders a chapter title and its ordered story sections. */
export function StoryView({ title, sections }: StoryViewProps) {
  return (
    <article>
      <h1
        style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          margin: '0 0 var(--spacing-xl, 2.5rem)',
          color: 'var(--color-text)',
        }}
      >
        {title}
      </h1>
      {sections.map((section, index) => (
        <StorySection key={index} {...section} />
      ))}
    </article>
  );
}
