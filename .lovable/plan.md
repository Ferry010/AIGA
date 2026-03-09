

# Switch to Light, Open Design with Teal Accents

Transform the entire site from dark mode to a clean white/light aesthetic while keeping teal as the accent color for that "tech meets human" feel.

## Color System Changes (index.css)

| Token | Current (Dark) | New (Light) |
|-------|---------------|-------------|
| background | `225 20% 11%` (near-black) | `0 0% 100%` (white) |
| foreground | `210 25% 95%` (near-white) | `220 20% 14%` (dark charcoal) |
| card | `220 16% 14%` | `210 20% 98%` (off-white) |
| card-foreground | near-white | dark charcoal |
| muted | dark gray | `220 14% 96%` (light gray) |
| muted-foreground | `215 12% 65%` | `215 16% 47%` (medium gray) |
| border | dark border | `220 13% 91%` (light border) |
| surface / surface-2 | dark surfaces | light gray variants |
| brand-dim | dark teal tint | `189 30% 95%` (very light teal wash) |
| primary | stays `189 35% 52%` (teal) | same |
| accent | dark teal | `189 25% 94%` (light teal tint) |

## Component Updates Across All Files

- **Navbar**: White/translucent background, light border, dark text
- **Footer**: Light gray background instead of near-black
- **Cards**: White cards with subtle light borders, soft shadows on hover
- **Forms**: White inputs with light gray borders
- **Urgency banner**: Light amber tint instead of dark gradient
- **Quiz**: White cards, light borders, same teal accent interactions
- **Section backgrounds**: Alternate between white and very light gray (`bg-card`) instead of dark/darker

## Files to Edit

1. `src/index.css` — Flip all CSS variables to light palette
2. `src/components/Navbar.tsx` — White bg, dark text
3. `src/components/Footer.tsx` — Light footer
4. `src/pages/Index.tsx` — Update urgency banner gradient, ensure all classes work with light
5. `src/pages/Training.tsx` — Light cards and surfaces
6. `src/pages/Masterclass.tsx` — Same treatment
7. `src/pages/VoorOrganisaties.tsx` — Same treatment
8. `src/pages/OverAiga.tsx` — Same treatment (FH avatar gets light bg)
9. `src/pages/Contact.tsx` — Light form inputs, light contact card
10. `src/pages/Quiz.tsx` — White quiz cards, light progress bar bg

The teal accent (`#5AA6B2`) stays as-is for buttons, links, borders, and badges, giving the "tech" feel against a clean white canvas.

