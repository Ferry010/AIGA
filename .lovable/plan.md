

# Licentie & Gebruik pagina

## Wijzigingen

### 1. `src/pages/Licentie.tsx` (nieuw)
Statische pagina met de aangeleverde copy, gestyled met Tailwind `prose` classes en `<SEO>` component. Zelfde opzet als `Privacyverklaring.tsx`. Links naar contactformulier als interne `<Link>`.

### 2. `src/App.tsx`
Route toevoegen: `/licentie` → `<Licentie />`

### 3. `src/components/Footer.tsx` (regel 59)
`<span>` vervangen door `<Link to="/licentie">Licentie & Gebruik</Link>`

