import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
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
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";
import { aiTools, AI_CATEGORIES, type AiTool } from "@/data/aiTools";

const riskColors: Record<AiTool["risk"], string> = {
  Hoog: "bg-destructive text-destructive-foreground",
  Beperkt: "bg-warning text-foreground",
  Minimaal: "bg-success text-primary-foreground",
};

const riskFilters = ["Alle risico's", "Minimaal", "Beperkt", "Hoog", "Training vereist"] as const;
type RiskFilter = (typeof riskFilters)[number];

const AiToolsOverzicht = () => {
  const [toolSearch, setToolSearch] = useState("");
  const [toolCategory, setToolCategory] = useState("Alle categorieën");
  const [toolRisk, setToolRisk] = useState<RiskFilter>("Alle risico's");

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Welke AI-tools vallen onder de EU AI Act?",
    description:
      "Overzicht van 49 veelgebruikte AI-tools in Nederlandse organisaties — met risicocategorie, trainingsplicht en aandachtspunten per tool.",
    author: { "@type": "Person", name: "Ferry Hoes" },
    publisher: {
      "@type": "EducationalOrganization",
      name: "AIGA Academy",
      url: "https://aigeletterdheid.academy",
    },
    mainEntityOfPage: "https://aigeletterdheid.academy/ai-tools-onder-de-ai-act",
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Welke AI-tools vallen onder de EU AI Act? | AIGA"
        description="Overzicht van 49 veelgebruikte AI-tools — met risicocategorie, trainingsplicht en aandachtspunten per tool volgens de EU AI Act."
        canonical="/ai-tools-onder-de-ai-act"
        ogType="article"
        jsonLd={jsonLd}
      />
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Kenniscentrum", href: "/kenniscentrum" },
          { label: "AI-tools onder de AI Act" },
        ]}
      />

      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="KENNISOVERZICHT" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              Welke AI-tools vallen onder de EU AI Act?
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">
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
    </div>
  );
};

export default AiToolsOverzicht;
