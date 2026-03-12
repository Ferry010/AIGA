import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import ferryImg from "@/assets/ferry-hoes.gif";

const OverAiga = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="OVER AIGA" />
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
            AI-geletterdheid is geen buzzword.<br />
            <span className="text-primary">Het is de basis.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            AIGA is opgericht met een duidelijk doel: organisaties helpen om serieus, verantwoord en strategisch met AI om te gaan.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* Story */}
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="ONS VERHAAL" />
          <h2 className="text-3xl font-display font-semibold text-foreground mt-2">Waarom wij dit doen.</h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>De EU AI Act is niet het beginpunt. Al jaren zien wij dat organisaties AI inzetten zonder dat medewerkers begrijpen wat dat betekent. Kansen worden gemist. Risico's worden genegeerd. En wanneer er iets fout gaat, is niemand verantwoordelijk.</p>
            <p>AIGA is de reactie op dat probleem. Een praktische, inhoudelijke training die medewerkers op elk niveau geeft wat ze nodig hebben. Niet meer, niet minder.</p>
            <p>Wij geloven dat AI pas echt waarde toevoegt als mensen begrijpen wat het is, wat het kan en wat de grenzen zijn.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Ferry's profile */}
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="DE TRAINER" />
          <h2 className="text-3xl font-display font-semibold text-foreground mt-2">Ferry Hoes</h2>
        </AnimatedSection>
        <AnimatedSection delay={0.2} className="flex flex-col md:flex-row gap-12 mt-10 items-center">
          <div className="neon-border-lg" style={{ borderRadius: '9999px', padding: '3px' }}>
            <img src={ferryImg} alt="Ferry Hoes" className="w-56 h-56 rounded-full object-cover" />
          </div>
          <div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ferry Hoes is keynote spreker, AI-expert en mede-oprichter van Brand Humanizing. Hij staat meermaals per maand op het podium voor organisaties in de financiele sector, de zorg, de overheid en het onderwijs. In 2020 won hij de Anti-Discriminatie AI-Hackathon.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Ferry praat niet over AI vanuit een theorieboek. Hij praat erover vanuit de boardrooms, de werkvloeren en de workshops waar hij wekelijks aanwezig is.
            </p>
            <div className="flex flex-wrap gap-8 text-sm">
              {[
                { val: "40+", label: "Keynotes per jaar, internationale events en in-house sessies" },
                { val: "15+", label: "Jaar ervaring van startups tot wereldwijde corporates" },
                { val: "2020", label: "Winnaar prestigieuze AI Hackathon van de Nederlandse overheid" },
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

    {/* Partners */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="IN SAMENWERKING MET" />
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Speakers Academy</h3>
              <p className="text-sm text-muted-foreground">Toonaangevend bureau voor professionele sprekers in Nederland.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Brand Humanizing</h3>
              <p className="text-sm text-muted-foreground">Het gedachtegoed achter de mensgerichte aanpak van AI.</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Principles */}
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="WAT ONS ONDERSCHEIDT" />
          <h2 className="text-3xl font-display font-semibold text-foreground mt-2">
            Drie principes.<br /><span className="text-primary">Een richting.</span>
          </h2>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { title: "Praktisch boven theoretisch", body: "Elke les is gekoppeld aan situaties die medewerkers echt tegenkomen op de werkvloer." },
            { title: "Menselijk boven technisch", body: "AI-geletterdheid gaat niet over code. Het gaat over begrip, verantwoordelijkheid en vertrouwen." },
            { title: "Toepasbaar boven compliant", body: "We helpen organisaties niet alleen aan een certificaat. We helpen ze een cultuur bouwen waarin AI slim en verantwoord wordt ingezet." },
          ].map((c) => (
            <StaggerItem key={c.title}>
              <div className="bg-background border border-border rounded-2xl p-10 hover:border-neon-purple/40 neon-glow transition-all duration-300 h-full neon-card-top">
                <h3 className="text-lg font-semibold text-foreground mb-3">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  </div>
);

export default OverAiga;
