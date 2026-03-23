

## Plan: EU AI Act in 1 A4 — One-pager pagina

### Overzicht
Nieuwe pagina op `/kenniscentrum/eu-ai-act-in-1-a4` met een visuele, printbare A4-samenvatting van de EU AI Act. Plus de bestaande "coming soon" kaart op het Kenniscentrum live maken.

### Stappen

**1. Nieuwe pagina: `src/pages/EuAiActA4.tsx`**
- Route: `/kenniscentrum/eu-ai-act-in-1-a4`
- Bovenaan: BreadcrumbNav + SEO-component
- Actiebalk met twee knoppen rechts: "Doorsturen" (mailto-link) en "Opslaan als PDF" (window.print())
- Daaronder: A4-proportioneel blok (aspect-ratio 1:1.414) met witte achtergrond en subtiele rand
- Inhoud exact zoals beschreven: header, 6 content-blokken, document-footer
- Blokken gebruiken de bestaande AIGA paars-roze gradiënt voor sectielabels
- Tijdlijn als horizontale stippen-lijn met accentkleuren
- Risicocategorieën als 4 gekleurde kolommen (rood/oranje/geel/groen)
- Boetes als 3 metric cards naast elkaar
- Lucide Check-icoon voor de Artikel 4 bullets

**2. Print stylesheet in `src/index.css`**
- `@media print` blok dat navbar, actiebalk, footer, breadcrumb verbergt
- Alleen het A4-document-blok toont, zonder rand, full-width
- `@page { size: A4 portrait; margin: 1cm; }`
- Zwarte tekst als fallback voor gekleurde labels (print-safe)

**3. Route toevoegen in `src/App.tsx`**
- Import `EuAiActA4` en voeg route toe: `/kenniscentrum/eu-ai-act-in-1-a4`

**4. Kenniscentrum kaart live maken in `src/pages/Kenniscentrum.tsx`**
- Card 4 ("EU AI Act in 1 A4"): verwijder opacity-60, cursor-default, "Binnenkort" badge
- Wrap in `<Link to="/kenniscentrum/eu-ai-act-in-1-a4">` met dezelfde hover-stijl als Card 1
- Voeg "Bekijk de samenvatting →" link toe onderaan

### Bestanden

| Actie | Bestand |
|-------|---------|
| Nieuw | `src/pages/EuAiActA4.tsx` |
| Edit | `src/App.tsx` — route toevoegen |
| Edit | `src/pages/Kenniscentrum.tsx` — Card 4 live maken |
| Edit | `src/index.css` — print stylesheet |

Geen database-wijzigingen nodig.

