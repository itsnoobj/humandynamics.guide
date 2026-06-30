import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { PathUnlocked } from '../components/PathUnlocked';

afterEach(() => {
  vi.useRealTimers();
});

describe('PathUnlocked', () => {
  it('renders the unlocked label and the from → to route', () => {
    render(<PathUnlocked fromNode="Resisting Change" toNode="Ownership" onDone={() => {}} />);
    expect(screen.getByText('Path Unlocked')).toBeInTheDocument();
    expect(screen.getByText('Resisting Change → Ownership')).toBeInTheDocument();
  });

  it('invokes onDone when tapped', () => {
    const onDone = vi.fn();
    render(<PathUnlocked fromNode="A" toNode="B" onDone={onDone} />);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses after the timeout', () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<PathUnlocked fromNode="A" toNode="B" onDone={onDone} />);
    expect(onDone).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
