import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  integrations: [mdx(), sitemap()],
  output: 'static',
  site: 'https://adamknee.dev'
});
