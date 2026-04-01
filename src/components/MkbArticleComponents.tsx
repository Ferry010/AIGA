import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/* ── Risk Table ── */
const RISK_ROWS = [
  { role: "Klantenservice medewerker", risk: "AI kan hallucineren; antwoorden altijd controleren" },
  { role: "Accountant", risk: "AI-modellen kunnen afwijken op kleine datasets" },
  { role: "HR-medewerker", risk: "AI-selectietools kunnen bias bevatten" },
  { role: "Marketeer", risk: "Gegenereerde content kan feitelijke fouten bevatten" },
  { role: "Jurist", risk: "AI kan verouderde wetgeving citeren" },
];

export const MkbRiskTable = () => (
  <AnimatedSection delay={0.05}>
    <div className="mt-10 bg-card border border-border rounded-2xl p-6 sm:p-8">
      <h3 className="text-lg font-display font-semibold text-foreground mb-5">Welk AI-risico geldt voor jouw rol?</h3>
      <div className="space-y-3">
        {RISK_ROWS.map((r) => (
          <div key={r.role} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 border-l-4 border-primary pl-4 py-2">
            <span className="font-semibold text-foreground text-sm min-w-[200px]">{r.role}</span>
            <span className="text-sm text-muted-foreground">{r.risk}</span>
          </div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

/* ── Comparison Table ── */
const COMPARISON_ROWS = [
  { situatie: "Geen training, geen documentatie", consequentie: "Boete bij audit" },
  { situatie: "Incident met AI, geen beleid", consequentie: "Aansprakelijkheidsrisico" },
  { situatie: "Klant vraagt naar AI-beleid, niets op papier", consequentie: "Verlies van opdracht" },
  { situatie: "Investeerder checkt compliance", consequentie: "Negatieve beoordeling" },
];

export const MkbComparisonTable = () => (
  <AnimatedSection delay={0.08}>
    <div className="mt-10 bg-card border border-border rounded-2xl p-6 sm:p-8">
      <h3 className="text-lg font-display font-semibold text-foreground mb-5">Kosten van wel vs. niet compliant</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 pr-4 font-semibold text-foreground">Situatie</th>
              <th className="text-left py-3 font-semibold text-destructive">Mogelijke consequentie</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((r) => (
              <tr key={r.situatie} className="border-b border-border last:border-0">
                <td className="py-3 pr-4 text-muted-foreground">{r.situatie}</td>
                <td className="py-3 text-destructive font-medium">{r.consequentie}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </AnimatedSection>
);

/* ── 5-Step Progress Tracker ── */
const STEPS = [
  {
    title: "Inventariseer je AI-gebruik",
    summary: "Breng in kaart welke tools je gebruikt, waarvoor en door wie.",
    detail: "Maak een tabel met per tool het doel, de gebruikers en het risiconiveau. Een simpele spreadsheet volstaat als startpunt.",
  },
  {
    title: "Kies een gecertificeerde basistraining",
    summary: "Zoek een Nederlandstalige training die aansluit op de EU AI Act.",
    detail: "Let op: de training moet individueel certificeerbaar zijn, in het Nederlands beschikbaar zijn en specifiek aansluiten op artikel 4 van de EU AI Act.",
  },
  {
    title: "Bewaar certificaten centraal",
    summary: "Sla per medewerker het bewijs van training op in het personeelsdossier.",
    detail: "Voeg een korte notitie bij over welke AI-tools door die persoon worden gebruikt. Dat is het fundament van je AI-geletterdheidsbeleid.",
  },
  {
    title: "Stel een intern beleid op (een A4)",
    summary: "Documenteer goedgekeurde tools, verificatieprocedures en meldpunten.",
    detail: "Je hoeft geen juridisch document te schrijven. Een A4 met goedgekeurde tools, verificatierichtlijnen, aanspreekpunt en incidentprocedure volstaat.",
  },
  {
    title: "Plan een jaarlijkse herhalingscheck",
    summary: "AI-gebruik evolueert snel, dus check jaarlijks of je beleid actueel is.",
    detail: "Een jaarlijkse evaluatie van je AI-inventarisatie en beleid is genoeg om bij te blijven. Plan het als terugkerend agendapunt.",
  },
];

export const MkbStepTracker = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);

  return (
    <AnimatedSection delay={0.1}>
      <div className="mt-10 bg-card border border-border rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-display font-semibold text-foreground mb-6">Zo word je compliant in 5 stappen</h3>
        <div className="space-y-4">
          {STEPS.map((step, i) => {
            const isOpen = openStep === i;
            return (
              <button
                key={i}
                onClick={() => setOpenStep(isOpen ? null : i)}
                className="w-full text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground text-sm">{step.title}</p>
                      <ChevronDown
                        size={16}
                        className={cn(
                          "text-muted-foreground transition-transform duration-200 shrink-0 ml-2",
                          isOpen && "rotate-180"
                        )}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{step.summary}</p>
                    {isOpen && (
                      <div className="mt-3 p-3 bg-accent rounded-lg text-sm text-muted-foreground leading-relaxed border border-primary/10">
                        {step.detail}
                      </div>
                    )}
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="ml-4 border-l-2 border-primary/20 h-4 mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
};

/* ── MKB FAQ Accordion ── */
interface FaqItem {
  q: string;
  a: string;
}

export const MkbFaqAccordion = ({ items }: { items: FaqItem[] }) => (
  <AnimatedSection delay={0.12}>
    <div className="mt-12">
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Veelgestelde vragen over de AI-geletterdheidsplicht voor het MKB</h2>
      <Accordion type="single" collapsible className="w-full">
        {items.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-primary/20">
            <AccordionTrigger className="text-left text-base font-semibold">{faq.q}</AccordionTrigger>
            <AccordionContent><p className="text-muted-foreground leading-relaxed">{faq.a}</p></AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </AnimatedSection>
);

/* ── CTA Banner ── */
export const MkbCtaBanner = () => (
  <AnimatedSection delay={0.14}>
    <div className="mt-12 p-8 bg-primary text-primary-foreground rounded-2xl text-center">
      <h2 className="text-2xl font-display font-bold mb-3">Weet je al hoe jouw organisatie ervoor staat?</h2>
      <p className="opacity-90 mb-6 max-w-xl mx-auto">
        Doe de gratis AI Gereedheidscan: in 3 minuten je risicoprofiel. Geen registratie vereist.
      </p>
      <Button asChild variant="secondary" size="lg">
        <Link to="/gereedheidscan">Start de scan →</Link>
      </Button>
    </div>
  </AnimatedSection>
);

/* ── "Lees ook" links ── */
export const MkbLeesOok = () => (
  <AnimatedSection delay={0.16}>
    <div className="mt-10 space-y-2">
      <p className="text-sm font-semibold text-foreground mb-3">Lees ook</p>
      <Link to="/tools/downloads/ai-act-compliance-checklist" className="block text-sm text-primary hover:underline">
        AI Act compliance checklist voor kleine bedrijven →
      </Link>
      <Link to="/kenniscentrum/ai-geletterdheidsplicht-zo-voldoe-je-in-5-stappen-aiga" className="block text-sm text-primary hover:underline">
        AI-geletterdheidsplicht: zo voldoe je in 5 stappen →
      </Link>
      <Link to="/training" className="block text-sm text-primary hover:underline">
        De AI-geletterdheidsmodule van AIGA →
      </Link>
    </div>
  </AnimatedSection>
);
