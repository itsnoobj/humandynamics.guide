'use client';

import { Suspense, useEffect } from 'react';
import { PrincipleReveal, ReflectionPrompt, ResultCTA } from '@/modules/result';
import { useRouter, useSearchParams } from 'next/navigation';
import { quiz31 as quizData, chapter31 as chapterData } from '@/lib/content';
import { useProgressStore } from '@/store/progressStore';

/** The chapter this result screen completes. */
const CURRENT_CHAPTER_ID = '31';

function ResultPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromGame = searchParams.get('from') === 'game';
  const completeChapter = useProgressStore((state) => state.completeChapter);

  // Reaching the result screen means the quiz is complete: mark the chapter
  // done so the world map updates the node to 'done' on return.
  useEffect(() => {
    completeChapter(CURRENT_CHAPTER_ID);
  }, [completeChapter]);

  const handleContinue = () => {
    if (fromGame) {
      router.push('/game?resume=1');
    } else {
      router.push('/map');
    }
  };

  const handleGoToMap = () => router.push('/map');
  const handleGoToGame = () => router.push('/game');

  const totalCount = quizData.challenges.length;

  return (
    <main className="max-w-[480px] mx-auto px-6 py-16 text-center">
      <PrincipleReveal
        text={quizData.principle.text}
        subtext={quizData.principle.subtext}
        correctCount={totalCount}
        totalCount={totalCount}
        readTime="~5 min read"
        chapterNumber={CURRENT_CHAPTER_ID}
        chapterTitle={chapterData.title}
      />
      <ReflectionPrompt question={quizData.reflection} />
      <ResultCTA
        onContinue={handleContinue}
        fromGame={fromGame}
        onGoToMap={handleGoToMap}
        onGoToGame={handleGoToGame}
      />
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultPageInner />
    </Suspense>
  );
}
