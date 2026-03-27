ALTER TABLE public.articles
  ADD COLUMN published_date date DEFAULT CURRENT_DATE,
  ADD COLUMN read_time_minutes integer;