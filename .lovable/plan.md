

# Align Content with PDF Spec v2

The uploaded PDF is the original detailed spec. Comparing it against the current site reveals several content discrepancies that need to be corrected. The design system (light + neon accents) stays as-is — this is purely a content alignment pass.

## Key Changes Per Page

### Homepage (`Index.tsx`)
- Hero sub-badges: change "Audit-proof certificaat | Vanaf 10 medewerkers" to "Per seat beschikbaar | Gratis Masterclass vanaf 50 seats | Direct starten"
- Hero body copy: align with PDF ("...een praktische online training en een digitaal certificaat dat telt bij een audit")
- Problem cards: update copy to match PDF exactly (e.g., "Geen bewijs bij een audit", "Geen tijd voor klassikale training")
- Solution section: update body text ("Geen gedoe. Geen planningshoofdbrekens. Gewoon geregeld.")
- Products section: update Online Training features to match PDF (e.g., "Per seat te boeken, geen minimumafname", remove "Vanaf 10 medewerkers", add "Gratis Masterclass voor management bij 50+ seats")
- Products: change "Vanaf 249,-" to "249,- per seat (ex BTW)"

### Training (`Training.tsx`)
- Pricing tiers: change to match PDF — Tier 1 (1 seat, 249,-), Tier 2 (2-49 seats), Tier 3 (50-99 seats, HIGHLIGHTED with "Gratis Masterclass" badge), Tier 4 (100+ Enterprise)
- Add FAQ Q4 answer: "Dan kan de deelnemer het examen herkansen..."
- Add missing FAQs from PDF (Q5-Q8)
- Update "Wat medewerkers leren" icons to match PDF (Brain, Wrench, AlertCircle, Shield, User, Bell)

### Masterclass (`Masterclass.tsx`)
- Add pricing info: "Minimaal 10 deelnemers. Prijs op aanvraag. Gratis inbegrepen bij 50+ seats."
- Add contact form at the bottom (Naam, Organisatie, Functie, Email, Telefoon, Open/Besloten sessie, Vragen)
- Add "Interesse? Laten we een datum prikken." section

### VoorOrganisaties (`VoorOrganisaties.tsx`)
- Update comparison table: "Minimaal" row should show "1 seat" for Training (not "10 seats")
- Update HR FAQs to match PDF content (7 questions vs current 4)
- Add "Gratis Masterclass voor management bij 50+ seats" prominently

### Contact (`Contact.tsx`)
- Add "Waarmee kan ik je helpen?" field (Online Training / Masterclass / Beide / Anders)
- Add 5th FAQ: "Wij zijn een overheidsorganisatie. Werkt dit ook voor ons?"
- Update existing FAQ about minimumafname: "Nee. Je kunt ook een enkele seat boeken."

### Quiz (`Quiz.tsx`)
- Change "3 minuten" to "Vijf minuten" in intro
- Minor copy alignment

### OverAiga (`OverAiga.tsx`)
- Update principles section title to "Wat ons onderscheidt" (matching PDF)

## Files to Edit

1. `src/pages/Index.tsx` — Content alignment
2. `src/pages/Training.tsx` — Pricing tiers restructure + FAQs
3. `src/pages/Masterclass.tsx` — Add pricing info + contact form
4. `src/pages/VoorOrganisaties.tsx` — FAQs + comparison table
5. `src/pages/Contact.tsx` — Add form field + FAQ
6. `src/pages/Quiz.tsx` — Minor copy fix
7. `src/pages/OverAiga.tsx` — Section title update

