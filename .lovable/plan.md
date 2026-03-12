

# Supabase Submission + Admin Dashboard for AI Risk Scan

## Overview

This project currently has no Supabase integration. We need to:
1. Enable Lovable Cloud (Supabase)
2. Create the `risk_scan_submissions` table
3. Wire up the Quiz form to save submissions
4. Build a password-protected `/admin` dashboard

## Step 1 — Enable Supabase & Create Table

Create migration for `risk_scan_submissions`:

```sql
CREATE TABLE public.risk_scan_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  naam text NOT NULL,
  email text NOT NULL,
  bedrijfsnaam text NOT NULL,
  totaal_score integer NOT NULL,
  tier text NOT NULL,
  dimensie_scores jsonb NOT NULL,
  opgevolgd boolean DEFAULT false
);

ALTER TABLE public.risk_scan_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public quiz, no auth)
CREATE POLICY "Allow anonymous inserts"
  ON public.risk_scan_submissions FOR INSERT
  TO anon WITH CHECK (true);

-- Allow anonymous select (for admin dashboard — password-gated in UI)
CREATE POLICY "Allow anonymous select"
  ON public.risk_scan_submissions FOR SELECT
  TO anon USING (true);

-- Allow anonymous update of opgevolgd field
CREATE POLICY "Allow anonymous update"
  ON public.risk_scan_submissions FOR UPDATE
  TO anon USING (true) WITH CHECK (true);
```

**Note on security**: The admin dashboard uses a client-side password gate. This is explicitly requested as a temporary measure — no full auth system. The RLS policies allow anon access since there's no auth. The `/admin` route is not linked anywhere publicly. For production hardening later, proper auth should replace this.

## Step 2 — Create Supabase Client

Create `src/integrations/supabase/client.ts` with the standard Lovable Supabase client setup.

## Step 3 — Update Quiz Form Submission

In `src/pages/Quiz.tsx`:
- Import supabase client
- Replace `console.log` in `handleFormSubmit` with a Supabase insert
- Compute `dimensie_scores` as a JSON object from the dimension breakdown
- Map tier badge to DB values: `"hoog_risico"` / `"gemengd"` / `"laag_risico"`
- On success: set `submitted = true` (existing behavior)
- On error: show inline error message with email fallback, preserve form data

## Step 4 — Build Admin Dashboard

Create `src/pages/Admin.tsx`:
- **Password gate**: Single input field, checks against hardcoded password (stored as a constant). Shows only the input until correct password entered. Session-only (useState).
- **Summary stats** at top: Total submissions, Nog op te volgen (opgevold=false count), Gemiddelde score
- **Table** with columns: Datum (DD-MM-YYYY), Naam, Bedrijfsnaam, E-mail (mailto link), Score (%), Tier (readable Dutch label), Opgevolgd (checkbox toggle)
- Checkbox toggle fires immediate Supabase update on the `opgevolgd` field
- All labels in Dutch

## Step 5 — Add Route

In `src/App.tsx`:
- Import Admin page
- Add `<Route path="/admin" element={<Admin />} />`
- Hide navbar/footer on `/admin` route (same pattern as quiz)

## Files Changed

| File | Change |
|------|--------|
| Migration | Create `risk_scan_submissions` table with RLS |
| `src/integrations/supabase/client.ts` | New — Supabase client |
| `src/pages/Quiz.tsx` | Wire form submit to Supabase insert |
| `src/pages/Admin.tsx` | New — password-gated admin dashboard |
| `src/App.tsx` | Add `/admin` route, hide nav/footer on admin |

