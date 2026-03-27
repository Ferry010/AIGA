import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SendCopyFormProps {
  document: "checklist" | "template";
}

const SendCopyForm = ({ document }: SendCopyFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [voornaam, setVoornaam] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const leadId = crypto.randomUUID();
      await supabase.from("download_leads").insert({
        id: leadId,
        voornaam: voornaam.trim(),
        email: email.trim(),
        document,
      });

      const { error: fnError } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "document-download",
          recipientEmail: email.trim(),
          idempotencyKey: `copy-doc-${leadId}`,
          templateData: {
            voornaam: voornaam.trim(),
            documentType: document,
          },
        },
      });

      if (fnError) {
        console.error("Email send error:", fnError);
        toast.error("E-mail kon niet worden verzonden. Probeer het opnieuw.");
        return;
      }

      setSent(true);
    } catch (err) {
      console.error("Send copy error:", err);
      toast.error("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="flex items-center gap-2 text-sm text-primary">
        <CheckCircle size={16} /> Verstuurd naar {email}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-2">
      <Input
        placeholder="Voornaam"
        required
        value={voornaam}
        onChange={(e) => setVoornaam(e.target.value)}
        maxLength={100}
        className="w-32 h-9 text-sm"
      />
      <Input
        type="email"
        placeholder="E-mailadres"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={255}
        className="w-48 h-9 text-sm"
      />
      <Button type="submit" variant="outline" size="sm" disabled={submitting}>
        <Mail size={16} /> {submitting ? "..." : "Stuur mij een kopie"}
      </Button>
      <span className="text-xs text-muted-foreground">Geen spam.</span>
    </form>
  );
};

export default SendCopyForm;
