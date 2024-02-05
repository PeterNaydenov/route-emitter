import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import rollupOptions from './rollup.config.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build : {
            rollupOptions
        }
})
