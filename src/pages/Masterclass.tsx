import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const takeaways = [
  "Een helder beeld van wat de AI Act concreet van jouw organisatie vraagt",
  "Inzicht in welke medewerkers onder de verplichting vallen",
  "Een praktisch raamwerk voor AI governance in jouw organisatie",
  "Strategisch perspectief: AI als voordeel in plaats van risico",
  "Antwoorden op jouw specifieke vragen via de live Q&A",
];

const programBlocks = [
  { block: "Blok 1", duration: "30 min", title: "De AI Act in gewone taal", body: "Wat staat er precies in de wet, wat is het tijdpad en wat zijn de gevolgen als je niets doet." },
  { block: "Blok 2", duration: "45 min", title: "Wat dit betekent voor jouw organisatie", body: "Welke rollen, tools en processen vallen onder de wet. Hoe breng je dit in kaart." },
  { block: "Blok 3", duration: "30 min", title: "Van compliance naar strategie", body: "AI-geletterdheid is meer dan een wettelijke verplichting. Hoe gebruik je dit als springplank voor een future-ready organisatie." },
  { block: "Blok 4", duration: "15 min", title: "Live Q&A met Ferry Hoes", body: "Stel jouw specifieke vragen aan een expert die wekelijks met organisaties hierover spreekt." },
];

const Masterclass = () => {
  const [form, setForm] = useState({
    naam: "", organisatie: "", functie: "", email: "", telefoon: "", sessieType: "", vragen: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("masterclass_submissions").insert({
      naam: form.naam,
      organisatie: form.organisatie,
      functie: form.functie || null,
      email: form.email,
      telefoon: form.telefoon || null,
      sessie_type: form.sessieType,
      vragen: form.vragen || null,
    });

    setSubmitting(false);

    if (error) {
      toast.error("Er ging iets mis bij het versturen. Probeer het opnieuw.");
      return;
    }

    // Send notification (fire-and-forget)
    supabase.functions.invoke("notify-new-submission", {
      body: {
        type: "masterclass",
        naam: form.naam,
        organisatie: form.organisatie,
        email: form.email,
        telefoon: form.telefoon || null,
        extra: `Sessie type: ${form.sessieType}`,
      },
    }).catch(console.error);

    setSubmitted(true);
    toast.success("Aanvraag verstuurd! We nemen snel contact met je op.");
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="AI Act Masterclass voor Leidinggevenden | In-company | AIGA"
        description="Besloten AI Act masterclass voor directie en management in Nederland. Gegeven door AI-expert Ferry Hoes. Op locatie of online. Gratis bij 50+ seats."
        canonical="/masterclass"
      />
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Masterclass" }]} />

      {/* Hero */}
      <section className="pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="MASTERCLASS VOOR LEIDINGGEVENDEN" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              Wat verwacht de AI Act<br />
              <span className="text-primary">van jou als leidinggevende?</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Twee uur live verdieping voor directie, MT en beleidsmakers. Geen saaie compliance-sessie. Wel een helder beeld van wat AI-geletterdheid betekent voor jouw organisatie, inclusief de strategische kansen die je nu kunt pakken.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Gegeven door Ferry Hoes, AI-expert en keynote spreker</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="px-3 py-1 rounded-full border border-neon-purple/30 bg-card">Op locatie of online</span>
              <span className="px-3 py-1 rounded-full border border-neon-purple/30 bg-card">Prijs op aanvraag</span>
              <span className="px-3 py-1 rounded-full border border-neon-purple/30 bg-card neon-text font-semibold">Gratis bij 50+ training seats</span>
            </div>
            <a href="#aanmelden" className="btn-neon inline-block mt-8 px-7 py-3.5 rounded-lg">
              Meld je aan of vraag een besloten sessie aan
            </a>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="VOOR WIE" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
              De Masterclass is bedoeld voor<br /><span className="text-primary">mensen die beslissingen nemen.</span>
            </h2>
            <div className="flex flex-wrap gap-3 mt-6">
              {["Directie & C-level", "HR-directeuren", "L&D-managers", "Beleidsmakers"].map((t) => (
                <span key={t} className="px-4 py-2 rounded-full border border-neon-purple/30 text-sm text-foreground bg-card neon-glow">{t}</span>
              ))}
            </div>
            <p className="mt-6 text-muted-foreground">Geen technische achtergrond nodig. Wel de wil om serieus aan de slag te gaan.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="WAT JE MEENEEMT" />
          </AnimatedSection>
          <StaggerContainer className="space-y-6 mt-10 max-w-2xl">
            {takeaways.map((t, i) => (
              <StaggerItem key={i}>
                <div className="flex items-start gap-4">
                  <span className="text-lg font-mono font-bold neon-text shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-foreground leading-relaxed">{t}</p>
                </div>
              </StaggerItem>
            ))}
            <StaggerItem>
              <p className="text-sm text-muted-foreground mt-4">Bewijs van deelname: AI Literacy Leader</p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="PROGRAMMA" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
              Twee uur. Vier blokken.<br /><span className="text-primary">Een helder beeld.</span>
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {programBlocks.map((b) => (
              <StaggerItem key={b.block}>
                <div className="bg-card border border-border rounded-2xl p-8 hover:border-neon-purple/40 neon-glow transition-all duration-300 neon-card-top">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-semibold neon-text">{b.block}</span>
                    <span className="text-xs text-muted-foreground">{b.duration}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="INVESTERING" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2 text-center">
              Wat kost een <span className="text-primary">besloten sessie?</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="mt-12 bg-surface-2 border border-border rounded-2xl p-10 hover:border-neon-purple/40 neon-glow transition-all duration-300 neon-card-top">
              <div className="text-center mb-8">
                <span className="text-5xl font-display font-bold text-foreground">€495,-</span>
                <p className="text-muted-foreground mt-1">per deelnemer, excl. BTW · minimaal 5 deelnemers</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "2 uur live sessie met AI-expert Ferry Hoes",
                  "Op locatie of online, op een datum die jullie past",
                  "AI Literacy Leader bewijs van deelname",
                  "Live Q&A met ruimte voor organisatie-specifieke vragen",
                  "Geen technische achtergrond nodig",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-card border border-neon-purple/20 rounded-xl p-4 mb-8 text-center">
                <p className="text-sm text-foreground font-medium">
                  🎁 Gratis bij afname van 50+ <Link to="/training" className="text-primary hover:underline">online training</Link> seats
                </p>
              </div>
              <a href="#aanmelden" className="btn-neon block text-center py-3.5 rounded-lg font-semibold">
                Vraag een besloten sessie aan
              </a>
            </div>
          </AnimatedSection>

          {/* Cross-sell */}
          <AnimatedSection>
            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                Zoek je een training voor alle medewerkers?{" "}
                <Link to="/training" className="text-primary hover:underline font-medium">Bekijk de online training →</Link>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="aanmelden" className="py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="INTERESSE?" />
            <h2 className="text-3xl font-display font-semibold text-foreground mt-2">
              Laten we een datum prikken.
            </h2>
             <p className="mt-4 text-muted-foreground">
               Vul het formulier in en we nemen contact met je op.
             </p>
          </AnimatedSection>

          {submitted ? (
            <div className="mt-10 bg-card border border-neon-purple/30 rounded-2xl p-10 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">Bedankt voor je aanvraag!</h3>
              <p className="text-muted-foreground">We nemen zo snel mogelijk contact met je op om een datum te plannen.</p>
            </div>
          ) : (
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
                <label className="text-sm text-muted-foreground mb-1 block">Type sessie <span className="text-neon-purple">*</span></label>
                <select
                  required
                  value={form.sessieType}
                  onChange={(e) => setForm({ ...form, sessieType: e.target.value })}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
                >
                  <option value="">Selecteer...</option>
                  <option value="open">Open sessie</option>
                  <option value="besloten">Besloten sessie</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Vragen of opmerkingen</label>
                <textarea
                  value={form.vragen}
                  onChange={(e) => setForm({ ...form, vragen: e.target.value })}
                  rows={4}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300 resize-none"
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-neon w-full py-3 rounded-lg disabled:opacity-50">
                {submitting ? "Bezig met versturen..." : "Verstuur aanvraag"}
              </button>
            </form>
          )}
          <p className="mt-6 text-sm text-muted-foreground text-center">
            Of neem direct contact op: <a href="mailto:robbert@speakersacademy.nl" className="text-primary hover:underline">robbert@speakersacademy.nl</a> of <a href="mailto:tom@speakersacademy.nl" className="text-primary hover:underline">tom@speakersacademy.nl</a> | <a href="tel:+31103167827" className="text-primary hover:underline">+31 (0)10 316 7827</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Masterclass;
