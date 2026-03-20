DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'risk_scan_submissions'
      AND policyname = 'Allow authenticated inserts'
  ) THEN
    CREATE POLICY "Allow authenticated inserts"
    ON public.risk_scan_submissions
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() IS NOT NULL);
  END IF;
END
$$;