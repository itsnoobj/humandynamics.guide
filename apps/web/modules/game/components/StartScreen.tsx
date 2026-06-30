'use client';

import Link from 'next/link';

export interface StartScreenProps {
  /** Big title shown under the runner. */
  title?: string;
  /** Invoked when the player taps / presses space to start. */
  onStart: () => void;
}

/**
 * The idle-phase title screen. Rather than reading like a document, it frames
 * the moment right before a run: the stick-figure runner is poised mid-stride
 * on a ground line, with a preview of the obstacles ahead (pipe, block, spike).
 * Tapping anywhere — or pressing space/enter — starts the run; a small link
 * routes to the chapter map for players who'd rather browse.
 *
 * Colors are theme-aware via CSS variables so the screen reads well in both
 * light and dark modes.
 */
export function StartScreen({ title = 'Stories to navigate', onStart }: StartScreenProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Tap to run"
      onClick={onStart}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onStart();
        }
      }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        textAlign: 'center',
        cursor: 'pointer',
        zIndex: 10,
        padding: '1.5rem',
      }}
    >
      {/* Stick-figure runner, mid-stride. ~80px tall. */}
      <svg
        className="fg-game-runner"
        width="56"
        height="80"
        viewBox="0 0 56 80"
        fill="none"
        aria-hidden="true"
        stroke="var(--color-text)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* head */}
        <circle cx="30" cy="12" r="8" fill="none" />
        {/* torso, leaning forward into the run */}
        <line x1="29" y1="20" x2="24" y2="44" />
        {/* arms: front arm swung forward, back arm swung behind */}
        <line x1="27" y1="28" x2="40" y2="24" />
        <line x1="27" y1="28" x2="14" y2="34" />
        {/* legs: front leg reaching ahead, back leg pushing off */}
        <line x1="24" y1="44" x2="38" y2="56" />
        <line x1="38" y1="56" x2="44" y2="68" />
        <line x1="24" y1="44" x2="16" y2="60" />
        <line x1="16" y1="60" x2="20" y2="72" />
      </svg>

      <h1
        style={{
          margin: '1.25rem 0 0',
          maxWidth: '640px',
          fontSize: 'clamp(1.9rem, 6vw, 2.75rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--color-text)',
        }}
      >
        {title}
      </h1>

      {/* Ground line with a preview of the obstacles ahead. */}
      <svg
        width="280"
        height="48"
        viewBox="0 0 280 48"
        fill="none"
        aria-hidden="true"
        style={{ margin: '1.75rem 0 0', maxWidth: '90%' }}
      >
        {/* ground */}
        <line x1="0" y1="30" x2="280" y2="30" stroke="var(--color-text-dim)" strokeWidth={2} />

        {/* pipe */}
        <rect
          x="70"
          y="14"
          width="16"
          height="16"
          fill="var(--color-surface)"
          stroke="var(--color-gold)"
          strokeWidth={2}
        />
        {/* block */}
        <rect x="120" y="16" width="14" height="14" fill="var(--color-gold)" opacity={0.85} />
        {/* spike */}
        <path
          d="M196 30 L204 14 L212 30 Z"
          fill="var(--color-surface)"
          stroke="var(--color-gold)"
          strokeWidth={2}
        />
      </svg>

      <span
        className="fg-game-pulse"
        style={{
          marginTop: '2rem',
          color: 'var(--color-gold)',
          fontSize: '1.4rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
        }}
      >
        Tap to Run
      </span>

      <span
        style={{
          marginTop: '0.5rem',
          color: 'var(--color-text-dim)',
          fontSize: '0.8rem',
          letterSpacing: '0.04em',
        }}
      >
        or <strong style={{ fontWeight: 600 }}>SPACE</strong> to start
      </span>

      <Link
        href="/map"
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: '1.75rem',
          color: 'var(--color-text-dim)',
          fontSize: '0.85rem',
          textDecoration: 'none',
        }}
      >
        ← or explore the map
      </Link>

      <style>{`
        .fg-game-pulse {
          animation: fg-game-pulse 1.3s ease-in-out infinite;
        }
        @keyframes fg-game-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.04); }
        }
        .fg-game-runner {
          animation: fg-game-bob 0.6s ease-in-out infinite;
        }
        @keyframes fg-game-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fg-game-pulse, .fg-game-runner { animation: none; }
        }
      `}</style>
    </div>
  );
}
