

# Full SEO & LLM Optimization for AIGA

This is a large, multi-part optimization. I'll break it into logical implementation groups.

---

## Group A — Meta fixes & improvements (items 1, 2, 3)

### 1. Fix duplicate meta description
Remove the hardcoded `<meta name="description">` from `index.html` (line 7). The `<SEO>` component via react-helmet-async already handles this per page.

### 2. Fix og:type for articles
In `ArticleDetail.tsx`, already passes `ogType="article"`. Add article-specific OG meta tags to the `<SEO>` component: `article:published_time`, `article:modified_time`, `article:author`, `article:section`. Extend `SEOProps` to accept optional `articleMeta`.

### 3. Update meta titles & descriptions
Update `<SEO>` props on: `Index.tsx`, `Training.tsx`, `Masterclass.tsx`, `Kenniscentrum.tsx`, `Faq.tsx`, `OverAiga.tsx`, `Quiz.tsx` with the exact titles and descriptions provided.

---

## Group B — JSON-LD schemas (item 4)

### 4a. Homepage — EducationalOrganization schema
Replace existing Organization schema in `Index.tsx` with the full EducationalOrganization schema provided.

### 4b. Training — Course schema
Replace existing Course schema in `Training.tsx` with the full schema including instructor, offers, courseInstance, award.

### 4c. FAQ — FAQPage schema
The FAQ page already has a FAQPage schema. Replace the answer texts for the 5 specified questions with the richer versions. Keep all other existing FAQ items.

### 4d. ArticleDetail — enriched Article schema
Extend the existing Article JSON-LD with `datePublished`, `dateModified`, `wordCount`, full `author` object with URL/jobTitle/sameAs, `publisher` with logo, `mainEntityOfPage`, `inLanguage`, `about`. Since articles don't have date columns in DB, use a sensible default (e.g., "2025-01-15") and calculate wordCount from content length.

### 4e. Person schema on OverAiga
Add the Ferry Hoes Person JSON-LD schema to `OverAiga.tsx`.

---

## Group C — Nederland-specific content (item 5)

### 5a & 5b. Homepage hero additions
Add H2 subtitle under H1 and new paragraph about Dutch focus in the hero section.

### 5c. New page: `/ai-geletterdheid-nederland`
Create `src/pages/AiGeletterdheidNederland.tsx` — SEO landing page with H1, sections about Dutch AI Act implementation, Rijksoverheid expectations, how Dutch orgs handle AI literacy, CTA to training, internal links to kennisartikelen. Add route in `App.tsx`, add to `sitemap.xml`, add link in `Footer.tsx`.

---

## Group D — Sitemap lastmod (item 6)
Update `public/sitemap.xml` — add `<lastmod>2026-03-13</lastmod>` to all URLs.

---

## Group E — Social proof (item 7)
Create `src/components/SocialProof.tsx` with placeholder sector icons (using Lucide icons as stand-ins), placeholder testimonial quotes, and stats ("500+ gecertificeerde medewerkers", "40+ organisaties", "4.8/5 gemiddelde beoordeling"). Insert between "Hoe het werkt" and "Ons Aanbod" sections in `Index.tsx`.

---

## Group F — Kennisartikel improvements (item 8)

### 8a & 8b. Publication date & reading time
Add visible date (hardcoded "2025" fallback since no DB date column) and calculated reading time (`Math.ceil(wordCount / 200)` min) to `ArticleDetail.tsx` meta row.

### 8c. Author bio
Already exists at bottom of ArticleDetail. Add `Link to="/over-aiga"` on the author name.

### 8d. Related articles
Fetch 3 articles from same category (excluding current) and display below the author bio card.

### 8e. Table of contents
For articles with 600+ words, extract H2 headings from content, render a clickable TOC above the article body with anchor links.

### 8f. External source links
Add a small "Bronnen" section at bottom of EU AI Act-related articles with links to EUR-Lex, Rijksoverheid.nl, European Commission. Detect by category ("Wetten en regels").

---

## Group G — Definition blocks (item 9)
Create `src/components/DefinitionBlock.tsx` — a styled block with light-blue/purple background and border. Add to `/kenniscentrum` index and homepage with the AI-geletterdheid definition text provided.

---

## Group H — Risicoscan SEO content (item 10)
Expand the intro phase of `Quiz.tsx` with: updated H1, 100-150 word explanatory paragraph, list of 5 example questions, updated meta description, WebApplication JSON-LD schema.

---

## Group I — Author page Ferry Hoes (item 11)
Enhance `OverAiga.tsx` (rather than new page) with: larger profile photo, expanded 250+ word bio, keynote list, LinkedIn link, list of all kennisartikelen by Ferry (fetched from DB). Add Person schema (already covered in 4e). Add `rel="author"` on article links pointing to `/over-aiga`.

---

## Group J — Ferry Hoes image (item 12)
The .gif is used in multiple places. Since we can't convert the file format in code, we'll add `loading="lazy"`, `decoding="async"`, and explicit `width`/`height` attributes for better CWV. Note: actual WebP conversion requires a new image file from the client.

---

## Group K — Breadcrumbs (item 13)
Create `src/components/BreadcrumbNav.tsx` using existing `breadcrumb.tsx` UI primitives. Renders visible breadcrumb + BreadcrumbList JSON-LD. Add to all subpages and article detail pages.

---

## Group L — Video section fix (item 14)
The homepage already has a `<video>` element with the `.webm` file. It appears to work. Keep as-is since there's an actual video file. Add `poster` attribute for faster perceived load.

---

## Group M — Cookie banner (item 15)
The current cookie banner uses `fixed bottom-0` positioning and `localStorage` — it already disappears after click and doesn't return. The behavior described (sticky while scrolling) is correct and intentional for cookie banners — it must stay visible until the user makes a choice. No changes needed; current implementation is correct.

---

## Group N — New SEO landing pages (item 16)

Create 3 new pages:
- `src/pages/AiTrainingVoorBedrijven.tsx` — `/ai-training-voor-bedrijven`
- `src/pages/AiActComplianceNederland.tsx` — `/ai-act-compliance-nederland`
- `src/pages/AiCursusMedewerkers.tsx` — `/ai-cursus-medewerkers`

Each with full SEO content, meta tags, JSON-LD (WebPage schema), internal links, and CTA. Add routes in `App.tsx`, entries in `sitemap.xml`, and internal links from homepage/training page.

---

## Files touched summary

| File | Action |
|------|--------|
| `index.html` | Remove duplicate meta description |
| `src/components/SEO.tsx` | Extend with articleMeta props |
| `src/components/SocialProof.tsx` | New |
| `src/components/DefinitionBlock.tsx` | New |
| `src/components/BreadcrumbNav.tsx` | New |
| `src/pages/Index.tsx` | Meta, hero, social proof, definition block |
| `src/pages/Training.tsx` | Meta, JSON-LD, internal links |
| `src/pages/Masterclass.tsx` | Meta |
| `src/pages/Kenniscentrum.tsx` | Meta, definition block |
| `src/pages/Faq.tsx` | Meta, enriched FAQ answers |
| `src/pages/OverAiga.tsx` | Meta, expanded bio, Person schema, article list |
| `src/pages/Quiz.tsx` | Meta, SEO intro content, schema |
| `src/pages/ArticleDetail.tsx` | Enriched schema, date, reading time, TOC, related articles, breadcrumbs, external sources |
| `src/pages/AiGeletterdheidNederland.tsx` | New |
| `src/pages/AiTrainingVoorBedrijven.tsx` | New |
| `src/pages/AiActComplianceNederland.tsx` | New |
| `src/pages/AiCursusMedewerkers.tsx` | New |
| `src/components/Footer.tsx` | Add new page links |
| `src/App.tsx` | Add 4 new routes |
| `public/sitemap.xml` | Add lastmod, add 4 new URLs |

