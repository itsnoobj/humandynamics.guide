/** Status of the segment a {@link MapPath} represents. */
export type MapPathStatus = 'done' | 'available' | 'locked';

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
  /** Whether the segment has been completed (drawn in gold). */
  completed: boolean;
  /** Whether the segment is locked (drawn in grey). */
  locked?: boolean;
}

const GOLD = '#DAA520';
const WHITE = '#FFFFFF';
const GREY = '#444444';

/**
 * A dotted path segment connecting two level nodes, Super Mario World style.
 * Gold when completed, grey when locked, white otherwise.
 */
export function MapPath({ x1, y1, x2, y2, completed, locked = false }: MapPathProps) {
  const stroke = completed ? GOLD : locked ? GREY : WHITE;

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={5}
      strokeLinecap="round"
      strokeDasharray="2 12"
    />
  );
}
