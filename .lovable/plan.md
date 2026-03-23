

## Plan: Hero-afbeelding upload voor artikelen

### Probleem
De artikelafbeeldingen verwijzen naar de oude WordPress-server (`aigeletterdheid.academy/wp-content/uploads/...`). Die URLs werken niet meer, waardoor alle hero-images verdwenen zijn.

### Oplossing
Een bestandsupload-functie toevoegen aan het admin-artikelformulier, met opslag in Lovable Cloud.

### Stappen

**1. Storage bucket aanmaken** (database migratie)
- Maak een publieke `article-images` bucket aan
- RLS-policies zodat admins kunnen uploaden en iedereen kan lezen

**2. Admin.tsx — Upload knop toevoegen**
- Vervang het kale "Afbeelding URL" tekstveld door een combinatie van:
  - **Upload knop** — bestand selecteren, uploaden naar `article-images` bucket, public URL automatisch invullen in `image_url`
  - **Preview** — kleine thumbnail van de huidige afbeelding
  - **Optioneel handmatig URL-veld** — voor het geval je een externe URL wilt plakken
- Na upload wordt de publieke URL opgeslagen in het bestaande `image_url` veld (geen DB-wijziging nodig)

**3. Bestaande afbeeldingen herstellen**
- De huidige WordPress-URLs in de database zijn gebroken. Na de upload-functie kun je per artikel een nieuwe afbeelding uploaden om ze te herstellen.

### Bestanden

| Actie | Bestand |
|-------|---------|
| Migratie | Storage bucket `article-images` + RLS policies |
| Edit | `src/pages/Admin.tsx` — upload component in artikelformulier |

