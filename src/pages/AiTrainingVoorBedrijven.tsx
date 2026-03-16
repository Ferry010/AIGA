import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import SEO from "@/components/SEO";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const AiTrainingVoorBedrijven = () => (
  <div className="min-h-screen">
    <SEO
      title="AI Training voor Bedrijven in Nederland | AIGA Academy"
      description="Investeer in AI-training voor je bedrijf. Voldoe aan de EU AI Act, verminder risico's en verhoog de productiviteit. Gecertificeerde training vanaf €249 per medewerker."
      canonical="/ai-training-voor-bedrijven"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "AI Training voor Bedrijven in Nederland",
        description: "Gecertificeerde AI-training voor Nederlandse bedrijven.",
        url: "https://aigeletterdheid.academy/ai-training-voor-bedrijven",
        publisher: { "@type": "Organization", name: "AIGA — AI Geletterdheid Academy" },
      }}
    />
    <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "AI Training voor Bedrijven" }]} />

    <section className="pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="AI TRAINING VOOR BEDRIJVEN" />
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
            AI Training voor Bedrijven<br />
            <span className="text-primary">in Nederland</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            AI verandert de manier waarop bedrijven werken. Maar zonder de juiste kennis leidt het inzetten van AI-tools tot risico's: datalekken, bias in besluitvorming, compliance-problemen en reputatieschade. Een gerichte AI-training voor bedrijven is daarom geen luxe meer — het is een strategische noodzaak.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
            De zakelijke case voor AI-training
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              Organisaties die investeren in AI-geletterdheid van hun medewerkers zien meetbare resultaten: minder fouten bij het gebruik van AI-tools, betere compliance met wet- en regelgeving, en een hogere productiviteit door het slim en verantwoord inzetten van AI in werkprocessen.
            </p>
            <p>
              De ROI van AI-training is direct meetbaar. De kosten van één datalek of compliance-overtreding wegen ruimschoots op tegen de investering in training. Met boetes onder de AI Act die oplopen tot 35 miljoen euro of 7% van de jaaromzet, is het risico van niet-handelen groter dan ooit.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
            Wat maakt de AIGA training uniek?
          </h2>
          <StaggerContainer className="space-y-3 mt-6">
            {[
              "Volledig Nederlandstalig en afgestemd op Nederlandse wet- en regelgeving",
              "Schaalbaar: van 1 tot 1000+ medewerkers tegelijk",
              "Selfpaced: medewerkers volgen de training in eigen tempo, in 2-3 uur",
              "Audit-proof certificaat: AI Literacy Practitioner",
              "Voortgangsdashboard voor HR en L&D",
              "Geen technische voorkennis vereist",
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

        <AnimatedSection delay={0.2}>
          <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
            Compliance als concurrentievoordeel
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              Bedrijven die nu investeren in AI-geletterdheid positioneren zichzelf als betrouwbare partners voor klanten, leveranciers en toezichthouders. In aanbestedingen en bij audits wordt steeds vaker gevraagd naar bewijs van AI-compliance.
            </p>
            <p>
              Met het AI Literacy Practitioner certificaat van AIGA beschik je over aantoonbaar bewijs dat jouw organisatie voldoet aan de eisen van de EU AI Act. Het certificaat is digitaal ondertekend, deelbaar via LinkedIn en geldt als audit-proof documentatie.
            </p>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.25}>
          <div className="mt-16 bg-card border border-border rounded-2xl p-8 text-center neon-glow">
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Start vandaag met AI-training voor je bedrijf
            </h2>
            <p className="mt-4 text-muted-foreground">Vanaf €249 per deelnemer (ex BTW). Direct starten.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link to="/training" className="btn-neon px-8 py-3 rounded-lg text-sm">
                Bekijk de training
              </Link>
              <Link to="/contact" className="btn-neon-outline px-8 py-3 text-sm font-semibold">
                Vraag een offerte aan
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default AiTrainingVoorBedrijven;
