

## Plan: Fix PDF Parser to Match Actual PDF Format

### Problem
The parser expects labels like `TITEL:`, `CATEGORIE:`, `BODY:` inline with values. But the actual PDF uses markdown-style headings on separate lines:

```text
# CATEGORIE
Wetgeving en regels

# URL
https://...

# BODY
Er is een misverstand...
```

The title appears as a standalone heading after "AIGA Blog Import Document", not with a `TITEL:` label. This mismatch causes the "Kon geen gestructureerde data vinden" error.

### Solution
Rewrite `parseStructuredText()` in `src/components/BlogPdfImport.tsx` to handle the actual PDF format:

1. **New label detection**: Match section headers like `CATEGORIE`, `URL`, `META DESCRIPTION`, `KEYWORDS`, `LABELS`, `BODY` — with or without `#` prefix and with or without trailing colon
2. **Title extraction**: The title is the first `#`-heading that isn't a known section label (e.g. the line "AI en bestuursverantwoordelijkheid: wat de EU AI Act van directies vraagt")
3. **Body handling**: Everything after the `BODY` section header becomes body content. Sub-headings within the body (like `# Wat de wet precies zegt`) should be converted to `<h2>`/`<h3>` tags
4. **Keep backward compatibility**: Also support the old `TITEL:` inline format so existing PDFs still work

### Files to Change
- **`src/components/BlogPdfImport.tsx`** — rewrite `parseStructuredText()` to handle both heading-style and inline-style labels

### Technical Detail
The new parser will:
- Split text into lines
- Scan for lines matching known section names (case-insensitive, with optional `#` prefix)
- Collect lines between sections as values
- For BODY, convert `#`-headings to HTML `<h2>`/`<h3>` and paragraphs to `<p>` tags

