

## Plan: Optimize EU AI Act A4 mobile font sizes

### Problem
Many text elements use fixed small sizes like `text-[11px]`, `text-[10px]`, `text-[9px]` without mobile-first overrides, making them hard to read on phones.

### Fix
Increase all mobile font sizes throughout `src/pages/EuAiActA4.tsx`:

| Element | Current | New mobile / md desktop |
|---------|---------|------------------------|
| Body text container | `text-sm md:text-[12px]` | `text-base md:text-[12px]` |
| SectionLabel | `text-xs md:text-[11px]` | `text-sm md:text-[11px]` |
| Header subtitle | `text-[11px] md:text-[9px]` | `text-xs md:text-[9px]` |
| Header description | `text-xs md:text-[11px]` | `text-sm md:text-[11px]` |
| Version label | `text-[11px] md:text-[9px]` | `text-xs md:text-[9px]` |
| Timeline dates | `text-xs md:text-[10px]` | `text-sm md:text-[10px]` |
| Timeline badges | `text-[10px] md:text-[8px]` | `text-xs md:text-[8px]` |
| Timeline labels | `text-[11px] md:text-[9px]` | `text-sm md:text-[9px]` |
| Timeline note | `text-[11px] md:text-[9px]` | `text-sm md:text-[9px]` |
| Risk card label | `text-[11px] md:text-[10px]` | `text-sm md:text-[10px]` |
| Risk card examples | `text-[11px] md:text-[9px]` | `text-sm md:text-[9px]` |
| High-risk subheads | `text-xs md:text-[10px]` | `text-sm md:text-[10px]` |
| Fine amounts | `text-sm md:text-[12px]` | `text-base md:text-[12px]` |
| Fine percentages | `text-[11px] md:text-[9px]` | `text-sm md:text-[9px]` |
| Fine descriptions | `text-xs md:text-[10px]` | `text-sm md:text-[10px]` |
| Footer text | `text-[11px] md:text-[9px]` | `text-sm md:text-[9px]` |
| Enforcement note | `text-[11px] md:text-[9px]` | `text-sm md:text-[9px]` |

Also increase risk category grid to `grid-cols-1 md:grid-cols-4` (stack on mobile for more room) and fines grid stays `grid-cols-1 sm:grid-cols-3`.

### Files
| File | Change |
|------|--------|
| `src/pages/EuAiActA4.tsx` | Bump all mobile font sizes as listed above |

No database changes.

