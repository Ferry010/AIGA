

## Accessibility Widget Plan

### New files

**1. `src/components/AccessibilityWidget.tsx`**
- Fixed circular button (bottom-right, `bottom-24px right-24px`, `z-40`) with `Accessibility` icon from lucide-react
- Dark background (`bg-foreground`) with teal accent border (`border-primary`)
- Click toggles a small panel above the button with 4 toggle rows:
  - High Contrast, Large Text, Colorblind Mode, Reduce Motion
- Each toggle uses the existing `Switch` component with teal active state
- Panel closes on button re-click or clicking outside (useRef + useEffect click-outside listener)
- State stored in localStorage under `"aiga-accessibility"`, loaded on mount
- On toggle change: add/remove classes on `document.documentElement` (`a11y-contrast`, `a11y-large-text`, `a11y-colorblind`, `a11y-reduce-motion`)
- Widget wrapper uses CSS `isolation` or a reset class to prevent its own styles from being affected by the a11y classes

### Modified files

**2. `src/index.css`** — Append global a11y CSS classes at the end:
```css
html.a11y-contrast { filter: contrast(1.5); background: #000 !important; color: #fff !important; }
html.a11y-large-text { font-size: 120% !important; }
html.a11y-colorblind { --color-success: #0077BB; --color-warning: #EE7733; --color-danger: #EE3377; }
html.a11y-reduce-motion * { transition: none !important; animation: none !important; }
```

**3. `src/App.tsx`** — Import and render `<AccessibilityWidget />` inside `AppContent`, alongside `<CookieBanner />`. Purely additive.

### Design notes
- Button: 48x48px circle, dark bg, teal border, lucide `Accessibility` icon in teal
- Panel: ~280px wide card with rounded corners, matching existing card style
- Active toggles show teal switch color (already default primary behavior of `Switch`)
- Widget isolated from a11y class effects via inline styles for font-size and filter resets

