'use client';

/** Lifecycle status of a level node. */
export type MapNodeStatus = 'done' | 'current' | 'locked';

/** Props for {@link MapNode}. */
export interface MapNodeProps {
  /** SVG x coordinate of the node centre. */
  x: number;
  /** SVG y coordinate of the node centre. */
  y: number;
  /** Display number shown inside the node. */
  label: number;
  /** Short chapter title rendered below the node. */
  title: string;
  /** Current node status, which drives colours and interactivity. */
  status: MapNodeStatus;
  /** Accent colour for completed/current nodes. Defaults to gold. */
  accent?: string;
  /** Click handler; only invoked for non-locked nodes. */
  onClick?: () => void;
}

const GOLD = '#DAA520';
const WHITE = '#FFFFFF';
const NODE_RADIUS = 22;

interface NodeStyle {
  fill: string;
  stroke: string;
  textFill: string;
  text: string;
}

function styleFor(status: MapNodeStatus, label: number, accent: string): NodeStyle {
  switch (status) {
    case 'done':
      return { fill: accent, stroke: WHITE, textFill: WHITE, text: '★' };
    case 'current':
      return { fill: WHITE, stroke: accent, textFill: '#1A1A1A', text: String(label) };
    case 'locked':
    default:
      return { fill: '#333333', stroke: '#555555', textFill: '#777777', text: String(label) };
  }
}

/**
 * A round level node on the world map.
 * Gold with a star when done, white with a number when current,
 * dark and dimmed when locked. Non-locked nodes are clickable.
 */
export function MapNode({ x, y, label, title, status, accent = GOLD, onClick }: MapNodeProps) {
  const { fill, stroke, textFill, text } = styleFor(status, label, accent);
  const interactive = status !== 'locked';

  const handleClick = () => {
    if (interactive) onClick?.();
  };

  return (
    <g
      onClick={handleClick}
      role={interactive ? 'button' : undefined}
      aria-label={interactive ? `${title} (chapter ${label})` : `${title} (locked)`}
      aria-disabled={interactive ? undefined : true}
      style={{ cursor: interactive ? 'pointer' : 'not-allowed' }}
    >
      <circle cx={x} cy={y} r={NODE_RADIUS} fill={fill} stroke={stroke} strokeWidth={3} />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={status === 'done' ? 20 : 16}
        fontWeight={600}
        fill={textFill}
      >
        {text}
      </text>
      <text
        x={x}
        y={y + NODE_RADIUS + 16}
        textAnchor="middle"
        fontSize={12}
        fill={status === 'locked' ? '#666666' : '#CCCCCC'}
      >
        {title}
      </text>
    </g>
  );
}
