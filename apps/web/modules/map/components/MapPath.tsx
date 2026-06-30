/** Props for {@link MapPath}. */
export interface MapPathProps {
  /** Start x coordinate. */
  x1: number;
  /** Start y coordinate. */
  y1: number;
  /** End x coordinate. */
  x2: number;
  /** End y coordinate. */
  y2: number;
  /** Whether the segment has been completed (drawn in the accent colour). */
  completed: boolean;
  /** Accent colour used for completed segments. Defaults to gold. */
  accent?: string;
  /** Whether this is a region-to-region "gate" segment (drawn with a wider dash). */
  isGate?: boolean;
}

const GOLD = '#DAA520';
const WHITE = '#FFFFFF';

/**
 * A dotted path segment connecting two level nodes, Super Mario World style.
 * Accent-coloured when completed, white otherwise. Gate segments (between
 * regions) use a longer dash to read as a transition. No locked state — every
 * path is walkable.
 */
export function MapPath({
  x1,
  y1,
  x2,
  y2,
  completed,
  accent = GOLD,
  isGate = false,
}: MapPathProps) {
  const stroke = completed ? accent : WHITE;

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={5}
      strokeLinecap="round"
      strokeDasharray={isGate ? '2 18' : '2 12'}
    />
  );
}
