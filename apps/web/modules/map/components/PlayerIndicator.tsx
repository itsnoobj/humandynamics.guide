/** Props for {@link PlayerIndicator}. */
export interface PlayerIndicatorProps {
  /** SVG x coordinate of the node the indicator hovers above. */
  x: number;
  /** SVG y coordinate of the node the indicator hovers above. */
  y: number;
  /** Accent colour for the indicator. Defaults to gold. */
  accent?: string;
}

const GOLD = '#DAA520';
/** Vertical gap between the node centre and the tip of the triangle. */
const OFFSET = 40;

/**
 * A bouncing triangle that marks the learner's current level,
 * Super Mario World style. Points downward at the node below it.
 */
export function PlayerIndicator({ x, y, accent = GOLD }: PlayerIndicatorProps) {
  const tipY = y - OFFSET;
  // Downward-pointing triangle: two top corners and a bottom tip.
  const points = `${x - 9},${tipY - 14} ${x + 9},${tipY - 14} ${x},${tipY}`;

  return (
    <polygon points={points} fill={accent} aria-hidden="true">
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="translate"
        values="0 0; 0 -5; 0 0"
        dur="1s"
        repeatCount="indefinite"
      />
    </polygon>
  );
}
