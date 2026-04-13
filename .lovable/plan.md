

## Plan: Add Netlify config, SEO routes, and OG meta injection plugin

### Files to create

1. **`netlify.toml`** (new) — Netlify build config with SPA redirect rule
2. **`src/seo/routes.ts`** (new) — Route metadata map with titles, descriptions, and OG images for 10 key pages

### Files to modify

3. **`vite.config.ts`** — Replace entirely with a version that imports `src/seo/routes.ts` and includes a custom `injectOgMetaPlugin` Vite plugin. This plugin runs at build time (`closeBundle`) and generates per-route `index.html` files with pre-rendered OG meta tags, making them visible to social crawlers that don't execute JavaScript.

### Important note
The Vite config imports `./src/seo/routes` as a TypeScript module at config level. This works because `vite.config.ts` is processed by Vite's own TS pipeline. The `routes.ts` file uses `export default` which the config consumes directly.

All three files will be written with the exact content provided — no modifications.

