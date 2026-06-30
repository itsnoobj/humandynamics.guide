import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useParams: () => ({ id: '1', regionId: 'r1' }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  } & Record<string, unknown>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('@/modules/worlds', () => ({
  RegionMap: () => <div data-testid="region-map" />,
}));

vi.mock('@/modules/map', () => ({
  WorldMap: () => <div data-testid="world-map" />,
}));

vi.mock('@/shared/components/ThemeToggle', () => ({
  ThemeToggle: () => null,
}));

vi.mock('@/store/progressStore', () => ({
  useProgressStore: (sel: (s: { completedChapters: string[] }) => unknown) =>
    sel({ completedChapters: [] }),
}));

vi.mock('@/lib/hierarchy', () => ({
  getWorld: (id: string) =>
    id === '1'
      ? {
          id: 1,
          worldName: 'Test World',
          tagline: 'A test',
          accent: '#DAA520',
          regions: [
            { id: 'r1', title: 'Region One', emoji: '🌍', description: 'Desc', missions: ['1'] },
          ],
        }
      : undefined,
  availableChapterIds: new Set(['1']),
}));

// Use dynamic imports to avoid vite issues with brackets in paths
const loadWorldClient = () =>
  import('../worlds/[id]/WorldClient').then((m) => m.WorldClient);
const loadRegionClient = () =>
  import('../worlds/[id]/region/[regionId]/RegionClient').then((m) => m.RegionClient);

// Mock localStorage for RegionClient's useEffect
const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

describe('WorldClient - home navigation', () => {
  it('renders a home link pointing to /', async () => {
    const WorldClient = await loadWorldClient();
    render(<WorldClient />);
    const links = screen.getAllByRole('link');
    const homeLink = links.find((l) => l.getAttribute('href') === '/');
    expect(homeLink).toBeDefined();
  });

  it('renders a back link to /worlds', async () => {
    const WorldClient = await loadWorldClient();
    render(<WorldClient />);
    expect(screen.getByText('← Worlds')).toBeInTheDocument();
  });
});

describe('RegionClient - home navigation', () => {
  it('renders a home link pointing to /', async () => {
    const RegionClient = await loadRegionClient();
    render(<RegionClient />);
    const links = screen.getAllByRole('link');
    const homeLink = links.find((l) => l.getAttribute('href') === '/');
    expect(homeLink).toBeDefined();
  });

  it('renders a back link to the world', async () => {
    const RegionClient = await loadRegionClient();
    render(<RegionClient />);
    expect(screen.getByText('← Test World')).toBeInTheDocument();
  });
});
