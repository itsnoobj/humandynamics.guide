import Link from 'next/link';

export const metadata = {
  title: 'Why this? — Human Dynamics',
  description: 'Why we built Human Dynamics and how stories help you navigate difficult situations.',
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
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <Link href="/" style={{ color: 'var(--color-text)', fontSize: '0.9rem', textDecoration: 'none' }}>
          🏠 Home
        </Link>

        <header style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
            Why this?
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-dim)', marginTop: '0.75rem', lineHeight: 1.6 }}>
            Learn to see the patterns that drive people — through stories.
          </p>
        </header>

        {/* The Problem */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold)', margin: '0 0 0.75rem' }}>
            The problem no one teaches you
          </h2>
          <p style={{ lineHeight: 1.8, margin: '0 0 1rem' }}>
            Every day you face situations nobody prepared you for:
          </p>
          <ul style={{ lineHeight: 2, paddingLeft: '1.2rem', margin: 0, color: 'var(--color-text-dim)' }}>
            <li>A coworker takes credit for your work</li>
            <li>A manager says one thing but means another</li>
            <li>A team resists a change that clearly benefits them</li>
            <li>A promotion goes to someone less qualified</li>
            <li>A relationship breaks down over something small</li>
          </ul>
          <p style={{ lineHeight: 1.8, marginTop: '1rem' }}>
            You&apos;re not bad at these situations. You just never learned to see what&apos;s actually
            driving them.
          </p>
        </section>

        {/* The Insight */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold)', margin: '0 0 0.75rem' }}>
            The hidden forces
          </h2>
          <p style={{ lineHeight: 1.8, margin: '0 0 1rem' }}>
            Behind every difficult situation are a handful of recurring forces:
          </p>
          <p style={{
            lineHeight: 1.8,
            fontWeight: 600,
            fontSize: '1.05rem',
            color: 'var(--color-text)',
            margin: '0 0 1rem',
          }}>
            Incentives · Ego · Fear · Trust · Status · Identity · Scarcity · Power · Uncertainty · Reciprocity
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            These 10 forces explain almost everything — why people lie, resist, hoard, compete, deflect,
            avoid, and protect. Once you learn to see them, you can navigate anything.
          </p>
        </section>

        {/* How we teach */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold)', margin: '0 0 0.75rem' }}>
            Stories, not lectures
          </h2>
          <p style={{ lineHeight: 1.8, margin: '0 0 1rem' }}>
            Every pattern is anchored in narrative — from the Mahabharata to Lincoln, from Stoic
            philosophy to modern psychology. Because stories stick. Principles fade. But a story
            about Arjuna&apos;s hesitation, or Lincoln&apos;s patience, or a manager&apos;s blind spot — that stays with you.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Then: quizzes, reflection prompts, and multi-lens analysis to deepen understanding.
            Not a course you finish. Not a book you read once. A reference you return to when you
            face something hard — at work, in relationships, in life.
          </p>
        </section>

        {/* What makes it different */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold)', margin: '0 0 0.75rem' }}>
            What makes this different
          </h2>
          <div style={{ lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 0.75rem' }}>
              <strong>Situation-first.</strong> Always starts from &ldquo;I&apos;m facing X&rdquo; — not
              &ldquo;let me teach you Y.&rdquo;
            </p>
            <p style={{ margin: '0 0 0.75rem' }}>
              <strong>Structured and fun.</strong> A map to explore, a game to play, quizzes to test yourself.
              Learning that doesn&apos;t feel like homework.
            </p>
            <p style={{ margin: '0 0 0.75rem' }}>
              <strong>Real dilemmas.</strong> No easy answers. Judgment grows from sitting with tension, not
              memorizing rules.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Open by default.</strong> The content stays accessible. Wisdom shouldn&apos;t be locked
              behind a paywall.
            </p>
          </div>
        </section>

        {/* Who it's for */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold)', margin: '0 0 0.75rem' }}>
            Who it&apos;s for
          </h2>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            People who are hitting &ldquo;people problems&rdquo; and realize no textbook covers this.
            Who&apos;ve read a self-help book and thought &ldquo;this is too abstract.&rdquo; Who want
            practical wisdom, not motivation. Who learn better through stories than frameworks.
            Who are curious about why people — including themselves — behave the way they do.
          </p>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', marginTop: '3rem' }}>
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
        </section>
      </div>
    </main>
  );
}
