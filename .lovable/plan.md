

# Rebuild AI Risk Scan Results Page

## What changes

Complete rewrite of `src/pages/Quiz.tsx` with these structural changes:

### 1. Remove the form gate
- Remove the `"gate"` phase entirely. After question 10, go straight to `"result"`.
- Remove the `gate` state and `handleGateSubmit` in its current form.

### 2. Add trust line during quiz
- Display "Je ziet je resultaat meteen, we gooien geen formulier voor je neus." below the progress bar during the quiz phase.

### 3. New 3-tier scoring system
Score is percentage-based (0-30 raw mapped to 0-100%):
- **Tier 1** (0-40%, raw 0-12): "Je team loopt risico"
- **Tier 2** (41-70%, raw 13-21): "Jullie zijn op de goede weg, maar er zijn blinde vlekken"
- **Tier 3** (71-100%, raw 22-30): "Jullie lopen voor op de meeste organisaties"

Each tier has its own heading, body, CTA heading, CTA body, button label, small print, and text link — all using the exact copy provided.

### 4. Dimension breakdown
Group the 10 questions into 5 dimensions (2 questions each) to show a visual bar chart:
- AI-gebruik (Q1, Q2)
- Bewustzijn & wetgeving (Q3, Q4)
- Risicobeheer (Q5, Q6)
- Leiderschap & urgentie (Q7, Q8)
- Onboarding & audit-readiness (Q9, Q10)

Each dimension shows a horizontal progress bar with per-dimension score (0-6 mapped to percentage). Fully visible on all tiers.

### 5. CTA form on results page
- Fields: Naam, Zakelijk e-mailadres, Bedrijfsnaam (all required)
- On submit: inline replace form with "Goed bezig. Je hoort binnen één werkdag van ons." No redirect.
- Text link below CTA varies per tier (links to `/training`)

### 6. Tier 3 extras
- Benchmark callout: "Minder dan 20% van de Nederlandse teams scoort boven de 70% op deze scan."
- LinkedIn share button with pre-filled text including the percentage score

### 7. Results page layout (top to bottom)
1. Animated ring chart with percentage
2. Tier badge + heading + body
3. Dimension breakdown bars
4. Benchmark callout (tier 3 only)
5. CTA block (heading, body, form or confirmation)
6. Text link below CTA
7. LinkedIn share (tier 3 only)

## Files changed

| File | Change |
|------|--------|
| `src/pages/Quiz.tsx` | Full rewrite of tiers, phases, and result rendering |

No new files needed. No routing changes.

