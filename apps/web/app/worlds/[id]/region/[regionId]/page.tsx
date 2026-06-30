import { worlds } from '@/lib/hierarchy';
import { RegionClient } from './RegionClient';

/**
 * Pre-render a page for every world+region combination present in the
 * hierarchy for static export. The client component reads the ids from the
 * route and renders the matching region's mission map.
 */
export function generateStaticParams() {
  const params: { id: string; regionId: string }[] = [];
  for (const world of worlds) {
    for (const region of world.regions) {
      params.push({ id: String(world.id), regionId: region.id });
    }
  }
  return params;
}

/** Server wrapper for the region screen; delegates rendering to the client. */
export default function RegionPage() {
  return <RegionClient />;
}
