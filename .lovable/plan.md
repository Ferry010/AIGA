

## Dead Buttons Fix

### Issues Found

1. **Masterclass `to="#aanmelden"` links are dead** (2 occurrences in `Masterclass.tsx`, lines 60 and 143)
   - React Router's `<Link to="#aanmelden">` doesn't scroll to the hash anchor. These buttons do nothing when clicked.
   - Fix: Replace with native `<a href="#aanmelden">` tags.

2. **Masterclass form submit does nothing** (`Masterclass.tsx`, line 28-31)
   - `handleSubmit` only does `console.log`. The user fills in the form, clicks "Verstuur aanvraag", and nothing happens. No data is saved, no confirmation is shown.
   - Fix: Save to database (create a `masterclass_submissions` table) and show confirmation, similar to the risk scan form.

3. **Remaining "5 Minuten" in Quiz SEO title** (`Quiz.tsx`, line 154)
   - The SEO `<title>` tag still says "5 Minuten" instead of "3 Minuten". This was missed in the earlier update.
   - Fix: Change to "3 Minuten".

4. **Remaining "vijf minuten" on homepage** (`Index.tsx`, line 187)
   - The risico-scan CTA section on the homepage still says "In vijf minuten weet je waar je staat."
   - Fix: Change to "drie minuten".

### Plan

#### 1. Fix hash links in Masterclass (no-code-change needed beyond HTML)
- Replace `<Link to="#aanmelden">` with `<a href="#aanmelden">` in two places in `Masterclass.tsx`

#### 2. Make Masterclass form functional
- Create a `masterclass_submissions` table via migration:
  ```sql
  CREATE TABLE public.masterclass_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    naam text NOT NULL,
    organisatie text NOT NULL,
    functie text,
    email text NOT NULL,
    telefoon text,
    sessie_type text NOT NULL,
    vragen text,
    created_at timestamptz DEFAULT now()
  );
  ALTER TABLE public.masterclass_submissions ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Allow anonymous inserts" ON public.masterclass_submissions FOR INSERT TO anon WITH CHECK (true);
  CREATE POLICY "Allow authenticated inserts" ON public.masterclass_submissions FOR INSERT TO authenticated WITH CHECK (true);
  CREATE POLICY "Allow authenticated select" ON public.masterclass_submissions FOR SELECT TO authenticated USING (true);
  GRANT INSERT ON public.masterclass_submissions TO anon, authenticated;
  GRANT SELECT ON public.masterclass_submissions TO authenticated;
  ```
- Update `Masterclass.tsx` to insert into the database and show success/error state (same pattern as Quiz form)

#### 3. Fix remaining duration text
- `Quiz.tsx` line 154: "5 Minuten" → "3 Minuten"
- `Index.tsx` line 187: "vijf minuten" → "drie minuten"

### Files to edit
- `src/pages/Masterclass.tsx` (hash links + form functionality)
- `src/pages/Quiz.tsx` (SEO title fix)
- `src/pages/Index.tsx` (duration text fix)
- New migration for `masterclass_submissions` table

