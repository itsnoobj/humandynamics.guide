'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/** Default chapter for the legacy `/quiz` route. */
const DEFAULT_CHAPTER_ID = '31';

function LegacyQuizRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('chapter') || DEFAULT_CHAPTER_ID;

    const query = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key === 'chapter') return;
      query.append(key, value);
    });

    const qs = query.toString();
    router.replace(qs ? `/quiz/${id}?${qs}` : `/quiz/${id}`);
  }, [router, searchParams]);

  return null;
}

/**
 * Legacy `/quiz` route, kept for backwards compatibility.
 *
 * The quiz page is now dynamic at `/quiz/{id}`. This client route redirects to
 * a concrete id: the `chapter` query param when present, otherwise the default
 * chapter. Remaining query params (e.g. `from`) are preserved so the quiz →
 * result flow keeps working. The redirect runs client-side so the page can be
 * statically exported.
 */
export default function LegacyQuizPage() {
  return (
    <Suspense fallback={null}>
      <LegacyQuizRedirect />
    </Suspense>
  );
}
