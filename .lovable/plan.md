

## Twee aanpassingen: countdown verwijderen + sticky announcement bar

### 1. Countdown verwijderen uit hero (`src/pages/Index.tsx`)
- Verwijder de `CountdownTimer` component (regels 44-88) en het `TARGET_DATE` const
- Verwijder `<CountdownTimer />` aanroep (regel 159-160)
- Houd de `TARGET_DATE` berekening beschikbaar voor de announcement bar (of herbereken inline)

### 2. Sticky announcement bar toevoegen (`src/App.tsx`)
- Maak een `AnnouncementBar` component (inline of apart) met:
  - Dynamische dagenberekening naar `2026-08-02`
  - Tekst: `⏳ Nog [X] dagen — 2 augustus 2026 treedt de volledige EU AI Act in werking.`
  - Stijl: `position: sticky`, `top: 0`, `z-index: 60` (hoger dan nav z-50), `btn-neon` achtergrondkleur (magenta/paurs gradient), witte tekst, padding 8px, font-size 14px, gecentreerd
- Render boven `<Navbar />` in `AppContent`, alleen als `!isAdminActive`
- Pas `pt-16` op `<main>` aan naar `pt-[calc(4rem+36px)]` (nav 64px + bar ~36px) zodat content niet overlapt

### Bestanden

| Bestand | Wijziging |
|---------|-----------|
| `src/pages/Index.tsx` | CountdownTimer component + aanroep verwijderen |
| `src/App.tsx` | AnnouncementBar toevoegen boven Navbar, main padding aanpassen |

