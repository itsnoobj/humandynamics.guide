import Link from 'next/link';

export const metadata = {
  title: 'Why this? — Human Dynamics',
  description: 'Why we built Human Dynamics and how stories help navigate difficult situations.',
};

export default function WhyPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-primary)',
      }}
    >
      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <Link href="/" style={{ color: 'var(--color-text)', fontSize: '0.9rem', textDecoration: 'none' }}>
          🏠 Home
        </Link>

        <header style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
            Why this?
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-dim)', marginTop: '0.6rem', lineHeight: 1.6 }}>
            Learn to see the patterns that drive people — through stories.
          </p>
        </header>

        <p style={{ lineHeight: 1.8, margin: '0 0 2rem', fontSize: '0.95rem' }}>
          We all face situations nobody prepared us for — difficult bosses, broken trust,
          unfair outcomes, relationships that unravel. Behind all of it are 10 recurring forces:
          incentives, ego, fear, trust, status, identity, scarcity, power, uncertainty, and reciprocity.
          Once we learn to see them, we can navigate anything.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <details style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-gold)' }}>
              Why stories?
            </summary>
            <p style={{ lineHeight: 1.8, margin: '0.75rem 0 0', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
              Principles fade. Stories stick. A story about Arjuna&apos;s hesitation, Lincoln&apos;s patience,
              or a manager&apos;s blind spot — that stays with us. Each chapter anchors a pattern in
              narrative from the Mahabharata, Stoic philosophy, history, and real life.
            </p>
          </details>

          <details style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-gold)' }}>
              How does it work?
            </summary>
            <p style={{ lineHeight: 1.8, margin: '0.75rem 0 0', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
              Pick a situation. Read the story. Take the quiz. Reflect. Each mission starts from
              &ldquo;I&apos;m facing X&rdquo; — not &ldquo;let me teach Y.&rdquo; A map to explore,
              a game to play, and challenges that test real understanding — not memorization.
            </p>
          </details>

          <details style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-gold)' }}>
              What makes it different?
            </summary>
            <div style={{ lineHeight: 1.8, margin: '0.75rem 0 0', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
              <p style={{ margin: '0 0 0.5rem' }}><strong>Situation-first.</strong> Organized by problem, not by concept.</p>
              <p style={{ margin: '0 0 0.5rem' }}><strong>Honest, not nice.</strong> Real dilemmas with no easy answers.</p>
              <p style={{ margin: '0 0 0.5rem' }}><strong>Open by default.</strong> Wisdom shouldn&apos;t be behind a paywall.</p>
              <p style={{ margin: 0 }}><strong>Fun.</strong> A field guide, not a textbook.</p>
            </div>
          </details>

          <details style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-gold)' }}>
              Who is this for?
            </summary>
            <p style={{ lineHeight: 1.8, margin: '0.75rem 0 0', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
              Anyone hitting &ldquo;people problems&rdquo; and realizing no textbook covers this.
              Who&apos;ve read self-help and thought &ldquo;too abstract.&rdquo; Who want practical wisdom
              through stories. Who are curious about why people — including ourselves — behave the way we do.
            </p>
          </details>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link
            href="/worlds"
            style={{
              display: 'inline-block',
              padding: '0.85rem 2rem',
              backgroundColor: 'var(--color-gold)',
              color: '#1A1A1A',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Start Exploring →
          </Link>
        </div>
      </div>
    </main>
  );
}
