

# WYSIWYG Editor voor Admin Artikelen

## Huidige situatie
Het artikelformulier in `/admin` gebruikt een simpele `<Textarea>` voor Markdown-invoer. Geen preview, geen toolbar, geen visuele formatting.

## Oplossing: TipTap WYSIWYG Editor

**TipTap** is de beste keuze: lichtgewicht, React-native, uitbreidbaar, en slaat op als HTML dat we eenvoudig naar Markdown converteren (of direct als HTML opslaan en renderen).

### Aanpak: HTML opslaan in plaats van Markdown

Omdat we een WYSIWYG editor gebruiken, is het logischer om de content als HTML op te slaan en te renderen. Dit voorkomt lossy conversies (HTML → Markdown → HTML). De `ArticleDetail.tsx` pagina rendert dan HTML direct via `dangerouslySetInnerHTML` met Tailwind `prose` classes (die werken identiek op HTML).

### Wijzigingen

| Bestand | Wat |
|---|---|
| `package.json` | + `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@tiptap/extension-image`, `@tiptap/extension-underline`, `@tiptap/pm` |
| `src/components/RichTextEditor.tsx` | **Nieuw** — TipTap editor component met toolbar (bold, italic, underline, headings, bullets, numbered list, links, blockquote) |
| `src/pages/Admin.tsx` | Vervang `<Textarea>` door `<RichTextEditor>`, maak het formulier groter (full-width, min-height 500px) |
| `src/pages/ArticleDetail.tsx` | Detecteer of content HTML of Markdown is; render HTML direct met `prose` classes, fallback naar ReactMarkdown voor legacy content |

### Editor features
- **Toolbar**: Bold, Italic, Underline, H2, H3, Bullet list, Numbered list, Blockquote, Link, Undo/Redo
- **Groot bewerkvenster**: minimaal 500px hoog, resizable
- **WordPress-achtig**: wat je ziet is wat je krijgt
- **Bestaande content**: Markdown-content wordt bij het openen geconverteerd naar HTML in de editor, zodat alles direct visueel bewerkbaar is

### Backward compatibility
Bestaande artikelen bevatten Markdown. De `ArticleDetail` pagina checkt of content begint met `<` (HTML) of niet (Markdown) en kiest de juiste renderer. Bij het opslaan vanuit de nieuwe editor wordt alles als HTML opgeslagen.

