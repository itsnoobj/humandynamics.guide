import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AudioPlayer } from '../AudioPlayer';

beforeAll(() => {
  // jsdom does not implement media playback; stub to no-ops.
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(async () => {});
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
});

describe('AudioPlayer', () => {
  it('renders a play button initially', () => {
    render(<AudioPlayer src="/audio/ch1.mp3" />);
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });

  it('toggles to pause on click', () => {
    render(<AudioPlayer src="/audio/ch1.mp3" />);
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
  });

  it('shows the time display', () => {
    render(<AudioPlayer src="/audio/ch1.mp3" />);
    expect(screen.getByText('0:00 / 0:00')).toBeInTheDocument();
  });
});
