import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PrincipleReveal } from '../PrincipleReveal';

describe('PrincipleReveal', () => {
  const principle = "People don't resist change. They resist loss.";
  const subtext = 'The brain weighs losses roughly twice as heavily as equivalent gains.';

  it('renders the principle text', () => {
    render(<PrincipleReveal text={principle} subtext={subtext} />);
    expect(screen.getByText(principle)).toBeInTheDocument();
  });

  it('renders the subtext', () => {
    render(<PrincipleReveal text={principle} subtext={subtext} />);
    expect(screen.getByText(subtext)).toBeInTheDocument();
  });

  it('renders the gold star', () => {
    render(<PrincipleReveal text={principle} subtext={subtext} />);
    const star = screen.getByRole('img', { name: /gold star/i });
    expect(star).toBeInTheDocument();
    expect(star).toHaveTextContent('⭐');
  });
});
