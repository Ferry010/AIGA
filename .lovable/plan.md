

# Markdown styling + SEO machine

## 1. Markdown styling fix

**Probleem**: De `prose` Tailwind-classes doen niets omdat `@tailwindcss/typography` niet geinstalleerd is. Daarom renderen headings, paragrafen, lijsten en line breaks als platte tekst.

**Oplossing**:
- Installeer `@tailwindcss/typography`
- Voeg plugin toe aan `tailwind.config.ts`
- Fix `prose-invert` (dit is een dark-mode class, maar de site is light-mode) — verwijder het
- Pas prose styling aan zodat het past bij het AIGA kleurenschema

## 2. SEO killer-machine

**Probleem**: Er is geen per-page `<title>` of `<meta description>`. Alleen de homepage heeft statische meta tags in `index.html`. SPA's zonder SSR hebben hier een oplossing voor nodig.

**Oplossing** — `react-helmet-async` component per pagina:

### Per-page meta tags:

| Route | Title | Description |
|-------|-------|-------------|
| `/` | AIGA - AI Geletterdheid Academy \| AI Act Training | Maak jouw team AI-geletterd en compliant met de EU AI Act... |
| `/training` | AI-Geletterdheid Training voor Teams \| AIGA | Online AI Act training met certificaat. Vanaf 10 medewerkers... |
| `/masterclass` | AI Act Masterclass voor Leidinggevenden \| AIGA | Live masterclass over de AI Act voor management en directie... |
| `/kenniscentrum` | Kenniscentrum AI-Geletterdheid \| AIGA | Artikelen over de AI Act, AI op de werkvloer en verantwoord AI-gebruik... |
| `/kenniscentrum/:slug` | {article.title} \| AIGA Kenniscentrum | Dynamisch uit article content |
| `/faq` | Veelgestelde Vragen over AI-Geletterdheid \| AIGA | Antwoorden op vragen over de AI Act, certificering... |
| `/over-aiga` | Over AIGA - AI Geletterdheid Academy | Wie we zijn en waarom AI-geletterdheid de basis is... |
| `/contact` | Contact \| AIGA - AI Geletterdheid Academy | Neem contact op voor AI-geletterdheid training... |
| `/risicoscan` | Gratis AI Risicoscan \| AIGA | Ontdek in 5 minuten hoe jouw organisatie scoort... |

### Structured Data (JSON-LD):
- **Organization** schema op homepage
- **FAQPage** schema op `/faq` (Google FAQ rich results)
- **Article** schema op elke artikelpagina (rich results in Google)
- **Course** schema op `/training`

### Overige SEO:
- Canonical URLs per pagina
- Open Graph + Twitter Card tags per pagina
- Sitemap generatie via `vite-plugin-sitemap`

## Bestanden

| Bestand | Wijziging |
|---------|-----------|
| `package.json` | + `@tailwindcss/typography`, `react-helmet-async` |
| `tailwind.config.ts` | + typography plugin |
| `src/App.tsx` | + `HelmetProvider` wrapper |
| `src/components/SEO.tsx` | Nieuw — herbruikbare SEO component |
| `src/pages/ArticleDetail.tsx` | Fix prose classes, + SEO + Article JSON-LD |
| `src/pages/Index.tsx` | + SEO + Organization JSON-LD |
| `src/pages/Training.tsx` | + SEO + Course JSON-LD |
| `src/pages/Masterclass.tsx` | + SEO |
| `src/pages/Kenniscentrum.tsx` | + SEO |
| `src/pages/Faq.tsx` | + SEO + FAQPage JSON-LD |
| `src/pages/OverAiga.tsx` | + SEO |
| `src/pages/Contact.tsx` | + SEO |
| `src/pages/Quiz.tsx` | + SEO |
| `src/index.css` | Light-mode prose overrides indien nodig |

