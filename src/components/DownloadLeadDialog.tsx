import { useState } from "react";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DownloadLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: "checklist" | "template";
  onSuccess: () => void;
}

const DownloadLeadDialog = ({ open, onOpenChange, document, onSuccess }: DownloadLeadDialogProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [voornaam, setVoornaam] = useState("");
  const [email, setEmail] = useState("");

  const resetForm = () => {
    setVoornaam("");
    setEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const leadId = crypto.randomUUID();
      const { error } = await supabase.from("download_leads").insert({
        id: leadId,
        voornaam: voornaam.trim(),
        email: email.trim(),
        document,
      });

      if (error) {
        console.error("Download lead insert error:", error);
        toast.error("Er ging iets mis. Probeer het opnieuw.");
        setSubmitting(false);
        return;
      }

      const { error: fnError } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "document-download",
          recipientEmail: email.trim(),
          idempotencyKey: `download-doc-${leadId}`,
          templateData: {
            voornaam: voornaam.trim(),
            documentType: document,
          },
        },
      });

      if (fnError) {
        console.error("Email send error:", fnError);
        toast.error("E-mail kon niet worden verzonden. Je kunt het later opnieuw proberen.");
      }

      setSubmitted(true);
      resetForm();
    } catch (err) {
      console.error("Download lead unexpected error:", err);
      toast.error("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoToDoc = () => {
    setSubmitted(false);
    onOpenChange(false);
    onSuccess();
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) setSubmitted(false);
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display">Waar mogen we het document naartoe sturen?</DialogTitle>
              <DialogDescription>Vul je gegevens in om het document te ontvangen.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="voornaam">Voornaam *</Label>
                <Input id="voornaam" required value={voornaam} onChange={(e) => setVoornaam(e.target.value)} maxLength={100} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mailadres *</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(330,80%,55%)] hover:opacity-90 text-white"
              >
                {submitting ? "Verzenden..." : "Download gratis →"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Geen spam. Jouw gegevens worden niet gedeeld met derden.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto">
              <ClipboardCheck size={28} className="text-primary" />
            </div>
            <DialogHeader>
              <DialogTitle className="font-display">Bedankt, {voornaam || "het document is klaar"}!</DialogTitle>
              <DialogDescription>
                Het document is naar je inbox gestuurd. Je kunt het hieronder ook direct bekijken.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={handleGoToDoc}
              className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(330,80%,55%)] hover:opacity-90 text-white"
            >
              Klik hier om direct te bekijken <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DownloadLeadDialog;
