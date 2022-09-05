/// <reference types="vitest" />

import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: ['esnext'],
  },
  envPrefix: ['VITE_', 'TAURI_'],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  test: {
    include: ['**/*.test.{ts,tsx}'],
    passWithNoTests: true,
  },
})
