'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { PrincipleReveal, ReflectionPrompt, ResultCTA } from '@/modules/result';
import { useProgressStore } from '@/store/progressStore';

/** Pre-computed result data for a single chapter, built at static-export time. */
export interface ResultData {
  /** Chapter title shown alongside the achievement. */
  chapterTitle: string;
  /** The core principle text revealed on completion. */
  principleText: string;
  /** Supporting explanation beneath the principle. */
  principleSubtext: string;
  /** The reflection prompt for this chapter. */
  reflection: string;
  /** Total challenge count, used for the "n/n correct" badge. */
  totalCount: number;
  /** Region map route to return to (derived from the chapter's hierarchy). */
  mapHref: string;
}

/** Props for {@link ResultClient}, supplied by the server component. */
export interface ResultClientProps {
  /** Result data for every chapter, keyed by chapter id. */
  results: Record<string, ResultData>;
}

function ResultClientInner({ results }: ResultClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chapterId = searchParams.get('chapter') ?? '';
  const fromGame = searchParams.get('from') === 'game';
  const completeChapter = useProgressStore((state) => state.completeChapter);

  const data = chapterId ? results[chapterId] : undefined;

  // Reaching the result screen means the quiz is complete: mark the chapter
  // done so the world map updates the node to 'done' on return.
  useEffect(() => {
    if (chapterId && data) {
      completeChapter(chapterId);
    }
  }, [completeChapter, chapterId, data]);

  if (!data) {
    return (
      <main className="max-w-[480px] mx-auto px-6 py-16 text-center">
        <p style={{ color: 'var(--color-text-dim)' }}>
          No result to show. Choose a chapter to begin.
        </p>
      </main>
    );
  }

  const handleContinue = () => {
    if (fromGame) {
      router.push('/game?resume=1');
    } else {
      // Signal the region map to celebrate the path that just opened up.
      localStorage.setItem('pathUnlocked', 'true');
      router.push(data.mapHref);
    }
  };

  const handleGoToMap = () => {
    localStorage.setItem('pathUnlocked', 'true');
    router.push(data.mapHref);
  };
  const handleGoToGame = () => router.push('/game');

  return (
    <main
      className="max-w-[480px] mx-auto px-6 py-16 text-center"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <PrincipleReveal
        text={data.principleText}
        subtext={data.principleSubtext}
        correctCount={data.totalCount}
        totalCount={data.totalCount}
        readTime="~5 min read"
        chapterNumber={chapterId}
        chapterTitle={data.chapterTitle}
      />
      <ReflectionPrompt question={data.reflection} />
      <ResultCTA
        onContinue={handleContinue}
        fromGame={fromGame}
        onGoToMap={handleGoToMap}
        onGoToGame={handleGoToGame}
      />
    </main>
  );
}

/**
 * Client shell for the result screen. Receives the build-time result data map
 * as props, reads the `chapter` (and `from`) query params from the URL, and
 * handles the interactive completion flow (progress store + routing). Wrapped
 * in Suspense because it reads search params.
 */
export function ResultClient(props: ResultClientProps) {
  return (
    <Suspense fallback={null}>
      <ResultClientInner {...props} />
    </Suspense>
  );
}
