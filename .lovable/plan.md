

# Fix /admin 404 + Redesign 404 page

## Issue: /admin returning 404
The route exists in App.tsx (line 48). The problem is the **published site** lacks SPA routing configuration. When you navigate directly to `/admin` (or refresh), the server doesn't know to serve `index.html` — it returns a real 404. Fix: add `public/_redirects` file for the hosting platform.

## Changes

### 1. `public/_redirects`
Add SPA fallback so all routes serve index.html:
```
/*    /index.html   200
```

### 2. `src/pages/NotFound.tsx` — On-brand redesign
Replace the generic 404 with a branded page using:
- AIGA logo
- Neon gradient text for "404"
- Dutch copy ("Pagina niet gevonden")
- `btn-neon` styled CTA back to homepage
- Subtle animation with framer-motion (fade in)
- Clean layout matching the rest of the site (Space Grotesk headings, DM Sans body)

