
-- Create articles table
CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  title text NOT NULL,
  category text NOT NULL,
  url text NOT NULL,
  image_url text NOT NULL,
  published boolean DEFAULT true,
  sort_order integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Allow public read for published articles
CREATE POLICY "Allow anonymous select" ON public.articles FOR SELECT TO anon USING (true);

-- Allow anonymous insert (admin is password-gated)
CREATE POLICY "Allow anonymous insert" ON public.articles FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous update
CREATE POLICY "Allow anonymous update" ON public.articles FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Seed existing 17 articles
INSERT INTO public.articles (title, category, url, image_url, sort_order) VALUES
('AI Act samenvatting: dit moet je weten als organisatie', 'Wetten en regels', 'https://aigeletterdheid.academy/ai-act-samenvatting/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-Act-samenvatting.webp', 1),
('AI-geletterdheid: wat het is en waarom het verplicht is', 'AI-geletterdheid uitgelegd', 'https://aigeletterdheid.academy/ai-geletterdheid/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-geletterdheid.webp', 2),
('Wat is kunstmatige intelligentie? Uitleg voor niet-technici', 'AI-geletterdheid uitgelegd', 'https://aigeletterdheid.academy/wat-is-kunstmatige-intelligentie/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/Wat-is-kunstmatige-intelligentie.webp', 3),
('AI op de werkvloer: zo zet je het verantwoord in', 'Praktijk en sectoren', 'https://aigeletterdheid.academy/ai-op-de-werkvloer/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-op-de-werkvloer.webp', 4),
('AI-training voor medewerkers: waarom het nu moet', 'Praktijk en sectoren', 'https://aigeletterdheid.academy/ai-training-medewerkers/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-training-medewerkers.webp', 5),
('AI in het onderwijs: kansen, risico''s en regels', 'Praktijk en sectoren', 'https://aigeletterdheid.academy/ai-in-het-onderwijs/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-in-het-onderwijs.webp', 6),
('AI in de zorg: toepassingen, regels en risico''s', 'Praktijk en sectoren', 'https://aigeletterdheid.academy/ai-in-de-zorg/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-in-de-zorg.webp', 7),
('AI en privacy: dit moet je weten over de AVG en AI Act', 'Wetten en regels', 'https://aigeletterdheid.academy/ai-en-privacy/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-en-privacy.webp', 8),
('AI-beleid opstellen: zo pak je het aan', 'Tools en vaardigheden', 'https://aigeletterdheid.academy/ai-beleid-opstellen/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-beleid-opstellen.webp', 9),
('ChatGPT op het werk: do''s, don''ts en beleid', 'Tools en vaardigheden', 'https://aigeletterdheid.academy/chatgpt-op-het-werk/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/ChatGPT-op-het-werk.webp', 10),
('Prompt engineering: zo schrijf je effectieve prompts', 'Tools en vaardigheden', 'https://aigeletterdheid.academy/prompt-engineering/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/Prompt-engineering.webp', 11),
('AI-certificering: waarom het ertoe doet', 'AI-geletterdheid uitgelegd', 'https://aigeletterdheid.academy/ai-certificering/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-certificering.webp', 12),
('Verantwoord AI-gebruik: ethiek en transparantie', 'AI-geletterdheid uitgelegd', 'https://aigeletterdheid.academy/verantwoord-ai-gebruik/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/Verantwoord-AI-gebruik.webp', 13),
('AI-risico''s: de grootste gevaren voor organisaties', 'Actueel', 'https://aigeletterdheid.academy/ai-risicos/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-risicos.webp', 14),
('AI-trends 2025: wat komen eraan?', 'Actueel', 'https://aigeletterdheid.academy/ai-trends-2025/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-trends-2025.webp', 15),
('Hoog-risico AI: wanneer valt jouw systeem eronder?', 'Wetten en regels', 'https://aigeletterdheid.academy/hoog-risico-ai/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/Hoog-risico-AI.webp', 16),
('AI-competenties: welke vaardigheden heb je nodig?', 'AI-geletterdheid uitgelegd', 'https://aigeletterdheid.academy/ai-competenties/', 'https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-competenties.webp', 17);
