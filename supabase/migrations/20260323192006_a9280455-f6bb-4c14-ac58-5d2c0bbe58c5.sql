INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true);

CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'article-images');

CREATE POLICY "Admins can upload" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'article-images'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'article-images'
    AND public.has_role(auth.uid(), 'admin')
  );