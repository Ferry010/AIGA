import { Mail, Download, Check, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";

const SectionLabel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-sm md:text-[11px] font-bold uppercase tracking-wider neon-text mb-2 ${className}`}>{children}</h3>
);

const mailtoHref =
  "mailto:?subject=EU%20AI%20Act%20in%201%20A4%20%E2%80%94%20AIGA%20Academy&body=Bekijk%20deze%20overzichtspagina%20van%20de%20EU%20AI%20Act%3A%20https%3A%2F%2Faigeletterdheid.academy%2Fkenniscentrum%2Feu-ai-act-in-1-a4";

const timelineItems = [
  { date: "1 aug 2024", label: "AI Act in werking getreden", active: true, warn: false },
  { date: "2 feb 2025", label: "Verboden AI-praktijken + AI-geletterdheidsplicht (Artikel 4)", active: true, warn: false, badge: "ACTIEF" },
  { date: "2 aug 2025", label: "Verplichtingen GPAI-modellen", active: true, warn: false, badge: "ACTIEF" },
  { date: "2 aug 2026", label: "Volledige handhaving hoog-risico systemen", active: false, warn: true, badge: "DEADLINE" },
];

const riskCategories = [
  {
    label: "Verboden",
    color: "bg-red-100 border-red-300 text-red-900",
    dotColor: "bg-red-500",
    examples: "Sociale scoring door overheden, manipulatieve AI, real-time biometrische identificatie in openbare ruimte",
  },
  {
    label: "Hoog risico — zwaarste verplichtingen",
    color: "bg-amber-50 border-amber-300 text-amber-900",
    dotColor: "bg-amber-500",
    examples: "Biometrie · Kritieke infrastructuur · Onderwijs · Werving & HR · Essentiële diensten (krediet, zorg, uitkeringen) · Rechtshandhaving · Migratie · Rechtsbedeling",
  },
  {
    label: "Beperkt risico — transparantieplicht",
    color: "bg-yellow-50 border-yellow-300 text-yellow-900",
    dotColor: "bg-yellow-500",
    examples: "Chatbots, deepfakes, AI-gegenereerde content. Gebruikers moeten weten dat ze met AI interageren.",
  },
  {
    label: "Minimaal risico — geen verplichtingen",
    color: "bg-green-50 border-green-300 text-green-900",
    dotColor: "bg-green-500",
    examples: "Spamfilters, AI in videogames, aanbevelingssystemen in privécontext",
  },
];

const EuAiActA4 = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="EU AI Act in 1 A4 — Samenvatting | AIGA Academy"
        description="De volledige EU AI Act samengevat op 1 A4. Tijdlijn, risicocategorieën, verplichtingen en boetes — printbaar en deelbaar."
        canonical="/kenniscentrum/eu-ai-act-in-1-a4"
      />
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Kenniscentrum", href: "/kenniscentrum" },
          { label: "EU AI Act in 1 A4" },
        ]}
      />

      {/* Action bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 print:hidden">
        <div className="flex justify-end gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href={mailtoHref}>
              <Mail size={16} />
              Doorsturen
            </a>
          </Button>
          <Button size="sm" onClick={() => window.print()}>
            <Download size={16} />
            Opslaan als PDF
          </Button>
        </div>
      </div>

      {/* A4 document */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 print:p-0 print:max-w-none">
        <div
          id="a4-document"
          className="bg-white border border-border shadow-sm mx-auto print:border-none print:shadow-none print:mx-0 md:aspect-[1/1.414]"
          style={{ maxWidth: "794px" }}
        >
          <div className="p-5 sm:p-8 flex flex-col h-full text-foreground text-base md:text-[12px] leading-relaxed md:leading-[1.5]">
            {/* ── Header ── */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs md:text-[9px] text-muted-foreground tracking-wide">AI Geletterdheid Academy — aigeletterdheid.academy</p>
                <h1 className="text-2xl sm:text-3xl font-bold mt-1 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  EU AI Act in 1 A4
                </h1>
                <p className="text-muted-foreground text-sm md:text-[11px] mt-0.5">De Europese AI-verordening — wat je moet weten als organisatie</p>
              </div>
              <span className="text-xs md:text-[9px] text-muted-foreground whitespace-nowrap mt-1">Versie maart 2026</span>
            </div>

            <hr className="border-border mb-3" />

            {/* ── Blok 1: Achtergrond ── */}
            <div className="mb-3">
              <SectionLabel>Achtergrond</SectionLabel>
              <p>
                De EU AI Act (Verordening 2024/1689) is de eerste bindende AI-wet ter wereld. Hij regelt hoe AI-systemen ontwikkeld, aangeboden en gebruikt mogen worden in de Europese Unie. De wet geldt voor alle organisaties die AI gebruiken — ongeacht of ze in de EU gevestigd zijn.
              </p>
            </div>

            {/* ── Blok 2: Tijdlijn ── */}
            <div className="mb-3">
              <SectionLabel>Inwerkingtreding</SectionLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0 mt-2 md:mt-1 relative">
                {/* Connecting line — desktop only */}
                <div className="hidden md:block absolute top-[7px] left-[7px] right-[7px] h-[2px] bg-border" />
                {timelineItems.map((item, i) => (
                  <div key={i} className="relative z-10 flex md:flex-col items-start md:items-center md:text-center gap-2 md:gap-0 px-0 md:px-1">
                    <div className={`w-[14px] h-[14px] rounded-full border-2 shrink-0 ${item.warn ? "border-amber-500 bg-amber-100" : item.active ? "border-primary bg-primary" : "border-border bg-background"}`} />
                    <div className="flex flex-col md:items-center">
                      <span className="font-bold text-sm md:text-[10px] leading-tight md:mt-1">{item.date}</span>
                      {item.badge && (
                        <span className={`text-xs md:text-[8px] font-bold px-1 rounded mt-0.5 w-fit ${item.warn ? "bg-amber-100 text-amber-700" : "bg-primary/10 text-primary"}`}>
                          {item.badge === "ACTIEF" ? "✓ " : "⚠ "}{item.badge}
                        </span>
                      )}
                      <span className="text-sm md:text-[9px] text-muted-foreground leading-tight mt-0.5">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm md:text-[9px] text-muted-foreground italic mt-2 md:mt-1.5">
                De AI-geletterdheidsplicht geldt al — organisaties zijn nu al verplicht medewerkers te trainen.
              </p>
            </div>

            {/* ── Blok 3: Risicocategorieën ── */}
            <div className="mb-3">
              <SectionLabel>Risicoclassificatie</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-1">
                {riskCategories.map((cat) => (
                  <div key={cat.label} className={`border rounded-lg p-2.5 md:p-2 ${cat.color}`}>
                    <div className="flex items-center gap-1 mb-1">
                      <div className={`w-2 h-2 rounded-full ${cat.dotColor} print:border print:border-current`} />
                      <span className="font-bold text-sm md:text-[10px] leading-tight">{cat.label}</span>
                    </div>
                    <p className="text-sm md:text-[9px] leading-snug">{cat.examples}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Blok 4: Artikel 4 ── */}
            <div className="mb-3">
              <SectionLabel>Jouw verplichting</SectionLabel>
              <p className="mb-1.5">
                Artikel 4 geldt voor alle organisaties die AI gebruiken — ongeacht risicocategorie. De verplichting is al van kracht sinds 2 februari 2025.
              </p>
              <ul className="space-y-1">
                {[
                  "Zorg dat medewerkers die AI gebruiken voldoende AI-geletterd zijn — afgestemd op hun rol en het systeem dat ze gebruiken",
                  "Documenteer welke AI-systemen je inzet en welke trainingen medewerkers gevolgd hebben",
                  "Pas het trainingsniveau aan op de risicocategorie van het systeem en de functie van de medewerker",
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check size={13} className="text-primary shrink-0 mt-0.5 print:text-black" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Blok 5: Hoog risico verplichtingen ── */}
            <div className="mb-3">
              <SectionLabel>Hoog risico — extra verplichtingen</SectionLabel>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <div>
                  <p className="font-bold text-sm md:text-[10px] mb-1">Voor aanbieders (providers):</p>
                  <ul className="space-y-1 md:space-y-0.5">
                    {["Conformiteitsbeoordeling uitvoeren", "Technische documentatie opstellen", "Registratie in EU-database", "CE-markering aanbrengen"].map((t) => (
                      <li key={t} className="flex items-start gap-1.5">
                        <CheckCircle2 size={11} className="text-primary shrink-0 mt-0.5 print:text-black" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-sm md:text-[10px] mb-1">Voor gebruikers (deployers):</p>
                  <ul className="space-y-1 md:space-y-0.5">
                    {["Menselijk toezicht implementeren", "Medewerkers trainen op het specifieke systeem", "Logboek bijhouden van AI-beslissingen", "Incidenten melden aan toezichthouder"].map((t) => (
                      <li key={t} className="flex items-start gap-1.5">
                        <CheckCircle2 size={11} className="text-primary shrink-0 mt-0.5 print:text-black" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ── Blok 6: Boetes ── */}
            <div className="mb-3">
              <SectionLabel>Handhaving</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                {[
                  { amount: "Tot €35 miljoen", pct: "of 7% wereldwijde omzet", desc: "Verboden AI-praktijken" },
                  { amount: "Tot €15 miljoen", pct: "of 3% wereldwijde omzet", desc: "Overtreding verplichtingen hoog-risico systemen" },
                  { amount: "Tot €7,5 miljoen", pct: "of 1,5% wereldwijde omzet", desc: "Onjuiste informatie aan toezichthouder" },
                ].map((fine) => (
                  <div key={fine.amount} className="border border-border rounded-lg p-3 md:p-2 text-center">
                    <p className="font-bold text-base md:text-[12px] leading-tight neon-text print:text-black">{fine.amount}</p>
                    <p className="text-sm md:text-[9px] text-muted-foreground">{fine.pct}</p>
                    <p className="text-sm md:text-[10px] mt-1 leading-tight">{fine.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm md:text-[9px] text-muted-foreground mt-1">
                De hoogste boete geldt voor de zwaarste overtreding. Voor MKB gelden proportionele maxima.
              </p>
            </div>

            {/* ── Document footer ── */}
            <div className="mt-auto pt-2 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-sm md:text-[9px] text-muted-foreground">
              <span className="font-bold neon-text print:text-black">AIGA</span>
              <span>© 2026 AI Geletterdheid Academy — aigeletterdheid.academy</span>
              <span>Artikel 4 EU AI Act training: €249 per medewerker</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EuAiActA4;
