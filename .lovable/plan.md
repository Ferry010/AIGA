

## Plan: Nieuwe pagina /speakers-academy

### Wat wordt er gebouwd
Een nieuwe landingspagina met 6 secties die de samenwerking tussen Speakers Academy en AIGA toelicht. Plus navigatie- en routing-updates.

### Bestanden

| Actie | Bestand |
|-------|---------|
| Nieuw | `src/pages/SpeakersAcademy.tsx` |
| Edit | `src/App.tsx` — route toevoegen |
| Edit | `src/components/Navbar.tsx` — navlink toevoegen na "Over AIGA" |
| Edit | `src/components/Footer.tsx` — footerlink toevoegen |

### Pagina-structuur (SpeakersAcademy.tsx)

Hergebruikt: `AnimatedSection`, `StaggerContainer`, `StaggerItem`, `SectionLabel`, `BreadcrumbNav`, `SEO`, `speakersLogo`, `ferryImg`.

**Sectie 1: Hero**
- SectionLabel "EEN SAMENWERKING"
- H1: "Van inspiratie naar actie."
- H2 (text-primary): "Gebouwd op 30 jaar sprekerservaring. Gericht op jouw team."
- Body paragraaf over Speakers Academy + AIGA
- Twee CTA's: "Bekijk de training" (btn-neon, /training) + "Spreek Ferry als keynote spreker" (btn-neon-outline, extern speakersacademy.com/nl/spreker/ferry-hoes, target _blank)

**Sectie 2: Partner**
- SectionLabel "DE PARTNER", H2: "30 jaar kennis aan het podium."
- Tekst over Speakers Academy historie + Ferry
- Speakers Academy logo (65px, zelfde als footer/homepage)

**Sectie 3: Waarom een training**
- SectionLabel "DE LOGICA", H2: "Bewustwording is het begin. Kennis is het fundament."
- Drie alinea's:
  1. Keynote opent ogen, maar bewustwording alleen volstaat niet voor AI Act artikel 4
  2. Ferry heeft naast zijn sprekerwerk de AIGA training ontwikkeld met modules, cases, examen en certificaat
  3. Resultaat: compliant, bekwaam en voorbereid
- Geen em-dashes, geen tabel

**Sectie 4: Ferry**
- SectionLabel "DE TRAINER", H2: "Dezelfde expert. Nu in jouw organisatie."
- Bio tekst + 3 stat-blokjes (zelfde stijl als TrainerSection: neon-text val, border card)
  - "40+" keynotes per jaar
  - "15+" jaar ervaring  
  - "2020" winnaar AI Hackathon
- Twee testimonials in kaart-stijl (quote mark, pull quote, full quote, naam/bedrijf):
  - Laurens Baars, ATOS: "Heel fijn hoe Ferry ook voor niet-technische collega's het onderwerp toegankelijk maakt."
  - Maud, Chubb Fire & Security: hergebruik bestaande testimonial data uit TrainerSection

**Sectie 5: Twee opties**
- SectionLabel "KIES JE STARTPUNT"
- Grid 2 kolommen:
  - Kaart 1 (outline-stijl): "Ferry boeken als spreker", subtekst, btn-neon-outline extern link
  - Kaart 2 (neon-border-lg featured): "Team certificeren via AIGA", subtekst, btn-neon link /training
- Banner eronder: bg-muted/50, "Allebei? Vraag naar de mogelijkheden." + "Neem contact op" btn-neon-outline link /contact

**Sectie 6: Footer CTA**
- py-28, text-center (zelfde als Index final CTA)
- H2: "Klaar om de volgende stap te zetten?"
- Twee knoppen: "Bekijk de AIGA training" (btn-neon, /training) + "Boek Ferry als spreker" (btn-neon-outline, extern)

### Navigatie-updates
- **Navbar**: `{ to: "/speakers-academy", label: "Speakers Academy" }` na "Over AIGA" in navLinks array
- **Footer**: link toevoegen in footerLinks array
- **App.tsx**: `<Route path="/speakers-academy" element={<SpeakersAcademy />} />` + import

### Content-regels
- Geen em-dashes (gebruik komma's of dubbele punten)
- Nederlands, zakelijke toon

