

## Fix broken internal links in kenniscentrum articles

### Problem
8 links inside article content (stored in the database) are missing the `/kenniscentrum/` prefix. These were scraped before the link-rewriting logic was added to the scraper. The scraper now handles this correctly for future imports, but existing stored content still has the wrong paths.

### Solution: Two-pronged fix

**1. Database content fix (SQL migration)**
Run a SQL update to find-and-replace the 8 broken link paths in the `articles.content` column:

- `](/eu-ai-act-uitgelegd)` → `](/kenniscentrum/eu-ai-act-uitgelegd)`
- `](/hoe-herken-je-ai-bias)` → `](/kenniscentrum/hoe-herken-je-ai-bias)`
- `](/llms-generatieve-ai-geletterdheid)` → `](/kenniscentrum/llms-generatieve-ai-geletterdheid)`
- `](/wat-is-ai-geletterdheid)` → `](/kenniscentrum/wat-is-ai-geletterdheid)`
- `](/wat-zijn-high-risk-ai-systemen)` → `](/kenniscentrum/wat-zijn-high-risk-ai-systemen)`
- `](/welke-ai-systemen-zijn-verboden)` → `](/kenniscentrum/welke-ai-systemen-zijn-verboden)`
- `](/ai-geletterdheid-training)` → `](/training)`
- `](/masterclass-voor-leidinggevenden)` → `](/masterclass)`

**2. Catch-all redirects in App.tsx (safety net)**
Add `<Route>` redirects for these 8 slugs so that even if someone has a bookmarked broken URL, they land on the right page. This also protects against any other articles with the same broken pattern.

### Files changed
- **SQL migration**: `UPDATE articles SET content = REPLACE(...)` for each broken path
- **src/App.tsx**: Add 8 redirect routes before the `*` catch-all

