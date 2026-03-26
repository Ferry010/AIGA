

## Plan: "Meest gebruikt" section + positive outcome messaging

### Changes

**1. `src/pages/AiRisicoscan.tsx`** — Two changes:

**A. Add "Meest gebruikt" section above category grid (selection phase)**
- Define a constant array of the 10 most-used tool names in the specified order
- Before the `AI_CATEGORIES.filter(...)` loop, render a new section with header "🔥 Meest gebruikt in Nederlandse organisaties"
- Show those 10 tools as cards (same card component/style as category cards)
- In the category sections below, filter out any tool whose name is already in the "meest gebruikt" list — deduplication
- The "Meest gebruikt" section should only show when `activeCategory === "Alle"` and search is empty (or tools match search), so filtering/search still works naturally

**B. Positive messaging for low/no risk results (results phase)**
- When `overallVerdict === "LAAG"`: change `verdictText` to a congratulatory message ("Goed bezig! ...") instead of pushing training
- In Section D (CTA): when verdict is LAAG, replace the training-push CTA with a compliment card ("Goed voorbereid! Jouw organisatie heeft een laag risicoprofiel...") and softer secondary links
- Keep training/offerte CTAs only for GEMIDDELD and HOOG verdicts

**2. `src/pages/Boetecalculator.tsx`** — Positive messaging for zero/low risk:
- When `results.isZeroRisk === true`: replace the CTA card heading/body with congratulatory text ("Goed bezig! Je organisatie loopt geen direct boeterisico.") and remove the training push. Show a softer "Blijf op de hoogte" or link to gereedheidscan instead
- When `results.riskLevel === "LAAG"`: similar softer messaging

**3. `src/components/AiUseCaseChecker.tsx`** — Positive messaging for limited/out-of-scope:
- The "out-of-scope" result already has neutral messaging — keep as is
- The "limited" outcome currently pushes training — replace CTA with a compliment ("Goed nieuws! Dit gebruik valt onder beperkt risico.") and softer link to training as optional rather than primary CTA

### Technical details
- "Meest gebruikt" list: `["ChatGPT (Free/Pro)", "Microsoft Copilot (M365)", "Google Gemini", "Claude (Anthropic)", "GitHub Copilot", "Grammarly AI", "DeepL", "HubSpot AI", "Fireflies.ai", "LinkedIn Talent AI"]`
- Dedup logic: in the category loop, filter with `.filter(t => !POPULAR_TOOLS.includes(t.name))`
- No new dependencies needed

