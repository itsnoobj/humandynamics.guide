import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HitInterstitial } from '../components/HitInterstitial';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('@/lib/hierarchy', () => ({
  findChapterLocation: (id: string) =>
    id === '1' ? { worldId: 1, regionId: 'A' } : null,
}));

describe('HitInterstitial', () => {
  const props = {
    title: 'Test Chapter',
    situation: 'A tricky situation',
    chapterId: '1',
  };

  it('renders the chapter title', () => {
    render(<HitInterstitial {...props} />);
    expect(screen.getByText('Test Chapter')).toBeInTheDocument();
  });

  it('renders the situation text', () => {
    render(<HitInterstitial {...props} />);
    expect(screen.getByText('A tricky situation')).toBeInTheDocument();
  });

  it('renders the CTA button', () => {
    render(<HitInterstitial {...props} />);
    expect(screen.getByText(/Accept the Challenge/i)).toBeInTheDocument();
  });

  it('navigates to chapter on CTA click', () => {
    render(<HitInterstitial {...props} />);
    fireEvent.click(screen.getByText(/Accept the Challenge/i));
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining('/worlds/1/region/A/mission/1')
    );
  });

  it('calls onContinue callback when provided', () => {
    const onContinue = vi.fn();
    render(<HitInterstitial {...props} onContinue={onContinue} />);
    fireEvent.click(screen.getByText(/Accept the Challenge/i));
    expect(onContinue).toHaveBeenCalled();
  });
});
