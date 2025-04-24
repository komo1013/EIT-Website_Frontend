// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import tailwind  from '@astrojs/tailwind';

import svgr from 'vite-plugin-svgr';

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), react(), tailwind()],

  vite: {
    // plugins: [tailwindcss()]
    plugins: [svgr()]
  },

  experimental: {
    svg: true,
  }
});