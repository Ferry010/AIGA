

## Plan: Update Kennisoverzichten cards

**What**: Remove the 2 "Sectoroverzicht" placeholder cards (Cards 2 & 3, lines 123-157) and add a new live card for the AI Begrippen glossary page.

### Edit: `src/pages/Kenniscentrum.tsx`

Replace lines 123-157 (the two Sectoroverzicht StaggerItems) with a single new card:

```tsx
{/* Card 2 — Begrippenlijst */}
<StaggerItem>
  <Link
    to="/kenniscentrum/ai-begrippen"
    className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 neon-glow transition-all duration-300 flex flex-col h-full"
  >
    <div className="p-6 flex flex-col flex-1 gap-3">
      <Badge variant="default" className="w-fit text-xs">Begrippenlijst</Badge>
      <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
        AI Begrippen: Glossarium EU AI Act
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Alle belangrijke begrippen uit de EU AI Act helder uitgelegd — van hoog-risico AI tot conformiteitsbeoordeling.
      </p>
      <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all pt-2">
        Bekijk begrippenlijst <ArrowRight size={16} />
      </span>
    </div>
  </Link>
</StaggerItem>
```

Result: 3 cards total (AI-tools overzicht, Begrippenlijst, EU AI Act in 1 A4) in the grid.

### Files affected
- `src/pages/Kenniscentrum.tsx` (replace lines 123-157)

