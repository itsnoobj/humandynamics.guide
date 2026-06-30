import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RegionMap } from '../components/RegionMap';
import type { RegionMapRegion } from '../components/RegionMap';

const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

const REGIONS: RegionMapRegion[] = [
  {
    id: 'A',
    title: 'Incentives',
    description: 'Hidden motives drive behaviour.',
    emoji: '🎪',
    missions: ['26', '27', '28', '29'],
  },
  {
    id: 'B',
    title: 'Trust',
    description: 'How it is built.',
    emoji: '🤝',
    missions: ['34', '35'],
  },
];

// Two missions of region A are complete; region B has none.
const completed = new Set(['26', '27']);

describe('RegionMap', () => {
  beforeEach(() => push.mockClear());

  it('renders an SVG element labelled for the world', () => {
    render(
      <RegionMap
        worldId={2}
        worldName="The Crowd"
        accent="#DAA520"
        regions={REGIONS}
        completedMissions={completed}
      />,
    );
    expect(screen.getByRole('img', { name: /The Crowd/ })).toBeInTheDocument();
  });

  it('renders one zone per region with its title', () => {
    render(
      <RegionMap
        worldId={2}
        worldName="The Crowd"
        accent="#DAA520"
        regions={REGIONS}
        completedMissions={completed}
      />,
    );
    expect(screen.getByText('Incentives')).toBeInTheDocument();
    expect(screen.getByText('Trust')).toBeInTheDocument();
  });

  it('derives per-region progress from the completed set', () => {
    render(
      <RegionMap
        worldId={2}
        worldName="The Crowd"
        accent="#DAA520"
        regions={REGIONS}
        completedMissions={completed}
      />,
    );
    expect(screen.getByText('2/4')).toBeInTheDocument();
    expect(screen.getByText('0/2')).toBeInTheDocument();
  });

  it('navigates to the region route when a zone is selected', () => {
    render(
      <RegionMap
        worldId={2}
        worldName="The Crowd"
        accent="#DAA520"
        regions={REGIONS}
        completedMissions={completed}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /Trust/ }));
    expect(push).toHaveBeenCalledWith('/worlds/2/region/B');
  });
});
