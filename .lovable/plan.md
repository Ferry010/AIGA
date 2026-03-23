

## Plan: Blog labels en filterfunctie verbeteren

### Huidige situatie
- Artikelen hebben één `category` veld (bijv. "Wetten en regels")
- Kenniscentrum toont die category als badge en filtert erop
- Dit werkt correct, maar er is geen mogelijkheid om meerdere labels toe te kennen

### Wat verandert

**1. Database: `labels` kolom toevoegen aan `articles`**
- Nieuw veld: `labels text[] default '{}'` — een array van tags
- Geen nieuwe tabel nodig, een simpele text-array volstaat

**2. Admin: Labels beheren per artikel**
- Voeg een "Labels" veld toe aan het artikelformulier
- Input met chips: typ een label, druk Enter, label verschijnt als badge
- Klikbaar kruisje om labels te verwijderen
- Voorgestelde labels uit bestaande labels in de database (autocomplete)

**3. Kenniscentrum: Labels tonen en filteren**
- Toon labels als kleine badges onder de category-badge op elke artikelkaart
- Voeg een extra filterrij toe onder de category-filters met alle unieke labels
- Filteren op label werkt naast het bestaande category-filter (AND-logica)

### Bestanden

| Actie | Bestand |
|-------|---------|
| Migratie | `labels text[] default '{}'` kolom toevoegen aan `articles` |
| Edit | `src/pages/Admin.tsx` — labels input in artikelformulier |
| Edit | `src/pages/Kenniscentrum.tsx` — labels tonen + filteroptie |

