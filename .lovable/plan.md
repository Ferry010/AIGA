

## Countdown verbeteren: CTA-knop + kleuraccent

### Wijzigingen in `src/pages/Index.tsx` — CountdownTimer component (regels 67-84)

**1. CTA-knop toevoegen**
Direct onder "Is jouw organisatie er klaar voor?" een `Link` knop toevoegen naar `/gereedheidscan` met tekst "Doe de gratis gereedheidscan →". Stijl: `btn-neon` class (bestaande magenta/paars gradient knop).

**2. Countdown visueel urgenter maken**
- Blokjes achtergrond wijzigen van `bg-card` naar een lichte magenta/paurs tint: `bg-gradient-to-br from-neon-purple/5 to-neon-pink/10`
- Border sterker: `border-neon-pink/30` → `border-neon-pink/40`
- De cijfers gebruiken al `neon-text` (paars→roze gradient), dat blijft

Alleen de CountdownTimer return JSX wordt aangepast, geen andere wijzigingen.

