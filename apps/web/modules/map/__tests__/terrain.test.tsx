import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { generateTerrain, generateBackdrop } from '../lib/terrain';

describe('generateTerrain', () => {
  const terrainTypes = [
    'market-stalls',
    'bridge',
    'staircase',
    'thorny-path',
    'reflection-pools',
    'cracked-mirrors',
    'uphill-paths',
    'weather-zones',
    undefined, // default fallback
  ];

  it.each(terrainTypes)('generates stable SVG for terrain "%s"', (terrain) => {
    const elements = generateTerrain(terrain, 0, 0, 500, 200);
    const { container } = render(<svg>{elements}</svg>);
    expect(container.querySelector('svg')!.innerHTML).toMatchSnapshot();
  });

  it('returns the same output for the same inputs (deterministic)', () => {
    const a = generateTerrain('bridge', 10, 20, 400, 150);
    const b = generateTerrain('bridge', 10, 20, 400, 150);
    const { container: ca } = render(<svg>{a}</svg>);
    const { container: cb } = render(<svg>{b}</svg>);
    expect(ca.innerHTML).toBe(cb.innerHTML);
  });
});

describe('generateBackdrop', () => {
  it('generates backdrop SVG elements', () => {
    const elements = generateBackdrop(500, 1200);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('snapshot matches', () => {
    const elements = generateBackdrop(500, 1200);
    const { container } = render(<svg>{elements}</svg>);
    expect(container.querySelector('svg')!.innerHTML).toMatchSnapshot();
  });
});
