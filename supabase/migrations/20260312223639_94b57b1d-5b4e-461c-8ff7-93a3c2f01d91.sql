
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

CREATE POLICY "Allow anonymous inserts"
  ON public.risk_scan_submissions FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous select"
  ON public.risk_scan_submissions FOR SELECT
  TO anon USING (true);

CREATE POLICY "Allow anonymous update"
  ON public.risk_scan_submissions FOR UPDATE
  TO anon USING (true) WITH CHECK (true);
