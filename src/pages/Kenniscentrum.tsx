import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import DefinitionBlock from "@/components/DefinitionBlock";
import SEO from "@/components/SEO";

const articleCategories = [
  "Alle",
  "Wetten en regels",
  "AI-geletterdheid uitgelegd",
  "Actueel",
  "Tools en vaardigheden",
  "Praktijk en sectoren",
] as const;

type ArticleCategory = (typeof articleCategories)[number];

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
  // Article state
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("Alle");
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

  const filteredArticles = activeCategory === "Alle" ? articles : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen">
      <SEO
        title="Kenniscentrum AI-Geletterdheid & AI Act | Artikelen | AIGA"
        description="Artikelen, uitleg en achtergronden over AI-geletterdheid, de EU AI Act en verantwoord AI-gebruik. Geschreven door AI-expert Ferry Hoes."
        canonical="/kenniscentrum"
      />
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Kenniscentrum" }]} />

      {/* Hero */}
      <section className="pt-12 pb-16">
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

          <DefinitionBlock
            term="Wat is AI-geletterdheid?"
            definition="AI-geletterdheid is het vermogen van medewerkers om te begrijpen wat kunstmatige intelligentie is, hoe AI-systemen werken, welke risico's ze met zich meebrengen, en hoe ze AI op een veilige, verantwoorde en ethisch verantwoorde manier kunnen inzetten in hun dagelijks werk. Onder Artikel 4 van de EU AI Act (van kracht vanaf februari 2025) zijn organisaties in de EU verplicht om AI-geletterdheid te waarborgen voor alle medewerkers die met AI-systemen werken."
          />
        </div>
      </section>

      {/* ── Kennisoverzichten cards ── */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="KENNISOVERZICHTEN" />
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Card 1 — live */}
            <StaggerItem>
              <Link
                to="/ai-tools-onder-de-ai-act"
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 neon-glow transition-all duration-300 flex flex-col h-full"
              >
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <Badge variant="default" className="w-fit text-xs">Kennisoverzicht</Badge>
                  <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                    Welke AI-tools vallen onder de EU AI Act?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Overzicht van 49 veelgebruikte AI-tools — met risicocategorie, trainingsplicht en aandachtspunten per tool.
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all pt-2">
                    Bekijk overzicht <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </StaggerItem>

            {/* Card 2 — coming soon */}
            <StaggerItem>
              <div className="opacity-60 cursor-default bg-card border border-border rounded-2xl overflow-hidden flex flex-col h-full">
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-fit text-xs">Sectoroverzicht</Badge>
                    <Badge variant="outline" className="w-fit text-xs text-muted-foreground">Binnenkort</Badge>
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">
                    AI Act per sector: Financiële Dienstverlening
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Welke tools, risico's en extra regelgeving gelden specifiek voor financiële organisaties?
                  </p>
                </div>
              </div>
            </StaggerItem>

            {/* Card 3 — coming soon */}
            <StaggerItem>
              <div className="opacity-60 cursor-default bg-card border border-border rounded-2xl overflow-hidden flex flex-col h-full">
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-fit text-xs">Sectoroverzicht</Badge>
                    <Badge variant="outline" className="w-fit text-xs text-muted-foreground">Binnenkort</Badge>
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">
                    AI Act per sector: Zorg &amp; Welzijn
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Medische beslissingsondersteuning, Wkkgz en AVG — wat betekent de AI Act voor zorgorganisaties?
                  </p>
                </div>
              </div>
            </StaggerItem>

            {/* Card 4 — EU AI Act in 1 A4 */}
            <StaggerItem>
              <Link
                to="/kenniscentrum/eu-ai-act-in-1-a4"
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 neon-glow transition-all duration-300 flex flex-col h-full"
              >
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <Badge variant="default" className="w-fit text-xs">Samenvatting</Badge>
                  <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                    EU AI Act in 1 A4
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tijdlijn, risicocategorieën, verplichtingen en handhavingsschema. Printbaar en deelbaar.
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all pt-2">
                    Bekijk de samenvatting <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>


      {/* ── Artikelen & Blogs ── */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="ARTIKELEN & BLOGS" />
          </AnimatedSection>
          <div className="flex flex-wrap gap-2 mt-4">
            {articleCategories.map((cat) => (
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
              {filteredArticles.map((article) => {
                const isImported = !!(article.content && article.slug);
                const CardContentEl = (
                  <>
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
                        {!isImported && <ExternalLink size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </div>
                    </div>
                  </>
                );

                return (
                  <StaggerItem key={article.id}>
                    {isImported ? (
                      <Link
                        to={`/kenniscentrum/${article.slug}`}
                        className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 neon-glow transition-all duration-300 flex flex-col h-full"
                      >
                        {CardContentEl}
                      </Link>
                    ) : (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 neon-glow transition-all duration-300 flex flex-col h-full"
                      >
                        {CardContentEl}
                      </a>
                    )}
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>
    </div>
  );
};

export default Kenniscentrum;
