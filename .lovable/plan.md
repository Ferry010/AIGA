

## Plan: Fix card layout overlap and restyle links

### Problem
The theme badge (absolute top-right) overlaps with the H3 title on smaller widths, and the internal links are plain text links that don't feel on-brand.

### Changes to `src/pages/AiBegrippen.tsx`

**1. Fix badge overlap — move badge below title row**

Instead of absolute-positioning the badge in the top-right corner, place it as the first element inside the card flow (not absolute). This gives it natural spacing.

- Remove `relative` from the article (no longer needed for badge positioning)
- Remove the absolute-positioned badge `<button>` block
- Add the badge as the first child inside the card, as a flex row with `justify-end` or just `mb-3`
- Remove `pr-32 sm:pr-48` from the title row since the badge no longer sits beside it

New card structure:
```text
<article class="bg-card border ... rounded-2xl p-6 sm:p-8 scroll-mt-36">
  <div class="flex items-start justify-between gap-3 mb-3">
    <div class="flex items-center gap-2">
      <h3>...</h3>
      <copy-link-icon />
    </div>
    <badge (clickable, shrink-0) />
  </div>
  <p>description</p>
  <Link button />
</article>
```

This puts badge and title on the same row with `justify-between`, badge won't wrap onto the title. The badge gets `shrink-0` and the title side is allowed to wrap naturally.

**2. Restyle internal links as on-brand text buttons**

Replace the plain `text-primary hover:underline` link with a styled inline-flex link that matches the site's neon/primary style:

```tsx
<Link
  to={b.link.href}
  className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
>
  {b.link.label}
  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
</Link>
```

Import `ArrowRight` from lucide-react (already likely available in the project).

### Files affected
- `src/pages/AiBegrippen.tsx` — card layout restructure + link restyle

