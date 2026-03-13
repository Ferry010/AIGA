

# Artikelopmaak & SEO audit — bevindingen en plan

## Gevonden problemen

### 1. Bullets staan los van tekst
**Oorzaak**: De scraper converteert `<li><p>tekst</p></li>` → de `<p>`-tags binnen list items worden eerst naar dubbele newlines omgezet, waardoor de bullet (`-`) op een aparte regel komt van de tekst. Dit is het kernprobleem.

**Fix**: In de edge function `<li>` items preprocessen: eerst `<p>`-tags binnen `<li>` strippen vóór de algemene `<p>`-conversie.

### 2. Duplicate hero image + titel bovenaan artikelen
Artikelen beginnen met `![](image)\n\n#\n\nTitel\n\n### **Titel**` — de hero image en H1-titel staan dubbel in de content. De hero image wordt al apart getoond en de titel staat al in de `<h1>` boven het artikel.

**Fix**: In `stripBoilerplate` de eerste image + eerste H1 verwijderen als ze matchen met de article title/image.

### 3. Kapotte opmaak-artefacten
- `**Waarom verboden?******` — dubbele bold-markers
- Blockquotes met lege `>` regels
- `&#8211;` entities die niet geconverteerd worden

**Fix**: Extra cleanup regexen in de scraper.

### 4. Broken interne links
Artikelen verwijzen naar `/wat-zijn-high-risk-ai-systemen`, `/eu-ai-act-uitgelegd` etc. — dit zijn relatieve links naar de originele WordPress-site, niet naar het kenniscentrum. Ze leiden nu naar 404's.

**Fix**: In de scraper interne links rewriten naar `/kenniscentrum/{slug}` of ze verwijderen.

### 5. SEO — wat nog mist
- **Sitemap**: Geen `sitemap.xml` voor Google. Toevoegen via `public/sitemap.xml` (statisch) met alle routes + dynamische artikelpagina's.
- **robots.txt**: Huidige `robots.txt` is leeg/basic. Moet verwijzen naar sitemap.
- **`index.html`**: Bevat duplicate meta tags (zowel statisch als via Helmet). De statische tags in `index.html` opruimen zodat Helmet het overneemt.
- **`lang="nl"`**: Al goed ingesteld.
- **Canonical**: Al geïmplementeerd.
- **JSON-LD**: Al geïmplementeerd op alle pagina's.

## Wijzigingen

| Bestand | Wat |
|---------|-----|
| `supabase/functions/scrape-article/index.ts` | Fix `<li><p>` nesting, strip duplicate title/image, fix bold artifacts, rewrite interne links |
| `index.html` | Verwijder duplicate statische meta tags (Helmet doet dit nu) |
| `public/robots.txt` | Sitemap URL toevoegen |
| `public/sitemap.xml` | Statische sitemap met alle vaste routes |
| `src/pages/ArticleDetail.tsx` | Strip leading `#` title uit content als het matcht met article.title (fallback voor bestaande content) |

Na de scraper-fix: **alle artikelen opnieuw importeren** via admin dashboard om de opmaak te herstellen.

