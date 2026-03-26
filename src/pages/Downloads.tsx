import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, FileText, ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
    href: "/tools/downloads/ai-beleid-template",
  },
];

const Downloads = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<(typeof documents)[0] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [voornaam, setVoornaam] = useState("");
  const [achternaam, setAchternaam] = useState("");
  const [email, setEmail] = useState("");
  const [organisatie, setOrganisatie] = useState("");
  const [functie, setFunctie] = useState("");

  const openDialog = (doc: (typeof documents)[0]) => {
    setSelectedDoc(doc);
    setSubmitted(false);
    setDialogOpen(true);
  };

  const resetForm = () => {
    setVoornaam("");
    setAchternaam("");
    setEmail("");
    setOrganisatie("");
    setFunctie("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoc) return;
    setSubmitting(true);

    const { error } = await supabase.from("download_leads").insert({
      voornaam: voornaam.trim(),
      achternaam: achternaam.trim(),
      email: email.trim(),
      organisatie: organisatie.trim(),
      functie: functie || null,
      document: selectedDoc.type,
      newsletter_optin: true,
    });

    setSubmitting(false);
    if (error) {
      toast.error("Er ging iets mis. Probeer het opnieuw.");
      return;
    }
    setSubmitted(true);
    resetForm();
  };

  const goToDoc = () => {
    if (!selectedDoc) return;
    setDialogOpen(false);
    navigate(selectedDoc.href);
  };

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
                        onClick={() => openDialog(doc)}
                        className="mt-auto w-fit bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(330,80%,55%)] hover:opacity-90 text-white"
                      >
                        Download gratis <ArrowRight size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Lead capture dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-display">Waar mogen we het document naartoe sturen?</DialogTitle>
                <DialogDescription>
                  Vul je gegevens in om het document te ontvangen.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="voornaam">Voornaam *</Label>
                    <Input id="voornaam" required value={voornaam} onChange={(e) => setVoornaam(e.target.value)} maxLength={100} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="achternaam">Achternaam *</Label>
                    <Input id="achternaam" required value={achternaam} onChange={(e) => setAchternaam(e.target.value)} maxLength={100} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">E-mailadres *</Label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="organisatie">Organisatie *</Label>
                  <Input id="organisatie" required value={organisatie} onChange={(e) => setOrganisatie(e.target.value)} maxLength={200} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="functie">Functie</Label>
                  <Select value={functie} onValueChange={setFunctie}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer je functie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HR/L&D">HR / L&D</SelectItem>
                      <SelectItem value="Compliance/Legal">Compliance / Legal</SelectItem>
                      <SelectItem value="Management/Directie">Management / Directie</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Anders">Anders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="newsletter" checked disabled />
                  <Label htmlFor="newsletter" className="text-xs text-muted-foreground leading-snug">
                    Ik ontvang graag updates over AI Act compliance en nieuwe tools van AIGA.
                  </Label>
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(330,80%,55%)] hover:opacity-90 text-white"
                >
                  {submitting ? "Verzenden..." : "Stuur mij het document →"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Geen spam. Je kunt je altijd afmelden. Jouw gegevens worden niet gedeeld met derden.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto">
                <ClipboardCheck size={28} className="text-primary" />
              </div>
              <DialogHeader>
                <DialogTitle className="font-display">Bedankt voor je aanvraag.</DialogTitle>
                <DialogDescription>
                  Je kunt het document nu direct bekijken.
                </DialogDescription>
              </DialogHeader>
              <Button
                onClick={goToDoc}
                className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(330,80%,55%)] hover:opacity-90 text-white"
              >
                Klik hier om direct te bekijken <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Downloads;
