'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { findChapterLocation } from '@/lib/hierarchy';

/** Default chapter for the legacy `/result` route when no `chapter` is given. */
const DEFAULT_CHAPTER_ID = '31';

function LegacyResultRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('chapter') || DEFAULT_CHAPTER_ID;
    const location = findChapterLocation(id);

    // Preserve query params other than `chapter` (e.g. `from=game`, `score`);
    // the mission/region now come from the path.
    const query = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key === 'chapter' || key === 'world' || key === 'region') return;
      query.append(key, value);
    });
    const qs = query.toString();

    const target = location
      ? `/worlds/${location.worldId}/region/${location.regionId}/mission/${id}/result`
      : '/worlds';

    router.replace(qs ? `${target}?${qs}` : target);
  }, [router, searchParams]);

  return null;
}

/**
 * Legacy result route: `/result?chapter={id}`.
 *
 * The result screen now lives at the hierarchical
 * `/worlds/{worldId}/region/{regionId}/mission/{id}/result` route. This client
 * route reads the `chapter` query param, looks up its world/region, and
 * redirects — preserving remaining query params. Runs client-side so the page
 * can be statically exported.
 */
export default function LegacyResultPage() {
  return (
    <Suspense fallback={null}>
      <LegacyResultRedirect />
    </Suspense>
  );
}
