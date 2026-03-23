
-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  naam text NOT NULL,
  organisatie text NOT NULL,
  functie text,
  email text NOT NULL,
  telefoon text,
  hulp text NOT NULL,
  aantal text,
  opmerkingen text,
  opgevolgd boolean DEFAULT false
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anon can insert
CREATE POLICY "Allow anonymous inserts" ON public.contact_submissions FOR INSERT TO anon WITH CHECK (true);
-- Authenticated can insert
CREATE POLICY "Allow authenticated inserts" ON public.contact_submissions FOR INSERT TO authenticated WITH CHECK (true);
-- Admin can select
CREATE POLICY "Admins can select" ON public.contact_submissions FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
-- Admin can update
CREATE POLICY "Admins can update" ON public.contact_submissions FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

GRANT INSERT ON public.contact_submissions TO anon;

-- Add opgevolgd column to masterclass_submissions
ALTER TABLE public.masterclass_submissions ADD COLUMN opgevolgd boolean DEFAULT false;

-- Admin can update masterclass_submissions
CREATE POLICY "Admins can update" ON public.masterclass_submissions FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
