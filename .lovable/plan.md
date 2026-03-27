

## Article ordering + meta info

### Problem
1. Reordering requires manually typing sort_order numbers. Need up/down buttons that swap positions.
2. Article dates are hardcoded in a `SLUG_DATES` map in `ArticleDetail.tsx`. Need proper `published_date` column in the database, plus optional `read_time_minutes` override.

---

### 1. Database migration

Add two columns to `articles`:

```sql
ALTER TABLE public.articles
  ADD COLUMN published_date date DEFAULT CURRENT_DATE,
  ADD COLUMN read_time_minutes integer;
```

Then backfill `published_date` from the existing `SLUG_DATES` mapping via UPDATE statements for each slug.

### 2. Admin: up/down reorder buttons (`Admin.tsx`)

Replace the manual sort_order number input in the articles table with **ChevronUp / ChevronDown** buttons per row. Clicking swaps the `sort_order` of the clicked article with its neighbor, then updates both rows in the database and re-fetches.

Also add `published_date` and `read_time_minutes` fields to the article edit form.

### 3. ArticleDetail.tsx: use DB fields

- Remove the `SLUG_DATES` constant
- Fetch `published_date` and `read_time_minutes` from the article query
- Use `article.published_date` for `datePublished` in JSON-LD and display
- If `read_time_minutes` is set, use it instead of the calculated word-count estimate
- Keep `modifiedDate` using `updated_at` from the article

### 4. Kenniscentrum.tsx: show meta in cards

Add the published date and reading time below each article card (small text under author name).

---

### Files changed

| File | Change |
|---|---|
| SQL migration | Add `published_date`, `read_time_minutes` columns + backfill |
| `src/pages/Admin.tsx` | Up/down reorder buttons, new form fields |
| `src/pages/ArticleDetail.tsx` | Remove SLUG_DATES, use DB fields |
| `src/pages/Kenniscentrum.tsx` | Show date + read time on cards |

