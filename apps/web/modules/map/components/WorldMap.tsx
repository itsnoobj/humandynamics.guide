'use client';

import { useRouter } from 'next/navigation';
import { useProgressStore } from '@/store/progressStore';
import { generateMapLayout, type LayoutRegion } from '../data/mapNodes';
import { MapPath } from './MapPath';
import { MapNode } from './MapNode';
import { PlayerIndicator } from './PlayerIndicator';
import { PathUnlocked } from './PathUnlocked';

/** Props for {@link WorldMap}. */
export interface WorldMapProps {
  /** The world's regions, each rendered as a labelled band of mission nodes. */
  regions: LayoutRegion[];
  /** Accent colour used for completed paths, nodes, and the player indicator. */
  accent: string;
  /**
   * When provided, a "Path Unlocked" celebration is shown over the map
   * announcing the route from `from` to `to`. The parent owns this state and
   * should clear it via {@link WorldMapProps.onUnlockedDone}.
   */
  showUnlocked?: { from: string; to: string } | null;
  /** Called when the unlock celebration finishes or is dismissed. */
  onUnlockedDone?: () => void;
}

const GOLD = '#DAA520';

/**
 * The Super Mario World style overworld map for a single world.
 *
 * Node positions, paths, and region labels are generated programmatically from
 * the world's {@link WorldMapProps.regions} via {@link generateMapLayout}, so
 * any region/mission shape renders without hand-placed coordinates. Each region
 * occupies a horizontal band with a title label; sequential missions are
 * connected, and "gate" segments bridge regions. Completed paths and nodes use
 * the world's {@link WorldMapProps.accent} colour. Clicking a non-locked node
 * navigates to its chapter.
 */
export function WorldMap({ regions, accent, showUnlocked, onUnlockedDone }: WorldMapProps) {
  const router = useRouter();
  const completedChapters = useProgressStore((state) => state.completedChapters);

  const { nodes, edges, regionLabels, width, height } = generateMapLayout(
    regions,
    completedChapters,
  );

  const currentNode = nodes.find((node) => node.status === 'current');
  const accentColor = accent || GOLD;

  return (
    <div>
      <div
        style={{
          position: 'relative',
          maxWidth: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          className="h-auto"
          style={{ minWidth: `${width}px`, width: '100%' }}
          role="img"
          aria-label={`World map with ${nodes.length} missions`}
        >
          {regionLabels.map((label) => (
            <text
              key={label.id}
              x={label.x}
              y={label.y}
              fontSize={14}
              fontWeight={700}
              fill={accentColor}
              letterSpacing="0.05em"
            >
              {label.title.toUpperCase()}
            </text>
          ))}

          {edges.map((edge) => (
            <MapPath
              key={edge.key}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              completed={edge.completed}
              locked={edge.locked}
              isGate={edge.isGate}
              accent={accentColor}
            />
          ))}

          {nodes.map((node) => (
            <MapNode
              key={node.id}
              x={node.x}
              y={node.y}
              label={node.label}
              title={node.title}
              status={node.status}
              accent={accentColor}
              onClick={() => router.push('/chapter')}
            />
          ))}

          {currentNode && (
            <PlayerIndicator x={currentNode.x} y={currentNode.y} accent={accentColor} />
          )}
        </svg>

        {showUnlocked && (
          <PathUnlocked
            fromNode={showUnlocked.from}
            toNode={showUnlocked.to}
            onDone={() => onUnlockedDone?.()}
          />
        )}
      </div>

      <p
        className="md:hidden"
        style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--color-text-dim)',
          marginTop: 'var(--spacing-sm)',
        }}
      >
        Scroll to explore →
      </p>
    </div>
  );
}
