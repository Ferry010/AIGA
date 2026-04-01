

## Plan: Expand MKB FAQ JSON-LD to all 20 questions

**What**: Replace the hardcoded 8-item `MKB_FAQ_JSONLD` object (lines 203-216) with a dynamic mapping over the full `MKB_FAQ` array, identical to how `ZORG_FAQ_JSONLD` already works.

**How**: One edit in `src/pages/ArticleDetail.tsx`. Replace lines 203-216 with:

```tsx
const MKB_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: MKB_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
```

This automatically includes all 20 questions from the `MKB_FAQ` array. No other changes needed.

