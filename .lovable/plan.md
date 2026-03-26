

## Plan: Boetecalculator Page

### New Files

**`src/pages/Boetecalculator.tsx`** — Full interactive page with:

1. **Hero section** — Uses `SectionLabel`, heading with teal accent on "jouw organisatie?", descriptive subtext referencing Artikel 99
2. **3-step calculator form** with progress bar (Step 1/2/3):
   - Step 1: Organisation size — 4 clickable cards (micro/klein/middelgroot/groot) with emoji icons, title, subtitle. Single-select, highlights on selection.
   - Step 2: AI usage — 7 checkbox cards (multi-select) for AI application types
   - Step 3: Compliance status — 4 single-select cards for current compliance level
   - Navigation buttons: "Volgende stap" / "Vorige stap" / "Bereken mijn risico"
3. **Results section** (replaces form after submission):
   - Risk badge (LAAG/GEMIDDELD/HOOG RISICO) with green/orange/red coloring
   - Large estimated fine range
   - Three output rows: max fine, likely fine, compliance cost (seats x €249)
   - "Wat nu?" CTA with gradient primary button → /training, outline button → /contact
   - Legal disclaimer

**Fine calculation logic:**
- Turnover estimates: micro=€1M, small=€5M, medium=€25M, large=€100M
- If biometric or medical AI selected → prohibited tier (7% / €35M cap)
- Else if automated decisions or monitoring selected → high-risk tier (3% / €15M cap)
- Else → general tier (1.5% / €7.5M cap)
- Compliance multiplier: full=0.1, partial=0.4, barely=0.7, none=1.0
- Range: `[tier% × turnover × multiplier × 0.5]` to `[tier% × turnover × multiplier]`
- Risk level: multiplier ≤0.1 → LAAG, ≤0.4 → GEMIDDELD, else HOOG

### Modified Files

| File | Change |
|------|--------|
| `src/pages/Tools.tsx` | Update Boetecalculator entry: `available: true`, `href: "/tools/boetecalculator"` |
| `src/App.tsx` | Add import + route for `/tools/boetecalculator` → `Boetecalculator` |

### Patterns
- Uses same component imports as Quiz/Tools pages: `SectionLabel`, `BreadcrumbNav`, `SEO`, `Button`, `Card`, `AnimatedSection`
- Follows existing design system: `neon-text` gradient for accents, `font-display` headings, `font-body` body text
- All text in Dutch, no exclamation marks, no em-dashes per content style rules

No database changes needed.

