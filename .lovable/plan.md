

# Link-fixing in artikelen

## Gevonden problemen

Uit de database-analyse komen drie categorieën kapotte links:

### A. Links naar pagina's die GEEN artikelen zijn (verkeerd herschreven)
| Huidige link | Moet worden |
|---|---|
| `/kenniscentrum/ai-geletterdheid-training` | `/training` |
| `/kenniscentrum/masterclass-voor-leidinggevenden` | `/masterclass` |
| `/kenniscentrum/kenniscentrum` | `/kenniscentrum` |
| `/kenniscentrum/faq-items` | `/faq` |

### B. Interne artikellinks zonder `/kenniscentrum/` prefix
| Huidige link | Moet worden |
|---|---|
| `/eu-ai-act-uitgelegd` | `/kenniscentrum/eu-ai-act-uitgelegd` |
| `/wat-is-ai-geletterdheid` | `/kenniscentrum/wat-is-ai-geletterdheid` |
| `/ai-act-hr` | `/kenniscentrum/ai-act-en-hr-wat-moet-je-als-hr-professional-weten` |
| `/ai-geletterdheid-training` | `/training` |
| `/masterclass-voor-leidinggevenden` | `/masterclass` |
| `/wat-zijn-high-risk-ai-systemen` | `/kenniscentrum/wat-zijn-high-risk-ai-systemen` |
| `/documentatie-eisen-eu-ai-act` | `/kenniscentrum/documentatie-eisen-eu-ai-act` |
| `/documentatie-eisen-ai-act` | `/kenniscentrum/documentatie-eisen-eu-ai-act` |
| `/ai-impact-assessment` | `/kenniscentrum/ai-impact-assessment` |
| `/ai-geletterdheid-voor-leiders` | `/kenniscentrum/ai-geletterdheid-voor-leiders` |
| `/llms-generatieve-ai-geletterdheid` | `/kenniscentrum/llms-generatieve-ai-geletterdheid` |
| `/verschil-minimal-limited-high-risk-ai` | `/kenniscentrum/verschil-minimal-limited-high-risk-ai` |
| `/welke-ai-systemen-zijn-verboden` | `/kenniscentrum/welke-ai-systemen-zijn-verboden` |
| `/hoe-herken-je-ai-bias` | `/kenniscentrum/hoe-herken-je-ai-bias` |
| `/ai-trends-2025-ai-geletterdheid` | `/kenniscentrum/ai-trends-2025-ai-geletterdheid` |

## Aanpak

### 1. Scraper updaten (`supabase/functions/scrape-article/index.ts`)
Na de markdown conversie een extra stap toevoegen die:
- Bekende niet-artikel slugs (`ai-geletterdheid-training`, `masterclass-voor-leidinggevenden`, `kenniscentrum`, `faq-items`) mapt naar de juiste routes (`/training`, `/masterclass`, `/kenniscentrum`, `/faq`)
- Overige `/kenniscentrum/{slug}` links intact laat
- Losse `/{slug}` links die matchen met bekende artikel-slugs herschrijft naar `/kenniscentrum/{slug}`

### 2. Bestaande content fixen
Een backend function aanroepen of SQL-update om alle bestaande artikelen in één keer te fixen met dezelfde regels. Dit kan via een reeks `UPDATE` statements op de `content` kolom.

### 3. ArticleDetail.tsx — interne links klikbaar maken
In de `ReactMarkdown` component een custom `a` renderer toevoegen die links naar `/kenniscentrum/...`, `/training`, `/masterclass` etc. als React Router `<Link>` rendert in plaats van `<a>`.

| Bestand | Wijziging |
|---|---|
| `supabase/functions/scrape-article/index.ts` | Link-rewrite logica uitbreiden |
| `src/pages/ArticleDetail.tsx` | Custom `a` component in ReactMarkdown voor interne links |
| Database | Eenmalige content-update voor alle 19 artikelen |

