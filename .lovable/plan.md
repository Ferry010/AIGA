

## Update AI Tools Dataset & Table Structure

### Summary
Complete rewrite of the AI tools data model and table on `/ai-tools-onder-de-ai-act`. New 5-column structure replacing the old 4-column layout, new filter pills, updated stats, info callout, and all 49 tools rewritten with new fields.

### Changes

**1. Rewrite `src/data/aiTools.ts`**
- New `AiTool` interface: `name`, `vendor`, `category`, `type` (`"GPAI" | "Gespecialiseerd" | "Gespecialiseerd HR" | "Gespecialiseerd Finance" | "Gespecialiseerd Legal" | "Gespecialiseerd Zorg" | "Platform/Agent"`), `defaultCategory` (`"Minimaal risico" | "Beperkt risico" | "Hoog risico (altijd)"`), `highRiskWhen` (string — the use-case description), `trainingRequired` always `true`
- Replace all 49 tool entries with the exact data from the user's tables
- Export a new `TYPE_FILTERS` array: `["Alle tools", "GPAI", "Gespecialiseerd HR", "Gespecialiseerd Finance/Legal", "Gespecialiseerd Zorg", "Platform/Agent"]`

**2. Rewrite `src/pages/AiToolsOverzicht.tsx`**
- **Filter pills**: Replace risk filters with type filters from `TYPE_FILTERS`. Filter logic maps pills to `type` field (e.g. "Gespecialiseerd Finance/Legal" matches both `"Gespecialiseerd Finance"` and `"Gespecialiseerd Legal"`)
- **Stats row**: Replace with 4 cards: Totaal (49), Altijd hoog risico (14, red), Situationeel hoog risico (27, amber), Minimaal/Beperkt (8, green). Computed from `defaultCategory`
- **Info callout** above table: bordered card with the explanatory text about EU AI Act categorizing use, not tools
- **Table columns** (5): Tool | Type | Standaard categorie | Wordt hoog risico bij... | Training vereist?
  - "Wordt hoog risico bij..." column: if `defaultCategory === "Hoog risico (altijd)"` → bold red text; else muted smaller text. Max 2 lines via `line-clamp-2`
  - "Training vereist?" column: always shows "Ja" in green
  - "Standaard categorie" column: badge with color based on category (red/amber/green)
- **Footnote** under table: `* Artikel 4 EU AI Act verplicht AI-geletterdheid voor alle medewerkers die AI-systemen gebruiken — ongeacht risicocategorie.`
- Keep search bar and category dropdown as-is

### Files
| Action | File |
|--------|------|
| Rewrite | `src/data/aiTools.ts` |
| Edit | `src/pages/AiToolsOverzicht.tsx` |

