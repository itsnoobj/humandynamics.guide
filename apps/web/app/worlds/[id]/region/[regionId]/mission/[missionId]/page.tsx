import { loadChapter, listChapterIds } from '@/lib/content';
import { worlds } from '@/lib/hierarchy';

import { MissionClient } from './MissionClient';
import { MissionLocked } from './MissionLocked';

/** Route params for the hierarchical mission (chapter) page. */
interface MissionPageProps {
  params: Promise<{ id: string; regionId: string; missionId: string }>;
}

/**
 * Pre-render every mission page for static export.
 *
 * Walks the world → region → mission hierarchy and emits one
 * `{id, regionId, missionId}` tuple per mission, so every navigable mission has
 * a concrete URL. Missions whose content isn't authored yet still render the
 * friendly {@link MissionLocked} "coming soon" state rather than a hard 404.
 *
 * Content ids that don't appear in any region can't be located in the
 * hierarchy, so they aren't reachable through this route — they remain
 * accessible via the backward-compatible `/chapter/{id}` redirect.
 */
export async function generateStaticParams() {
  // Touch the content index so a future authored-but-unlisted chapter surfaces
  // in build logs; the hierarchy drives the actual param set.
  await listChapterIds();

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
 * Hierarchical mission page:
 * `/worlds/{id}/region/{regionId}/mission/{missionId}`.
 *
 * A server component that loads the chapter JSON for `missionId` and hands it
 * to {@link MissionClient}. The world/region come from the URL path (not query
 * params), so back/quiz/result navigation is derived directly from the route.
 * Unauthored missions render {@link MissionLocked}.
 */
export default async function MissionPage({ params }: MissionPageProps) {
  const { id, regionId, missionId } = await params;
  const chapter = await loadChapter(missionId);

  if (!chapter) {
    return <MissionLocked worldId={id} regionId={regionId} missionId={missionId} />;
  }

  return (
    <MissionClient chapter={chapter} worldId={id} regionId={regionId} missionId={missionId} />
  );
}
