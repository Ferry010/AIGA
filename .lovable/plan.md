

## Fix Tool Names on /tools Page

### What changes

Swap the naming and descriptions of the two scans to match reality:

1. **"AI Gereedheidscan"** (currently live at `/gereedheidscan`) — rename from "AI Risicoscan" to "AI Gereedheidscan". Update description to: "Meet vijf dimensies: AI-gebruik, wetgeving, risicobeheer, leiderschap en audit-readiness. Direct je score met uitsplitsing per dimensie." Keep `available: true`, keep link to `/gereedheidscan`.

2. **"AI Risicoscan"** (coming soon) — rename from "AI Readiness Scan" to "AI Risicoscan". Update description to: "Welke AI-tools gebruikt jouw organisatie en wat is het risiconiveau? Ontdek per tool of het laag, gemiddeld of hoog risico betreft." Keep `available: false`.

3. **Boetecalculator** stays as-is.

### File to edit
`src/pages/Tools.tsx` — update the `scans` array (lines 10–32): swap titles, descriptions, and icons as needed.

