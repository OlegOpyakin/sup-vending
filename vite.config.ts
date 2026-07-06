import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import seoFiles from 'vite-plugin-seo-files';

export default defineConfig({
  plugins: [
    react(),
    seoFiles({
      siteUrl: 'http://supvending.ru',
      generateSitemap: true,
      generateRobots: true,
    }),
  ],
  base: '/',
});