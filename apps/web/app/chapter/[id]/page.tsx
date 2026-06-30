import { loadChapter, listChapterIds } from '@/lib/content';
import { worlds, findChapterLocation } from '@/lib/hierarchy';
import { ChapterClient } from './ChapterClient';
import { ChapterLocked } from './ChapterLocked';

/** Route params for the dynamic chapter page. */
interface ChapterPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Pre-render every chapter page for static export.
 *
 * Includes both ids that already have content and every mission id listed in
 * the hierarchy, so locked/unauthored chapters still render the friendly
 * "coming soon" {@link ChapterLocked} state instead of a hard 404.
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
 * Dynamic chapter page: `/chapter/{id}`.
 *
 * A server component that loads the chapter JSON for `id` (scanning the
 * repo-root `content/chapters/part-*` directories) and hands the data to the
 * {@link ChapterClient} for rendering. If the chapter doesn't exist yet,
 * shows a "Coming Soon" locked state instead of a 404, deriving the back link
 * from the chapter's place in the world/region hierarchy.
 */
export default async function ChapterPage({ params }: ChapterPageProps) {
  const { id } = await params;
  const chapter = await loadChapter(id);

  if (!chapter) {
    const location = findChapterLocation(id);
    return (
      <ChapterLocked
        id={id}
        world={location ? String(location.worldId) : undefined}
        region={location?.regionId}
      />
    );
  }

  return <ChapterClient chapter={chapter} />;
}
