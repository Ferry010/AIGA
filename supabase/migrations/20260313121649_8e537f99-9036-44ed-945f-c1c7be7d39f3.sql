ALTER TABLE public.articles ADD COLUMN content text;
ALTER TABLE public.articles ADD COLUMN slug text;

CREATE UNIQUE INDEX articles_slug_unique ON public.articles (slug) WHERE slug IS NOT NULL;