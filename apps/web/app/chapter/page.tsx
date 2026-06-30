'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/** Default chapter for the legacy `/chapter` route. */
const DEFAULT_CHAPTER_ID = '31';

function LegacyChapterRedirect() {
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
    router.replace(qs ? `/chapter/${id}?${qs}` : `/chapter/${id}`);
  }, [router, searchParams]);

  return null;
}

/**
 * Legacy `/chapter` route, kept for backwards compatibility.
 *
 * The chapter page is now dynamic at `/chapter/{id}`. This client route
 * redirects to a concrete id: the `chapter` query param when present (older
 * links such as the in-game interstitial used `?chapter={id}`), otherwise the
 * default chapter. Any remaining query params (e.g. `from`, `world`, `region`)
 * are preserved so the back/quiz navigation continues to work. The redirect
 * runs client-side so the page can be statically exported.
 */
export default function LegacyChapterPage() {
  return (
    <Suspense fallback={null}>
      <LegacyChapterRedirect />
    </Suspense>
  );
}
