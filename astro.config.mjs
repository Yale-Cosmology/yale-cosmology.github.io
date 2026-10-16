// @ts-check
import { defineConfig } from 'astro/config';

// The site is published by GitHub Pages from the Yale-Cosmology/yale-cosmology.github.io
// repository, which serves at the root of https://yale-cosmology.github.io/.
// SITE_URL and BASE_PATH can override these (the deploy workflow leaves them as is).
// For a custom domain, change `site` here and add a CNAME file in public/.
const site = process.env.SITE_URL ?? 'https://yale-cosmology.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Fixed dev port so this site never collides with other Astro projects on 4321.
  server: { port: 4330 },
});
