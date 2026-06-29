'use client';

import { useProgressStore } from '@/store/progressStore';
import { mapNodes } from '../data/mapNodes';
import type { MapNodeStatus } from '../components/MapNode';

/** Map of node id → its computed status. */
export type NodeStatusMap = Record<number, MapNodeStatus>;

/**
 * Hardcoded fallback progression used until the progress store is populated:
 * first three chapters done, node 4 current, the rest locked.
 */
const FALLBACK_STATUS: NodeStatusMap = {
  1: 'done',
  2: 'done',
  3: 'done',
  4: 'current',
  5: 'locked',
  6: 'locked',
  7: 'locked',
};

/**
 * Derives each node's status from the progress store.
 *
 * Completed chapters render as `done`. The first non-completed node in map
 * order becomes `current`; everything after it is `locked`. When the store is
 * empty we fall back to a sensible demo progression (see {@link FALLBACK_STATUS}).
 */
export function useMapProgress(): NodeStatusMap {
  const completedChapters = useProgressStore((state) => state.completedChapters);

  if (completedChapters.length === 0) {
    return FALLBACK_STATUS;
  }

  const statuses: NodeStatusMap = {};
  let currentAssigned = false;

  for (const node of mapNodes) {
    if (completedChapters.includes(node.chapterId)) {
      statuses[node.id] = 'done';
    } else if (!currentAssigned) {
      statuses[node.id] = 'current';
      currentAssigned = true;
    } else {
      statuses[node.id] = 'locked';
    }
  }

  return statuses;
}
