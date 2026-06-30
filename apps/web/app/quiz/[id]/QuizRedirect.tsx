'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { findChapterLocation } from '@/lib/hierarchy';

/** Props for {@link QuizRedirect}. */
interface QuizRedirectProps {
  /** Quiz/mission id to redirect to its hierarchical location. */
  id: string;
}

function QuizRedirectInner({ id }: QuizRedirectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const location = findChapterLocation(id);

    // Preserve any remaining query params (e.g. `from=game`) so the quiz →
    // result flow keeps working.
    const query = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key === 'world' || key === 'region') return;
      query.append(key, value);
    });
    const qs = query.toString();

    const target = location
      ? `/worlds/${location.worldId}/region/${location.regionId}/mission/${id}/quiz`
      : '/worlds';

    router.replace(qs ? `${target}?${qs}` : target);
  }, [router, searchParams, id]);

  return null;
}

/**
 * Client redirect from the legacy `/quiz/{id}` route to the hierarchical quiz
 * route. Looks up the chapter's world/region in the hierarchy and redirects,
 * preserving query params. Runs client-side so the page can be statically
 * exported. Wrapped in Suspense because it reads search params.
 */
export function QuizRedirect(props: QuizRedirectProps) {
  return (
    <Suspense fallback={null}>
      <QuizRedirectInner {...props} />
    </Suspense>
  );
}
