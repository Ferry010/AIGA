

## Plan: Enhance AI Begrippen page with themes, anchors, and filters

The current file has 20 terms. You mentioned 32 are live — the category lists reference 12 additional terms (e.g. General Purpose AI, Deepfake, FRIA) that are not in the current code. Your message was also cut off at point 4 (internal links). I'll proceed with what's clear; please share the remaining text (point 4 descriptions + any missing term texts) after approval.

### Changes to `src/pages/AiBegrippen.tsx`

**1. Data model update**

Add a `theme` field to each `Begrip` and a slug helper for anchor IDs:

```text
type Theme = "wetgeving" | "technologie" | "rollen" | "praktijk";

interface Begrip {
  term: string;
  description: string;
  theme: Theme;
  link?: { href: string; label: string };
}
```

Each of the 20 existing terms gets its theme assigned per the mapping you provided. A `toSlug(term)` utility converts terms to lowercase-hyphenated IDs.

**2. Theme badges on cards**

Each card gets a small colored pill (top-right) using the Badge component with theme-specific colors:
- Wetgeving & Compliance: orange (`bg-orange-500/15 text-orange-400`)
- Technologie: blue-grey (`bg-blue-500/15 text-blue-400`)
- Rollen & Verantwoordelijkheid: green (`bg-emerald-500/15 text-emerald-400`)
- Praktijk & Vaardigheden: purple (`bg-purple-500/15 text-purple-400`)

Clicking a badge sets the active theme filter.

**3. Anchor links per term**

- Each `<article>` gets `id={toSlug(term)}` (e.g. `id="hoog-risico-ai"`)
- A small link icon next to each H3; on hover shows tooltip "Kopieer link naar dit begrip"
- On click: copies `https://aigeletterdheid.academy/kenniscentrum/ai-begrippen#slug` to clipboard, shows "Link gekopieerd" toast for 2 seconds
- Uses Tooltip component and `navigator.clipboard.writeText()`

**4. Filter navigation row**

Below the sticky search bar, a row of toggle buttons:

```text
[Alle begrippen] [Wetgeving & Compliance] [Technologie] [Rollen & Verantwoordelijkheid] [Praktijk & Vaardigheden]
```

- Active filter has orange background
- Filters combine with search (AND logic): `filtered = BEGRIPPEN.filter(matchesSearch && matchesTheme)`
- "Alle begrippen" resets theme filter to `null`
- On filter click, smooth-scrolls to the glossary grid section

**5. State additions**

```tsx
const [search, setSearch] = useState("");
const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
```

### Files affected
- `src/pages/AiBegrippen.tsx` — all changes in this single file

### Not included (awaiting your input)
- The 12 additional term descriptions (FRIA, GPAI, Deepfake, etc.) — I see them in your category list but they're not in the current code and no description text was provided
- Point 4 (internal links in explanations) — your message was cut off

