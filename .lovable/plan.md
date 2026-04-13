

## SEO Audit: Findings and Fix Plan

### Audit Summary

I checked all 30+ pages across three criteria: unique `<title>` matching the H1, proper `<h1>` tags, and crawlability.

---

### 1. Title ↔ H1 Alignment Issues

Most pages are good. These have mismatches worth fixing:

| Page | SEO `<title>` | H1 text | Issue |
|---|---|---|---|
| **Index** | "AI Geletterdheid Training Nederland \| AIGA Academy \| AI Act Compliant" | "Jouw team werkt al met AI. Weet iedereen wat dat betekent?" | Mismatch — title is keyword-focused, H1 is emotional. Acceptable for homepage, but the title should still echo the H1 concept |
| **Contact** | "Contact — AIGA \| Offerte Aanvragen" | "Klaar om jouw team te certificeren? Laten we praten." | Title says "Contact / Offerte", H1 is a CTA. Minor mismatch, acceptable |
| **Masterclass** | "AI Masterclass voor Leidinggevenden \| Live sessie \| AIGA" | "Wat verwacht de AI Act van jou als leidinggevende?" | Title keyword-focused, H1 question-based. Fine for SEO |
| **Faq** | "Veelgestelde Vragen over AI-Geletterdheid & AI Act \| AIGA" | "Veelgestelde vragen over AI-geletterdheid" | Good match |

**Verdict**: Title/H1 alignment is solid across the site. No critical issues.

---

### 2. Missing or Incorrect `<h1>` Tags

All pages have proper `<h1>` tags. No pages use `<h2>` or other elements where an `<h1>` should be.

---

### 3. Crawlability Issues

**robots.txt** — The current file is fine and allows all major crawlers. Sitemap is referenced correctly.

**No meta robots "noindex" tags found** — Good. All pages are indexable.

**SPA rendering** — This is a client-side React SPA. Google can render JavaScript, but there are best practices to follow:
- `react-helmet-async` is used correctly for dynamic `<title>` and meta tags
- Structured data (JSON-LD) is rendered client-side, which Google handles fine

---

### 4. Incorrect Date: "augustus 2025" Still Present

During the audit I found **"augustus 2025" still appears in multiple files** that were not fixed in the previous update:

| File | Line | Text |
|---|---|---|
| `src/pages/Faq.tsx` | 14 | "Vanaf augustus 2025 wordt dit actief gehandhaafd." |
| `src/pages/ArticleDetail.tsx` | 115 | "Actieve handhaving door de AP is gestart per augustus 2025" |
| `src/pages/ArticleDetail.tsx` | 122 | "De AP handhaaft actief vanaf augustus 2025" |

These all need to be changed to **"augustus 2026"**.

---

### Proposed Changes

**File: `src/pages/Faq.tsx`**
- Line 14: Change "augustus 2025" → "augustus 2026"

**File: `src/pages/ArticleDetail.tsx`**
- Line 115: Change "augustus 2025" → "augustus 2026"
- Line 122: Change "augustus 2025" → "augustus 2026"

That's it — the SEO fundamentals (unique titles, H1 tags, crawlability) are in good shape. The only actionable fix is correcting the remaining wrong dates.

