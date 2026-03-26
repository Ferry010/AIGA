import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Building, Building2, Factory, Landmark } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";
import { cn } from "@/lib/utils";

type OrgSize = "micro" | "small" | "medium" | "large" | null;
type ComplianceStatus = "full" | "partial" | "barely" | "none" | null;

const orgOptions = [
  { key: "micro" as const, icon: Building, title: "Micro-onderneming", subtitle: "Minder dan 10 medewerkers, max €2M omzet", emoji: "🏢" },
  { key: "small" as const, icon: Building2, title: "Klein bedrijf", subtitle: "10–49 medewerkers, max €10M omzet", emoji: "🏬" },
  { key: "medium" as const, icon: Factory, title: "Middelgroot bedrijf", subtitle: "50–249 medewerkers, max €50M omzet", emoji: "🏭" },
  { key: "large" as const, icon: Landmark, title: "Groot bedrijf", subtitle: "250+ medewerkers of meer dan €50M omzet", emoji: "🏦" },
];

const aiUsageOptions = [
  { key: "generative", label: "Generatieve AI (ChatGPT, Copilot, Gemini)", emoji: "🤖" },
  { key: "automated", label: "Geautomatiseerde beslissingen (krediet, HR-selectie, scoring)", emoji: "📊" },
  { key: "medical", label: "AI in medische of veiligheidskritieke omgevingen", emoji: "🏥" },
  { key: "biometric", label: "Biometrische herkenning of gezichtsherkenning", emoji: "📷" },
  { key: "marketing", label: "AI-gegenereerde content voor marketing of communicatie", emoji: "📣" },
  { key: "monitoring", label: "Monitoring of tracking van medewerkers met AI", emoji: "🔍" },
  { key: "unknown", label: "Ik weet het niet precies", emoji: "❓" },
];

const complianceOptions = [
  { key: "full" as const, label: "We zijn volledig compliant (training + documentatie + beleid)", emoji: "✅" },
  { key: "partial" as const, label: "Gedeeltelijk compliant (sommige stappen gezet, niet alles gedocumenteerd)", emoji: "📋" },
  { key: "barely" as const, label: "Nauwelijks compliant (bewustzijn aanwezig maar geen formele stappen)", emoji: "⚠️" },
  { key: "none" as const, label: "Niet compliant (geen actie ondernomen)", emoji: "❌" },
];

const turnoverMap: Record<string, number> = { micro: 1_000_000, small: 5_000_000, medium: 25_000_000, large: 100_000_000 };
const seatMap: Record<string, number> = { micro: 10, small: 30, medium: 100, large: 250 };
const complianceMultiplier: Record<string, number> = { full: 0.1, partial: 0.4, barely: 0.7, none: 1.0 };

function formatEuro(n: number): string {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1).replace(".0", "")}M`;
  if (n >= 1_000) return `€${Math.round(n / 1_000).toLocaleString("nl-NL")}.000`;
  return `€${Math.round(n).toLocaleString("nl-NL")}`;
}

function calculateResults(orgSize: OrgSize, aiUsage: string[], compliance: ComplianceStatus) {
  const turnover = turnoverMap[orgSize!];
  const seats = seatMap[orgSize!];
  const mult = complianceMultiplier[compliance!];

  const hasProhibited = aiUsage.includes("biometric") || aiUsage.includes("medical");
  const hasHighRisk = aiUsage.includes("automated") || aiUsage.includes("monitoring");

  let tierPercent: number;
  let tierCap: number;
  if (hasProhibited) {
    tierPercent = 0.07;
    tierCap = 35_000_000;
  } else if (hasHighRisk) {
    tierPercent = 0.03;
    tierCap = 15_000_000;
  } else {
    tierPercent = 0.015;
    tierCap = 7_500_000;
  }

  const rawMax = Math.min(turnover * tierPercent, tierCap);
  const fineMax = rawMax * mult;
  const fineMin = fineMax * 0.5;
  const likelyMax = fineMax * 0.6;
  const likelyMin = fineMax * 0.2;
  const legalMax = Math.min(turnover * tierPercent, tierCap);
  const complianceCost = seats * 249;

  let riskLevel: "LAAG" | "GEMIDDELD" | "HOOG";
  let riskColor: string;
  if (mult <= 0.1) {
    riskLevel = "LAAG";
    riskColor = "bg-green-100 text-green-800 border-green-200";
  } else if (mult <= 0.4) {
    riskLevel = "GEMIDDELD";
    riskColor = "bg-orange-100 text-orange-800 border-orange-200";
  } else {
    riskLevel = "HOOG";
    riskColor = "bg-red-100 text-red-800 border-red-200";
  }

  return { fineMin, fineMax, likelyMin, likelyMax, legalMax, complianceCost, riskLevel, riskColor };
}

const Boetecalculator = () => {
  const [step, setStep] = useState(1);
  const [orgSize, setOrgSize] = useState<OrgSize>(null);
  const [aiUsage, setAiUsage] = useState<string[]>([]);
  const [compliance, setCompliance] = useState<ComplianceStatus>(null);
  const [showResults, setShowResults] = useState(false);

  const toggleAiUsage = (key: string) => {
    setAiUsage((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const canProceed = step === 1 ? !!orgSize : step === 2 ? aiUsage.length > 0 : !!compliance;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else setShowResults(true);
  };

  const results = showResults ? calculateResults(orgSize, aiUsage, compliance) : null;

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
                    <span className="text-sm font-medium text-muted-foreground">Stap {step} van 3</span>
                    <span className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}%</span>
                  </div>
                  <Progress value={(step / 3) * 100} className="h-2 mb-8" />

                  {/* Step 1 */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-xl font-display font-semibold text-foreground mb-6">Hoe groot is jouw organisatie?</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {orgOptions.map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => setOrgSize(opt.key)}
                            className={cn(
                              "text-left p-4 rounded-lg border-2 transition-all duration-200",
                              orgSize === opt.key
                                ? "border-primary bg-accent"
                                : "border-border hover:border-primary/40 bg-background"
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

                  {/* Step 2 */}
                  {step === 2 && (
                    <div>
                      <h2 className="text-xl font-display font-semibold text-foreground mb-2">Welke AI-toepassingen gebruikt jouw organisatie?</h2>
                      <p className="text-sm text-muted-foreground mb-6">Meerdere antwoorden mogelijk</p>
                      <div className="grid grid-cols-1 gap-3">
                        {aiUsageOptions.map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => toggleAiUsage(opt.key)}
                            className={cn(
                              "text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-start gap-3",
                              aiUsage.includes(opt.key)
                                ? "border-primary bg-accent"
                                : "border-border hover:border-primary/40 bg-background"
                            )}
                          >
                            <span className="text-xl shrink-0">{opt.emoji}</span>
                            <span className="text-sm font-medium text-foreground">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <div>
                      <h2 className="text-xl font-display font-semibold text-foreground mb-6">Wat is de huidige compliancestatus van jouw organisatie?</h2>
                      <div className="grid grid-cols-1 gap-3">
                        {complianceOptions.map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => setCompliance(opt.key)}
                            className={cn(
                              "text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-start gap-3",
                              compliance === opt.key
                                ? "border-primary bg-accent"
                                : "border-border hover:border-primary/40 bg-background"
                            )}
                          >
                            <span className="text-xl shrink-0">{opt.emoji}</span>
                            <span className="text-sm font-medium text-foreground">{opt.label}</span>
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
                      {step === 3 ? "Bereken mijn risico" : "Volgende stap"} <ArrowRight size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ) : results && (
            <AnimatedSection>
              {/* Results card */}
              <Card className="border-border mb-8">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className={cn("text-sm font-semibold px-3 py-1", results.riskColor)}>
                      {results.riskLevel} RISICO
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">Geschat boetebedrag</p>
                  <p className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
                    {formatEuro(results.fineMin)} – {formatEuro(results.fineMax)}
                  </p>
                  <p className="text-sm text-muted-foreground mb-8">
                    Gebaseerd op Artikel 99 EU AI Act en jouw organisatieprofiel
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-100">
                      <span className="text-lg">🔴</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Maximale wettelijke boete</p>
                        <p className="text-sm text-muted-foreground">{formatEuro(results.legalMax)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-orange-50 border border-orange-100">
                      <span className="text-lg">🟡</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Meest waarschijnlijke boete bij audit</p>
                        <p className="text-sm text-muted-foreground">{formatEuro(results.likelyMin)} – {formatEuro(results.likelyMax)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-100">
                      <span className="text-lg">🟢</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Kosten van compliance nu</p>
                        <p className="text-sm text-muted-foreground">€{results.complianceCost.toLocaleString("nl-NL")} — aanzienlijk minder</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="border-border">
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

              <p className="text-xs text-muted-foreground mt-6 text-center leading-relaxed">
                Deze calculator geeft een indicatie op basis van publiek beschikbare AI Act-teksten. Het is geen juridisch advies. Raadpleeg een jurist voor bindende uitspraken.
              </p>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
};

export default Boetecalculator;
