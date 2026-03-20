

## Add Bulk Pricing Tiers to Training Page

### What changes

Replace the single pricing card on the Training page with two side-by-side tier cards:

**Tier 1 — Standard (1-49 seats)**
- Price: €249,- per deelnemer (ex BTW)
- Feature list stays the same (selfpaced, certificaat, dashboard, examen, etc.)
- CTA: "Vraag een offerte aan" → scrolls to #offerte

**Tier 2 — Enterprise (50+ seats)**
- "Neem contact op" / custom pricing
- Highlight: gratis Masterclass voor management inbegrepen
- Extra perks: dedicated accountmanager, voortgangsrapportages, facturatie op maat
- CTA: "Neem contact op" → scrolls to #offerte (form pre-selects training)

Use the same two-column card layout as the homepage "Ons Aanbod" section. Enterprise card gets the neon border treatment to draw attention.

Also update the homepage pricing cards and comparison section to reflect the same 2-tier structure (currently shows just "249,-" without tier context). Add "Vanaf 50 seats: neem contact op" to the homepage training card.

### Files to edit
1. `src/pages/Training.tsx` — replace single pricing card with 2-tier grid
2. `src/pages/Index.tsx` — add enterprise context to training card in "Ons Aanbod" section

