

## Email template improvements + fix document sharing

### What changes

**1. Email template styling** (`document-download.tsx`)
- Reduce logo width from 160px to 100px
- Make copy more personal and warm (conversational Dutch, first-person from Ferry)
- Replace solid teal button with branded gradient button (teal #468C94 to pink #E0337A). Email clients have limited gradient support, so we use a solid teal fallback with `background` shorthand for clients that support `linear-gradient`, and a `background-color` fallback for those that don't.

**2. Sender name** (`send-transactional-email/index.ts`)
- Change `SITE_NAME` from `"aiganl"` to `"Ferry van AI Geletterdheid Academy"` so the From header reads `Ferry van AI Geletterdheid Academy <noreply@aigeletterdheid.academy>`

**3. Fix document sharing** (`ShareDocumentButton.tsx`)
- The share button calls `send-transactional-email` which requires a valid JWT (verify_jwt = true in config.toml). Anonymous visitors have no auth session, so the function invocation fails silently.
- Fix: change the function call to include the anon key header explicitly, or switch `send-transactional-email` to verify_jwt = false and validate auth in code instead. The simpler approach: since anonymous inserts into `download_leads` already work via RLS, the issue is the Edge Function auth. We need to ensure the Supabase client sends the anon key. Actually, the default client already sends the anon key, which should satisfy verify_jwt = true. Let me re-check the error handling - the `.catch()` swallows errors silently. The real fix may be to surface the error properly and check edge function logs.

**Actually**, looking more carefully: the Supabase JS client does send the anon key by default, so `verify_jwt = true` should work fine for anonymous calls. The share feature *should* work. The user says "forwarding the PDF doesn't work yet" - this might mean the email arrives but the link in the email doesn't actually serve a downloadable PDF. The document URLs point to `/tools/downloads/.../document` which are web pages, not actual PDF files. The "forwarding" is the share button which sends an email with a link to view the document online.

Let me re-read the user's message: "Forwarding the PDF doesn't work yet". This could mean the Share button flow itself fails, or the email doesn't arrive, or the link in the email is broken.

Given we deactivated the lead capture earlier, the share button still tries to insert into `download_leads` and send an email. Since the emails are deactivated conceptually by the user ("Let's deactivate the branded email part for now"), the share button should probably also be deactivated or simplified.

**Decision**: Since the user said to deactivate branded emails for now, the ShareDocumentButton and SendCopyForm should be removed from the document pages. The "Deel dit document" button currently tries to send an email which the user wants deactivated. Replace with a simple "copy link" button so users can share the document URL directly.

### Files to change

1. **`supabase/functions/_shared/transactional-email-templates/document-download.tsx`**
   - Logo width 160 → 100
   - More personal copy from Ferry's perspective
   - Gradient button styling with solid fallback

2. **`supabase/functions/send-transactional-email/index.ts`**
   - Line 8: `SITE_NAME` = `"Ferry van AI Geletterdheid Academy"`

3. **`src/pages/ComplianceChecklist.tsx`** and **`src/pages/AiBeleidstemplate.tsx`**
   - Remove `ShareDocumentButton` import and usage
   - Add a simple "Kopieer link" (copy link) button instead

4. **Deploy** `send-transactional-email` edge function after changes

### Technical details

- Email gradient button: Use `background: linear-gradient(to right, #468C94, #E0337A)` with `backgroundColor: '#468C94'` as fallback. Most modern email clients support CSS gradients; Outlook falls back to solid teal.
- Sender display name change only affects the `from` field in the email envelope - no DNS or domain changes needed.
- The ShareDocumentButton component files can remain in the codebase (not deleted) but will be unused for now.

