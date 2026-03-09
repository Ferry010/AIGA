import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { motion } from "framer-motion";

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

const tiers = [
  { min: 0, max: 9, badge: "KRITIEK RISICO", color: "hsl(0, 84%, 60%)", h2: "Jouw team is nu al kwetsbaar.", body: "Jouw organisatie loopt een significant compliance-risico. Medewerkers gebruiken AI zonder kader, zonder beleid en zonder documentatie. Per augustus 2025 wordt de AI Act gehandhaafd. Dit is het moment om te handelen.", rec: "Start met de AIGA online training. Breng jouw hele team in korte tijd op het vereiste niveau en ontvang audit-proof certificaten per medewerker.", ctas: [{ label: "Vraag direct een offerte aan", to: "/contact" }, { label: "Bekijk de training", to: "/training" }] },
  { min: 10, max: 17, badge: "AANDACHT VEREIST", color: "hsl(38, 92%, 50%)", h2: "Je bent bewust, maar nog niet compliant.", body: "Je organisatie is zich bewust van AI, maar compliance is nog geen realiteit. Er zijn geen formele certificaten, geen aantoonbare training en waarschijnlijk geen actueel beleid. Dat is te fixen, maar het vraagt actie nu.", rec: "Combineer de AIGA online training voor je team met de Masterclass voor je management. Zo pak je het op alle niveaus aan.", ctas: [{ label: "Bekijk de trainingsopties", to: "/voor-organisaties" }, { label: "Vraag offerte aan", to: "/contact" }] },
  { min: 18, max: 24, badge: "GOEDE BASIS", color: "hsl(189, 35%, 52%)", h2: "Je bent op de goede weg, maar nog niet klaar.", body: "Jouw organisatie heeft bewustzijn van AI en heeft stappen gezet. Maar voor volledige AI Act-compliance heb je audit-proof certificaten nodig per medewerker. Die ontbreken waarschijnlijk nog.", rec: "Formaliseer wat je al hebt. De AIGA online training sluit het gat tussen bewustzijn en bewijs.", ctas: [{ label: "Bekijk de online training", to: "/training" }] },
  { min: 25, max: 30, badge: "AI-READY", color: "hsl(160, 84%, 39%)", h2: "Indrukwekkend. Jouw organisatie loopt voor.", body: "Jouw team heeft een sterke basis voor AI-geletterdheid. Je hebt beleid, bewustzijn en waarschijnlijk al documentatie. Als je nog geen audit-proof certificaten hebt, is de AIGA training de logische volgende stap.", rec: "Overweeg de AIGA training als formele afsluiting van het traject dat je al bent ingegaan.", ctas: [{ label: "Bekijk de training", to: "/training" }] },
];

type Phase = "intro" | "quiz" | "gate" | "result";

const Quiz = () => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [gate, setGate] = useState({ voornaam: "", organisatie: "", email: "", aantal: "" });

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    setTimeout(() => {
      setAnswers([...answers, idx]);
      setSelected(null);
      if (current < 9) {
        setCurrent(current + 1);
      } else {
        setPhase("gate");
      }
    }, 400);
  };

  const score = answers.reduce((sum, a) => sum + a, 0);
  const tier = tiers.find((t) => score >= t.min && score <= t.max) || tiers[0];
  const pct = Math.round((score / 30) * 100);

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quiz lead:", { ...gate, score, tier: tier.badge });
    setPhase("result");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (phase === "intro") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <AnimatedSection>
            <SectionLabel text="GRATIS AI READINESS CHECK" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              Hoe AI-ready is jouw team?
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              10 vragen. 3 minuten. Direct resultaat. Ontdek waar jouw organisatie staat en wat de volgende stap is.
            </p>
            <button
              onClick={() => setPhase("quiz")}
              className="mt-8 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-[15px] hover:brightness-110 hover:-translate-y-px transition-all duration-300 shadow-lg shadow-primary/20"
            >
              Start de check
            </button>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  if (phase === "quiz") {
    const q = questions[current];
    return (
      <div className="min-h-screen flex flex-col">
        <div className="fixed top-16 left-0 right-0 z-40 bg-background border-b border-border">
          <div className="flex gap-1 p-2 max-w-xl mx-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < current ? "bg-primary" : i === current ? "bg-primary/50" : "bg-border"}`} />
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground pb-2">{current + 1} / 10</p>
        </div>

        <div className="flex-1 flex items-center justify-center pt-32 pb-16 px-4">
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
                      ? "border-primary bg-brand-dim text-foreground shadow-lg shadow-primary/5"
                      : "border-border bg-card text-foreground hover:border-primary/50 hover:shadow-md hover:shadow-primary/5"
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

  if (phase === "gate") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
          <h2 className="text-3xl font-display font-semibold text-foreground">Jouw resultaten zijn klaar.</h2>
          <p className="mt-4 text-muted-foreground">Vul je gegevens in om je persoonlijke AI Readiness Score te ontvangen, inclusief aanbeveling op maat.</p>
          <form onSubmit={handleGateSubmit} className="mt-8 space-y-4">
            {[
              { name: "voornaam", label: "Voornaam", required: true },
              { name: "organisatie", label: "Organisatie", required: true },
              { name: "email", label: "E-mailadres", required: true, type: "email" },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-sm text-muted-foreground mb-1 block">{f.label} <span className="text-primary">*</span></label>
                <input
                  type={f.type || "text"}
                  required={f.required}
                  value={gate[f.name as keyof typeof gate]}
                  onChange={(e) => setGate({ ...gate, [f.name]: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
            ))}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Aantal medewerkers</label>
              <select
                value={gate.aantal}
                onChange={(e) => setGate({ ...gate, aantal: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300"
              >
                <option value="">Selecteer...</option>
                <option value="1-10">1-10</option>
                <option value="10-50">10-50</option>
                <option value="50-250">50-250</option>
                <option value="250+">250+</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:brightness-110 transition-all duration-300 shadow-lg shadow-primary/20">
              Bekijk mijn score
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground text-center">We sturen je de resultaten ook per e-mail toe.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="max-w-2xl w-full text-center">
        <div className="relative inline-block mb-8">
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
            <span className="text-4xl font-mono font-bold text-foreground">{score}</span>
          </div>
        </div>

        <span
          className="inline-block text-xs font-medium uppercase tracking-[0.08em] px-3 py-1 rounded-full mb-4"
          style={{ color: tier.color, backgroundColor: `${tier.color}20` }}
        >
          {tier.badge}
        </span>

        <h2 className="text-3xl font-display font-semibold text-foreground mt-4">{tier.h2}</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl mx-auto">{tier.body}</p>

        <div className="mt-8 bg-brand-dim border border-primary/10 rounded-2xl p-8 text-left">
          <p className="text-sm font-semibold text-foreground mb-2">De volgende stap:</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{tier.rec}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {tier.ctas.map((c) => (
            <Link key={c.label} to={c.to} className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:brightness-110 transition-all duration-300 shadow-lg shadow-primary/20">
              {c.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>Deel jouw score</span>
          <button onClick={handleShare} className="text-primary hover:underline">Link kopieren</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;
