import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.js'],
    testTimeout: 10000,
    hookTimeout: 10000,
    include: ['test/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.js']
    }
  },
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'routeEmitter',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => format === 'cjs' ? 'route-emitter.cjs' : `route-emitter.${format === 'es' ? 'esm' : format}.js`
    },
    rollupOptions: {
      external: ['ask-for-promise', '@peter.naydenov/url-pattern', '@peter.naydenov/notice'],
      output: {
        globals: {
          'ask-for-promise': 'askForPromise',
          '@peter.naydenov/url-pattern': 'urlPattern',
          '@peter.naydenov/notice': 'notice'
        }
      }
    }
  }
})
