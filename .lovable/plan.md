

## Remove Em Dashes ("—") From All Text

### Problem
Em dashes (`—`) appear throughout the site's Dutch copy in 15 files with 242 occurrences. These are a telltale sign of AI-generated text.

### Approach
Replace all `—` characters with natural Dutch alternatives depending on context:
- **Parenthetical clauses**: replace `—` with a comma, colon, or period
- **Lists/enumerations**: replace with a colon or period
- **Name separators** (e.g. "AIGA — AI Geletterdheid Academy"): replace with a pipe (`|`), dash (`-`), or remove entirely
- **Date lines** (e.g. "Laatste update: 13 maart 2026"): replace `—` with `-` or restructure

### Files to edit (15 files)
1. `src/components/SocialProof.tsx`
2. `src/components/TrainerSection.tsx`
3. `src/pages/Faq.tsx`
4. `src/pages/OverAiga.tsx`
5. `src/pages/Licentie.tsx`
6. `src/pages/Privacyverklaring.tsx`
7. `src/pages/Training.tsx`
8. `src/pages/AiGeletterdheidNederland.tsx`
9. `src/pages/AiActComplianceNederland.tsx`
10. `src/pages/AiCursusMedewerkers.tsx`
11. `src/pages/AiTrainingVoorBedrijven.tsx`
12. `src/pages/Index.tsx`
13. `src/pages/Quiz.tsx`
14. `src/pages/Kenniscentrum.tsx`
15. `src/pages/Masterclass.tsx`

### Replacement strategy
Each occurrence will be reviewed in context and replaced with the most natural Dutch punctuation (comma, period, colon, or hyphen). No meaning or content will be changed — only the punctuation character.

