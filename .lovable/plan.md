

# Trainer sectie updaten op alle pagina's

## Wat verandert er

### 1. Trainer afbeelding (gif) toevoegen
De "FH" placeholder cirkels worden vervangen door de geüploade gif (`ezgif-52001cb12b0fea-2.gif`) als profielfoto van Ferry. Bestand wordt gekopieerd naar `src/assets/ferry-hoes.gif` en geïmporteerd in de betreffende pagina's.

### 2. Drie feitjes updaten
Op alle pagina's waar de stats staan (Index.tsx, OverAiga.tsx):

| Waarde | Nieuwe label |
|--------|-------------|
| **40+** | Keynotes per jaar, internationale events en in-house sessies |
| **15+** | Jaar ervaring van startups tot wereldwijde corporates |
| **2020** | Winnaar prestigieuze AI Hackathon van de Nederlandse overheid |

### 3. Training.tsx trainer sectie
Heeft een andere layout (video placeholder + tekst, geen stats). Hier wordt ook de gif toegevoegd als afbeelding en de stats toegevoegd onder de bio tekst.

## Bestanden

| Bestand | Actie |
|---------|-------|
| `src/assets/ferry-hoes.gif` | Kopieer gif |
| `src/pages/Index.tsx` | Vervang FH-cirkel door gif, update stats |
| `src/pages/OverAiga.tsx` | Vervang FH-cirkel door gif, update stats |
| `src/pages/Training.tsx` | Vervang Play-placeholder door gif, voeg stats toe |

