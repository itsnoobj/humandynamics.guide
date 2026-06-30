'use client';

/**
 * Lifecycle status of a level node.
 *
 * There is no `locked` state: every mission is reachable. `done` missions are
 * completed, `recommended` marks the first uncompleted mission (a gentle nudge,
 * rendered with a pulsing ring), and everything else is `available`.
 */
export type MapNodeStatus = 'done' | 'available' | 'recommended';

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
  /** Current node status, which drives colours and the pulsing nudge. */
  status: MapNodeStatus;
  /** Accent colour for completed/recommended nodes. Defaults to gold. */
  accent?: string;
  /** Click handler. Every node is clickable. */
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
    case 'recommended':
    case 'available':
    default:
      // Available and recommended share the same face (white, numbered, dark
      // text); the recommended node adds a pulsing ring drawn separately.
      return { fill: WHITE, stroke: accent, textFill: '#1A1A1A', text: String(label) };
  }
}

/**
 * A round level node on the world map. Gold with a star when done, white with
 * a number otherwise. The recommended node (first uncompleted mission) gets a
 * pulsing accent ring to draw the eye. Every node is clickable — there are no
 * locked nodes.
 */
export function MapNode({ x, y, label, title, status, accent = GOLD, onClick }: MapNodeProps) {
  const { fill, stroke, textFill, text } = styleFor(status, label, accent);

  return (
    <g
      onClick={() => onClick?.()}
      role="button"
      aria-label={`${title} (chapter ${label})`}
      style={{ cursor: 'pointer' }}
    >
      {status === 'recommended' && (
        <circle cx={x} cy={y} r={NODE_RADIUS} fill="none" stroke={accent} strokeWidth={2}>
          <animate
            attributeName="r"
            values={`${NODE_RADIUS};${NODE_RADIUS + 10};${NODE_RADIUS}`}
            dur="1.6s"
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0.9;0;0.9" dur="1.6s" repeatCount="indefinite" />
        </circle>
      )}

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
      <text x={x} y={y + NODE_RADIUS + 16} textAnchor="middle" fontSize={12} fill="#CCCCCC">
        {title}
      </text>
    </g>
  );
}
