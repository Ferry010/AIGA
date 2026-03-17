import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { motion } from "framer-motion";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";

// Quiz SEO title/description defined inline below

const questions = [
  { q: "Hoeveel medewerkers in jouw organisatie gebruiken AI-tools zoals ChatGPT, Copilot of vergelijkbare software?", options: ["Niemand, voor zover ik weet", "Een handvol early adopters", "Een significant deel van de teams", "De meeste medewerkers, dagelijks"] },
  { q: "Heeft jouw organisatie een beleid of richtlijn voor verantwoord AI-gebruik?", options: ["Nee, dat bestaat niet bij ons", "Er zijn informele afspraken maar niets op papier", "We hebben iets, maar het is niet actueel", "Ja, een formeel beleid dat actief wordt gebruikt"] },
  { q: "Weten jouw medewerkers wat de EU AI Act inhoudt en wat die van hen vraagt?", options: ["Nee, de meesten hebben er nog nooit van gehoord", "Enkelen hebben erover gelezen maar er is geen bewustzijn", "Het management weet het, de werkvloer nog niet", "Ja, er is breed bewustzijn en we zijn al bezig met compliance"] },
  { q: "Heeft jouw organisatie documentatie die bewijst dat medewerkers AI-geletterd zijn?", options: ["Nee, niets", "We hebben wat notities maar niets formeel", "Er zijn trainingen gevolgd maar geen formeel certificaat", "Ja, medewerkers zijn gecertificeerd via een erkend programma"] },
  { q: "Hoe worden AI-gerelateerde risico's (bias, datamisbruik, privacy) momenteel beheerd?", options: ["Dat wordt niet actief beheerd", "Incidenteel, als er iets misgaat", "Er zijn richtlijnen maar geen actieve monitoring", "Er is een actief risicobeheer met duidelijke verantwoordelijken"] },
  { q: "Zijn leidinggevenden in staat om AI-gebruik van hun team te beoordelen en te sturen?", options: ["Nee, ze weten zelf ook weinig van AI", "Ze begrijpen de basis maar missen diepgang", "De meesten wel, maar het is inconsistent", "Ja, leidinggevenden hebben voldoende kennis en kaders"] },
  { q: "Hoe urgent is AI Act-compliance voor jouw organisatie op dit moment?", options: ["We hebben er nog niet serieus over nagedacht", "We weten dat het moet maar hebben geen plan", "We zijn er mee bezig maar lopen achter", "We zijn goed op weg en hebben een duidelijk plan"] },
  { q: "Heeft jouw organisatie een AI-verantwoordelijke of intern aanspreekpunt voor AI-beleid?", options: ["Nee", "Iemand doet het erbij maar het is niet officieel", "Er is iemand aangewezen maar zonder budget of mandaat", "Ja, er is een dedicated verantwoordelijke met mandaat"] },
  { q: "Hoe worden nieuwe medewerkers geintroduceerd op het gebied van AI-gebruik en AI-risico's?", options: ["Dat gebeurt niet", "Via informele kennisoverdracht van collega's", "Er is een onboarding module maar die is niet up-to-date", "Via een formeel en actueel AI-onboardingprogramma"] },
  { q: "Stel: er is morgen een audit op AI-geletterdheid. Hoe sta je ervoor?", options: ["Slecht. We kunnen niets aantonen.", "Matig. We hebben wel iets maar het is niet overtuigend.", "Redelijk. We zijn bezig maar nog niet compliant.", "Goed. We kunnen aantonen dat ons team gecertificeerd is."] },
];

const dimensions = [
  { label: "AI-gebruik", indices: [0, 1] },
  { label: "Bewustzijn & wetgeving", indices: [2, 3] },
  { label: "Risicobeheer", indices: [4, 5] },
  { label: "Leiderschap & urgentie", indices: [6, 7] },
  { label: "Onboarding & audit-readiness", indices: [8, 9] },
];

interface TierData {
  minPct: number;
  maxPct: number;
  badge: string;
  color: string;
  heading: string;
  body: string;
  ctaHeading: string;
  ctaBody: string;
  buttonLabel: string;
  textLink: { label: string; to: string };
  showBenchmark: boolean;
  showLinkedIn: boolean;
}

const tiers: TierData[] = [
  {
    minPct: 0, maxPct: 40,
    badge: "HOOG RISICO", color: "hsl(0, 84%, 60%)",
    heading: "Je team loopt risico",
    body: "Jullie gebruiken waarschijnlijk al AI-tools — maar zonder gedeelde kennis of spelregels. Dat is een blinde vlek die organisaties geld, vertrouwen en straks ook compliance kost.",
    ctaHeading: "Laat ons helpen",
    ctaBody: "Vul je gegevens in en we nemen contact met je op om te kijken hoe we kunnen helpen.",
    buttonLabel: "Neem contact met mij op →",
    textLink: { label: "Of bekijk direct onze trainingen voor teams →", to: "/training" },
    showBenchmark: false, showLinkedIn: false,
  },
  {
    minPct: 41, maxPct: 70,
    badge: "BLINDE VLEKKEN", color: "hsl(38, 92%, 50%)",
    heading: "Jullie zijn op de goede weg — maar er zijn blinde vlekken",
    body: "Een deel van je team begrijpt AI goed. Maar zonder gedeelde basis werkt niet iedereen vanuit dezelfde kennis. Dat zie je niet meteen — totdat het misgaat.",
    ctaHeading: "Laat ons helpen verbeteren",
    ctaBody: "Vul je gegevens in en we kijken samen waar de verbeterpunten liggen.",
    buttonLabel: "Neem contact met mij op →",
    textLink: { label: "Bekijk onze e-learning met EU AI Act-certificering →", to: "/training" },
    showBenchmark: false, showLinkedIn: false,
  },
  {
    minPct: 71, maxPct: 100,
    badge: "VOORLOPER", color: "hsl(160, 84%, 39%)",
    heading: "Jullie lopen voor op de meeste organisaties",
    body: "Je team heeft een solide basis — en dat is zeldzamer dan je denkt. Dit is precies het moment om dat te formaliseren, voordat anderen bijkomen.",
    ctaHeading: "Laat ons helpen dit vast te houden",
    ctaBody: "Vul je gegevens in en we bespreken hoe jullie deze voorsprong kunnen behouden en formaliseren.",
    buttonLabel: "Neem contact met mij op →",
    textLink: { label: "Bekijk onze e-learning met EU AI Act-certificering →", to: "/training" },
    showBenchmark: true, showLinkedIn: true,
  },
];

type Phase = "intro" | "quiz" | "result";

const Quiz = () => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [formData, setFormData] = useState({ naam: "", email: "", bedrijf: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    setTimeout(() => {
      const next = [...answers, idx];
      setAnswers(next);
      setSelected(null);
      if (current < 9) {
        setCurrent(current + 1);
      } else {
        setPhase("result");
      }
    }, 400);
  };

  const score = answers.reduce((sum, a) => sum + a, 0);
  const pct = Math.round((score / 30) * 100);
  const tier = tiers.find((t) => pct >= t.minPct && pct <= t.maxPct) || tiers[0];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);

    const { error } = await supabase.from("risk_scan_submissions").insert({
      naam: formData.naam,
      email: formData.email,
      bedrijfsnaam: formData.bedrijf,
      totaal_score: pct,
      tier: pct <= 40 ? "hoog_risico" : pct <= 70 ? "gemengd" : "laag_risico",
      dimensie_scores: Object.fromEntries(
        dimensions.map((dim) => [
          dim.label,
          Math.round((dim.indices.reduce((s, i) => s + (answers[i] || 0), 0) / 6) * 100),
        ])
      ),
    });

    setSubmitting(false);
    if (error) {
      setSubmitError(true);
    } else {
      setSubmitted(true);
    }
  };

  const handleLinkedInShare = () => {
    const text = encodeURIComponent(
      `Onze organisatie scoort ${pct}% op de AIGA AI Risico Scan — en we lopen voor op 80% van de Nederlandse teams. Benieuwd hoe jullie scoren? ${window.location.origin}/risicoscan`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + "/risicoscan")}&summary=${text}`, "_blank");
  };

  // INTRO
  if (phase === "intro") {
    return (
      <div className="min-h-screen">
        <SEO
          title="Gratis AI Risicoscan voor Organisaties | 5 Minuten | AIGA"
          description="Doe de gratis AIGA AI Risicoscan en ontdek in 5 minuten hoe kwetsbaar jouw organisatie is voor AI Act overtredingen. 10 vragen, direct resultaat."
          canonical="/risicoscan"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "AIGA AI Risicoscan",
            description: "Gratis AI Risicoscan voor Nederlandse organisaties. Ontdek in 5 minuten hoe kwetsbaar jouw organisatie is voor AI Act overtredingen.",
            url: "https://aigeletterdheid.academy/risicoscan",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            provider: { "@type": "Organization", name: "AIGA — AI Geletterdheid Academy" },
          }}
        />
        <div className="max-w-3xl mx-auto px-4 pt-32 pb-24">
          <AnimatedSection>
            <SectionLabel text="GRATIS AI RISICO-SCAN" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              Gratis AI Risicoscan voor<br />
              <span className="text-primary">Nederlandse Organisaties</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Sinds februari 2025 is AI-geletterdheid wettelijk verplicht onder de EU AI Act. Maar hoe weet je of jouw organisatie er klaar voor is? De AIGA AI Risicoscan geeft je in vijf minuten een helder beeld van waar je staat — en waar de blinde vlekken zitten.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              De scan meet vijf dimensies: AI-gebruik, bewustzijn van wetgeving, risicobeheer, leiderschap en audit-readiness. Na afloop ontvang je direct je score, inclusief een uitsplitsing per dimensie en persoonlijk advies.
            </p>

            <div className="mt-8 bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-display font-semibold text-foreground mb-4">Voorbeeldvragen uit de scan</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">1.</span> Hoeveel medewerkers in jouw organisatie gebruiken AI-tools?</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">2.</span> Heeft jouw organisatie een beleid voor verantwoord AI-gebruik?</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">3.</span> Weten jouw medewerkers wat de EU AI Act van hen vraagt?</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">4.</span> Heeft jouw organisatie een AI-verantwoordelijke?</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">5.</span> Hoe sta je ervoor als er morgen een audit is?</li>
              </ul>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setPhase("quiz")}
                className="btn-neon px-8 py-4 rounded-lg text-[15px]"
              >
                Start de scan — 5 minuten
              </button>
              <p className="mt-3 text-xs text-muted-foreground">10 vragen. Direct resultaat. Geen account nodig.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  // QUIZ
  if (phase === "quiz") {
    const q = questions[current];
    return (
      <div className="min-h-screen flex flex-col">
        <div className="fixed top-16 left-0 right-0 z-40 bg-background border-b border-border">
          <div className="flex gap-1 p-2 max-w-xl mx-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < current ? "bg-neon-purple" : i === current ? "bg-neon-pink/50" : "bg-border"}`} />
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground pb-1">{current + 1} / 10</p>
          <p className="text-center text-[11px] text-muted-foreground/60 pb-2 italic">
            Je ziet je resultaat meteen — we gooien geen formulier voor je neus.
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center pt-36 pb-16 px-4">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl w-full"
          >
            <p className="text-lg font-semibold text-foreground mb-8 leading-relaxed">{q.q}</p>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 text-sm leading-relaxed ${
                    selected === i
                      ? "border-neon-purple bg-neon-purple/5 text-foreground neon-glow"
                      : "border-border bg-card text-foreground hover:border-neon-purple/40 hover:shadow-md"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // RESULT
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Ring chart */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <svg width="160" height="160" className="-rotate-90">
              <circle cx="80" cy="80" r="70" stroke="hsl(var(--border))" strokeWidth="8" fill="none" />
              <motion.circle
                cx="80" cy="80" r="70"
                stroke={tier.color}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 70}
                initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - pct / 100) }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-mono font-bold text-foreground">{pct}%</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <span
            className="inline-block text-xs font-medium uppercase tracking-[0.08em] px-3 py-1 rounded-full mb-4"
            style={{ color: tier.color, backgroundColor: `${tier.color}20` }}
          >
            {tier.badge}
          </span>
          <h2 className="text-3xl font-display font-semibold text-foreground mt-2">{tier.heading}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl mx-auto">{tier.body}</p>
        </div>

        <div className="mt-10 space-y-4">
          <p className="text-sm font-semibold text-foreground mb-2">Jouw score per dimensie</p>
          {dimensions.map((dim) => {
            const dimScore = dim.indices.reduce((s, i) => s + (answers[i] || 0), 0);
            const dimPct = Math.round((dimScore / 6) * 100);
            return (
              <div key={dim.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{dim.label}</span>
                  <span className="font-mono text-foreground">{dimPct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: tier.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${dimPct}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {tier.showBenchmark && (
          <div className="mt-8 bg-brand-dim border border-primary/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Minder dan 20% van de Nederlandse teams scoort boven de 70% op deze scan.
            </p>
          </div>
        )}

        <div className="mt-10 bg-card border border-border rounded-2xl p-8">
          <p className="text-lg font-semibold text-foreground mb-2">{tier.ctaHeading}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{tier.ctaBody}</p>

          {submitted ? (
            <p className="text-foreground font-medium text-center py-4">
              Goed bezig. Je hoort binnen één werkdag van ons.
            </p>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {[
                { name: "naam", label: "Naam", type: "text" },
                { name: "email", label: "Zakelijk e-mailadres", type: "email" },
                { name: "bedrijf", label: "Bedrijfsnaam", type: "text" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-sm text-muted-foreground mb-1 block">{f.label}</label>
                  <input
                    type={f.type}
                    required
                    value={formData[f.name as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
                  />
                </div>
              ))}
              {submitError && (
                <p className="text-sm text-destructive text-center">
                  Er ging iets mis. Probeer het opnieuw of mail ons op info@aigeletterdheid.academy.
                </p>
              )}
              <button type="submit" disabled={submitting} className="btn-neon w-full py-3 rounded-lg text-sm disabled:opacity-50">
                {submitting ? "Bezig..." : tier.buttonLabel}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Één e-mail. Geen nieuwsbrief. Geen gedoe.
              </p>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to={tier.textLink.to} className="text-sm neon-text hover:underline">
            {tier.textLink.label}
          </Link>
        </div>

        {tier.showLinkedIn && (
          <div className="mt-6 text-center">
            <button
              onClick={handleLinkedInShare}
              className="text-sm font-semibold neon-text hover:underline"
            >
              Deel je score op LinkedIn →
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;
