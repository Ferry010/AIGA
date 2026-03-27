import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";

const deadlines = [
  { date: "2 februari 2025", label: "Al van kracht", description: "AI-geletterdheidsplicht voor alle medewerkers en verbod op onaanvaardbare AI-toepassingen (zoals sociale scoring en real-time biometrische identificatie in openbare ruimtes).", active: true },
  { date: "2 augustus 2025", label: "Binnenkort", description: "Verplichtingen voor aanbieders van general-purpose AI-modellen (GPAI), zoals grote taalmodellen. Transparantie-eisen en documentatieplichten treden in werking.", active: false },
  { date: "2 augustus 2026", label: "In voorbereiding", description: "Verplichtingen voor hoog-risico AI-systemen uit Bijlage III. Dit raakt deployers het hardst: conformiteitsbeoordelingen, menselijk toezicht, logging en incidentmelding worden verplicht.", active: false },
  { date: "2 augustus 2027", label: "Volledige handhaving", description: "Alle overige bepalingen van de AI Act worden gehandhaafd. Vanaf dit moment zijn alle verplichtingen volledig van kracht voor alle partijen in de AI-waardeketen.", active: false },
];

const faqItems = [
  { q: "Is de AI Act al van kracht?", a: "Ja. De EU AI Act (Verordening 2024/1689) is op 1 augustus 2024 in werking getreden. Sinds 2 februari 2025 gelden de eerste verplichtingen, waaronder de AI-geletterdheidsplicht en het verbod op onaanvaardbare AI-toepassingen. De wet geldt rechtstreeks in alle EU-lidstaten, inclusief Nederland." },
  { q: "Geldt de AI Act ook voor kleine bedrijven?", a: "Ja. De AI Act maakt geen uitzondering op basis van bedrijfsgrootte. Elke organisatie die AI-systemen aanbiedt of inzet valt onder de wet. Voor MKB en startups geldt wel een proportioneel boeteregime (Artikel 99 lid 6), waardoor de feitelijke boete lager uitvalt dan het nominale maximum." },
  { q: "Wat is de boete bij niet-naleving?", a: "De boetes zijn opgedeeld in drie categorieën. Verboden AI-toepassingen: tot 35 miljoen euro of 7% van de wereldwijde jaaromzet. Niet-naleving van hoog-risico verplichtingen: tot 15 miljoen euro of 3%. Overige overtredingen: tot 7,5 miljoen euro of 1,5%. Handhaving in Nederland wordt uitgevoerd door de Autoriteit Persoonsgegevens." },
  { q: "Hoe weet ik of mijn organisatie AI-geletterd genoeg is?", a: "De AIGA AI Gereedheidscan meet in drie minuten hoe gereed jouw organisatie is op vijf dimensies: AI-gebruik, bewustzijn van wetgeving, risicobeheer, leiderschap en audit-readiness. Na afloop ontvang je een concreet scorerapport met verbeterpunten." },
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

const AiActDeadlines = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="AI Act Deadlines Nederland 2025-2027 | Wanneer moet jouw organisatie compliant zijn? | AIGA"
        description="Overzicht van alle EU AI Act deadlines van 2025 tot 2027. Ontdek wanneer jouw organisatie moet voldoen aan de AI-geletterdheidsplicht, hoog-risico verplichtingen en volledige handhaving."
        canonical="/ai-act-deadlines"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <BreadcrumbNav items={[
        { label: "Home", href: "/" },
        { label: "Kenniscentrum", href: "/kenniscentrum" },
        { label: "AI Act Deadlines" },
      ]} />

      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="AI ACT TIJDLIJN" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              AI Act deadlines: wanneer moet jouw<br />
              <span className="text-primary">organisatie compliant zijn?</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              De EU AI Act wordt gefaseerd ingevoerd. Niet alle verplichtingen gelden tegelijkertijd. Dat klinkt als goed nieuws, maar het betekent ook dat sommige deadlines al verstreken zijn terwijl veel organisaties nog niet begonnen zijn.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
              Sinds 2 februari 2025 is de AI-geletterdheidsplicht actief. Organisaties die AI-systemen gebruiken moeten aantoonbaar investeren in de kennis en vaardigheden van hun medewerkers. In augustus 2025 volgen verplichtingen voor aanbieders van grote taalmodellen, en in 2026 worden de zwaarste eisen voor hoog-risico systemen van kracht.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
              Hieronder vind je een compleet overzicht van de vier belangrijkste deadlines, wat ze inhouden en wat jouw organisatie nu al moet regelen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="TIJDLIJN" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-4 mb-10">
              Vier deadlines die elke organisatie moet kennen.
            </h2>
          </AnimatedSection>
          <div className="max-w-2xl relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border" />
            <div className="space-y-8">
              {deadlines.map((dl, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <div className="flex gap-5 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${dl.active ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
                      <CalendarCheck size={18} />
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-mono font-bold text-foreground">{dl.date}</span>
                        <span className={`text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${dl.active ? "bg-primary/10 text-primary" : "bg-accent text-muted-foreground"}`}>
                          {dl.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{dl.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explanation section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="CONCREET" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-4 mb-6">
              Wat betekent dit concreet voor mijn organisatie?
            </h2>
          </AnimatedSection>
          <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              De eerste deadline is al gepasseerd. Sinds februari 2025 moeten alle organisaties die AI-systemen gebruiken zorgen dat hun medewerkers voldoende AI-geletterd zijn. Dit geldt niet alleen voor techteams, maar voor iedereen die met AI-tools werkt: van marketing tot HR, van klantenservice tot directie.
            </p>
            <p>
              In de praktijk betekent dit dat je moet kunnen aantonen dat medewerkers getraind zijn in het verantwoord gebruik van AI. Een formeel certificaat is de sterkste manier om dat bij een audit te bewijzen. Informele kennis of een intern mailtje volstaat niet.
            </p>
            <p>
              De deadline van augustus 2026 raakt organisaties die hoog-risico AI-systemen inzetten het hardst. Denk aan AI voor sollicitantenscreening, kredietbeoordeling of medische diagnose. Voor deze systemen gelden strenge eisen rondom documentatie, menselijk toezicht en incidentmelding.
            </p>
            <p>
              Wacht niet tot de deadline nadert. Compliance opbouwen kost tijd: beleid schrijven, medewerkers trainen, processen inrichten. Organisaties die nu beginnen, hebben in 2026 een voorsprong. Organisaties die wachten, riskeren boetes tot 35 miljoen euro.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="VEELGESTELDE VRAGEN" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-4 mb-8">
              Vragen over de AI Act deadlines
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

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">Check hoe gereed jouw organisatie is</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                De AIGA AI Gereedheidscan meet in drie minuten hoe jouw organisatie scoort op AI-gebruik, wetgeving, risicobeheer, leiderschap en audit-readiness.
              </p>
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(330,80%,55%)] hover:opacity-90 text-white"
              >
                <Link to="/gereedheidscan">
                  Doe de gratis AI Gereedheidscan <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default AiActDeadlines;
