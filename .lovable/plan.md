

## Plan: Download Landing Pages + Form Submit Fix

### Problem Summary
1. **Tools page links**: Both download cards on `/tools` link to `/tools/downloads` instead of individual pages
2. **Form POST not firing**: The Supabase insert in `Downloads.tsx` may silently fail — need to verify RLS and add proper error logging
3. **No dedicated landing pages**: The existing `/tools/downloads/ai-act-compliance-checklist` and `/tools/downloads/ai-beleid-template` routes exist but render the document content directly — they lack SEO landing page structure with hero, intro copy, and email-gate CTA

### Changes

#### 1. Fix download card links on `/tools` (Tools.tsx)
Update the `downloads` array hrefs:
- Checklist: `/tools/downloads` → `/tools/downloads/ai-act-compliance-checklist`
- Template: `/tools/downloads` → `/tools/downloads/ai-beleid-opstellen`

#### 2. Create dedicated landing page: `/tools/downloads/ai-act-compliance-checklist` (new wrapper page)
Create `src/pages/ChecklistLanding.tsx` — a SEO-rich landing page that:
- SEO: title "AI Act Compliance Checklist — Gratis Download voor Deployers | AIGA", meta description, canonical URL
- Breadcrumb: Home → Tools → Downloads → AI Act Compliance Checklist
- H1 + 2-3 paragraphs explaining the checklist (what it covers, who it's for, EU AI Act deadlines)
- Value proposition bullet list (10 secties, Artikel 4/26 coverage, print-ready)
- Download CTA button that opens the email-gate dialog (reuse the same lead-capture modal from Downloads.tsx)
- After successful submit, navigate to existing `ComplianceChecklist` component to view the document
- Related tools section at the bottom

#### 3. Create dedicated landing page: `/tools/downloads/ai-beleid-opstellen` (new page)
Create `src/pages/BeleidstemplateLanding.tsx` — same structure:
- SEO: title "AI Beleid Opstellen — Gratis Template voor EU AI Act Compliance | AIGA"
- Breadcrumb: Home → Tools → Downloads → AI-beleid opstellen
- H1 + intro copy about why every organization needs an AI policy under the AI Act
- Value proposition bullets (invulbare secties, governance-structuur, risicoclassificatie)
- Email-gate CTA → after submit navigates to existing `AiBeleidstemplate` page
- Related tools section

#### 4. Extract shared lead-capture dialog into reusable component
Create `src/components/DownloadLeadDialog.tsx` — extract the dialog + form from Downloads.tsx into a shared component that accepts:
- `document` type (checklist/template)
- `onSuccess` callback (to navigate to the right page)
- `open`/`onOpenChange` props

This avoids duplicating the form logic across 3 pages.

#### 5. Fix the POST not firing (DownloadLeadDialog component)
- Add `.select()` after `.insert()` to ensure the POST actually fires (Supabase JS client sometimes optimizes away requests without `.select()`)
- Add explicit error logging with `console.error`
- Verify RLS: the `download_leads` table already has `Allow anonymous inserts` policy with `WITH CHECK (true)` for `anon` role — this looks correct
- Check if `GRANT INSERT ON download_leads TO anon` is needed (based on project memory, this pattern is required)

#### 6. Update routing (App.tsx)
- Add route for `/tools/downloads/ai-beleid-opstellen` → `BeleidstemplateLanding`
- Change `/tools/downloads/ai-act-compliance-checklist` → `ChecklistLanding` (the actual checklist document moves to a sub-route or is embedded)
- Keep `/tools/downloads/ai-beleid-template` as redirect to new URL

#### 7. Database: Grant INSERT to anon
Run migration: `GRANT INSERT ON public.download_leads TO anon;` — based on project patterns, explicit GRANT is required alongside RLS policies.

### Files to create
- `src/components/DownloadLeadDialog.tsx`
- `src/pages/ChecklistLanding.tsx`
- `src/pages/BeleidstemplateLanding.tsx`

### Files to modify
- `src/pages/Tools.tsx` — update download hrefs
- `src/pages/Downloads.tsx` — use shared dialog component
- `src/App.tsx` — add new routes, add redirect for old template URL

### Database
- Migration: `GRANT INSERT ON public.download_leads TO anon;`

