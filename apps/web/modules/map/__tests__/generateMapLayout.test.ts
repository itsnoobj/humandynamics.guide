import { describe, it, expect } from 'vitest';
import { generateMapLayout, type LayoutRegion } from '../data/mapNodes';

const REGIONS: LayoutRegion[] = [
  { id: 'A', title: 'Incentives', missions: ['26', '27', '28'] },
  { id: 'B', title: 'Trust', missions: ['34', '35'] },
];

describe('generateMapLayout', () => {
  it('creates one node per mission across all regions', () => {
    const { nodes } = generateMapLayout(REGIONS, []);
    expect(nodes.map((n) => n.id)).toEqual(['26', '27', '28', '34', '35']);
  });

  it('marks completed missions done, the first remaining current, the rest locked', () => {
    const { nodes } = generateMapLayout(REGIONS, ['26', '27']);
    const statusById = Object.fromEntries(nodes.map((n) => [n.id, n.status]));
    expect(statusById).toEqual({
      '26': 'done',
      '27': 'done',
      '28': 'current',
      '34': 'locked',
      '35': 'locked',
    });
  });

  it('connects sequential missions within a region and gates between regions', () => {
    const { edges } = generateMapLayout(REGIONS, []);
    // 2 in-region edges (A) + 1 in-region edge (B) + 1 gate edge = 4.
    expect(edges).toHaveLength(4);
    const gate = edges.find((e) => e.isGate);
    expect(gate).toBeDefined();
    // The gate bridges the last mission of A (28) to the first of B (34).
    expect(gate?.key).toBe('28-34');
  });

  it('places each region on its own horizontal band', () => {
    const { nodes } = generateMapLayout(REGIONS, []);
    const regionAY = nodes.find((n) => n.id === '26')!.y;
    const regionBY = nodes.find((n) => n.id === '34')!.y;
    expect(regionBY).toBeGreaterThan(regionAY);
    // Missions within a region share the same y.
    expect(nodes.find((n) => n.id === '27')!.y).toBe(regionAY);
  });

  it('handles an empty world without throwing', () => {
    const layout = generateMapLayout([], []);
    expect(layout.nodes).toHaveLength(0);
    expect(layout.edges).toHaveLength(0);
    expect(layout.width).toBeGreaterThan(0);
  });
});
