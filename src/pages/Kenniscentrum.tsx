import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Badge } from "@/components/ui/badge";

const categories = [
  "Alle",
  "Wetten en regels",
  "AI-geletterdheid uitgelegd",
  "Actueel",
  "Tools en vaardigheden",
  "Praktijk en sectoren",
] as const;

type Category = (typeof categories)[number];

interface Article {
  title: string;
  category: Category;
  url: string;
  image: string;
}

const articles: Article[] = [
  { title: "AI Act samenvatting: dit moet je weten als organisatie", category: "Wetten en regels", url: "https://aigeletterdheid.academy/ai-act-samenvatting/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-Act-samenvatting.webp" },
  { title: "AI-geletterdheid: wat het is en waarom het verplicht is", category: "AI-geletterdheid uitgelegd", url: "https://aigeletterdheid.academy/ai-geletterdheid/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-geletterdheid.webp" },
  { title: "Wat is kunstmatige intelligentie? Uitleg voor niet-technici", category: "AI-geletterdheid uitgelegd", url: "https://aigeletterdheid.academy/wat-is-kunstmatige-intelligentie/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/Wat-is-kunstmatige-intelligentie.webp" },
  { title: "AI op de werkvloer: zo zet je het verantwoord in", category: "Praktijk en sectoren", url: "https://aigeletterdheid.academy/ai-op-de-werkvloer/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-op-de-werkvloer.webp" },
  { title: "AI-training voor medewerkers: waarom het nu moet", category: "Praktijk en sectoren", url: "https://aigeletterdheid.academy/ai-training-medewerkers/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-training-medewerkers.webp" },
  { title: "AI in het onderwijs: kansen, risico's en regels", category: "Praktijk en sectoren", url: "https://aigeletterdheid.academy/ai-in-het-onderwijs/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-in-het-onderwijs.webp" },
  { title: "AI in de zorg: toepassingen, regels en risico's", category: "Praktijk en sectoren", url: "https://aigeletterdheid.academy/ai-in-de-zorg/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-in-de-zorg.webp" },
  { title: "AI en privacy: dit moet je weten over de AVG en AI Act", category: "Wetten en regels", url: "https://aigeletterdheid.academy/ai-en-privacy/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-en-privacy.webp" },
  { title: "AI-beleid opstellen: zo pak je het aan", category: "Tools en vaardigheden", url: "https://aigeletterdheid.academy/ai-beleid-opstellen/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-beleid-opstellen.webp" },
  { title: "ChatGPT op het werk: do's, don'ts en beleid", category: "Tools en vaardigheden", url: "https://aigeletterdheid.academy/chatgpt-op-het-werk/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/ChatGPT-op-het-werk.webp" },
  { title: "Prompt engineering: zo schrijf je effectieve prompts", category: "Tools en vaardigheden", url: "https://aigeletterdheid.academy/prompt-engineering/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/Prompt-engineering.webp" },
  { title: "AI-certificering: waarom het ertoe doet", category: "AI-geletterdheid uitgelegd", url: "https://aigeletterdheid.academy/ai-certificering/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-certificering.webp" },
  { title: "Verantwoord AI-gebruik: ethiek en transparantie", category: "AI-geletterdheid uitgelegd", url: "https://aigeletterdheid.academy/verantwoord-ai-gebruik/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/Verantwoord-AI-gebruik.webp" },
  { title: "AI-risico's: de grootste gevaren voor organisaties", category: "Actueel", url: "https://aigeletterdheid.academy/ai-risicos/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-risicos.webp" },
  { title: "AI-trends 2025: wat komen eraan?", category: "Actueel", url: "https://aigeletterdheid.academy/ai-trends-2025/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-trends-2025.webp" },
  { title: "Hoog-risico AI: wanneer valt jouw systeem eronder?", category: "Wetten en regels", url: "https://aigeletterdheid.academy/hoog-risico-ai/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/Hoog-risico-AI.webp" },
  { title: "AI-competenties: welke vaardigheden heb je nodig?", category: "AI-geletterdheid uitgelegd", url: "https://aigeletterdheid.academy/ai-competenties/", image: "https://aigeletterdheid.academy/wp-content/uploads/2025/04/AI-competenties.webp" },
];

const Kenniscentrum = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Alle");

  const filtered = activeCategory === "Alle" ? articles : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="KENNISCENTRUM" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              Alles over AI-geletterdheid.<br />
              <span className="text-primary">Op één plek.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Artikelen, uitleg en achtergronden over de AI Act, AI op de werkvloer en verantwoord AI-gebruik. Geschreven door Ferry Hoes.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <StaggerItem key={article.url}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 neon-glow transition-all duration-300 flex flex-col h-full"
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <Badge variant="secondary" className="w-fit mb-3 text-xs">
                      {article.category}
                    </Badge>
                    <h3 className="text-base font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors flex-1">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                      <span>Ferry Hoes</span>
                      <ExternalLink size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
};

export default Kenniscentrum;
