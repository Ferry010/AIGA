import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Shield, ShieldOff } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  roles: string[];
}

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", full_name: "", role: "admin" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const callAdminUsers = async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("admin-users", { body });
    if (error) throw error;
    return data;
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await callAdminUsers({ action: "list" });
      setUsers(data);
    } catch (e) {
      console.error("Failed to fetch users:", e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async () => {
    if (!form.email || !form.password) return;
    setSaving(true);
    setError("");
    try {
      await callAdminUsers({ action: "create", ...form });
      setShowCreate(false);
      setForm({ email: "", password: "", full_name: "", role: "admin" });
      await fetchUsers();
    } catch (e: any) {
      setError(e?.message || "Fout bij aanmaken");
    }
    setSaving(false);
  };

  const handleDelete = async (userId: string, email: string) => {
    if (!confirm(`Weet je zeker dat je ${email} wilt verwijderen?`)) return;
    try {
      await callAdminUsers({ action: "delete", user_id: userId });
      await fetchUsers();
    } catch (e: any) {
      alert(e?.message || "Fout bij verwijderen");
    }
  };

  const toggleAdmin = async (userId: string, hasAdmin: boolean) => {
    try {
      await callAdminUsers({
        action: hasAdmin ? "remove_role" : "set_role",
        user_id: userId,
        role: "admin",
      });
      await fetchUsers();
    } catch (e: any) {
      alert(e?.message || "Fout bij rol wijzigen");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{users.length} gebruikers</p>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium"
        >
          <Plus size={16} /> Nieuwe gebruiker
        </button>
      </div>

      {showCreate && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Nieuwe gebruiker aanmaken</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="user@bedrijf.nl" />
            </div>
            <div className="space-y-2">
              <Label>Wachtwoord</Label>
              <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min. 6 tekens" />
            </div>
            <div className="space-y-2">
              <Label>Naam</Label>
              <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} placeholder="Volledige naam" />
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2 bg-background text-foreground text-sm"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            onClick={handleCreate}
            disabled={saving || !form.email || !form.password}
            className="bg-primary text-primary-foreground rounded-lg px-6 py-2 text-sm font-medium disabled:opacity-50"
          >
            {saving ? "Bezig..." : "Aanmaken"}
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Laden...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-3 px-2 text-muted-foreground font-medium">E-mail</th>
                <th className="py-3 px-2 text-muted-foreground font-medium">Aangemaakt</th>
                <th className="py-3 px-2 text-muted-foreground font-medium">Rollen</th>
                <th className="py-3 px-2 text-muted-foreground font-medium">Admin</th>
                <th className="py-3 px-2 text-muted-foreground font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const hasAdmin = u.roles.includes("admin");
                const date = new Date(u.created_at);
                const formatted = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
                return (
                  <tr key={u.id} className="border-b border-border">
                    <td className="py-3 px-2 text-foreground">{u.email}</td>
                    <td className="py-3 px-2 text-muted-foreground">{formatted}</td>
                    <td className="py-3 px-2 text-foreground">{u.roles.join(", ") || "—"}</td>
                    <td className="py-3 px-2">
                      <button
                        onClick={() => toggleAdmin(u.id, hasAdmin)}
                        className={`p-1 rounded transition-colors ${hasAdmin ? "text-primary hover:text-primary/80" : "text-muted-foreground hover:text-foreground"}`}
                        title={hasAdmin ? "Admin verwijderen" : "Admin toekennen"}
                      >
                        {hasAdmin ? <Shield size={18} /> : <ShieldOff size={18} />}
                      </button>
                    </td>
                    <td className="py-3 px-2">
                      <button
                        onClick={() => handleDelete(u.id, u.email || "")}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        title="Verwijderen"
                      >
                        <Trash2 size={16} />
                      </button>
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

export default AdminUsers;
