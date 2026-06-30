import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorldLandscape } from '../components/WorldLandscape';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('@/store/progressStore', () => ({
  useProgressStore: (sel: (s: { completedChapters: string[] }) => unknown) =>
    sel({ completedChapters: ['1', '2'] }),
}));

vi.mock('@/lib/hierarchy', () => ({
  availableChapterIds: new Set(['1', '2', '3', '4', '5']),
}));

function makeWorld(id: number, name: string) {
  return {
    id,
    title: name,
    worldName: name,
    tagline: `Tagline ${id}`,
    landscape: 'default',
    accent: '#DAA520',
    regions: [{ id: `r${id}`, title: `R${id}`, emoji: '🌍', description: 'D', missions: [`${id}`] }],
  };
}

// Cover all 10 world icon switch cases + overflow (serpentinePosition)
const allWorlds = [
  makeWorld(1, 'The Mirror'),
  makeWorld(2, 'The Crowd'),
  makeWorld(3, 'The Campfire'),
  makeWorld(4, 'The Summit'),
  makeWorld(5, 'The Maze'),
  makeWorld(6, 'The Crossroads'),
  makeWorld(7, 'The Bridge'),
  makeWorld(8, 'The Arena'),
  makeWorld(9, 'The Scale'),
  makeWorld(10, 'The Horizon'),
  makeWorld(11, 'Bonus World'), // triggers serpentinePosition fallback
];

describe('WorldLandscape', () => {
  it('renders all world names', () => {
    render(<WorldLandscape worlds={allWorlds} />);
    allWorlds.forEach((w) => {
      expect(screen.getByText(w.worldName)).toBeInTheDocument();
    });
  });

  it('renders all world taglines', () => {
    render(<WorldLandscape worlds={allWorlds} />);
    allWorlds.forEach((w) => {
      expect(screen.getByText(w.tagline)).toBeInTheDocument();
    });
  });

  it('renders an SVG', () => {
    const { container } = render(<WorldLandscape worlds={allWorlds} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('navigates on world click', () => {
    render(<WorldLandscape worlds={allWorlds} />);
    fireEvent.click(screen.getByText('The Mirror'));
    expect(mockPush).toHaveBeenCalledWith('/worlds/1');
  });

  it('snapshot remains stable', () => {
    const { container } = render(<WorldLandscape worlds={allWorlds} />);
    expect(container.querySelector('svg')!.innerHTML).toMatchSnapshot();
  });
});
