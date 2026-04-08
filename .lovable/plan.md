

## Plan: Add PDF Blog Import to Admin

### Approach
Add a "PDF Importeren" button next to "Nieuw artikel" in the Artikelen tab. When a PDF is uploaded, it gets parsed client-side using `pdfjs-dist`, the structured fields are extracted, the article form opens pre-filled, and the user can review before saving with the existing "Opslaan" flow.

### Changes

**1. Install `pdfjs-dist`** — npm dependency for client-side PDF text extraction.

**2. Create `src/components/BlogPdfImport.tsx`**
- A button component that accepts a PDF file
- Uses `pdfjs-dist` to extract all text from the PDF
- Parses the text by looking for the fixed labels: `TITEL:`, `CATEGORIE:`, `URL:`, `META DESCRIPTION:`, `KEYWORDS:`, `LABELS:`, `BODY:`
- Converts the markdown body (## → h2, ### → h3, **bold**, etc.) to HTML for the rich text editor
- Returns parsed data via an `onImport` callback

Parsing logic:
```text
Split text at known labels → extract value between each label
LABELS: split by comma → string[]
CATEGORIE: match against CATEGORIES array
BODY: convert markdown to HTML (simple regex-based: ##→<h2>, ###→<h3>, **→<strong>, *→<em>, - →<li>)
```

**3. Update `src/pages/Admin.tsx`**
- Import `BlogPdfImport`
- Add the import button in the Artikelen tab header (next to "Nieuw artikel")
- On import callback: call `setForm()` with parsed values, set `showForm(true)`, auto-generate slug
- The existing form + "Opslaan" button handles the rest

### Files affected
- `package.json` — add `pdfjs-dist`
- `src/components/BlogPdfImport.tsx` — new component
- `src/pages/Admin.tsx` — add import button + handler

