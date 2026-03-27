import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, ClipboardCheck, Calculator, ShieldCheck, Search } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Button } from "@/components/ui/button";
import DownloadLeadDialog from "@/components/DownloadLeadDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";

const includes = [
  "Invulbare secties voor scope, doelstellingen en verantwoordelijkheden",
  "Governance-structuur: wie beslist over AI-inzet binnen jouw organisatie",
  "Risicoclassificatie-kader op basis van Bijlage III van de AI Act",
  "Secties voor AI-geletterdheid, menselijk toezicht en incidentprocedures",
  "Compliance-verklaring en goedkeuringsproces voor nieuwe AI-toepassingen",
  "Gebaseerd op de officiële tekst van Verordening (EU) 2024/1689",
];

const faqItems = [
  {
    q: "Is een AI-beleid verplicht voor mijn organisatie?",
    a: "Een AI-beleid als losstaand document is niet wettelijk verplicht, maar de EU AI Act verplicht je organisatie wél om aantoonbaar te sturen op verantwoord AI-gebruik. Dat betekent: gedocumenteerde afspraken over welke AI-tools je gebruikt, hoe medewerkers daarmee omgaan en wie verantwoordelijk is bij incidenten. In de praktijk is een AI-beleid de meest directe manier om aan die verplichting te voldoen. Zeker als je hoog-risico AI inzet, zijn schriftelijke procedures geen optie maar een eis.",
  },
  {
    q: "Wat moet er minimaal in een AI-beleid staan?",
    a: "Een goed AI-beleid beschrijft welke AI-tools je organisatie gebruikt, voor welke doeleinden en met welke grenzen. Minimaal dek je: een inventarisatie van ingezette AI-systemen, afspraken over datagebruik en privacy, wie verantwoordelijk is voor AI-beslissingen, hoe medewerkers worden getraind en hoe je omgaat met incidenten of fouten. De EU AI Act voegt hier documentatie-eisen aan toe voor deployers van hoog-risico systemen, zoals risicobeoordelingen en toezichtprocedures. Dit template dekt al deze onderdelen.",
  },
  {
    q: "Hoe lang duurt het om een AI-beleid op te stellen?",
    a: "Met een goed template ben je als HR-manager of compliance officer in één tot twee dagdelen klaar met een eerste versie. De meeste tijd gaat zitten in de inventarisatie van welke AI-tools je organisatie al gebruikt, dat gesprek intern voeren is waardevol op zichzelf. Dit template biedt een kant-en-klare structuur zodat je niet vanaf nul hoeft te beginnen, en bevat instructies per sectie zodat je weet wat je moet invullen.",
  },
  {
    q: "Wat is het verschil tussen een AI-beleid en een AI-strategie?",
    a: "Een AI-strategie beschrijft waar je organisatie naartoe wil met AI: de ambities, investeringen en concurrentievoordelen. Een AI-beleid beschrijft de spelregels: wat mag, wat niet, wie is waarvoor verantwoordelijk en hoe zorg je voor veilig gebruik. Strategie is offensief, beleid is defensief. De EU AI Act vraagt om beleid, niet om strategie. Dit template richt zich daarom volledig op de governance- en compliancekant.",
  },
  {
    q: "Voor welke organisaties is dit template geschikt?",
    a: "Het template is ontwikkeld voor Nederlandse organisaties die AI-tools inzetten in hun dagelijkse werk, van ChatGPT tot gespecialiseerde HR- of financiële systemen. Het is direct toepasbaar voor compliance officers, HR-managers en directeuren die moeten aantonen dat hun organisatie voldoet aan de AI-geletterdheidsplicht van de EU AI Act (van kracht sinds 2 februari 2025). Zowel het MKB als grotere organisaties kunnen het template gebruiken: het is modulair opgebouwd en aanpasbaar aan de omvang en sector van jouw organisatie.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const relatedTools = [
  { title: "AI Act Compliance Checklist", description: "Stap-voor-stap checklist voor deployers.", icon: ClipboardCheck, href: "/tools/downloads/ai-act-compliance-checklist" },
  { title: "Boetecalculator", description: "Bereken het boeterisico voor jouw organisatie.", icon: Calculator, href: "/tools/boetecalculator" },
  { title: "AI Use Case Checker", description: "Controleer of jouw AI-toepassing hoog risico is.", icon: Search, href: "/ai-use-case-checker" },
  { title: "AI Risicoscan", description: "Organisatiebreed risicoprofiel van al je AI-tools.", icon: ShieldCheck, href: "/tools/ai-risicoscan" },
];

const BeleidstemplateLanding = () => {
  const [showLeadDialog, setShowLeadDialog] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <SEO
        title="AI Beleid Opstellen: Gratis Template voor EU AI Act Compliance | AIGA"
        description="Download een gratis, invulbaar AI-beleidstemplate. Voldoe aan de documentatie-eisen van de EU AI Act met een kant-en-klaar organisatiebeleid voor verantwoord AI-gebruik."
        canonical="/tools/downloads/ai-beleid-opstellen"
        jsonLd={faqJsonLd}
      />
      <BreadcrumbNav items={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: "Downloads", href: "/tools/downloads" },
        { label: "AI-beleid opstellen" },
      ]} />

      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="GRATIS DOWNLOAD" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              AI-beleid opstellen:<br />
              <span className="text-primary">gratis template.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Elke organisatie die AI inzet heeft een intern AI-beleid nodig. Dit template geeft je een kant-en-klare structuur die je kunt aanpassen aan jouw organisatie, van scope en governance tot risicoclassificatie en incidentprocedures.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
              De EU AI Act verplicht organisaties om beleid en procedures te documenteren rondom het gebruik van AI-systemen. Zonder een vastgelegd AI-beleid loop je het risico om bij een audit niet te kunnen aantonen dat je verantwoord met AI omgaat. Dit template helpt je om in één middag een solide basis neer te zetten.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
              Geschikt voor HR-managers, compliance officers, directieleden en IT-leads die AI-governance willen formaliseren voordat de handhaving start in augustus 2025.
            </p>
            <Button
              size="lg"
              onClick={() => setShowLeadDialog(true)}
              className="mt-8 btn-neon"
            >
              Download gratis <ArrowRight size={16} />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* What's included */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="WAT ZIT ERIN?" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-4 mb-8">
              Een compleet AI-beleid in één document.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="space-y-4 max-w-2xl">
            {includes.map((item, i) => (
              <StaggerItem key={i}>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground leading-relaxed">{item}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="VEELGESTELDE VRAGEN" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-4 mb-8">
              Vragen over het AI-beleid template
            </h2>
          </AnimatedSection>
          <div className="max-w-2xl">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base font-semibold">{faq.q}</AccordionTrigger>
                  <AccordionContent><p className="text-muted-foreground leading-relaxed">{faq.a}</p></AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="GERELATEERDE TOOLS" />
            <h2 className="text-2xl font-display font-bold text-foreground mt-4 mb-6">
              Meer tools voor jouw AI Act compliance.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <StaggerItem key={tool.title}>
                  <Link to={tool.href} className="block h-full">
                    <Card className="h-full border-border hover:border-primary/40 neon-glow transition-all duration-300 group">
                      <CardContent className="p-5 flex flex-col gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                          <Icon size={20} className="text-primary" />
                        </div>
                        <h3 className="text-sm font-display font-semibold text-foreground">{tool.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                        <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                          Bekijk <ArrowRight size={14} />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <DownloadLeadDialog
        open={showLeadDialog}
        onOpenChange={setShowLeadDialog}
        document="template"
        onSuccess={() => navigate("/tools/downloads/ai-beleid-opstellen/document")}
      />
    </div>
  );
};

export default BeleidstemplateLanding;
