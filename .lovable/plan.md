

# Admin Portal for Kenniscentrum Articles

## Current State
Articles are hardcoded as a static array in `src/pages/Kenniscentrum.tsx` (17 articles with title, category, url, image). The admin dashboard at `/admin` only shows risk scan submissions.

## Plan

### 1. Database — Create `articles` table

```sql
CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  title text NOT NULL,
  category text NOT NULL,
  url text NOT NULL,
  image_url text NOT NULL,
  published boolean DEFAULT true,
  sort_order integer DEFAULT 0
);
```

RLS: anon SELECT (for public page), anon INSERT/UPDATE (admin is password-gated, no auth). Seed it with the 17 existing articles via migration.

### 2. Update Kenniscentrum page
- Fetch articles from database instead of hardcoded array
- Filter by `published = true`
- Order by `sort_order` then `created_at desc`

### 3. Expand Admin dashboard
Add a tabbed layout with two sections:
- **Submissions** tab — existing risk scan table (unchanged)
- **Artikelen** tab — article management

**Artikelen tab features:**
- Table listing all articles (title, category, published status, edit button)
- "Nieuw artikel" button opens an inline form
- Edit button opens same form pre-filled
- Form fields: Titel, Categorie (dropdown with existing categories), URL, Afbeelding URL, Gepubliceerd (toggle)
- Save writes to database, updates list immediately
- No delete — just unpublish via the toggle

### Files changed

| File | Change |
|------|--------|
| Migration | Create `articles` table + seed 17 existing articles |
| `src/pages/Admin.tsx` | Add tabs, article list, create/edit form |
| `src/pages/Kenniscentrum.tsx` | Fetch from database instead of hardcoded array |

