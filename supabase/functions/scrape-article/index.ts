import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/** Improved HTML→Markdown converter for WordPress content */
function htmlToMarkdown(html: string): string {
  let md = html;

  // Remove script/style tags
  md = md.replace(/<script[\s\S]*?<\/script>/gi, "");
  md = md.replace(/<style[\s\S]*?<\/style>/gi, "");

  // Remove WordPress-specific non-content elements (share buttons, related posts, etc.)
  md = md.replace(/<div[^>]*class="[^"]*(?:sharedaddy|jp-relatedposts|post-nav|wp-block-buttons)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, "");

  // Convert <figure> with <img> and optional <figcaption>
  md = md.replace(/<figure[^>]*>[\s\S]*?<img[^>]+src="([^"]*)"[^>]*(?:alt="([^"]*)")?[^>]*\/?>[\s\S]*?(?:<figcaption[^>]*>([\s\S]*?)<\/figcaption>)?[\s\S]*?<\/figure>/gi,
    (_, src, alt, caption) => {
      const altText = alt || caption || "";
      return `\n![${altText}](${src})\n${caption ? `*${caption.replace(/<[^>]+>/g, "").trim()}*\n` : ""}`;
    }
  );

  // Headings (handle attributes on tags)
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n\n# $1\n\n");
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n\n## $1\n\n");
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n\n### $1\n\n");
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n\n#### $1\n\n");
  md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "\n\n##### $1\n\n");
  md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, "\n\n###### $1\n\n");

  // Bold / italic
  md = md.replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, "**$2**");
  md = md.replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, "*$2*");

  // Links
  md = md.replace(/<a[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");

  // Images (standalone, not already handled by figure)
  md = md.replace(/<img[^>]+src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "\n![$2]($1)\n");
  md = md.replace(/<img[^>]+src="([^"]*)"[^>]*\/?>/gi, "\n![]($1)\n");

  // Lists – handle nested lists by processing li first
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
  md = md.replace(/<\/?[ou]l[^>]*>/gi, "\n");

  // Paragraphs & line breaks
  md = md.replace(/<br\s*\/?>/gi, "\n");
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n\n$1\n\n");

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content) =>
    "\n" + content.replace(/<[^>]+>/g, "").split("\n").map((l: string) => `> ${l.trim()}`).join("\n") + "\n"
  );

  // Horizontal rules
  md = md.replace(/<hr[^>]*\/?>/gi, "\n---\n");

  // Strip remaining div/span wrappers (WordPress uses lots of nested divs)
  md = md.replace(/<\/?(div|span|section|aside|nav|header|footer)[^>]*>/gi, "\n");

  // Remove remaining HTML tags
  md = md.replace(/<[^>]+>/g, "");

  // Decode common HTML entities
  md = md.replace(/&amp;/g, "&");
  md = md.replace(/&lt;/g, "<");
  md = md.replace(/&gt;/g, ">");
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#039;/g, "'");
  md = md.replace(/&nbsp;/g, " ");
  md = md.replace(/&rsquo;/g, "'");
  md = md.replace(/&lsquo;/g, "'");
  md = md.replace(/&rdquo;/g, "\u201D");
  md = md.replace(/&ldquo;/g, "\u201C");
  md = md.replace(/&mdash;/g, "—");
  md = md.replace(/&ndash;/g, "–");
  md = md.replace(/&hellip;/g, "…");

  // Clean up excessive whitespace while preserving paragraph breaks
  md = md.replace(/[ \t]+$/gm, ""); // trailing spaces
  md = md.replace(/\n{3,}/g, "\n\n"); // max 2 newlines
  return md.trim();
}

/** Strip recurring boilerplate sections from converted markdown */
function stripBoilerplate(md: string): string {
  let clean = md;

  // Remove "Over de auteur" blocks (everything from heading to next ## or end)
  clean = clean.replace(/#{1,3}\s*Over de auteur[\s\S]*?(?=\n##\s|$)/gi, "");

  // Remove "Meer weten" / "Lees ook" blocks with 👉 links
  clean = clean.replace(/\*{0,2}Meer weten over[^*]*?\*{0,2}[\s\S]*?(?=\n##\s|\n\n(?!👉|Of ))/gi, "");
  // Catch remaining orphaned 👉 lines
  clean = clean.replace(/^👉\s*\[.*?\]\(.*?\)\s*$/gm, "");
  clean = clean.replace(/^Of ontdek\b.*$/gm, "");

  // Remove "Klaar om AI-Geletterd te worden?" sections
  clean = clean.replace(/#{1,3}\s*Klaar om AI-Geletterd te worden\?[\s\S]*?(?=\n##\s|$)/gi, "");

  // Remove "Waarom bij ons?" sections
  clean = clean.replace(/#{1,3}\s*Waarom bij ons\?[\s\S]*?(?=\n##\s|$)/gi, "");

  // Remove Ferry's author photo
  clean = clean.replace(/!\[.*?\]\([^)]*1748602831893[^)]*\)/g, "");

  // Remove CTA form remnants
  clean = clean.replace(/Verstuur.*?nogmaals\.\s*×?/gs, "");
  clean = clean.replace(/Bedankt voor uw verzoek[^×]*×/g, "");
  clean = clean.replace(/Er ging iets fout[^×]*×/g, "");
  clean = clean.replace(/Laat je gegevens achter en we nemen direct contact.*?voordeel\./gs, "");
  clean = clean.replace(/Samen zorgen we dat jouw organisatie.*?voordeel\./gs, "");

  // Remove Ferry op Linkedin links
  clean = clean.replace(/\[Ferry op Linkedin\]\([^)]*\)/g, "");

  // Clean up excessive whitespace
  clean = clean.replace(/\n{3,}/g, "\n\n");
  return clean.trim();
}

function extractSlug(url: string): string {
  const path = new URL(url).pathname.replace(/^\/|\/$/g, "");
  return path.split("/").pop() || path;
}

function extractContent(html: string): string {
  // Try WordPress .entry-content first, then <article>, then <main>
  const patterns = [
    /<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<footer|<div[^>]*class="[^"]*post-|<\/article)/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<main[^>]*>([\s\S]*?)<\/main>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }

  // Broader .entry-content fallback
  const broad = html.match(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)(?:<\/div>\s*<\/div>|<\/article>)/i);
  if (broad?.[1]) return broad[1];

  return "";
}

function extractFeaturedImage(html: string): string | null {
  const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  if (ogMatch?.[1]) return ogMatch[1];

  const twitterMatch = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
  if (twitterMatch?.[1]) return twitterMatch[1];

  const thumbMatch = html.match(/<div[^>]*class="[^"]*post-thumbnail[^"]*"[^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/i);
  if (thumbMatch?.[1]) return thumbMatch[1];

  const articleImgMatch = html.match(/<article[\s\S]*?<img[^>]+src=["']([^"']+)["']/i);
  if (articleImgMatch?.[1]) return articleImgMatch[1];

  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { article_id, url } = await req.json();
    if (!article_id || !url) {
      return new Response(JSON.stringify({ error: "article_id and url required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "nl,en-US;q=0.7,en;q=0.3",
        "Accept-Encoding": "identity",
      },
      redirect: "follow",
    });
    if (!res.ok) {
      const body = await res.text();
      return new Response(JSON.stringify({ error: `Failed to fetch: ${res.status}`, body: body.substring(0, 200) }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = await res.text();
    const rawContent = extractContent(html);

    if (!rawContent) {
      return new Response(JSON.stringify({ error: "Could not extract article content" }), {
        status: 422,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const markdown = stripBoilerplate(htmlToMarkdown(rawContent));
    const slug = extractSlug(url);
    const featuredImage = extractFeaturedImage(html);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const updateData: Record<string, unknown> = { content: markdown, slug };
    if (featuredImage) {
      updateData.image_url = featuredImage;
    }

    const { error } = await supabase
      .from("articles")
      .update(updateData)
      .eq("id", article_id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, slug, content_length: markdown.length, image_url: featuredImage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
