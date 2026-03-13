

# Fix duplicate copyright + Privacy page

## Changes

### 1. `src/components/Footer.tsx`
- Remove duplicate `<p>© 2026 AI Geletterdheid Academy</p>` (line 57)
- Change `Privacyverklaring` `<span>` to a React Router `<Link to="/privacyverklaring">`

### 2. `src/pages/Privacyverklaring.tsx` (new)
- Static page with the provided privacy policy copy, styled with Tailwind `prose` classes
- Include SEO via `<SEO>` component

### 3. `src/App.tsx`
- Add route `/privacyverklaring` → `<Privacyverklaring />`

