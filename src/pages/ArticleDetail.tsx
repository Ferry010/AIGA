import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Badge } from "@/components/ui/badge";

interface Article {
  id: string;
  title: string;
  category: string;
  url: string;
  image_url: string;
  content: string | null;
  slug: string | null;
}

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("articles")
      .select("id, title, category, url, image_url, content, slug")
      .eq("slug", slug)
      .eq("published", true)
      .single()
      .then(({ data }) => {
        setArticle(data as Article | null);
        setLoading(false);
      });
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

  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link
              to="/kenniscentrum"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} /> Terug naar kenniscentrum
            </Link>

            <Badge variant="secondary" className="mb-4 text-xs">
              {article.category}
            </Badge>

            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
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

            {article.image_url && (
              <div className="rounded-2xl overflow-hidden mb-10">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            <article className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content || "Geen content beschikbaar."}
              </ReactMarkdown>
            </article>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
