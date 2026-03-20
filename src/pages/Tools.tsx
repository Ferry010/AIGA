import { Link } from "react-router-dom";
import { ArrowRight, Calculator, ClipboardCheck, FileDown, FileText, ShieldCheck } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";

const scans = [
  {
    title: "AI Risicoscan",
    description: "Breng het AI-risicoprofiel van jouw organisatie in kaart en ontvang direct advies.",
    icon: ShieldCheck,
    href: "/gereedheidscan",
    available: true,
  },
  {
    title: "Boetecalculator",
    description: "Wat kost niet-compliance jouw organisatie? Bereken het risico op basis van de AI Act.",
    icon: Calculator,
    href: null,
    available: false,
  },
  {
    title: "AI Readiness Scan",
    description: "Hoe scoort jouw organisatie op AI-gereedheid? Ontdek het in 5 minuten.",
    icon: ClipboardCheck,
    href: null,
    available: false,
  },
];

const downloads = [
  {
    title: "AI Act Compliance Checklist (PDF)",
    description: "Stap-voor-stap checklist om te voldoen aan de EU AI Act verplichtingen.",
    icon: FileDown,
    available: false,
  },
  {
    title: "AI-beleid opstellen — gratis template",
    description: "Download een kant-en-klaar template om jouw organisatie-breed AI-beleid op te stellen.",
    icon: FileText,
    available: false,
  },
];

const Tools = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Tools & Scans | AI Act Compliance | AIGA"
        description="Praktische tools om jouw AI Act compliance te beoordelen. Risicoscan, boetecalculator, checklists en templates — gratis te gebruiken."
        canonical="/tools"
      />
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />

      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="TOOLS & SCANS" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              Praktische tools voor<br />
              <span className="text-primary">AI Act compliance.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Scans, calculators en downloads om jouw AI Act compliance te beoordelen. Gratis te gebruiken, direct toepasbaar.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Scans & Calculators */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="SCANS & CALCULATORS" />
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {scans.map((scan) => {
              const Icon = scan.icon;
              const inner = (
                <Card className="h-full border-border hover:border-primary/40 neon-glow transition-all duration-300 group">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-display font-semibold text-foreground">{scan.title}</h3>
                      {!scan.available && (
                        <Badge variant="secondary" className="text-xs shrink-0">Binnenkort beschikbaar</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{scan.description}</p>
                    {scan.available && (
                      <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                        Start de scan <ArrowRight size={16} />
                      </span>
                    )}
                  </CardContent>
                </Card>
              );

              return (
                <StaggerItem key={scan.title}>
                  {scan.available && scan.href ? (
                    <Link to={scan.href} className="block h-full">{inner}</Link>
                  ) : (
                    <div className="opacity-75 cursor-default">{inner}</div>
                  )}
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Downloads */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="DOWNLOADS" />
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {downloads.map((dl) => {
              const Icon = dl.icon;
              return (
                <StaggerItem key={dl.title}>
                  <div className="opacity-75 cursor-default">
                    <Card className="h-full border-border">
                      <CardContent className="p-6 flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                          <Icon size={24} className="text-primary" />
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-display font-semibold text-foreground">{dl.title}</h3>
                          <Badge variant="secondary" className="text-xs shrink-0">Binnenkort beschikbaar</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{dl.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
};

export default Tools;
