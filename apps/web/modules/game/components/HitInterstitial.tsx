'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface HitInterstitialProps {
  /** Chapter title shown beneath the headline. */
  title: string;
  /** The dilemma/problem statement, shown as a short question/description. */
  situation: string;
  /**
   * Called when the player commits to reading the chapter. If provided, it runs
   * before navigation and can cancel it by returning `false`.
   */
  onContinue?: () => void | boolean;
  /** Chapter id, forwarded as a query param so the chapter page can deep-link. */
  chapterId?: string;
}

// Hardcoded colors: this always renders on a dark overlay, so it must stay
// readable regardless of the active light/dark theme. Do NOT swap these for
// theme variables (var(--color-text) flips to near-black in light mode).
const GOLD = '#DAA520';
const WHITE = '#FFFFFF';
const GREY = '#CCCCCC';

/** Keyframes for the game-event entrance. Injected once via a <style> tag. */
const KEYFRAMES = `
@keyframes hit-backdrop-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes hit-slam-in {
  0%   { transform: scale(1.5); opacity: 0; }
  60%  { opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes hit-rise-in {
  from { transform: translateY(12px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
`;

/**
 * Full-screen game-event takeover shown when the runner enters the `hit` phase.
 *
 * Deliberately not a card/dialog box: the whole screen goes solid-dark and the
 * content sits directly on the backdrop. The "⚡ OBSTACLE HIT" headline slams in
 * with a glowing gold text-shadow, followed by the mission title and situation.
 * A single outlined call-to-action routes to the chapter reader
 * (`/chapter?from=game`).
 */
export function HitInterstitial({ title, situation, onContinue, chapterId }: HitInterstitialProps) {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const handleContinue = () => {
    const proceed = onContinue?.();
    if (proceed === false) return;

    const params = new URLSearchParams({ from: 'game' });
    if (chapterId) params.set('chapter', chapterId);
    router.push(`/chapter?${params.toString()}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hit-title"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.9)',
        zIndex: 20,
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        textAlign: 'center',
        padding: '1.5rem',
        animation: 'hit-backdrop-in 0.2s ease-out',
      }}
    >
      <style>{KEYFRAMES}</style>

      <div
        aria-hidden="true"
        style={{
          color: GOLD,
          fontSize: '1.5rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          textShadow:
            '0 0 6px rgba(218, 165, 32, 0.9), 0 0 16px rgba(218, 165, 32, 0.7), 0 0 32px rgba(218, 165, 32, 0.45)',
          animation: 'hit-slam-in 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}
      >
        ⚡ Obstacle Hit
      </div>

      <div
        aria-hidden="true"
        style={{
          width: '60px',
          height: '2px',
          background: GOLD,
          margin: '1rem auto',
          animation: 'hit-rise-in 0.35s ease-out 0.1s both',
        }}
      />

      <h2
        id="hit-title"
        style={{
          margin: 0,
          color: WHITE,
          fontSize: '1.3rem',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          animation: 'hit-rise-in 0.35s ease-out 0.15s both',
        }}
      >
        {title}
      </h2>

      <p
        style={{
          margin: '0.85rem auto 0',
          maxWidth: '400px',
          color: GREY,
          fontSize: '0.95rem',
          lineHeight: 1.55,
          animation: 'hit-rise-in 0.35s ease-out 0.22s both',
        }}
      >
        {situation}
      </p>

      <button
        type="button"
        onClick={handleContinue}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        style={{
          marginTop: '2rem',
          padding: '0.8rem 1.6rem',
          background: hover ? GOLD : 'transparent',
          color: hover ? '#0D0D0D' : GOLD,
          border: `2px solid ${GOLD}`,
          borderRadius: '0px',
          fontSize: '1rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'background 0.18s ease, color 0.18s ease',
          animation: 'hit-rise-in 0.35s ease-out 0.3s both',
        }}
      >
        Accept the Challenge →
      </button>
    </div>
  );
}
