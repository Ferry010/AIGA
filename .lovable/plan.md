

## Plan: Add FAQ section to "AI-geletterdheid training vergelijken" article

### File: `src/pages/ArticleDetail.tsx`

**1. Add FAQ data array** (after `VIJF_STAPPEN_FAQ` ~line 119)
- Add `TRAINING_VERGELIJKEN_FAQ` with all 8 Q&A pairs exactly as provided
- Add `TRAINING_VERGELIJKEN_FAQ_JSONLD` with the FAQPage schema markup

**2. Add slug detection** (~line 244)
- Add `const isTrainingVergelijken = article.slug === "ai-geletterdheid-training-vergelijken-hoe-kies-je-de-juiste";`

**3. Add SEO overrides** for this slug (in the seoTitle/seoDescription logic)

**4. Add FAQ JSON-LD to the Helmet** section (where other FAQ JSON-LDs are conditionally rendered)

**5. Add FAQ accordion section** (after the existing `is5Stappen` FAQ block, ~line 468, before the CTA blocks)
- Follow exact same pattern as existing FAQ sections
- Render with `isTrainingVergelijken` condition
- Title: "Veelgestelde vragen"
- Uses existing `Accordion`/`AccordionItem`/`AccordionTrigger`/`AccordionContent` components (already imported)
- Styling matches existing FAQ sections: `text-left text-base font-semibold` trigger, `text-muted-foreground leading-relaxed` answer

**6. Add to ARTICLE_CTAS** if not already present (link to training page)

### Notes
- The existing accordion already has chevron rotation animation and border-bottom dividers between items
- No new components or styles needed; follows established pattern exactly
- The slug needs to be verified against the database; will use the most likely slug based on the title pattern

