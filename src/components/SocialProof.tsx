import { Building2, Landmark, HeartPulse, GraduationCap, Briefcase, Star } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";

const sectors = [
  { icon: Building2, label: "Financiële sector" },
  { icon: Landmark, label: "Overheid" },
  { icon: HeartPulse, label: "Zorg" },
  { icon: GraduationCap, label: "Onderwijs" },
  { icon: Briefcase, label: "Zakelijke dienstverlening" },
];

const stats = [
  { value: "500+", label: "Gecertificeerde medewerkers" },
  { value: "40+", label: "Organisaties" },
  { value: "4.8/5", label: "Gemiddelde beoordeling" },
];

const testimonials = [
  {
    quote: "De AIGA training gaf ons team precies de kennis die we nodig hadden om verantwoord met AI om te gaan. Praktisch, helder en direct toepasbaar.",
    name: "Marieke de Vries",
    role: "HR-directeur",
    org: "Financiële instelling",
  },
  {
    quote: "Eindelijk een training die niet over techniek gaat, maar over wat AI betekent voor onze dagelijkse werkprocessen. Een must voor elke organisatie.",
    name: "Jan-Willem Bakker",
    role: "Afdelingshoofd",
    org: "Rijksoverheid",
  },
];

const SocialProof = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection>
        <div className="text-center">
          <SectionLabel text="SOCIAL PROOF" />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
            Vertrouwd door organisaties<br />
            <span className="text-primary">in heel Nederland.</span>
          </h2>
        </div>
      </AnimatedSection>

      {/* Sector icons */}
      <AnimatedSection delay={0.1}>
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {sectors.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center neon-glow hover:border-primary/40 transition-all duration-300">
                <s.icon size={28} className="text-primary/70" />
              </div>
              <span className="text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Stats */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <div className="text-center p-6 bg-card border border-border rounded-2xl neon-glow hover:border-primary/40 transition-all duration-300">
              <span className="text-3xl font-mono font-bold neon-text">{s.value}</span>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Testimonials */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 neon-glow transition-all duration-300 h-full flex flex-col">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-foreground leading-relaxed flex-1 italic">
                "{t.quote}"
              </blockquote>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}, {t.org}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default SocialProof;
