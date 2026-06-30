import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WorldMap } from '../components/WorldMap';
import { MapHeader } from '../components/MapHeader';

// WorldMap navigates via the App Router and derives node status from the
// progress store. Stub both so the component renders deterministically.
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

// useMapProgress reads completedChapters via a selector; return a fixed set so
// the first three nodes are "done", the fourth "current", the rest "locked".
vi.mock('@/store/progressStore', () => ({
  useProgressStore: (selector: (state: { completedChapters: string[] }) => unknown) =>
    selector({ completedChapters: ['26', '27', '28'] }),
}));

describe('WorldMap', () => {
  it('renders an SVG element', () => {
    render(<WorldMap />);
    expect(screen.getByRole('img', { name: /World map/ })).toBeInTheDocument();
  });

  it('renders the correct number of nodes (7)', () => {
    const { container } = render(<WorldMap />);
    // Every MapNode renders a <g> with an aria-label (interactive or locked).
    expect(container.querySelectorAll('g[aria-label]')).toHaveLength(7);
  });

  it('renders the MapHeader title', () => {
    render(<MapHeader />);
    expect(screen.getByText('A Field Guide to Being Human')).toBeInTheDocument();
  });
});
