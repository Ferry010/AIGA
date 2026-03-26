

## Plan: Downloads page with lead capture and two document pages

### Overview
Three new pages + one DB table + updates to Tools page and router. Lead capture form saves to a new `download_leads` table before showing the document.

### Database migration
New table `download_leads`:
```sql
create table public.download_leads (
  id uuid primary key default gen_random_uuid(),
  voornaam text not null,
  achternaam text not null,
  email text not null,
  organisatie text not null,
  functie text,
  document text not null,
  newsletter_optin boolean default true,
  created_at timestamptz default now()
);
alter table public.download_leads enable row level security;
create policy "Allow anonymous inserts" on public.download_leads for insert to anon with check (true);
```

### New files

**`src/pages/Downloads.tsx`** — Landing page at `/tools/downloads`
- Hero with SectionLabel "GRATIS DOWNLOADS", heading with teal accent, subtext
- Two side-by-side cards (Compliance Checklist + AI-beleid template) with icons, descriptions, "PDF · Gratis · Bijgewerkt 2025" badge, gradient CTA button
- Clicking a button opens a Dialog modal with lead-capture form (voornaam, achternaam, email, organisatie, functie dropdown, newsletter checkbox pre-checked+disabled)
- On submit: insert into `download_leads`, show thank-you message with "Klik hier om direct te bekijken" link navigating to the document page
- Uses existing components: SectionLabel, BreadcrumbNav, SEO, Card, Button, Dialog, Input, Label, Select

**`src/pages/ComplianceChecklist.tsx`** — Document at `/tools/downloads/ai-act-compliance-checklist`
- A4-proportioned print-ready layout (max-w-[210mm], white bg, print CSS)
- "Print / Opslaan als PDF" button top-right (calls `window.print()`)
- Full checklist content as specified: header block, introductie, leeswijzer legend (colored dots), 10 sections with checkbox items, each prefixed with colored emoji indicators (red/yellow/green), deadline badges, toelichting blocks, Bijlage III summary list, timeline section, footer watermark
- BreadcrumbNav + SEO + no lead gate on direct visit (document is public, gate is on the downloads hub)

**`src/pages/AiBeleidstemplate.tsx`** — Document at `/tools/downloads/ai-beleid-template`
- Same A4 print-ready layout
- Template content with `[HAAKJES]` placeholders styled distinctly (e.g. highlighted background)
- All 9 sections as specified, tables rendered as HTML tables with placeholder cells
- Print button, footer watermark, BreadcrumbNav

### Modified files

| File | Change |
|------|--------|
| `src/App.tsx` | Import + 3 new routes: `/tools/downloads`, `/tools/downloads/ai-act-compliance-checklist`, `/tools/downloads/ai-beleid-template` |
| `src/pages/Tools.tsx` | Update `downloads` array: set `available: true`, add `href: "/tools/downloads"` to both items. Render them as clickable Links like the scans section |

### Technical details
- Lead form uses `supabase.from("download_leads").insert(...)` directly (anon insert policy)
- Form validation with required fields, email format check via HTML5 `type="email"`
- Dialog component from shadcn/ui for the modal
- Print styles via `@media print` hiding nav, footer, buttons
- Document pages hide Navbar/Footer print-only via CSS, not routing logic
- Placeholder fields in template styled with `bg-primary/10 px-1 rounded font-mono text-sm`

