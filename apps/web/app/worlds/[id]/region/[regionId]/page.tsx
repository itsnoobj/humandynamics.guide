'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { WorldMap } from '@/modules/map';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { getWorld, availableChapterIds } from '@/lib/hierarchy';
import { useProgressStore } from '@/store/progressStore';

/** localStorage flag set by the result page before routing back to a region. */
const UNLOCK_FLAG = 'pathUnlocked';

function RegionPageInner() {
  const params = useParams();
  const rawWorldId = Array.isArray(params.id) ? params.id[0] : params.id;
  const rawRegionId = Array.isArray(params.regionId) ? params.regionId[0] : params.regionId;

  const world = getWorld(rawWorldId ?? '');
  const region = world?.regions.find((r) => r.id === rawRegionId);

  const completedChapters = useProgressStore((state) => state.completedChapters);
  const [showUnlocked, setShowUnlocked] = useState<{ from: string; to: string } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !region) return;
    if (localStorage.getItem(UNLOCK_FLAG) !== 'true') return;

    localStorage.removeItem(UNLOCK_FLAG);

    const missionIds = region.missions;
    const lastCompletedId = completedChapters[completedChapters.length - 1];
    const fromId =
      lastCompletedId && missionIds.includes(lastCompletedId) ? lastCompletedId : undefined;
    const toId = missionIds.find((id) => !completedChapters.includes(id));

    if (fromId && toId) {
      setShowUnlocked({ from: `Mission ${fromId}`, to: `Mission ${toId}` });
    }
  }, [region, completedChapters]);

  if (!world || !region) {
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
          That region doesn&apos;t exist.
        </p>
      </main>
    );
  }

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
        <Link
          href={`/worlds/${world.id}`}
          style={{ color: 'var(--color-text)', fontSize: '0.9rem' }}
        >
          ← {world.worldName}
        </Link>

        <header style={{ textAlign: 'center', margin: 'var(--spacing-md) 0 var(--spacing-lg)' }}>
          <div style={{ fontSize: '2.4rem', lineHeight: 1 }} aria-hidden="true">
            {region.emoji}
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.4rem 0 0' }}>
            <span style={{ color: world.accent }}>{region.title}</span>
          </h1>
          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--color-text-dim)',
              marginTop: '0.35rem',
              maxWidth: '480px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {region.description}
          </p>
        </header>

        <WorldMap
          region={region}
          accent={world.accent}
          worldId={world.id}
          regionId={region.id}
          showUnlocked={showUnlocked}
          onUnlockedDone={() => setShowUnlocked(null)}
          availableIds={[...availableChapterIds]}
        />
      </div>
    </main>
  );
}

export default function RegionPage() {
  return (
    <Suspense fallback={null}>
      <RegionPageInner />
    </Suspense>
  );
}
