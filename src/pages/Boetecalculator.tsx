import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";
import { cn } from "@/lib/utils";

/* ── Types ── */
type Role = "provider" | "deployer" | "both" | "unknown" | null;
type OrgSize = "micro" | "small" | "medium" | "large" | null;
type ComplianceLevel = "full" | "partial" | "none" | null;
type RiskLevel = "GEEN" | "LAAG" | "GEMIDDELD" | "HOOG";

/* ── Static data ── */
const roleOptions = [
  { key: "provider" as const, emoji: "🏭", title: "Provider", subtitle: "Wij ontwikkelen of trainen zelf AI-systemen (voor eigen gebruik of verkoop)" },
  { key: "deployer" as const, emoji: "🏢", title: "Deployer", subtitle: "Wij gebruiken AI-tools van anderen in onze bedrijfsprocessen (ChatGPT, Copilot, etc.)" },
  { key: "both" as const, emoji: "🔄", title: "Beide", subtitle: "Wij ontwikkelen eigen AI en gebruiken AI-tools van anderen" },
  { key: "unknown" as const, emoji: "❓", title: "Weet ik niet", subtitle: "Toon uitleg zodat ik de juiste keuze kan maken" },
];

const aiGroups = [
  {
    id: "A",
    label: "Verboden toepassingen (Artikel 5)",
    color: "text-red-600",
    items: [
      { key: "a_subliminal", label: "Subliminale manipulatietechnieken gericht op gedragsbeïnvloeding" },
      { key: "a_scoring", label: "Social scoring systemen die mensen beoordelen op gedrag" },
      { key: "a_biometric_realtime", label: "Realtime biometrische identificatie in openbare ruimten" },
    ],
  },
  {
    id: "B",
    label: "Hoog risico (Artikel 6 + Annex III)",
    color: "text-orange-600",
    items: [
      { key: "b_hr", label: "AI voor werving, selectie of beoordeling van medewerkers (CV-screening, scoring)" },
      { key: "b_medical", label: "AI in medische diagnose of behandelingsondersteuning" },
      { key: "b_credit", label: "AI voor kredietbeoordeling of verzekeringspremies" },
      { key: "b_benefits", label: "AI voor beoordeling van uitkeringen of sociale voorzieningen" },
      { key: "b_infra", label: "AI voor kritieke infrastructuur (energie, water, transport)" },
      { key: "b_biometric", label: "Biometrie voor identificatie (niet realtime, bijv. toegangscontrole)" },
    ],
  },
  {
    id: "C",
    label: "Beperkt risico (Artikel 50 — transparantieverplichtingen)",
    color: "text-yellow-600",
    items: [
      { key: "c_chatbot", label: "Chatbots of AI-gegenereerde content die aan klanten/gebruikers wordt getoond" },
      { key: "c_deepfake", label: "Deepfakes of AI-gegenereerde media" },
    ],
  },
  {
    id: "D",
    label: "Minimaal risico (Artikel 4 — AI-geletterdheidsplicht)",
    color: "text-muted-foreground",
    items: [
      { key: "d_genai", label: "Generatieve AI intern (ChatGPT, Copilot, Gemini) — alleen voor medewerkers" },
      { key: "d_marketing", label: "AI voor marketing of contentcreatie (intern)" },
      { key: "d_spam", label: "Spamfilters, aanbevelingsalgoritmen" },
      { key: "d_none", label: "Geen van bovenstaande" },
    ],
  },
];

const complianceOptionsABC = [
  { key: "full" as const, emoji: "✅", label: "Volledig compliant (documentatie, toezicht, transparantiemelding en beleid aanwezig)" },
  { key: "partial" as const, emoji: "📋", label: "Gedeeltelijk compliant (sommige stappen gezet, niet alles gedocumenteerd)" },
  { key: "none" as const, emoji: "❌", label: "Niet compliant (geen formele maatregelen genomen)" },
];

const complianceOptionsD = [
  { key: "full" as const, emoji: "✅", label: "Medewerkers zijn aantoonbaar getraind in AI-geletterdheid (certificaten aanwezig)" },
  { key: "partial" as const, emoji: "📋", label: "Training is gestart maar niet afgerond of gedocumenteerd" },
  { key: "none" as const, emoji: "❌", label: "Geen formele AI-geletterdheidsmaatregelen genomen" },
];

const orgOptions = [
  { key: "micro" as const, emoji: "🏢", title: "Micro-onderneming", subtitle: "Minder dan 10 medewerkers, max €2M omzet" },
  { key: "small" as const, emoji: "🏬", title: "Klein bedrijf", subtitle: "10–49 medewerkers, max €10M omzet" },
  { key: "medium" as const, emoji: "🏭", title: "Middelgroot bedrijf", subtitle: "50–249 medewerkers, max €50M omzet" },
  { key: "large" as const, emoji: "🏦", title: "Groot bedrijf", subtitle: "250+ medewerkers of meer dan €50M omzet" },
];

const turnoverMap: Record<string, number> = { micro: 1_000_000, small: 5_000_000, medium: 25_000_000, large: 100_000_000 };
const seatMap: Record<string, number> = { micro: 10, small: 30, medium: 100, large: 250 };

/* ── Helpers ── */
function formatEuro(n: number): string {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1).replace(".0", "")}M`;
  if (n >= 1_000) return `€${Math.round(n).toLocaleString("nl-NL")}`;
  return `€${Math.round(n).toLocaleString("nl-NL")}`;
}

function getHighestGroup(selections: string[]): "A" | "B" | "C" | "D" {
  if (selections.some((s) => s.startsWith("a_"))) return "A";
  if (selections.some((s) => s.startsWith("b_"))) return "B";
  if (selections.some((s) => s.startsWith("c_"))) return "C";
  return "D";
}

interface CalcResult {
  riskLevel: RiskLevel;
  riskColor: string;
  fineMin: number;
  fineMax: number;
  articles: string;
  complianceCost: number;
  isLiteracyOnly: boolean;
  isZeroRisk: boolean;
}

function calculate(aiSelections: string[], compliance: ComplianceLevel, orgSize: OrgSize): CalcResult {
  const group = getHighestGroup(aiSelections);
  const turnover = turnoverMap[orgSize!];
  const seats = seatMap[orgSize!];
  const isSME = orgSize === "micro" || orgSize === "small";
  const complianceCost = seats * 249;

  // Group D only — literacy obligation
  if (group === "D") {
    if (compliance === "full") {
      return { riskLevel: "GEEN", riskColor: "bg-green-100 text-green-800 border-green-200", fineMin: 0, fineMax: 0, articles: "Artikel 4 (AI-geletterdheidsplicht)", complianceCost, isLiteracyOnly: true, isZeroRisk: true };
    }
    const min = compliance === "partial" ? 5_000 : 5_000;
    const max = compliance === "partial" ? 25_000 : 50_000;
    const risk: RiskLevel = compliance === "partial" ? "GEMIDDELD" : "HOOG";
    const color = compliance === "partial" ? "bg-orange-100 text-orange-800 border-orange-200" : "bg-red-100 text-red-800 border-red-200";
    return { riskLevel: risk, riskColor: color, fineMin: min, fineMax: max, articles: "Artikel 4 (AI-geletterdheidsplicht) — handhaving door lidstaten", complianceCost, isLiteracyOnly: true, isZeroRisk: false };
  }

  // Tiers 1-3
  let flatCap: number;
  let pct: number;
  let articles: string;
  if (group === "A") {
    flatCap = 35_000_000; pct = 0.07;
    articles = "Artikel 5 (verboden AI-praktijken) + Artikel 99 lid 3";
  } else if (group === "B") {
    flatCap = 15_000_000; pct = 0.03;
    articles = "Artikel 6 + Annex III (hoog-risico AI) + Artikel 99 lid 4";
  } else {
    flatCap = 7_500_000; pct = 0.015;
    articles = "Artikel 50 (transparantieverplichtingen) + Artikel 99 lid 4";
  }

  const turnoverFine = turnover * pct;

  // SME cap (Art. 99(6)): SMEs get lower of flat/turnover; large get higher
  // Exception: Group A + not compliant → no cap protection
  let maxFine: number;
  const noCapProtection = group === "A" && compliance === "none";
  if (noCapProtection) {
    maxFine = Math.max(flatCap, turnoverFine);
  } else if (isSME) {
    maxFine = Math.min(flatCap, turnoverFine);
  } else {
    maxFine = Math.max(flatCap, turnoverFine);
  }

  // Compliance multiplier
  let fineMin: number;
  let fineMax: number;
  let riskLevel: RiskLevel;
  let riskColor: string;

  if (compliance === "full") {
    fineMin = 0; fineMax = 0;
    riskLevel = "LAAG";
    riskColor = "bg-green-100 text-green-800 border-green-200";
  } else if (compliance === "partial") {
    fineMin = maxFine * 0.2;
    fineMax = maxFine * 0.4;
    riskLevel = "GEMIDDELD";
    riskColor = "bg-orange-100 text-orange-800 border-orange-200";
  } else {
    fineMin = maxFine * 0.6;
    fineMax = maxFine;
    riskLevel = "HOOG";
    riskColor = "bg-red-100 text-red-800 border-red-200";
  }

  return { riskLevel, riskColor, fineMin, fineMax, articles, complianceCost, isLiteracyOnly: false, isZeroRisk: compliance === "full" };
}

/* ── Component ── */
const Boetecalculator = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>(null);
  const [aiSelections, setAiSelections] = useState<string[]>([]);
  const [compliance, setCompliance] = useState<ComplianceLevel>(null);
  const [orgSize, setOrgSize] = useState<OrgSize>(null);
  const [showResults, setShowResults] = useState(false);

  const toggleAi = (key: string) => {
    setAiSelections((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const canProceed =
    step === 1 ? !!role :
    step === 2 ? aiSelections.length > 0 :
    step === 3 ? !!compliance :
    !!orgSize;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else setShowResults(true);
  };

  const handleReset = () => {
    setStep(1); setRole(null); setAiSelections([]); setCompliance(null); setOrgSize(null); setShowResults(false);
  };

  const highestGroup = getHighestGroup(aiSelections);
  const complianceOpts = highestGroup === "D" ? complianceOptionsD : complianceOptionsABC;
  const results = showResults ? calculate(aiSelections, compliance, orgSize) : null;

  return (
    <div className="min-h-screen">
      <SEO
        title="Boetecalculator | AI Act Boeterisico Berekenen | AIGA"
        description="Bereken in twee minuten hoeveel boete jouw organisatie riskeert onder de EU AI Act. Gebaseerd op Artikel 99."
        canonical="/tools/boetecalculator"
      />
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Boetecalculator" }]} />

      {/* Hero */}
      <section className="pt-12 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="BOETECALCULATOR" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              Wat kost niet-compliance<br />
              <span className="text-primary">jouw organisatie?</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Bereken in twee minuten hoeveel boete jouw organisatie riskeert onder de EU AI Act. Gebaseerd op de officiële boetestructuur van Artikel 99.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {!showResults ? (
            <AnimatedSection>
              <Card className="border-border">
                <CardContent className="p-6 sm:p-8">
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Stap {step} van 4</span>
                    <span className="text-sm text-muted-foreground">{Math.round((step / 4) * 100)}%</span>
                  </div>
                  <Progress value={(step / 4) * 100} className="h-2 mb-8" />

                  {/* Step 1 — Role */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-xl font-display font-semibold text-foreground mb-6">Wat is de rol van jouw organisatie ten opzichte van AI?</h2>
                      {role === "unknown" && (
                        <div className="mb-6 p-4 rounded-lg bg-accent border border-border text-sm text-muted-foreground leading-relaxed">
                          <strong className="text-foreground">Uitleg:</strong> Een <strong>provider</strong> ontwikkelt, traint of aanbiedt een AI-systeem. Een <strong>deployer</strong> gebruikt een AI-systeem van een ander in de eigen organisatie. Veel bedrijven zijn deployer: ze gebruiken tools als ChatGPT, Copilot of AI-functies in bestaande software.
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {roleOptions.map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => setRole(opt.key)}
                            className={cn(
                              "text-left p-4 rounded-lg border-2 transition-all duration-200",
                              role === opt.key ? "border-primary bg-accent" : "border-border hover:border-primary/40 bg-background"
                            )}
                          >
                            <span className="text-2xl mb-2 block">{opt.emoji}</span>
                            <span className="font-display font-semibold text-foreground block">{opt.title}</span>
                            <span className="text-sm text-muted-foreground block mt-1">{opt.subtitle}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2 — AI applications */}
                  {step === 2 && (() => {
                    const popularItems = [
                      { key: "d_genai", label: "Generatieve AI intern (ChatGPT, Copilot, Gemini) — alleen voor medewerkers" },
                      { key: "c_chatbot", label: "Chatbots of AI-gegenereerde content die aan klanten/gebruikers wordt getoond" },
                      { key: "b_hr", label: "AI voor werving, selectie of beoordeling van medewerkers (CV-screening, scoring)" },
                      { key: "d_marketing", label: "AI voor marketing of contentcreatie (intern)" },
                    ];
                    const popularKeys = new Set(popularItems.map((i) => i.key));
                    return (
                    <div>
                      <h2 className="text-xl font-display font-semibold text-foreground mb-2">Welke AI-toepassingen gebruikt of ontwikkelt jouw organisatie?</h2>
                      <p className="text-sm text-muted-foreground mb-6">Meerdere antwoorden mogelijk</p>

                      {/* Popular selections */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">🔥 Meest voorkomend in Nederlandse organisaties</p>
                        <div className="grid grid-cols-1 gap-2">
                          {popularItems.map((item) => (
                            <button
                              key={item.key}
                              onClick={() => toggleAi(item.key)}
                              className={cn(
                                "text-left p-3 rounded-lg border-2 transition-all duration-200 text-sm",
                                aiSelections.includes(item.key) ? "border-primary bg-accent" : "border-border hover:border-primary/40 bg-background"
                              )}
                            >
                              <span className="text-foreground">{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        {aiGroups.map((group) => {
                          const filteredItems = group.items.filter((item) => !popularKeys.has(item.key));
                          if (!filteredItems.length) return null;
                          return (
                          <div key={group.id}>
                            <p className={cn("text-xs font-semibold uppercase tracking-wide mb-3", group.color)}>
                              Groep {group.id} — {group.label}
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                              {filteredItems.map((item) => (
                                <button
                                  key={item.key}
                                  onClick={() => toggleAi(item.key)}
                                  className={cn(
                                    "text-left p-3 rounded-lg border-2 transition-all duration-200 text-sm",
                                    aiSelections.includes(item.key) ? "border-primary bg-accent" : "border-border hover:border-primary/40 bg-background"
                                  )}
                                >
                                  <span className="text-foreground">{item.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                          );
                        })}
                      </div>
                    </div>
                    );
                  })()}

                  {/* Step 3 — Compliance */}
                  {step === 3 && (
                    <div>
                      <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                        {highestGroup === "D"
                          ? "Hoe staat het met de AI-geletterdheid in jouw organisatie?"
                          : "Hoe compliant is jouw organisatie op dit moment?"}
                      </h2>
                      <div className="grid grid-cols-1 gap-3">
                        {complianceOpts.map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => setCompliance(opt.key)}
                            className={cn(
                              "text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-start gap-3",
                              compliance === opt.key ? "border-primary bg-accent" : "border-border hover:border-primary/40 bg-background"
                            )}
                          >
                            <span className="text-xl shrink-0">{opt.emoji}</span>
                            <span className="text-sm font-medium text-foreground">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4 — Org size */}
                  {step === 4 && (
                    <div>
                      <h2 className="text-xl font-display font-semibold text-foreground mb-6">Hoe groot is jouw organisatie?</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {orgOptions.map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => setOrgSize(opt.key)}
                            className={cn(
                              "text-left p-4 rounded-lg border-2 transition-all duration-200",
                              orgSize === opt.key ? "border-primary bg-accent" : "border-border hover:border-primary/40 bg-background"
                            )}
                          >
                            <span className="text-2xl mb-2 block">{opt.emoji}</span>
                            <span className="font-display font-semibold text-foreground block">{opt.title}</span>
                            <span className="text-sm text-muted-foreground block mt-1">{opt.subtitle}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Nav buttons */}
                  <div className="flex items-center justify-between mt-8">
                    {step > 1 ? (
                      <Button variant="ghost" onClick={() => setStep(step - 1)}>
                        <ArrowLeft size={16} /> Vorige stap
                      </Button>
                    ) : (
                      <div />
                    )}
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed}
                      className="bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] text-white border-0 hover:opacity-90"
                    >
                      {step === 4 ? "Bereken mijn risico" : "Volgende stap"} <ArrowRight size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ) : results && (
            <AnimatedSection>
              {/* Results */}
              <Card className="border-border mb-8">
                <CardContent className="p-6 sm:p-8">
                  {/* Risk profile */}
                  <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Jouw risicoprofiel</p>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={cn("text-sm font-semibold px-3 py-1", results.riskColor)}>
                        {results.riskLevel} RISICO
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Van toepassing: {results.articles}</p>
                  </div>

                  {/* Fine amount */}
                  <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Geschat boetebedrag</p>
                    {results.isZeroRisk ? (
                      <div>
                        <p className="text-3xl sm:text-4xl font-display font-bold text-green-700 mb-2">€0 verwacht boeterisico</p>
                        <p className="text-sm text-muted-foreground">
                          {results.isLiteracyOnly
                            ? "Je voldoet aan de AI-geletterdheidsplicht (Artikel 4)."
                            : "Op basis van je huidige compliancestatus is het risico op een boete minimaal."}
                        </p>
                      </div>
                    ) : results.isLiteracyOnly ? (
                      <div>
                        <p className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
                          {formatEuro(results.fineMin)} – {formatEuro(results.fineMax)} per audit
                        </p>
                        <p className="text-sm text-muted-foreground">Handhaving door lidstaten op basis van Artikel 4, EU AI Act.</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
                          {formatEuro(results.fineMin)} – {formatEuro(results.fineMax)}
                        </p>
                        <p className="text-sm text-muted-foreground">Op basis van Art. 99 EU AI Act en jouw organisatieprofiel. Dit is een indicatie, geen juridisch advies.</p>
                      </div>
                    )}
                  </div>

                  {/* Compliance cost comparison */}
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-100">
                    <span className="text-lg">🟢</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Kosten van compliance nu</p>
                      <p className="text-sm text-muted-foreground">
                        Certificeer je medewerkers voor €{results.complianceCost.toLocaleString("nl-NL")} (€249 p.p.) — een fractie van je risico
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              {results.isZeroRisk || results.riskLevel === "LAAG" ? (
                <Card className="border-border mb-6 bg-emerald-50/50">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <span className="text-4xl mb-3 block">🎉</span>
                    <h2 className="text-2xl font-display font-bold text-foreground mb-3">Goed bezig!</h2>
                    <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                      {results.isZeroRisk
                        ? "Je organisatie loopt geen direct boeterisico. Uitstekend voorbereid!"
                        : "Je boeterisico is laag. Blijf alert en houd je compliance actueel."}
                    </p>
                    <Link to="/tools" className="text-sm text-primary font-medium hover:underline">
                      Bekijk onze andere gratis tools →
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border mb-6">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <h2 className="text-2xl font-display font-bold text-foreground mb-3">Verklein je risico vandaag nog.</h2>
                    <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                      De meest directe manier om compliant te worden is het certificeren van je medewerkers. Dat kost minder dan één procent van je mogelijke boete.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button asChild className="bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] text-white border-0 hover:opacity-90">
                        <Link to="/training">Bekijk de training <ArrowRight size={16} /></Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link to="/contact">Vraag een offerte aan</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-center mb-6">
                <Button variant="ghost" onClick={handleReset}>
                  <ArrowLeft size={16} /> Opnieuw berekenen
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Deze calculator geeft een indicatieve schatting op basis van de gepubliceerde tekst van de EU AI Act (Verordening 2024/1689). De uitkomst is geen juridisch advies. Raadpleeg een juridisch adviseur voor bindende uitspraken over jouw specifieke situatie.
              </p>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
};

export default Boetecalculator;
