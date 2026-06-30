'use client';

import { useState } from 'react';

/** Props for {@link RegionCard}. */
export interface RegionCardProps {
  /** Emoji landmark for the region, shown large on the left. */
  emoji: string;
  /** Region title (bold). */
  title: string;
  /** Short, evocative description (muted, 1-2 lines). */
  description: string;
  /** Total number of missions in the region. */
  missionCount: number;
  /** Number of completed missions in the region. */
  completedCount: number;
  /** World accent colour, used for the hover border and progress fill. */
  accent: string;
  /** Click handler — navigates to the region's mission map. */
  onClick: () => void;
}

/**
 * A horizontal, full-width region card used on the region-selection screen.
 *
 * Layout: large emoji on the left, title + description in the middle, and a
 * compact progress indicator (`completed/total` over a thin bar) on the right.
 * Sharp corners (no border radius) to match the field-guide style. On hover the
 * 1px border switches from the neutral token to the world's accent colour.
 */
export function RegionCard({
  emoji,
  title,
  description,
  missionCount,
  completedCount,
  accent,
  onClick,
}: RegionCardProps) {
  const [hovered, setHovered] = useState(false);
  const pct = missionCount > 0 ? Math.round((completedCount / missionCount) * 100) : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={`${title} — ${completedCount} of ${missionCount} missions complete`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-md)',
        width: '100%',
        textAlign: 'left',
        padding: 'var(--spacing-md)',
        background: 'var(--color-surface)',
        color: 'var(--color-text)',
        border: `1px solid ${hovered ? accent : 'var(--color-border)'}`,
        borderRadius: 0,
        cursor: 'pointer',
        transition: 'border-color 150ms ease',
      }}
    >
      {/* Left: emoji landmark. */}
      <span style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }} aria-hidden="true">
        {emoji}
      </span>

      {/* Middle: title + description. */}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontWeight: 700, fontSize: '1rem' }}>{title}</span>
        <span
          style={{
            display: 'block',
            fontSize: '0.82rem',
            color: 'var(--color-text-dim)',
            marginTop: '0.2rem',
            lineHeight: 1.35,
          }}
        >
          {description}
        </span>
      </span>

      {/* Right: progress indicator. */}
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.35rem',
          flexShrink: 0,
          minWidth: '72px',
        }}
      >
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dim)' }}>
          {completedCount}/{missionCount}
        </span>
        <span
          aria-hidden="true"
          style={{
            display: 'block',
            width: '64px',
            height: '4px',
            background: 'var(--color-border)',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              display: 'block',
              width: `${pct}%`,
              height: '100%',
              background: accent,
              transition: 'width 200ms ease',
            }}
          />
        </span>
      </span>
    </button>
  );
}

export default RegionCard;
