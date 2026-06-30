import { loadChapter } from '@/lib/content';
import { ChapterClient } from './ChapterClient';
import { ChapterLocked } from './ChapterLocked';

/** Route params for the dynamic chapter page. */
interface ChapterPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

/**
 * Dynamic chapter page: `/chapter/{id}`.
 *
 * A server component that loads the chapter JSON for `id` (scanning the
 * repo-root `content/chapters/part-*` directories) and hands the data to the
 * {@link ChapterClient} for rendering. If the chapter doesn't exist yet,
 * shows a "Coming Soon" locked state instead of a 404.
 */
export default async function ChapterPage({ params, searchParams }: ChapterPageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const chapter = await loadChapter(id);

  if (!chapter) {
    return <ChapterLocked id={id} world={sp.world} region={sp.region} />;
  }

  return <ChapterClient chapter={chapter} />;
}
