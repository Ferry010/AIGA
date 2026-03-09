

# Soften the Design: More Human, More Approachable

The current "Bloomberg Terminal" aesthetic is too cold and technical for an audience of HR/L&D buyers. The goal is to keep it professional but make it feel warmer, more inviting, and more human.

## What Changes

### Color Palette — Warmer, Softer Contrast
- **Background**: Shift from pure blue-black (`222 50% 7%`) to a warmer dark (`225 20% 11%`) — less saturated, slightly lighter
- **Card/Surface**: Warmer dark gray (`220 16% 14%`) instead of cold navy
- **Muted text**: Warmer gray (`215 12% 65%`) — easier to read, less harsh
- **Borders**: Softer, less visible (`220 15% 20%`)
- **Brand-dim**: Warmer teal tint for highlighted sections

### Border Radius — Friendlier Shapes
- Increase base radius from `0.375rem` to `0.75rem`
- Cards get `rounded-2xl` (16px) instead of `rounded-xl` (12px)
- Buttons get `rounded-lg` (8px) instead of `rounded-md` (6px)

### Dot Grid Background — Remove It
- The circuit-board dot grid screams "tech." Remove it from hero sections entirely. Replace with clean, open space.

### Cards — Softer Presence
- Add subtle `shadow-lg shadow-black/5` instead of relying purely on borders
- Lighter hover states with gentle glow instead of sharp border color change
- More padding (40px instead of 32px on desktop)

### Typography — Softer Touch
- Increase body line-height from 1.6 to 1.7
- Use `font-medium` instead of `font-bold` for section labels
- Slightly larger body text on key pages (17px instead of 16px)

### Section Labels — Less Aggressive
- Change from UPPERCASE 11px bold to 12px medium with gentler letter-spacing (0.08em instead of 0.12em)
- Keep the teal square indicator but make it rounded (circle instead of square)

### Buttons — Warmer Feel
- Slightly larger padding, rounder corners
- Add subtle shadow to primary buttons
- Softer hover transition (300ms instead of 200ms)

### Spacing — More Breathing Room
- Increase section padding from `py-20` to `py-24`
- More generous gaps between content blocks

## Files to Edit

1. **`src/index.css`** — Update CSS variables for warmer colors, radius, remove dot-grid
2. **`src/components/SectionLabel.tsx`** — Softer label style (rounded dot, less aggressive tracking)
3. **`src/pages/Index.tsx`** — Remove `dot-grid-bg`, rounder cards/buttons, more padding
4. **`src/pages/Training.tsx`** — Same softening: rounder cards, warmer spacing
5. **`src/pages/Masterclass.tsx`** — Same treatment
6. **`src/pages/VoorOrganisaties.tsx`** — Same treatment
7. **`src/pages/OverAiga.tsx`** — Same treatment
8. **`src/pages/Contact.tsx`** — Same treatment
9. **`src/pages/Quiz.tsx`** — Rounder answer cards, softer transitions
10. **`src/components/Navbar.tsx`** — Rounder buttons
11. **`src/components/Footer.tsx`** — Consistent with new warmth

All pages get the same treatment: rounder corners, warmer colors, removed dot-grid, softer borders, more breathing room.

