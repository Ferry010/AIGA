

## Plan: Simplified Download Form + Dual Delivery (Direct Open + Email)

### Overview
Simplify the download form to just voornaam + email, open the document immediately on submit, and send a copy via email. This requires setting up email infrastructure first.

### Problem: No Email Domain Configured
The project has no email domain set up yet. Email delivery requires configuring a sender domain first. This is the first step before we can scaffold the transactional email system.

### Database Migration
The `download_leads` table currently requires `achternaam` (NOT NULL) and `organisatie` (NOT NULL). We need to make these columns nullable since the form will no longer collect them.

```sql
ALTER TABLE public.download_leads ALTER COLUMN achternaam DROP NOT NULL;
ALTER TABLE public.download_leads ALTER COLUMN organisatie DROP NOT NULL;
```

### Changes

#### 1. Simplify DownloadLeadDialog (`src/components/DownloadLeadDialog.tsx`)
- Remove achternaam, organisatie, functie fields and newsletter checkbox
- Keep only: voornaam (required) + email (required)
- On submit: save lead to DB, fire email via edge function, then immediately call `onSuccess` (which opens the document)
- Update success message: "Het document is naar je inbox gestuurd. Je kunt het hieronder ook direct bekijken."
- Insert sends only `voornaam`, `email`, `document` (other fields null)

#### 2. Set Up Email Domain
Present the email domain setup dialog so the user can configure a sender domain. This is required before emails can be sent.

#### 3. Set Up Email Infrastructure + Scaffold Transactional Email
After domain is configured:
- Call `setup_email_infra` to create queue infrastructure
- Call `scaffold_transactional_email` to create the send edge function
- Create a `document-download` email template in `_shared/transactional-email-templates/`

#### 4. Create Email Template (`document-download.tsx`)
A branded Dutch email with:
- Subject: "Je {document name} van AIGA Academy"
- Greeting using voornaam
- Brief message explaining what they downloaded
- CTA button linking to the document page
- AIGA branding (teal primary color from CSS vars)
- Contact details in email footer area

#### 5. Wire Up Email Trigger in DownloadLeadDialog
After successful DB insert, invoke `send-transactional-email` with:
- `templateName: 'document-download'`
- `recipientEmail: email`
- `idempotencyKey: download-doc-${leadId}`
- `templateData: { voornaam, documentType, documentUrl }`

#### 6. Add Contact Details to PDF Pages
Update `ComplianceChecklist.tsx` and `AiBeleidstemplate.tsx` to include a footer on printed pages with:
- Website: aigeletterdheid.academy
- E-mail: info@aigeletterdheid.academy
- Telefoon: +31 (0)10 316 7827

Use `@media print` or existing print styling to ensure it appears on every printed page.

### Files to Modify
- `src/components/DownloadLeadDialog.tsx` — simplify form + add email trigger
- `src/pages/ComplianceChecklist.tsx` — add contact footer for print
- `src/pages/AiBeleidstemplate.tsx` — add contact footer for print

### Files to Create (after email domain setup)
- `supabase/functions/_shared/transactional-email-templates/document-download.tsx`
- Update `registry.ts` with new template
- Unsubscribe page (path determined by scaffold tool)

### Execution Order
1. Database migration (make columns nullable)
2. Simplify the form component + add PDF contact footers
3. Set up email domain (requires user action)
4. Set up email infrastructure + scaffold + create template + deploy
5. Wire email trigger into the form submit handler

### Blocker: Email Domain Required
Before implementing email delivery, we need to set up a sender domain. I'll present the setup dialog after implementing the non-email changes (form simplification + PDF footers), then continue with the email setup once the domain is configured.

