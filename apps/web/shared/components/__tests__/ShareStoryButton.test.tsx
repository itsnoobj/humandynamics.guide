import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShareStoryButton } from '../ShareStoryButton';

describe('ShareStoryButton', () => {
  it('renders the button with share label', () => {
    render(<ShareStoryButton />);
    expect(screen.getByRole('button', { name: 'Share a story' })).toBeInTheDocument();
  });

  it('opens dialog on click', () => {
    render(<ShareStoryButton />);
    fireEvent.click(screen.getByRole('button', { name: 'Share a story' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Have a story?')).toBeInTheDocument();
  });

  it('shows coming soon badge in dialog', () => {
    render(<ShareStoryButton />);
    fireEvent.click(screen.getByRole('button', { name: 'Share a story' }));
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
  });

  it('closes dialog on "Got it" click', () => {
    render(<ShareStoryButton />);
    fireEvent.click(screen.getByRole('button', { name: 'Share a story' }));
    fireEvent.click(screen.getByText('Got it'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes dialog on backdrop click', () => {
    render(<ShareStoryButton />);
    fireEvent.click(screen.getByRole('button', { name: 'Share a story' }));
    fireEvent.click(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
