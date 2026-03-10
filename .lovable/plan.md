

# Update Typography to Match Reference

The reference screenshot uses an elegant **serif** font for headlines (thin, classical serifs) and italic body text for subtitles — quite different from the current bold geometric `Syne` sans-serif.

## Font Change

- **Headlines**: Switch from `Syne` (bold geometric sans) to **`Instrument Serif`** (elegant, thin serifs matching the reference aesthetic)
- **Body**: Keep `DM Sans` as-is — it's clean and matches the reference body text
- **Mono**: Keep `DM Mono` for stats/numbers

## Files to Edit

1. **`index.html`** — Update Google Fonts link to load `Instrument Serif` instead of `Syne`
2. **`tailwind.config.ts`** — Update `fontFamily.display` to `["Instrument Serif", "serif"]`
3. **`src/index.css`** — Adjust base font-weight for headings if needed (Instrument Serif looks best at 400, not 700+)

## Visual Result

Headlines shift from chunky/geometric to refined/editorial serif — matching the elegant feel of the reference while keeping the neon accent system intact.

