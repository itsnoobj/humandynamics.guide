import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RegionList } from '../components/RegionList';
import type { Region } from '@/lib/hierarchy';

const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

// Two missions of region A are complete; region B has none.
vi.mock('@/store/progressStore', () => ({
  useProgressStore: (selector: (state: { completedChapters: string[] }) => unknown) =>
    selector({ completedChapters: ['26', '27'] }),
}));

const REGIONS: Region[] = [
  {
    id: 'A',
    title: 'Incentives',
    description: 'Hidden motives.',
    emoji: '🎪',
    terrain: 'market-stalls',
    missions: ['26', '27', '28', '29'],
  },
  {
    id: 'B',
    title: 'Trust',
    description: 'How it is built.',
    emoji: '🤝',
    terrain: 'bridge',
    missions: ['34', '35'],
  },
];

describe('RegionList', () => {
  beforeEach(() => push.mockClear());

  it('renders one card per region', () => {
    render(<RegionList worldId={2} regions={REGIONS} accent="#DAA520" />);
    expect(screen.getByText('Incentives')).toBeInTheDocument();
    expect(screen.getByText('Trust')).toBeInTheDocument();
  });

  it('computes completed counts from the progress store', () => {
    render(<RegionList worldId={2} regions={REGIONS} accent="#DAA520" />);
    expect(screen.getByText('2/4')).toBeInTheDocument();
    expect(screen.getByText('0/2')).toBeInTheDocument();
  });

  it('navigates to the region route on click', () => {
    render(<RegionList worldId={2} regions={REGIONS} accent="#DAA520" />);
    fireEvent.click(screen.getByText('Trust'));
    expect(push).toHaveBeenCalledWith('/worlds/2/region/B');
  });
});
