import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";

const contactFaqs = [
  { q: "Kan ik eerst een demo aanvragen?", a: "Ja. Vermeld dit in je bericht en we plannen iets in." },
  { q: "Kan ik de training eerst zelf bekijken?", a: "Ja. Neem contact op en we geven je tijdelijk toegang tot een demoversie." },
  { q: "Wij zijn een overheidsorganisatie. Werkt dit ook voor ons?", a: "Ja. De training is geschikt voor alle sectoren, inclusief overheid. We werken al samen met meerdere ministeries en overheidsinstanties." },
];

const Contact = () => {
  const [form, setForm] = useState({ naam: "", organisatie: "", functie: "", email: "", telefoon: "", hulp: "", aantal: "", opmerkingen: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form:", form);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact | AIGA - AI Geletterdheid Academy"
        description="Neem contact op voor AI-geletterdheid training, masterclass of offerte. Direct antwoord, geen verplichtingen."
        canonical="/contact"
      />
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="CONTACT" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              Klaar om jouw team te certificeren?<br />
              <span className="neon-text">Laten we praten.</span>
            </h1>
             <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
               Vul het formulier in en we nemen contact met je op met een offerte op maat. Geen verplichtingen.
             </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
            <AnimatedSection delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Waarmee kan ik je helpen? <span className="text-neon-purple">*</span></label>
                  <select
                    required
                    value={form.hulp}
                    onChange={(e) => setForm({ ...form, hulp: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
                  >
                    <option value="">Selecteer...</option>
                    <option value="training">Online Training</option>
                    <option value="masterclass">Masterclass</option>
                    <option value="beide">Beide</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Aantal seats</label>
                  <select
                    value={form.aantal}
                    onChange={(e) => setForm({ ...form, aantal: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
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
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300 resize-none"
                  />
                </div>
                <button type="submit" className="btn-neon w-full py-3 rounded-lg">
                  Verstuur bericht
                </button>
              </form>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-card border border-border rounded-2xl p-10 neon-card-top">
                <h3 className="text-lg font-semibold text-foreground mb-2">Direct contact</h3>
                <p className="text-sm text-muted-foreground mb-6">Voor sales en offertes:</p>
                <p className="text-foreground font-semibold">Robbert & Tom | Speakers Academy</p>
                <div className="mt-4 space-y-3">
                  <a href="tel:+31103167827" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-neon-purple transition-colors">
                    <Phone size={16} /> +31 (0)10 316 7827
                  </a>
                  <a href="mailto:robbert@speakersacademy.nl" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-neon-purple transition-colors">
                    <Mail size={16} /> robbert@speakersacademy.nl
                  </a>
                  <a href="mailto:tom@speakersacademy.nl" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-neon-purple transition-colors">
                    <Mail size={16} /> tom@speakersacademy.nl
                  </a>
                </div>
                <div className="flex gap-3 mt-6">
                  <a href="tel:+31103167827" className="btn-neon-outline flex-1 text-center py-2.5 font-semibold text-sm">
                    Bel direct
                  </a>
                  <a href="mailto:robbert@speakersacademy.nl" className="btn-neon flex-1 text-center py-2.5 rounded-lg text-sm">
                    Stuur e-mail
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="py-20 bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible>
            {contactFaqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-foreground hover:no-underline text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Contact;
