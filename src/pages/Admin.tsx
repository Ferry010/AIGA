import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/RichTextEditor";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, X, LogOut, ChevronDown, ChevronUp, Mail, Phone, Search, Upload, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  labels: string[];
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

const emptyArticleForm = { title: "", category: CATEGORIES[0], url: "", image_url: "", published: true, sort_order: 0, content: "", slug: "", labels: [] as string[] };

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
};

type InboxItem = {
  id: string;
  type: "contact" | "masterclass" | "risicoscan";
  created_at: string;
  naam: string;
  org: string;
  email: string;
  telefoon: string | null;
  opgevolgd: boolean;
  raw: ContactSubmission | MasterclassSubmission | RiskSubmission;
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
  const [uploading, setUploading] = useState(false);

  // Inbox state
  const [inboxFilter, setInboxFilter] = useState<"alle" | "contact" | "masterclass" | "risicoscan">("alle");
  const [showOpgevolgd, setShowOpgevolgd] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const openNewForm = () => {
    setEditingId(null);
    setForm({ ...emptyArticleForm, sort_order: articles.length + 1 });
    setShowForm(true);
  };

  const openEditForm = (a: Article) => {
    setEditingId(a.id);
    setForm({ title: a.title, category: a.category, url: a.url, image_url: a.image_url, published: a.published, sort_order: a.sort_order, content: a.content || "", slug: a.slug || "", labels: a.labels || [] });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyArticleForm);
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("article-images").upload(fileName, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("article-images").getPublicUrl(fileName);
      setForm((prev) => ({ ...prev, image_url: publicUrl }));
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setUploading(false);
  };

  const [labelInput, setLabelInput] = useState("");

  // Collect all unique labels from existing articles for autocomplete
  const allLabels = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => (a.labels || []).forEach((l) => set.add(l)));
    return Array.from(set).sort();
  }, [articles]);

  const addLabel = (label: string) => {
    const trimmed = label.trim();
    if (trimmed && !form.labels.includes(trimmed)) {
      setForm((prev) => ({ ...prev, labels: [...prev.labels, trimmed] }));
    }
    setLabelInput("");
  };

  const removeLabel = (label: string) => {
    setForm((prev) => ({ ...prev, labels: prev.labels.filter((l) => l !== label) }));
  };

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

  // Inbox computed values
  const contactNog = contactSubmissions.filter((s) => !s.opgevolgd).length;
  const masterclassNog = masterclassSubmissions.filter((s) => !s.opgevolgd).length;
  const riskNog = riskSubmissions.filter((s) => !s.opgevolgd).length;
  const totalNog = contactNog + masterclassNog + riskNog;

  const inboxItems = useMemo<InboxItem[]>(() => {
    const items: InboxItem[] = [
      ...contactSubmissions.map((s) => ({
        id: s.id, type: "contact" as const, created_at: s.created_at, naam: s.naam,
        org: s.organisatie, email: s.email, telefoon: s.telefoon, opgevolgd: s.opgevolgd, raw: s,
      })),
      ...masterclassSubmissions.map((s) => ({
        id: s.id, type: "masterclass" as const, created_at: s.created_at, naam: s.naam,
        org: s.organisatie, email: s.email, telefoon: s.telefoon, opgevolgd: s.opgevolgd, raw: s,
      })),
      ...riskSubmissions.map((s) => ({
        id: s.id, type: "risicoscan" as const, created_at: s.created_at, naam: s.naam,
        org: s.bedrijfsnaam, email: s.email, telefoon: null, opgevolgd: s.opgevolgd, raw: s,
      })),
    ];
    return items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [contactSubmissions, masterclassSubmissions, riskSubmissions]);

  const filteredInbox = useMemo(() => {
    let items = inboxItems;
    if (inboxFilter !== "alle") items = items.filter((i) => i.type === inboxFilter);
    if (!showOpgevolgd) items = items.filter((i) => !i.opgevolgd);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((i) => i.naam.toLowerCase().includes(q) || i.org.toLowerCase().includes(q) || i.email.toLowerCase().includes(q));
    }
    return items;
  }, [inboxItems, inboxFilter, showOpgevolgd, searchQuery]);

  const toggleOpgevolgd = async (item: InboxItem) => {
    const newVal = !item.opgevolgd;
    if (item.type === "contact") {
      setContactSubmissions((prev) => prev.map((s) => (s.id === item.id ? { ...s, opgevolgd: newVal } : s)));
      await supabase.from("contact_submissions").update({ opgevolgd: newVal }).eq("id", item.id);
    } else if (item.type === "masterclass") {
      setMasterclassSubmissions((prev) => prev.map((s) => (s.id === item.id ? { ...s, opgevolgd: newVal } : s)));
      await supabase.from("masterclass_submissions").update({ opgevolgd: newVal }).eq("id", item.id);
    } else {
      setRiskSubmissions((prev) => prev.map((s) => (s.id === item.id ? { ...s, opgevolgd: newVal } : s)));
      await supabase.from("risk_scan_submissions").update({ opgevolgd: newVal }).eq("id", item.id);
    }
  };

  const typeBadge = (type: InboxItem["type"]) => {
    const config = {
      contact: { label: "Contact", className: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/20" },
      masterclass: { label: "Masterclass", className: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/20" },
      risicoscan: { label: "Risicoscan", className: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/20" },
    };
    const c = config[type];
    return <Badge variant="outline" className={c.className}>{c.label}</Badge>;
  };

  const renderDetails = (item: InboxItem) => {
    if (item.type === "contact") {
      const s = item.raw as ContactSubmission;
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {s.functie && <div><span className="text-muted-foreground">Functie:</span> <span className="text-foreground">{s.functie}</span></div>}
          <div><span className="text-muted-foreground">Hulp:</span> <span className="text-foreground">{hulpLabels[s.hulp] || s.hulp}</span></div>
          {s.aantal && <div><span className="text-muted-foreground">Aantal:</span> <span className="text-foreground">{s.aantal}</span></div>}
          {s.opmerkingen && <div className="md:col-span-2"><span className="text-muted-foreground">Opmerkingen:</span> <span className="text-foreground">{s.opmerkingen}</span></div>}
        </div>
      );
    }
    if (item.type === "masterclass") {
      const s = item.raw as MasterclassSubmission;
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {s.functie && <div><span className="text-muted-foreground">Functie:</span> <span className="text-foreground">{s.functie}</span></div>}
          <div><span className="text-muted-foreground">Sessie type:</span> <span className="text-foreground capitalize">{s.sessie_type}</span></div>
          {s.vragen && <div className="md:col-span-2"><span className="text-muted-foreground">Vragen:</span> <span className="text-foreground">{s.vragen}</span></div>}
        </div>
      );
    }
    const s = item.raw as RiskSubmission;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div><span className="text-muted-foreground">Score:</span> <span className="text-foreground font-mono">{s.totaal_score}%</span></div>
        <div><span className="text-muted-foreground">Tier:</span> <span className="text-foreground">{tierLabels[s.tier] || s.tier}</span></div>
        {s.dimensie_scores && (
          <div className="md:col-span-2">
            <span className="text-muted-foreground">Dimensie scores:</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {Object.entries(s.dimensie_scores).map(([key, val]) => (
                <span key={key} className="bg-muted text-muted-foreground text-xs rounded-md px-2 py-1">{key}: {String(val)}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Admin Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <LogOut size={16} /> Uitloggen
        </button>
      </div>

      <Tabs defaultValue="inbox">
        <TabsList className="mb-6">
          <TabsTrigger value="inbox">
            Inbox {totalNog > 0 && <span className="ml-1.5 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">{totalNog}</span>}
          </TabsTrigger>
          <TabsTrigger value="artikelen">Artikelen</TabsTrigger>
          <TabsTrigger value="gebruikers">Gebruikers</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* ─── Inbox Tab ─── */}
        <TabsContent value="inbox">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <div className="flex gap-2 flex-wrap">
              {([
                { key: "alle", label: "Alle", count: inboxItems.filter(i => !i.opgevolgd).length },
                { key: "contact", label: "Contact", count: contactNog },
                { key: "masterclass", label: "Masterclass", count: masterclassNog },
                { key: "risicoscan", label: "Risicoscan", count: riskNog },
              ] as const).map((f) => (
                <button
                  key={f.key}
                  onClick={() => setInboxFilter(f.key)}
                  className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
                    inboxFilter === f.key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {f.label}
                  {f.count > 0 && <span className="ml-1.5 text-xs opacity-80">({f.count})</span>}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 sm:ml-auto">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Zoeken..."
                  className="pl-8 h-9 w-48"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer whitespace-nowrap">
                <Switch checked={showOpgevolgd} onCheckedChange={setShowOpgevolgd} />
                Toon opgevolgde
              </label>
            </div>
          </div>

          {/* Items */}
          {loading ? (
            <p className="text-muted-foreground">Laden...</p>
          ) : filteredInbox.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium">Geen inzendingen</p>
              <p className="text-sm mt-1">{showOpgevolgd ? "Er zijn geen inzendingen in deze categorie." : "Alle inzendingen zijn opgevolgd! Schakel 'Toon opgevolgde' in om ze te bekijken."}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredInbox.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <div key={item.id} className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
                    <div
                      className="flex items-start gap-4 p-4 cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {typeBadge(item.type)}
                          <span className="text-xs text-muted-foreground">{formatDate(item.created_at)}</span>
                        </div>
                        <p className="font-medium text-foreground truncate">{item.naam} — {item.org}</p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <a href={`mailto:${item.email}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 hover:text-primary truncate">
                            <Mail size={12} /> {item.email}
                          </a>
                          {item.telefoon && (
                            <a href={`tel:${item.telefoon}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 hover:text-primary">
                              <Phone size={12} /> {item.telefoon}
                            </a>
                          )}
                          {item.type === "contact" && <span>{hulpLabels[(item.raw as ContactSubmission).hulp] || (item.raw as ContactSubmission).hulp}</span>}
                          {item.type === "masterclass" && <span className="capitalize">{(item.raw as MasterclassSubmission).sessie_type}</span>}
                          {item.type === "risicoscan" && <span className="font-mono">{(item.raw as RiskSubmission).totaal_score}% · {tierLabels[(item.raw as RiskSubmission).tier] || (item.raw as RiskSubmission).tier}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div onClick={(e) => e.stopPropagation()}>
                          <Checkbox checked={item.opgevolgd} onCheckedChange={() => toggleOpgevolgd(item)} />
                        </div>
                        {isExpanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-border pt-3">
                        {renderDetails(item)}
                      </div>
                    )}
                  </div>
                );
              })}
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
                <div className="space-y-2 md:col-span-2">
                  <Label>Afbeelding</Label>
                  <div className="flex items-start gap-4">
                    {form.image_url && (
                      <img src={form.image_url} alt="Preview" className="w-24 h-16 object-cover rounded-md border border-border" />
                    )}
                    <div className="flex-1 space-y-2">
                      <label className={`flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 text-sm font-medium cursor-pointer hover:border-primary/40 transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                        <Upload size={16} />
                        {uploading ? "Uploaden..." : "Afbeelding uploaden"}
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                      <Input
                        value={form.image_url}
                        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                        placeholder="Of plak een URL..."
                        className="text-xs"
                      />
                    </div>
                  </div>
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
                <div className="space-y-2 md:col-span-2">
                  <Label>Labels</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.labels.map((label) => (
                      <Badge key={label} variant="secondary" className="flex items-center gap-1 text-xs">
                        {label}
                        <button type="button" onClick={() => removeLabel(label)} className="hover:text-destructive"><X size={12} /></button>
                      </Badge>
                    ))}
                  </div>
                  <div className="relative">
                    <Input
                      value={labelInput}
                      onChange={(e) => setLabelInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") { e.preventDefault(); addLabel(labelInput); }
                      }}
                      placeholder="Typ een label en druk Enter..."
                      className="text-sm"
                      list="label-suggestions"
                    />
                    <datalist id="label-suggestions">
                      {allLabels.filter((l) => !form.labels.includes(l)).map((l) => (
                        <option key={l} value={l} />
                      ))}
                    </datalist>
                  </div>
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
                        <span className="text-xs text-green-600 dark:text-green-400">✓ Geïmporteerd</span>
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
