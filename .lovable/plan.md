

## Plan: Fix SEO rendering issues and add structured data to homepage

### Issue 1: Fix Googlebot blank page (hero animation)

**File: `src/pages/Index.tsx`**

The hero section (line 90) uses `motion.div` with `initial={{ opacity: 0, y: 30 }}`, which means the first paint has `opacity: 0` — Googlebot captures this blank state.

**Fix**: Replace the `motion.div` wrapper around the hero content (lines 90-119) with a plain `<div>`. The hero must be immediately visible without any animation. The hero content is above-the-fold and should never animate in.

### Issue 2: Add structured data (4 JSON-LD blocks)

**File: `src/pages/Index.tsx`**

Add 4 additional JSON-LD blocks to the `<SEO>` component. Since `jsonLd` only accepts one object, we'll add a second `<Helmet>` block (or use `breadcrumbJsonLd` for one and add additional `<script>` tags) — actually the cleanest approach is to add raw `<Helmet>` script tags directly after the `<SEO>` component for the additional schemas:

1. **FAQPage** — built from the existing `faqItems` array (lines 17-42), which already has all 6 Q&A pairs with answers
2. **Course** — exact JSON provided by user
3. **Person** (Ferry Hoes) — exact JSON provided by user  
4. **VideoObject** — exact JSON provided by user

We'll add a `<Helmet>` block right after the `<SEO>` component containing 4 `<script type="application/ld+json">` tags.

### Issue 3: Remove duplicate meta description

**File: `index.html`**

There is no `<meta name="description">` in `index.html` currently — so this is already clean. The only description comes from React Helmet. No change needed.

### Issue 4: Fix H1 for SEO

**File: `src/pages/Index.tsx`** (line 93)

Change: `"Jouw team werkt al met AI."` → `"AI-geletterdheid voor jouw team."`

The second line and H2 remain unchanged.

---

### Summary of changes

**`src/pages/Index.tsx`**:
- Line 90-119: Replace `motion.div` with plain `<div>` (no animation on hero)
- Line 93: Update H1 text
- After line 85: Add `<Helmet>` with 4 JSON-LD script blocks (FAQPage, Course, Person, VideoObject)

No other files need changes.

