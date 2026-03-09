

# Simplify Homepage: Reduce CTAs & Unified Pricing Card

## Problem
- Hero has 2 buttons + 3 badges + urgency banner with another link = too many CTAs stacked
- Products section shows 2 separate cards forcing a choice — adds friction

## Changes to `src/pages/Index.tsx`

### 1. Hero — Single Primary CTA
- Keep only **one** primary button: "Start direct" (links to `/training`)
- Remove the "Vraag offerte aan" button from hero (it lives in the final CTA already)
- Keep the 3 check badges but make them more subtle (smaller, lighter)

### 2. Products Section — Single Card with Toggle
Replace the two side-by-side cards with **one unified card** that has a toggle switch at the top:

```text
┌─────────────────────────────────────────────┐
│  [Online Training]  |  [+ Masterclass]      │  ← toggle/tabs
│─────────────────────────────────────────────│
│                                             │
│  €249,- per seat                            │
│  (or: "Vanaf €249,- per seat + Masterclass") │
│                                             │
│  ✓ Feature 1                                │
│  ✓ Feature 2                                │
│  ✓ Feature 3  (Masterclass features appear  │
│  ✓ Feature 4   when toggled on)             │
│                                             │
│  [ Vraag een offerte aan ]                  │  ← single CTA
└─────────────────────────────────────────────┘
```

- Use React state to toggle between "Online Training" and "Training + Masterclass"
- When "Training + Masterclass" is selected: show combined features, price becomes "Vanaf €249,- per seat + Masterclass op aanvraag", add Masterclass-specific features to the list
- Single CTA button at the bottom: "Vraag een offerte aan" → `/contact`
- Neon border on the card, clean and focused

### 3. Final CTA — Keep as-is
The bottom CTA section stays (it's the right place for it), but it's no longer competing with a hero CTA for the same action.

### 4. Quiz CTA — Keep as-is
This is a different action (quiz) so it doesn't add friction to the buying flow.

## Files to Edit
1. `src/pages/Index.tsx` — All changes above

