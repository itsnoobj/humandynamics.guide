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
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: 1.2,
          margin: '0 0 var(--spacing-lg)',
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
