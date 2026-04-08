import { useRef, useState } from "react";
import { FileUp, Loader2 } from "lucide-react";
import { toast } from "sonner";

export interface PdfArticleData {
  title: string;
  category: string;
  url: string;
  meta_description: string;
  seo_keywords: string;
  labels: string[];
  content: string;
}

const KNOWN_SECTIONS = ["CATEGORIE", "URL", "META DESCRIPTION", "KEYWORDS", "LABELS", "BODY"] as const;

const OLD_LABELS = ["TITEL:", "CATEGORIE:", "URL:", "META DESCRIPTION:", "KEYWORDS:", "LABELS:", "BODY:"] as const;

function isKnownSection(line: string): string | null {
  const trimmed = line.replace(/^#+\s*/, "").replace(/:?\s*$/, "").trim().toUpperCase();
  for (const s of KNOWN_SECTIONS) {
    if (trimmed === s) return s;
  }
  return null;
}

function parseStructuredText(text: string): PdfArticleData {
  // Try old inline format first
  const hasOldLabels = OLD_LABELS.some((l) => text.includes(l));
  if (hasOldLabels) {
    return parseOldFormat(text);
  }
  // New heading-based format
  return parseHeadingFormat(text);
}

function parseOldFormat(text: string): PdfArticleData {
  const result: Record<string, string> = {};
  const positions: { label: string; index: number }[] = [];
  for (const label of OLD_LABELS) {
    const idx = text.indexOf(label);
    if (idx !== -1) positions.push({ label, index: idx });
  }
  positions.sort((a, b) => a.index - b.index);
  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].index + positions[i].label.length;
    const end = i + 1 < positions.length ? positions[i + 1].index : text.length;
    result[positions[i].label] = text.slice(start, end).trim();
  }
  const bodyMd = result["BODY:"] || "";
  return {
    title: result["TITEL:"] || "",
    category: result["CATEGORIE:"] || "",
    url: result["URL:"] || "",
    meta_description: result["META DESCRIPTION:"] || "",
    seo_keywords: result["KEYWORDS:"] || "",
    labels: (result["LABELS:"] || "").split(",").map((l) => l.trim()).filter(Boolean),
    content: markdownToHtml(bodyMd),
  };
}

function parseHeadingFormat(text: string): PdfArticleData {
  const lines = text.split("\n");
  const sections: { name: string; lines: string[] }[] = [];
  let title = "";
  let currentSection: string | null = null;
  let currentLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Check if this line is a section header (# CATEGORIE, # BODY, etc.)
    const headingMatch = trimmed.match(/^#+\s+(.+)$/);
    if (headingMatch) {
      const sectionName = isKnownSection(trimmed);
      if (sectionName) {
        // Save previous section
        if (currentSection) {
          sections.push({ name: currentSection, lines: currentLines });
        }
        currentSection = sectionName;
        currentLines = [];
        continue;
      }
      // If not a known section and we don't have a title yet, treat as title
      if (!title && !currentSection) {
        const candidate = headingMatch[1].trim();
        // Skip document header like "AIGA Blog Import Document"
        if (!candidate.toUpperCase().includes("AIGA BLOG IMPORT")) {
          title = candidate;
        }
        continue;
      }
    }
    // Accumulate lines for current section or skip preamble
    if (currentSection) {
      currentLines.push(line);
    }
  }
  // Push last section
  if (currentSection) {
    sections.push({ name: currentSection, lines: currentLines });
  }

  const sectionMap: Record<string, string> = {};
  for (const s of sections) {
    sectionMap[s.name] = s.lines.join("\n").trim();
  }

  const bodyMd = sectionMap["BODY"] || "";

  return {
    title,
    category: sectionMap["CATEGORIE"] || "",
    url: sectionMap["URL"] || "",
    meta_description: sectionMap["META DESCRIPTION"] || "",
    seo_keywords: sectionMap["KEYWORDS"] || "",
    labels: (sectionMap["LABELS"] || "").split(",").map((l) => l.trim()).filter(Boolean),
    content: markdownToHtml(bodyMd),
  };
}

function markdownToHtml(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>")
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br>");

  html = `<p>${html}</p>`;
  html = html.replace(/<p>\s*<\/p>/g, "");
  html = html.replace(/<p>\s*(<h[23]>)/g, "$1");
  html = html.replace(/(<\/h[23]>)\s*<\/p>/g, "$1");
  html = html.replace(/<p>\s*(<ul>)/g, "$1");
  html = html.replace(/(<\/ul>)\s*<\/p>/g, "$1");

  return html;
}

interface BlogPdfImportProps {
  onImport: (data: PdfArticleData) => void;
}

export default function BlogPdfImport({ onImport }: BlogPdfImportProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: any) => item.str + (item.hasEOL ? "\n" : ""))
          .join("");
        fullText += pageText + "\n";
      }

      if (!fullText.trim()) {
        toast.error("Geen tekst gevonden in de PDF");
        setLoading(false);
        return;
      }

      const parsed = parseStructuredText(fullText);

      if (!parsed.title && !parsed.content) {
        toast.error("Kon geen gestructureerde data vinden. Zorg dat de PDF labels bevat zoals TITEL:, BODY:, etc.");
        setLoading(false);
        return;
      }

      onImport(parsed);
      toast.success("PDF succesvol geïmporteerd");
    } catch (err) {
      console.error("PDF parse error:", err);
      toast.error("Fout bij het lezen van de PDF");
    }
    setLoading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <label className="flex items-center gap-2 bg-card border border-border text-foreground rounded-lg px-4 py-2 text-sm font-medium cursor-pointer hover:border-primary/40 transition-colors">
      {loading ? <Loader2 size={16} className="animate-spin" /> : <FileUp size={16} />}
      {loading ? "PDF laden..." : "PDF importeren"}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFile}
        className="hidden"
        disabled={loading}
      />
    </label>
  );
}
