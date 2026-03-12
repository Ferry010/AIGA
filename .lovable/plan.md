

# Vergelijk sectie restylen + video toevoegen

## Wat verandert er

### 1. Vergelijk sectie → gestylede kaart
De huidige kale tabel wordt gewrapped in een kaart met border, rounded corners en achtergrond — consistent met de rest van het design. De tabel zelf krijgt betere spacing en visuele scheiding tussen kolommen.

### 2. Video blok tussen Ons Aanbod en Vergelijk
Een nieuw blok met de geüploade `.webm` video, gecentreerd, in een kaart met neon-border styling. Inclusief een korte kop erboven (bijv. "Bekijk de training in actie").

### 3. Video bestand
Het `.webm` bestand wordt gekopieerd naar `src/assets/` en geïmporteerd in `Index.tsx`. Wordt afgespeeld als een `<video>` element met controls, autoplay (muted), en loop.

## Wijzigingen per bestand

| Bestand | Actie |
|---------|-------|
| `src/assets/AI-Geletterdheid-Homepage-scaled-1.webm` | Kopieer video naar project |
| `src/pages/Index.tsx` | (1) Nieuw video-sectie blok na "Ons Aanbod", (2) Vergelijk tabel in gestylede kaart wrappen |

### Vergelijk sectie styling
- Wrap tabel in `bg-card border border-border rounded-2xl p-8` kaart
- Kolom headers krijgen neon-gradient achtergrond badges
- Rijen krijgen hover states en betere padding

### Video sectie (nieuw blok)
- Tussen "Ons Aanbod" en "Vergelijk"
- SectionLabel + korte heading
- `<video>` in een `neon-border-lg` kaart, `rounded-2xl`, max-width beperkt
- `controls`, `muted`, `autoPlay`, `loop`, `playsInline` attributen

