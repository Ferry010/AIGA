import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
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

      {/* Layout: image left + text & stats right */}
      <AnimatedSection delay={0.2} className="mt-12">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Image card – wider than tall */}
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

          {/* Text + stats */}
          <div className="flex-1 pt-2">
            <h3 className="text-xl font-semibold text-foreground mb-4">Ferry Hoes</h3>
            <p className="text-muted-foreground leading-relaxed">{bio}</p>

            {/* Stats directly below text */}
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
    </div>
  </section>
);

export default TrainerSection;
