import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, CheckCircle, ClipboardCheck, Calculator, ShieldCheck, Search, FileText } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";
import DownloadLeadDialog from "@/components/DownloadLeadDialog";

const includes = [
  "Invulbare secties voor scope, doelstellingen en verantwoordelijkheden",
  "Governance-structuur: wie beslist over AI-inzet binnen jouw organisatie",
  "Risicoclassificatie-kader op basis van Bijlage III van de AI Act",
  "Secties voor AI-geletterdheid, menselijk toezicht en incidentprocedures",
  "Compliance-verklaring en goedkeuringsproces voor nieuwe AI-toepassingen",
  "Gebaseerd op de officiële tekst van Verordening (EU) 2024/1689",
];

const relatedTools = [
  { title: "AI Act Compliance Checklist", description: "Stap-voor-stap checklist voor deployers.", icon: ClipboardCheck, href: "/tools/downloads/ai-act-compliance-checklist" },
  { title: "Boetecalculator", description: "Bereken het boeterisico voor jouw organisatie.", icon: Calculator, href: "/tools/boetecalculator" },
  { title: "AI Use Case Checker", description: "Controleer of jouw AI-toepassing hoog risico is.", icon: Search, href: "/ai-use-case-checker" },
  { title: "AI Risicoscan", description: "Organisatiebreed risicoprofiel van al je AI-tools.", icon: ShieldCheck, href: "/tools/ai-risicoscan" },
];

const BeleidstemplateLanding = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <SEO
        title="AI Beleid Opstellen — Gratis Template voor EU AI Act Compliance | AIGA"
        description="Download een gratis, invulbaar AI-beleidstemplate. Voldoe aan de documentatie-eisen van de EU AI Act met een kant-en-klaar organisatiebeleid voor verantwoord AI-gebruik."
        canonical="/tools/downloads/ai-beleid-opstellen"
      />
      <BreadcrumbNav items={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: "Downloads", href: "/tools/downloads" },
        { label: "AI-beleid opstellen" },
      ]} />

      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="GRATIS DOWNLOAD" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              AI-beleid opstellen —<br />
              <span className="text-primary">gratis template.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Elke organisatie die AI inzet heeft een intern AI-beleid nodig. Dit template geeft je een kant-en-klare structuur die je kunt aanpassen aan jouw organisatie — van scope en governance tot risicoclassificatie en incidentprocedures.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
              De EU AI Act verplicht organisaties om beleid en procedures te documenteren rondom het gebruik van AI-systemen. Zonder een vastgelegd AI-beleid loop je het risico om bij een audit niet te kunnen aantonen dat je verantwoord met AI omgaat. Dit template helpt je om in één middag een solide basis neer te zetten.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
              Geschikt voor HR-managers, compliance officers, directieleden en IT-leads die AI-governance willen formaliseren voordat de handhaving start in augustus 2025.
            </p>
            <Button
              onClick={() => setDialogOpen(true)}
              size="lg"
              className="mt-8 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(330,80%,55%)] hover:opacity-90 text-white"
            >
              Download gratis <ArrowRight size={16} />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* What's included */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="WAT ZIT ERIN?" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-4 mb-8">
              Een compleet AI-beleid in één document.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="space-y-4 max-w-2xl">
            {includes.map((item, i) => (
              <StaggerItem key={i}>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground leading-relaxed">{item}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <Button
            onClick={() => setDialogOpen(true)}
            className="mt-8 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(330,80%,55%)] hover:opacity-90 text-white"
          >
            Download gratis <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      {/* Related tools */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="GERELATEERDE TOOLS" />
            <h2 className="text-2xl font-display font-bold text-foreground mt-4 mb-6">
              Meer tools voor jouw AI Act compliance.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <StaggerItem key={tool.title}>
                  <Link to={tool.href} className="block h-full">
                    <Card className="h-full border-border hover:border-primary/40 neon-glow transition-all duration-300 group">
                      <CardContent className="p-5 flex flex-col gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                          <Icon size={20} className="text-primary" />
                        </div>
                        <h3 className="text-sm font-display font-semibold text-foreground">{tool.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                        <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                          Bekijk <ArrowRight size={14} />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <DownloadLeadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        document="template"
        onSuccess={() => navigate("/tools/downloads/ai-beleid-opstellen/document")}
      />
    </div>
  );
};

export default BeleidstemplateLanding;
