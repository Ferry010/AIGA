

# Use Official Logo & Align Typography

## Logo Analysis
The AIGA logo is a bold geometric sans-serif with blue (#0000FF-ish) and black letterforms plus an orange dot above the "I". This is a custom/stylized logotype — not a standard font to apply site-wide.

## Plan

### 1. Add Logo Image to Navbar
- Copy `user-uploads://AIGA_transparent.png` to `src/assets/AIGA_transparent.png`
- In `Navbar.tsx`: replace the text-based `<span>AIGA</span>` with an `<img>` tag importing the logo asset (~32-36px height)
- Remove the "AI Geletterdheid Academy" subtitle text (the logo speaks for itself)

### 2. Update Headline Font to Match Logo's Geometric Style
The logo is bold geometric sans-serif — the current `Instrument Serif` headlines clash with this. Switch headlines to **Space Grotesk** (geometric sans-serif on Google Fonts that echoes the logo's sharp, modern feel).

- **`index.html`**: Replace `Instrument+Serif` with `Space+Grotesk:wght@400;500;600;700` in the Google Fonts link
- **`tailwind.config.ts`**: Change `fontFamily.display` to `["Space Grotesk", "sans-serif"]`
- **`src/index.css`**: Update `h1, h2, h3` to use `'Space Grotesk'` with `font-weight: 600` (bolder to match the logo's confident feel)

### Files to Edit
1. `src/assets/AIGA_transparent.png` — copy logo
2. `src/components/Navbar.tsx` — use logo image
3. `index.html` — swap Google Font
4. `tailwind.config.ts` — update font family
5. `src/index.css` — update heading styles

