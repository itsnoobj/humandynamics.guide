'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

const ROTATING_WORDS = [
  'manipulation',
  'difficult bosses',
  'team conflicts',
  'career crossroads',
  'office politics',
  'ethical dilemmas',
  'ego traps',
  'trust issues',
];

const ROTATE_INTERVAL = 2500;

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out, swap word, fade back in.
      setVisible(false);
      const timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 300);
      return () => clearTimeout(timeout);
    }, ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--spacing-lg)',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      <ThemeToggle />

      <div style={{ maxWidth: '640px' }}>
        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          A Field Guide to Being Human
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            marginTop: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-sm)',
          }}
        >
          Stories to navigate{' '}
          <span
            style={{
              color: 'var(--color-gold)',
              fontWeight: 600,
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.3s ease',
              display: 'inline-block',
            }}
          >
            {ROTATING_WORDS[index]}
          </span>
        </p>

        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--color-text-dim)',
            maxWidth: '34rem',
            margin: '0 auto',
          }}
        >
          Learn through ancient stories, real-world scenarios, and interactive challenges.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 'var(--spacing-lg)',
          }}
        >
          <Link
            href="/worlds"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--color-gold)',
              color: '#1f1d1a',
              fontWeight: 600,
              textDecoration: 'none',
              border: '2px solid var(--color-gold)',
            }}
          >
            Explore the Map →
          </Link>
          <Link
            href="/game"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              color: 'var(--color-text)',
              fontWeight: 600,
              textDecoration: 'none',
              border: '2px solid var(--color-border)',
            }}
          >
            Play the Game →
          </Link>
        </div>

        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-dim)',
            marginTop: 'var(--spacing-lg)',
          }}
        >
          110 missions across 10 worlds
        </p>
      </div>
    </main>
  );
}
