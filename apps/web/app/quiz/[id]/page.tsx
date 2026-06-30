import { listQuizIds } from '@/lib/content';
import { worlds } from '@/lib/hierarchy';

import { QuizRedirect } from './QuizRedirect';

/** Route params for the legacy quiz redirect. */
interface LegacyQuizPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Pre-render the legacy redirect for every quiz id that existed under the old
 * flat route — both authored quiz ids and every mission id in the hierarchy —
 * so old bookmarks and deep links keep resolving.
 */
export async function generateStaticParams() {
  const quizIds = await listQuizIds();
  const missionIds = worlds.flatMap((world) =>
    world.regions.flatMap((region) => region.missions),
  );
  const ids = Array.from(new Set([...quizIds, ...missionIds]));
  return ids.map((id) => ({ id }));
}

/**
 * Legacy quiz route: `/quiz/{id}`.
 *
 * The quiz page now lives at the hierarchical
 * `/worlds/{worldId}/region/{regionId}/mission/{id}/quiz` route. This server
 * wrapper pre-renders a static page that hands the id to {@link QuizRedirect},
 * a client component that looks up the chapter's world/region and redirects.
 */
export default async function LegacyQuizPage({ params }: LegacyQuizPageProps) {
  const { id } = await params;
  return <QuizRedirect id={id} />;
}
