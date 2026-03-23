

## Vier aanpassingen op de homepage

### Aanpassing 1 — Datumtekst fixen
Regel 135 in `src/pages/Index.tsx`: vervang de urgency banner tekst.

### Aanpassing 2 — Live countdown
Nieuw blok tussen de hero CTA's (regel 111) en de "Een samenwerking tussen" sectie (regel 117). Bevat:
- `useEffect` + `useState` voor real-time countdown naar `2026-08-02T00:00:00` (Europe/Amsterdam)
- Vier blokjes (dagen/uren/minuten/seconden) met neon-pink/purple styling
- Tekst erboven: "TIJD TOT VOLLEDIGE AI ACT HANDHAVING" (small caps)
- Tekst eronder: "Is jouw organisatie er klaar voor?"
- Op mobiel (`< sm`): 2x2 grid; op desktop: 4 kolommen naast elkaar

### Aanpassing 3 — Hero paragraaf
Regel 93: vervang de zin met de nieuwe versie inclusief "en AI ook echt effectief en mensgericht inzetten".

### Aanpassing 4 — Subheadline
Regel 90: voeg "— ontwikkeld door Ferry Hoes, keynote speaker en AI-expert" toe.

### Bestanden

| Bestand | Wijziging |
|---------|-----------|
| `src/pages/Index.tsx` | 4 tekstwijzigingen + countdown component inline |

Geen nieuwe bestanden, geen layout-wijzigingen, geen andere componenten geraakt.

