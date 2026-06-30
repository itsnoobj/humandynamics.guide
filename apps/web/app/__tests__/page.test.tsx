import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '../page';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));

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

describe('LandingPage', () => {
  it("renders the 'Stories to navigate' heading", () => {
    render(<Page />);
    expect(screen.getByRole('heading', { name: 'Stories to navigate' })).toBeInTheDocument();
  });

  it("renders the first rotating word ('manipulation')", () => {
    render(<Page />);
    expect(screen.getByText('manipulation')).toBeInTheDocument();
  });

  it("renders the 'Learn through stories' subtext", () => {
    render(<Page />);
    expect(screen.getByText(/Learn through stories/)).toBeInTheDocument();
  });

  it("renders the 'Explore the Map' card", () => {
    render(<Page />);
    expect(screen.getByText('Explore the Map')).toBeInTheDocument();
  });

  it("renders the 'Play the Game' card", () => {
    render(<Page />);
    expect(screen.getByText('Play the Game')).toBeInTheDocument();
  });

  it("renders sample mission text with 'e.g.'", () => {
    render(<Page />);
    expect(screen.getByText('e.g.')).toBeInTheDocument();
  });

  it('links the map card to /worlds', () => {
    render(<Page />);
    const mapLink = screen.getByText('Explore the Map').closest('a');
    expect(mapLink).toHaveAttribute('href', '/worlds');
  });

  it('links the game card to /game', () => {
    render(<Page />);
    const gameLink = screen.getByText('Play the Game').closest('a');
    expect(gameLink).toHaveAttribute('href', '/game');
  });
});
