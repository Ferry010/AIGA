import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const pricingTiers = [
  { name: "Individueel", seats: "1 seat", price: "249,-", total: "", features: ["Toegang leerplatform", "Certificaat", "Voortgangsdashboard"], featured: false },
  { name: "Team", seats: "2 tot 49", price: "249,-", total: "Vanaf 498,-", features: ["Alles uit Individueel", "Prioriteitsondersteuning", "Onboarding call"], featured: false },
  { name: "Organisatie", seats: "50 tot 99", price: "209,-", total: "Vanaf 10.450,-", features: ["Alles uit Team", "Dedicated accountmanager", "Rapportages op maat", "Gratis Masterclass voor management"], featured: true, badge: "AANBEVOLEN" },
  { name: "Enterprise", seats: "100+", price: "Op aanvraag", total: "", features: ["Maatwerk content", "White-label optie", "SLA", "Integratie met eigen LMS", "Gratis Masterclass voor management"], featured: false },
];

const hrFaqs = [
  { q: "Kunnen we de voortgang van medewerkers bijhouden?", a: "Ja. Het platform biedt een dashboard waarop je per medewerker de voortgang, examenscore en certificering kunt inzien." },
  { q: "Kunnen we seats in tranches inzetten?", a: "Ja. Je koopt een pakket en geeft medewerkers gefaseerd toegang. De seats blijven beschikbaar zolang de licentie actief is." },
  { q: "Is er een minimumafname?", a: "Nee. Je kunt ook een enkele seat boeken. Wel geldt: hoe meer seats, hoe lager de prijs per seat." },
  { q: "Hoe snel kunnen we starten?", a: "Na akkoord op de offerte staat jouw organisatie binnen twee werkdagen live." },
  { q: "Is er een factuur beschikbaar?", a: "Ja. Je ontvangt een factuur op naam van jouw organisatie, geschikt voor de bedrijfsadministratie." },
  { q: "Krijgen we een gratis Masterclass bij 50+ seats?", a: "Ja. Bij een afname van 50 of meer seats is de Masterclass voor leidinggevenden gratis inbegrepen." },
  { q: "Werkt de training ook voor niet-technische medewerkers?", a: "Absoluut. De training is specifiek ontworpen voor alle medewerkers, ongeacht technische achtergrond." },
];

const VoorOrganisaties = () => {
  const [form, setForm] = useState({ naam: "", organisatie: "", functie: "", email: "", telefoon: "", aantal: "", opmerkingen: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Offerte aanvraag:", form);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="VOOR ORGANISATIES" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              Jouw hele organisatie AI-geletterd.<br />
              <span className="text-primary">Van management tot werkvloer.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              AIGA biedt een complete aanpak voor AI-geletterdheid op elk niveau. Een leverancier, twee producten, geen gedoe.
            </p>
            <Link to="/contact" className="btn-neon inline-block mt-8 px-7 py-3.5 rounded-lg">
              Vraag een offerte aan
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Gratis Masterclass highlight */}
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="neon-border-lg">
            <div className="neon-inner bg-background rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">Gratis Masterclass voor management bij 50+ seats</h3>
                <p className="text-sm text-muted-foreground mt-2">Boek 50 of meer training seats en ontvang een gratis Masterclass voor leidinggevenden, gegeven door Ferry Hoes.</p>
              </div>
              <Link to="/masterclass" className="btn-neon px-6 py-3 rounded-lg whitespace-nowrap">
                Meer over de Masterclass
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Comparison table */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-muted-foreground font-normal"></th>
                    <th className="text-left py-3 neon-text font-semibold">Online Training</th>
                    <th className="text-left py-3 neon-text font-semibold">Masterclass</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  {[
                    ["Voor wie", "Alle medewerkers", "Directie, MT, HR"],
                    ["Formaat", "Online, selfpaced", "Live"],
                    ["Duur", "2 tot 3 uur", "2 uur"],
                    ["Certificaat", "AI Literacy Practitioner", "AI Literacy Leader"],
                    ["Prijs", "249,- per seat", "Op aanvraag"],
                    ["Minimaal", "1 seat", "10 deelnemers"],
                    ["Dashboard", "Ja", "Nee"],
                    ["AI Act compliant", "Ja", "Ja"],
                  ].map(([label, col1, col2]) => (
                    <tr key={label} className="border-b border-border">
                      <td className="py-3 text-muted-foreground">{label}</td>
                      <td className="py-3">{col1}</td>
                      <td className="py-3">{col2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((t) => (
              <StaggerItem key={t.name}>
                {t.featured ? (
                  <div className="neon-border-lg h-full">
                    <div className="neon-inner bg-background rounded-2xl p-8 h-full flex flex-col">
                      <span className="text-xs font-medium uppercase tracking-[0.08em] neon-text mb-2">{t.badge}</span>
                      <h3 className="text-lg font-semibold text-foreground">{t.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{t.seats} seats</p>
                      <p className="text-2xl font-bold text-foreground mt-4">{t.price} <span className="text-sm font-normal text-muted-foreground">per seat</span></p>
                      {t.total && <p className="text-xs text-muted-foreground">{t.total}</p>}
                      <ul className="space-y-2 mt-4 mb-6 flex-1">
                        {t.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check size={14} className="text-success mt-0.5 shrink-0" />{f}
                          </li>
                        ))}
                      </ul>
                      <Link to="/contact" className="btn-neon text-center py-2.5 rounded-lg text-sm">
                        Vraag offerte aan
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-background rounded-2xl p-8 h-full flex flex-col border border-border hover:border-neon-purple/40 neon-glow transition-all duration-300">
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
                    <Link to="/contact" className="btn-neon-outline text-center py-2.5 font-semibold text-sm">
                      {t.name === "Enterprise" ? "Neem contact op" : "Vraag offerte aan"}
                    </Link>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Always included */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="ALTIJD INBEGREPEN" />
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              "Directe platformtoegang na boeking",
              "AI Literacy Practitioner certificaat per deelnemer",
              "Certificaat deelbaar via LinkedIn, audit-proof",
              "Voortgangsdashboard voor HR en L&D",
              "Nederlandstalige content",
              "Technische ondersteuning",
            ].map((item) => (
              <StaggerItem key={item}>
                <div className="flex items-center gap-3 p-3">
                  <Check size={16} className="text-success shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* HR FAQ */}
      <section className="py-24 bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="VRAGEN VAN HR EN L&D" />
          </AnimatedSection>
          <Accordion type="single" collapsible className="mt-8">
            {hrFaqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-foreground hover:no-underline text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Offerte form */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-display font-semibold text-foreground">
              Vraag een offerte aan.<br /><span className="text-primary">Binnen 24 uur een voorstel op maat.</span>
            </h2>
          </AnimatedSection>
          <form onSubmit={handleSubmit} className="mt-10 space-y-4">
            {[
              { name: "naam", label: "Naam", required: true },
              { name: "organisatie", label: "Organisatie", required: true },
              { name: "functie", label: "Functie", required: false },
              { name: "email", label: "E-mailadres", required: true, type: "email" },
              { name: "telefoon", label: "Telefoonnummer", required: false, type: "tel" },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-sm text-muted-foreground mb-1 block">{f.label} {f.required && <span className="text-neon-purple">*</span>}</label>
                <input
                  type={f.type || "text"}
                  required={f.required}
                  value={form[f.name as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
                />
              </div>
            ))}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Aantal medewerkers</label>
              <select
                value={form.aantal}
                onChange={(e) => setForm({ ...form, aantal: e.target.value })}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
              >
                <option value="">Selecteer...</option>
                <option value="1">1</option>
                <option value="2-49">2-49</option>
                <option value="50-99">50-99</option>
                <option value="100+">100+</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Vragen of opmerkingen</label>
              <textarea
                value={form.opmerkingen}
                onChange={(e) => setForm({ ...form, opmerkingen: e.target.value })}
                rows={4}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300 resize-none"
              />
            </div>
            <button type="submit" className="btn-neon w-full py-3 rounded-lg">
              Verstuur aanvraag
            </button>
          </form>
          <p className="mt-6 text-sm text-muted-foreground text-center">
            Of neem direct contact op: <a href="mailto:robbert@speakersacademy.nl" className="text-primary hover:underline">robbert@speakersacademy.nl</a> | <a href="tel:+31103167827" className="text-primary hover:underline">+31 (0)10 316 7827</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default VoorOrganisaties;
