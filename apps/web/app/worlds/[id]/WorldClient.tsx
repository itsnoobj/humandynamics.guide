'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { RegionMap } from '@/modules/worlds';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { getWorld } from '@/lib/hierarchy';
import { useProgressStore } from '@/store/progressStore';

/** A representative emoji per world, keyed by the world's numeric id. */
const WORLD_EMOJI: Record<number, string> = {
  1: '🪞',
  2: '🏘️',
  3: '🏕️',
  4: '⛰️',
  5: '🌀',
  6: '🌲',
  7: '🌉',
  8: '🏟️',
  9: '⚖️',
  10: '🌅',
};

function WorldPageInner() {
  const params = useParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const world = getWorld(rawId ?? '');
  const completedChapters = useProgressStore((state) => state.completedChapters);

  if (!world) {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
          padding: 'var(--spacing-lg)',
        }}
      >
        <ThemeToggle />
        <Link href="/worlds" style={{ color: 'var(--color-text)', fontSize: '0.9rem' }}>
          ← Worlds
        </Link>
        <p style={{ marginTop: 'var(--spacing-lg)', color: 'var(--color-text-dim)' }}>
          That world doesn&apos;t exist.
        </p>
      </main>
    );
  }

  const hasContent = world.regions.length > 0;
  const emoji = WORLD_EMOJI[world.id] ?? '🗺️';

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      <ThemeToggle />
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: 'var(--spacing-lg)' }}>
        <Link href="/worlds" style={{ color: 'var(--color-text)', fontSize: '0.9rem' }}>
          ← Worlds
        </Link>

        <header style={{ textAlign: 'center', margin: 'var(--spacing-md) 0 var(--spacing-lg)' }}>
          <div style={{ fontSize: '2.6rem', lineHeight: 1 }} aria-hidden="true">
            {emoji}
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0.5rem 0 0' }}>
            <span style={{ color: world.accent }}>{world.worldName}</span>
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-dim)', marginTop: '0.25rem' }}>
            {world.tagline}
          </p>
        </header>

        {hasContent ? (
          <RegionMap
            worldId={world.id}
            worldName={world.worldName}
            accent={world.accent}
            regions={world.regions}
            completedMissions={new Set(completedChapters)}
          />
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--color-text-dim)' }}>
            This world is still being charted. Check back soon.
          </p>
        )}
      </div>
    </main>
  );
}

/**
 * Region-selection screen for a world (level 2 of the navigation hierarchy).
 * Reads the world id from the route, then renders the world's regions as a
 * navigable SVG map of zones connected by squiggly roads. Selecting a region
 * drills into its mission map at `/worlds/[id]/region/[regionId]`.
 */
export function WorldClient() {
  return (
    <Suspense fallback={null}>
      <WorldPageInner />
    </Suspense>
  );
}
