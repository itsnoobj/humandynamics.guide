import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChapterVisual } from '../ChapterVisual';

describe('ChapterVisual', () => {
  it('renders an image with the given src and alt', () => {
    render(<ChapterVisual src="/content/1.svg" alt="Chapter 1 illustration" />);
    const img = screen.getByAltText('Chapter 1 illustration');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/content/1.svg');
  });

  it('renders inside a figure element', () => {
    render(<ChapterVisual src="/content/2.svg" alt="Test" />);
    expect(screen.getByRole('figure')).toBeInTheDocument();
  });
});
