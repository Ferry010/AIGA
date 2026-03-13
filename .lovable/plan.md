

# Artikelen importeren van aigeletterdheid.academy

## Aanpak

We scrapen de 17 artikelen automatisch via een backend functie en slaan de markdown-content op in de database. Daarna tonen we artikelen op eigen detailpagina's in plaats van extern te linken.

## Stappen

### 1. Database: `content` kolom toevoegen aan `articles`
Voeg een nullable `text` kolom `content` toe + een `slug` kolom voor URL-routing.

### 2. Backend functie: `scrape-article`
Een edge function die:
- Een artikel-URL ontvangt
- De pagina fetcht (plain HTML, geen Firecrawl nodig — het zijn publieke WordPress-pagina's)
- De main content uit de HTML extraheert (article body)
- De markdown-versie opslaat in de `content` kolom

### 3. Admin dashboard: "Importeer content" knop
Per artikel een knop om de content op te halen, of een bulk-knop om alles in één keer te scrapen. Status-indicator of content al geïmporteerd is.

### 4. Artikel detailpagina (`/kenniscentrum/:slug`)
- Nieuwe route + pagina die het artikel toont met de opgeslagen markdown content
- Styling consistent met de rest van de site
- Terug-link naar het kenniscentrum

### 5. Kenniscentrum aanpassen
- Artikelen met content → interne link naar `/kenniscentrum/:slug`
- Artikelen zonder content → blijven extern linken (fallback)

## Technisch detail

- **Scraping zonder Firecrawl**: de artikelen staan op een publieke WordPress-site. We gebruiken `fetch()` in de edge function om de HTML op te halen en parseren de `<article>` of `.entry-content` div. We converteren naar simpele markdown (koppen, paragrafen, lijsten, links).
- **Slug**: afgeleid uit de bestaande URL (bijv. `ai-act-samenvatting` uit `https://aigeletterdheid.academy/ai-act-samenvatting/`)
- **Markdown rendering**: we installeren `react-markdown` + `remark-gfm` voor nette weergave

