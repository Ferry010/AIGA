

## SEO-verbeteringen: 6 werkpakketten

Dit is een omvangrijk verzoek met 6 deeltaken. Hieronder het volledige plan.

---

### 1. Interne links `/ai-geletterdheid-training` → `/training`

**Database**: SQL UPDATE om resterende `](/ai-geletterdheid-training)` links in `articles.content` te vervangen door `](/training)`. (Dit is al eerder gedaan, maar we verifiëren en herhalen voor zekerheid.)

**Code**: De redirect in `App.tsx` bestaat al. Geen codewijziging nodig.

---

### 2. FAQ-secties op download-landingspagina's

**`ChecklistLanding.tsx`**: FAQ-array toevoegen (5 vragen over checklist), FAQ-accordion renderen boven de related tools sectie, FAQPage JSON-LD doorgeven via SEO component.

**`BeleidstemplateLanding.tsx`**: FAQ-array toevoegen (5 vragen over AI-beleid), zelfde patroon. Alle tekst exact zoals opgegeven door de gebruiker.

Beide pagina's: em-dashes in bestaande tekst vervangen door komma's/dubbele punten (conform huisstijl).

---

### 3. CTA-blokken in kenniscentrum-artikelen

Aanpak: In `ArticleDetail.tsx` een mapping toevoegen van slug → CTA-configuratie (href, tekst). Na de article content en vóór de author bio wordt een CTA-card gerenderd als het artikel in de mapping staat.

```text
Mapping:
ai-act-compliance-checklist-kleine-bedrijven → /tools/downloads/ai-act-compliance-checklist
documentatie-eisen-eu-ai-act → /tools/downloads/ai-act-compliance-checklist
eu-ai-act-uitgelegd → /gereedheidscan  (+  /ai-act-deadlines)
eu-ai-act-boetes-maximale-bedragen → /tools/boetecalculator
ai-geletterdheid-voor-leiders → /masterclass
wat-is-ai-geletterdheid → /training (al bestaand CTA, voegen extra link toe)
```

Stijl: hergebruik bestaande card/border patroon (bg-card, border, rounded-2xl), met gradient-knop.

---

### 4. Schema markup op tool-pagina's

**`Quiz.tsx`**: HowTo JSON-LD toevoegen ("Hoe doe ik de AI Gereedheidscan?" met 3 stappen) + FAQPage JSON-LD (4 vragen). Beide via `<Helmet>` script tags.

**`UseCaseChecker.tsx`**: HowTo JSON-LD toevoegen ("Hoe check ik of mijn AI-gebruik hoog risico is?" met 3 stappen). Via SEO component `jsonLd` prop.

---

### 5. Zichtbare "Bijgewerkt op" datum in artikelen

In `ArticleDetail.tsx`:
- Toon "Bijgewerkt: [maand jaar]" in de meta-row onder de titel, voor alle artikelen (niet alleen `wat-is-ai-geletterdheid`).
- Gebruik `modifiedDate` die al bestaat ("2026-03-13"). Formatteer als "maart 2026".
- De `dateModified` in Article JSON-LD gebruikt al `modifiedDate`, dus die is al correct.

---

### 6. Nieuwe pagina `/ai-act-deadlines`

**Nieuw bestand `src/pages/AiActDeadlines.tsx`**:
- SEO title, H1, intro, tijdlijn/tabel met 4 deadlines, uitleg-sectie, FAQ-accordion met FAQPage JSON-LD (4 vragen), CTA naar `/gereedheidscan`.
- Breadcrumb: Home > Kenniscentrum > AI Act Deadlines.
- Visuele tijdlijn met verticale lijn en milestone-dots (Tailwind, geen library).

**`App.tsx`**: Route toevoegen, lazy import.

**`Footer.tsx`**: Link toevoegen in "Meer informatie" sectie.

**`ArticleDetail.tsx`**: Interne link vanuit `eu-ai-act-uitgelegd` naar `/ai-act-deadlines` (toevoegen aan de CTA-mapping uit punt 3).

---

### Bestanden die wijzigen

| Bestand | Wijziging |
|---|---|
| `src/pages/ChecklistLanding.tsx` | FAQ-sectie + JSON-LD |
| `src/pages/BeleidstemplateLanding.tsx` | FAQ-sectie + JSON-LD |
| `src/pages/ArticleDetail.tsx` | CTA-mapping, zichtbare bijgewerkt-datum |
| `src/pages/Quiz.tsx` | HowTo + FAQPage JSON-LD |
| `src/pages/UseCaseChecker.tsx` | HowTo JSON-LD |
| `src/pages/AiActDeadlines.tsx` | **Nieuw** |
| `src/App.tsx` | Route voor `/ai-act-deadlines` |
| `src/components/Footer.tsx` | Link naar `/ai-act-deadlines` |
| SQL migration | Verify/fix `ai-geletterdheid-training` links |

