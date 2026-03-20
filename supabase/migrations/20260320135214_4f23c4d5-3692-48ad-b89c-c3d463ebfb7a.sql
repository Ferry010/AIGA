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
CREATE POLICY "Allow authenticated select" ON public.masterclass_submissions FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));