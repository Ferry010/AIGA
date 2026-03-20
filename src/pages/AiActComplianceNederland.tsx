import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import SEO from "@/components/SEO";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const AiActComplianceNederland = () => (
  <div className="min-h-screen">
    <SEO
      title="AI Act Compliance voor Nederlandse Organisaties | AIGA"
      description="Alles over AI Act compliance in Nederland: deadlines, stappen, boetes en hoe training helpt bij naleving. Praktische gids voor Nederlandse organisaties."
      canonical="/ai-act-compliance-nederland"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "AI Act Compliance voor Nederlandse Organisaties",
        description: "Praktische gids voor AI Act compliance in Nederland.",
        url: "https://aigeletterdheid.academy/ai-act-compliance-nederland",
        publisher: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy" },
      }}
    />
    <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "AI Act Compliance Nederland" }]} />

    <section className="pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="AI ACT COMPLIANCE" />
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
            AI Act Compliance voor<br />
            <span className="text-primary">Nederlandse Organisaties</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            De EU AI Act is de eerste uitgebreide AI-wetgeving ter wereld. Voor Nederlandse organisaties betekent dit concrete verplichtingen. Deze gids helpt je begrijpen wat compliance inhoudt, welke stappen je moet nemen en welke deadlines gelden.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
            Wat houdt AI Act compliance in?
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              AI Act compliance betekent dat je organisatie voldoet aan alle relevante bepalingen van de EU Verordening inzake Kunstmatige Intelligentie. De wet classificeert AI-systemen in risicocategorieën en stelt voor elke categorie specifieke eisen.
            </p>
            <p>
              Maar ongeacht welke AI-systemen je gebruikt: <strong className="text-foreground">Artikel 4 vereist dat alle organisaties investeren in AI-geletterdheid.</strong> Dit geldt ook voor organisaties die alleen generatieve AI-tools als ChatGPT, Copilot of Gemini gebruiken.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
            Belangrijke deadlines
          </h2>
          <div className="space-y-4">
            {[
              { date: "Februari 2025", text: "AI-geletterdheid verplichting (Artikel 4) treedt in werking" },
              { date: "Augustus 2025", text: "Start actieve handhaving. Organisaties moeten compliant zijn." },
              { date: "Augustus 2026", text: "Volledige handhaving high-risk AI-systemen" },
            ].map((d) => (
              <div key={d.date} className="flex gap-4 p-4 bg-card border border-border rounded-xl">
                <span className="text-sm font-mono font-bold neon-text shrink-0 w-36">{d.date}</span>
                <p className="text-sm text-muted-foreground">{d.text}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
            Boetes bij niet-naleving
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              De boetes onder de AI Act zijn aanzienlijk en bedoeld als serieuze afschrikking:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-foreground">Verboden AI-praktijken:</strong> tot €35 miljoen of 7% van de wereldwijde jaaromzet</li>
              <li><strong className="text-foreground">High-risk overtredingen:</strong> tot €15 miljoen of 3% van de jaaromzet</li>
              <li><strong className="text-foreground">Overige overtredingen:</strong> tot €7,5 miljoen of 1,5% van de jaaromzet</li>
            </ul>
            <p>
              In Nederland is de Autoriteit Persoonsgegevens (AP) aangewezen als coördinerend toezichthouder voor de AI Act.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
            De rol van training bij compliance
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              AI-geletterdheid training is de meest directe manier om te voldoen aan Artikel 4 van de AI Act. Een gecertificeerde training biedt:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Aantoonbaar bewijs van investering in AI-kennis</li>
              <li>Audit-proof certificering per medewerker</li>
              <li>Documentatie voor toezichthouders</li>
              <li>Praktische kennis voor verantwoord AI-gebruik</li>
            </ul>
          </div>
        </AnimatedSection>

        {/* External sources */}
        <AnimatedSection delay={0.3}>
          <div className="mt-12 p-6 bg-card border border-border rounded-2xl">
            <h3 className="text-sm font-semibold text-foreground mb-3">Officiële bronnen</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:32024R1689" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">EUR-Lex — Verordening (EU) 2024/1689 (AI Act)</a></li>
              <li><a href="https://www.rijksoverheid.nl/onderwerpen/kunstmatige-intelligentie-ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Rijksoverheid.nl — Kunstmatige Intelligentie</a></li>
              <li><a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">European Commission — AI Act</a></li>
            </ul>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.35}>
          <div className="mt-16 bg-card border border-border rounded-2xl p-8 text-center neon-glow">
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Begin met AI Act compliance
            </h2>
            <p className="mt-4 text-muted-foreground">
              Onze training zorgt ervoor dat je medewerkers gecertificeerd zijn en je organisatie compliant is.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link to="/training" className="btn-neon px-8 py-3 rounded-lg text-sm">
                Bekijk de training
              </Link>
              <Link to="/risicoscan" className="btn-neon-outline px-8 py-3 text-sm font-semibold">
                Doe de gratis AI Risicoscan
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default AiActComplianceNederland;
