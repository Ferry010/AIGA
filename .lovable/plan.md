

## Rebrand "AI Risicoscan" to "AI Gereedheidscan"

### Rationale
The current name "Risicoscan" frames the tool around AI risks (high/mid/low risk AI tools), which is misleading. The scan actually measures organizational readiness across 5 dimensions: AI-gebruik, bewustzijn van wetgeving, risicobeheer, leiderschap, en audit-readiness. "Gereedheidscan" (readiness scan) better reflects this.

### What changes

**Naming updates across all files:**
- "AI Risicoscan" / "AI Risico-scan" / "Risicoscan" → "AI Gereedheidscan"
- "GRATIS AI RISICO-SCAN" → "GRATIS AI GEREEDHEIDSCAN"
- URL route stays `/risicoscan` to avoid breaking existing links (or change to `/gereedheidscan` with a redirect)

**Tier badges reframed from risk to readiness:**
- Tier 1 (0-40%): "HOOG RISICO" → "NIET GEREED" · heading: "Je team loopt risico" → "Jullie organisatie is nog niet gereed"
- Tier 2 (41-70%): "BLINDE VLEKKEN" → "GEDEELTELIJK GEREED" · heading stays similar
- Tier 3 (71-100%): "VOORLOPER" stays (already positive/readiness-framed)

**SEO & meta updates in `Quiz.tsx`:**
- Title: "Gratis AI Gereedheidscan voor Organisaties | 3 Minuten | AIGA"
- Description reframed around readiness instead of vulnerability
- JSON-LD name/description updated

**Copy updates in `Quiz.tsx` intro:**
- Reframe intro paragraphs from "hoe kwetsbaar" to "hoe gereed" your organisation is

**LinkedIn share text** in Quiz.tsx updated

**Files to edit (7):**
1. `src/pages/Quiz.tsx` – main rename + tier badges + SEO + intro copy + LinkedIn text
2. `src/pages/Index.tsx` – CTA section references (2 occurrences)
3. `src/components/Navbar.tsx` – nav button label
4. `src/components/Footer.tsx` – footer link label
5. `src/components/SocialProof.tsx` – link text
6. `src/App.tsx` – route path (change to `/gereedheidscan`, keep `/risicoscan` as redirect)
7. `public/sitemap.xml` – URL update

**Database:** The `tier` column values in `risk_scan_submissions` stay unchanged (internal only).

### URL strategy
- Change primary route to `/gereedheidscan`
- Add redirect from `/risicoscan` → `/gereedheidscan` via `_redirects` file and React Router redirect, so existing links keep working

