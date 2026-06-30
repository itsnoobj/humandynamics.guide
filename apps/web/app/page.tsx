'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ROTATING_WORDS = [
  'manipulation',
  'difficult bosses',
  'team politics',
  'broken trust',
  'ego traps',
  'passive aggression',
  'resistance to change',
  'unfair promotions',
  'ethical dilemmas',
  'office politics',
];

const SAMPLE_MISSIONS = [
  'Why your manager hoards information',
  'Why nobody owns the problem',
  'How to handle someone who plays victim',
  'Why smart people stop learning',
  'When to stay vs. when to leave',
];

export default function LandingPage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [sampleIndex, setSampleIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setSampleIndex((i) => (i + 1) % SAMPLE_MISSIONS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Generate brick row
  const bricks = (y: number, offset = 0) =>
    Array.from({ length: 42 }, (_, i) => (
      <rect
        key={`b-${y}-${i}`}
        x={i * 30 + offset}
        y={y}
        width="28"
        height="13"
        stroke="#2A2A2A"
        strokeWidth="0.5"
        fill="none"
      />
    ));

  // Generate stepped pyramid blocks
  const pyramid = (baseX: number, baseY: number, rows: number) =>
    Array.from({ length: rows }, (_, row) =>
      Array.from({ length: row + 2 }, (_, col) => (
        <rect
          key={`pyr-${baseX}-${row}-${col}`}
          x={baseX + col * 20 + (rows - 1 - row) * 10}
          y={baseY - (row + 1) * 20}
          width="18"
          height="18"
          stroke="#3A3A3A"
          strokeWidth="0.7"
          fill="none"
        />
      )),
    );

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        background: '#0D0D0D',
        fontFamily: 'var(--font-primary)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background — geometric game world */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground bricks */}
        {bricks(645, 0)}
        {bricks(658, 15)}
        <line x1="0" y1="643" x2="1200" y2="643" stroke="#333" strokeWidth="1.5" />

        {/* Left stepped pyramid */}
        {pyramid(60, 643, 9)}

        {/* Right castle */}
        <rect x="950" y="503" width="90" height="140" stroke="#3A3A3A" strokeWidth="0.8" />
        <rect x="960" y="515" width="22" height="28" stroke="#3A3A3A" strokeWidth="0.7" />
        <rect x="1005" y="515" width="22" height="28" stroke="#3A3A3A" strokeWidth="0.7" />
        <rect x="975" y="565" width="32" height="45" stroke="#3A3A3A" strokeWidth="0.7" />
        {/* Towers */}
        <rect x="938" y="460" width="32" height="43" stroke="#3A3A3A" strokeWidth="0.8" />
        <rect x="1012" y="460" width="32" height="43" stroke="#3A3A3A" strokeWidth="0.8" />
        {/* Crenellations */}
        <rect x="938" y="448" width="12" height="14" stroke="#3A3A3A" strokeWidth="0.7" />
        <rect x="958" y="448" width="12" height="14" stroke="#3A3A3A" strokeWidth="0.7" />
        <rect x="1012" y="448" width="12" height="14" stroke="#3A3A3A" strokeWidth="0.7" />
        <rect x="1032" y="448" width="12" height="14" stroke="#3A3A3A" strokeWidth="0.7" />
        {/* Arch gate */}
        <path d="M980 643 Q995 615 1010 643" stroke="#3A3A3A" strokeWidth="0.8" />

        {/* Center mountain */}
        <path d="M540 643 L610 510 L680 643" stroke="#2A2A2A" strokeWidth="1" />
        <path
          d="M560 643 L610 535 L660 643"
          stroke="#2A2A2A"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        />
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={`mdot-${i}`} cx={570 + i * 15} cy={625 - i * 10} r="1.5" fill="#2A2A2A" />
        ))}

        {/* Clouds */}
        <g stroke="#3A3A3A" strokeWidth="1.2" fill="none">
          <ellipse cx="220" cy="140" rx="38" ry="15" />
          <ellipse cx="195" cy="140" rx="22" ry="10" />
          <ellipse cx="248" cy="138" rx="20" ry="9" />
        </g>
        <g stroke="#3A3A3A" strokeWidth="1.2" fill="none">
          <ellipse cx="920" cy="170" rx="32" ry="13" />
          <ellipse cx="898" cy="170" rx="18" ry="9" />
          <ellipse cx="942" cy="168" rx="16" ry="8" />
        </g>
        <g stroke="#2A2A2A" strokeWidth="1" fill="none">
          <ellipse cx="580" cy="90" rx="28" ry="11" />
          <ellipse cx="560" cy="90" rx="16" ry="8" />
        </g>

        {/* Lamp post with gold flag */}
        <line x1="750" y1="643" x2="750" y2="470" stroke="#3A3A3A" strokeWidth="1.8" />
        <circle cx="750" cy="465" r="6" stroke="#3A3A3A" strokeWidth="1" fill="none" />
        <line x1="750" y1="465" x2="750" y2="445" stroke="#DAA520" strokeWidth="1.5" />
        <path d="M750 445 L768 451 L750 457" stroke="#DAA520" strokeWidth="1.2" fill="none" />

        {/* Small house left */}
        <rect
          x="100"
          y="598"
          width="38"
          height="45"
          stroke="#3A3A3A"
          strokeWidth="0.8"
          fill="none"
        />
        <rect
          x="106"
          y="610"
          width="11"
          height="16"
          stroke="#3A3A3A"
          strokeWidth="0.5"
          fill="none"
        />
        <rect
          x="122"
          y="610"
          width="11"
          height="16"
          stroke="#3A3A3A"
          strokeWidth="0.5"
          fill="none"
        />
        <path d="M96 598 L119 575 L142 598" stroke="#3A3A3A" strokeWidth="0.8" fill="none" />

        {/* Trees */}
        <g stroke="#2A2A2A" strokeWidth="1.2" fill="none">
          <line x1="400" y1="643" x2="400" y2="608" />
          <path d="M400 608 L388 622 M400 608 L412 622" />
          <path d="M400 600 L390 612 M400 600 L410 612" />
        </g>
        <g stroke="#2A2A2A" strokeWidth="1.2" fill="none">
          <line x1="840" y1="643" x2="840" y2="600" />
          <path d="M840 600 L828 616 M840 600 L852 616" />
          <path d="M840 592 L830 606 M840 592 L850 606" />
        </g>

        {/* Stars */}
        {[
          [80, 60],
          [320, 45],
          [480, 30],
          [780, 55],
          [1080, 40],
          [180, 220],
          [1100, 200],
          [650, 70],
        ].map(([x, y], i) => (
          <circle key={`star-${i}`} cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 1} fill="#3A3A3A" />
        ))}

        {/* Distant buildings (right skyline) */}
        <rect
          x="1100"
          y="580"
          width="25"
          height="63"
          stroke="#2A2A2A"
          strokeWidth="0.7"
          fill="none"
        />
        <rect
          x="1130"
          y="600"
          width="20"
          height="43"
          stroke="#2A2A2A"
          strokeWidth="0.7"
          fill="none"
        />
        <rect
          x="1155"
          y="590"
          width="18"
          height="53"
          stroke="#2A2A2A"
          strokeWidth="0.7"
          fill="none"
        />
      </svg>

      {/* Content overlay */}
      <div style={{ maxWidth: '700px', position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#E8E8E8',
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
            color: '#DAA520',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {ROTATING_WORDS[wordIndex]}
        </div>

        {/* Subtext */}
        <p
          style={{
            marginTop: '2rem',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: '#999',
            maxWidth: '460px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Why do people resist change? Why does ego destroy teams?
          <br />
          Learn through stories from history, epics, and real life.
        </p>

        {/* Sample mission — curiosity hook */}
        <div
          style={{
            marginTop: '1.5rem',
            padding: '0.7rem 1.2rem',
            border: '1px solid #333',
            display: 'inline-block',
            fontSize: '0.85rem',
            color: '#E8E8E8',
            fontStyle: 'italic',
          }}
        >
          <span style={{ color: '#777', fontStyle: 'normal', marginRight: '0.5rem' }}>e.g.</span>
          &ldquo;{SAMPLE_MISSIONS[sampleIndex]}&rdquo;
        </div>

        {/* CTAs with previews */}
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
          {/* Map entry */}
          <Link href="/worlds" style={{ textDecoration: 'none', flex: '1', minWidth: '250px' }}>
            <div
              className="glimpse-card"
              style={{
                border: '1px solid #333',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
            >
              <svg
                viewBox="0 0 300 100"
                style={{ width: '100%', display: 'block', background: '#141414' }}
              >
                <path
                  d="M30 80 Q70 40 130 55 Q190 75 240 35 Q270 22 285 28"
                  fill="none"
                  stroke="#DAA520"
                  strokeWidth="3"
                  strokeDasharray="2 8"
                  strokeLinecap="round"
                />
                <circle cx="30" cy="80" r="6" fill="#DAA520" stroke="#FFF" strokeWidth="1" />
                <circle cx="130" cy="55" r="6" fill="#DAA520" stroke="#FFF" strokeWidth="1" />
                <circle cx="240" cy="35" r="6" fill="#FFF" stroke="#DAA520" strokeWidth="1.5" />
                <text x="75" y="68" fontSize="10" opacity="0.5">
                  🎪
                </text>
                <text x="185" y="48" fontSize="10" opacity="0.5">
                  🤝
                </text>
              </svg>
              <div
                style={{
                  padding: '0.6rem 0.8rem',
                  background: '#1A1A1A',
                  borderTop: '1px solid #333',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#E8E8E8' }}>
                  Explore the Map
                </div>
                <div style={{ fontSize: '0.65rem', color: '#777', marginTop: '0.15rem' }}>
                  Pick your problem. Read the story. Solve the challenge.
                </div>
              </div>
            </div>
          </Link>

          {/* Game entry */}
          <Link href="/game" style={{ textDecoration: 'none', flex: '1', minWidth: '250px' }}>
            <div
              className="glimpse-card"
              style={{
                border: '1px solid #333',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
            >
              <svg
                viewBox="0 0 300 100"
                style={{ width: '100%', display: 'block', background: '#0A0A0A' }}
              >
                <line x1="0" y1="85" x2="300" y2="85" stroke="#333" strokeWidth="1" />
                <circle cx="50" cy="60" r="5" fill="none" stroke="#FFF" strokeWidth="1.8" />
                <line x1="50" y1="65" x2="50" y2="77" stroke="#FFF" strokeWidth="1.8" />
                <line x1="50" y1="77" x2="45" y2="85" stroke="#FFF" strokeWidth="1.8" />
                <line x1="50" y1="77" x2="55" y2="85" stroke="#FFF" strokeWidth="1.8" />
                <line x1="50" y1="69" x2="57" y2="66" stroke="#FFF" strokeWidth="1.8" />
                <rect
                  x="130"
                  y="65"
                  width="16"
                  height="20"
                  fill="none"
                  stroke="#555"
                  strokeWidth="1.5"
                />
                <rect
                  x="200"
                  y="55"
                  width="12"
                  height="30"
                  fill="none"
                  stroke="#555"
                  strokeWidth="1.5"
                />
                <polygon
                  points="260,85 266,60 272,85"
                  fill="none"
                  stroke="#DAA520"
                  strokeWidth="1.5"
                />
                <text x="10" y="14" fontSize="8" fill="#DAA520" fontWeight="600">
                  ★ 3
                </text>
              </svg>
              <div
                style={{
                  padding: '0.6rem 0.8rem',
                  background: '#1A1A1A',
                  borderTop: '1px solid #333',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#E8E8E8' }}>
                  Play the Game
                </div>
                <div style={{ fontSize: '0.65rem', color: '#777', marginTop: '0.15rem' }}>
                  Run. Hit obstacles. Lessons find you.
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        .glimpse-card:hover {
          border-color: #DAA520 !important;
          transform: translateY(-2px);
        }
      `}</style>
    </main>
  );
}
