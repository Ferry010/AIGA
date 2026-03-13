

## Plan: Replace SocialProof with "Waarom AIGA" section

### Changes

1. **Rewrite `src/components/SocialProof.tsx`** — Replace entire content with new "Waarom organisaties voor AIGA kiezen" component:
   - Section label: "WAAROM AIGA"
   - H2: "Gebouwd op expertise. Niet op beloften."
   - 3 cards in a grid using `StaggerContainer`/`StaggerItem` with icons from lucide-react (`ShieldCheck`, `Mic`, `Award`)
   - Subtle CTA text line below with two inline `Link` elements to `/contact` and `/risicoscan`
   - Same dark card styling, neon-glow hover, matching existing site aesthetic

2. **No changes needed in `Index.tsx`** — it already imports and renders `<SocialProof />` at the right position.

