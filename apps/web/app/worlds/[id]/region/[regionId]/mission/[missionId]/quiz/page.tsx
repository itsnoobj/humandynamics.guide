import { loadChapter, loadQuiz } from '@/lib/content';
import { worlds } from '@/lib/hierarchy';

import { QuizClient } from './QuizClient';

/** Route params for the hierarchical quiz page. */
interface QuizPageProps {
  params: Promise<{ id: string; regionId: string; missionId: string }>;
}

/**
 * Pre-render a quiz page for every mission in the hierarchy, mirroring the
 * mission route's params so `generateStaticParams` stays in lock-step. Missions
 * without a `{id}.quiz.json` redirect back to the mission page at request time.
 */
export function generateStaticParams() {
  const params: { id: string; regionId: string; missionId: string }[] = [];
  for (const world of worlds) {
    for (const region of world.regions) {
      for (const missionId of region.missions) {
        params.push({ id: String(world.id), regionId: region.id, missionId });
      }
    }
  }
  return params;
}

/**
 * Hierarchical quiz page:
 * `/worlds/{id}/region/{regionId}/mission/{missionId}/quiz`.
 *
 * A server component that loads the quiz JSON for `missionId` (and the chapter,
 * for its title), then hands the data to {@link QuizClient}. Missions without a
 * quiz redirect back to the mission page.
 */
export default async function QuizPage({ params }: QuizPageProps) {
  const { id, regionId, missionId } = await params;
  const [quiz, chapter] = await Promise.all([loadQuiz(missionId), loadChapter(missionId)]);

  if (!quiz) {
    const { redirect } = await import('next/navigation');
    redirect(`/worlds/${id}/region/${regionId}/mission/${missionId}`);
    return null; // unreachable, but satisfies TS narrowing
  }

  return (
    <QuizClient
      chapterTitle={chapter?.title ?? `Chapter ${missionId}`}
      challenges={quiz.challenges}
      worldId={id}
      regionId={regionId}
      missionId={missionId}
    />
  );
}
