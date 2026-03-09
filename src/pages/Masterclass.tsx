import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";

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

const Masterclass = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="pt-32 pb-24">
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
          <Link to="/contact" className="inline-block mt-8 bg-primary text-primary-foreground px-7 py-3.5 rounded-lg font-semibold hover:brightness-110 hover:-translate-y-px transition-all duration-300 shadow-lg shadow-primary/20">
            Meld je aan of vraag een besloten sessie aan
          </Link>
        </AnimatedSection>
      </div>
    </section>

    {/* For who */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="VOOR WIE" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
            De Masterclass is bedoeld voor<br /><span className="text-primary">mensen die beslissingen nemen.</span>
          </h2>
          <div className="flex flex-wrap gap-3 mt-6">
            {["Directie & C-level", "HR-directeuren", "L&D-managers", "Beleidsmakers"].map((t) => (
              <span key={t} className="px-4 py-2 rounded-full border border-border text-sm text-foreground bg-card">{t}</span>
            ))}
          </div>
          <p className="mt-6 text-muted-foreground">Geen technische achtergrond nodig. Wel de wil om serieus aan de slag te gaan.</p>
        </AnimatedSection>
      </div>
    </section>

    {/* What you get */}
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="WAT JE MEENEEMT" />
        </AnimatedSection>
        <StaggerContainer className="space-y-6 mt-10 max-w-2xl">
          {takeaways.map((t, i) => (
            <StaggerItem key={i}>
              <div className="flex items-start gap-4">
                <span className="text-lg font-mono font-bold text-primary shrink-0">{String(i + 1).padStart(2, "0")}</span>
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

    {/* Program */}
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
              <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-semibold text-primary">{b.block}</span>
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

    {/* CTA */}
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl font-display font-semibold text-foreground text-center">
            Individueel aanmelden of<br /><span className="text-primary">als managementteam?</span>
          </h2>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
          <StaggerItem>
            <div className="bg-surface-2 border border-border rounded-2xl p-10 text-center h-full flex flex-col">
              <h3 className="text-lg font-semibold text-foreground mb-2">Open sessie</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">Meld je individueel aan voor een geplande open sessie.</p>
              <Link to="/contact" className="bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:brightness-110 transition-all duration-300 shadow-lg shadow-primary/20">
                Bekijk data en meld je aan
              </Link>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-surface-2 border border-border rounded-2xl p-10 text-center h-full flex flex-col">
              <h3 className="text-lg font-semibold text-foreground mb-2">Besloten sessie</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">Plan een exclusieve sessie voor jouw MT of directie. Op locatie of online, op een datum die jullie past.</p>
              <Link to="/contact" className="border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-accent transition-all duration-300">
                Vraag een besloten sessie aan
              </Link>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  </div>
);

export default Masterclass;
