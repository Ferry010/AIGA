import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import ferryImg from "@/assets/ferry-hoes.gif";

interface TrainerSectionProps {
  bio?: string;
}

const defaultBio =
  "Ferry Hoes is veelgevraagd spreker op het gebied van Artificial Intelligence. Hij staat meermaals per maand op het podium en spreekt voor organisaties zoals a.s.r Verzekeringen, VodafoneZiggo, MKB bedrijven en verschillende Ministeries. In 2020 won hij de \"Anti-Discriminatie AI-Hackathon\". Ferry weet precies hoe je AI-geletterdheid vertaalt naar actie, compliance én voordeel.";

const stats = [
  { val: "40+", label: "Keynotes per jaar, internationale events en in-house sessies" },
  { val: "15+", label: "Jaar ervaring van startups tot wereldwijde corporates in allerlei sectoren" },
  { val: "2020", label: "Winnaar prestigieuze AI Hackathon van de Nederlandse overheid" },
];

const testimonials = [
  {
    pull: "Ferry was een sterke keynote opening voor ons event.",
    quote: "Ferry is een kundige en toegankelijke spreker. Dit laatste merkte je op ons evenement aan de uitgebreide Q&A waar veel vragen uit de zaal kwamen over de ontwikkelingen op het gebied van AI. Met zijn expertise over de synergie tussen mens en technologie was Ferry een sterke keynote opening voor ons event.",
    name: "Iris",
    company: "Aces Direct",
  },
  {
    pull: "Zelfs deelnemers zonder ervaring kwamen verrast en zeer enthousiast de workshop uit.",
    quote: "Ferry heeft de gave om ingewikkelde theorie op een toegankelijke manier aan het publiek uit te leggen. De ervaring met AI onder de deelnemers liep sterk uiteen; van helemaal geen ervaring tot medewerkers die er al dagelijks mee werken. Zelfs degenen zonder enige ervaring kwamen verrast en zeer enthousiast de workshop uit.",
    name: "Maud",
    company: "Chubb Fire & Security",
  },
  {
    pull: "Ferry past zich perfect aan op de doelgroep.",
    quote: "Ferry is een hele fijne spreker. Hij past zich perfect aan op de doelgroep en liet ook tijdens de workshops zien zeer flexibel en alert te zijn op reacties vanuit de zaal. Wij zijn zeer blij met de samenwerking met Ferry en hij heeft onze relaties veel inspiratie gegeven waarmee ze aan de slag kunnen.",
    name: "Almer",
    company: "ASR",
  },
];

const TrainerSection = ({ bio = defaultBio }: TrainerSectionProps) => (
  <section className="py-24 bg-card">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection>
        <SectionLabel text="DE TRAINER" />
        <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
          Niet zomaar een training.<br />
          <span className="text-primary">Een expert die het veld kent.</span>
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mt-12">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-5/12 shrink-0">
            <div className="neon-border-lg rounded-2xl" style={{ padding: '3px' }}>
              <div className="neon-inner bg-card rounded-2xl overflow-hidden">
                <img
                  src={ferryImg}
                  alt="Ferry Hoes"
                  className="w-full aspect-[4/3] object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 pt-2">
            <h3 className="text-xl font-semibold text-foreground mb-4">Ferry Hoes</h3>
            <p className="text-muted-foreground leading-relaxed">{bio}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {stats.map((s) => (
                <div key={s.val} className="bg-background border border-border rounded-xl p-4 hover:border-neon-purple/40 neon-glow transition-all duration-300">
                  <span className="text-2xl font-mono font-bold neon-text">{s.val}</span>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection delay={0.3} className="mt-16">
        <p className="text-sm italic text-muted-foreground mb-6">
          Ervaringen van organisaties die Ferry boekten als spreker of workshopbegeleider
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative bg-background border border-border rounded-xl p-6 hover:border-neon-purple/40 neon-glow transition-all duration-300"
            >
              {/* Decorative quote mark */}
              <span
                className="absolute -top-2 left-4 text-6xl font-display leading-none neon-text select-none pointer-events-none opacity-30"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <p className="font-display font-semibold text-foreground text-base mb-3 relative z-10">
                {t.pull}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                {t.name} · <span className="font-normal">{t.company}</span>
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default TrainerSection;
