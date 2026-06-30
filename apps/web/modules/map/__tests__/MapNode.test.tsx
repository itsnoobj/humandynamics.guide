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

  it('renders the number when status is available', () => {
    renderNode({ ...BASE, status: 'available' });
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.queryByText('★')).not.toBeInTheDocument();
  });

  it('renders the number when status is recommended', () => {
    renderNode({ ...BASE, status: 'recommended' });
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.queryByText('★')).not.toBeInTheDocument();
  });

  it('invokes onClick for an available node', () => {
    const onClick = vi.fn();
    renderNode({ ...BASE, status: 'available', onClick });
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('invokes onClick for a recommended node', () => {
    const onClick = vi.fn();
    renderNode({ ...BASE, status: 'recommended', onClick });
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('exposes a button role for every node (nothing is locked)', () => {
    renderNode({ ...BASE, status: 'available' });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
