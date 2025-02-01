import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom', // Ensures a browser-like environment
    globals: true, // Enables global `describe`, `it`, `expect` without imports
  },
});