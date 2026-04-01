

## Plan: Enhance MKB article with interactive components, FAQ, and SEO

This is a large enhancement to `src/pages/ArticleDetail.tsx`. The article slug is `ai-geletterdheidsplicht-voor-het-mkb-de-complete-gids-2026`. Given the file is already 710 lines and growing, the custom components will be extracted to a dedicated file.

**Important design note:** The user's prompt mentions orange (#FF6B00) accents and dark (#0f0f0f) backgrounds, but the site's established design system uses teal/primary accents with the existing card/background colors. All components will follow the existing site aesthetic (teal accents, `bg-card`, `border-border`, etc.) to maintain consistency.

---

### New file: `src/components/MkbArticleComponents.tsx`

Contains four slug-specific visual components:

**1. Risk Table ("Welk AI-risico geldt voor jouw rol?")**
- Styled card with `border-l-4 border-primary` per row
- 5 rows: Klantenservice, Accountant, HR-medewerker, Marketeer, Jurist
- Each row shows role + relevant risk

**2. Comparison Table ("Kosten van wel vs. niet compliant")**
- Two-column table: Situatie | Mogelijke consequentie
- 4 rows as specified
- Uses existing `Table` components with destructive/red accent on consequences

**3. 5-Step Progress Tracker ("Zo word je compliant in 5 stappen")**
- Vertical stepper with numbered primary-colored circles
- Each step has title + one-line description
- Clickable to expand a detail box (uses Collapsible or Accordion)
- Steps: Inventariseer, Kies training, Bewaar certificaten, Stel beleid op, Plan herhalingscheck

**4. MKB FAQ Accordion**
- 8 questions as provided
- Same pattern as existing FAQ accordions
- Exported as data array + component

---

### Changes to `src/pages/ArticleDetail.tsx`

**1. Add slug detection (~line 299)**
```tsx
const isMkbGids = article.slug === "ai-geletterdheidsplicht-voor-het-mkb-de-complete-gids-2026";
```

**2. Add SEO overrides** in the seoTitle/seoDescription logic:
- Title: "AI-geletterdheidsplicht MKB: wat je verplicht bent (en hoe je het regelt)"
- Description: "Artikel 4 EU AI Act geldt ook voor kleine bedrijven. Lees wat AI-geletterdheid voor het MKB concreet betekent, wat het kost en hoe je compliant wordt voor augustus 2026."

**3. Add MKB FAQ data + JSON-LD** (after existing FAQ arrays)
- `MKB_FAQ` with 8 Q&A pairs
- `MKB_FAQ_JSONLD` for FAQPage schema
- Inject JSON-LD in Helmet section

**4. Add interactive components rendering** (after article content, before CTA blocks)
- Conditionally render when `isMkbGids`:
  - Risk table component
  - Comparison table component
  - 5-step progress tracker
  - FAQ accordion
- CTA banner: "Weet je al hoe jouw organisatie ervoor staat?" with link to `/gereedheidscan`

**5. Add to ARTICLE_CTAS**
```tsx
"ai-geletterdheidsplicht-voor-het-mkb-de-complete-gids-2026": [
  { href: "/gereedheidscan", text: "Doe de gratis AI Gereedheidscan" },
  { href: "/training", text: "Bekijk de AI Geletterdheid Training" },
  { href: "/tools/downloads/ai-act-compliance-checklist", text: "Download de AI Act Compliance Checklist" },
],
```

**6. Add inline "Lees ook" links** below the CTA for this slug:
- /tools/downloads/ai-act-compliance-checklist
- /kenniscentrum/ai-geletterdheidsplicht-zo-voldoe-je-in-5-stappen-aiga
- /training

---

### Files affected
- `src/components/MkbArticleComponents.tsx` (new)
- `src/pages/ArticleDetail.tsx` (edit)

### Content note
All em-dashes in the FAQ answers will be replaced with colons, commas, or other punctuation per the site's content style constraints.

