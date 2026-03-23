

## Plan: More breathing room and stacked blocks on mobile

### Changes in `src/pages/EuAiActA4.tsx`

**1. Increase spacing between content blocks on mobile**
- Change all `mb-3` section dividers to `mb-5 md:mb-3` — adds vertical breathing room on mobile while keeping the compact A4 layout on desktop.

**2. Stack timeline items vertically on mobile**
- Change timeline grid from `grid-cols-2 md:grid-cols-4` to `grid-cols-1 md:grid-cols-4`
- Each timeline item becomes a horizontal row (dot + text) on mobile, stacked vertically

**3. Stack "Hoog risico" columns on mobile**
- Change from `grid-cols-2` to `grid-cols-1 md:grid-cols-2` so the providers/deployers lists stack on mobile with more room

**4. Add padding/spacing tweaks**
- Increase mobile padding on the document container from `p-5` to `p-6`
- Add `gap-4 md:gap-3` on the timeline for more vertical space between items on mobile

No database changes.

