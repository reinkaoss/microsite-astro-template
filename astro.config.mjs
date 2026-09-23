// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

// Static output: every page is plain HTML on Vercel. Only React islands with a
// `client:*` directive ship JavaScript.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3011'),
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  prefetch: { prefetchAll: true },
})
