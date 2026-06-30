'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { findChapterLocation } from '@/lib/hierarchy';

/** Props for {@link ChapterRedirect}. */
interface ChapterRedirectProps {
  /** Chapter/mission id to redirect to its hierarchical location. */
  id: string;
}

function ChapterRedirectInner({ id }: ChapterRedirectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const location = findChapterLocation(id);

    // Preserve any remaining query params (e.g. `from=game`) so the back/quiz
    // navigation in the new route keeps working.
    const query = new URLSearchParams();
    searchParams.forEach((value, key) => {
      // `world`/`region` were only used by the old flat route; the new route
      // encodes them in the path, so drop them.
      if (key === 'world' || key === 'region') return;
      query.append(key, value);
    });
    const qs = query.toString();

    const target = location
      ? `/worlds/${location.worldId}/region/${location.regionId}/mission/${id}`
      : '/worlds';

    router.replace(qs ? `${target}?${qs}` : target);
  }, [router, searchParams, id]);

  return null;
}

/**
 * Client redirect from the legacy `/chapter/{id}` route to the hierarchical
 * mission route. Looks up the chapter's world/region in the hierarchy and
 * redirects, preserving query params. Runs client-side so the page can be
 * statically exported. Wrapped in Suspense because it reads search params.
 */
export function ChapterRedirect(props: ChapterRedirectProps) {
  return (
    <Suspense fallback={null}>
      <ChapterRedirectInner {...props} />
    </Suspense>
  );
}
