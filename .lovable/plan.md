

## Plan: Clean Up Article Filters for SEO Focus

### Problem
The current filter section has two rows: 6 category buttons + up to 29 label buttons. The labels are inconsistent (duplicates like "AI Geletterdheid" vs "AI geletterdheid", "EU AI Act" vs "EU AI ACT"), too granular (e.g. "CIO", "HR", "IT" as separate tags), and visually cluttered. This hurts both UX and SEO value.

### Solution
Replace the two-row category + label filter with a single, clean filter bar using curated **topic filters** that double as SEO anchor points. Each filter maps to one or more existing categories/labels behind the scenes.

**Proposed topic filters:**

| Filter | Maps to (categories/labels) |
|---|---|
| Alle | everything |
| EU AI Act | category "Wetten en regels" + labels containing "EU AI Act", "Artikel 4", "Artikel 99", "Wetgeving", "Boetes" |
| AI-geletterdheid | category "AI-geletterdheid uitgelegd" + labels containing "AI geletterdheid", "AI training" |
| Compliance & governance | labels "Compliance", "Governance", "AI-beleid", "Bestuursverantwoordelijkheid" |
| Sectoren & praktijk | category "Praktijk en sectoren" + sector labels |
| Tools & vaardigheden | category "Tools en vaardigheden" + "Shadow AI" |
| Actueel | category "Actueel" |

### Implementation

**File: `src/pages/Kenniscentrum.tsx`**

1. Replace `articleCategories` and the label filter state with a single `topicFilters` array, each with a `label` (display name), `slug` (URL-friendly for potential future defined route anchors), and a `match` function
2. Remove the second labels filter row entirely
3. Render a single row of well-spaced filter buttons with the curated topics
4. Each button filters articles by matching against both the `category` and `labels` fields
5. Add `id` attributes to the filter section for SEO anchor linking (e.g., `#eu-ai-act`)

### Database Cleanup (optional, separate step)
Normalize duplicate labels ("AI Geletterdheid" vs "AI geletterdheid", "EU AI Act" vs "EU AI ACT") in a future migration. The filter logic will handle case-insensitive matching for now.

### Visual Result
One clean horizontal row of 7 topic buttons instead of the current 6 + 29. Consistent styling, no second row, better scannability.

