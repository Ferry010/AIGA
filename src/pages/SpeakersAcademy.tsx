import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import SEO from "@/components/SEO";
import speakersLogo from "@/assets/speakers-academy-logo.png";
import ferryImg from "@/assets/ferry-hoes.gif";

const stats = [
  { val: "40+", label: "Keynotes per jaar, internationale events en in-house sessies" },
  { val: "15+", label: "Jaar ervaring van startups tot wereldwijde corporates in allerlei sectoren" },
  { val: "2020", label: "Winnaar prestigieuze AI Hackathon van de Nederlandse overheid" },
];

const testimonials = [
  {
    pull: "Heel fijn hoe Ferry ook voor niet-technische collega's het onderwerp toegankelijk maakt.",
    quote: "Ferry weet als geen ander hoe je AI begrijpelijk maakt voor een breed publiek. Heel fijn hoe hij ook voor niet-technische collega's het onderwerp toegankelijk maakt, zonder in te leveren op inhoudelijke diepgang. Onze teams gingen direct aan de slag met de inzichten.",
    name: "Laurens Baars",
    company: "ATOS",
  },
  {
    pull: "Zelfs deelnemers zonder ervaring kwamen verrast en zeer enthousiast de workshop uit.",
    quote: "Ferry heeft de gave om ingewikkelde theorie op een toegankelijke manier aan het publiek uit te leggen. De ervaring met AI onder de deelnemers liep sterk uiteen; van helemaal geen ervaring tot medewerkers die er al dagelijks mee werken. Zelfs degenen zonder enige ervaring kwamen verrast en zeer enthousiast de workshop uit.",
    name: "Maud",
    company: "Chubb Fire & Security",
  },
];

const SpeakersAcademy = () => (
  <div className="min-h-screen">
    <SEO
      title="Speakers Academy x AIGA | Van inspiratie naar actie"
      description="Speakers Academy en AIGA: van keynote inspiratie naar gecertificeerde AI-geletterdheid. Boek Ferry Hoes als spreker of certificeer je team via de AIGA training."
    />

    {/* 1. Hero */}
    <section className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="EEN SAMENWERKING" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-foreground mt-2">
            Van inspiratie naar actie.
          </h1>
          <p className="text-xl sm:text-2xl font-display text-primary mt-4">
            Gebouwd op 30 jaar sprekerservaring. Gericht op jouw team.
          </p>
          <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
            Speakers Academy is het sprekersplatform van Nederland. AIGA is het AI-geletterdheidsplatform dat we samen bouwen, zodat organisaties niet alleen geïnspireerd worden, maar ook echt voorbereid zijn.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link to="/training" className="btn-neon inline-block px-6 py-3 rounded-lg text-[15px]">
              Bekijk de training
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* 2. Partner */}
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="DE PARTNER" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
            30 jaar kennis aan het podium.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-3xl leading-relaxed">
            Speakers Academy koppelt organisaties al meer dan 30 jaar aan de beste sprekers van Nederland, van wetenschappers en CEO's tot beleidsmakers en thought leaders. Ferry Hoes is een van hun meest gevraagde AI-sprekers. Dat vertrouwen vormt de basis van AIGA.
          </p>
          <div className="mt-8">
            <img src={speakersLogo} alt="Speakers Academy" className="rounded" style={{ height: '65px' }} />
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* 3. Waarom een training */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="DE LOGICA" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
            Bewustwording is het begin.<br />
            <span className="text-primary">Kennis is het fundament.</span>
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={0.2} className="mt-10 max-w-3xl space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Een keynote opent ogen. Maar bewustwording alleen is niet genoeg om te voldoen aan de AI Act. Artikel 4 vereist dat medewerkers aantoonbaar beschikken over AI-kennis, niet alleen dat ze er een keer over gehoord hebben.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Daarom heeft Ferry, naast zijn werk als spreker, de AIGA online training ontwikkeld. Dezelfde inhoudelijke diepgang als zijn keynotes, maar gestructureerd als een volwaardig leertraject: met modules, praktijkcases, een adaptief examen en een audit-proof certificaat.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Het resultaat: organisaties die niet alleen geïnspireerd zijn, maar ook compliant, bekwaam en voorbereid.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* 4. Ferry */}
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="DE TRAINER" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
            Dezelfde expert.<br />
            <span className="text-primary">Nu in jouw organisatie.</span>
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
              <p className="text-muted-foreground leading-relaxed">
                Ferry Hoes staat meermaals per maand op het podium voor organisaties als a.s.r. Verzekeringen, VodafoneZiggo en verschillende Ministeries. In 2020 won hij de Anti-Discriminatie AI-Hackathon. Hij weet precies hoe je AI-geletterdheid vertaalt naar actie, compliance en voordeel.
              </p>

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="relative bg-background border border-border rounded-xl p-6 hover:border-neon-purple/40 neon-glow transition-all duration-300"
              >
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

    {/* 5. De volgende stap */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel text="DE VOLGENDE STAP" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
            Jouw team AI-geletterd maken.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-3xl leading-relaxed">
            Organisaties die Ferry kennen via Speakers Academy weten wat hij brengt. AIGA vertaalt die kennis naar jouw hele team. Online, selfpaced, schaalbaar tot 1000+ medewerkers. Met een audit-proof certificaat per deelnemer.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link to="/voor-teams" className="btn-neon inline-block px-6 py-3 rounded-lg text-[15px]">
              Bekijk de training
            </Link>
            <Link to="/contact" className="btn-neon-outline inline-block text-sm font-semibold px-6 py-3">
              Vraag een offerte aan
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* 6. Footer CTA */}
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
            Klaar om de volgende stap te zetten?
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/training" className="btn-neon inline-block px-8 py-4 rounded-lg text-[15px]">
              Bekijk de AIGA training
            </Link>
            <a
              href="https://www.speakersacademy.com/nl/spreker/ferry-hoes"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon-outline inline-block text-sm font-semibold px-8 py-4"
            >
              Boek Ferry als spreker
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default SpeakersAcademy;
