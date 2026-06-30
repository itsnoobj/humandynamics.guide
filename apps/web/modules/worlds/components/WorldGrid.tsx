'use client';

import { useProgressStore } from '@/store/progressStore';
import type { World } from '@/lib/hierarchy';
import { WorldCard } from './WorldCard';

/** Props for {@link WorldGrid}. */
export interface WorldGridProps {
  /** Worlds from the hierarchy, rendered in order. */
  worlds: World[];
}

/** Ordered mission ids across all of a world's regions. */
function missionIds(world: World): string[] {
  return world.regions.flatMap((region) => region.missions);
}

/** A world is complete when it has missions and all of them are completed. */
function isWorldComplete(world: World, completed: Set<string>): boolean {
  const missions = missionIds(world);
  return missions.length > 0 && missions.every((id) => completed.has(id));
}

/** Completion percentage (0–100) for a world; 0 for worlds with no missions. */
function worldProgress(world: World, completed: Set<string>): number {
  const missions = missionIds(world);
  if (missions.length === 0) return 0;
  const done = missions.filter((id) => completed.has(id)).length;
  return Math.round((done / missions.length) * 100);
}

/**
 * Responsive grid of {@link WorldCard}s (two columns on desktop, one on
 * mobile). The first world is always unlocked; every other world unlocks only
 * once the previous world is fully complete. Progress per world is derived from
 * the persisted progress store.
 */
export function WorldGrid({ worlds }: WorldGridProps) {
  const completedChapters = useProgressStore((state) => state.completedChapters);
  const completed = new Set(completedChapters);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 'var(--spacing-md)',
      }}
    >
      {worlds.map((world, index) => {
        const previous = index > 0 ? worlds[index - 1] : undefined;
        const locked = index > 0 && !(previous && isWorldComplete(previous, completed));
        const progress = worldProgress(world, completed);

        return (
          <WorldCard
            key={world.id}
            id={world.id}
            worldName={world.worldName}
            title={world.title}
            accent={world.accent}
            landscape={world.landscape}
            locked={locked}
            progress={progress}
          />
        );
      })}
    </div>
  );
}

export default WorldGrid;
