

# Artikelpagina verbeteringen

## Drie wijzigingen

### 1. Hero/header layout opschonen
Huidige situatie: gradient overlay op hero image, en de afbeelding verschijnt ook in de markdown content (dubbel). 

Aanpak:
- Verwijder de gradient overlay. Toon de hero image als een schone, full-width afbeelding boven de content.
- Plaats titel, categorie-badge en teruglink onder de afbeelding (niet eroverheen) — consistent met de lichte brand-stijl.
- Filter `<img>` tags uit de markdown content die dezelfde URL als de hero image bevatten, zodat de afbeelding niet dubbel verschijnt.

### 2. Markdown content formatting verbeteren
Huidige situatie: de scraper converteert HTML naar markdown, maar koppen en alinea-breaks gaan verloren.

Aanpak:
- Verbeter de `htmlToMarkdown` functie in de edge function: betere afhandeling van geneste `<div>`'s, `<br>` tags, en WordPress-specifieke formatting.
- Voeg een `components` override toe aan `ReactMarkdown` om images in de content te filteren (duplicaat hero image) en om embedded afbeeldingen netjes te renderen.
- Artikelen die al geïmporteerd zijn moeten opnieuw geïmporteerd worden met de verbeterde scraper.

### 3. Onderkant artikel: bio-card + vorig/volgend
Huidige situatie: losse tekst en dubbele afbeeldingen.

Aanpak:
- Voeg een compacte **auteur-card** toe onderaan het artikel: Ferry's foto (GIF), naam, korte bio, en neon-border styling consistent met de TrainerSection.
- Voeg **vorig/volgend navigatie** toe: haal alle gepubliceerde artikelen op (gesorteerd op `sort_order`), bepaal de positie van het huidige artikel, en toon twee kaarten met thumbnail, titel en categorie.

## Technisch overzicht

```text
ArticleDetail.tsx
├── Back link + Badge + Title (onder de afbeelding, niet eroverheen)
├── Hero image (full-width, geen gradient)
├── Article content (ReactMarkdown, hero-image gefilterd)
├── Author bio card (ferry-hoes.gif + bio tekst + neon border)
└── Prev/Next navigation (twee kaarten)
```

Bestanden die worden aangepast:
- `src/pages/ArticleDetail.tsx` — hoofdwijzigingen
- `supabase/functions/scrape-article/index.ts` — betere markdown conversie

