

## Plan: Create `/kenniscentrum/ai-begrippen` glossary page

### New file: `src/pages/AiBegrippen.tsx`

A standalone page following the same patterns as `AiActDeadlines.tsx` (BreadcrumbNav, SEO, AnimatedSection, CTA block with `btn-neon`).

**Structure:**

1. **SEO + JSON-LD**: SEO component with title/description/canonical. FAQPage JSON-LD with all 20 terms mapped as Question (term) / Answer (explanation).

2. **Breadcrumb**: Home > Kenniscentrum > AI Begrippen

3. **Hero section**: H1 "AI Begrippen uitgelegd", subtitle paragraph. No CTA button.

4. **Sticky search bar**: A simple `position: sticky` input field below the hero that filters the glossary cards client-side using `useState` + `.filter()`. Sticks to top on scroll with `top-16` (below navbar).

5. **Glossary cards grid**: Two columns on desktop (`md:grid-cols-2`), one on mobile. Each card is a `bg-card border border-border rounded-2xl` with:
   - H3 term (bold, `text-primary`)
   - Paragraph explanation (visible, no accordion/hidden content)
   - Conditional internal links for specific terms (AI impact assessment → link, EU AI Act → link, Artikel 4 → link)

6. **CTA section**: Dark card with two buttons:
   - Primary (`btn-neon`): "Doe de gratis AI Gereedheidscan" → `/gereedheidscan`
   - Secondary (outline): "Bekijk onze trainingen" → `/training`

**Data**: All 20 terms stored as a const array at the top of the file with `term` and `description` fields, plus optional `link` for internal linking.

### Edit: `src/App.tsx`

- Import `AiBegrippen` from `@/pages/AiBegrippen`
- Add route: `<Route path="/kenniscentrum/ai-begrippen" element={<AiBegrippen />} />` (before the `/kenniscentrum/:slug` catch-all route)

### Files affected
- `src/pages/AiBegrippen.tsx` (new)
- `src/App.tsx` (add import + route)

