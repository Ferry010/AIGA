import { useRef, useState } from "react";
import { FileJson, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { PdfArticleData } from "./BlogPdfImport";

interface BlogJsonImportProps {
  onImport: (data: PdfArticleData) => void;
}

export default function BlogJsonImport({ onImport }: BlogJsonImportProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const text = await file.text();
      const json = JSON.parse(text);

      const data: PdfArticleData = {
        title: json.title || "",
        category: json.category || "",
        url: json.url || "",
        meta_description: json.meta_description || "",
        seo_keywords: json.seo_keywords || "",
        labels: Array.isArray(json.labels) ? json.labels : (json.labels || "").split(",").map((l: string) => l.trim()).filter(Boolean),
        content: json.content || "",
      };

      if (!data.title && !data.content) {
        toast.error("JSON bevat geen 'title' of 'content' veld.");
        setLoading(false);
        return;
      }

      onImport(data);
      toast.success("JSON succesvol geïmporteerd");
    } catch (err) {
      console.error("JSON parse error:", err);
      toast.error("Ongeldig JSON-bestand");
    }
    setLoading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <label className="flex items-center gap-2 bg-card border border-border text-foreground rounded-lg px-4 py-2 text-sm font-medium cursor-pointer hover:border-primary/40 transition-colors">
      {loading ? <Loader2 size={16} className="animate-spin" /> : <FileJson size={16} />}
      {loading ? "JSON laden..." : "JSON importeren"}
      <input
        ref={inputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFile}
        className="hidden"
        disabled={loading}
      />
    </label>
  );
}
