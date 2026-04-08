

## Plan: Fix deadline year + add FOMO urgency banner

### Changes

**File: `src/pages/Index.tsx`**

1. **Fix year**: Change "augustus 2025" to "augustus 2026" in the urgency banner (line 135)

2. **Add FOMO/urgency**: Replace the current simple amber banner with a more impactful version that includes:
   - A live **countdown timer** showing days remaining until 2 augustus 2026 (updates every hour)
   - Stronger copy emphasizing consequence and scarcity, e.g.: *"Nog X dagen tot volledige handhaving van de AI Act. Organisaties zonder gecertificeerde medewerkers riskeren boetes tot €35 miljoen."*
   - A subtle pulsing dot or warning icon to draw attention
   - A small inline CTA link ("Begin vandaag →") pointing to `/training`

### Technical Detail
- Countdown uses a simple `useState` + `useEffect` with `setInterval` calculating days between `new Date()` and `new Date('2026-08-02')`
- The banner keeps its current amber styling but gets slightly more visual weight with the countdown numbers displayed prominently

