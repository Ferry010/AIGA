import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, ClipboardCheck, Calculator, ShieldCheck, Search } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";

const includes = [
  "10 secties die alle deployer-verplichtingen van de AI Act afdekken",
  "Controles op basis van Artikel 4 (AI-geletterdheid) en Artikel 26 (deployer-plichten)",
  "Checkpunten voor menselijk toezicht, logging, incidentmelding en documentatie",
  "Print-ready A4-formaat — direct te gebruiken als werkdocument of auditbijlage",
  "Gebaseerd op de officiële tekst van Verordening (EU) 2024/1689",
];

const relatedTools = [
  { title: "AI Gereedheidscan", description: "Meet je AI Act readiness in 5 dimensies.", icon: ClipboardCheck, href: "/gereedheidscan" },
  { title: "Boetecalculator", description: "Bereken het boeterisico voor jouw organisatie.", icon: Calculator, href: "/tools/boetecalculator" },
  { title: "AI Use Case Checker", description: "Controleer of jouw AI-toepassing hoog risico is.", icon: Search, href: "/ai-use-case-checker" },
  { title: "AI Risicoscan", description: "Organisatiebreed risicoprofiel van al je AI-tools.", icon: ShieldCheck, href: "/tools/ai-risicoscan" },
];

const ChecklistLanding = () => {

  return (
    <div className="min-h-screen">
      <SEO
        title="AI Act Compliance Checklist — Gratis Download voor Deployers | AIGA"
        description="Download de gratis AI Act Compliance Checklist. 10 secties met alle deployer-verplichtingen uit de EU AI Act, inclusief Artikel 4 en 26. Direct toepasbaar als werkdocument of auditbijlage."
        canonical="/tools/downloads/ai-act-compliance-checklist"
      />
      <BreadcrumbNav items={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: "Downloads", href: "/tools/downloads" },
        { label: "AI Act Compliance Checklist" },
      ]} />

      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="GRATIS DOWNLOAD" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              AI Act Compliance Checklist<br />
              <span className="text-primary">voor deployers.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Eén overzichtelijk document met alle verplichtingen die de EU AI Act oplegt aan organisaties die AI-systemen inzetten. Van AI-geletterdheid tot incidentmelding — alles in 10 secties.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
              Vanaf 2 augustus 2025 wordt de AI Act actief gehandhaafd. Organisaties die hoog-risico AI-systemen gebruiken moeten aantoonbaar voldoen aan de deployer-verplichtingen uit Artikel 26. Deze checklist helpt je om niets over het hoofd te zien — of je nu begint met compliance of je huidige status wilt valideren.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
              Het document is gebaseerd op de officiële tekst van Verordening (EU) 2024/1689 en vertaald naar concrete, afvinkbare actiepunten. Geschikt voor compliance officers, HR-managers, IT-leads en directieleden.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(330,80%,55%)] hover:opacity-90 text-white"
            >
              <Link to="/tools/downloads/ai-act-compliance-checklist/document">Download gratis <ArrowRight size={16} /></Link>
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
              Alles wat je nodig hebt voor een complete AI Act audit.
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

    </div>
  );
};

export default ChecklistLanding;
