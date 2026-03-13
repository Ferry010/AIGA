import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Badge } from "@/components/ui/badge";
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
}

interface AdjacentArticle {
  title: string;
  slug: string | null;
  category: string;
  image_url: string;
}

const FERRY_BIO =
  "Ferry Hoes is veelgevraagd spreker en trainer op het gebied van AI-geletterdheid. Hij staat meermaals per maand op het podium voor organisaties zoals a.s.r., VodafoneZiggo en verschillende ministeries. In 2020 won hij de Anti-Discriminatie AI-Hackathon van de Nederlandse overheid.";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [prevArticle, setPrevArticle] = useState<AdjacentArticle | null>(null);
  const [nextArticle, setNextArticle] = useState<AdjacentArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true);

      // Fetch current article
      const { data: current } = await supabase
        .from("articles")
        .select("id, title, category, url, image_url, content, slug, sort_order")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      setArticle(current as Article | null);

      if (current) {
        // Fetch all published articles sorted for prev/next
        const { data: allArticles } = await supabase
          .from("articles")
          .select("title, slug, category, image_url, sort_order")
          .eq("published", true)
          .order("sort_order", { ascending: true });

        if (allArticles && allArticles.length > 1) {
          const idx = allArticles.findIndex((a) => a.slug === slug);
          if (idx > 0) setPrevArticle(allArticles[idx - 1] as AdjacentArticle);
          else setPrevArticle(null);
          if (idx < allArticles.length - 1) setNextArticle(allArticles[idx + 1] as AdjacentArticle);
          else setNextArticle(null);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Laden...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Artikel niet gevonden.</p>
        <Link to="/kenniscentrum" className="text-primary hover:underline">
          ← Terug naar kenniscentrum
        </Link>
      </div>
    );
  }

  // Normalize hero image URL for comparison (strip protocol + query params)
  const heroImgNorm = article.image_url
    ? article.image_url.replace(/^https?:\/\//, "").split("?")[0]
    : "";

  return (
    <div className="min-h-screen">
      {/* Hero image – clean, no gradient overlay */}
      {article.image_url && (
        <div className="w-full max-h-[50vh] overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            {/* Back link + badge + title – always below image */}
            <div className="pt-8">
              <Link
                to="/kenniscentrum"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft size={16} /> Terug naar kenniscentrum
              </Link>
              <Badge variant="secondary" className="mb-3 text-xs block w-fit">
                {article.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight mb-2">
                {article.title}
              </h1>
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border mt-4">
              <span>Ferry Hoes</span>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Origineel artikel <ExternalLink size={14} />
              </a>
            </div>

            {/* Article content */}
            <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-primary/30 prose-hr:border-border prose-img:rounded-xl">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ src, alt, ...props }) => {
                    // Filter out hero image duplicates
                    if (src) {
                      const srcNorm = src.replace(/^https?:\/\//, "").split("?")[0];
                      if (srcNorm === heroImgNorm) return null;
                    }
                    return (
                      <img
                        src={src}
                        alt={alt || ""}
                        className="rounded-xl my-6 w-full"
                        loading="lazy"
                        {...props}
                      />
                    );
                  },
                }}
              >
                {article.content || "Geen content beschikbaar."}
              </ReactMarkdown>
            </article>
          </AnimatedSection>

          {/* Author bio card */}
          <AnimatedSection delay={0.1}>
            <div className="mt-16 neon-border-lg rounded-2xl" style={{ padding: "3px" }}>
              <div className="neon-inner bg-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img
                  src={ferryImg}
                  alt="Ferry Hoes"
                  className="w-20 h-20 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary font-medium mb-1">
                    Over de auteur
                  </p>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    Ferry Hoes
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {FERRY_BIO}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Prev / Next navigation */}
          {(prevArticle || nextArticle) && (
            <AnimatedSection delay={0.2}>
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevArticle?.slug ? (
                  <Link
                    to={`/kenniscentrum/${prevArticle.slug}`}
                    className="group flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-neon-purple/40 neon-glow transition-all duration-300"
                  >
                    <ArrowLeft size={18} className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Vorig artikel</p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {prevArticle.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextArticle?.slug ? (
                  <Link
                    to={`/kenniscentrum/${nextArticle.slug}`}
                    className="group flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-neon-purple/40 neon-glow transition-all duration-300 text-right sm:justify-end"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Volgend artikel</p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {nextArticle.title}
                      </p>
                    </div>
                    <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
