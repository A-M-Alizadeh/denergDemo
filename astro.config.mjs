// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  // Include Keystatic only in development; static build in production
  integrations: [
    react(),
    markdoc(),
    process.env.NODE_ENV !== 'production' && keystatic()
  ].filter(Boolean),
  output: 'static',
});
