

## Problem

1. **Colorblind mode** sets `--color-success`, `--color-warning`, `--color-danger` — but the site never uses these variables. The site uses `--warning`, `--success`, and `--destructive` (Tailwind HSL format).

2. **Reduce motion** applies `transition: none !important; animation: none !important` via CSS, but the site's animations are driven by **Framer Motion** (JS-based), which isn't affected by CSS rules. Framer Motion respects the `prefers-reduced-motion` media query or needs explicit configuration.

## Fix

### 1. `src/index.css` — Fix colorblind CSS variables

Replace the colorblind class to override the actual CSS variables used by the site, using HSL values to match the existing format:

```css
html.a11y-colorblind {
  --warning: 30 100% 50%;        /* orange instead of amber */
  --success: 200 100% 37%;       /* blue instead of green */
  --destructive: 330 80% 50%;    /* pink instead of red */
}
```

### 2. `src/components/AnimatedSection.tsx` — Respect reduce-motion state

Read the `a11y-reduce-motion` class from `<html>` and disable Framer Motion animations when active. Set `initial` to final state (no animation) when reduce-motion is on.

### 3. `src/pages/Index.tsx`, `src/pages/Quiz.tsx`, `src/pages/NotFound.tsx`, `src/components/CookieBanner.tsx` — Respect reduce-motion

For inline `motion.*` usages, add a hook or utility that checks `document.documentElement.classList.contains('a11y-reduce-motion')` and skips animation props when true.

### Approach for reduce-motion

Create a small hook `useReduceMotion()` in `src/hooks/use-reduce-motion.ts` that:
- Checks `html.classList` for `a11y-reduce-motion` on mount
- Listens for class changes via `MutationObserver`
- Returns a boolean

Then in `AnimatedSection.tsx` and other motion components, conditionally set `initial={false}` and `animate` to skip transitions. This avoids touching every page — `AnimatedSection` covers most animations, and the remaining few files get the hook added.

### Files to change
- `src/index.css` — fix colorblind variables
- `src/hooks/use-reduce-motion.ts` — new hook
- `src/components/AnimatedSection.tsx` — use hook to disable animations
- `src/pages/Index.tsx` — use hook for hero motion.div
- `src/pages/Quiz.tsx` — use hook for quiz motion elements
- `src/pages/NotFound.tsx` — use hook
- `src/components/CookieBanner.tsx` — use hook

