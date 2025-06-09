import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Static build configuration for GitHub Pages
export default defineConfig({
  plugins: [react()],
  root: './client',
  base: './', // Use relative paths for GitHub Pages
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: './client/index.html',
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-checkbox']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@assets': path.resolve(__dirname, './attached_assets')
    }
  },
  define: {
    // Disable backend features for static build
    'process.env.STATIC_BUILD': JSON.stringify('true')
  },
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 3000,
    host: true
  }
});