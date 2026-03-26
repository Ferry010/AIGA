

## Plan: Rebuild Boetecalculator with legally accurate EU AI Act fine logic

### What changes

Complete rewrite of `src/pages/Boetecalculator.tsx` — new 4-step flow replacing the current 3-step one, with an entirely new calculation engine.

### New step flow

| Step | Question | Type |
|------|----------|------|
| 1. Rol | "Wat is de rol van jouw organisatie ten opzichte van AI?" | Single-select: Provider / Deployer / Beide / Weet ik niet (with inline explainer) |
| 2. AI-toepassingen | "Welke AI-toepassingen gebruikt of ontwikkelt jouw organisatie?" | Multi-select, grouped into A (Verboden), B (Hoog risico), C (Beperkt risico), D (Minimaal risico) with group headers |
| 3. Compliancestatus | Dynamic question based on highest group selected | If Group D only: 3 literacy-specific options. If A/B/C: broader compliance options about documentation, oversight, transparency |
| 4. Organisatiegrootte | Same as old Step 1 | Single-select: Micro/Klein/Middelgroot/Groot |

Progress bar updates to "Stap X van 4".

### New calculation engine

```
Determine highest tier from AI selections:
- Any Group A → Tier 1: €35M / 7%
- Any Group B → Tier 2: €15M / 3%
- Any Group C → Tier 3: €7.5M / 1.5%
- Group D only → Tier 4: €5K–€50K (member state, no EU max)

SME cap (Art. 99(6)):
- For micro/klein: fine = MIN(flat cap, % of turnover)
- For medium/large: fine = MAX(flat cap, % of turnover)
- Exception: Group A + not compliant → no SME cap

Compliance multiplier:
- Full → GEEN/LAAG risk, show €0 for Group D, 0% of max for others
- Partial → GEMIDDELD, 20–40% of tier max
- Not compliant → HOOG, 60–100% of tier max

Edge cases:
- Group D + fully compliant → "€0 verwacht boeterisico" green result
- Group D + not compliant → "€5.000 – €50.000 per audit"
- Group A + not compliant → always max tier, no cap
```

### Results section

Three output blocks:
1. **Risicoprofiel** — Badge (GEEN / LAAG / GEMIDDELD / HOOG) + which Articles apply
2. **Geschat boetebedrag** — min–max range with Art. 99 footnote
3. **Kosten van compliance** — seats x €249

CTA buttons + updated disclaimer text (Verordening 2024/1689 reference).

### Files changed

| File | Change |
|------|--------|
| `src/pages/Boetecalculator.tsx` | Full rewrite with 4-step flow, grouped AI options, dynamic compliance questions, new calculation engine, updated results layout |

No other files need changes (route already exists).

