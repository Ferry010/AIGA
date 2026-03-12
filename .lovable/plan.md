

# Revamp Product Pages & Homepage "Ons Aanbod" Section

## Overview
Rewrite both product pages (Training & Masterclass) with the exact content provided, and replace the homepage unified toggle card with two side-by-side product cards linking to their respective pages.

## Files to Edit

### 1. `src/pages/Training.tsx` — Full rewrite
Structure (matching provided content exactly):
- **Hero**: "AI-Geletterdheid training voor teams" / "Voldoe aan de AI Act. Train je team slim, snel en gecertificeerd."
- **Why section**: "Waarom AI-geletterdheid trainen nu essentieel is voor je team" with the provided paragraphs, including a link to `/masterclass` for the Masterclass mention
- **Key specs** as check items: Zelfstandig, Adaptief examen, Vanaf 10 deelnemers, Certificering, Kosten 249,- per deelnemer
- **What you learn**: "Concreet, begrijpelijk en direct toepasbaar" with 6 checkmark items
- **Trainer section**: Ferry Hoes bio with video placeholder (grey box) on one side, text on the other
- **Waarom bij ons**: 5 checkmark items
- **Contact form** at the bottom (reuse the same form pattern from current Contact page)

### 2. `src/pages/Masterclass.tsx` — Full rewrite
Structure (matching provided content exactly):
- **Hero**: "Masterclass: AI Geletterdheid voor leidinggevenden" / "Strategisch inzicht in de AI Act. Praktisch toepasbaar in jouw organisatie."
- **Why section**: with external link to digitaleoverheid.nl and link to `/training`
- **Key specs**: Duur ca. 2 uur, Locatie op kantoor, Min. 5 deelnemers, 495,- per deelnemer, Gratis bij 50+ training seats
- **What you take away**: "Innovatief en scherp" with 6 checkmark items
- **Trainer section**: Same Ferry Hoes block with video placeholder
- **Waarom bij ons**: Same 5 checkmark items
- **Contact form** at the bottom

### 3. `src/pages/Index.tsx` — Replace "Ons Aanbod" section (lines 182-274)
Remove the toggle card. Replace with two side-by-side cards:

```text
┌─────────────────────┐  ┌─────────────────────┐
│  ONLINE TRAINING    │  │  MASTERCLASS         │
│                     │  │                      │
│  Voor teams         │  │  Voor leidinggevenden │
│  249,- per seat     │  │  495,- per deelnemer  │
│  Vanaf 10 deeln.    │  │  Min. 5 deelnemers    │
│                     │  │                      │
│  ✓ Feature 1        │  │  ✓ Feature 1         │
│  ✓ Feature 2        │  │  ✓ Feature 2         │
│                     │  │                      │
│  [Bekijk training]  │  │  [Bekijk masterclass] │
└─────────────────────┘  └─────────────────────┘
```

- Left card: neon border (primary product), links to `/training`
- Right card: standard border with hover glow, links to `/masterclass`
- Remove the `useState` for `includeMasterclass` and `AnimatePresence` import (no longer needed)
- Remove the `trainingFeatures` / `masterclassFeatures` arrays at top of file

### Shared Contact Form Component
Both Training and Masterclass pages need a contact form. To avoid duplication, extract a `ContactForm` component from the existing Contact page pattern that can be reused. Fields: Naam, Organisatie, Functie, E-mail, Telefoon, Aantal deelnemers, Vragen/opmerkingen.

### 4. `src/components/ContactForm.tsx` — New shared component
Extract the form logic into a reusable component with a `product` prop to pre-fill which product the inquiry is about.

