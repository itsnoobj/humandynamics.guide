/** A single level node on the world map. */
export interface MapNodeData {
  /** Unique node id, also used to wire up {@link connections}. */
  id: number;
  /** SVG x coordinate (viewBox 0 0 700 500). */
  x: number;
  /** SVG y coordinate (viewBox 0 0 700 500). */
  y: number;
  /** Display number shown inside the node. */
  label: number;
  /** Short chapter title rendered below the node. */
  title: string;
  /** Chapter id this node links to (route param for /chapter). */
  chapterId: string;
  /** Ids of nodes this node connects to (drawn as paths). */
  connections: number[];
}

/**
 * Part II — Section A chapters laid out as a Super Mario World overworld.
 * Coordinates are tuned for an SVG viewBox of 0 0 700 500.
 */
export const mapNodes: MapNodeData[] = [
  { id: 1, x: 100, y: 420, label: 1, title: 'Hidden Motives', chapterId: '26', connections: [2] },
  { id: 2, x: 250, y: 360, label: 2, title: 'Gaming Metrics', chapterId: '27', connections: [3] },
  { id: 3, x: 400, y: 420, label: 3, title: 'Promotions', chapterId: '28', connections: [4] },
  { id: 4, x: 400, y: 260, label: 4, title: 'Resisting Change', chapterId: '31', connections: [5] },
  { id: 5, x: 550, y: 200, label: 5, title: 'Ownership', chapterId: '32', connections: [6] },
  { id: 6, x: 550, y: 80, label: 6, title: 'Meeting Theatre', chapterId: '33', connections: [7] },
  { id: 7, x: 350, y: 80, label: 7, title: 'Org Change', chapterId: '73', connections: [] },
];
