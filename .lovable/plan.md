

## AI Use Case Checker → eigen pagina + card op /tools

### Wijzigingen

**1. Create `src/pages/UseCaseChecker.tsx`**
- Nieuwe pagina op `/ai-use-case-checker`
- SEO component met titel "AI Use Case Checker | Valt jouw AI-gebruik onder hoog risico? | AIGA"
- BreadcrumbNav: Home → Tools → AI Use Case Checker
- Korte hero/intro
- Render het bestaande `<AiUseCaseChecker />` component

**2. Edit `src/pages/Tools.tsx`**
- Verwijder `<AiUseCaseChecker />` inline render (regel 82)
- Verwijder import van `AiUseCaseChecker`
- Voeg een nieuwe card toe aan het `scans` array:
  - Title: "AI Use Case Checker"
  - Description: "Controleer per AI-tool en toepassing of jouw gebruik onder hoog risico valt volgens de EU AI Act. Selecteer een tool, kies je use case en zie direct het oordeel."
  - Icon: `ShieldCheck` of `Search` (passend lucide icoon)
  - href: `/ai-use-case-checker`
  - available: `true`

**3. Edit `src/App.tsx`**
- Import `UseCaseChecker` page
- Route toevoegen: `<Route path="/ai-use-case-checker" element={<UseCaseChecker />} />`

### Bestanden

| Actie | Bestand |
|-------|---------|
| Create | `src/pages/UseCaseChecker.tsx` |
| Edit | `src/pages/Tools.tsx` — verwijder inline checker, voeg card toe |
| Edit | `src/App.tsx` — nieuwe route |

