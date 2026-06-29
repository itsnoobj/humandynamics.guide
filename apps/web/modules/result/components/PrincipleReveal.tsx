'use client';

import { useEffect, useState } from 'react';

export interface PrincipleRevealProps {
  /** The core principle the chapter reinforces. */
  text: string;
  /** Supporting explanation shown beneath the principle. */
  subtext: string;
}

/**
 * Reveals a chapter's principle with a gold star that scales in on mount.
 *
 * The star animates from scale(0) to scale(1) using a CSS transition keyed off
 * a `mounted` state flag, so the animation runs once when the component appears.
 */
export function PrincipleReveal({ text, subtext }: PrincipleRevealProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer to the next frame so the transition has an initial (scale 0) state
    // to animate away from.
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 'var(--spacing-md)',
      }}
    >
      <span
        role="img"
        aria-label="gold star"
        style={{
          fontSize: '3.5rem',
          lineHeight: 1,
          color: 'var(--color-gold)',
          display: 'inline-block',
          transform: mounted ? 'scale(1)' : 'scale(0)',
          transition: 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        ⭐
      </span>

      <p
        style={{
          fontSize: '1.3rem',
          fontWeight: 500,
          margin: 0,
          color: 'var(--color-text)',
        }}
      >
        {text}
      </p>

      <p
        style={{
          fontSize: '0.95rem',
          margin: 0,
          color: 'var(--color-text-dim)',
          maxWidth: '40ch',
        }}
      >
        {subtext}
      </p>
    </div>
  );
}

export default PrincipleReveal;
