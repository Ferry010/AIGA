

# Boilerplate verwijderen uit gescrapete artikelen

## Probleem
De scraper haalt de volledige pagina-inhoud op, inclusief herhalende boilerplate-secties die op elke artikelpagina staan:
- "Meer weten over...? Lees ook:" cross-links
- "Over de auteur" bio-blok (soms dubbel)
- "Klaar om AI-Geletterd te worden?" CTA-formulier
- "Waarom bij ons?" sectie
- Ferry's LinkedIn-foto en -link

## Aanpak

### Scraper aanpassen (`supabase/functions/scrape-article/index.ts`)

Voeg een `stripBoilerplate` functie toe die na de markdown-conversie draait en deze patronen verwijdert:

1. **"Over de auteur"** blokken — alles vanaf `### Over de auteur` tot het volgende `##` heading of einde tekst
2. **"Meer weten" / "Lees ook"** blokken — regels met `Meer weten over` + daaropvolgende `👉` links en tussentekst, tot een lege regel of heading
3. **"Klaar om AI-Geletterd te worden?"** — alles vanaf die heading tot het volgende `##` of einde
4. **"Waarom bij ons?"** — idem
5. **Ferry's auteursfoto** — inline images van `wp-content/uploads/2020/08/1748602831893.jpeg`
6. **Resterende CTA-tekst** — "Verstuur", "Bedankt voor uw verzoek", "Er ging iets fout" en `×` karakters

Dit zijn regex-patronen op de al-geconverteerde markdown string, uitgevoerd als laatste stap voor opslaan.

### Bestaande artikelen opschonen

Na deploy moet de gebruiker opnieuw "Importeer alles" klikken om de content te verversen met de schone versie.

## Bestanden
- `supabase/functions/scrape-article/index.ts` — toevoegen `stripBoilerplate()` functie, aanroepen na `htmlToMarkdown()`

