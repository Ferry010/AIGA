import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";

const ADMIN_PASSWORD = "aiga2024admin";

interface Submission {
  id: string;
  created_at: string;
  naam: string;
  email: string;
  bedrijfsnaam: string;
  totaal_score: number;
  tier: string;
  dimensie_scores: Record<string, number>;
  opgevolgd: boolean;
}

const tierLabels: Record<string, string> = {
  hoog_risico: "Hoog risico",
  gemengd: "Gemengd",
  laag_risico: "Laag risico",
};

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    supabase
      .from("risk_scan_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setSubmissions((data as Submission[]) || []);
        setLoading(false);
      });
  }, [authenticated]);

  const toggleOpgevolgd = async (id: string, current: boolean) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, opgevolgd: !current } : s))
    );
    await supabase
      .from("risk_scan_submissions")
      .update({ opgevolgd: !current })
      .eq("id", id);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
          <h1 className="text-xl font-semibold text-foreground">Admin login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground text-sm focus:outline-none focus:border-primary"
          />
          {error && <p className="text-sm text-destructive">Onjuist wachtwoord</p>}
          <button type="submit" className="w-full bg-primary text-primary-foreground rounded-lg py-3 text-sm font-medium">
            Inloggen
          </button>
        </form>
      </div>
    );
  }

  const total = submissions.length;
  const nogOpTeVolgen = submissions.filter((s) => !s.opgevolgd).length;
  const gemiddeldeScore = total > 0 ? Math.round(submissions.reduce((sum, s) => sum + s.totaal_score, 0) / total) : 0;

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Risico-scan Submissions</h1>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8 max-w-xl">
        {[
          { label: "Totaal", value: total },
          { label: "Nog op te volgen", value: nogOpTeVolgen },
          { label: "Gemiddelde score", value: `${gemiddeldeScore}%` },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-mono font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground">Laden...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-3 px-2 text-muted-foreground font-medium">Datum</th>
                <th className="py-3 px-2 text-muted-foreground font-medium">Naam</th>
                <th className="py-3 px-2 text-muted-foreground font-medium">Bedrijfsnaam</th>
                <th className="py-3 px-2 text-muted-foreground font-medium">E-mail</th>
                <th className="py-3 px-2 text-muted-foreground font-medium">Score</th>
                <th className="py-3 px-2 text-muted-foreground font-medium">Tier</th>
                <th className="py-3 px-2 text-muted-foreground font-medium">Opgevolgd</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => {
                const date = new Date(s.created_at);
                const formatted = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
                return (
                  <tr key={s.id} className="border-b border-border">
                    <td className="py-3 px-2 text-foreground">{formatted}</td>
                    <td className="py-3 px-2 text-foreground">{s.naam}</td>
                    <td className="py-3 px-2 text-foreground">{s.bedrijfsnaam}</td>
                    <td className="py-3 px-2">
                      <a href={`mailto:${s.email}`} className="text-primary hover:underline">{s.email}</a>
                    </td>
                    <td className="py-3 px-2 font-mono text-foreground">{s.totaal_score}%</td>
                    <td className="py-3 px-2 text-foreground">{tierLabels[s.tier] || s.tier}</td>
                    <td className="py-3 px-2">
                      <Checkbox
                        checked={s.opgevolgd}
                        onCheckedChange={() => toggleOpgevolgd(s.id, s.opgevolgd)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
