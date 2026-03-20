import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ExternalLink, Search } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import DefinitionBlock from "@/components/DefinitionBlock";
import SEO from "@/components/SEO";
import { aiTools, AI_CATEGORIES, type AiTool } from "@/data/aiTools";

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

const riskColors: Record<AiTool["risk"], string> = {
  Hoog: "bg-destructive text-destructive-foreground",
  Beperkt: "bg-warning text-foreground",
  Minimaal: "bg-success text-primary-foreground",
};

const riskFilters = ["Alle risico's", "Minimaal", "Beperkt", "Hoog", "Training vereist"] as const;
type RiskFilter = (typeof riskFilters)[number];

const Kenniscentrum = () => {
  // Article state
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("Alle");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Tool filter state
  const [toolSearch, setToolSearch] = useState("");
  const [toolCategory, setToolCategory] = useState("Alle categorieën");
  const [toolRisk, setToolRisk] = useState<RiskFilter>("Alle risico's");

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

  const filteredTools = useMemo(() => {
    return aiTools.filter((t) => {
      const q = toolSearch.toLowerCase();
      const matchSearch = !q || t.name.toLowerCase().includes(q) || t.vendor.toLowerCase().includes(q);
      const matchCat = toolCategory === "Alle categorieën" || t.category === toolCategory;
      const matchRisk =
        toolRisk === "Alle risico's" ||
        (toolRisk === "Training vereist" ? t.trainingRequired : t.risk === toolRisk);
      return matchSearch && matchCat && matchRisk;
    });
  }, [toolSearch, toolCategory, toolRisk]);

  const stats = useMemo(() => {
    const total = filteredTools.length;
    const hoog = filteredTools.filter((t) => t.risk === "Hoog").length;
    const beperkt = filteredTools.filter((t) => t.risk === "Beperkt").length;
    const minimaal = filteredTools.filter((t) => t.risk === "Minimaal").length;
    return { total, hoog, beperkt, minimaal };
  }, [filteredTools]);

  const groupedTools = useMemo(() => {
    const groups: Record<string, AiTool[]> = {};
    for (const t of filteredTools) {
      if (!groups[t.category]) groups[t.category] = [];
      groups[t.category].push(t);
    }
    return AI_CATEGORIES.filter((c) => groups[c]).map((c) => ({ category: c, tools: groups[c] }));
  }, [filteredTools]);

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
              <a
                href="#ai-tools-overzicht"
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
              </a>
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

            {/* Card 4 — coming soon */}
            <StaggerItem>
              <div className="opacity-60 cursor-default bg-card border border-border rounded-2xl overflow-hidden flex flex-col h-full">
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-fit text-xs">Samenvatting</Badge>
                    <Badge variant="outline" className="w-fit text-xs text-muted-foreground">Binnenkort</Badge>
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">
                    EU AI Act in 1 A4
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tijdlijn, risicocategorieën, verplichtingen en handhavingsschema. Printbaar en deelbaar.
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── Kennisoverzichten: AI-tools onder de AI Act ── */}
      <section id="ai-tools-overzicht" className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="KENNISOVERZICHTEN" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-4">
              Welke AI-tools vallen onder de EU AI Act?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-3xl leading-relaxed">
              Overzicht van 40+ veelgebruikte AI-tools in Nederlandse organisaties — met risicocategorie, trainingsplicht en aandachtspunten per tool.
            </p>
          </AnimatedSection>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Totaal in overzicht", value: stats.total, color: "text-foreground" },
              { label: "Hoog risico", value: stats.hoog, color: "text-destructive" },
              { label: "Beperkt risico", value: stats.beperkt, color: "text-warning" },
              { label: "Minimaal risico", value: stats.minimaal, color: "text-success" },
            ].map((s) => (
              <Card key={s.label} className="border-border">
                <CardContent className="p-5">
                  <span className={`text-3xl font-mono-display font-bold ${s.color}`}>{s.value}</span>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Zoek tool of vendor..."
                value={toolSearch}
                onChange={(e) => setToolSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={toolCategory} onValueChange={setToolCategory}>
              <SelectTrigger className="w-full sm:w-52">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alle categorieën">Alle categorieën</SelectItem>
                {AI_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Risk pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {riskFilters.map((f) => (
              <button
                key={f}
                onClick={() => setToolRisk(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  toolRisk === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
            <span className="flex items-center text-sm text-muted-foreground ml-2">
              {stats.total} tools
            </span>
          </div>

          {/* Data table */}
          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-surface-2">
                  <TableHead className="min-w-[200px]">Tool</TableHead>
                  <TableHead className="min-w-[130px]">Risicocategorie</TableHead>
                  <TableHead className="min-w-[120px]">Training vereist?</TableHead>
                  <TableHead className="min-w-[280px]">Aandachtspunten</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedTools.map((group) => (
                  <>
                    <TableRow key={`cat-${group.category}`} className="bg-surface">
                      <TableCell colSpan={4} className="py-2.5 px-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {group.category}
                        </span>
                      </TableCell>
                    </TableRow>
                    {group.tools.map((tool) => (
                      <TableRow key={tool.name}>
                        <TableCell>
                          <span className="font-semibold text-foreground">{tool.name}</span>
                          <span className="block text-xs text-muted-foreground">{tool.vendor} · {tool.category}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${riskColors[tool.risk]} border-0 text-xs`}>
                            {tool.risk}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {tool.trainingRequired ? (
                            <span className={`text-sm font-medium ${tool.risk === "Hoog" ? "text-warning" : "text-success"}`}>
                              {tool.risk === "Hoog" ? "Ja/Hoog*" : "Ja"}
                            </span>
                          ) : (
                            <span className="text-sm text-text-faint">Nee</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-xs text-muted-foreground leading-relaxed">{tool.note}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
                {groupedTools.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
                      Geen tools gevonden voor deze filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* CTA bar */}
          <div className="mt-10 rounded-2xl neon-border-lg">
            <div className="neon-inner rounded-2xl p-8 bg-background flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-foreground font-body leading-relaxed max-w-2xl">
                Meerdere tools in jouw organisatie vereisen training? De AIGA-certificering dekt alle verplichtingen onder Artikel 4 EU AI Act — voor <span className="font-semibold">€249 per medewerker</span>.
              </p>
              <Link
                to="/gereedheidscan"
                className="btn-neon text-sm px-6 py-3 rounded-lg whitespace-nowrap shrink-0"
              >
                Doe de gratis Risicoscan →
              </Link>
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-xs text-text-faint">
            Meer tools volgen. Binnenkort: Boetecalculator, AI Readiness Quiz en de AI-beleid template.
          </p>
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
