

## Blog enhancements: auto-slug, SEO keywords, custom H1

### Current state
- Slug is already auto-generated from title via `generateSlug()` but can be manually overridden
- The H1 on the article page uses `article.title` (except for two hardcoded overrides for "wat-is-ai-geletterdheid" and "eu-ai-act-boetes")
- No SEO keywords/search terms field exists in the database or admin form
- The JSON-LD `keywords` field is only hardcoded for "wat-is-ai-geletterdheid"

### Changes

#### 1. Database migration
Add two columns to `articles`:
```sql
ALTER TABLE public.articles
  ADD COLUMN seo_keywords text,
  ADD COLUMN h1_override text;
```
- `seo_keywords`: comma-separated search terms for meta keywords tag and JSON-LD
- `h1_override`: optional custom H1; if empty, `title` is used as H1

#### 2. Admin form (`Admin.tsx`)
- **Auto-slug**: When the title changes and slug is empty (new article), auto-fill the slug field in real-time. User can still edit it manually.
- **SEO keywords field**: New textarea labeled "Zoektermen (SEO)" with placeholder "bijv. AI Act, AI-geletterdheid, compliance" — stored as comma-separated text.
- **H1 override field**: New input labeled "H1 (optioneel)" with placeholder "Standaard: titel wordt als H1 gebruikt". If left empty, the article title is shown as H1.

#### 3. ArticleDetail.tsx
- Use `article.h1_override || article.title` for the `<h1>` element
- Parse `article.seo_keywords` into an array and include as `<meta name="keywords">` in the SEO component
- Add keywords to the JSON-LD `keywords` field for all articles (not just the two hardcoded ones)

#### 4. SEO component
- Add optional `keywords?: string` prop to `SEOProps`
- Render `<meta name="keywords" content={keywords} />` when provided

### Files changed

| File | Change |
|---|---|
| SQL migration | Add `seo_keywords`, `h1_override` columns |
| `src/pages/Admin.tsx` | Auto-fill slug from title, add keywords + H1 fields |
| `src/pages/ArticleDetail.tsx` | Use h1_override, pass keywords to SEO |
| `src/components/SEO.tsx` | Add optional keywords meta tag |

