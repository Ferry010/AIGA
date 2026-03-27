

## Plan: Update deadlines page + unify gradient buttons

### 1. Update deadline statuses for March 2027

The current date is March 2027. The deadlines data needs updating:

| Deadline | Current label | New label | Active? |
|---|---|---|---|
| 2 feb 2025 | "Al van kracht" | "Al van kracht" | `true` |
| 2 aug 2025 | "Binnenkort" | "Al van kracht" | `true` |
| 2 aug 2026 | "In voorbereiding" | "Al van kracht" | `true` |
| 2 aug 2027 | "Volledige handhaving" | "Binnenkort" | `false` |

File: `src/pages/AiActDeadlines.tsx` — update the `deadlines` array labels and `active` flags.

### 2. Unify all gradient buttons to purple→pink

The homepage hero uses `btn-neon` class (defined in `index.css`), which produces a purple→pink gradient. Other pages incorrectly use `bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(330,80%,55%)]` — this starts from teal (`--primary`) instead of purple.

Replace all instances of `bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(330,80%,55%)]` with `btn-neon` across these files:

- `src/pages/AiActDeadlines.tsx` (1 button)
- `src/pages/BeleidstemplateLanding.tsx` (1 button)
- `src/pages/ChecklistLanding.tsx` (1 button)
- `src/pages/Downloads.tsx` (1 button)
- `src/components/DownloadLeadDialog.tsx` (2 buttons)
- `src/components/ShareDocumentButton.tsx` (1 button)

The Boetecalculator already uses `neon-purple`→`neon-pink` so that's correct.

For `<Button>` components using `btn-neon`, add the class and remove conflicting Tailwind bg/text classes. The `btn-neon` class already sets `background`, `color: white`, `font-weight: 600`, hover effects, and shadow.

