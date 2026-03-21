

## SEO + Content overhaul voor /kenniscentrum/wat-is-ai-geletterdheid

### Aanpak
De artikelpagina wordt aangestuurd door `ArticleDetail.tsx` dat content uit de database rendert. Voor dit specifieke slug voegen we overrides toe in de bestaande component, plus een database-update met de nieuwe content.

### Wijzigingen

**1. Database migration — update article content**
- Update de `articles` row met `slug = 'wat-is-ai-geletterdheid'`
- Nieuwe markdown content (volledige tekst zoals opgegeven), maar zonder de FAQ-sectie en CTA-sectie (die worden apart gerenderd)

**2. Edit `src/pages/ArticleDetail.tsx`**

Slug-specifieke overrides voor `wat-is-ai-geletterdheid`:

- **SEO override**: Custom title "Wat is AI-geletterdheid? Complete gids voor organisaties (2026)" en custom meta description. Canonical al correct via bestaande logica.
- **Article JSON-LD override**: Verrijkte versie met `keywords`, `about`, `inLanguage: "nl-NL"`, `datePublished: "2025-02-01"`, `dateModified: "2026-03-21"`, uitgebreidere author/publisher data.
- **Extra FAQPage JSON-LD**: Tweede `<script type="application/ld+json">` blok via de `breadcrumbJsonLd` slot van SEO component (hernoemen/uitbreiden) of via aparte Helmet.
- **"Laatst bijgewerkt" regel**: Zichtbare datum onder de titel/auteur meta-rij.
- **FAQ accordion**: Na de artikel-content, render de 7 FAQ-items als Accordion component (al beschikbaar in `src/components/ui/accordion.tsx`). Vragen als `AccordionTrigger`, antwoorden als `AccordionContent`.
- **CTA buttons**: Drie knoppen onderaan, voor de auteur-bio:
  - "Bekijk de online training" → `/training` (primary)
  - "Doe de gratis AI Gereedheidscan" → `/gereedheidscan` (outline)
  - "Vraag een offerte aan" → `/contact` (outline)

### Bestanden

| Actie | Bestand |
|-------|---------|
| Migration | Update article content in database |
| Edit | `src/pages/ArticleDetail.tsx` — slug-specifieke SEO, JSON-LD, FAQ accordion, CTA's, "Laatst bijgewerkt" |

### Structuur in ArticleDetail.tsx

```text
const isWatIsAiGeletterdheid = slug === "wat-is-ai-geletterdheid";

// SEO: conditional title/description override
// JSON-LD: conditional enriched Article schema + FAQPage schema
// Meta row: add "Laatst bijgewerkt: 21 maart 2026" visible line
// After article content: if isWatIsAiGeletterdheid → render FAQ Accordion + CTA block
// Then existing: author bio, related, prev/next
```

De FAQ-data en het FAQPage schema worden als constanten bovenaan het bestand gedefinieerd om ArticleDetail leesbaar te houden.

