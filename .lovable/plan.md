

## Plan: Fix article category filter bug

### Root Cause
The `StaggerContainer` and `StaggerItem` components use framer-motion's `whileInView` with `viewport={{ once: true }}`. Once the stagger animation plays on initial load, it never re-triggers. When the user switches categories, new article cards mount in the `hidden` variant (opacity: 0, y: 20) and stay invisible because the container won't re-animate.

### Fix
In `src/pages/Kenniscentrum.tsx`, replace `StaggerContainer`/`StaggerItem` in the articles grid with simple `div` elements (or `motion.div` with `animate` instead of `whileInView`). The category filter is interactive — it doesn't need scroll-triggered animation, it needs immediate rendering.

The Kennisoverzichten section above can keep `StaggerContainer` since those cards are static.

### Changes

| File | Change |
|------|--------|
| `src/pages/Kenniscentrum.tsx` | Replace `StaggerContainer`/`StaggerItem` wrapping the filtered articles grid with plain `div` elements. Optionally add a simple fade-in via CSS transition or a keyed motion wrapper. |

No database changes needed.

