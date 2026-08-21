// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { brand } from './src/lib/brand.ts';

export default defineConfig({
  site: brand.url,
  output: 'static',
  compressHTML: true,
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
    format: 'file',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/404') && !page.includes('/api/'),
      changefreq: 'monthly',
      priority: 0.7,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // GSAP touches `window` at import time — pre-bundle it for SSR safety.
      noExternal: ['gsap'],
    },
  },
});
