import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import ferryImg from "@/assets/ferry-hoes.gif";
import SEO from "@/components/SEO";

interface Article {
  id: string;
  title: string;
  category: string;
  url: string;
  image_url: string;
  content: string | null;
  slug: string | null;
  sort_order: number | null;
  created_at: string | null;
  updated_at: string | null;
}

interface AdjacentArticle {
  title: string;
  slug: string | null;
  category: string;
  image_url: string;
}

function stripLeadingTitle(content: string, title: string): string {
  const titleNorm = title.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
  return content.replace(/^\s*#\s+\*{0,2}([^*\n]+)\*{0,2}\s*\n*/m, (match, heading) => {
    const headingNorm = heading.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    if (headingNorm === titleNorm || titleNorm.includes(headingNorm) || headingNorm.includes(titleNorm)) return "";
    return match;
  });
}

function extractH2Headings(content: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const regex = /^##\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[1].replace(/\*\*/g, "").trim();
    const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
    headings.push({ id, text });
  }
  return headings;
}

const FERRY_BIO = "Ferry Hoes is veelgevraagd spreker en trainer op het gebied van AI-geletterdheid. Hij staat meermaals per maand op het podium voor organisaties zoals a.s.r., VodafoneZiggo en verschillende ministeries. In 2020 won hij de Anti-Discriminatie AI-Hackathon van de Nederlandse overheid.";

const SLUG_DATES: Record<string, string> = {
  "ai-in-marketing-kansen-en-valkuilen": "2025-06-15",
  "ai-act-compliance-checklist-kleine-bedrijven": "2025-06-01",
  "veelgestelde-vragen-ai-act-audit": "2025-05-20",
  "welke-ai-systemen-zijn-verboden": "2025-05-10",
  "documentatie-eisen-eu-ai-act": "2025-05-01",
  "ai-impact-assessment": "2025-04-20",
  "ai-act-en-hr-wat-moet-je-als-hr-professional-weten": "2025-04-10",
  "verschil-minimal-limited-high-risk-ai": "2025-04-01",
  "eu-ai-act-uitgelegd": "2025-03-20",
  "wat-zijn-high-risk-ai-systemen": "2025-03-10",
  "ai-geletterdheid-uitgelegd": "2025-03-01",
  "llms-generatieve-ai-geletterdheid": "2025-02-20",
  "ai-trends-2025-ai-geletterdheid": "2025-02-10",
  "ai-drift-chatgpt-voorkomen": "2025-02-01",
  "ai-geletterdheid-voor-leiders": "2025-01-25",
  "hoe-herken-je-ai-bias": "2025-01-20",
  "5-ai-fouten-die-organisaties-maken": "2025-01-15",
  "waarom-ai-geletterdheid-de-nieuwe-digitale-vaardigheid-is": "2025-01-10",
  "wat-is-ai-geletterdheid": "2025-01-05",
};

const FALLBACK_IMAGE = "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png";

const EU_AI_ACT_SOURCES = [
  { label: "EUR-Lex — EU AI Act (Verordening 2024/1689)", url: "https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:32024R1689" },
  { label: "Rijksoverheid.nl — Kunstmatige Intelligentie", url: "https://www.rijksoverheid.nl/onderwerpen/kunstmatige-intelligentie-ai" },
  { label: "European Commission — AI Act", url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" },
];

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [prevArticle, setPrevArticle] = useState<AdjacentArticle | null>(null);
  const [nextArticle, setNextArticle] = useState<AdjacentArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<AdjacentArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleInternalLinkClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (href && (href.startsWith("/kenniscentrum") || href.startsWith("/training") || href.startsWith("/masterclass") || href.startsWith("/faq") || href.startsWith("/over-aiga") || href.startsWith("/contact") || href.startsWith("/risicoscan"))) {
      e.preventDefault();
      navigate(href);
    }
  }, [navigate]);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      setLoading(true);
      const { data: current } = await supabase
        .from("articles")
        .select("id, title, category, url, image_url, content, slug, sort_order, created_at, updated_at")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      setArticle(current as Article | null);

      if (current) {
        const { data: allArticles } = await supabase
          .from("articles")
          .select("title, slug, category, image_url, sort_order")
          .eq("published", true)
          .order("sort_order", { ascending: true });

        if (allArticles && allArticles.length > 1) {
          const idx = allArticles.findIndex((a) => a.slug === slug);
          setPrevArticle(idx > 0 ? (allArticles[idx - 1] as AdjacentArticle) : null);
          setNextArticle(idx < allArticles.length - 1 ? (allArticles[idx + 1] as AdjacentArticle) : null);

          // Related: same category, exclude current, max 3
          const related = allArticles
            .filter((a) => a.category === current.category && a.slug !== slug)
            .slice(0, 3) as AdjacentArticle[];
          setRelatedArticles(related);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  const articleContent = useMemo(() => {
    if (!article?.content) return "Geen content beschikbaar.";
    return stripLeadingTitle(article.content, article.title);
  }, [article]);

  const wordCount = useMemo(() => articleContent.split(/\s+/).length, [articleContent]);
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const headings = useMemo(() => extractH2Headings(articleContent), [articleContent]);
  const showToc = wordCount >= 600 && headings.length >= 2;
  const isLegalCategory = article?.category === "Wetten en regels";

  const slugDate = article?.slug && SLUG_DATES[article.slug] ? SLUG_DATES[article.slug] + "T00:00:00Z" : null;
  const publishedDate = slugDate || (article?.created_at ? new Date(article.created_at).toISOString() : "2025-01-15T00:00:00Z");
  const modifiedDate = "2026-03-13T00:00:00Z";

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Laden...</p></div>;
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Artikel niet gevonden.</p>
        <Link to="/kenniscentrum" className="text-primary hover:underline">← Terug naar kenniscentrum</Link>
      </div>
    );
  }

  const isHtmlContent = (text: string) => /^\s*<[a-z][\s\S]*>/i.test(text);
  const heroImgNorm = article.image_url ? article.image_url.replace(/^https?:\/\//, "").split("?")[0] : "";

  const articleDescription = article.content ? article.content.slice(0, 155).replace(/[#*\n]/g, "") + "..." : "Lees dit artikel over AI-geletterdheid op het AIGA Kenniscentrum.";

  return (
    <div className="min-h-screen">
      <SEO
        title={`${article.title} | AIGA Kenniscentrum`}
        description={articleDescription}
        canonical={`/kenniscentrum/${article.slug}`}
        ogImage={article.image_url || FALLBACK_IMAGE}
        ogType="article"
        articleMeta={{
          publishedTime: publishedDate,
          modifiedTime: modifiedDate,
          author: "Ferry Hoes",
          section: article.category,
        }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: articleDescription,
          image: article.image_url || FALLBACK_IMAGE,
          datePublished: publishedDate,
          dateModified: modifiedDate,
          wordCount,
          author: {
            "@type": "Person",
            name: "Ferry Hoes",
            url: "https://aigeletterdheid.academy/over-aiga",
            jobTitle: "AI-expert & Keynote Spreker",
            sameAs: "https://www.linkedin.com/in/ferryhoes",
          },
          publisher: {
            "@type": "Organization",
            name: "AIGA — AI Geletterdheid Academy",
            logo: { "@type": "ImageObject", url: "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png" },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": `https://aigeletterdheid.academy/kenniscentrum/${article.slug}` },
          inLanguage: "nl",
          about: { "@type": "Thing", name: "AI-geletterdheid" },
        }}
      />

      {/* Breadcrumb */}
      <BreadcrumbNav items={[
        { label: "Home", href: "/" },
        { label: "Kenniscentrum", href: "/kenniscentrum" },
        { label: article.title },
      ]} />

      {/* Hero image */}
      {article.image_url && (
        <div className="w-full max-h-[50vh] overflow-hidden mt-4">
          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="pt-8">
              <Link to="/kenniscentrum" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft size={16} /> Terug naar kenniscentrum
              </Link>
              <Badge variant="secondary" className="mb-3 text-xs block w-fit">{article.category}</Badge>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight mb-2">{article.title}</h1>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border mt-4">
              <Link to="/over-aiga" className="hover:text-primary transition-colors" rel="author">Ferry Hoes</Link>
              <span>{formatDate(publishedDate)}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {readingTime} min leestijd</span>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                Origineel artikel <ExternalLink size={14} />
              </a>
            </div>

            {/* Table of Contents */}
            {showToc && (
              <nav className="bg-accent border border-primary/20 rounded-xl p-5 mb-8">
                <p className="text-sm font-semibold text-foreground mb-3">Inhoudsopgave</p>
                <ul className="space-y-1.5">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-sm text-primary hover:underline">{h.text}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Article content */}
            {isHtmlContent(articleContent) ? (
              <article
                className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-primary/30 prose-hr:border-border prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: articleContent }}
                onClick={handleInternalLinkClick}
              />
            ) : (
              <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-primary/30 prose-hr:border-border prose-img:rounded-xl">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children, ...props }) => {
                      if (href && (href.startsWith("/kenniscentrum") || href.startsWith("/training") || href.startsWith("/masterclass") || href.startsWith("/faq") || href.startsWith("/over-aiga") || href.startsWith("/contact") || href.startsWith("/risicoscan"))) {
                        return <Link to={href} className="text-primary hover:underline">{children}</Link>;
                      }
                      return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
                    },
                    img: ({ src, alt, ...props }) => {
                      if (src) {
                        const srcNorm = src.replace(/^https?:\/\//, "").split("?")[0];
                        if (srcNorm === heroImgNorm) return null;
                      }
                      return <img src={src} alt={alt || ""} className="rounded-xl my-6 w-full" loading="lazy" {...props} />;
                    },
                    h2: ({ children, ...props }) => {
                      const text = String(children).replace(/\*\*/g, "").trim();
                      const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
                      return <h2 id={id} {...props}>{children}</h2>;
                    },
                  }}
                >
                  {articleContent}
                </ReactMarkdown>
              </article>
            )}
          </AnimatedSection>

          {/* External sources for legal articles */}
          {isLegalCategory && (
            <AnimatedSection delay={0.05}>
              <div className="mt-10 p-6 bg-card border border-border rounded-2xl">
                <h3 className="text-sm font-semibold text-foreground mb-3">Officiële bronnen</h3>
                <ul className="space-y-2 text-sm">
                  {EU_AI_ACT_SOURCES.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{s.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          )}

          {/* Author bio card */}
          <AnimatedSection delay={0.1}>
            <div className="mt-16 neon-border-lg rounded-2xl" style={{ padding: "3px" }}>
              <div className="neon-inner bg-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img src={ferryImg} alt="Ferry Hoes" className="w-20 h-20 rounded-full object-cover shrink-0" loading="lazy" decoding="async" width={80} height={80} />
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary font-medium mb-1">Over de auteur</p>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    <Link to="/over-aiga" className="hover:text-primary transition-colors" rel="author">Ferry Hoes</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{FERRY_BIO}</p>
                  <Link to="/over-aiga" className="text-xs text-primary hover:underline mt-2 inline-block">Lees meer over Ferry →</Link>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <AnimatedSection delay={0.15}>
              <div className="mt-12">
                <h3 className="text-lg font-display font-semibold text-foreground mb-6">Gerelateerde artikelen</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedArticles.map((ra) => (
                    ra.slug && (
                      <Link
                        key={ra.slug}
                        to={`/kenniscentrum/${ra.slug}`}
                        className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 neon-glow transition-all duration-300"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img src={ra.image_url} alt={ra.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{ra.title}</p>
                        </div>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Prev / Next navigation */}
          {(prevArticle || nextArticle) && (
            <AnimatedSection delay={0.2}>
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevArticle?.slug ? (
                  <Link to={`/kenniscentrum/${prevArticle.slug}`} className="group flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-neon-purple/40 neon-glow transition-all duration-300">
                    <ArrowLeft size={18} className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Vorig artikel</p>
                      <p className="text-sm font-medium text-foreground truncate">{prevArticle.title}</p>
                    </div>
                  </Link>
                ) : <div />}
                {nextArticle?.slug ? (
                  <Link to={`/kenniscentrum/${nextArticle.slug}`} className="group flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-neon-purple/40 neon-glow transition-all duration-300 text-right sm:justify-end">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Volgend artikel</p>
                      <p className="text-sm font-medium text-foreground truncate">{nextArticle.title}</p>
                    </div>
                    <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                  </Link>
                ) : <div />}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
