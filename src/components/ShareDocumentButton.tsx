import { useState } from "react";
import { Forward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ShareDocumentButtonProps {
  document: "checklist" | "template";
  documentUrl: string;
}

const ShareDocumentButton = ({ document, documentUrl }: ShareDocumentButtonProps) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const leadId = crypto.randomUUID();
      await supabase.from("download_leads").insert({
        id: leadId,
        voornaam: naam.trim(),
        email: email.trim(),
        document,
      });

      const { error: fnError } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "document-download",
          recipientEmail: email.trim(),
          idempotencyKey: `share-doc-${leadId}`,
          templateData: {
            voornaam: naam.trim(),
            documentType: document,
          },
        },
      });

      if (fnError) {
        console.error("Share email error:", fnError);
        toast.error("E-mail kon niet worden verzonden. Probeer het opnieuw.");
        return;
      }

      setSent(true);
      toast.success("Document verstuurd!");
    } catch (err) {
      console.error("Share error:", err);
      toast.error("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSent(false);
      setNaam("");
      setEmail("");
    }
    setOpen(newOpen);
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Forward size={16} /> Deel dit document
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          {!sent ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-display">Deel dit document</DialogTitle>
                <DialogDescription>
                  Vul de gegevens in van de persoon die dit document moet ontvangen.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="share-naam">Naam ontvanger *</Label>
                  <Input id="share-naam" required value={naam} onChange={(e) => setNaam(e.target.value)} maxLength={100} placeholder="Bijv. Jan" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="share-email">E-mailadres ontvanger *</Label>
                  <Input id="share-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} placeholder="collega@bedrijf.nl" />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-neon"
                >
                  {submitting ? "Verzenden..." : "Verstuur →"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  We sturen het document per e-mail. Geen spam.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto">
                <Forward size={28} className="text-primary" />
              </div>
              <DialogHeader>
                <DialogTitle className="font-display">Verstuurd!</DialogTitle>
                <DialogDescription>
                  Het document is naar {email} gestuurd.
                </DialogDescription>
              </DialogHeader>
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                Sluiten
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareDocumentButton;
