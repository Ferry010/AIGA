import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }

    const validate = async () => {
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`;
        const res = await fetch(url, { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } });
        const data = await res.json();
        if (!res.ok) { setStatus("invalid"); return; }
        if (data.valid === false && data.reason === "already_unsubscribed") { setStatus("already"); return; }
        setStatus("valid");
      } catch { setStatus("error"); }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (error) { setStatus("error"); return; }
      if (data?.success) { setStatus("success"); } else if (data?.reason === "already_unsubscribed") { setStatus("already"); } else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  return (
    <>
      <SEO title="Uitschrijven — AIGA Academy" description="Uitschrijven van e-mails van AIGA Academy." />
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-2xl font-display font-bold text-foreground">E-mail voorkeuren</h1>

          {status === "loading" && <p className="text-muted-foreground">Laden...</p>}

          {status === "valid" && (
            <div className="space-y-4">
              <p className="text-muted-foreground">Wil je je uitschrijven van onze e-mails?</p>
              <button
                onClick={handleUnsubscribe}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Uitschrijven bevestigen
              </button>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">Je bent uitgeschreven</p>
              <p className="text-muted-foreground">Je ontvangt geen e-mails meer van ons.</p>
            </div>
          )}

          {status === "already" && (
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">Al uitgeschreven</p>
              <p className="text-muted-foreground">Je bent al uitgeschreven van onze e-mails.</p>
            </div>
          )}

          {status === "invalid" && (
            <p className="text-muted-foreground">Deze link is ongeldig of verlopen.</p>
          )}

          {status === "error" && (
            <p className="text-destructive">Er ging iets mis. Probeer het later opnieuw.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Unsubscribe;
