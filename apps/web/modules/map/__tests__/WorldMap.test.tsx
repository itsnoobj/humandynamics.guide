import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WorldMap } from '../components/WorldMap';
import { MapHeader } from '../components/MapHeader';
import type { LayoutRegion } from '../data/mapNodes';

// WorldMap navigates via the App Router and derives node status from the
// progress store. Stub both so the component renders deterministically.
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

// useProgressStore reads completedChapters via a selector; return a fixed set
// so the first three nodes are "done", the fourth "recommended", the rest
// "available".
vi.mock('@/store/progressStore', () => ({
  useProgressStore: (selector: (state: { completedChapters: string[] }) => unknown) =>
    selector({ completedChapters: ['26', '27', '28'] }),
}));

const REGIONS: LayoutRegion[] = [
  {
    id: 'A',
    title: 'Incentives',
    terrain: 'market-stalls',
    missions: ['26', '27', '28', '29', '30'],
  },
  { id: 'B', title: 'Trust', terrain: 'bridge', missions: ['34', '35'] },
];

describe('WorldMap', () => {
  it('renders an SVG element', () => {
    render(<WorldMap regions={REGIONS} accent="#DAA520" />);
    expect(screen.getByRole('img', { name: /World map/ })).toBeInTheDocument();
  });

  it('renders one node per mission across all regions (7)', () => {
    const { container } = render(<WorldMap regions={REGIONS} accent="#DAA520" />);
    // Every MapNode renders a <g> with an aria-label; terrain groups are
    // aria-hidden and carry no label, so this counts mission nodes only.
    expect(container.querySelectorAll('g[aria-label]')).toHaveLength(7);
  });

  it('does not render region labels (regions are visual groupings only)', () => {
    render(<WorldMap regions={REGIONS} accent="#DAA520" />);
    expect(screen.queryByText('INCENTIVES')).not.toBeInTheDocument();
    expect(screen.queryByText('TRUST')).not.toBeInTheDocument();
  });

  it('renders the MapHeader title', () => {
    render(<MapHeader />);
    expect(screen.getByText('A Field Guide to Being Human')).toBeInTheDocument();
  });

  it('accepts a single `region` prop and renders one node per mission', () => {
    const region: LayoutRegion = {
      id: 'A',
      title: 'Incentives',
      emoji: '🎪',
      terrain: 'market-stalls',
      missions: ['26', '27', '28', '29'],
    };
    const { container } = render(<WorldMap region={region} accent="#DAA520" />);
    expect(container.querySelectorAll('g[aria-label]')).toHaveLength(4);
  });
});
