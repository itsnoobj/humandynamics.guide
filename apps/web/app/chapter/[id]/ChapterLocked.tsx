'use client';

import Link from 'next/link';

interface ChapterLockedProps {
  id: string;
  world?: string;
  region?: string;
}

/**
 * Shown when a chapter doesn't have content yet. Friendly "coming soon"
 * instead of a harsh 404.
 */
export function ChapterLocked({ id, world, region }: ChapterLockedProps) {
  const backHref = world && region ? `/worlds/${world}/region/${region}` : '/worlds';

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
        Chapter {id}
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
