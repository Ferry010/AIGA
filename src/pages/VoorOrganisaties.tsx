import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const pricingTiers = [
  { name: "Starter", seats: "10 tot 24", price: "249,-", total: "Vanaf 2.490,-", features: ["Toegang leerplatform", "Certificaten per deelnemer", "Voortgangsdashboard"], featured: false },
  { name: "Team", seats: "25 tot 49", price: "229,-", total: "Vanaf 5.725,-", features: ["Alles uit Starter", "Prioriteitsondersteuning", "Onboarding call"], featured: true, badge: "AANBEVOLEN" },
  { name: "Organisatie", seats: "50 tot 99", price: "209,-", total: "Vanaf 10.450,-", features: ["Alles uit Team", "Dedicated accountmanager", "Rapportages op maat"], featured: false },
  { name: "Enterprise", seats: "100+", price: "Op aanvraag", total: "", features: ["Maatwerk content", "White-label optie", "SLA", "Integratie met eigen LMS"], featured: false },
];

const hrFaqs = [
  { q: "Kunnen we de voortgang van medewerkers bijhouden?", a: "Ja. Het platform biedt een dashboard waarop je per medewerker de voortgang, examenscore en certificering kunt inzien." },
  { q: "Kunnen we seats in tranches inzetten?", a: "Ja. Je koopt een pakket en geeft medewerkers gefaseerd toegang. De seats blijven beschikbaar zolang de licentie actief is." },
  { q: "Hoe snel kunnen we starten?", a: "Na akkoord op de offerte staat jouw organisatie binnen twee werkdagen live." },
  { q: "Is er een factuur beschikbaar?", a: "Ja. Je ontvangt een factuur op naam van jouw organisatie, geschikt voor de bedrijfsadministratie." },
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
      <section className="pt-32 pb-20 dot-grid-bg">
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
            <Link to="/contact" className="inline-block mt-8 bg-primary text-primary-foreground px-7 py-3.5 rounded-md font-semibold hover:brightness-110 hover:-translate-y-px transition-all">
              Vraag een offerte aan
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-muted-foreground font-normal"></th>
                    <th className="text-left py-3 text-primary font-semibold">Online Training</th>
                    <th className="text-left py-3 text-primary font-semibold">Masterclass</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  {[
                    ["Voor wie", "Alle medewerkers", "Directie, MT, HR"],
                    ["Formaat", "Online, zelfpaced", "Live"],
                    ["Duur", "2 tot 3 uur", "2 uur"],
                    ["Certificaat", "AI Literacy Practitioner", "AI Literacy Leader"],
                    ["Prijs", "Vanaf 249/seat", "Op aanvraag"],
                    ["Minimaal", "10 seats", "1 deelnemer"],
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
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((t) => (
              <StaggerItem key={t.name}>
                <div className={`bg-background rounded-xl p-6 h-full flex flex-col border ${t.featured ? "border-2 border-primary" : "border-border hover:border-primary"} transition-colors`}>
                  {t.badge && <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-2">{t.badge}</span>}
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
                  <Link to="/contact" className={`text-center py-2.5 rounded-md font-semibold text-sm ${t.featured ? "bg-primary text-primary-foreground" : "border border-primary text-primary hover:bg-accent"} transition-all`}>
                    {t.name === "Enterprise" ? "Neem contact op" : "Vraag offerte aan"}
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Always included */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="ALTIJD INBEGREPEN" />
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              "Directe platformtoegang na boeking",
              "AI Literacy Practitioner certificaat per deelnemer",
              "OpenBadge: deelbaar via LinkedIn, audit-proof",
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
      <section className="py-20 bg-card">
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
      <section className="py-20">
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
                <label className="text-sm text-muted-foreground mb-1 block">{f.label} {f.required && <span className="text-primary">*</span>}</label>
                <input
                  type={f.type || "text"}
                  required={f.required}
                  value={form[f.name as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Aantal medewerkers</label>
              <select
                value={form.aantal}
                onChange={(e) => setForm({ ...form, aantal: e.target.value })}
                className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Selecteer...</option>
                <option value="10-24">10-24</option>
                <option value="25-49">25-49</option>
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
                className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:brightness-110 transition-all">
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
