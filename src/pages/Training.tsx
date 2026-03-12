import { Link } from "react-router-dom";
import { Check, Play } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is deze training verplicht?", a: "Ja. Sinds februari 2025 is AI-geletterdheid wettelijk verplicht voor organisaties binnen de EU die met AI werken. Dat geldt ook als medewerkers alleen ChatGPT of Copilot gebruiken. Per augustus 2025 wordt er gehandhaafd." },
  { q: "Hoe lang duurt de training?", a: "De training is zelfpaced en kan in meerdere sessies worden gevolgd. Gemiddeld zijn medewerkers twee tot drie uur bezig." },
  { q: "Is er technische voorkennis nodig?", a: "Nee. De training is ontwikkeld voor alle medewerkers, ook zonder technische achtergrond." },
  { q: "Wat als een deelnemer niet slaagt voor het examen?", a: "Dan kan de deelnemer het examen herkansen. Er is geen limiet op het aantal pogingen." },
  { q: "Hoe werkt het certificaat?", a: "Na het afronden van het adaptieve examen ontvangt iedere deelnemer automatisch het AI Literacy Practitioner certificaat. Dit is een OpenBadge: digitaal ondertekend, deelbaar via LinkedIn en audit-proof voor de AI Act." },
  { q: "Kan ik seats bijboeken?", a: "Ja. Je kunt op elk moment extra seats toevoegen via robbert@speakersacademy.nl." },
  { q: "Hoe snel kunnen we starten?", a: "Na akkoord op de offerte staat jouw organisatie binnen twee werkdagen live op het platform." },
];

const Training = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="pt-32 pb-24">
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
            "Vanaf 10 deelnemers",
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
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="DE TRAINER" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
            Ferry Hoes
          </h2>
          <p className="text-lg text-muted-foreground mt-1">Niet zomaar een trainer. Een expert die het veld kent.</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-center">
          <AnimatedSection delay={0.1}>
            <div className="aspect-video bg-muted rounded-2xl border border-border flex items-center justify-center">
              <Play size={48} className="text-muted-foreground/40" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-muted-foreground leading-relaxed">
              Ferry Hoes is veelgevraagd spreker op het gebied van Artificial Intelligence. Hij staat meermaals per maand op het podium en spreekt voor organisaties zoals a.s.r Verzekeringen, VodafoneZiggo, MKB bedrijven en verschillende Ministeries. In 2020 won hij de "Anti-Discriminatie AI-Hackathon". Ferry weet precies hoe je AI-geletterdheid vertaalt naar actie, compliance én voordeel.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>

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
