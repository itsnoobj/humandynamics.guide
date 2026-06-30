'use client';

export interface ResultCTAProps {
  onContinue: () => void;
  fromGame: boolean;
  onGoToMap?: () => void;
  onGoToGame?: () => void;
  onShare?: () => void;
}

export function ResultCTA({
  onContinue,
  fromGame,
  onGoToMap,
  onGoToGame,
  onShare,
}: ResultCTAProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
        marginTop: 'var(--spacing-lg)',
      }}
    >
      {/* Primary CTA — context-aware */}
      <button
        type="button"
        onClick={onContinue}
        style={{
          width: '100%',
          padding: 'var(--spacing-md) var(--spacing-lg)',
          border: 'none',
          borderRadius: 'var(--radius)',
          backgroundColor: 'var(--color-text)',
          color: 'var(--color-bg)',
          fontFamily: 'var(--font-primary)',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {fromGame ? 'Continue Running →' : 'Back to Map'}
      </button>

      {fromGame && (
        <p
          style={{
            margin: 0,
            textAlign: 'center',
            fontSize: '0.8rem',
            fontStyle: 'italic',
            color: 'var(--color-text-dim)',
          }}
        >
          Obstacle cleared — next one awaits
        </p>
      )}

      {!fromGame && (
        <p
          style={{
            margin: 0,
            textAlign: 'center',
            fontSize: '0.8rem',
            fontStyle: 'italic',
            color: 'var(--color-text-dim)',
          }}
        >
          Next chapter unlocked on the map
        </p>
      )}

      {/* Secondary: the OTHER option */}
      <button
        type="button"
        onClick={fromGame ? onGoToMap : onGoToGame}
        style={{
          width: '100%',
          padding: 'var(--spacing-md) var(--spacing-lg)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius)',
          backgroundColor: 'transparent',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-primary)',
          fontSize: '0.9rem',
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        {fromGame ? 'Or explore the Map' : 'Or play the Game →'}
      </button>

      {/* Share */}
      <button
        type="button"
        onClick={onShare}
        style={{
          width: '100%',
          padding: 'var(--spacing-sm) var(--spacing-lg)',
          border: 'none',
          borderRadius: 'var(--radius)',
          backgroundColor: 'transparent',
          color: 'var(--color-text-dim)',
          fontFamily: 'var(--font-primary)',
          fontSize: '0.85rem',
          fontWeight: 400,
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        Share this principle
      </button>
    </div>
  );
}

export default ResultCTA;
