import { loadChapter, loadQuiz, listQuizIds } from '@/lib/content';
import { findChapterLocation } from '@/lib/hierarchy';

import { ResultClient, type ResultData } from './ResultClient';

/**
 * Result screen: `/result?chapter={id}`.
 *
 * For static export there is no server at request time to read the `chapter`
 * query param, so this server component runs at build and embeds the result
 * data for *every* chapter into the page. The client {@link ResultClient}
 * reads the `chapter` query param from the URL and looks up its entry.
 */
export default async function ResultPage() {
  const ids = await listQuizIds();

  const entries = await Promise.all(
    ids.map(async (id) => {
      const [quiz, chapter] = await Promise.all([loadQuiz(id), loadChapter(id)]);
      if (!quiz) return null;

      // Derive the world/region this chapter lives in so "continue"/"go to
      // map" returns to the right region map. Fall back to the worlds overview
      // if the chapter isn't listed in any region's missions.
      const location = findChapterLocation(id);
      const mapHref = location
        ? `/worlds/${location.worldId}/region/${location.regionId}`
        : '/worlds';

      const data: ResultData = {
        chapterTitle: chapter?.title ?? `Chapter ${id}`,
        principleText: quiz.principle.text,
        principleSubtext: quiz.principle.subtext ?? '',
        reflection: quiz.reflection,
        totalCount: quiz.challenges.length,
        mapHref,
      };

      return [id, data] as const;
    }),
  );

  const results: Record<string, ResultData> = Object.fromEntries(
    entries.filter((entry): entry is NonNullable<typeof entry> => entry !== null),
  );

  return <ResultClient results={results} />;
}
