import { WorldGrid } from '@/modules/worlds';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { worlds } from '@/lib/hierarchy';

/**
 * World-select screen: the top-level entry point. Lists all worlds as a grid
 * of cards, with locking and progress derived from the persisted store.
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
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'var(--spacing-lg)' }}>
        <header style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>
            A Field Guide to Being Human
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', marginTop: '0.25rem' }}>
            Select a World
          </p>
        </header>

        <WorldGrid worlds={worlds} />
      </div>
    </main>
  );
}
