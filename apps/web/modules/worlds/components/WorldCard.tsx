'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

/** Props for {@link WorldCard}. */
export interface WorldCardProps {
  /** Numeric world id, used for the `/worlds/[id]` route. */
  id: number;
  /** Evocative world name shown prominently (e.g. "The Mirror"). */
  worldName: string;
  /** Theme title shown muted below the name. */
  title: string;
  /** Accent colour (hex) for the border, number, and progress fill. */
  accent: string;
  /** Landscape hint (shown as a small caption). */
  landscape: string;
  /** When true, the card is greyed out and not clickable. */
  locked: boolean;
  /** Completion percentage (0–100) for the progress bar. */
  progress: number;
}

/**
 * A selectable world tile for the world-select screen.
 *
 * Unlocked cards border in the world's accent colour, brighten on hover, and
 * navigate to `/worlds/[id]` on click. Locked cards are dimmed, show a lock
 * icon, and ignore clicks. A progress bar at the bottom reflects completion.
 */
export function WorldCard({
  id,
  worldName,
  title,
  accent,
  landscape,
  locked,
  progress,
}: WorldCardProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (!locked) router.push(`/worlds/${id}`);
  };

  const borderColor = locked ? 'var(--color-border)' : hovered ? accent : 'var(--color-border)';

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={locked}
      aria-label={locked ? `${worldName} — ${title} (locked)` : `${worldName} — ${title}`}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        gap: 'var(--spacing-sm)',
        width: '100%',
        padding: 'var(--spacing-lg)',
        border: `2px solid ${borderColor}`,
        borderRadius: 'var(--radius)',
        background: 'var(--color-surface)',
        color: 'var(--color-text)',
        cursor: locked ? 'not-allowed' : 'pointer',
        opacity: locked ? 0.5 : 1,
        transition: 'border-color 150ms ease, transform 150ms ease',
        transform: !locked && hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {locked && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 'var(--spacing-md)',
            right: 'var(--spacing-md)',
            fontSize: '1.1rem',
            color: 'var(--color-text-dim)',
          }}
        >
          🔒
        </span>
      )}

      <span
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          lineHeight: 1,
          color: locked ? 'var(--color-text-dim)' : accent,
        }}
      >
        {id}
      </span>

      <span style={{ fontSize: '1.15rem', fontWeight: 700 }}>{worldName}</span>

      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>{title}</span>

      <span
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-text-dim)',
        }}
      >
        {landscape}
      </span>

      <div
        aria-hidden="true"
        style={{
          width: '100%',
          height: '6px',
          marginTop: 'var(--spacing-sm)',
          background: 'var(--color-border)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${Math.max(0, Math.min(100, progress))}%`,
            height: '100%',
            background: locked ? 'var(--color-text-dim)' : accent,
            transition: 'width 300ms ease',
          }}
        />
      </div>
    </button>
  );
}

export default WorldCard;
