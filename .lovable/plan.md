

# Trainer sectie layout verbeteren

## Nieuwe layout

De huidige ronde gif + tekst ernaast wordt vervangen door:

**Bovenste rij** (flex row op desktop):
- **Links (~1/3)**: Gif in een rechthoekige kaart (`bg-card border border-border rounded-2xl`) met neon-glow, object-cover, grotere weergave
- **Rechts (~2/3)**: Heading, bio tekst

**Onderste rij**: De 3 feitjes naast elkaar in een horizontale grid (3 kolommen op desktop), elk als een mini-kaart of gewoon naast elkaar

## Wijziging

| Bestand | Actie |
|---------|-------|
| `src/pages/Index.tsx` | Herstructureer trainer sectie (regels 334-366) |
| `src/pages/OverAiga.tsx` | Zelfde layout aanpassing |
| `src/pages/Training.tsx` | Zelfde layout aanpassing |

De gif wordt weergegeven als rechthoekige afbeelding (~aspect-ratio 3:4) in een kaart, niet meer als kleine ronde cirkel.

