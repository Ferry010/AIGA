

# Add Neon Tech Accents: Purple/Pink Gradient Borders

Add a vibrant purple-to-pink neon gradient accent system across CTAs, cards, and key UI elements. The white background stays clean while neon borders add the "tech" edge.

## Design Approach

- **Neon gradient**: Purple (#8B5CF6) to Pink (#EC4899) used for borders, button outlines, and card accents
- **Glow effects**: Subtle neon glow shadows on hover (purple/pink tinted box-shadows)
- **Primary buttons**: Gradient background (purple-to-pink) instead of flat teal
- **Secondary buttons**: Transparent with gradient border (CSS border-image or pseudo-element trick)
- **Cards**: Subtle gradient top-border or full gradient border on hover
- **Featured cards** (like "MEEST GEKOZEN", "AANBEVOLEN"): Permanent gradient border
- Teal stays for text accents, checkmarks, and section labels to keep brand identity

## CSS Changes (`src/index.css`)

- Add `.neon-border` utility: gradient border via background-clip trick (parent has gradient bg, child has white bg with margin/padding)
- Add `.neon-glow` hover shadow: `0 0 20px rgba(139,92,246,0.15), 0 0 40px rgba(236,72,153,0.1)`
- Add `.btn-neon` class for primary CTAs with gradient bg
- Add `.btn-neon-outline` for secondary CTAs with gradient border

## Files to Edit

1. **`src/index.css`** — Add neon utility classes, gradient border tricks
2. **`tailwind.config.ts`** — Add purple/pink/neon colors to palette
3. **`src/pages/Index.tsx`** — Apply neon borders to cards, gradient CTAs
4. **`src/pages/Training.tsx`** — Pricing cards get neon borders, CTAs updated
5. **`src/pages/Masterclass.tsx`** — Same treatment
6. **`src/pages/VoorOrganisaties.tsx`** — Same treatment
7. **`src/pages/OverAiga.tsx`** — Principle cards get neon hover borders
8. **`src/pages/Contact.tsx`** — Form submit button gets neon gradient
9. **`src/pages/Quiz.tsx`** — Start button, answer cards on select get neon glow
10. **`src/components/Navbar.tsx`** — "Offerte aanvragen" button gets gradient bg, "Doe de quiz" gets gradient outline

## Visual Result

Clean white site with pops of purple-pink neon on interactive elements: buttons glow, cards shimmer on hover, featured items have permanent gradient borders. Professional but unmistakably tech.

