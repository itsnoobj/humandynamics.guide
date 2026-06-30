import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['e2e/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov'],
      reportsDirectory: './coverage',
      include: ['modules/**', 'lib/**', 'shared/**', 'store/**'],
      exclude: [
        '**/__tests__/**',
        '**/*.test.*',
        '**/e2e/**',
        '**/*.d.ts',
        'app/layout.tsx',
        'app/theme-provider.tsx',
        'app/ServiceWorkerRegister.tsx',
        'modules/*/index.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      // `server-only` throws when evaluated outside an RSC bundle; stub it so
      // server modules (e.g. lib/content.ts) can be imported under vitest.
      'server-only': path.resolve(__dirname, 'test/stubs/server-only.ts'),
    },
  },
});
