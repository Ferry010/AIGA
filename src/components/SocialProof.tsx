import { ShieldCheck, Mic, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Wettelijk verplicht sinds februari 2025",
    text: "De EU AI Act vereist aantoonbare AI-geletterdheid voor alle medewerkers die met AI werken. Onze training is hier specifiek op ontworpen.",
  },
  {
    icon: Mic,
    title: "Ontwikkeld door een erkend AI-expert",
    text: "Ferry Hoes spreekt maandelijks voor organisaties als a.s.r. Verzekeringen, VodafoneZiggo en meerdere Nederlandse Ministeries. De training komt rechtstreeks uit de praktijk.",
  },
  {
    icon: Award,
    title: "Audit-proof certificaat",
    text: "Iedere deelnemer ontvangt een digitaal ondertekend AI Literacy Practitioner certificaat, deelbaar via LinkedIn en geldig als bewijs bij een audit.",
  },
];

const SocialProof = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection>
        <div className="text-center">
          <SectionLabel text="WAAROM AIGA" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
            Gebouwd op expertise.<br />
            <span className="text-primary">Niet op beloften.</span>
          </h2>
        </div>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {pillars.map((p) => (
          <StaggerItem key={p.title}>
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 neon-glow transition-all duration-300 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5">
                <p.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.text}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatedSection delay={0.3}>
        <p className="text-center text-sm text-muted-foreground mt-12">
          Benieuwd of dit past bij jouw organisatie?{" "}
          <Link to="/contact" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
            Offerte aanvragen
          </Link>{" "}
          of{" "}
          <Link to="/risicoscan" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
            doe de scan
          </Link>
          .
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default SocialProof;
