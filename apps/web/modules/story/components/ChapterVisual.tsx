interface ChapterVisualProps {
  /** Path to the chapter SVG illustration. */
  src: string;
  /** Accessible description of the illustration. */
  alt: string;
}

/**
 * Renders a chapter's hero SVG illustration full-width with a
 * bordered, rounded frame that adapts to the active theme.
 */
export function ChapterVisual({ src, alt }: ChapterVisualProps) {
  return (
    <figure
      style={{
        width: '100%',
        margin: 0,
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
    </figure>
  );
}
