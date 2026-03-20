

## Extract AI Tools Overview to Its Own SEO Page

### What changes

**1. Create `src/pages/AiToolsOverzicht.tsx`**
New standalone page at route `/ai-tools-onder-de-ai-act` with:
- Full SEO via `<SEO>` component: title "Welke AI-tools vallen onder de EU AI Act? | AIGA", description, canonical `/ai-tools-onder-de-ai-act`, structured data (Article schema)
- `BreadcrumbNav`: Home → Kenniscentrum → AI-tools overzicht
- Page hero with title, description
- All the tool filter/stats/table logic currently in Kenniscentrum (lines 52–381) moved here
- CTA bar and footer note included

**2. Edit `src/pages/Kenniscentrum.tsx`**
- Remove all tool-related state, useMemo, and the entire `#ai-tools-overzicht` section (lines 52–383)
- Remove imports: `aiTools`, `AI_CATEGORIES`, `AiTool`, `Input`, `Select*`, `Table*`, `Search`
- Update Card 1 in the Kennisoverzichten grid: change `<a href="#ai-tools-overzicht">` to `<Link to="/ai-tools-onder-de-ai-act">` with "Bekijk overzicht →"

**3. Edit `src/App.tsx`**
- Add import for `AiToolsOverzicht`
- Add route: `<Route path="/ai-tools-onder-de-ai-act" element={<AiToolsOverzicht />} />`

### Files
| Action | File |
|--------|------|
| Create | `src/pages/AiToolsOverzicht.tsx` |
| Edit   | `src/pages/Kenniscentrum.tsx` — remove tool section, update card link |
| Edit   | `src/App.tsx` — add route |

