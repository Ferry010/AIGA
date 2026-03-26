import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Plus, Search, X, AlertTriangle, Shield, ShieldAlert, ShieldCheck, FileText, Users, ClipboardList } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { aiTools, AI_CATEGORIES, type AiTool } from "@/data/aiTools";

/* ────────── risk helpers ────────── */

type RiskLevel = "Hoog risico (altijd)" | "Situationeel hoog risico" | "Beperkt risico" | "Minimaal risico";

interface SelectedTool {
  tool: AiTool;
  risk: RiskLevel;
  custom?: boolean;
}

function classifyRisk(tool: AiTool): RiskLevel {
  if (tool.defaultCategory === "Hoog risico (altijd)") return "Hoog risico (altijd)";
  if (tool.defaultCategory === "Beperkt risico" && tool.highRiskWhen) return "Situationeel hoog risico";
  if (tool.defaultCategory === "Minimaal risico") return "Minimaal risico";
  return "Beperkt risico";
}

function riskBadgeClasses(risk: RiskLevel): string {
  switch (risk) {
    case "Hoog risico (altijd)":
      return "bg-red-100 text-red-700 border-red-200";
    case "Situationeel hoog risico":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "Beperkt risico":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Minimaal risico":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }
}

function riskDot(risk: RiskLevel): string {
  switch (risk) {
    case "Hoog risico (altijd)": return "bg-red-500";
    case "Situationeel hoog risico": return "bg-orange-500";
    case "Beperkt risico": return "bg-amber-500";
    case "Minimaal risico": return "bg-emerald-500";
  }
}

/* ────────── popular tools ────────── */

const POPULAR_TOOLS = [
  "ChatGPT (Free/Pro)",
  "Microsoft Copilot (M365)",
  "Google Gemini",
  "Claude (Anthropic)",
  "GitHub Copilot",
  "Grammarly AI",
  "DeepL",
  "HubSpot AI",
  "Fireflies.ai",
  "LinkedIn Talent AI",
];

const POPULAR_SET = new Set(POPULAR_TOOLS);

/* ────────── component ────────── */

const AiRisicoscan = () => {
  const [phase, setPhase] = useState<"select" | "results">("select");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Alle");
  const [customToolName, setCustomToolName] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTools, setCustomTools] = useState<AiTool[]>([]);

  const allTools = useMemo(() => [...aiTools, ...customTools], [customTools]);

  const filteredTools = useMemo(() => {
    return allTools.filter((t) => {
      const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.vendor.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "Alle" || t.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [allTools, search, activeCategory]);

  const groupedTools = useMemo(() => {
    const groups: Record<string, AiTool[]> = {};
    for (const t of filteredTools) {
      if (!groups[t.category]) groups[t.category] = [];
      groups[t.category].push(t);
    }
    return groups;
  }, [filteredTools]);

  const toggle = (name: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const addCustomTool = () => {
    if (!customToolName.trim()) return;
    const tool: AiTool = {
      name: customToolName.trim(),
      vendor: "Onbekend",
      category: "Generatieve AI",
      type: "GPAI",
      defaultCategory: "Beperkt risico",
      highRiskWhen: "",
      trainingRequired: true,
    };
    setCustomTools((prev) => [...prev, tool]);
    setSelectedIds((prev) => new Set(prev).add(tool.name));
    setCustomToolName("");
    setShowCustomInput(false);
  };

  const selectedTools: SelectedTool[] = useMemo(() => {
    return allTools
      .filter((t) => selectedIds.has(t.name))
      .map((t) => ({ tool: t, risk: classifyRisk(t), custom: customTools.includes(t) }));
  }, [allTools, selectedIds, customTools]);

  /* result counts */
  const counts = useMemo(() => {
    const c = { hoog: 0, situationeel: 0, beperkt: 0, minimaal: 0 };
    for (const s of selectedTools) {
      if (s.risk === "Hoog risico (altijd)") c.hoog++;
      else if (s.risk === "Situationeel hoog risico") c.situationeel++;
      else if (s.risk === "Beperkt risico") c.beperkt++;
      else c.minimaal++;
    }
    return c;
  }, [selectedTools]);

  const overallVerdict = counts.hoog > 0 ? "HOOG" : counts.situationeel > 0 ? "GEMIDDELD" : "LAAG";
  const verdictColor = overallVerdict === "HOOG" ? "bg-red-100 text-red-700" : overallVerdict === "GEMIDDELD" ? "bg-orange-100 text-orange-700" : "bg-emerald-100 text-emerald-700";
  const verdictText = overallVerdict === "HOOG"
    ? `Je gebruikt ${counts.hoog} tool${counts.hoog > 1 ? "s" : ""} die altijd onder de verplichtingen van Bijlage III ${counts.hoog > 1 ? "vallen" : "valt"}. Directe actie vereist.`
    : overallVerdict === "GEMIDDELD"
    ? `Je gebruikt ${counts.situationeel} tool${counts.situationeel > 1 ? "s" : ""} met situationeel hoog risico. Beoordeel per use case of je de hoog-risico drempel bereikt.`
    : "Je AI-gebruik valt grotendeels onder minimaal of beperkt risico. Zorg wel voor AI-geletterdheid (Art. 4).";

  /* ────────── PHASE: SELECT ────────── */
  if (phase === "select") {
    return (
      <div className="min-h-screen pb-32">
        <SEO
          title="AI Risicoscan | Welke AI-tools gebruikt jouw organisatie? | AIGA"
          description="Selecteer de AI-tools die jouw organisatie gebruikt en krijg direct een risicoprofiel per tool en een compliance-overzicht onder de EU AI Act."
          canonical="/tools/ai-risicoscan"
        />
        <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "AI Risicoscan" }]} />

        {/* Hero */}
        <section className="pt-12 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <SectionLabel text="AI RISICOSCAN" />
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
                Welke AI-tools gebruikt<br />
                <span className="text-primary">jouw organisatie?</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Selecteer de tools die jouw team gebruikt. Je krijgt direct een risicoprofiel per tool én een overzicht van jouw compliance-verplichtingen onder de EU AI Act.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Search + filters */}
        <section className="pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Zoek een tool..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Alle", ...AI_CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-secondary-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tool grid */}
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {Object.keys(groupedTools).length === 0 && (
              <p className="text-muted-foreground text-center py-12">Geen tools gevonden voor "{search}"</p>
            )}
            {/* Popular tools section */}
            {activeCategory === "Alle" && !search && (() => {
              const popularToolObjects = POPULAR_TOOLS
                .map((name) => allTools.find((t) => t.name === name))
                .filter(Boolean) as AiTool[];
              if (!popularToolObjects.length) return null;
              return (
                <div className="mb-8">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">🔥 Meest gebruikt in Nederlandse organisaties</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {popularToolObjects.map((tool) => {
                      const isSelected = selectedIds.has(tool.name);
                      const risk = classifyRisk(tool);
                      return (
                        <button
                          key={tool.name}
                          onClick={() => toggle(tool.name)}
                          className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                            isSelected
                              ? "border-primary bg-accent shadow-md"
                              : "border-border bg-card hover:border-primary/30"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                              <Check size={12} className="text-primary-foreground" />
                            </div>
                          )}
                          <p className="font-semibold text-foreground text-sm leading-tight pr-6">{tool.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{tool.vendor}</p>
                          <Badge variant="outline" className={`mt-2 text-[10px] ${riskBadgeClasses(risk)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1 ${riskDot(risk)}`} />
                            {risk}
                          </Badge>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {AI_CATEGORIES.filter((cat) => groupedTools[cat as string]).map((cat) => {
              const toolsInCat = groupedTools[cat as string]!.filter(
                (tool) => search || activeCategory !== "Alle" || !POPULAR_SET.has(tool.name)
              );
              if (!toolsInCat.length) return null;
              return (
              <div key={cat} className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">{cat}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {toolsInCat.map((tool) => {
                    const isSelected = selectedIds.has(tool.name);
                    const risk = classifyRisk(tool);
                    return (
                      <button
                        key={tool.name}
                        onClick={() => toggle(tool.name)}
                        className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-accent shadow-md"
                            : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check size={12} className="text-primary-foreground" />
                          </div>
                        )}
                        <p className="font-semibold text-foreground text-sm leading-tight pr-6">{tool.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{tool.vendor}</p>
                        <Badge variant="outline" className={`mt-2 text-[10px] ${riskBadgeClasses(risk)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1 ${riskDot(risk)}`} />
                          {risk}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Custom tool */}
            <div className="mt-4">
              {!showCustomInput ? (
                <button onClick={() => setShowCustomInput(true)} className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                  <Plus size={14} /> Staat jouw tool er niet bij? Voeg hem toe →
                </button>
              ) : (
                <div className="flex items-center gap-2 max-w-md">
                  <Input
                    placeholder="Naam van de tool..."
                    value={customToolName}
                    onChange={(e) => setCustomToolName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomTool()}
                    autoFocus
                  />
                  <Button size="sm" onClick={addCustomTool} disabled={!customToolName.trim()}>Toevoegen</Button>
                  <button onClick={() => setShowCustomInput(false)} className="text-muted-foreground"><X size={18} /></button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Sticky bottom bar */}
        {selectedIds.size > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-t border-border py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <p className="font-medium text-foreground">
                {selectedIds.size} tool{selectedIds.size > 1 ? "s" : ""} geselecteerd
              </p>
              <Button onClick={() => { setPhase("results"); window.scrollTo(0, 0); }} className="neon-glow">
                Bekijk mijn risicoprofiel <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ────────── PHASE: RESULTS ────────── */
  return (
    <div className="min-h-screen">
      <SEO
        title="Jouw AI Risicoprofiel | AIGA"
        description="Je persoonlijke AI-risicoprofiel op basis van de EU AI Act."
        canonical="/tools/ai-risicoscan"
      />
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "AI Risicoscan", href: "/tools/ai-risicoscan" }, { label: "Resultaten" }]} />

      {/* Section A — Summary */}
      <section className="pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="JOUW RISICOPROFIEL" />
            <Card className="border-border">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-3 mb-6">
                  {counts.hoog > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-red-500" /> {counts.hoog} hoog risico
                    </div>
                  )}
                  {counts.situationeel > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-orange-500" /> {counts.situationeel} situationeel hoog
                    </div>
                  )}
                  {counts.beperkt > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> {counts.beperkt} beperkt risico
                    </div>
                  )}
                  {counts.minimaal > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> {counts.minimaal} minimaal risico
                    </div>
                  )}
                </div>

                <Badge className={`text-sm px-4 py-1.5 ${verdictColor} border`}>
                  {overallVerdict === "HOOG" && <ShieldAlert size={14} className="mr-1" />}
                  {overallVerdict === "GEMIDDELD" && <AlertTriangle size={14} className="mr-1" />}
                  {overallVerdict === "LAAG" && <ShieldCheck size={14} className="mr-1" />}
                  JOUW ORGANISATIE: {overallVerdict} RISICO
                </Badge>

                <p className="mt-4 text-muted-foreground leading-relaxed">{verdictText}</p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Section B — Per tool breakdown */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="PER TOOL" />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {selectedTools.map(({ tool, risk }) => (
              <StaggerItem key={tool.name}>
                <Card className="h-full border-border">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{tool.name}</p>
                        <p className="text-xs text-muted-foreground">{tool.vendor}</p>
                      </div>
                      <Badge variant="outline" className={`shrink-0 text-[10px] ${riskBadgeClasses(risk)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1 ${riskDot(risk)}`} />
                        {risk}
                      </Badge>
                    </div>

                    {risk === "Hoog risico (altijd)" && (
                      <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground text-xs uppercase tracking-wide">Verplichtingen:</p>
                        <div className="flex items-start gap-2"><Users size={14} className="shrink-0 mt-0.5 text-red-500" /><span>Menselijk toezicht verplicht bij alle beslissingen</span></div>
                        <div className="flex items-start gap-2"><FileText size={14} className="shrink-0 mt-0.5 text-red-500" /><span>Technische documentatie & conformiteitsbeoordeling</span></div>
                        <div className="flex items-start gap-2"><Shield size={14} className="shrink-0 mt-0.5 text-red-500" /><span>Risicobeheersingssysteem (Art. 9)</span></div>
                        {tool.highRiskWhen && <p className="text-xs italic mt-1">{tool.highRiskWhen}</p>}
                      </div>
                    )}

                    {risk === "Situationeel hoog risico" && tool.highRiskWhen && (
                      <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                        <p className="text-xs"><span className="font-medium text-foreground">Wordt hoog risico bij:</span> {tool.highRiskWhen}</p>
                        <p className="text-xs">Training verplicht onder Art. 4.</p>
                      </div>
                    )}

                    {risk === "Beperkt risico" && (
                      <p className="mt-3 text-sm text-muted-foreground">Transparantieverplichtingen (Art. 50). Training verplicht onder Art. 4.</p>
                    )}

                    {risk === "Minimaal risico" && (
                      <p className="mt-3 text-sm text-muted-foreground">Geen aanvullende verplichtingen. Art. 4 training aanbevolen.</p>
                    )}

                    <Link to="/ai-tools-onder-de-ai-act" className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                      Meer info <ArrowRight size={12} />
                    </Link>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section C — Action checklist */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="WAT MOET JOUW ORGANISATIE NU DOEN?" />
          <Card className="border-border mt-4">
            <CardContent className="p-6">
              <ul className="space-y-4">
                {counts.hoog > 0 && (
                  <li className="flex items-start gap-3">
                    <ClipboardList size={18} className="shrink-0 mt-0.5 text-red-500" />
                    <div>
                      <p className="font-medium text-foreground">Conformiteitsbeoordelingsproces opstarten</p>
                      <p className="text-sm text-muted-foreground">
                        Voor: {selectedTools.filter((s) => s.risk === "Hoog risico (altijd)").map((s) => s.tool.name).join(", ")}
                      </p>
                    </div>
                  </li>
                )}
                {counts.situationeel > 0 && (
                  <li className="flex items-start gap-3">
                    <AlertTriangle size={18} className="shrink-0 mt-0.5 text-orange-500" />
                    <div>
                      <p className="font-medium text-foreground">Beoordeel per use case of de hoog-risico drempel bereikt wordt</p>
                      <p className="text-sm text-muted-foreground">
                        Voor: {selectedTools.filter((s) => s.risk === "Situationeel hoog risico").map((s) => s.tool.name).join(", ")}
                      </p>
                    </div>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <Users size={18} className="shrink-0 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Zorg voor aantoonbare AI-geletterdheid voor alle medewerkers die deze tools gebruiken (Art. 4)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FileText size={18} className="shrink-0 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Documenteer welke AI-systemen worden ingezet en voor welk doel</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section D — CTA */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-border bg-accent/30">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">Klaar om compliant te worden?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                De AIGA-training dekt de AI-geletterdheidsplicht voor al jouw medewerkers — voor alle tools in dit overzicht.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <Button asChild className="neon-glow">
                  <Link to="/training">Bekijk de training <ArrowRight size={16} /></Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Vraag offerte aan</Link>
                </Button>
              </div>
              <Link to="/gereedheidscan" className="text-sm text-primary font-medium hover:underline">
                Of doe eerst de AI Gereedheidscan voor een breder beeld →
              </Link>
            </CardContent>
          </Card>

          {/* Restart */}
          <div className="mt-6 text-center">
            <button
              onClick={() => { setPhase("select"); setSelectedIds(new Set()); window.scrollTo(0, 0); }}
              className="text-sm text-primary font-medium hover:underline"
            >
              ← Opnieuw scannen
            </button>
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-xs text-muted-foreground text-center max-w-2xl mx-auto">
            Dit risicoprofiel is gebaseerd op de gepubliceerde tekst van de EU AI Act (Verordening 2024/1689) en de tool-database van AIGA. De risicocategorie kan variëren afhankelijk van jouw specifieke gebruik. Dit is geen juridisch advies.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AiRisicoscan;
