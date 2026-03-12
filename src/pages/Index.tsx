import { Link } from "react-router-dom";
import { AlertTriangle, FileX, Clock, HelpCircle, Play, Award, Users, Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { motion } from "framer-motion";

const Index = () => {

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel text="AI GELETTERDHEID VOOR TEAMS" />
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-display font-bold text-foreground leading-tight mt-4">
              Jouw team werkt al met AI.<br />
              <span className="neon-text">Weet iedereen wat dat betekent?</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Sinds februari 2025 is AI-geletterdheid wettelijk verplicht voor organisaties in de EU. Wij helpen je team voldoen aan de AI Act, met een praktische online training en een digitaal certificaat dat telt bij een audit.
            </p>
            <div className="mt-8">
              <Link to="/training" className="btn-neon px-7 py-3.5 rounded-lg text-[15px]">
                Start direct
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-6 text-xs text-muted-foreground/70">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-primary/60" /> Per seat beschikbaar</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-primary/60" /> Gratis Masterclass vanaf 50 seats</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-primary/60" /> Direct starten</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Urgency Banner */}
      <AnimatedSection>
        <div className="bg-amber-50 border-l-[3px] border-warning mx-4 sm:mx-8 lg:mx-auto max-w-7xl px-6 py-5 rounded-r-lg">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-amber-700 font-body">Deadline</span>
            <p className="text-sm text-foreground leading-relaxed">
              Per augustus 2025 wordt de AI Act actief gehandhaafd. Organisaties zonder gecertificeerde medewerkers riskeren boetes.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Logo strip */}
      <AnimatedSection className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="GECERTIFICEERD BIJ ONDER ANDERE" />
          <div className="flex flex-wrap gap-8 mt-6 text-sm text-muted-foreground opacity-50">
            {["a.s.r. Verzekeringen", "VodafoneZiggo", "Speakers Academy", "Ministeries"].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Problem section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="HERKEN JE DIT?" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
              De wet is in werking.<br />
              <span className="text-primary">Maar is jouw team er klaar voor?</span>
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              { icon: AlertTriangle, title: "Medewerkers gebruiken AI zonder kader", body: "ChatGPT, Copilot, sociale media advertenties. Als ze het gebruiken, vallen ze onder de AI Act. Weten ze dat?" },
              { icon: FileX, title: "Geen bewijs bij een audit", body: "HR vraagt om bewijs. Je hebt geen documentatie. Een audit wordt een probleem." },
              { icon: Clock, title: "Geen tijd voor klassikale training", body: "Je team is druk. Roosters zijn vol. Een meerdaagse training is geen optie." },
              { icon: HelpCircle, title: "Onduidelijk wat de wet precies vereist", body: "De AI Act is complex. Wat geldt voor jouw sector, jouw functies, jouw tools?" },
            ].map((c) => (
              <StaggerItem key={c.title}>
                <div className="bg-card border border-border rounded-2xl p-10 hover:border-neon-purple/40 neon-glow transition-all duration-300 group">
                  <c.icon size={24} className="text-neon-purple mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Solution section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="DE OPLOSSING" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
              Een training die werkt,<br />
              <span className="text-primary">voor teams die al druk zijn.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
              Geen gedoe. Geen planningshoofdbrekens. Gewoon geregeld. De AIGA online training geeft medewerkers precies de kennis die ze nodig hebben. Zelfstandig, in eigen tempo, volledig online. Na afloop ontvangen ze een audit-proof certificaat waarmee jouw organisatie aantoont te voldoen aan de AI Act.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {[
              { icon: Play, title: "Zelfpaced", body: "Geen klassikale sessies. Medewerkers volgen de training wanneer het hen uitkomt, in 2 tot 3 uur." },
              { icon: Award, title: "Gecertificeerd", body: "Iedere deelnemer ontvangt het AI Literacy Practitioner certificaat. OpenBadge, digitaal ondertekend, audit-proof." },
              { icon: Users, title: "Schaalbaar", body: "Per seat te boeken, geen minimumafname. Geschikt voor teams van 1 tot 1000+ medewerkers. Voortgangsdashboard inbegrepen." },
            ].map((c) => (
              <StaggerItem key={c.title}>
                <c.icon size={24} className="text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="HOE HET WERKT" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
              Van aanvraag tot certificaat<br />
              <span className="text-primary">in drie stappen.</span>
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {[
              { step: "01", title: "Kies het aantal seats", body: "Selecteer 1, 25, 50 of 100+ seats. We stellen de omgeving direct in." },
              { step: "02", title: "Medewerkers volgen de training zelfstandig", body: "Volledig online, in eigen tempo. Videolessen, praktijkcases en een adaptief afsluitend examen." },
              { step: "03", title: "Ontvang de certificaten", body: "Iedere deelnemer ontvangt het AI Literacy Practitioner certificaat. Digitaal ondertekend, OpenBadge, direct deelbaar via LinkedIn." },
            ].map((s) => (
              <StaggerItem key={s.step}>
                <div className="relative">
                  <span className="text-5xl font-mono neon-text font-bold">{s.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="py-24 bg-brand-dim border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <SectionLabel text="WEET JIJ HOE READY JE TEAM IS?" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
              Doe de gratis AI Readiness Check.<br />
              <span className="text-primary">In vijf minuten weet je waar je staat.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              10 vragen. Direct resultaat. Inclusief persoonlijk advies op maat.
            </p>
            <Link to="/quiz" className="btn-neon inline-block mt-8 px-8 py-4 rounded-lg text-[15px]">
              Doe de gratis quiz
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Ons Aanbod — Two product cards */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center"><SectionLabel text="ONS AANBOD" /></div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2 text-center">
              Kies wat bij jouw organisatie past.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* Training card — featured */}
            <StaggerItem>
              <div className="neon-border-lg h-full">
                <div className="neon-inner bg-background rounded-2xl p-8 sm:p-10 h-full flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-[0.08em] neon-text mb-2">ONLINE TRAINING</span>
                  <h3 className="text-xl font-semibold text-foreground">AI-Geletterdheid voor teams</h3>
                  <p className="text-sm text-muted-foreground mt-1">Vanaf 10 deelnemers</p>
                  <p className="text-2xl font-bold text-foreground mt-4">249,- <span className="text-sm font-normal text-muted-foreground">per deelnemer (ex BTW)</span></p>
                  <ul className="space-y-2 mt-6 mb-8 flex-1">
                    {[
                      "Volledig online, in eigen tempo",
                      "Adaptief examen",
                      "AI Literacy Practitioner certificaat",
                      "Voortgangsdashboard",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check size={14} className="text-primary mt-0.5 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/training" className="btn-neon text-center py-3 rounded-lg text-sm">
                    Bekijk training
                  </Link>
                </div>
              </div>
            </StaggerItem>

            {/* Masterclass card */}
            <StaggerItem>
              <div className="bg-card rounded-2xl p-8 sm:p-10 h-full flex flex-col border border-border hover:border-neon-purple/40 neon-glow transition-all duration-300">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground mb-2">MASTERCLASS</span>
                <h3 className="text-xl font-semibold text-foreground">AI Geletterdheid voor leidinggevenden</h3>
                <p className="text-sm text-muted-foreground mt-1">Min. 5 deelnemers · op locatie</p>
                <p className="text-2xl font-bold text-foreground mt-4">495,- <span className="text-sm font-normal text-muted-foreground">per deelnemer (ex BTW)</span></p>
                <p className="text-xs text-muted-foreground mt-1">Gratis bij 50+ training seats</p>
                <ul className="space-y-2 mt-6 mb-8 flex-1">
                  {[
                    "In-company, ca. 2 uur",
                    "Voor C-level, management & beleidsmakers",
                    "Strategisch inzicht in de AI Act",
                    "Direct toepasbaar in beleid",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={14} className="text-primary mt-0.5 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link to="/masterclass" className="btn-neon-outline text-center py-3 font-semibold text-sm">
                  Bekijk masterclass
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* About Ferry */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="DE TRAINER" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
              Niet zomaar een training.<br />
              <span className="text-primary">Een expert die het veld kent.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="flex flex-col md:flex-row gap-12 mt-12 items-center">
            <div className="neon-border-lg rounded-full" style={{ borderRadius: '9999px', padding: '3px' }}>
              <div className="w-48 h-48 rounded-full bg-background flex items-center justify-center">
                <span className="text-4xl font-display font-bold neon-text">FH</span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Ferry Hoes staat meermaals per maand op het podium voor organisaties als a.s.r. Verzekeringen, VodafoneZiggo en verschillende Ministeries. In 2020 won hij de Anti-Discriminatie AI-Hackathon. Hij weet precies hoe je AI-geletterdheid vertaalt naar actie, compliance en voordeel.
              </p>
              <div className="flex flex-wrap gap-8 text-sm">
                {[
                  { val: "20+", label: "keynotes per jaar" },
                  { val: "1000+", label: "medewerkers bereikt" },
                  { val: "2020", label: "Winner AI Hackathon" },
                ].map((s) => (
                  <div key={s.label}>
                    <span className="text-2xl font-mono font-bold neon-text">{s.val}</span>
                    <p className="text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
              Klaar om jouw team te certificeren?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Vraag een offerte aan en ontvang binnen 24 uur een voorstel op maat. Geen verplichtingen.
            </p>
            <Link to="/contact" className="btn-neon inline-block mt-8 px-8 py-4 rounded-lg text-[15px]">
              Vraag offerte aan
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">Of bel direct: +31 (0)10 316 7827</p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
