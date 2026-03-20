import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import TrainerSection from "@/components/TrainerSection";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";
import ferryImg from "@/assets/ferry-hoes.gif";

interface ArticleLink {
  title: string;
  slug: string | null;
}

const OverAiga = () => {
  const [articles, setArticles] = useState<ArticleLink[]>([]);

  useEffect(() => {
    supabase
      .from("articles")
      .select("title, slug")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => setArticles((data as ArticleLink[]) || []));
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Over AIGA | AI Geletterdheid Academy Nederland | Ferry Hoes"
        description="AIGA helpt Nederlandse organisaties met AI-geletterdheid en EU AI Act compliance. Opgericht door Ferry Hoes, AI-expert en keynote spreker."
        canonical="/over-aiga"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ferry Hoes",
          jobTitle: "AI-expert, Keynote Spreker & Mede-oprichter AIGA",
          url: "https://aigeletterdheid.academy/over-aiga",
          worksFor: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy" },
          award: "Winnaar Anti-Discriminatie AI-Hackathon 2020, Nederlandse overheid",
          knowsAbout: ["Artificial Intelligence", "AI-geletterdheid", "EU AI Act", "AI compliance", "Machine Learning"],
          description: "Ferry Hoes is AI-expert en keynote spreker. Hij staat meermaals per maand op het podium voor organisaties als a.s.r. Verzekeringen, VodafoneZiggo en meerdere Nederlandse Ministeries.",
        }}
      />
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Over AIGA" }]} />

      {/* Hero */}
      <section className="pt-12 pb-24">
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

      {/* Ferry Hoes - expanded bio */}
      <section className="py-24 bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="OPRICHTER & TRAINER" />
            <div className="flex flex-col sm:flex-row gap-8 mt-8">
              <div className="shrink-0">
                <img
                  src={ferryImg}
                  alt="Ferry Hoes, AI-expert en keynote spreker"
                  className="w-48 h-48 rounded-2xl object-cover"
                  loading="lazy"
                  decoding="async"
                  width={192}
                  height={192}
                />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">Ferry Hoes</h2>
                <p className="text-sm text-primary font-medium mt-1">AI-expert, Keynote Spreker & Mede-oprichter AIGA</p>
                <a
                  href="https://www.linkedin.com/in/ferryhoes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-block mt-2"
                >
                  Bekijk LinkedIn-profiel →
                </a>
              </div>
            </div>
            <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Ferry Hoes is een van de meest gevraagde sprekers en trainers op het gebied van kunstmatige intelligentie in Nederland. Als AI-expert en mede-oprichter van Brand Humanizing combineert hij diepgaande technische kennis met een uniek vermogen om complexe onderwerpen begrijpelijk te maken voor elk publiek.
              </p>
              <p>
                Ferry staat meermaals per maand op het podium voor toonaangevende organisaties in heel Nederland. Zijn klanten omvatten a.s.r. Verzekeringen, VodafoneZiggo, meerdere Nederlandse ministeries, zorginstellingen, onderwijsorganisaties en MKB-bedrijven. Hij spreekt zowel op internationale conferenties als in besloten boardrooms.
              </p>
              <p>
                In 2020 won Ferry de prestigieuze Anti-Discriminatie AI-Hackathon, georganiseerd door de Nederlandse overheid. Deze prijs bevestigde zijn expertise op het snijvlak van AI, ethiek en maatschappelijke verantwoordelijkheid. Thema's die centraal staan in al zijn trainingen en presentaties.
              </p>
              <p>
                Ferry gelooft dat AI-geletterdheid niet gaat over het leren van technische vaardigheden, maar over het begrijpen van de impact van AI op mensen, organisaties en de samenleving. Zijn aanpak is altijd praktisch, menselijk en direct toepasbaar. Hij praat niet over AI vanuit een theorieboek, maar vanuit de boardrooms, de werkvloeren en de workshops waar hij wekelijks aanwezig is.
              </p>
              <p>
                Als mede-oprichter van AIGA heeft Ferry het curriculum ontwikkeld voor de AI-geletterdheid training en de masterclass voor leidinggevenden. Beide programma's zijn gebaseerd op zijn jarenlange ervaring met het opleiden van teams en directies in verantwoord AI-gebruik.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Keynotes & media */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="KEYNOTES & MEDIA" />
            <h2 className="text-2xl font-display font-semibold text-foreground mt-2 mb-6">
              Recente opdrachtgevers
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Ferry verzorgt regelmatig keynotes, workshops en trainingen voor uiteenlopende organisaties in Nederland. Recente opdrachtgevers zijn onder meer:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "a.s.r. Verzekeringen",
                "VodafoneZiggo",
                "Gemeente Eindhoven",
                "GlaxoSmithKline",
                "Avans Hogeschool",
                "Vastgoed Nederland",
                "FNV",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 p-3 bg-card border border-border rounded-xl">
                  <span className="text-primary text-sm font-bold shrink-0">●</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* Articles by Ferry */}
      {articles.length > 0 && (
        <section className="py-24 bg-card">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <SectionLabel text="GEPUBLICEERD DOOR FERRY HOES" />
              <h2 className="text-2xl font-display font-semibold text-foreground mt-2 mb-6">
                Artikelen in het Kenniscentrum
              </h2>
              <ul className="space-y-2">
                {articles.filter(a => a.slug).map((a) => (
                  <li key={a.slug}>
                    <Link
                      to={`/kenniscentrum/${a.slug}`}
                      className="text-sm text-primary hover:underline"
                      rel="author"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>
      )}

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
};

export default OverAiga;
