import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import SEO from "@/components/SEO";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Input } from "@/components/ui/input";

interface Begrip {
  term: string;
  description: string;
  link?: { href: string; label: string };
}

const BEGRIPPEN: Begrip[] = [
  {
    term: "AI-geletterdheid",
    description:
      "Weten wat AI is, hoe het werkt en wat de risico's zijn. Niet alleen voor je IT-afdeling. Voor iedereen die met AI werkt. En dat is tegenwoordig bijna iedereen. Verplicht onder Artikel 4 van de EU AI Act.",
  },
  {
    term: "EU AI Act",
    description:
      "De eerste uitgebreide Europese wet over kunstmatige intelligentie. In werking getreden op 1 augustus 2024. Doel: AI veilig, transparant en menselijk houden. Niet later relevant — nu al.",
    link: { href: "/kenniscentrum/eu-ai-act-uitgelegd", label: "Lees de volledige EU AI Act gids" },
  },
  {
    term: "Hoog-risico AI",
    description:
      "AI-systemen die een directe impact hebben op mensen: denk aan CV-screening, kredietbeoordeling, of medische diagnoses. Voor deze systemen gelden de strengste verplichtingen uit de wet.",
  },
  {
    term: "Verboden AI",
    description:
      "Toepassingen die de EU volledig verbiedt. Sociale scoring door overheden, manipulatieve AI die kwetsbare groepen uitbuit, biometrische profilering zonder toestemming. Harde grens.",
  },
  {
    term: "Beperkt-risico AI",
    description:
      "Systemen zoals chatbots. Ze mogen worden ingezet, maar gebruikers moeten altijd weten dat ze met AI communiceren. Transparantie is hier de sleuteleis.",
  },
  {
    term: "Minimaal-risico AI",
    description:
      "Spamfilters, aanbevelingsalgoritmes, AI in games. Geen extra verplichtingen, maar ethisch verantwoord gebruik blijft gewenst.",
  },
  {
    term: "AI-systeem",
    description:
      "Software die op basis van data redeneert, voorspelt of beslissingen neemt. Geen gewone software dus — AI leert en past zich aan. Dat is precies waarom de wet apart regelgeving nodig acht.",
  },
  {
    term: "Aanbieder (provider)",
    description:
      "De partij die een AI-systeem ontwikkelt of op de markt brengt. Zij dragen de zwaarste verantwoordelijkheid onder de wet — denk aan certificering en documentatie.",
  },
  {
    term: "Gebruiksverantwoordelijke (deployer)",
    description:
      "De organisatie die een AI-systeem inzet in de praktijk. Jij bent de deployer als je ChatGPT gebruikt voor klantenservice of een AI-tool inzet bij HR-beslissingen.",
  },
  {
    term: "Conformiteitsbeoordeling",
    description:
      "De formele check of een hoog-risico AI-systeem voldoet aan alle wettelijke eisen. Vergelijk het met een APK voor auto's — maar dan voor algoritmes.",
  },
  {
    term: "CE-markering voor AI",
    description:
      "Hoog-risico AI-systemen moeten een CE-markering hebben voordat ze op de Europese markt mogen. Bewijs dat het systeem is getoetst en veilig bevonden.",
  },
  {
    term: "AI impact assessment",
    description:
      "Een risicoanalyse vooraf: welke beslissingen neemt het systeem, wie worden er door geraakt en wat zijn de gevolgen als het misgaat? Verplicht voor hoog-risico toepassingen.",
    link: { href: "/kenniscentrum/wat-is-een-ai-impact-assessment", label: "Meer over het AI impact assessment" },
  },
  {
    term: "Transparantieverplichting",
    description:
      "Gebruikers moeten weten wanneer ze met AI te maken hebben. Geen verborgen algoritmes, geen AI die zich voordoet als mens zonder dat iemand het weet.",
  },
  {
    term: "Menselijk toezicht (human oversight)",
    description:
      "Bij hoog-risico AI moet een mens altijd kunnen ingrijpen, corrigeren of het systeem stopzetten. AI mag nooit volledig autonoom beslissen over mensen zonder menselijke controle.",
  },
  {
    term: "Biometrische identificatie",
    description:
      "Het herkennen van mensen op basis van lichaamskenmerken — gezicht, stem, vingerafdruk. Streng gereguleerd onder de AI Act. Realtime toepassing in de publieke ruimte is grotendeels verboden.",
  },
  {
    term: "Documentatieverplichting",
    description:
      "Hoog-risico AI-systemen moeten uitgebreid gedocumenteerd zijn: hoe werkt het, waarop is het getraind, hoe wordt het getest. Niet voor later — ook te overleggen bij een audit.",
  },
  {
    term: "Technische robuustheid",
    description:
      "AI-systemen moeten betrouwbaar, nauwkeurig en bestand zijn tegen fouten en misbruik. Een systeem dat bij een onverwachte invoer compleet ontspoort voldoet niet.",
  },
  {
    term: "Artikel 4 AI Act",
    description:
      "Het artikel dat AI-geletterdheid verplicht stelt voor alle organisaties die AI inzetten. Geldig sinds 2 februari 2025. Dit is de juridische basis voor wat AIGA doet.",
    link: { href: "/kenniscentrum/wat-is-ai-geletterdheid", label: "Lees meer over Artikel 4" },
  },
  {
    term: "Handhavingsdeadline",
    description:
      "2 augustus 2026. Vanaf die datum wordt de AI Act actief gehandhaafd voor hoog-risico AI-systemen. De klok tikt. Organisaties die nu beginnen, hebben een voorsprong.",
  },
  {
    term: "Boetes AI Act",
    description:
      "Tot €35 miljoen of 7% van de wereldwijde jaaromzet bij de zwaarste overtredingen. Voor hoog-risico systemen: tot €15 miljoen of 3% van de omzet. Geen symbolische bedragen.",
  },
];

const GLOSSARY_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: BEGRIPPEN.map((b) => ({
    "@type": "Question" as const,
    name: b.term,
    acceptedAnswer: { "@type": "Answer" as const, text: b.description },
  })),
};

const AiBegrippen = () => {
  const [search, setSearch] = useState("");

  const filtered = BEGRIPPEN.filter(
    (b) =>
      b.term.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <SEO
        title="AI Begrippen: Glossarium EU AI Act"
        description="Alle belangrijke begrippen uit de EU AI Act helder uitgelegd. Van hoog-risico AI tot conformiteitsbeoordeling — in gewone taal."
        canonical="/kenniscentrum/ai-begrippen"
        jsonLd={GLOSSARY_JSONLD}
      />

      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Kenniscentrum", href: "/kenniscentrum" },
          { label: "AI Begrippen" },
        ]}
      />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center">
        <AnimatedSection>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            AI Begrippen uitgelegd
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            De EU AI Act introduceert veel nieuwe termen. Hier vind je ze allemaal — zonder jargon, zonder lawyers-taal.
          </p>
        </AnimatedSection>
      </section>

      {/* Sticky search */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Zoek een begrip..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Glossary grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground">Geen begrippen gevonden voor "{search}".</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((b) => (
              <article
                key={b.term}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8"
              >
                <h3 className="text-lg font-display font-bold text-primary mb-2">{b.term}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{b.description}</p>
                {b.link && (
                  <Link
                    to={b.link.href}
                    className="inline-block mt-3 text-sm font-medium text-primary hover:underline"
                  >
                    {b.link.label} →
                  </Link>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-foreground text-background rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
            Wil je weten of jouw organisatie klaar is voor de AI Act?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link to="/gereedheidscan" className="btn-neon px-6 py-3 rounded-lg font-semibold text-sm">
              Doe de gratis AI Gereedheidscan
            </Link>
            <Link
              to="/training"
              className="border border-background/30 text-background hover:bg-background/10 px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
            >
              Bekijk onze trainingen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiBegrippen;
