'use client';

import { useEffect, useState } from 'react';
import { WorldMap, MapHeader, mapNodes } from '@/modules/map';
import { useProgressStore } from '@/store/progressStore';

/** localStorage flag set by the result page before routing back to the map. */
const UNLOCK_FLAG = 'pathUnlocked';

export default function MapPage() {
  const completedChapters = useProgressStore((state) => state.completedChapters);
  const [showUnlocked, setShowUnlocked] = useState<{ from: string; to: string } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(UNLOCK_FLAG) !== 'true') return;

    // Consume the flag immediately so a refresh doesn't replay the animation.
    localStorage.removeItem(UNLOCK_FLAG);

    // The path that just opened: the most recently completed node → the next
    // node still to be tackled (first node not yet completed).
    const lastCompletedId = completedChapters[completedChapters.length - 1];
    const fromNode = mapNodes.find((node) => node.chapterId === lastCompletedId);
    const toNode = mapNodes.find((node) => !completedChapters.includes(node.chapterId));

    if (fromNode && toNode) {
      setShowUnlocked({ from: fromNode.title, to: toNode.title });
    }
  }, [completedChapters]);

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      <MapHeader />
      <div className="max-w-[700px] mx-auto px-4 pb-8">
        <WorldMap showUnlocked={showUnlocked} onUnlockedDone={() => setShowUnlocked(null)} />
      </div>
    </main>
  );
}
