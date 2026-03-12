

# Page Renames, Voor Organisaties Removal, and Kenniscentrum Page

## Summary
Three changes: rename product pages in navigation, remove the separate "Voor Organisaties" page (absorb key content into homepage), and create a new "Kenniscentrum" page linking to the existing blog articles on aigeletterdheid.academy.

## 1. Rename navigation items

**Navbar, Footer, all internal links:**
- "Training" → **"Voor teams"** (route stays `/training`)
- "Masterclass" → **"Voor leidinggevenden"** (route stays `/masterclass`)
- Remove "Voor Organisaties" from nav and footer
- Add **"Kenniscentrum"** to nav and footer (route `/kenniscentrum`)

Files: `Navbar.tsx`, `Footer.tsx`

## 2. Remove "Voor Organisaties" page

- Delete `src/pages/VoorOrganisaties.tsx`
- Remove route from `App.tsx`
- Move the **comparison table** (Training vs Masterclass) and the **"Altijd inbegrepen"** section to the homepage, placed after the "Ons Aanbod" cards section — without per-seat pricing columns
- Remove the pricing tiers grid and offerte form (those live on the Contact page already)

**Homepage additions** (after Ons Aanbod):
- Comparison table: For wie, Formaat, Duur, Certificaat (no price/minimum rows)
- "Altijd inbegrepen" checklist (6 items)

## 3. New Kenniscentrum page (`src/pages/Kenniscentrum.tsx`)

A grid of article cards, each linking externally to `aigeletterdheid.academy`. Articles grouped by category with filter tabs.

**Categories** (from the scraped content):
- Alle
- Wetten en regels (AI Act)
- AI-geletterdheid uitgelegd
- Actueel: trends en ontwikkelingen
- Tools en vaardigheden
- Praktijk en sectoren

**Each card shows:**
- Thumbnail image (from aigeletterdheid.academy CDN)
- Title
- Category badge
- Author (Ferry Hoes)
- External link (opens in new tab)

17 articles total from the scraped kenniscentrum page.

**Route:** `/kenniscentrum` in `App.tsx`

## Files to edit/create
| File | Action |
|------|--------|
| `src/components/Navbar.tsx` | Rename labels, add Kenniscentrum |
| `src/components/Footer.tsx` | Rename labels, swap Voor Organisaties → Kenniscentrum |
| `src/App.tsx` | Remove VoorOrganisaties route, add Kenniscentrum route |
| `src/pages/VoorOrganisaties.tsx` | Delete |
| `src/pages/Index.tsx` | Add comparison table + altijd inbegrepen after Ons Aanbod |
| `src/pages/Kenniscentrum.tsx` | Create new page with article grid |

