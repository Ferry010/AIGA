import { Link } from "react-router-dom";
import { Check, Play } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import TrainerSection from "@/components/TrainerSection";
import ContactForm from "@/components/ContactForm";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";

const faqs = [
  { q: "Is deze training verplicht?", a: "Ja. Sinds februari 2025 is AI-geletterdheid wettelijk verplicht voor organisaties binnen de EU die met AI werken. Dat geldt ook als medewerkers alleen ChatGPT of Copilot gebruiken. Per augustus 2025 wordt er gehandhaafd." },
  { q: "Hoe lang duurt de training?", a: "De training is selfpaced en kan in meerdere sessies worden gevolgd. Gemiddeld zijn medewerkers twee tot drie uur bezig." },
  { q: "Is er technische voorkennis nodig?", a: "Nee. De training is ontwikkeld voor alle medewerkers, ook zonder technische achtergrond." },
  { q: "Wat als een deelnemer niet slaagt voor het examen?", a: "Dan kan de deelnemer het examen herkansen. Er is geen limiet op het aantal pogingen." },
  { q: "Hoe werkt het certificaat?", a: "Na het afronden van het adaptieve examen ontvangt iedere deelnemer automatisch het AI Literacy Practitioner certificaat. Digitaal ondertekend, deelbaar via LinkedIn en audit-proof voor de AI Act." },
  { q: "Kan ik seats bijboeken?", a: "Ja. Je kunt op elk moment extra seats toevoegen via robbert@speakersacademy.nl of tom@speakersacademy.nl." },
  { q: "Hoe snel kunnen we starten?", a: "Na akkoord op de offerte staat jouw organisatie binnen twee werkdagen live op het platform." },
];

const Training = () => (
  <div className="min-h-screen">
    <SEO
      title="AI-Geletterdheid Training voor Teams in Nederland | Certificaat | AIGA"
      description="Online AI-geletterdheid training voor teams in Nederland. Voldoe aan de EU AI Act. AI Literacy Practitioner certificaat. Selfpaced, 2-3 uur, per seat beschikbaar."
      canonical="/training"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Course",
        name: "AI-Geletterdheid voor Teams",
        description: "Online AI-geletterdheid training voor teams. Voldoe aan de EU AI Act met een audit-proof AI Literacy Practitioner certificaat.",
        provider: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy", url: "https://aigeletterdheid.academy" },
        instructor: { "@type": "Person", name: "Ferry Hoes" },
        educationalLevel: "Beginner tot Intermediate",
        teaches: ["AI-geletterdheid", "EU AI Act compliance", "Verantwoord AI-gebruik", "AI-risicobeheer"],
        courseMode: "online",
        duration: "PT2H30M",
        inLanguage: "nl",
        offers: {
          "@type": "Offer",
          price: "249",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          priceSpecification: { "@type": "PriceSpecification", description: "excl. BTW, per deelnemer" },
        },
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT2H30M" },
        award: "AI Literacy Practitioner certificaat",
      }}
    />
    <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Training" }]} />

    {/* Hero */}
    <section className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="ONLINE TRAINING" />
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
            AI-Geletterdheid training voor teams<br />
            <span className="neon-text">Voldoe aan de AI Act. Train je team slim, snel en gecertificeerd.</span>
          </h1>
        </AnimatedSection>
      </div>
    </section>

    {/* Why section */}
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="WAAROM NU" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
            Waarom AI-geletterdheid trainen<br /><span className="text-primary">nú essentieel is voor je team</span>
          </h2>
          <div className="mt-6 text-muted-foreground max-w-3xl space-y-4 leading-relaxed">
            <p>
              De EU AI Act stelt duidelijke eisen: medewerkers moeten AI begrijpen, risico's herkennen en weten hoe ze technologie veilig en verantwoord inzetten in hun werk.
            </p>
            <p>
              Onze AI-geletterdheid training voor teams geeft je organisatie precies die kennis, modulair opgebouwd, volledig online en direct toepasbaar. Geen ingewikkelde tools, geen klassikale sessies. Wél een audit-proof certificaat waarmee je organisatie voldoet aan de EU AI wetgeving.
            </p>
            <p>
              Ook geschikt voor teams zonder technische voorkennis. En voor leidinggevenden is er de{" "}
              <Link to="/masterclass" className="text-primary hover:underline font-medium">AI Masterclass</Link>.
              Bekijk ook onze pagina's over <Link to="/ai-training-voor-bedrijven" className="text-primary hover:underline">AI training voor bedrijven</Link> en <Link to="/ai-cursus-medewerkers" className="text-primary hover:underline">AI cursus voor medewerkers</Link>.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Key specs */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Zelfstandig en in eigen tempo te volgen",
            "Adaptief examen aan het einde",
            "Geschikt voor teams van elke omvang",
            "Certificering: AI Literacy Practitioner (digitaal ondertekend en audit-proof)",
            "Kosten: 249,- (ex BTW) per deelnemer",
          ].map((item) => (
            <StaggerItem key={item}>
              <div className="flex items-start gap-3 p-4">
                <Check size={18} className="text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* What you learn */}
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="WAT MEDEWERKERS LEREN" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
            Concreet, begrijpelijk<br /><span className="text-primary">en direct toepasbaar.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl">
            Alles wat jouw team moet weten om AI veilig en verantwoord toe te passen in de praktijk. Na deze training begrijpen medewerkers wat AI is, welke risico's het met zich meebrengt en hoe ze er op een verantwoorde manier mee werken, in lijn met de wet én de dagelijkse realiteit op de werkvloer.
          </p>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {[
            "Wat AI is (en wat het niet is)",
            "Hoe AI in de praktijk werkt (op de werkvloer, niet in theorie)",
            "Wat de risico's zijn van bias, datamisbruik en fouten",
            "Hoe je AI veilig, verantwoord en binnen de wet gebruikt",
            "Welke rol medewerkers zelf spelen binnen de AI Act",
            "Hoe ze risico's herkennen en escaleren binnen de organisatie",
          ].map((item) => (
            <StaggerItem key={item}>
              <div className="flex items-start gap-3 p-4">
                <Check size={18} className="text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Trainer section */}
    <TrainerSection />

    {/* Waarom bij ons */}
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="WAAROM BIJ ONS" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
            Waarom bij ons?
          </h2>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {[
            "Je voldoet aan de wettelijke verplichting van de AI Act",
            "De training is inclusief certificering",
            "Je voorkomt risico's zoals datalekken, bias en reputatieschade",
            "Je versterkt strategisch denken over AI binnen je organisatie",
            "Training door een AI-Expert en professioneel spreker",
          ].map((item) => (
            <StaggerItem key={item}>
              <div className="flex items-start gap-3 p-4">
                <Check size={18} className="text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="VEELGESTELDE VRAGEN" />
        </AnimatedSection>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="text-foreground hover:no-underline text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    {/* Contact form */}
    <section className="py-24 bg-card">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="OFFERTE AANVRAGEN" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2 mb-8">
            Hoeveel seats heeft jouw team nodig?
          </h2>
          <ContactForm product="training" />
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default Training;
