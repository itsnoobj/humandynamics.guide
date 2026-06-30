import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorldsPage from '../worlds/page';

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
  WorldLandscape: () => <div data-testid="world-landscape" />,
}));

vi.mock('@/lib/hierarchy', () => ({
  worlds: [],
}));

describe('WorldsPage', () => {
  it('renders a home link pointing to /', () => {
    render(<WorldsPage />);
    const homeLink = screen.getByText(/Home/);
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders the page title', () => {
    render(<WorldsPage />);
    expect(
      screen.getByRole('heading', { name: 'A Field Guide to Being Human' })
    ).toBeInTheDocument();
  });
});
