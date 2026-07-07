import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./vitest.setup.ts'],
    globalSetup: ['./vitest.global-setup.ts'],
    include: ['src/**/*.test.ts'],
    fileParallelism: false,
  },
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
})
