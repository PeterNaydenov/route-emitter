import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'routeEmitter',
      fileName: (format) => `route-emitter.${format === 'es' ? 'esm' : format}.js`
    },
    rollupOptions: {
      external: ['ask-for-promise', 'url-pattern', '@peter.naydenov/notice'],
      output: {
        globals: {
          'ask-for-promise': 'askForPromise',
          'url-pattern': 'UrlPattern',
          '@peter.naydenov/notice': 'notice'
        }
      }
    }
  }
})
