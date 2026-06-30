import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import type { QuizChallenge } from '@field-guide/shared-types';
import { QuizShell } from '../QuizShell';

/** One challenge of each supported template, with distinct, easy-to-target text. */
const challenges: QuizChallenge[] = [
  {
    type: 'scenario-choice',
    situation: 'A teammate takes credit for your work.',
    options: [
      { text: 'Correct scenario answer', correct: true, feedback: 'Well reasoned.' },
      { text: 'Wrong scenario answer', correct: false, feedback: 'Not quite.' },
    ],
  },
  {
    type: 'spot-the-force',
    situation: 'A manager hoards information from the team.',
    question: 'Which force is at play?',
    options: [
      { text: 'Correct force', correct: true, feedback: 'Exactly.' },
      { text: 'Wrong force A', correct: false, feedback: 'Try again.' },
      { text: 'Wrong force B', correct: false, feedback: 'Try again.' },
    ],
  },
  {
    type: 'card-flip',
    front: 'Flip me',
    back: 'The principle',
  },
];

describe('QuizShell', () => {
  it('renders progress dots equal to the challenges count', () => {
    render(<QuizShell challenges={challenges} onComplete={vi.fn()} />);
    const list = screen.getByRole('list', { name: 'Quiz progress' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(challenges.length);
  });

  it("renders ScenarioChoice for type 'scenario-choice'", () => {
    render(<QuizShell challenges={[challenges[0]]} onComplete={vi.fn()} />);
    expect(screen.getByText('A teammate takes credit for your work.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Correct scenario answer' })).toBeInTheDocument();
    // ScenarioChoice has no question label (that's SpotTheForce's marker).
    expect(screen.queryByText('Which force is at play?')).not.toBeInTheDocument();
  });

  it("renders SpotTheForce for type 'spot-the-force'", () => {
    render(<QuizShell challenges={[challenges[1]]} onComplete={vi.fn()} />);
    expect(screen.getByText('A manager hoards information from the team.')).toBeInTheDocument();
    expect(screen.getByText('Which force is at play?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Correct force' })).toBeInTheDocument();
  });

  it("renders CardFlip for type 'card-flip'", () => {
    render(<QuizShell challenges={[challenges[2]]} onComplete={vi.fn()} />);
    expect(screen.getByText('Flip me')).toBeInTheDocument();
    expect(screen.getByText('Tap to flip')).toBeInTheDocument();
  });

  it('calls onComplete after all challenges are answered', () => {
    const onComplete = vi.fn();
    render(<QuizShell challenges={challenges} onComplete={onComplete} />);

    // 1. scenario-choice: pick the correct option, then advance.
    fireEvent.click(screen.getByRole('button', { name: 'Correct scenario answer' }));
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));

    // 2. spot-the-force: pick the correct force, then advance.
    fireEvent.click(screen.getByRole('button', { name: 'Correct force' }));
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));

    // 3. card-flip: flip the card, then acknowledge.
    fireEvent.click(screen.getByRole('button', { name: 'Flip card' }));
    fireEvent.click(screen.getByRole('button', { name: /Got it/ }));

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith(3);
  });
});
