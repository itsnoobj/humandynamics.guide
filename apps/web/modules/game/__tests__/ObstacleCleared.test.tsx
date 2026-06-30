import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ObstacleCleared } from '../components/ObstacleCleared';

afterEach(() => {
  vi.useRealTimers();
});

describe('ObstacleCleared', () => {
  it('renders the cleared label and chapter title', () => {
    render(<ObstacleCleared chapterTitle="Resisting Change" onDone={() => {}} />);
    expect(screen.getByText('Obstacle Cleared')).toBeInTheDocument();
    expect(screen.getByText('Resisting Change')).toBeInTheDocument();
    expect(screen.getByText('Path forward is open')).toBeInTheDocument();
  });

  it('invokes onDone when tapped', () => {
    const onDone = vi.fn();
    render(<ObstacleCleared chapterTitle="Resisting Change" onDone={onDone} />);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses after the timeout', () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<ObstacleCleared chapterTitle="Resisting Change" onDone={onDone} />);
    expect(onDone).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
