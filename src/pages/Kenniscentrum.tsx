import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

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
  id: string;
  title: string;
  category: string;
  url: string;
  image_url: string;
  content: string | null;
  slug: string | null;
}

const Kenniscentrum = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Alle");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("articles")
      .select("id, title, category, url, image_url, content, slug")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setArticles((data as Article[]) || []);
        setLoading(false);
      });
  }, []);

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
          {loading ? (
            <p className="text-muted-foreground">Laden...</p>
          ) : (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <StaggerItem key={article.id}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 neon-glow transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={article.image_url}
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Kenniscentrum;
