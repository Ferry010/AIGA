import { Link } from "react-router-dom";
import { Check, Monitor, ClipboardCheck, Award, BarChart2 } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const pricingTiers = [
  { name: "Starter", seats: "10 tot 24", price: "249,-", total: "Vanaf 2.490,-", features: ["Toegang leerplatform", "Certificaten per deelnemer", "Voortgangsdashboard"], featured: false },
  { name: "Team", seats: "25 tot 49", price: "229,-", total: "Vanaf 5.725,-", features: ["Alles uit Starter", "Prioriteitsondersteuning", "Onboarding call"], featured: true, badge: "AANBEVOLEN" },
  { name: "Organisatie", seats: "50 tot 99", price: "209,-", total: "Vanaf 10.450,-", features: ["Alles uit Team", "Dedicated accountmanager", "Rapportages op maat"], featured: false },
  { name: "Enterprise", seats: "100+", price: "Op aanvraag", total: "", features: ["Maatwerk content", "White-label optie", "SLA", "Integratie met eigen LMS"], featured: false },
];

const faqs = [
  { q: "Is deze training verplicht?", a: "Ja. Sinds februari 2025 is AI-geletterdheid wettelijk verplicht voor organisaties binnen de EU die met AI werken. Dat geldt ook als medewerkers alleen ChatGPT of Copilot gebruiken. Per augustus 2025 wordt er gehandhaafd." },
  { q: "Hoe lang duurt de training?", a: "De training is zelfpaced en kan in meerdere sessies worden gevolgd. Gemiddeld zijn medewerkers twee tot drie uur bezig." },
  { q: "Is er technische voorkennis nodig?", a: "Nee. De training is ontwikkeld voor alle medewerkers, ook zonder technische achtergrond." },
  { q: "Hoe werkt het certificaat?", a: "Na het afronden van het adaptieve examen ontvangt iedere deelnemer automatisch het AI Literacy Practitioner certificaat. Dit is een OpenBadge: digitaal ondertekend, deelbaar via LinkedIn en audit-proof voor de AI Act." },
  { q: "Kan ik seats bijboeken?", a: "Ja. Je kunt op elk moment extra seats toevoegen via robbert@speakersacademy.nl." },
  { q: "Is de training AI Act-compliant?", a: "Ja. De inhoud is volledig afgestemd op de eisen van de EU AI Act, inclusief risicobeheersing, ethiek, governance en praktische toepassing." },
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
            Jouw team AI-geletterd en gecertificeerd.<br />
            <span className="text-primary">Online, in eigen tempo.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            De EU AI Act verplicht organisaties hun medewerkers voor te bereiden op verantwoord AI-gebruik. Onze training doet dat snel, praktisch en met een audit-proof certificaat.
          </p>
          <Link to="/contact" className="inline-block mt-8 bg-primary text-primary-foreground px-7 py-3.5 rounded-lg font-semibold hover:brightness-110 hover:-translate-y-px transition-all duration-300 shadow-lg shadow-primary/20">
            Vraag offerte aan
          </Link>
        </AnimatedSection>
      </div>
    </section>

    {/* What they learn */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="WAT MEDEWERKERS LEREN" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
            Concreet, begrijpelijk<br /><span className="text-primary">en direct toepasbaar.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">Na deze training weten medewerkers wat AI is, welke risico's het meebrengt en hoe ze het veilig en verantwoord toepassen in hun werk.</p>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {[
            "Wat AI is en wat het niet is",
            "Hoe AI werkt op de werkvloer, niet in theorie",
            "Risico's van bias, datamisbruik en automatische beslissingen",
            "Hoe je AI veilig, verantwoord en binnen de wet gebruikt",
            "Welke rol medewerkers spelen binnen de AI Act",
            "Hoe ze risico's herkennen en escaleren binnen de organisatie",
          ].map((item) => (
            <StaggerItem key={item}>
              <div className="flex items-start gap-3 p-4">
                <Check size={18} className="text-success mt-0.5 shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* What's included */}
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="WAT JE KRIJGT" />
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            { icon: Monitor, title: "Leerplatform", body: "Directe toegang na boeking. Videolessen, praktijkcases en kennisquizzen." },
            { icon: ClipboardCheck, title: "Adaptief examen", body: "Het afsluitend examen past zich aan op het niveau van de deelnemer." },
            { icon: Award, title: "Audit-proof certificaat", body: "AI Literacy Practitioner. OpenBadge, digitaal ondertekend. Deelbaar via LinkedIn." },
            { icon: BarChart2, title: "Voortgangsdashboard", body: "Monitor de voortgang van je hele team op een plek. Exporteerbaar voor audits." },
          ].map((c) => (
            <StaggerItem key={c.title}>
              <div className="bg-surface-2 border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full">
                <c.icon size={24} className="text-primary mb-4" />
                <h3 className="text-base font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Pricing */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="PRIJZEN VOOR ORGANISATIES" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
            Transparant en schaalbaar.<br /><span className="text-primary">Geen verborgen kosten.</span>
          </h2>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {pricingTiers.map((t) => (
            <StaggerItem key={t.name}>
              <div className={`bg-card rounded-2xl p-8 h-full flex flex-col border ${t.featured ? "border-2 border-primary shadow-lg shadow-primary/5" : "border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"} transition-all duration-300`}>
                {t.badge && <span className="text-xs font-medium uppercase tracking-[0.08em] text-primary mb-2">{t.badge}</span>}
                <h3 className="text-lg font-semibold text-foreground">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.seats} seats</p>
                <p className="text-2xl font-bold text-foreground mt-4">{t.price} <span className="text-sm font-normal text-muted-foreground">{t.price !== "Op aanvraag" ? "per seat" : ""}</span></p>
                {t.total && <p className="text-xs text-muted-foreground">{t.total}</p>}
                <ul className="space-y-2 mt-4 mb-6 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={14} className="text-success mt-0.5 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`text-center py-2.5 rounded-lg font-semibold text-sm ${t.featured ? "bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/20" : "border border-primary text-primary hover:bg-accent"} transition-all duration-300`}>
                  {t.name === "Enterprise" ? "Neem contact op" : "Vraag offerte aan"}
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <p className="text-sm text-muted-foreground mt-8 text-center">Alle prijzen exclusief BTW. Factuur op naam van jouw organisatie.</p>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-24 bg-card">
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

    {/* Closing CTA */}
    <section className="py-28">
      <div className="text-center">
        <AnimatedSection>
          <h2 className="text-3xl font-display font-semibold text-foreground">Hoeveel seats heeft jouw team nodig?</h2>
          <Link to="/contact" className="inline-block mt-8 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:brightness-110 hover:-translate-y-px transition-all duration-300 shadow-lg shadow-primary/20">
            Vraag offerte aan
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default Training;
