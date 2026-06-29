import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MapNode } from '../components/MapNode';

/** Renders a single MapNode wrapped in an <svg> so SVG elements are valid. */
function renderNode(props: Parameters<typeof MapNode>[0]) {
  return render(
    <svg>
      <MapNode {...props} />
    </svg>,
  );
}

const BASE = { x: 100, y: 100, label: 4, title: 'Resisting Change' } as const;

describe('MapNode', () => {
  it('renders a star when status is done', () => {
    renderNode({ ...BASE, status: 'done' });
    expect(screen.getByText('★')).toBeInTheDocument();
    // The numeric label should not be shown for a completed node.
    expect(screen.queryByText('4')).not.toBeInTheDocument();
  });

  it('renders the number when status is current', () => {
    renderNode({ ...BASE, status: 'current' });
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.queryByText('★')).not.toBeInTheDocument();
  });

  it('invokes onClick for a non-locked node', () => {
    const onClick = vi.fn();
    renderNode({ ...BASE, status: 'current', onClick });
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not invoke onClick for a locked node', () => {
    const onClick = vi.fn();
    renderNode({ ...BASE, status: 'locked', onClick });
    // Locked nodes expose no button role; click the rendered label instead.
    fireEvent.click(screen.getByText('Resisting Change'));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
