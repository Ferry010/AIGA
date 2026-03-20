import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Info } from "lucide-react";
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
import { aiTools, AI_CATEGORIES, TYPE_FILTERS, type AiTool } from "@/data/aiTools";

type TypeFilter = (typeof TYPE_FILTERS)[number];

const categoryBadgeClass: Record<AiTool["defaultCategory"], string> = {
  "Hoog risico (altijd)": "bg-destructive text-destructive-foreground",
  "Beperkt risico": "bg-warning text-foreground",
  "Minimaal risico": "bg-success text-primary-foreground",
};

const AiToolsOverzicht = () => {
  const [toolSearch, setToolSearch] = useState("");
  const [toolCategory, setToolCategory] = useState("Alle categorieën");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("Alle tools");

  const filteredTools = useMemo(() => {
    return aiTools.filter((t) => {
      const q = toolSearch.toLowerCase();
      const matchSearch = !q || t.name.toLowerCase().includes(q) || t.vendor.toLowerCase().includes(q);
      const matchCat = toolCategory === "Alle categorieën" || t.category === toolCategory;
      let matchType = true;
      if (typeFilter !== "Alle tools") {
        if (typeFilter === "Gespecialiseerd Finance/Legal") {
          matchType = t.type === "Gespecialiseerd Finance" || t.type === "Gespecialiseerd Legal";
        } else {
          matchType = t.type === typeFilter;
        }
      }
      return matchSearch && matchCat && matchType;
    });
  }, [toolSearch, toolCategory, typeFilter]);

  const stats = useMemo(() => {
    const total = filteredTools.length;
    const altijdHoog = filteredTools.filter((t) => t.defaultCategory === "Hoog risico (altijd)").length;
    const situationeel = filteredTools.filter((t) => t.defaultCategory === "Beperkt risico").length;
    const minimaal = filteredTools.filter((t) => t.defaultCategory === "Minimaal risico").length;
    return { total, altijdHoog, situationeel, minimaal };
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
      "Overzicht van 49 veelgebruikte AI-tools in Nederlandse organisaties — met type, standaard categorie, situationeel hoog risico en trainingsplicht.",
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
        description="Overzicht van 49 veelgebruikte AI-tools — met type, standaard categorie en wanneer ze hoog risico worden volgens de EU AI Act."
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
              Overzicht van 49 veelgebruikte AI-tools in Nederlandse organisaties — met type, standaard categorie en wanneer ze hoog risico worden.
            </p>
          </AnimatedSection>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Totaal in overzicht", value: stats.total, color: "text-foreground" },
              { label: "Altijd hoog risico", value: stats.altijdHoog, color: "text-destructive" },
              { label: "Situationeel hoog risico", value: stats.situationeel, color: "text-warning" },
              { label: "Minimaal / beperkt risico", value: stats.minimaal, color: "text-success" },
            ].map((s) => (
              <Card key={s.label} className="border-border">
                <CardContent className="p-5">
                  <span className={`text-3xl font-mono-display font-bold ${s.color}`}>{s.value}</span>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info callout */}
          <div className="mt-8 rounded-xl border border-border bg-card p-5 flex gap-3 items-start">
            <Info size={20} className="text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              De EU AI Act categoriseert geen tools, maar <span className="font-semibold text-foreground">gebruik</span>. Dezelfde tool kan minimaal risico zijn voor de ene medewerker en hoog risico voor de andere. De kolom 'Wordt hoog risico bij...' laat zien wanneer jouw organisatie extra verplichtingen krijgt onder Bijlage III.
            </p>
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

          {/* Type pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  typeFilter === f
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
                  <TableHead className="min-w-[110px]">Type</TableHead>
                  <TableHead className="min-w-[140px]">Standaard categorie</TableHead>
                  <TableHead className="min-w-[280px]">Wordt hoog risico bij...</TableHead>
                  <TableHead className="min-w-[100px]">Training vereist?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedTools.map((group) => (
                  <>
                    <TableRow key={`cat-${group.category}`} className="bg-surface">
                      <TableCell colSpan={5} className="py-2.5 px-4">
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
                          <span className="text-sm text-muted-foreground">{tool.type}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${categoryBadgeClass[tool.defaultCategory]} border-0 text-xs`}>
                            {tool.defaultCategory}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {tool.defaultCategory === "Hoog risico (altijd)" ? (
                            <span className="text-sm font-semibold text-destructive line-clamp-2">{tool.highRiskWhen}</span>
                          ) : (
                            <span className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{tool.highRiskWhen}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium text-success">Ja</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
                {groupedTools.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                      Geen tools gevonden voor deze filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footnote */}
          <p className="mt-4 text-xs text-muted-foreground">
            * Artikel 4 EU AI Act verplicht AI-geletterdheid voor alle medewerkers die AI-systemen gebruiken — ongeacht risicocategorie.
          </p>

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
                Doe de gratis Gereedheidscan →
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
