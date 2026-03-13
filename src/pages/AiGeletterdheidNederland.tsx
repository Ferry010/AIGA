import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import SEO from "@/components/SEO";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import DefinitionBlock from "@/components/DefinitionBlock";

const AiGeletterdheidNederland = () => (
  <div className="min-h-screen">
    <SEO
      title="AI-Geletterdheid in Nederland | Alles wat je moet weten | AIGA"
      description="Alles over AI-geletterdheid in Nederland: EU AI Act vereisten, Rijksoverheid verwachtingen en hoe Nederlandse organisaties AI-geletterdheid implementeren."
      canonical="/ai-geletterdheid-nederland"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "AI-Geletterdheid in Nederland",
        description: "Alles over AI-geletterdheid in Nederland en de EU AI Act.",
        url: "https://aiganl.lovable.app/ai-geletterdheid-nederland",
        publisher: { "@type": "Organization", name: "AIGA — AI Geletterdheid Academy" },
      }}
    />
    <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "AI-Geletterdheid Nederland" }]} />

    <section className="pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="AI-GELETTERDHEID IN NEDERLAND" />
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
            AI-Geletterdheid in Nederland:<br />
            <span className="text-primary">Alles wat je moet weten</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Sinds februari 2025 is AI-geletterdheid wettelijk verplicht voor alle organisaties in de EU die met AI-systemen werken. Nederland loopt voorop in de implementatie, maar veel organisaties weten nog niet precies wat er van hen verwacht wordt.
          </p>
        </AnimatedSection>

        <DefinitionBlock
          term="Wat is AI-geletterdheid?"
          definition="AI-geletterdheid is het vermogen van medewerkers om te begrijpen wat kunstmatige intelligentie is, hoe AI-systemen werken, welke risico's ze met zich meebrengen, en hoe ze AI op een veilige, verantwoorde en ethisch verantwoorde manier kunnen inzetten in hun dagelijks werk. Onder Artikel 4 van de EU AI Act (van kracht vanaf februari 2025) zijn organisaties in de EU verplicht om AI-geletterdheid te waarborgen voor alle medewerkers die met AI-systemen werken."
        />

        <AnimatedSection delay={0.1}>
          <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
            De EU AI Act in Nederland
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              De EU AI Act is de eerste wetgeving ter wereld die specifiek gericht is op het reguleren van kunstmatige intelligentie. In Nederland wordt de wet gehandhaafd door de Autoriteit Persoonsgegevens (AP) en sectorspecifieke toezichthouders. Per augustus 2025 wordt actief gehandhaafd — organisaties die niet kunnen aantonen dat hun medewerkers AI-geletterd zijn, riskeren boetes tot 35 miljoen euro of 7% van de wereldwijde jaaromzet.
            </p>
            <p>
              De wet maakt onderscheid tussen verschillende risiconiveaus van AI-systemen. Maar ongeacht het risiconiveau geldt Artikel 4: alle organisaties moeten investeren in AI-geletterdheid van hun medewerkers.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
            Wat verwacht de Rijksoverheid?
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              De Nederlandse overheid heeft via het Algoritmebeleid en het Werkprogramma AI al duidelijk gemaakt dat AI-geletterdheid een prioriteit is. De Rijksoverheid verwacht dat organisaties:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Aantoonbaar investeren in AI-kennis van medewerkers</li>
              <li>Documentatie bijhouden van trainingen en certificeringen</li>
              <li>Een intern AI-beleid opstellen met duidelijke richtlijnen</li>
              <li>Verantwoordelijkheden voor AI-gebruik vastleggen</li>
            </ul>
            <p>
              Het kabinet heeft aangekondigd dat de handhaving van de AI Act in Nederland serieus zal worden opgepakt, met de AP als coördinerend toezichthouder.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
            Hoe gaan Nederlandse organisaties om met AI-geletterdheid?
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              Uit onderzoek blijkt dat minder dan 20% van de Nederlandse organisaties op dit moment een formeel AI-geletterdheidsbeleid heeft. Veel organisaties weten dat ze iets moeten doen, maar weten niet waar te beginnen.
            </p>
            <p>
              De organisaties die wél vooroplopen hebben een aantal dingen gemeen: ze investeren in gecertificeerde trainingen voor álle medewerkers (niet alleen IT), ze hebben een duidelijk AI-beleid en ze documenteren hun inspanningen voor audit-doeleinden.
            </p>
            <p>
              AIGA helpt Nederlandse organisaties met precies dit proces: van bewustwording tot certificering, met een praktische online training die medewerkers in 2-3 uur zelfstandig kunnen volgen.
            </p>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.25}>
          <div className="mt-16 bg-card border border-border rounded-2xl p-8 text-center neon-glow">
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Start met AI-geletterdheid voor jouw organisatie
            </h2>
            <p className="mt-4 text-muted-foreground">
              Onze training is volledig Nederlandstalig, gebaseerd op de EU AI Act, en bevat een audit-proof certificaat.
            </p>
            <Link to="/training" className="btn-neon inline-block mt-6 px-8 py-3 rounded-lg text-sm">
              Bekijk de training
            </Link>
          </div>
        </AnimatedSection>

        {/* Internal links */}
        <AnimatedSection delay={0.3}>
          <div className="mt-12">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Lees verder in ons Kenniscentrum</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/kenniscentrum/wat-is-ai-geletterdheid" className="text-primary hover:underline">Wat is AI-geletterdheid?</Link></li>
              <li><Link to="/kenniscentrum/eu-ai-act-uitgelegd" className="text-primary hover:underline">De EU AI Act uitgelegd</Link></li>
              <li><Link to="/kenniscentrum/ai-geletterdheid-voor-leiders" className="text-primary hover:underline">AI-geletterdheid voor leiders</Link></li>
              <li><Link to="/kenniscentrum/wat-zijn-high-risk-ai-systemen" className="text-primary hover:underline">Wat zijn high-risk AI-systemen?</Link></li>
              <li><Link to="/faq" className="text-primary hover:underline">Veelgestelde vragen over AI-geletterdheid</Link></li>
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default AiGeletterdheidNederland;
