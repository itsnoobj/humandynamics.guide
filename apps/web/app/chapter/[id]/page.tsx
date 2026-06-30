import { listChapterIds } from '@/lib/content';
import { worlds } from '@/lib/hierarchy';

import { ChapterRedirect } from './ChapterRedirect';

/** Route params for the legacy chapter redirect. */
interface LegacyChapterPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Pre-render the legacy redirect for every chapter id that existed under the
 * old flat route — both authored content ids and every mission id in the
 * hierarchy — so old bookmarks and deep links keep resolving.
 */
export async function generateStaticParams() {
  const contentIds = await listChapterIds();
  const missionIds = worlds.flatMap((world) =>
    world.regions.flatMap((region) => region.missions),
  );
  const ids = Array.from(new Set([...contentIds, ...missionIds]));
  return ids.map((id) => ({ id }));
}

/**
 * Legacy chapter route: `/chapter/{id}`.
 *
 * The chapter page now lives at the hierarchical
 * `/worlds/{worldId}/region/{regionId}/mission/{id}` route. This server wrapper
 * pre-renders a static page that hands the id to {@link ChapterRedirect}, a
 * client component that looks up the chapter's world/region and redirects.
 */
export default async function LegacyChapterPage({ params }: LegacyChapterPageProps) {
  const { id } = await params;
  return <ChapterRedirect id={id} />;
}
