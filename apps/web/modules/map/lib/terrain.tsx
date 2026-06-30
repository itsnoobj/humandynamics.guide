import type { ReactNode } from 'react';

/**
 * SVG terrain decorations for the world map.
 *
 * Everything here is drawn as subtle outlines (white/grey strokes, low opacity,
 * no fill) so the decorations read as a hand-sketched backdrop behind the
 * mission nodes without competing with them. Placement is deterministic (seeded
 * per region/position) so the map looks identical between server and client
 * renders and across reloads.
 */

const STROKE = '#FFFFFF';

/** Small deterministic PRNG (mulberry32) so scatter is stable across renders. */
function makeRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Stroke props shared by every decoration outline. */
function outline(opacity: number, strokeWidth = 1.2) {
  return { stroke: STROKE, strokeWidth, fill: 'none', opacity } as const;
}

/* ------------------------------------------------------------------ shapes */

function mountain(cx: number, cy: number, size: number, opacity: number, key: string): ReactNode {
  return (
    <polyline
      key={key}
      points={`${cx - size},${cy} ${cx},${cy - size} ${cx + size},${cy}`}
      {...outline(opacity)}
    />
  );
}

function tree(cx: number, cy: number, size: number, opacity: number, key: string): ReactNode {
  return (
    <g key={key} {...outline(opacity)}>
      <polyline points={`${cx - size * 0.6},${cy} ${cx},${cy - size} ${cx + size * 0.6},${cy}`} />
      <line x1={cx} y1={cy} x2={cx} y2={cy + size * 0.5} />
    </g>
  );
}

function cloud(cx: number, cy: number, size: number, opacity: number, key: string): ReactNode {
  return (
    <g key={key} {...outline(opacity)}>
      <ellipse cx={cx} cy={cy} rx={size} ry={size * 0.55} />
      <ellipse cx={cx + size * 0.7} cy={cy + size * 0.1} rx={size * 0.7} ry={size * 0.45} />
      <ellipse cx={cx - size * 0.7} cy={cy + size * 0.15} rx={size * 0.6} ry={size * 0.4} />
    </g>
  );
}

function stone(cx: number, cy: number, size: number, opacity: number, key: string): ReactNode {
  return (
    <polygon
      key={key}
      points={`${cx - size},${cy} ${cx - size * 0.4},${cy - size * 0.7} ${cx + size * 0.5},${cy - size * 0.6} ${cx + size},${cy} ${cx + size * 0.3},${cy + size * 0.4} ${cx - size * 0.5},${cy + size * 0.3}`}
      {...outline(opacity)}
    />
  );
}

function house(cx: number, cy: number, size: number, opacity: number, key: string): ReactNode {
  const w = size;
  const h = size * 0.8;
  return (
    <g key={key} {...outline(opacity)}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} />
      <polyline
        points={`${cx - w / 2},${cy - h / 2} ${cx},${cy - h} ${cx + w / 2},${cy - h / 2}`}
      />
    </g>
  );
}

function lake(cx: number, cy: number, size: number, opacity: number, key: string): ReactNode {
  return (
    <g key={key} {...outline(opacity)}>
      <ellipse cx={cx} cy={cy} rx={size} ry={size * 0.5} />
      <path
        d={`M ${cx - size * 0.6} ${cy} q ${size * 0.3} ${-size * 0.25} ${size * 0.6} 0 q ${size * 0.3} ${size * 0.25} ${size * 0.6} 0`}
      />
    </g>
  );
}

function lightning(cx: number, cy: number, size: number, opacity: number, key: string): ReactNode {
  return (
    <polyline
      key={key}
      points={`${cx},${cy} ${cx - size * 0.4},${cy + size * 0.6} ${cx + size * 0.1},${cy + size * 0.6} ${cx - size * 0.3},${cy + size * 1.3}`}
      {...outline(opacity, 1.4)}
    />
  );
}

/* ------------------------------------------------------- per-terrain groups */

function marketStalls(rng: () => number, x: number, y: number, w: number, h: number): ReactNode[] {
  const items: ReactNode[] = [];
  const count = 4;
  for (let i = 0; i < count; i += 1) {
    const cx = x + 80 + rng() * (w - 160);
    const cy = y + h * 0.5 + rng() * (h * 0.35);
    items.push(house(cx, cy, 22 + rng() * 10, 0.3, `stall-${i}`));
  }
  return items;
}

function bridgeTerrain(
  _rng: () => number,
  x: number,
  y: number,
  w: number,
  h: number,
): ReactNode[] {
  const midY = y + h * 0.6;
  const left = x + w * 0.28;
  const right = x + w * 0.72;
  return [
    <g key="bridge" {...outline(0.35, 1.4)}>
      {/* Two platforms either side of a gap. */}
      <line x1={x + w * 0.1} y1={midY} x2={left} y2={midY} />
      <line x1={right} y1={midY} x2={x + w * 0.9} y2={midY} />
      {/* Arched span across the gap. */}
      <path d={`M ${left} ${midY} Q ${(left + right) / 2} ${midY - 38} ${right} ${midY}`} />
      {/* Suspenders. */}
      {[0.3, 0.5, 0.7].map((t) => {
        const px = left + (right - left) * t;
        const py = midY - Math.sin(Math.PI * t) * 34;
        return <line key={t} x1={px} y1={py} x2={px} y2={midY} />;
      })}
    </g>,
  ];
}

function staircase(_rng: () => number, x: number, y: number, w: number, h: number): ReactNode[] {
  const steps = 5;
  const startX = x + w * 0.35;
  const baseY = y + h * 0.75;
  const stepW = 26;
  const stepH = 16;
  const pts: string[] = [];
  for (let i = 0; i < steps; i += 1) {
    const sx = startX + i * stepW;
    const sy = baseY - i * stepH;
    pts.push(`${sx},${sy}`, `${sx + stepW},${sy}`, `${sx + stepW},${sy - stepH}`);
  }
  return [<polyline key="stairs" points={pts.join(' ')} {...outline(0.32, 1.3)} />];
}

function thornyPath(rng: () => number, x: number, y: number, w: number, h: number): ReactNode[] {
  const items: ReactNode[] = [];
  const midY = y + h * 0.6;
  const segs = 10;
  const pts: string[] = [];
  for (let i = 0; i <= segs; i += 1) {
    const px = x + 60 + (i / segs) * (w - 120);
    const py = midY + (i % 2 === 0 ? -10 : 10);
    pts.push(`${px},${py}`);
  }
  items.push(<polyline key="zig" points={pts.join(' ')} {...outline(0.3)} />);
  // A few thorn spikes along the path.
  for (let i = 0; i < 5; i += 1) {
    const px = x + 80 + rng() * (w - 160);
    items.push(
      <line key={`thorn-${i}`} x1={px} y1={midY} x2={px + 6} y2={midY - 14} {...outline(0.3)} />,
    );
  }
  return items;
}

function reflectionPools(
  rng: () => number,
  x: number,
  y: number,
  w: number,
  h: number,
): ReactNode[] {
  const items: ReactNode[] = [];
  for (let i = 0; i < 4; i += 1) {
    const cx = x + 80 + rng() * (w - 160);
    const cy = y + h * 0.55 + rng() * (h * 0.3);
    items.push(lake(cx, cy, 16 + rng() * 12, 0.28, `pool-${i}`));
  }
  return items;
}

function crackedMirrors(
  rng: () => number,
  x: number,
  y: number,
  w: number,
  h: number,
): ReactNode[] {
  const items: ReactNode[] = [];
  for (let i = 0; i < 3; i += 1) {
    const cx = x + 90 + rng() * (w - 180);
    const cy = y + h * 0.5 + rng() * (h * 0.3);
    const s = 22 + rng() * 10;
    items.push(
      <g key={`crack-${i}`} {...outline(0.28)}>
        <line x1={cx} y1={cy - s} x2={cx} y2={cy + s} />
        <line x1={cx - s} y1={cy} x2={cx + s} y2={cy} />
        <line x1={cx - s * 0.6} y1={cy - s * 0.6} x2={cx + s * 0.6} y2={cy + s * 0.6} />
        <line x1={cx + s * 0.6} y1={cy - s * 0.6} x2={cx - s * 0.6} y2={cy + s * 0.6} />
      </g>,
    );
  }
  return items;
}

function uphillPaths(_rng: () => number, x: number, y: number, w: number, h: number): ReactNode[] {
  const startX = x + w * 0.2;
  const endX = x + w * 0.8;
  const baseY = y + h * 0.7;
  const rise = h * 0.4;
  const segs = 8;
  const pts: string[] = [];
  for (let i = 0; i <= segs; i += 1) {
    const t = i / segs;
    const px = startX + (endX - startX) * t;
    const bump = i % 2 === 0 ? 0 : -8;
    const py = baseY - rise * t + bump;
    pts.push(`${px},${py}`);
  }
  return [<polyline key="uphill" points={pts.join(' ')} {...outline(0.3)} />];
}

function weatherZones(rng: () => number, x: number, y: number, w: number, h: number): ReactNode[] {
  const items: ReactNode[] = [];
  for (let i = 0; i < 3; i += 1) {
    const cx = x + 90 + rng() * (w - 180);
    const cy = y + h * 0.35 + rng() * (h * 0.2);
    const s = 20 + rng() * 8;
    items.push(cloud(cx, cy, s, 0.3, `wcloud-${i}`));
    items.push(lightning(cx, cy + s * 0.6, s * 0.7, 0.3, `bolt-${i}`));
  }
  return items;
}

/**
 * Generates terrain decoration elements for a single region band, chosen by
 * the region's `terrain` hint. Unknown terrains fall back to a couple of
 * scattered stones so every band has some texture.
 */
export function generateTerrain(
  terrain: string | undefined,
  x: number,
  y: number,
  width: number,
  height: number,
): ReactNode[] {
  // Seed from the terrain name + band position so each band is stable but
  // distinct from its neighbours.
  const seed =
    (terrain ?? 'none').split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0) +
    Math.round(x + y * 7 + width);
  const rng = makeRng(seed);

  switch (terrain) {
    case 'market-stalls':
      return marketStalls(rng, x, y, width, height);
    case 'bridge':
      return bridgeTerrain(rng, x, y, width, height);
    case 'staircase':
      return staircase(rng, x, y, width, height);
    case 'thorny-path':
      return thornyPath(rng, x, y, width, height);
    case 'reflection-pools':
      return reflectionPools(rng, x, y, width, height);
    case 'cracked-mirrors':
      return crackedMirrors(rng, x, y, width, height);
    case 'uphill-paths':
      return uphillPaths(rng, x, y, width, height);
    case 'weather-zones':
      return weatherZones(rng, x, y, width, height);
    default: {
      const items: ReactNode[] = [];
      for (let i = 0; i < 3; i += 1) {
        const cx = x + 80 + rng() * (width - 160);
        const cy = y + height * 0.6 + rng() * (height * 0.25);
        items.push(stone(cx, cy, 10 + rng() * 8, 0.25, `fill-stone-${i}`));
      }
      return items;
    }
  }
}

/**
 * Generates ambient backdrop decorations (clouds, distant mountains, trees,
 * scattered stones) spread across the whole map, behind the region terrain.
 */
export function generateBackdrop(width: number, height: number): ReactNode[] {
  const rng = makeRng(Math.round(width * 31 + height));
  const items: ReactNode[] = [];

  // Clouds along the top.
  const cloudCount = Math.max(2, Math.round(width / 320));
  for (let i = 0; i < cloudCount; i += 1) {
    const cx = (width / (cloudCount + 1)) * (i + 1) + (rng() - 0.5) * 80;
    items.push(cloud(cx, 30 + rng() * 20, 22 + rng() * 10, 0.22, `bg-cloud-${i}`));
  }

  // Distant mountains, trees and stones scattered low in each band.
  const scatter = Math.max(4, Math.round((width * height) / 90000));
  for (let i = 0; i < scatter; i += 1) {
    const cx = 40 + rng() * (width - 80);
    const cy = 90 + rng() * (height - 130);
    const pick = rng();
    if (pick < 0.34) {
      items.push(mountain(cx, cy, 26 + rng() * 18, 0.18, `bg-mtn-${i}`));
    } else if (pick < 0.67) {
      items.push(tree(cx, cy, 16 + rng() * 8, 0.2, `bg-tree-${i}`));
    } else {
      items.push(stone(cx, cy, 8 + rng() * 6, 0.2, `bg-stone-${i}`));
    }
  }

  return items;
}
