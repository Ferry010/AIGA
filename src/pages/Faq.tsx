import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";

const faqItems = [
  {
    q: "Wat is AI-geletterdheid?",
    a: "AI-geletterdheid is het vermogen van medewerkers om AI-systemen te begrijpen, risico's te herkennen en AI veilig en verantwoord in te zetten op de werkvloer. Onder de EU AI Act is AI-geletterdheid voor alle medewerkers die met AI werken wettelijk verplicht.",
  },
  {
    q: "Is een AI-geletterdheid training verplicht in Nederland?",
    a: "Ja. Sinds februari 2025 vereist de EU AI Act dat organisaties die AI inzetten aantoonbaar investeren in AI-geletterdheid van hun medewerkers. Vanaf augustus 2025 wordt dit actief gehandhaafd.",
  },
  {
    q: "Wat zijn de boetes voor niet-naleving van de AI Act?",
    a: "Boetes voor overtredingen van de EU AI Act kunnen oplopen tot 35 miljoen euro of 7% van de wereldwijde jaaromzet, afhankelijk van welke overtreding het zwaarst is.",
  },
  {
    q: "Hoe lang duurt de AI-geletterdheid training?",
    a: "De online AI-geletterdheid training voor teams duurt 2 tot 3 uur. De training is volledig selfpaced en kan door medewerkers in eigen tempo worden gevolgd.",
  },
  {
    q: "Wat is het AI Literacy Practitioner certificaat?",
    a: "Het AI Literacy Practitioner certificaat is een digitaal ondertekend certificaat dat elke deelnemer ontvangt na afronding van de AIGA training. Het certificaat is audit-proof en deelbaar via LinkedIn.",
  },
  {
    q: "Hoe hoog is de gemiddelde AI-geletterdheid?",
    a: "AI-geletterdheid is in veel organisaties nog laag; veel mensen kennen AI wel, maar weten niet goed hoe het werkt of wat de risico's zijn.",
  },
  {
    q: "Wat is het grootste gevaar van AI?",
    a: "Het grootste gevaar is blind vertrouwen op AI zonder inzicht in hoe het werkt, waardoor fouten of bias grote gevolgen kunnen hebben.",
  },
  {
    q: "Welke soorten AI zijn er?",
    a: "Rule-based AI, Narrow AI, Generative AI en General AI; elk met eigen toepassingen en risico's.",
  },
  {
    q: "Is een cursus verplicht om gecertificeerd te worden?",
    a: "Ja, een cursus volgen is verplicht om te voldoen aan de EU AI Act, en onze cursus is volledig online beschikbaar.",
  },
  {
    q: "Moet je examen doen voor het certificaat?",
    a: "Ja, je moet een examen halen met minimaal 70% om het certificaat te ontvangen.",
  },
  {
    q: "Hoe ziet de AI-geletterdheidstraining eruit?",
    a: "De training bestaat uit video's en teksten in modules die je in je eigen tempo volgt, afgesloten met een examen.",
  },
  {
    q: "Hoe lang is het certificaat geldig?",
    a: "Het certificaat is één jaar geldig vanaf de dag van behalen. De inhoud van de training wordt elk kwartaal ge-update om te zorgen dat alle inhoud voorzien is van de laatste wetgeving, innovaties en technologieën.",
  },
  {
    q: "Wat is de waarde van het certificaat?",
    a: "Voor organisaties toont het certificaat compliance aan; verplicht volgens de EU AI Act. Voor de medewerker is het waardevolle kennis én bewijs van expertise.",
  },
  {
    q: "Hoe verhoudt jullie training zich tot Google of Microsoft Learn?",
    a: "Onze training is wettelijk gericht, software-onafhankelijk en leidt tot een officieel certificaat, iets wat big tech trainingen niet bieden.",
  },
];

const whyUsPoints = [
  { icon: "✔", title: "Software-onafhankelijk en volledig neutraal", text: "Onze training is volledig onafhankelijk en behandelt AI in de breedte, los van specifieke software. Zo leer je concepten die overal toepasbaar zijn, ongeacht welke systemen jouw organisatie gebruikt." },
  { icon: "✔", title: "Gericht op wetgeving én praktijk", text: "De EU AI Act stelt sinds 2024 dat iedereen die werkt met AI aantoonbaar getraind moet zijn. Onze training voldoet aan de wettelijke eisen én leert je hoe je AI in de dagelijkse praktijk veilig en effectief inzet, inclusief ethische en juridische aspecten zoals bias, privacy en data security." },
  { icon: "✔", title: "Heldere en begrijpelijke uitleg", text: "Je hoeft geen technicus te zijn om onze cursus te volgen. We leggen complexe begrippen uit in gewone mensentaal en gebruiken herkenbare voorbeelden uit het bedrijfsleven." },
  { icon: "✔", title: "Flexibel en digitaal", text: "Onze training is 100% online, zodat deelnemers in hun eigen tempo en tijd kunnen leren. Handig voor drukke professionals en ideaal voor organisaties die medewerkers op verschillende locaties of in verschillende landen hebben." },
  { icon: "✔", title: "Officieel gecertificeerd", text: "Na afronding van de training en het behalen van het examen ontvang je een digitaal OpenBadge-certificaat. Dit is juridisch geldig bewijsmateriaal dat jouw organisatie kan gebruiken bij audits." },
  { icon: "✔", title: "Concreet voordeel voor de organisatie", text: "Medewerkers die begrijpen hoe AI werkt en waar de risico's liggen, maken minder fouten, werken efficiënter en kunnen innovatiever bijdragen aan bedrijfsdoelen. Bovendien voorkom je dure boetes die kunnen oplopen tot 7% van de jaaromzet of 35 miljoen euro." },
  { icon: "✔", title: "Persoonlijke begeleiding mogelijk", text: "Naast de standaardtraining bieden we organisaties de mogelijkheid tot extra begeleiding, bijvoorbeeld in de vorm van masterclasses voor leidinggevenden of consultancy bij het opstellen van een AI compliance plan." },
];

const Faq = () => (
  <div className="min-h-screen">
    <SEO
      title="Veelgestelde Vragen over AI-Geletterdheid & AI Act | AIGA"
      description="Antwoorden op veelgestelde vragen over AI-geletterdheid en de EU AI Act. Wat is verplicht, hoe werkt het certificaat en wat kost het?"
      canonical="/faq"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
    <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

    {/* Hero */}
    <section className="pt-12 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="FAQ" />
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
            Veelgestelde vragen over<br />
            <span className="neon-text">AI-geletterdheid</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Heb je vragen over AI-geletterdheid? Hier vind je de antwoorden op de meestgestelde vragen over wat AI-geletterdheid is, waarom het belangrijk is, en hoe je als organisatie compliant blijft met de EU AI Act. Klik op een vraag om het uitgebreide antwoord te lezen.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* FAQ Accordion */}
    <section className="pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0.1}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:neon-card-top"
              >
                <AccordionTrigger className="text-foreground hover:no-underline text-left font-semibold py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>

    {/* Why us */}
    <section className="py-20 bg-card border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Waarom kiezen voor onze <span className="neon-text">AI-geletterdheidstraining</span>?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            AI-geletterdheid lijkt misschien een technische vaardigheid die vooral interessant is voor IT'ers of data-analisten. Maar niets is minder waar. Kunstmatige intelligentie raakt inmiddels álle lagen van organisaties — van HR tot klantenservice, van management tot marketing. Toch weten veel professionals niet precies hoe AI werkt, waar de risico's zitten of wat de Europese wetgeving precies van hen verwacht. En dáár ligt precies de kracht van onze AI-geletterdheidstraining.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Bij ons krijg je geen abstracte technische cursus, maar een praktisch programma dat speciaal is ontwikkeld om iedereen — ongeacht functie of achtergrond — AI te leren begrijpen én verantwoord toe te passen. Onze training onderscheidt zich op meerdere punten:
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          {whyUsPoints.map((point, i) => (
            <AnimatedSection key={i} delay={0.05 * i}>
              <div className="flex gap-4">
                <span className="text-primary text-xl font-bold mt-0.5 shrink-0">{point.icon}</span>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">{point.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{point.text}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <p className="text-muted-foreground leading-relaxed mt-10">
            In een tijd waarin technologie steeds meer verweven raakt met ons werk, kun je het je als organisatie simpelweg niet veroorloven om achter te blijven. AI-geletterdheid is geen trend of luxe, maar een must om veilig, compliant én toekomstbestendig te blijven opereren.
          </p>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default Faq;
