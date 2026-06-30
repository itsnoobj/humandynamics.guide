import { worlds } from '@/lib/hierarchy';
import { WorldClient } from './WorldClient';

/**
 * Pre-render a page for every world (ids 1-10) for static export. The client
 * component reads the id from the route and renders the matching world.
 */
export function generateStaticParams() {
  return worlds.map((world) => ({ id: String(world.id) }));
}

/** Server wrapper for the world screen; delegates rendering to the client. */
export default function WorldPage() {
  return <WorldClient />;
}
