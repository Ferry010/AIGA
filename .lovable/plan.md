

## AI Use Case Checker — inline tool op /tools

### Wat wordt gebouwd
Een nieuw component `AiUseCaseChecker` met een 3-staps inline flow (tool → use case → risico-oordeel), ingevoegd als eerste item in de "Scans & Calculators" sectie op de Tools pagina.

### Bestanden

| Actie | Bestand |
|-------|---------|
| Create | `src/components/AiUseCaseChecker.tsx` |
| Create | `src/data/useCaseData.ts` |
| Edit | `src/pages/Tools.tsx` — import checker, plaats boven het bestaande scan-grid |

### `src/data/useCaseData.ts`
- Use case definitie interface: `{ id, label, sector, icon }` — 21 use cases
- `toolUseCaseMap`: Record mapping tool name → array van use case IDs
- `highRiskUseCases`: set van use case IDs die altijd hoog risico zijn (cv-screening, recruitment-interview, performance, credit-scoring, insurance-pricing, legal-decisions, medical-triage, medical-imaging, critical-infra, benefits-decisions)
- `annexCategory`: Record mapping use case ID → Bijlage III tekst
- `outOfScopeTools`: `["Spotify / Netflix aanbevelingen"]`
- `alwaysHighRiskTools`: `["Microsoft Copilot Studio", "DataRobot", "Palantir AIP"]` — tools die bij elke hoog-risico use case sowieso triggeren

### `src/components/AiUseCaseChecker.tsx`
- State: `selectedTool`, `selectedUseCase`, `step` (1/2/3)
- **Stap 1**: Popover + Command component (bestaand uit project) als zoekbare dropdown, tools gegroepeerd per `AI_CATEGORIES` via `CommandGroup`. Import `aiTools` en `AI_CATEGORIES` uit `src/data/aiTools.ts`
- **Stap 2**: Grid van klikbare Card chips met icoon + label, gefilterd via `toolUseCaseMap[selectedTool]`. Responsive: 2-3 kolommen
- **Stap 3**: Uitkomstkaart met conditionele styling:
  - **Hoog risico**: `bg-destructive/10 border-destructive` — kop, Bijlage III categorie, 3 bullets, CTA link naar `/training`
  - **Beperkt risico**: `bg-yellow-500/10 border-yellow-500` — kop, 2 bullets, CTA
  - **Buiten scope**: `bg-green-500/10 border-green-500` — korte tekst
- "Opnieuw beginnen" knop reset state
- Intro tekst boven het blok in muted

### `src/pages/Tools.tsx` wijzigingen
- Import `AiUseCaseChecker`
- Plaats `<AiUseCaseChecker />` direct onder de `SectionLabel "SCANS & CALCULATORS"`, vóór het bestaande `StaggerContainer` grid
- Geen andere wijzigingen aan de pagina

### Iconen per use case
Gebruik lucide-react iconen: `Users`, `BarChart3`, `MessageSquare`, `CreditCard`, `Shield`, `Scale`, `HeartPulse`, `ScanLine`, `Building2`, `Palette`, `Headphones`, `AlertTriangle`, `Code`, `PieChart`, `FileText`, `Mic`, `Languages`, `Image`, `Share2`, `Landmark`

