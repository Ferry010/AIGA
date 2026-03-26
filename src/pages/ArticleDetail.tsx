import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
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
  "eu-ai-act-boetes-maximale-bedragen": "2025-06-20",
};

const FALLBACK_IMAGE = "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png";

const EU_AI_ACT_SOURCES = [
  { label: "EUR-Lex — EU AI Act (Verordening 2024/1689)", url: "https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:32024R1689" },
  { label: "Rijksoverheid.nl — Kunstmatige Intelligentie", url: "https://www.rijksoverheid.nl/onderwerpen/kunstmatige-intelligentie-ai" },
  { label: "European Commission — AI Act", url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" },
];

const WAT_IS_FAQ = [
  { q: "Wat zijn voorbeelden van AI-geletterdheid?", a: "Voorbeelden van AI-geletterdheid zijn: een HR-medewerker die weet dat het recruitmentplatform AI gebruikt om cv's te rangschikken en dat resultaat kritisch beoordeelt in plaats van blindelings overneemt; een marketeer die ChatGPT gebruikt voor contentteksten maar de feiten altijd zelf verifieert; een manager die bij de aanschaf van nieuwe software vraagt of het AI-componenten bevat en welk risiconiveau die hebben; en een directeur die zijn team heeft laten certificeren zodat de organisatie bij een audit bewijs kan overleggen." },
  { q: "Wat is het stappenplan voor AI-geletterdheid?", a: "Het stappenplan voor AI-geletterdheid bestaat uit zes stappen: 1) inventariseer welke AI-systemen en -tools je organisatie gebruikt; 2) bepaal per functiegroep welk kennisniveau nodig is; 3) kies een geschikte trainingsvorm (online, live of gecombineerd); 4) laat medewerkers trainen en certificeren, en leg dit vast in je HR-systeem; 5) verwerk AI-geletterdheid in je beleid, onboarding en inkoopproces; 6) herhaal jaarlijks en actualiseer op basis van nieuwe wetgeving." },
  { q: "Welke 4 dimensies van AI-geletterdheid zijn er?", a: "De vier kerngebieden van AI-geletterdheid zijn: (1) kennis: begrijpen wat AI is en hoe het werkt; (2) vaardigheden: AI-tools effectief en verantwoord kunnen inzetten in je werk; (3) ethiek: AI-gerelateerde dilemma's herkennen en verantwoorde keuzes kunnen maken; en (4) wetgeving: weten welke regels gelden, met name de EU AI Act en de verplichtingen die die oplegt aan jouw organisatie." },
  { q: "Hoe kan ik een AI-geletterdheid certificaat halen?", a: "Je kunt een AI-geletterdheid certificaat halen via een erkende online training zoals die van AIGA. Je volgt de training zelfstandig in eigen tempo (2-3 uur), maakt een adaptief examen, en ontvangt direct het AI Literacy Practitioner certificaat. Dit certificaat is digitaal ondertekend, deelbaar via LinkedIn en geldig als bewijs bij een audit in het kader van de EU AI Act." },
  { q: "Is AI-geletterdheid wettelijk verplicht?", a: "Ja. Artikel 4 van de EU AI Act, die op 2 februari 2025 van kracht werd, verplicht alle aanbieders en gebruiksverantwoordelijken van AI-systemen om te zorgen voor een toereikend niveau van AI-geletterdheid bij hun personeel. Actieve handhaving door de Autoriteit Persoonsgegevens is gestart per augustus 2025. Boetes kunnen oplopen tot 35 miljoen euro of 7% van de jaaromzet." },
  { q: "Wat is het verschil tussen AI-geletterdheid en digitale geletterdheid?", a: "Digitale geletterdheid gaat over het kunnen omgaan met digitale tools in het algemeen. AI-geletterdheid is specifieker: het gaat over het begrijpen van hoe AI-systemen werken, welke risico's ze meebrengen, en hoe je ze verantwoord inzet. AI-geletterdheid is een verdieping van digitale geletterdheid, specifiek gericht op de toenemende aanwezigheid van AI in werkprocessen." },
  { q: "Voor wie geldt de AI-geletterdheidsplicht?", a: "De AI-geletterdheidsplicht geldt voor alle organisaties die AI-systemen aanbieden of gebruiken. In de praktijk valt vrijwel iedere Nederlandse organisatie hieronder: ook het gebruik van ChatGPT, Microsoft Copilot, AI-functies in CRM- of HR-systemen, of een geautomatiseerde chatbot maakt van jouw organisatie een gebruiksverantwoordelijke in de zin van de AI Act." },
];

const BOETES_FAQ = [
  { q: "Wat zijn de maximale boetes onder de EU AI Act?", a: "De maximale boete is €35.000.000 of 7% van de wereldwijde jaaromzet voor het gebruik van verboden AI-praktijken. Voor niet-naleving van verplichtingen voor hoog-risico AI geldt een maximum van €15.000.000 of 3% van de omzet." },
  { q: "Wanneer worden AI Act boetes opgelegd in Nederland?", a: "De Autoriteit Persoonsgegevens handhaaft actief vanaf augustus 2025. De verboden AI-praktijken zijn al van kracht sinds februari 2025." },
  { q: "Geldt de boete ook voor kleine bedrijven?", a: "Ja, maar voor MKB en startups geldt Artikel 99 lid 6: de boete is het laagste van het percentage of het vaste bedrag. Voor een klein bedrijf is dat vaak aanzienlijk minder dan de nominale maximum bedragen." },
  { q: "Wat is de boete voor het niet trainen van medewerkers in AI-geletterdheid?", a: "Artikel 4 heeft geen eigen boetebedrag, maar niet-naleving valt onder de algemene deployer-verplichtingen van Categorie 2: maximaal €15.000.000 of 3% van de omzet." },
  { q: "Hoe bereken ik mijn boeterisico onder de EU AI Act?", a: "Gebruik de gratis AIGA Boetecalculator op aigeletterdheid.academy/tools/boetecalculator. De calculator combineert jouw organisatieprofiel, de tools die je gebruikt en jouw huidige compliancestatus." },
];

const WAT_IS_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: WAT_IS_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const BOETES_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: BOETES_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

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
    if (href && (href.startsWith("/kenniscentrum") || href.startsWith("/training") || href.startsWith("/masterclass") || href.startsWith("/faq") || href.startsWith("/over-aiga") || href.startsWith("/contact") || href.startsWith("/gereedheidscan") || href.startsWith("/risicoscan"))) {
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

  const isWatIs = article.slug === "wat-is-ai-geletterdheid";
  const isBoetes = article.slug === "eu-ai-act-boetes-maximale-bedragen";
  const seoTitle = isWatIs
    ? "Wat is AI-geletterdheid? Complete gids voor organisaties (2026)"
    : isBoetes
    ? "EU AI Act boetes: wat zijn de maximale bedragen? | AIGA"
    : `${article.title} | AIGA Kenniscentrum`;
  const seoDescription = isWatIs
    ? "AI-geletterdheid is wettelijk verplicht sinds februari 2025. Lees wat het inhoudt, welke verplichtingen de EU AI Act stelt, wat voorbeelden zijn en hoe jij je organisatie compliant maakt."
    : isBoetes
    ? "Wat zijn de maximale boetes onder de EU AI Act? Artikel 99 legt de bedragen vast. Lees wat jouw organisatie riskeert en bereken het direct."
    : (article.content ? article.content.slice(0, 155).replace(/[#*\n]/g, "") + "..." : "Lees dit artikel over AI-geletterdheid op het AIGA Kenniscentrum.");

  const articleJsonLd = isWatIs
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Wat is AI-geletterdheid? Complete gids voor organisaties (2026)",
        description: seoDescription,
        image: "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png",
        datePublished: "2025-02-01",
        dateModified: "2026-03-21",
        wordCount,
        keywords: ["AI-geletterdheid", "ai geletterdheid", "EU AI Act", "AI Act artikel 4", "AI geletterdheid certificaat", "AI geletterdheid verplicht", "wat is AI-geletterdheid"],
        inLanguage: "nl-NL",
        author: { "@type": "Person", name: "Ferry Hoes", url: "https://aigeletterdheid.academy/over-aiga", jobTitle: "AI Expert & Trainer", worksFor: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy" } },
        publisher: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy", logo: { "@type": "ImageObject", url: "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png" } },
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://aigeletterdheid.academy/kenniscentrum/wat-is-ai-geletterdheid" },
        about: { "@type": "Thing", name: "AI-geletterdheid", description: "Het vermogen van medewerkers om AI te begrijpen, ermee te werken en de gevolgen ervan te overzien binnen hun werkcontext, zoals vereist door artikel 4 van de EU AI Act." },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: seoDescription,
        image: article.image_url || FALLBACK_IMAGE,
        datePublished: publishedDate,
        dateModified: modifiedDate,
        wordCount,
        author: { "@type": "Person", name: "Ferry Hoes", url: "https://aigeletterdheid.academy/over-aiga", jobTitle: "AI-expert & Keynote Spreker", sameAs: "https://www.linkedin.com/in/ferryhoes" },
        publisher: { "@type": "Organization", name: "AIGA — AI Geletterdheid Academy", logo: { "@type": "ImageObject", url: "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png" } },
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://aigeletterdheid.academy/kenniscentrum/${article.slug}` },
        inLanguage: "nl",
        about: { "@type": "Thing", name: "AI-geletterdheid" },
      };

  return (
    <div className="min-h-screen">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`/kenniscentrum/${article.slug}`}
        ogImage={article.image_url || FALLBACK_IMAGE}
        ogType="article"
        articleMeta={{
          publishedTime: isWatIs ? "2025-02-01" : publishedDate,
          modifiedTime: isWatIs ? "2026-03-21" : modifiedDate,
          author: "Ferry Hoes",
          section: article.category,
        }}
        jsonLd={articleJsonLd}
      />
      {isWatIs && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(WAT_IS_FAQ_JSONLD)}</script>
        </Helmet>
      )}
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
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight mb-2">
                {isWatIs ? "Wat is AI-geletterdheid?" : article.title}
              </h1>
              {isWatIs && (
                <>
                  <p className="text-lg text-muted-foreground leading-relaxed mt-4 mb-2">
                    AI-geletterdheid is inmiddels net zo fundamenteel als lezen en schrijven. Niet omdat het modewoord van het jaar is, maar omdat de wet het verplicht. Sinds februari 2025 moeten alle organisaties in de EU die met AI-systemen werken aantoonbaar investeren in de AI-geletterdheid van hun medewerkers. Maar wat betekent dat precies? Wat verwacht de wet van jouw organisatie? En hoe pak je het concreet aan?
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    Dit is de meest complete Nederlandstalige gids over AI-geletterdheid: geschreven voor leidinggevenden, HR-professionals en beleidsmakers die helder willen begrijpen wat AI-geletterdheid is, waarom het urgent is en hoe ze er nu mee aan de slag kunnen.
                  </p>
                </>
              )}
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border mt-4">
              <Link to="/over-aiga" className="hover:text-primary transition-colors" rel="author">Ferry Hoes</Link>
              <span>{formatDate(isWatIs ? "2025-02-01T00:00:00Z" : publishedDate)}</span>
              {isWatIs && <span>Laatst bijgewerkt: 21 maart 2026</span>}
              <span className="flex items-center gap-1"><Clock size={14} /> {readingTime} min leestijd</span>
              {!isWatIs && (
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                  Origineel artikel <ExternalLink size={14} />
                </a>
              )}
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
                      if (href && (href.startsWith("/kenniscentrum") || href.startsWith("/training") || href.startsWith("/masterclass") || href.startsWith("/faq") || href.startsWith("/over-aiga") || href.startsWith("/contact") || href.startsWith("/gereedheidscan") || href.startsWith("/risicoscan"))) {
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

          {/* FAQ accordion for wat-is-ai-geletterdheid */}
          {isWatIs && (
            <AnimatedSection delay={0.05}>
              <div className="mt-12">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">Veelgestelde vragen over AI-geletterdheid</h2>
                <Accordion type="single" collapsible className="w-full">
                  {WAT_IS_FAQ.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-base font-semibold">{faq.q}</AccordionTrigger>
                      <AccordionContent><p className="text-muted-foreground leading-relaxed">{faq.a}</p></AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AnimatedSection>
          )}

          {/* CTA section for wat-is-ai-geletterdheid */}
          {isWatIs && (
            <AnimatedSection delay={0.1}>
              <div className="mt-12 p-8 bg-card border border-border rounded-2xl text-center">
                <h2 className="text-2xl font-display font-bold text-foreground mb-3">Klaar om je team AI-geletterd te maken?</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  AIGA biedt de meest praktische en schaalbare AI-geletterdheid training voor Nederlandse organisaties. Volledig online, in eigen tempo, afsluitend met een audit-proof certificaat.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild><Link to="/training">Bekijk de online training</Link></Button>
                  <Button asChild variant="outline"><Link to="/gereedheidscan">Doe de gratis AI Gereedheidscan</Link></Button>
                  <Button asChild variant="outline"><Link to="/contact">Vraag een offerte aan</Link></Button>
                </div>
              </div>
            </AnimatedSection>
          )}

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
