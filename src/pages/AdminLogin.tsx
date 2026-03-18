import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin + "/admin",
          },
        });

        if (error) {
          setError(error.message);
        } else {
          setMessage("Controleer je e-mail om je account te bevestigen.");
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          setError(error.message);
          return;
        }

        const userId = data.user?.id;
        if (!userId) {
          setError("Inloggen mislukt. Probeer opnieuw.");
          return;
        }

        const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
          _user_id: userId,
          _role: "admin",
        });

        if (roleError || !isAdmin) {
          await supabase.auth.signOut();
          setError("Dit account heeft geen adminrechten.");
          return;
        }

        navigate("/admin");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold text-foreground">
          {isSignUp ? "Admin registreren" : "Admin login"}
        </h1>

        {isSignUp && (
          <div className="space-y-2">
            <Label>Naam</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Je naam" required />
          </div>
        )}

        <div className="space-y-2">
          <Label>E-mail</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@bedrijf.nl" required />
        </div>

        <div className="space-y-2">
          <Label>Wachtwoord</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {message && <p className="text-sm text-primary">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground rounded-lg py-3 text-sm font-medium disabled:opacity-50"
        >
          {loading ? "Even geduld..." : isSignUp ? "Registreren" : "Inloggen"}
        </button>

        <button
          type="button"
          onClick={() => { setIsSignUp(!isSignUp); setError(""); setMessage(""); }}
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isSignUp ? "Al een account? Inloggen" : "Nog geen account? Registreren"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
