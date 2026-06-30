import Link from 'next/link';
import { WorldLandscape } from '@/modules/worlds';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { worlds } from '@/lib/hierarchy';

/**
 * World-select screen: the top-level entry point. Renders all worlds as a
 * zoomed-out landscape map where each world is a terrain zone. Every world is
 * always selectable; progress is derived from the persisted store.
 */
export default function WorldsPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      <ThemeToggle />
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: 'var(--spacing-lg)' }}>
        <Link href="/" style={{ color: 'var(--color-text)', fontSize: '0.9rem', textDecoration: 'none' }}>
          🏠 Home
        </Link>
        <header style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>
            A Field Guide to Being Human
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', marginTop: '0.25rem' }}>
            Choose a world
          </p>
        </header>

        <WorldLandscape worlds={worlds} />
      </div>
    </main>
  );
}
