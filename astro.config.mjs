import { defineConfig } from "astro/config";
import deno from "@astrojs/deno";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  adapter: deno({
    start: false,
  }),
  integrations: [mdx(), sitemap()],
  output: "hybrid",
  site: "https://adamknee.dev",
});
