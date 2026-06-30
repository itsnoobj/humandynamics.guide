'use client';

import Link from 'next/link';

interface MissionLockedProps {
  /** Owning world id (route param). */
  worldId: string;
  /** Owning region id (route param). */
  regionId: string;
  /** Mission id (route param). */
  missionId: string;
}

/**
 * Shown when a mission doesn't have content yet. Friendly "coming soon"
 * instead of a harsh 404. The back link returns to the owning region map,
 * derived from the URL path.
 */
export function MissionLocked({ worldId, regionId, missionId }: MissionLockedProps) {
  const backHref = `/worlds/${worldId}/region/${regionId}`;

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Chapter {missionId}
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: 'var(--color-text-dim)',
          maxWidth: '360px',
          marginBottom: '2rem',
        }}
      >
        This story is being written. Check back soon.
      </p>
      <Link
        href={backHref}
        style={{
          padding: '0.75rem 1.5rem',
          border: '2px solid var(--color-border)',
          borderRadius: 'var(--radius)',
          color: 'var(--color-text)',
          fontSize: '0.9rem',
          textDecoration: 'none',
        }}
      >
        ← Back to Map
      </Link>
    </main>
  );
}
