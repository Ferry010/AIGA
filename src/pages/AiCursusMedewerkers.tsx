import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import SEO from "@/components/SEO";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const AiCursusMedewerkers = () => (
  <div className="min-h-screen">
    <SEO
      title="AI Cursus voor Medewerkers — Gecertificeerd & Praktisch | AIGA"
      description="AI cursus voor medewerkers: leer AI veilig en verantwoord gebruiken op de werkvloer. Online, selfpaced, 2-3 uur. AI Literacy Practitioner certificaat inbegrepen."
      canonical="/ai-cursus-medewerkers"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Course",
        name: "AI Cursus voor Medewerkers",
        description: "Praktische AI cursus voor medewerkers. Voldoe aan de EU AI Act met een audit-proof certificaat.",
        provider: { "@type": "Organization", name: "AIGA — AI Geletterdheid Academy", url: "https://aigeletterdheid.academy" },
        instructor: { "@type": "Person", name: "Ferry Hoes" },
        courseMode: "online",
        inLanguage: "nl",
        educationalLevel: "Beginner tot Intermediate",
        duration: "PT2H30M",
        offers: { "@type": "Offer", price: "249", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
      }}
    />
    <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "AI Cursus Medewerkers" }]} />

    <section className="pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="AI CURSUS MEDEWERKERS" />
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
            AI Cursus voor Medewerkers —<br />
            <span className="text-primary">Praktisch en Gecertificeerd</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Een AI-cursus die medewerkers leert wat AI is, hoe het werkt, welke risico's eraan verbonden zijn, en hoe ze AI veilig en verantwoord kunnen inzetten op de werkvloer. Geen technische voorkennis vereist.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
            Wat leren medewerkers in deze cursus?
          </h2>
          <StaggerContainer className="space-y-3 mt-6">
            {[
              "Wat kunstmatige intelligentie is en hoe het werkt in de praktijk",
              "Welke AI-systemen ze dagelijks gebruiken (vaak zonder het te weten)",
              "Hoe ze risico's herkennen: bias, datamisbruik, privacy-schendingen",
              "Wat de EU AI Act van hen persoonlijk verwacht",
              "Hoe ze AI verantwoord inzetten binnen de regels van de organisatie",
              "Wanneer en hoe ze AI-risico's moeten escaleren",
            ].map((item) => (
              <StaggerItem key={item}>
                <div className="flex items-start gap-3 p-3">
                  <Check size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
            Format en opzet
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              De cursus is volledig online en selfpaced. Medewerkers volgen de training in hun eigen tempo, op een moment dat het hen uitkomt. De gemiddelde doorlooptijd is 2 tot 3 uur. De cursus bestaat uit videolessen, praktijkcases en wordt afgesloten met een adaptief examen.
            </p>
            <p>
              Na het behalen van het examen (minimaal 70% score) ontvangt elke medewerker het <strong className="text-foreground">AI Literacy Practitioner certificaat</strong>. Dit certificaat is digitaal ondertekend, deelbaar via LinkedIn en geldt als audit-proof bewijs voor de AI Act.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
            Prijs en beschikbaarheid
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              De cursus kost <strong className="text-foreground">€249 per medewerker</strong> (exclusief BTW). Er is geen minimum aantal deelnemers — je kunt starten met 1 seat of direct je hele organisatie inschrijven. Voor grotere aantallen gelden staffelkortingen.
            </p>
            <p>
              Bij 50 of meer seats is een <Link to="/masterclass" className="text-primary hover:underline">live Masterclass voor leidinggevenden</Link> gratis inbegrepen.
            </p>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.25}>
          <div className="mt-16 bg-card border border-border rounded-2xl p-8 text-center neon-glow">
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Start de AI cursus voor je medewerkers
            </h2>
            <p className="mt-4 text-muted-foreground">Direct starten. Geen verplichtingen.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link to="/training" className="btn-neon px-8 py-3 rounded-lg text-sm">
                Bekijk alle details
              </Link>
              <Link to="/contact" className="btn-neon-outline px-8 py-3 text-sm font-semibold">
                Vraag een offerte aan
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Related pages */}
        <AnimatedSection delay={0.3}>
          <div className="mt-12">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Gerelateerd</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ai-training-voor-bedrijven" className="text-primary hover:underline">AI Training voor Bedrijven</Link></li>
              <li><Link to="/ai-act-compliance-nederland" className="text-primary hover:underline">AI Act Compliance Nederland</Link></li>
              <li><Link to="/ai-geletterdheid-nederland" className="text-primary hover:underline">AI-Geletterdheid in Nederland</Link></li>
              <li><Link to="/kenniscentrum" className="text-primary hover:underline">Kenniscentrum</Link></li>
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default AiCursusMedewerkers;
