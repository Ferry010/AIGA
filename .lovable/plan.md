

## Plan: HubSpot-achtige unified inbox

### Wat verandert
De drie aparte tabbladen (Contact, Masterclass, Risicoscan) worden vervangen door één **Inbox** tab met een chronologische lijst van alle inzendingen. Elke inzending krijgt een kleur-label dat aangeeft waar hij vandaan komt.

### Ontwerp

```text
┌─────────────────────────────────────────────────┐
│  Inbox (6)  │  Artikelen  │  Gebruikers  │ ...  │
├─────────────────────────────────────────────────┤
│  Filter: [Alle] [Contact] [Masterclass] [Scan]  │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │ 🟣 Contact  ·  23-03-2026               │    │
│  │ Ferry de Boer — BrandHumanizing          │    │
│  │ ferry@brand... · Training · 2-49 seats   │    │
│  │ □ Opgevolgd                              │    │
│  ├──────────────────────────────────────────┤    │
│  │ 🔵 Masterclass  ·  22-03-2026            │    │
│  │ Jan Jansen — Acme BV                     │    │
│  │ jan@acme.nl · Keynote                    │    │
│  │ □ Opgevolgd                              │    │
│  ├──────────────────────────────────────────┤    │
│  │ 🟠 Risicoscan  ·  21-03-2026             │    │
│  │ Piet Pietersen — Corp NL                 │    │
│  │ piet@corp.nl · Score: 72% · Hoog risico  │    │
│  │ ☑ Opgevolgd                              │    │
│  └──────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

### Stappen

**1. Refactor Admin.tsx — Inbox tab**
- Merge alle drie submission arrays in één gesorteerde lijst (op `created_at` desc)
- Elk item krijgt een `type` property: `"contact"` / `"masterclass"` / `"risicoscan"`
- Render als kaarten (niet als tabel), met:
  - **Kleur-label/badge** bovenaan (paars = Contact, blauw = Masterclass, oranje = Risicoscan)
  - Naam, organisatie/bedrijfsnaam, e-mail
  - Type-specifieke details (hulp/aantal voor contact, sessie_type voor masterclass, score/tier voor risicoscan)
  - Datum rechts bovenin
  - Opgevold checkbox
- **Filterknoppen** bovenaan: Alle, Contact, Masterclass, Risicoscan — met badge-counter per type
- Standaard filter: alleen niet-opgevolgde items (toggle om alles te tonen)

**2. Verwijder oude tabs**
- Verwijder de aparte Contact, Masterclass en Risicoscan `TabsContent` secties
- Vervang door één "Inbox" tab

**3. Click-to-expand detail**
- Klikken op een kaart toont extra details (opmerkingen, vragen, dimensie_scores) in een uitklapbaar paneel

### Bestanden
| Actie | Bestand |
|-------|---------|
| Edit | `src/pages/Admin.tsx` — Inbox refactor |

Geen database wijzigingen nodig.

