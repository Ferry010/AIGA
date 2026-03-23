

## Drie aanpassingen op /speakers-academy

Alleen `src/pages/SpeakersAcademy.tsx` wordt gewijzigd.

### 1. Hero: tweede CTA verwijderen
Regels 54-61 (de `<a>` naar speakersacademy.com) verwijderen. Alleen de "Bekijk de training" Link blijft staan.

### 2. "KIES JE STARTPUNT" vervangen door "DE VOLGENDE STAP"
Regels 187-243 (sectie 5 inclusief StaggerContainer, twee kaarten en banner) volledig vervangen door:
- SectionLabel "DE VOLGENDE STAP"
- H2: "Jouw team AI-geletterd maken."
- Bodytekst over AIGA, selfpaced, schaalbaar, certificaat (geen streepjes)
- Twee knoppen: "Bekijk de training" (btn-neon, link /voor-teams) + "Vraag een offerte aan" (btn-neon-outline, link /contact)

Gebruikt `AnimatedSection` in dezelfde stijl als de andere secties. `StaggerContainer`/`StaggerItem` import kan verwijderd worden als niet meer nodig.

### 3. Footer CTA: tweede knop verwijderen
Regels 256-263 (de `<a>` naar speakersacademy.com "Boek Ferry als spreker") verwijderen. Alleen "Bekijk de AIGA training" blijft.

| Bestand | Wijziging |
|---------|-----------|
| `src/pages/SpeakersAcademy.tsx` | 3 edits: hero CTA, sectie 5 vervangen, footer CTA |

