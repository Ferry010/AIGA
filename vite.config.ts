import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import routes from "./src/seo/routes";

function buildMetaTags(route: string, meta: { title: string; description: string; ogImage: string }) {
  const url = `https://aigeletterdheid.academy${route}`;
  return [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="AI Geletterdheid Academy" />`,
    `<meta property="og:locale" content="nl_NL" />`,
    `<meta property="og:title" content="${meta.title}" />`,
    `<meta property="og:description" content="${meta.description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${meta.ogImage}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${meta.title}" />`,
    `<meta name="twitter:description" content="${meta.description}" />`,
    `<meta name="twitter:image" content="${meta.ogImage}" />`,
  ].join("\n    ");
}

function injectOgMetaPlugin() {
  return {
    name: "inject-og-meta",
    closeBundle() {
      const distDir = resolve(__dirname, "dist");
      const templatePath = resolve(distDir, "index.html");
      const template = readFileSync(templatePath, "utf-8");
      let count = 0;

      for (const [route, meta] of Object.entries(routes)) {
        const tags = buildMetaTags(route, meta);
        let html = template;
        html = html.replace(/<title>[^<]*<\/title>/, "");
        html = html.replace(/<meta\s+(?:property="og:|name="twitter:)[^>]*\/?>[\s]*/g, "");
        html = html.replace(/<meta\s+name="description"[^>]*\/?>[\s]*/g, "");
        html = html.replace(/<link\s+rel="canonical"[^>]*\/?>[\s]*/g, "");
        html = html.replace("</head>", `    ${tags}\n  </head>`);

        if (route === "/") {
          writeFileSync(templatePath, html, "utf-8");
        } else {
          const outDir = resolve(distDir, route.slice(1));
          mkdirSync(outDir, { recursive: true });
          writeFileSync(resolve(outDir, "index.html"), html, "utf-8");
        }
        count++;
      }
      console.log(`✅ inject-og-meta: wrote ${count} route HTML files`);
    },
  };
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode !== "development" && injectOgMetaPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
