import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RegionCard } from '../components/RegionCard';

const BASE = {
  emoji: '🎪',
  title: 'Incentives',
  description: 'Why people don\u2019t do what they say.',
  accent: '#DAA520',
} as const;

describe('RegionCard', () => {
  it('renders the title, description, and progress count', () => {
    render(<RegionCard {...BASE} missionCount={8} completedCount={3} onClick={() => {}} />);
    expect(screen.getByText('Incentives')).toBeInTheDocument();
    expect(screen.getByText(/Why people/)).toBeInTheDocument();
    expect(screen.getByText('3/8')).toBeInTheDocument();
  });

  it('invokes onClick when activated', () => {
    const onClick = vi.fn();
    render(<RegionCard {...BASE} missionCount={8} completedCount={0} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('exposes an accessible label describing progress', () => {
    render(<RegionCard {...BASE} missionCount={5} completedCount={2} onClick={() => {}} />);
    expect(
      screen.getByRole('button', { name: /Incentives — 2 of 5 missions complete/ }),
    ).toBeInTheDocument();
  });

  it('handles a zero-mission region without dividing by zero', () => {
    render(<RegionCard {...BASE} missionCount={0} completedCount={0} onClick={() => {}} />);
    expect(screen.getByText('0/0')).toBeInTheDocument();
  });
});
