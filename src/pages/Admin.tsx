import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/RichTextEditor";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, X, LogOut } from "lucide-react";
import AdminUsers from "@/components/AdminUsers";
import AdminAccount from "@/components/AdminAccount";

const CATEGORIES = [
  "Wetten en regels",
  "AI-geletterdheid uitgelegd",
  "Actueel",
  "Tools en vaardigheden",
  "Praktijk en sectoren",
];

interface RiskSubmission {
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

interface ContactSubmission {
  id: string;
  created_at: string;
  naam: string;
  organisatie: string;
  email: string;
  functie: string | null;
  telefoon: string | null;
  hulp: string;
  aantal: string | null;
  opmerkingen: string | null;
  opgevolgd: boolean;
}

interface MasterclassSubmission {
  id: string;
  created_at: string;
  naam: string;
  organisatie: string;
  email: string;
  functie: string | null;
  telefoon: string | null;
  sessie_type: string;
  vragen: string | null;
  opgevolgd: boolean;
}

interface Article {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  category: string;
  url: string;
  image_url: string;
  published: boolean;
  sort_order: number;
  content: string | null;
  slug: string | null;
}

const tierLabels: Record<string, string> = {
  hoog_risico: "Hoog risico",
  gemengd: "Gemengd",
  laag_risico: "Laag risico",
};

const hulpLabels: Record<string, string> = {
  training: "Online Training",
  masterclass: "Masterclass",
  beide: "Beide",
  anders: "Anders",
};

const emptyArticleForm = { title: "", category: CATEGORIES[0], url: "", image_url: "", published: true, sort_order: 0, content: "", slug: "" };

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
};

const Admin = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [riskSubmissions, setRiskSubmissions] = useState<RiskSubmission[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [masterclassSubmissions, setMasterclassSubmissions] = useState<MasterclassSubmission[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  // Article form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyArticleForm);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState<Record<string, boolean>>({});

  // Check auth + admin role
  useEffect(() => {
    let cancelled = false;

    const checkAdmin = async (userId: string) => {
      const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
      if (cancelled) return;
      if (data) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        navigate("/admin/login");
      }
      setCheckingAuth(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      if (!session) {
        setAuthenticated(false);
        setCheckingAuth(false);
        navigate("/admin/login");
        return;
      }
      checkAdmin(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setAuthenticated(false);
        setCheckingAuth(false);
        navigate("/admin/login");
        return;
      }
      checkAdmin(session.user.id);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchArticles = async () => {
    const { data } = await supabase.from("articles").select("*").order("sort_order", { ascending: true });
    setArticles((data as Article[]) || []);
  };

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    Promise.all([
      supabase.from("risk_scan_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("masterclass_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("articles").select("*").order("sort_order", { ascending: true }),
    ]).then(([riskRes, contactRes, masterclassRes, artRes]) => {
      setRiskSubmissions((riskRes.data as RiskSubmission[]) || []);
      setContactSubmissions((contactRes.data as ContactSubmission[]) || []);
      setMasterclassSubmissions((masterclassRes.data as MasterclassSubmission[]) || []);
      setArticles((artRes.data as Article[]) || []);
      setLoading(false);
    });
  }, [authenticated]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const toggleRiskOpgevolgd = async (id: string, current: boolean) => {
    setRiskSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, opgevolgd: !current } : s)));
    await supabase.from("risk_scan_submissions").update({ opgevolgd: !current }).eq("id", id);
  };

  const toggleContactOpgevolgd = async (id: string, current: boolean) => {
    setContactSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, opgevolgd: !current } : s)));
    await supabase.from("contact_submissions").update({ opgevolgd: !current }).eq("id", id);
  };

  const toggleMasterclassOpgevolgd = async (id: string, current: boolean) => {
    setMasterclassSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, opgevolgd: !current } : s)));
    await supabase.from("masterclass_submissions").update({ opgevolgd: !current }).eq("id", id);
  };

  const openNewForm = () => {
    setEditingId(null);
    setForm({ ...emptyArticleForm, sort_order: articles.length + 1 });
    setShowForm(true);
  };

  const openEditForm = (a: Article) => {
    setEditingId(a.id);
    setForm({ title: a.title, category: a.category, url: a.url, image_url: a.image_url, published: a.published, sort_order: a.sort_order, content: a.content || "", slug: a.slug || "" });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyArticleForm);
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = async () => {
    if (!form.title || !form.url || !form.image_url) return;
    setSaving(true);
    const slug = form.slug || (form.content ? generateSlug(form.title) : null);
    const payload = { ...form, content: form.content || null, slug, updated_at: new Date().toISOString() };
    if (editingId) {
      await supabase.from("articles").update(payload).eq("id", editingId);
    } else {
      await supabase.from("articles").insert([payload]);
    }
    await fetchArticles();
    closeForm();
    setSaving(false);
  };

  const togglePublished = async (a: Article) => {
    setArticles((prev) => prev.map((x) => (x.id === a.id ? { ...x, published: !a.published } : x)));
    await supabase.from("articles").update({ published: !a.published, updated_at: new Date().toISOString() }).eq("id", a.id);
  };

  const importArticle = async (a: Article) => {
    setImporting((prev) => ({ ...prev, [a.id]: true }));
    try {
      const { data, error } = await supabase.functions.invoke("scrape-article", { body: { article_id: a.id, url: a.url } });
      if (error) throw error;
      if (data?.success) await fetchArticles();
    } catch (e) {
      console.error("Import failed:", e);
    }
    setImporting((prev) => ({ ...prev, [a.id]: false }));
  };

  const importAll = async () => {
    for (const a of articles) await importArticle(a);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Laden...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Geen toegang. Je wordt doorgestuurd...</p>
      </div>
    );
  }

  const contactNog = contactSubmissions.filter((s) => !s.opgevolgd).length;
  const masterclassNog = masterclassSubmissions.filter((s) => !s.opgevolgd).length;
  const riskNog = riskSubmissions.filter((s) => !s.opgevolgd).length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Admin Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <LogOut size={16} /> Uitloggen
        </button>
      </div>

      <Tabs defaultValue="contact">
        <TabsList className="mb-6">
          <TabsTrigger value="contact">
            Contact {contactNog > 0 && <span className="ml-1.5 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">{contactNog}</span>}
          </TabsTrigger>
          <TabsTrigger value="masterclass">
            Masterclass {masterclassNog > 0 && <span className="ml-1.5 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">{masterclassNog}</span>}
          </TabsTrigger>
          <TabsTrigger value="risicoscan">
            Risicoscan {riskNog > 0 && <span className="ml-1.5 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">{riskNog}</span>}
          </TabsTrigger>
          <TabsTrigger value="artikelen">Artikelen</TabsTrigger>
          <TabsTrigger value="gebruikers">Gebruikers</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* ─── Contact Tab ─── */}
        <TabsContent value="contact">
          <div className="grid grid-cols-2 gap-4 mb-8 max-w-md">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground">Totaal</p>
              <p className="text-2xl font-mono font-bold text-foreground">{contactSubmissions.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground">Nog op te volgen</p>
              <p className="text-2xl font-mono font-bold text-foreground">{contactNog}</p>
            </div>
          </div>
          {loading ? <p className="text-muted-foreground">Laden...</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-3 px-2 text-muted-foreground font-medium">Datum</th>
                    <th className="py-3 px-2 text-muted-foreground font-medium">Naam</th>
                    <th className="py-3 px-2 text-muted-foreground font-medium">Organisatie</th>
                    <th className="py-3 px-2 text-muted-foreground font-medium">E-mail</th>
                    <th className="py-3 px-2 text-muted-foreground font-medium">Hulp</th>
                    <th className="py-3 px-2 text-muted-foreground font-medium">Aantal</th>
                    <th className="py-3 px-2 text-muted-foreground font-medium">Opgevolgd</th>
                  </tr>
                </thead>
                <tbody>
                  {contactSubmissions.map((s) => (
                    <tr key={s.id} className="border-b border-border">
                      <td className="py-3 px-2 text-foreground">{formatDate(s.created_at)}</td>
                      <td className="py-3 px-2 text-foreground">{s.naam}</td>
                      <td className="py-3 px-2 text-foreground">{s.organisatie}</td>
                      <td className="py-3 px-2"><a href={`mailto:${s.email}`} className="text-primary hover:underline">{s.email}</a></td>
                      <td className="py-3 px-2 text-foreground">{hulpLabels[s.hulp] || s.hulp}</td>
                      <td className="py-3 px-2 text-foreground">{s.aantal || "—"}</td>
                      <td className="py-3 px-2"><Checkbox checked={s.opgevolgd} onCheckedChange={() => toggleContactOpgevolgd(s.id, s.opgevolgd)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        {/* ─── Masterclass Tab ─── */}
        <TabsContent value="masterclass">
          <div className="grid grid-cols-2 gap-4 mb-8 max-w-md">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground">Totaal</p>
              <p className="text-2xl font-mono font-bold text-foreground">{masterclassSubmissions.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground">Nog op te volgen</p>
              <p className="text-2xl font-mono font-bold text-foreground">{masterclassNog}</p>
            </div>
          </div>
          {loading ? <p className="text-muted-foreground">Laden...</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-3 px-2 text-muted-foreground font-medium">Datum</th>
                    <th className="py-3 px-2 text-muted-foreground font-medium">Naam</th>
                    <th className="py-3 px-2 text-muted-foreground font-medium">Organisatie</th>
                    <th className="py-3 px-2 text-muted-foreground font-medium">E-mail</th>
                    <th className="py-3 px-2 text-muted-foreground font-medium">Sessie type</th>
                    <th className="py-3 px-2 text-muted-foreground font-medium">Opgevolgd</th>
                  </tr>
                </thead>
                <tbody>
                  {masterclassSubmissions.map((s) => (
                    <tr key={s.id} className="border-b border-border">
                      <td className="py-3 px-2 text-foreground">{formatDate(s.created_at)}</td>
                      <td className="py-3 px-2 text-foreground">{s.naam}</td>
                      <td className="py-3 px-2 text-foreground">{s.organisatie}</td>
                      <td className="py-3 px-2"><a href={`mailto:${s.email}`} className="text-primary hover:underline">{s.email}</a></td>
                      <td className="py-3 px-2 text-foreground capitalize">{s.sessie_type}</td>
                      <td className="py-3 px-2"><Checkbox checked={s.opgevolgd} onCheckedChange={() => toggleMasterclassOpgevolgd(s.id, s.opgevolgd)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        {/* ─── Risicoscan Tab ─── */}
        <TabsContent value="risicoscan">
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-xl">
            {[
              { label: "Totaal", value: riskSubmissions.length },
              { label: "Nog op te volgen", value: riskNog },
              { label: "Gemiddelde score", value: `${riskSubmissions.length > 0 ? Math.round(riskSubmissions.reduce((sum, s) => sum + s.totaal_score, 0) / riskSubmissions.length) : 0}%` },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-mono font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
          {loading ? <p className="text-muted-foreground">Laden...</p> : (
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
                  {riskSubmissions.map((s) => (
                    <tr key={s.id} className="border-b border-border">
                      <td className="py-3 px-2 text-foreground">{formatDate(s.created_at)}</td>
                      <td className="py-3 px-2 text-foreground">{s.naam}</td>
                      <td className="py-3 px-2 text-foreground">{s.bedrijfsnaam}</td>
                      <td className="py-3 px-2"><a href={`mailto:${s.email}`} className="text-primary hover:underline">{s.email}</a></td>
                      <td className="py-3 px-2 font-mono text-foreground">{s.totaal_score}%</td>
                      <td className="py-3 px-2 text-foreground">{tierLabels[s.tier] || s.tier}</td>
                      <td className="py-3 px-2"><Checkbox checked={s.opgevolgd} onCheckedChange={() => toggleRiskOpgevolgd(s.id, s.opgevolgd)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        {/* ─── Artikelen Tab ─── */}
        <TabsContent value="artikelen">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">{articles.length} artikelen · {articles.filter(a => a.content).length} geïmporteerd</p>
            <div className="flex gap-2">
              <button onClick={importAll} disabled={Object.values(importing).some(Boolean)} className="flex items-center gap-2 bg-card border border-border text-foreground rounded-lg px-4 py-2 text-sm font-medium hover:border-primary/40 transition-colors disabled:opacity-50">
                {Object.values(importing).some(Boolean) ? "Bezig met importeren..." : "Importeer alles"}
              </button>
              <button onClick={openNewForm} className="flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium">
                <Plus size={16} /> Nieuw artikel
              </button>
            </div>
          </div>

          {showForm && (
            <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{editingId ? "Artikel bewerken" : "Nieuw artikel"}</h3>
                <button onClick={closeForm} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Titel</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titel van het artikel" />
                </div>
                <div className="space-y-2">
                  <Label>Categorie</Label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-border rounded-lg px-3 py-2 bg-background text-foreground text-sm">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label>Afbeelding URL</Label>
                  <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label>Slug (URL-pad)</Label>
                  <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="bijv. ai-act-samenvatting" />
                </div>
                <div className="space-y-2">
                  <Label>Volgorde</Label>
                  <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
                  <Label>Gepubliceerd</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <RichTextEditor content={form.content} onChange={(html) => setForm({ ...form, content: html })} />
              </div>
              <button onClick={handleSave} disabled={saving || !form.title || !form.url || !form.image_url} className="bg-primary text-primary-foreground rounded-lg px-6 py-2 text-sm font-medium disabled:opacity-50">
                {saving ? "Opslaan..." : "Opslaan"}
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-3 px-2 text-muted-foreground font-medium">#</th>
                  <th className="py-3 px-2 text-muted-foreground font-medium">Titel</th>
                  <th className="py-3 px-2 text-muted-foreground font-medium">Categorie</th>
                  <th className="py-3 px-2 text-muted-foreground font-medium">Content</th>
                  <th className="py-3 px-2 text-muted-foreground font-medium">Gepubliceerd</th>
                  <th className="py-3 px-2 text-muted-foreground font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a) => (
                  <tr key={a.id} className="border-b border-border">
                    <td className="py-3 px-2 text-muted-foreground font-mono">{a.sort_order}</td>
                    <td className="py-3 px-2 text-foreground max-w-xs truncate">{a.title}</td>
                    <td className="py-3 px-2 text-foreground">{a.category}</td>
                    <td className="py-3 px-2">
                      {a.content ? (
                        <span className="text-xs text-green-400">✓ Geïmporteerd</span>
                      ) : (
                        <button onClick={() => importArticle(a)} disabled={importing[a.id]} className="text-xs text-primary hover:underline disabled:opacity-50">
                          {importing[a.id] ? "Bezig..." : "Importeer"}
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-2"><Switch checked={a.published} onCheckedChange={() => togglePublished(a)} /></td>
                    <td className="py-3 px-2">
                      <button onClick={() => openEditForm(a)} className="text-muted-foreground hover:text-primary"><Pencil size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* ─── Gebruikers Tab ─── */}
        <TabsContent value="gebruikers">
          <AdminUsers />
        </TabsContent>

        {/* ─── Account Tab ─── */}
        <TabsContent value="account">
          <AdminAccount />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
