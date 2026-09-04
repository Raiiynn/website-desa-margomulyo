import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Phase 1 covers configuration and structural invariants, which are
    // Node-side concerns. Component tests arrive with the design system in
    // Phase 4, which is when jsdom and a React renderer become dependencies
    // that earn their place.
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    passWithNoTests: false,
    restoreMocks: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
