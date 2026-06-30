'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ROTATING_WORDS = [
  'manipulation',
  'difficult bosses',
  'team politics',
  'career crossroads',
  'broken trust',
  'ethical dilemmas',
  'ego traps',
  'unfair promotions',
  'passive aggression',
  'resistance to change',
];

export default function LandingPage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 400);
    }, 2800);
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
        padding: '2rem 1.5rem',
        background: 'var(--color-bg)',
        fontFamily: 'var(--font-primary)',
        textAlign: 'center',
      }}
    >
      {/* Hero — the rotating text IS the headline */}
      <div style={{ maxWidth: '700px' }}>
        <p
          style={{
            fontSize: '0.85rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--color-text-dim)',
            marginBottom: '1.5rem',
          }}
        >
          A Field Guide to Being Human
        </p>

        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'var(--color-text)',
            marginBottom: '0.5rem',
          }}
        >
          Stories to navigate
        </h1>

        <div
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            minHeight: '1.3em',
            color: 'var(--color-gold)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {ROTATING_WORDS[wordIndex]}
        </div>

        <p
          style={{
            marginTop: '2rem',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            color: 'var(--color-text-dim)',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Ancient wisdom meets real-world dilemmas. Learn through stories from the Mahabharata,
          Lincoln, Mandela — then test yourself with interactive challenges.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '3rem',
            maxWidth: '360px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {/* Map CTA — exploration vibe */}
          <Link
            href="/worlds"
            className="cta-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '1rem 1.5rem',
              background: 'var(--color-gold)',
              color: '#1A1A1A',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              textAlign: 'center',
              borderRadius: 'var(--radius)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="10" cy="10" r="8" />
              <path d="M10 2v16M2 10h16M4 4l12 12M16 4L4 16" opacity="0.4" />
              <path d="M10 6l-2 4 4 0-2 4" strokeWidth="2" />
            </svg>
            Begin Your Journey
          </Link>

          {/* Game CTA — action/runner vibe */}
          <Link
            href="/game"
            className="cta-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '1rem 1.5rem',
              background: 'transparent',
              color: 'var(--color-text)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              border: '1px solid var(--color-border)',
              textAlign: 'center',
              borderRadius: 'var(--radius)',
              transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="12" cy="4" r="2" />
              <path d="M8 8l4-1 2 3" />
              <path d="M12 10l-3 4" />
              <path d="M9 14l-2 4" />
              <path d="M12 10l2 4" />
              <path d="M14 14l1 4" />
              <path d="M8 8l-3 1" />
            </svg>
            Jump Straight In
          </Link>
        </div>
        {/* Glimpse previews */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            marginTop: '3rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {/* Map glimpse */}
          <Link href="/worlds" style={{ textDecoration: 'none', flex: '1', minWidth: '250px' }}>
            <div
              className="glimpse-card"
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
            >
              <svg
                viewBox="0 0 300 140"
                style={{ width: '100%', display: 'block', background: '#1A1A1A' }}
              >
                {/* Mini map preview — dotted paths and nodes */}
                <path
                  d="M40 110 Q80 60 140 80 Q200 100 240 50 Q270 30 280 40"
                  fill="none"
                  stroke="#DAA520"
                  strokeWidth="3"
                  strokeDasharray="2 8"
                  strokeLinecap="round"
                />
                <circle cx="40" cy="110" r="8" fill="#DAA520" stroke="#FFF" strokeWidth="1.5" />
                <circle cx="140" cy="80" r="8" fill="#DAA520" stroke="#FFF" strokeWidth="1.5" />
                <circle cx="240" cy="50" r="8" fill="#FFF" stroke="#DAA520" strokeWidth="2" />
                <text x="40" y="128" textAnchor="middle" fontSize="7" fill="#888">
                  ★
                </text>
                <text x="140" y="98" textAnchor="middle" fontSize="7" fill="#888">
                  ★
                </text>
                <text x="240" y="68" textAnchor="middle" fontSize="7" fill="#DAA520">
                  4
                </text>
                {/* Nature bits */}
                <path d="M90 40 l-5 10 h10 z" stroke="#555" strokeWidth="1" fill="none" />
                <path d="M200 30 l-4 8 h8 z" stroke="#555" strokeWidth="1" fill="none" />
                <circle
                  cx="170"
                  cy="120"
                  r="12"
                  stroke="#333"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.4"
                />
                {/* Emoji landmarks */}
                <text x="80" y="95" fontSize="12" opacity="0.6">
                  🎪
                </text>
                <text x="200" y="70" fontSize="12" opacity="0.6">
                  🤝
                </text>
              </svg>
              <div
                style={{
                  padding: '0.6rem 0.8rem',
                  background: 'var(--color-surface)',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)' }}>
                  Explore Worlds
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-dim)' }}>
                  10 worlds · Choose your path
                </div>
              </div>
            </div>
          </Link>

          {/* Game glimpse */}
          <Link href="/game" style={{ textDecoration: 'none', flex: '1', minWidth: '250px' }}>
            <div
              className="glimpse-card"
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
            >
              <svg
                viewBox="0 0 300 140"
                style={{ width: '100%', display: 'block', background: '#0D0D0D' }}
              >
                {/* Ground */}
                <line x1="0" y1="120" x2="300" y2="120" stroke="#333" strokeWidth="1" />
                {/* Stick figure running */}
                <circle cx="60" cy="90" r="6" fill="none" stroke="#FFF" strokeWidth="2" />
                <line x1="60" y1="96" x2="60" y2="110" stroke="#FFF" strokeWidth="2" />
                <line x1="60" y1="110" x2="54" y2="120" stroke="#FFF" strokeWidth="2" />
                <line x1="60" y1="110" x2="66" y2="120" stroke="#FFF" strokeWidth="2" />
                <line x1="60" y1="100" x2="68" y2="96" stroke="#FFF" strokeWidth="2" />
                {/* Obstacles */}
                <rect
                  x="140"
                  y="95"
                  width="20"
                  height="25"
                  fill="none"
                  stroke="#666"
                  strokeWidth="1.5"
                />
                <rect
                  x="220"
                  y="85"
                  width="15"
                  height="35"
                  fill="none"
                  stroke="#666"
                  strokeWidth="1.5"
                />
                {/* Spike */}
                <polygon
                  points="270,120 277,90 284,120"
                  fill="none"
                  stroke="#DAA520"
                  strokeWidth="1.5"
                />
                {/* Clouds */}
                <ellipse
                  cx="100"
                  cy="30"
                  rx="20"
                  ry="8"
                  fill="none"
                  stroke="#333"
                  strokeWidth="1"
                />
                <ellipse
                  cx="220"
                  cy="20"
                  rx="15"
                  ry="6"
                  fill="none"
                  stroke="#333"
                  strokeWidth="1"
                />
                {/* Score */}
                <text x="10" y="15" fontSize="9" fill="#DAA520" fontWeight="600">
                  ★ 3
                </text>
                {/* Hills */}
                <path
                  d="M0 130 Q50 115 100 130 Q150 118 200 130 Q250 120 300 130"
                  fill="none"
                  stroke="#222"
                  strokeWidth="1"
                />
              </svg>
              <div
                style={{
                  padding: '0.6rem 0.8rem',
                  background: 'var(--color-surface)',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)' }}>
                  Run & Learn
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-dim)' }}>
                  Hit obstacles · Solve challenges
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(212, 175, 55, 0.35);
        }
        .cta-secondary:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
        }
        .glimpse-card:hover {
          border-color: var(--color-gold) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </main>
  );
}
