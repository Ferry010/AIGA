

## Restructure: AI Tools Overview → Kenniscentrum + New /tools Page

### What changes

**1. Kenniscentrum page (`src/pages/Kenniscentrum.tsx`)**
Add a new "Kennisoverzichten" section above the existing articles grid containing the full 49-tool AI Act overview with search, category dropdown, risk filter pills, stats row, and grouped data table. This section gets its own anchor (`#kennisoverzichten`). The existing articles grid remains below under its own section label.

**2. New Tools page (`src/pages/Tools.tsx`)**
A lightweight page with two sections of placeholder cards:

- **Scans & Calculators** (3 cards):
  - "AI Risicoscan" → links to existing `/gereedheidscan`
  - "Boetecalculator" → coming soon
  - "AI Readiness Scan" → coming soon

- **Downloads** (2 cards):
  - "AI Act Compliance Checklist (PDF)" → coming soon
  - "AI-beleid template" → coming soon

Each coming-soon card uses the existing `Card` component with a `Badge` showing "Binnenkort beschikbaar".

**3. Data file (`src/data/aiTools.ts`)**
All 49 tools as a typed const array, keeping the page file clean.

**4. Navigation (`src/components/Navbar.tsx`)**
Add `{ to: "/tools", label: "Tools" }` after "Kenniscentrum" in `navLinks`.

**5. Routing (`src/App.tsx`)**
Add `/tools` route.

### Technical details

- The Kenniscentrum tools overview is fully client-side: `useState` for search/category/risk filters, `useMemo` for filtered results and stats.
- Stats row: 4 `Card` components showing live-updating counts with color-coded text (destructive/amber/green).
- Table uses existing `Table` components with category group header rows. Horizontal scroll on mobile.
- Risk badges reuse `Badge` component with conditional className for color.
- Filter pills wrap on mobile; stats grid collapses to 2×2.

### Files
| Action | File |
|--------|------|
| Create | `src/data/aiTools.ts` |
| Create | `src/pages/Tools.tsx` |
| Edit   | `src/pages/Kenniscentrum.tsx` — add tools overview section above articles |
| Edit   | `src/components/Navbar.tsx` — add "Tools" nav item |
| Edit   | `src/App.tsx` — add `/tools` route |

