'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/** A single orderable item. */
export interface DragMatchItem {
  /** Stable id used to check against the correct order. */
  id: string;
  /** Display text. */
  text: string;
}

/** Props for {@link DragMatch}. */
export interface DragMatchProps {
  /** Instruction telling the learner what to order (e.g. "Put these in order"). */
  instruction: string;
  /** Items to order; shown shuffled. */
  items: DragMatchItem[];
  /** The ids in their correct sequence. */
  correctOrder: string[];
  /** Called once the learner submits the correct order. */
  onCorrect: () => void;
}

const WRONG_FLASH_MS = 1200;

/** Deterministic-free shuffle (Fisher–Yates) that never returns the input order. */
function shuffle<T>(input: T[]): T[] {
  if (input.length < 2) return [...input];
  let result = [...input];
  // Reshuffle until the order differs, so the task is never pre-solved.
  for (let attempt = 0; attempt < 8; attempt += 1) {
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    const changed = result.some((item, index) => item !== input[index]);
    if (changed) break;
  }
  return result;
}

/**
 * "Put these in the right order" challenge.
 * Items are presented shuffled with up/down arrows to reorder (simpler and
 * more reliable on mobile than drag-and-drop). A "Check Order" button
 * validates the sequence: correct flashes green and advances, wrong flashes
 * red and lets the learner retry.
 */
export function DragMatch({ instruction, items, correctOrder, onCorrect }: DragMatchProps) {
  const [order, setOrder] = useState<DragMatchItem[]>(() => shuffle(items));
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const isCorrect = useMemo(
    () =>
      order.length === correctOrder.length &&
      order.every((item, index) => item.id === correctOrder[index]),
    [order, correctOrder],
  );

  const move = (index: number, direction: -1 | 1) => {
    if (status === 'correct') return;
    const target = index + direction;
    if (target < 0 || target >= order.length) return;
    setOrder((prev) => {
      const nextOrder = [...prev];
      [nextOrder[index], nextOrder[target]] = [nextOrder[target], nextOrder[index]];
      return nextOrder;
    });
    setStatus('idle');
  };

  const handleCheck = () => {
    if (status === 'correct') return;
    if (isCorrect) {
      setStatus('correct');
    } else {
      setStatus('wrong');
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setStatus('idle'), WRONG_FLASH_MS);
    }
  };

  const rowBorder = (): string => {
    if (status === 'correct') return 'var(--color-correct)';
    if (status === 'wrong') return 'var(--color-wrong)';
    return 'var(--color-border)';
  };

  return (
    <div className="flex flex-col gap-4" style={{ color: 'var(--color-text)' }}>
      <p style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>{instruction}</p>

      <ol className="flex flex-col gap-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {order.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center gap-3"
            style={{
              padding: 'var(--spacing-md)',
              borderRadius: 'var(--radius)',
              border: `2px solid ${rowBorder()}`,
              background: 'var(--color-surface)',
              transition: 'border-color 0.2s ease',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                minWidth: '1.5rem',
                fontWeight: 700,
                color: 'var(--color-gold)',
                textAlign: 'center',
              }}
            >
              {index + 1}
            </span>

            <span style={{ flex: 1 }}>{item.text}</span>

            <span className="flex flex-col gap-1">
              <button
                type="button"
                aria-label={`Move "${item.text}" up`}
                onClick={() => move(index, -1)}
                disabled={index === 0 || status === 'correct'}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--color-text)',
                  cursor: index === 0 || status === 'correct' ? 'default' : 'pointer',
                  opacity: index === 0 ? 0.3 : 1,
                  fontSize: '1rem',
                  lineHeight: 1,
                }}
              >
                ▲
              </button>
              <button
                type="button"
                aria-label={`Move "${item.text}" down`}
                onClick={() => move(index, 1)}
                disabled={index === order.length - 1 || status === 'correct'}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--color-text)',
                  cursor:
                    index === order.length - 1 || status === 'correct' ? 'default' : 'pointer',
                  opacity: index === order.length - 1 ? 0.3 : 1,
                  fontSize: '1rem',
                  lineHeight: 1,
                }}
              >
                ▼
              </button>
            </span>
          </li>
        ))}
      </ol>

      {status === 'wrong' && (
        <p role="status" style={{ color: 'var(--color-wrong)', fontWeight: 600 }}>
          Try again
        </p>
      )}
      {status === 'correct' && (
        <p role="status" style={{ color: 'var(--color-correct)', fontWeight: 600 }}>
          Correct!
        </p>
      )}

      {status === 'correct' ? (
        <button
          type="button"
          onClick={onCorrect}
          style={{
            alignSelf: 'flex-end',
            padding: 'var(--spacing-sm) var(--spacing-lg)',
            borderRadius: 'var(--radius)',
            border: 'none',
            background: 'var(--color-gold)',
            color: '#1A1A1A',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Next →
        </button>
      ) : (
        <button
          type="button"
          onClick={handleCheck}
          style={{
            alignSelf: 'flex-end',
            padding: 'var(--spacing-sm) var(--spacing-lg)',
            borderRadius: 'var(--radius)',
            border: '2px solid var(--color-gold)',
            background: 'transparent',
            color: 'var(--color-gold)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Check Order
        </button>
      )}
    </div>
  );
}
