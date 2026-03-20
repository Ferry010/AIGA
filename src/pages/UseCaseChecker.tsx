import SEO from "@/components/SEO";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import AiUseCaseChecker from "@/components/AiUseCaseChecker";

const UseCaseChecker = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="AI Use Case Checker | Valt jouw AI-gebruik onder hoog risico? | AIGA"
        description="Controleer per AI-tool en toepassing of jouw gebruik onder hoog risico valt volgens de EU AI Act. Selecteer een tool, kies je use case en zie direct het oordeel."
        canonical="/ai-use-case-checker"
      />
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "AI Use Case Checker" }]} />

      <section className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="AI USE CASE CHECKER" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              Valt jouw AI-gebruik onder<br />
              <span className="text-primary">hoog risico?</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              De EU AI Act categoriseert geen tools, maar toepassingen. Selecteer hieronder je AI-tool en toepassing om direct te zien welk risiconiveau van toepassing is.
            </p>
          </AnimatedSection>
          <div className="mt-12">
            <AiUseCaseChecker />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCaseChecker;
