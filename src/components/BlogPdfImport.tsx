import { useRef, useState } from "react";
import { FileUp, Loader2 } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

// Use the bundled worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export interface PdfArticleData {
  title: string;
  category: string;
  url: string;
  meta_description: string;
  seo_keywords: string;
  labels: string[];
  content: string; // HTML
}

const LABELS = ["TITEL:", "CATEGORIE:", "URL:", "META DESCRIPTION:", "KEYWORDS:", "LABELS:", "BODY:"] as const;

function parseStructuredText(text: string): PdfArticleData {
  const result: Record<string, string> = {};

  // Find positions of each label
  const positions: { label: string; index: number }[] = [];
  for (const label of LABELS) {
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
  const htmlBody = markdownToHtml(bodyMd);

  return {
    title: result["TITEL:"] || "",
    category: result["CATEGORIE:"] || "",
    url: result["URL:"] || "",
    meta_description: result["META DESCRIPTION:"] || "",
    seo_keywords: result["KEYWORDS:"] || "",
    labels: (result["LABELS:"] || "")
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean),
    content: htmlBody,
  };
}

function markdownToHtml(md: string): string {
  let html = md
    // Headings (must come before bold because ### can include **)
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    // Unordered list items
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Wrap consecutive <li> in <ul>
    .replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>")
    // Line breaks: double newlines → paragraph breaks
    .replace(/\n{2,}/g, "</p><p>")
    // Single newlines → <br>
    .replace(/\n/g, "<br>");

  // Wrap in paragraph tags
  html = `<p>${html}</p>`;

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "");
  // Clean up paragraphs wrapping block elements
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
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: any) => item.str)
          .join(" ");
        fullText += pageText + "\n";
      }
      const parsed = parseStructuredText(fullText);
      onImport(parsed);
    } catch (err) {
      console.error("PDF parse error:", err);
    }
    setLoading(false);
    // Reset input so same file can be re-uploaded
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
