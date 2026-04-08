

## Plan: Fix PDF Import

### Problem
The `pdfjs-dist` v4.x import with the CDN worker approach is likely failing silently. Version 4.x changed its module structure significantly, and the CDN worker URL pattern may not match, or Vite's bundling of `pdfjs-dist` causes initialization issues that prevent the file input from working.

### Solution
Replace `pdfjs-dist` with a simpler approach: use the **`unpdf`** library (lightweight, works in browsers, no worker setup needed) or switch to reading the PDF via a **Supabase Edge Function** using `pdf-parse`. However, since the component structure is simple and client-side is preferred, the cleanest fix is:

**Option: Use `pdfjs-dist` with proper Vite configuration**

1. **Update `BlogPdfImport.tsx`**:
   - Use a dynamic import approach for `pdfjs-dist` to avoid module-level initialization issues
   - Set the worker source using a Vite-compatible approach (copy worker to public, or use `?url` import)
   - Add a toast notification for errors so failures aren't silent
   - Add `console.log` breadcrumbs to confirm the handler fires

2. **Copy the PDF.js worker to `public/`**:
   - Copy `pdf.worker.min.mjs` from `node_modules/pdfjs-dist/build/` to `public/` so it's served as a static asset, avoiding CDN/CORS issues

3. **Update worker source reference**:
   ```typescript
   pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
   ```

### Alternative (simpler, recommended)
Replace `pdfjs-dist` entirely with the browser-native `FileReader` + an edge function approach:
- Upload the PDF to a backend function that uses `pdf-parse` (Deno-compatible) to extract text
- Return the parsed text to the client
- This avoids all worker/bundling issues

**Recommended: Fix client-side approach** since it's already built and just needs the worker path fixed.

### Files affected
- `src/components/BlogPdfImport.tsx` — fix worker setup, add error toasts
- `public/pdf.worker.min.mjs` — copy worker file from node_modules (build step or manual copy)
- Alternatively: add a `vite.config.ts` plugin to handle the worker

