'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { WorldMap } from '@/modules/map';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { getWorld, worldMissionIds } from '@/lib/hierarchy';
import { useProgressStore } from '@/store/progressStore';

/** localStorage flag set by the result page before routing back to a world. */
const UNLOCK_FLAG = 'pathUnlocked';

function WorldPageInner() {
  const params = useParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const world = getWorld(rawId ?? '');

  const completedChapters = useProgressStore((state) => state.completedChapters);
  const [showUnlocked, setShowUnlocked] = useState<{ from: string; to: string } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !world) return;
    if (localStorage.getItem(UNLOCK_FLAG) !== 'true') return;

    // Consume the flag immediately so a refresh doesn't replay the animation.
    localStorage.removeItem(UNLOCK_FLAG);

    const missionIds = worldMissionIds(world);
    const lastCompletedId = completedChapters[completedChapters.length - 1];
    const fromId =
      lastCompletedId && missionIds.includes(lastCompletedId) ? lastCompletedId : undefined;
    const toId = missionIds.find((id) => !completedChapters.includes(id));

    if (fromId && toId) {
      setShowUnlocked({ from: `Mission ${fromId}`, to: `Mission ${toId}` });
    }
  }, [world, completedChapters]);

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

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      <ThemeToggle />
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: 'var(--spacing-lg)' }}>
        <Link href="/worlds" style={{ color: 'var(--color-text)', fontSize: '0.9rem' }}>
          ← Worlds
        </Link>

        <header style={{ textAlign: 'center', margin: 'var(--spacing-md) 0 var(--spacing-lg)' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>
            <span style={{ color: world.accent }}>{world.worldName}</span>
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-dim)', marginTop: '0.25rem' }}>
            {world.title}
          </p>
        </header>

        {hasContent ? (
          <WorldMap
            regions={world.regions}
            accent={world.accent}
            showUnlocked={showUnlocked}
            onUnlockedDone={() => setShowUnlocked(null)}
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
 * Per-world overworld map. Reads the world id from the route, loads its
 * regions/missions from the hierarchy, and renders the {@link WorldMap} driven
 * by that data. Shows a "Path Unlocked" celebration when arriving from a freshly
 * completed mission.
 */
export default function WorldPage() {
  return (
    <Suspense fallback={null}>
      <WorldPageInner />
    </Suspense>
  );
}
