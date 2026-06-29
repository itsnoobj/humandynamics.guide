'use client';

import { PrincipleReveal, ReflectionPrompt, ResultCTA } from '@/modules/result';
import { useRouter, useSearchParams } from 'next/navigation';
import quizData from '../../../../content/chapters/part-02/31.quiz.json';

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromGame = searchParams.get('from') === 'game';

  const handleContinue = () => {
    if (fromGame) {
      router.push('/game?resume=1');
    } else {
      router.push('/map');
    }
  };

  return (
    <main className="max-w-[480px] mx-auto px-6 py-16 text-center">
      <PrincipleReveal text={quizData.principle.text} subtext={quizData.principle.subtext} />
      <ReflectionPrompt question={quizData.reflection} />
      <ResultCTA onContinue={handleContinue} fromGame={fromGame} />
    </main>
  );
}
