

## Add Pricing & Product Info to Training and Masterclass Pages

### Current state
- **Homepage** has detailed pricing cards (€249/seat training, €495/seat masterclass) with feature lists and a comparison table
- **Training page** only mentions "Kosten: 249,- (ex BTW) per deelnemer" as a bullet point, no proper pricing section, no tier info, no volume incentive
- **Masterclass page** has "Prijs op aanvraag" and "Gratis bij 50+ seats" as small badges in the hero, but no dedicated pricing section with the €495 price or details

### Changes

#### 1. Training page (`src/pages/Training.tsx`) — Add pricing section
Insert a dedicated pricing section between "Waarom bij ons" and the FAQ. Include:
- A pricing card showing **€249,- per deelnemer (ex BTW)**
- Volume tiers as context: "Vanaf 50 seats: gratis Masterclass voor management inbegrepen"
- Feature checklist: selfpaced, certificaat, voortgangsdashboard, adaptief examen, onbeperkt herkansen
- "Wat is inbegrepen" list
- CTA button linking to the contact form below
- Price anchoring line: "Minder dan één dag klassikale training, en meteen compliant."

#### 2. Training page — Add "Hoe het werkt" steps section
Insert a 3-step process section (similar to homepage) before pricing:
- 01: Meld je team aan
- 02: Medewerkers volgen de training zelfstandig
- 03: Ontvang de certificaten

#### 3. Masterclass page (`src/pages/Masterclass.tsx`) — Add pricing section
Insert a pricing section replacing the current bare "Aanmelden als team" card (lines 153-171). Include:
- Price: **€495,- per deelnemer (ex BTW)**, minimum 5 deelnemers
- Highlight: "Gratis bij 50+ online training seats"
- What's included: 2 uur live sessie, AI Literacy Leader bewijs, op locatie of online, live Q&A
- CTA to the form below

#### 4. Masterclass page — Add cross-sell to Training
After the pricing section, add a small cross-reference: "Zoek je een training voor alle medewerkers? Bekijk de online training." linking to `/training`.

### Files to edit
1. `src/pages/Training.tsx` — add pricing section + "hoe het werkt" section
2. `src/pages/Masterclass.tsx` — replace/enhance pricing card section + add cross-sell

