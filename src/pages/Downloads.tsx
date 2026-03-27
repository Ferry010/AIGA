import { Link } from "react-router-dom";
import { ClipboardCheck, FileText, ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";

type DocumentType = "checklist" | "template";

const documents = [
  {
    type: "checklist" as DocumentType,
    title: "AI Act Compliance Checklist",
    description:
      "Stap-voor-stap controlelijst voor deployers. Dek alle verplichtingen onder de EU AI Act af: van AI-geletterdheid tot toezicht en documentatie.",
    icon: ClipboardCheck,
    href: "/tools/downloads/ai-act-compliance-checklist",
  },
  {
    type: "template" as DocumentType,
    title: "AI-beleid opstellen — template",
    description:
      "Kant-en-klaar beleidstemplate. Pas aan voor jouw organisatie en voldoe direct aan de documentatie-eisen van de AI Act.",
    icon: FileText,
    href: "/tools/downloads/ai-beleid-opstellen",
  },
];

const Downloads = () => {

  return (
    <div className="min-h-screen">
      <SEO
        title="Gratis Downloads | AI Act Compliance | AIGA"
        description="Download gratis de AI Act Compliance Checklist en een kant-en-klaar AI-beleidstemplate. Gebaseerd op de officiële tekst van de EU AI Act."
        canonical="/tools/downloads"
      />
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Downloads" }]} />

      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="GRATIS DOWNLOADS" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              Praktische documenten voor
              <br />
              <span className="text-primary">jouw AI Act compliance.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Twee gratis werkdocumenten voor HR, compliance en management. Gebaseerd op de officiële tekst van de EU AI
              Act (Verordening 2024/1689).
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Cards */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {documents.map((doc) => {
              const Icon = doc.icon;
              return (
                <StaggerItem key={doc.type}>
                  <Card className="h-full border-border hover:border-primary/40 neon-glow transition-all duration-300 group">
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <Icon size={24} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-display font-semibold text-foreground">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{doc.description}</p>
                      <Badge variant="secondary" className="w-fit text-xs">
                        PDF · Gratis · Bijgewerkt 2025
                      </Badge>
                      <Button
                        asChild
                        className="mt-auto w-fit btn-neon"
                      >
                        <Link to={doc.href}>Download gratis <ArrowRight size={16} /></Link>
                      </Button>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

    </div>
  );
};

export default Downloads;
