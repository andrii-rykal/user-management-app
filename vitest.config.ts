import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true,
    testTimeout: 10000,
    maxThreads: 1,
    minThreads: 1,
    isolate: true,
    reporters: ['default'],
    onConsoleLog: () => false,
  },
});
