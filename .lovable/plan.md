

## Plan: Inbox backend, Slack notificaties en e-mail notificaties

### Overzicht
1. Contactformulier opslaan in een nieuwe `contact_submissions` tabel
2. Admin dashboard uitbreiden met aparte tabbladen voor Contact, Masterclass en Risicoscan
3. Edge function `notify-new-submission` die een Slack bericht stuurt naar #aiga-requests en een e-mail notificatie verstuurt
4. Alle drie formulieren (contact, masterclass, risicoscan) koppelen aan de notificatie-functie

### Stap 1: Database - `contact_submissions` tabel

Nieuwe migratie:
- Tabel `contact_submissions` met kolommen: `id`, `created_at`, `naam`, `organisatie`, `functie`, `email`, `telefoon`, `hulp`, `aantal`, `opmerkingen`, `opgevolgd` (default false)
- RLS: anon + authenticated INSERT, admin SELECT + UPDATE
- GRANT INSERT to anon

### Stap 2: Slack connector koppelen

De workspace heeft al een Slack connection (`std_01kk9jxm6her0vseehve2czgd4`). Deze moet aan het project gekoppeld worden via `standard_connectors--connect`.

### Stap 3: E-mail notificaties opzetten

E-mail domein checken en indien nodig opzetten. Daarna e-mail infrastructuur + transactional e-mail scaffolden. Template voor admin-notificatie bij nieuwe aanvraag.

### Stap 4: Edge function `notify-new-submission`

Nieuwe edge function die:
- Een Slack bericht stuurt via de connector gateway naar kanaal #aiga-requests
- Een e-mail notificatie stuurt naar een vast admin-adres (bijv. robbert@speakersacademy.nl)
- Body bevat: type (contact/masterclass/risicoscan), naam, organisatie, e-mail, timestamp

### Stap 5: Contact.tsx aanpassen

- Importeer supabase client + toast
- `handleSubmit`: insert in `contact_submissions`, daarna `supabase.functions.invoke('notify-new-submission')` aanroepen
- Success/error feedback met toast

### Stap 6: Masterclass.tsx aanpassen

Na succesvolle insert, ook `notify-new-submission` aanroepen met type "masterclass".

### Stap 7: Quiz.tsx aanpassen

Na succesvolle insert van risicoscan, ook `notify-new-submission` aanroepen met type "risicoscan".

### Stap 8: Admin.tsx uitbreiden

Rename "Submissions" tab naar "Risicoscan". Voeg twee nieuwe tabs toe:
- **Contact**: tabel met contact_submissions (datum, naam, organisatie, e-mail, hulp, aantal, opgevolgd checkbox)
- **Masterclass**: tabel met masterclass_submissions (datum, naam, organisatie, e-mail, sessie type, opgevolgd checkbox)

Masterclass tabel heeft nog geen `opgevolgd` kolom, dus een migratie toevoegen.

### Bestanden

| Actie | Bestand |
|-------|---------|
| Migratie | `contact_submissions` tabel + `masterclass_submissions` add `opgevolgd` kolom |
| Nieuw | `supabase/functions/notify-new-submission/index.ts` |
| Edit | `src/pages/Contact.tsx` - DB insert + notificatie |
| Edit | `src/pages/Masterclass.tsx` - notificatie toevoegen |
| Edit | `src/pages/Quiz.tsx` - notificatie toevoegen |
| Edit | `src/pages/Admin.tsx` - 3 extra tabs (contact, masterclass) |

### Technisch detail: Slack bericht format

Het bericht in #aiga-requests bevat:
```
Nieuwe [type] aanvraag
Naam: ...
Organisatie: ...
E-mail: ...
Datum: ...
```

