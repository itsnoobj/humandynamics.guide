'use client';

import { useRouter } from 'next/navigation';
import { mapNodes } from '../data/mapNodes';
import { useMapProgress } from '../hooks/useMapProgress';
import { MapPath } from './MapPath';
import { MapNode } from './MapNode';
import { PlayerIndicator } from './PlayerIndicator';
import { PathUnlocked } from './PathUnlocked';

/** Props for {@link WorldMap}. */
export interface WorldMapProps {
  /**
   * When provided, a "Path Unlocked" celebration is shown over the map
   * announcing the route from `from` to `to`. The parent owns this state and
   * should clear it via {@link WorldMapProps.onUnlockedDone}.
   */
  showUnlocked?: { from: string; to: string } | null;
  /** Called when the unlock celebration finishes or is dismissed. */
  onUnlockedDone?: () => void;
}

/**
 * The Super Mario World style overworld map.
 *
 * Renders dotted path segments between level nodes, the nodes themselves
 * (gold/done, white/current, grey/locked), and a bouncing indicator above the
 * current node. Clicking a non-locked node navigates to its chapter. When
 * {@link WorldMapProps.showUnlocked} is set, a celebratory overlay is layered
 * on top of the map.
 */
export function WorldMap({ showUnlocked, onUnlockedDone }: WorldMapProps = {}) {
  const router = useRouter();
  const statuses = useMapProgress();

  const nodeById = new Map(mapNodes.map((node) => [node.id, node]));

  // A segment is "completed" when both endpoints are done; locked when the
  // destination is locked. Everything else is an available (white) path.
  const edges = mapNodes.flatMap((from) =>
    from.connections.map((toId) => {
      const to = nodeById.get(toId)!;
      const fromStatus = statuses[from.id];
      const toStatus = statuses[to.id];
      const completed = fromStatus === 'done' && toStatus === 'done';
      const locked = toStatus === 'locked';
      return { key: `${from.id}-${toId}`, from, to, completed, locked };
    }),
  );

  const currentNode = mapNodes.find((node) => statuses[node.id] === 'current');

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
          viewBox="0 0 700 500"
          preserveAspectRatio="xMidYMid meet"
          className="h-auto"
          style={{ minWidth: '700px', width: '100%' }}
          role="img"
          aria-label="World map of Part II chapters"
        >
          {edges.map(({ key, from, to, completed, locked }) => (
            <MapPath
              key={key}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              completed={completed}
              locked={locked}
            />
          ))}

          {mapNodes.map((node) => (
            <MapNode
              key={node.id}
              x={node.x}
              y={node.y}
              label={node.label}
              title={node.title}
              status={statuses[node.id] ?? 'locked'}
              onClick={() => router.push('/chapter')}
            />
          ))}

          {currentNode && <PlayerIndicator x={currentNode.x} y={currentNode.y} />}
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
