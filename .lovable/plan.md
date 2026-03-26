

## Plan: AI Risicoscan page at /tools/ai-risicoscan

### Overview
Interactive tool selection page where users pick AI tools their organisation uses, then get a per-tool risk profile and overall compliance summary. Reuses the existing `aiTools` dataset from `src/data/aiTools.ts`.

### New file: `src/pages/AiRisicoscan.tsx`

**Two-phase page: Selection → Results**

**Phase 1 — Tool Selection**
- Hero with SectionLabel "AI RISICOSCAN", heading with teal accent, subtext
- Search bar ("Zoek een tool...") + category filter tabs (using `AI_CATEGORIES` from existing data)
- Tool cards grouped by category, each showing: name (bold), vendor (gray), risk badge (color-coded using same `categoryBadgeClass` pattern as AiToolsOverzicht)
- Click to select/deselect: selected cards get purple border + checkmark
- "Staat jouw tool er niet bij?" link opens inline text input, adds custom tool with "Beperkt risico" default
- Sticky bottom bar: "X tools geselecteerd" + "Bekijk mijn risicoprofiel →" CTA (enabled when ≥1 selected)

**Phase 2 — Results (replaces selection)**

- **Section A — Samenvatting**: Count badges (red/orange/yellow/green) for hoog/situationeel/beperkt/minimaal. Overall verdict badge. Context sentence based on counts.
- **Section B — Per tool cards**: Each selected tool gets a card with name, vendor, risk badge, obligations text (from `highRiskWhen` field + role-specific obligations for "Hoog risico (altijd)" tools), "Meer info" link to `/ai-tools-onder-de-ai-act`
- **Section C — Actielijst**: Prioritised checklist based on selected tool risk levels (conformiteitsbeoordeling for always-high, use-case review for situational, Art. 4 training always, documentation always)
- **Section D — CTA**: "Klaar om compliant te worden?" heading, training/offerte buttons, gereedheidscan link, disclaimer

**Risk classification logic:**
- `"Hoog risico (altijd)"` → red badge, "Hoog risico (altijd)"
- `"Beperkt risico"` with `highRiskWhen` content → amber badge, "Situationeel hoog risico" (escalation trigger shown)
- `"Beperkt risico"` → yellow badge
- `"Minimaal risico"` → green badge
- Custom tools → yellow badge, "Beperkt risico"

### Modified files

| File | Change |
|------|--------|
| `src/App.tsx` | Add import + route for `/tools/ai-risicoscan` |
| `src/pages/Tools.tsx` | Update AI Risicoscan entry: `available: true`, `href: "/tools/ai-risicoscan"` |

No database changes needed. All data sourced from existing `src/data/aiTools.ts`.

