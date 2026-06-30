'use client';

import { useRouter } from 'next/navigation';
import { useProgressStore } from '@/store/progressStore';
import type { Region } from '@/lib/hierarchy';
import { RegionCard } from './RegionCard';

/** Props for {@link RegionList}. */
export interface RegionListProps {
  /** The owning world's id, used to build region routes. */
  worldId: number;
  /** Regions to render, in order. */
  regions: Region[];
  /** World accent colour, threaded through to each card. */
  accent: string;
}

/**
 * The region-selection list for a world. Renders each region as a stacked,
 * full-width {@link RegionCard}. Completion counts are derived from the
 * persisted progress store by intersecting each region's mission ids with the
 * set of completed chapters. Selecting a card routes to that region's mission
 * map at `/worlds/[worldId]/region/[regionId]`.
 */
export function RegionList({ worldId, regions, accent }: RegionListProps) {
  const router = useRouter();
  const completedChapters = useProgressStore((state) => state.completedChapters);
  const completed = new Set(completedChapters);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
      {regions.map((region) => {
        const completedCount = region.missions.filter((id) => completed.has(id)).length;
        return (
          <RegionCard
            key={region.id}
            emoji={region.emoji}
            title={region.title}
            description={region.description}
            missionCount={region.missions.length}
            completedCount={completedCount}
            accent={accent}
            onClick={() => router.push(`/worlds/${worldId}/region/${region.id}`)}
          />
        );
      })}
    </div>
  );
}

export default RegionList;
