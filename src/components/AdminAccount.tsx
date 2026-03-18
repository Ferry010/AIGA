import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminAccount = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Wachtwoorden komen niet overeen.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Wachtwoord moet minimaal 6 tekens zijn.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Wachtwoord succesvol gewijzigd.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md">
      <h3 className="text-sm font-semibold text-foreground mb-4">Wachtwoord wijzigen</h3>
      <form onSubmit={handleChangePassword} className="space-y-4">
        <div className="space-y-2">
          <Label>Nieuw wachtwoord</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Min. 6 tekens"
            required
            minLength={6}
          />
        </div>
        <div className="space-y-2">
          <Label>Bevestig nieuw wachtwoord</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Herhaal wachtwoord"
            required
            minLength={6}
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {success && <p className="text-sm text-primary">{success}</p>}

        <button
          type="submit"
          disabled={loading || !newPassword || !confirmPassword}
          className="bg-primary text-primary-foreground rounded-lg px-6 py-2 text-sm font-medium disabled:opacity-50"
        >
          {loading ? "Bezig..." : "Wachtwoord wijzigen"}
        </button>
      </form>
    </div>
  );
};

export default AdminAccount;
