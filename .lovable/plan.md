

## Re-enable lead capture + sitemap update

### 1. Lead capture gate on landing pages

Both `ChecklistLanding.tsx` and `BeleidstemplateLanding.tsx` currently link directly to the `/document` route. Re-enable the `DownloadLeadDialog` component on both:

- Import `DownloadLeadDialog` and `useState`, `useNavigate`
- Replace the direct `<Link>` button with an `onClick` that opens the dialog
- On success: navigate to the `/document` route
- The dialog collects voornaam + email, inserts into `download_leads`, fires transactional email with document copy, then lets user proceed to document

### 2. Downloads hub page

Update `Downloads.tsx`: change the card hrefs from `/document` URLs to the landing page URLs (which now have the gate). The landing pages are the proper entry point.

### 3. Sitemap update

Add missing URLs to `public/sitemap.xml` and set lastmod to `2026-03-27` for all changed pages:

Missing URLs to add:
- `/tools` 
- `/tools/downloads`
- `/tools/downloads/ai-act-compliance-checklist`
- `/tools/downloads/ai-beleid-opstellen`
- `/tools/boetecalculator`
- `/tools/ai-risicoscan`
- `/ai-use-case-checker`
- `/ai-act-deadlines`
- `/ai-tools-onder-de-ai-act`
- `/kenniscentrum/eu-ai-act-boetes-maximale-bedragen` (if article exists)

Update lastmod to `2026-03-27` on all existing entries that were modified.

### 4. Google Search Console

This requires manual action outside Lovable. After publishing, the user needs to:
- Go to Google Search Console → Sitemaps → resubmit `sitemap.xml`
- URL Inspection for priority pages: `/`, `/training`, `/tools/downloads/ai-act-compliance-checklist`, `/tools/downloads/ai-beleid-opstellen`, `/ai-act-deadlines`

I'll note this in the response after implementation.

### Files to change

| File | Change |
|---|---|
| `src/pages/ChecklistLanding.tsx` | Add DownloadLeadDialog, gate the download button |
| `src/pages/BeleidstemplateLanding.tsx` | Same |
| `src/pages/Downloads.tsx` | Point cards to landing pages instead of /document |
| `public/sitemap.xml` | Add missing URLs, update lastmod dates |

