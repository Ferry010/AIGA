import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import ferryImg from "@/assets/ferry-hoes.gif";
import SEO from "@/components/SEO";
import { MkbRiskTable, MkbComparisonTable, MkbStepTracker, MkbFaqAccordion, MkbCtaBanner, MkbLeesOok } from "@/components/MkbArticleComponents";

interface Article {
  id: string;
  title: string;
  category: string;
  url: string;
  image_url: string;
  content: string | null;
  slug: string | null;
  sort_order: number | null;
  created_at: string | null;
  updated_at: string | null;
  published_date: string | null;
  read_time_minutes: number | null;
  meta_description: string | null;
  seo_keywords: string | null;
  h1_override: string | null;
}

interface AdjacentArticle {
  title: string;
  slug: string | null;
  category: string;
  image_url: string;
}

function stripLeadingTitle(content: string, title: string): string {
  const titleNorm = title.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
  return content.replace(/^\s*#\s+\*{0,2}([^*\n]+)\*{0,2}\s*\n*/m, (match, heading) => {
    const headingNorm = heading.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    if (headingNorm === titleNorm || titleNorm.includes(headingNorm) || headingNorm.includes(titleNorm)) return "";
    return match;
  });
}

function extractH2Headings(content: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const regex = /^##\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[1].replace(/\*\*/g, "").trim();
    const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
    headings.push({ id, text });
  }
  return headings;
}

const FERRY_BIO = "Ferry Hoes is veelgevraagd spreker en trainer op het gebied van AI-geletterdheid. Hij staat meermaals per maand op het podium voor organisaties zoals a.s.r., VodafoneZiggo en verschillende ministeries. In 2020 won hij de Anti-Discriminatie AI-Hackathon van de Nederlandse overheid.";

const ARTICLE_CTAS: Record<string, { href: string; text: string }[]> = {
  "ai-act-compliance-checklist-kleine-bedrijven": [
    { href: "/tools/downloads/ai-act-compliance-checklist", text: "Download de gratis AI Act Compliance Checklist →" },
  ],
  "documentatie-eisen-eu-ai-act": [
    { href: "/tools/downloads/ai-act-compliance-checklist", text: "Download de gratis AI Act Compliance Checklist →" },
  ],
  "eu-ai-act-uitgelegd": [
    { href: "/gereedheidscan", text: "Doe de gratis AI Gereedheidscan →" },
    { href: "/ai-act-deadlines", text: "Bekijk alle AI Act deadlines →" },
  ],
  "eu-ai-act-boetes-maximale-bedragen": [
    { href: "/tools/boetecalculator", text: "Bereken jouw boeterisico →" },
  ],
  "ai-geletterdheid-voor-leiders": [
    { href: "/masterclass", text: "Bekijk de Masterclass voor leidinggevenden →" },
  ],
  "wat-is-ai-geletterdheid": [
    { href: "/training", text: "Bekijk de AI Geletterdheid Training →" },
  ],
  "ai-geletterdheidsplicht-zo-voldoe-je-in-5-stappen-aiga": [
    { href: "/training", text: "Bekijk de AI Geletterdheid Training →" },
  ],
  "ai-geletterdheid-training-vergelijken-hoe-kies-je-de-juiste": [
    { href: "/training", text: "Bekijk de AI Geletterdheid Training →" },
  ],
  "ai-act-per-sector-zorg-welzijn": [
    { href: "/gereedheidscan", text: "Doe de gratis AI Gereedheidscan →" },
    { href: "/training", text: "Bekijk de AI Geletterdheid Training →" },
  ],
  "ai-geletterdheidsplicht-voor-het-mkb-de-complete-gids-2026": [
    { href: "/gereedheidscan", text: "Doe de gratis AI Gereedheidscan →" },
    { href: "/training", text: "Bekijk de AI Geletterdheid Training →" },
    { href: "/tools/downloads/ai-act-compliance-checklist", text: "Download de AI Act Compliance Checklist →" },
  ],
};

const FALLBACK_IMAGE = "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png";

const EU_AI_ACT_SOURCES = [
  { label: "EUR-Lex — EU AI Act (Verordening 2024/1689)", url: "https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:32024R1689" },
  { label: "Rijksoverheid.nl — Kunstmatige Intelligentie", url: "https://www.rijksoverheid.nl/onderwerpen/kunstmatige-intelligentie-ai" },
  { label: "European Commission — AI Act", url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" },
];

const WAT_IS_FAQ = [
  { q: "Wat zijn voorbeelden van AI-geletterdheid?", a: "Voorbeelden van AI-geletterdheid zijn: een HR-medewerker die weet dat het recruitmentplatform AI gebruikt om cv's te rangschikken en dat resultaat kritisch beoordeelt in plaats van blindelings overneemt; een marketeer die ChatGPT gebruikt voor contentteksten maar de feiten altijd zelf verifieert; een manager die bij de aanschaf van nieuwe software vraagt of het AI-componenten bevat en welk risiconiveau die hebben; en een directeur die zijn team heeft laten certificeren zodat de organisatie bij een audit bewijs kan overleggen." },
  { q: "Wat is het stappenplan voor AI-geletterdheid?", a: "Het stappenplan voor AI-geletterdheid bestaat uit zes stappen: 1) inventariseer welke AI-systemen en -tools je organisatie gebruikt; 2) bepaal per functiegroep welk kennisniveau nodig is; 3) kies een geschikte trainingsvorm (online, live of gecombineerd); 4) laat medewerkers trainen en certificeren, en leg dit vast in je HR-systeem; 5) verwerk AI-geletterdheid in je beleid, onboarding en inkoopproces; 6) herhaal jaarlijks en actualiseer op basis van nieuwe wetgeving." },
  { q: "Welke 4 dimensies van AI-geletterdheid zijn er?", a: "De vier kerngebieden van AI-geletterdheid zijn: (1) kennis: begrijpen wat AI is en hoe het werkt; (2) vaardigheden: AI-tools effectief en verantwoord kunnen inzetten in je werk; (3) ethiek: AI-gerelateerde dilemma's herkennen en verantwoorde keuzes kunnen maken; en (4) wetgeving: weten welke regels gelden, met name de EU AI Act en de verplichtingen die die oplegt aan jouw organisatie." },
  { q: "Hoe kan ik een AI-geletterdheid certificaat halen?", a: "Je kunt een AI-geletterdheid certificaat halen via een erkende online training zoals die van AIGA. Je volgt de training zelfstandig in eigen tempo (2-3 uur), maakt een adaptief examen, en ontvangt direct het AI Literacy Practitioner certificaat. Dit certificaat is digitaal ondertekend, deelbaar via LinkedIn en geldig als bewijs bij een audit in het kader van de EU AI Act." },
  { q: "Is AI-geletterdheid wettelijk verplicht?", a: "Ja. Artikel 4 van de EU AI Act, die op 2 februari 2025 van kracht werd, verplicht alle aanbieders en gebruiksverantwoordelijken van AI-systemen om te zorgen voor een toereikend niveau van AI-geletterdheid bij hun personeel. Actieve handhaving door de Autoriteit Persoonsgegevens is gestart per augustus 2025. Boetes kunnen oplopen tot 35 miljoen euro of 7% van de jaaromzet." },
  { q: "Wat is het verschil tussen AI-geletterdheid en digitale geletterdheid?", a: "Digitale geletterdheid gaat over het kunnen omgaan met digitale tools in het algemeen. AI-geletterdheid is specifieker: het gaat over het begrijpen van hoe AI-systemen werken, welke risico's ze meebrengen, en hoe je ze verantwoord inzet. AI-geletterdheid is een verdieping van digitale geletterdheid, specifiek gericht op de toenemende aanwezigheid van AI in werkprocessen." },
  { q: "Voor wie geldt de AI-geletterdheidsplicht?", a: "De AI-geletterdheidsplicht geldt voor alle organisaties die AI-systemen aanbieden of gebruiken. In de praktijk valt vrijwel iedere Nederlandse organisatie hieronder: ook het gebruik van ChatGPT, Microsoft Copilot, AI-functies in CRM- of HR-systemen, of een geautomatiseerde chatbot maakt van jouw organisatie een gebruiksverantwoordelijke in de zin van de AI Act." },
];

const BOETES_FAQ = [
  { q: "Wat zijn de maximale boetes onder de EU AI Act?", a: "De maximale boete is €35.000.000 of 7% van de wereldwijde jaaromzet voor het gebruik van verboden AI-praktijken. Voor niet-naleving van verplichtingen voor hoog-risico AI geldt een maximum van €15.000.000 of 3% van de omzet." },
  { q: "Wanneer worden AI Act boetes opgelegd in Nederland?", a: "De Autoriteit Persoonsgegevens handhaaft actief vanaf augustus 2025. De verboden AI-praktijken zijn al van kracht sinds februari 2025." },
  { q: "Geldt de boete ook voor kleine bedrijven?", a: "Ja, maar voor MKB en startups geldt Artikel 99 lid 6: de boete is het laagste van het percentage of het vaste bedrag. Voor een klein bedrijf is dat vaak aanzienlijk minder dan de nominale maximum bedragen." },
  { q: "Wat is de boete voor het niet trainen van medewerkers in AI-geletterdheid?", a: "Artikel 4 heeft geen eigen boetebedrag, maar niet-naleving valt onder de algemene deployer-verplichtingen van Categorie 2: maximaal €15.000.000 of 3% van de omzet." },
  { q: "Hoe bereken ik mijn boeterisico onder de EU AI Act?", a: "Gebruik de gratis AIGA Boetecalculator op aigeletterdheid.academy/tools/boetecalculator. De calculator combineert jouw organisatieprofiel, de tools die je gebruikt en jouw huidige compliancestatus." },
];

const VIJF_STAPPEN_FAQ = [
  { q: "Geldt de AI-geletterdheidsplicht voor alle medewerkers?", a: "De plicht geldt voor alle medewerkers die betrokken zijn bij het gebruik of de inzet van AI-systemen. Dat is in de meeste organisaties breder dan je denkt: ook HR-medewerkers die een AI-tool gebruiken voor roostering, marketeers die AI-gegenereerde teksten publiceren of managers die op basis van AI-dashboards besluiten nemen, vallen eronder. Medewerkers zonder enige AI-aanraking zijn uitgezonderd." },
  { q: "Welk certificaat wordt erkend als bewijs?", a: "De wet schrijft geen specifiek certificaat voor. Wat telt is dat de training aantoonbaar aansluit bij de rol en het risiconiveau van de medewerker, en dat deelname gedocumenteerd is. Het AIGA-certificaat is gebaseerd op de officiële tekst van de EU AI Act en dekt de kerncompetenties die de AP als relevant beschouwt." },
  { q: "Hoe vaak moet je medewerkers hertrainen?", a: "De wet schrijft geen vaste frequentie voor, maar gezien de snelheid waarmee AI-toepassingen zich ontwikkelen is een jaarlijkse herhaling de best verdedigbare aanpak. Bij de introductie van nieuwe AI-systemen of bij een significante verandering in gebruik is een tussentijdse update aan te raden." },
];

const ZORG_FAQ = [
  { q: "Geldt de EU AI Act ook voor ziekenhuizen en zorginstellingen, of alleen voor techbedrijven die AI maken?", a: "De AI Act geldt uitdrukkelijk voor iedereen die AI-systemen gebruikt, niet alleen voor de bedrijven die ze ontwikkelen. Zorginstellingen vallen in de categorie \"deployers\": organisaties die AI-systemen van externe aanbieders inzetten in hun eigen processen. Als deployer heb je eigen verplichtingen onder de wet, ongeacht of je de software zelf hebt gemaakt. Het feit dat je een systeem inkoopt bij een medtech-bedrijf of zorgsoft­wareleverancier, ontslaat je niet van verantwoordelijkheid voor hoe je dat systeem gebruikt, wie er toezicht op houdt en of je medewerkers weten hoe het werkt." },
  { q: "Welke AI-systemen in de zorg vallen onder \"hoog risico\"?", a: "Bijlage III van de AI Act somt de hoog-risico categorieën op. Voor de zorgsector zijn twee categorieën direct relevant. De eerste is AI ingezet als medisch hulpmiddel of voor veiligheid in kritieke infrastructuur. Systemen die helpen bij diagnose, triage, behandeladvies of monitoring vallen hier doorgaans onder als hun uitkomst direct invloed heeft op een klinische beslissing. De tweede categorie betreft toegang tot essentiële diensten. AI die bepaalt welke zorg iemand krijgt, welke prioriteit iemand heeft op een wachtlijst of welke behandeling wordt aanbevolen, valt hieronder. Concrete voorbeelden: radiologie-AI die afwijkingen detecteert, sepsis-voorspellingsmodellen, AI-triagesystemen op de SEH, systemen die suïciderisico inschatten in de GGZ, en AI die thuiszorgplanningen maakt op basis van patiëntprofielen. Een vuistregel: als een AI-systeem een aanbeveling of beslissing produceert die direct invloed heeft op de gezondheid, veiligheid of toegang tot zorg van een patiënt, is er vrijwel altijd sprake van hoog-risico AI." },
  { q: "Ons systeem heeft al een CE-markering als medisch hulpmiddel (MDR). Zijn we dan automatisch compliant met de AI Act?", a: "Nee. De CE-markering onder de Medical Device Regulation (MDR) dekt niet de deployer-verplichtingen van de AI Act. Wat de MDR regelt, is of het product zelf veilig en effectief is als medisch hulpmiddel. Wat de AI Act aanvullend regelt, is hoe jouw organisatie dat systeem gebruikt: of er menselijk toezicht is ingericht, of er logging plaatsvindt, of je medewerkers weten hoe het systeem werkt en wanneer ze er niet op moeten vertrouwen, en of je incidenten kunt melden. Een MDR-gecertificeerd systeem dat door ongeoefende medewerkers zonder toezichtsstructuur wordt gebruikt, voldoet niet aan de AI Act. Beide wetgevingen zijn van toepassing naast elkaar." },
  { q: "Moet een arts altijd de uiteindelijke beslissing nemen als AI een aanbeveling geeft?", a: "De AI Act vereist \"betekenisvol menselijk toezicht\" bij hoog-risico AI. Dat betekent niet per definitie dat een arts elke uitkomst handmatig moet goedkeuren, maar het betekent wel dat er altijd een bevoegde persoon moet zijn die de AI-uitkomst kan begrijpen, kan betwisten en kan overrulen. In de praktijk houdt dit in: de zorgprofessional die werkt met het hoog-risico AI-systeem moet voldoende kennis hebben om te beoordelen of de aanbeveling betrouwbaar is in de specifieke klinische context. Een radioloog die AI-detectie gebruikt, moet kunnen inschatten wanneer het systeem mogelijk een fout maakt. Een verpleegkundige die een sepsis-model gebruikt, moet weten bij welke patiëntgroepen het model minder betrouwbaar is. Volledig geautomatiseerde beslissingen zonder menselijke tussenkomst, waarbij een patiënt een behandeling krijgt of niet krijgt puur op basis van AI-uitkomst, zijn niet toegestaan voor hoog-risico toepassingen." },
  { q: "Geldt de AI Act ook voor AI-tools die we intern gebruiken, zoals planningssoftware of administratieve AI?", a: "Dat hangt af van het doel van de tool. Puur administratieve AI, een systeem dat facturen verwerkt, roosters optimaliseert zonder patiëntprioritering, of HR-correspondentie genereert, valt doorgaans niet in de hoog-risico categorie. Zodra AI echter betrokken is bij beslissingen over patiënten, wie welke zorg krijgt, welke prioriteit iemand heeft, welke medewerker bij welke patiënt wordt ingezet op basis van patiëntkenmerken, wordt de grens met hoog-risico snel bereikt. Thuiszorgplanningssoftware die op basis van patiëntprofielen bepaalt wie hoeveel zorg krijgt, valt vrijwel zeker in de hoog-risico categorie. Vraag bij twijfel de leverancier om een conformiteitsbeoordeling en check of het systeem in Bijlage III valt." },
  { q: "Onze GGZ-instelling gebruikt een risico-inschattingstool voor suïcidepreventie. Wat zijn onze verplichtingen?", a: "Dit is een van de meest gevoelige toepassingen van AI in de zorg, en de verplichtingen zijn navenant zwaar. Een AI-systeem dat suïciderisico inschat valt zonder meer onder hoog-risico. De verplichtingen als deployer zijn: aantoonbaar menselijk toezicht door een bevoegde zorgprofessional, logging van alle relevante aanbevelingen, training van alle medewerkers die met het systeem werken, en een meldstructuur voor incidenten. Aanvullend zijn er ethische overwegingen die de wet niet volledig dekt maar die in de GGZ zwaar wegen: de patiënt moet in beginsel weten dat AI wordt ingezet bij de risico-inschatting. Transparantie naar de patiënt is ook een verplichting die de AI Act stelt voor systemen die beslissingen over individuen nemen, ook in de zorg." },
  { q: "Wat moeten onze verpleegkundigen en zorgprofessionals weten over AI? En hoe toon ik dat aan bij een audit?", a: "Artikel 4 van de AI Act verplicht zorginstellingen om \"passende maatregelen\" te nemen voor AI-geletterdheid bij medewerkers die met AI-systemen werken. In de zorg betekent dat: begrijpen hoe het AI-systeem werkt, welke data het gebruikt, wat de bekende beperkingen en risico's zijn, en wanneer de uitkomst niet betrouwbaar is. Dat niveau van kennis verschilt per functie. Een radioloog die AI-detectie gebruikt heeft andere kennis nodig dan een SEH-verpleegkundige die een triagesysteem hanteert. De training moet aansluiten op de specifieke tool en de klinische context. Bij een audit, door de Autoriteit Persoonsgegevens, de IGJ of een interne auditcommissie, zijn dit de sterkste bewijselementen: een individueel certificaat per medewerker, een overzicht van wie welke training heeft gevolgd, documentatie waaruit blijkt dat de training aansloot op de gebruikte AI-systemen, en bewijs van periodieke herhaling." },
  { q: "Hoe verhoudt de AI Act zich tot de AVG bij gebruik van patiëntdata in AI-systemen?", a: "De AI Act en de AVG vullen elkaar aan maar overlappen niet volledig. De AVG regelt hoe je persoonsgegevens verwerkt: de rechtmatigheid, de doelbinding, de beveiliging. De AI Act regelt hoe AI-systemen worden ontworpen, ingezet en gecontroleerd. Als een AI-systeem patiëntdata verwerkt, en dat doen vrijwel alle medische AI-systemen, gelden beide wetgevingen tegelijk. Gezondheidsdata is bijzondere persoonsdata onder de AVG, waarvoor striktere regels gelden. Een Data Protection Impact Assessment (DPIA) die al verplicht is onder de AVG voor verwerkingen met hoog risico, overlapt sterk met de risicobeoordelingsverplichting onder de AI Act. De slimste aanpak: integreer de AVG-compliance en de AI Act-compliance in één documentatieprocedure. Dat voorkomt dubbel werk en geeft een sterker totaalplaatje bij een audit." },
  { q: "Welke incidenten moeten we melden en bij wie?", a: "De AI Act verplicht deployers van hoog-risico AI om ernstige incidenten te melden bij de aanbieder (leverancier) van het systeem. De aanbieder is vervolgens verantwoordelijk voor melding bij de nationale markttoezichthouder. In de zorg overlapt dit met bestaande meldverplichtingen. Ernstige incidenten met medische hulpmiddelen, en een hoog-risico AI-systeem dat als medisch hulpmiddel is gecertificeerd valt hieronder, moeten worden gemeld bij de IGJ via het meldportaal voor Medische Technologie. Incidenten waarbij persoonsgegevens zijn betrokken, vereisen mogelijk ook een datalek-melding bij de Autoriteit Persoonsgegevens binnen 72 uur. Wat telt als een ernstig incident? Een situatie waarbij het AI-systeem een aanbeveling heeft gegeven die heeft geleid of had kunnen leiden tot ernstig nadeel voor een patiënt. Denk aan een gemiste diagnose waarbij het AI-systeem als enige bron is gebruikt, of een onjuiste triagering met klinische gevolgen." },
  { q: "We werken met een extern softwarebedrijf dat AI levert. Wie is verantwoordelijk: wij of zij?", a: "Beide partijen hebben eigen verantwoordelijkheden, maar ze zijn anders van aard. De aanbieder (het softwarebedrijf) is verantwoordelijk voor de conformiteit van het systeem zelf: de technische documentatie, de conformiteitsbeoordeling, de CE-markering en de instructies voor gebruik. Zij moeten kunnen aantonen dat het systeem voldoet aan de eisen voor hoog-risico AI. Jij als deployer (de zorginstelling) bent verantwoordelijk voor hoe je het systeem gebruikt: het inrichten van menselijk toezicht, de training van medewerkers, de logging, de incidentmelding en het naleven van de gebruiksinstructies van de aanbieder. Als de aanbieder jou onvoldoende informatie geeft om aan jouw deployer-verplichtingen te voldoen, heb je het recht, en deels de plicht, om die informatie op te vragen. Leg afspraken over compliance vast in contracten. Een leverancier die geen conformiteitsverklaring kan overleggen voor een hoog-risico AI-systeem, is zelf in overtreding." },
  { q: "Wat zijn de risico's als we niets doen?", a: "De AI Act wordt gehandhaafd door de Autoriteit Persoonsgegevens als coördinerend nationaal toezichthouder, met aanvullend toezicht van de IGJ voor zorgspecifieke toepassingen. De handhaving bouwt stapsgewijs op: sinds februari 2025 gelden de verplichtingen rondom verboden AI en AI-geletterdheid al; vanaf augustus 2026 geldt de volledige wet inclusief alle deployer-verplichtingen voor hoog-risico AI. De maximale boete voor het niet naleven van verplichtingen als deployer van hoog-risico AI bedraagt 15.000.000 euro of 3% van de wereldwijde jaaromzet. Maar naast boetes zijn er andere risico's die voor zorginstellingen minstens zo zwaar wegen: reputatieschade bij patiënten en zorgprofessionals, gedwongen stillegging van een systeem tijdens een handhavingstraject, en aansprakelijkheid als een patiënt schade heeft geleden door een AI-systeem dat niet aan de wet voldeed. Zorginstellingen die nu actief aan de slag gaan, met een AI-inventarisatie, een toezichtsstructuur en gecertificeerde AI-geletterdheid voor medewerkers, staan aanzienlijk sterker dan instellingen die wachten." },
  { q: "Waar begin ik als zorginstelling die nu nog niets heeft geregeld?", a: "Begin met drie concrete stappen. Inventariseer eerst alle AI-systemen die je organisatie gebruikt, per afdeling. Vraag leveranciers of hun systeem is aangemerkt als hoog-risico AI onder de EU AI Act en of er een conformiteitsverklaring beschikbaar is. Zorg vervolgens dat alle medewerkers die met AI-systemen werken aantoonbaar AI-geletterd zijn. Dit is de verplichting die al geldt en die bij een audit als eerste wordt beoordeeld. Een certificaat per medewerker is het sterkste bewijs. Documenteer daarna je toezichtsstructuur. Wie is verantwoordelijk voor menselijk toezicht op welk systeem? Hoe worden AI-uitkomsten gelogd? Hoe meld je een incident? Dat hoeft geen uitgebreid beleidsdocument te zijn: een helder overzicht per systeem volstaat als startpunt. Doe de AI Gereedheidscan om in drie minuten te zien hoe jouw instelling er nu voor staat op vijf dimensies: AI-gebruik, wetgeving, risicobeheer, leiderschap en audit-readiness." },
];

const ZORG_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ZORG_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const TRAINING_VERGELIJKEN_FAQ = [
  { q: "Wat moet een AI-geletterdheid training bevatten om te voldoen aan de EU AI Act?", a: "Een training die voldoet aan artikel 4 van de EU AI-verordening behandelt minimaal: hoe AI werkt op basisniveau, de kansen en risico's van AI in de werkcontext, ethische en juridische verantwoordelijkheden, en verantwoord gebruik in de dagelijkse praktijk. Een algemene AI-cursus die alleen tools uitlegt voldoet hier niet aan. De training moet aantoonbaar afgestemd zijn op de rol en het risiconiveau van de medewerker." },
  { q: "Hoe bewijs ik als organisatie dat mijn medewerkers AI-geletterd zijn?", a: "Met individueel bewijs van deelname per medewerker. Een groepssessie waarbij niemand individueel geregistreerd staat, levert bij een handhavingscontrole niets op. Elke medewerker die met AI werkt — inclusief wie ChatGPT of Copilot gebruikt — moet aantoonbaar de training hebben gevolgd. Zorg dat de aanbieder per persoon een bewijs van deelname uitgeeft en dat jij als organisatie de deelname kunt registreren." },
  { q: "Geldt de AI-geletterdheidsplicht alleen voor technische medewerkers?", a: "Nee. Artikel 4 van de EU AI-verordening geldt voor iedereen die met AI in aanraking komt. Dat zijn ook medewerkers die sociale media advertenties beheren, AI-schrijftools gebruiken of werken met tools als Copilot in Microsoft 365. In de meeste organisaties betekent dat: vrijwel het volledige personeelsbestand." },
  { q: "Wat kost een AI-geletterdheid training per medewerker?", a: "Dat verschilt sterk per aanbieder en format. Klassikale trainingen op locatie kosten al snel €300 tot €500 per persoon, exclusief reistijd en locatiekosten. Bij grotere teams loopt dat snel op naar tienduizenden euro's. Online trainingen zijn doorgaans schaalbaar tegen een vast tarief per seat — wat voor organisaties met meerdere tientallen medewerkers aanzienlijk goedkoper uitpakt." },
  { q: "Wanneer moet mijn organisatie voldoen aan de AI-geletterdheidsplicht?", a: "De verplichting geldt al sinds februari 2025, maar de actieve handhaving start in augustus 2026. Dat klinkt als ruimte, maar organisaties die wachten tot juni of juli lopen het risico niet op tijd alle medewerkers gecertificeerd te hebben. Zeker bij grotere teams is vroeg starten geen luxe." },
  { q: "Wordt de inhoud van AI-geletterdheid trainingen bijgehouden als de regelgeving verandert?", a: "Dat hangt af van de aanbieder — en het is een cruciale vraag om te stellen. De EU AI Act wordt doorlopend aangescherpt met nieuwe richtlijnen vanuit de Europese Commissie. Een training die in 2024 is ontwikkeld en sindsdien niet is bijgewerkt, dekt mogelijk niet wat in 2026 gevraagd wordt. Vraag elke aanbieder expliciet wanneer de content voor het laatst is geactualiseerd." },
  { q: "Wat is het verschil tussen een AI-cursus en een AI-geletterdheid training?", a: "Een AI-cursus leert medewerkers hoe ze AI-tools effectiever gebruiken — denk aan prompttechnieken, workflows, productiviteit. Dat is nuttig, maar het is geen compliance. Een AI-geletterdheid training is specifiek gericht op het voldoen aan artikel 4 van de EU AI-verordening: bewustzijn van risico's, ethiek, juridische kaders en verantwoord gebruik. Beide kunnen naast elkaar bestaan, maar ze zijn niet uitwisselbaar." },
  { q: "Hoe weet ik of een aanbieder de EU AI Act écht begrijpt?", a: "Stel deze vraag letterlijk: \"Op welke manier sluit uw training aan op artikel 4 van de EU AI-verordening?\" Een aanbieder die dat goed begrijpt, geeft een concreet antwoord. Wie terugvalt op algemene termen als \"we behandelen de AI-wetgeving\" zonder specificatie, begrijpt de materie waarschijnlijk onvoldoende." },
];

const TRAINING_VERGELIJKEN_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: TRAINING_VERGELIJKEN_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const MKB_FAQ = [
  { q: "Geldt de AI-geletterdheidsplicht ook voor kleine bedrijven en het MKB?", a: "Ja, zonder uitzondering. Artikel 4 van de EU AI Act (Verordening 2024/1689) maakt geen enkel onderscheid naar bedrijfsgrootte. De verplichting om \"passende maatregelen\" te nemen voor AI-geletterdheid geldt voor elke organisatie in de EU die AI-systemen gebruikt, van een eenmanszaak die ChatGPT inzet tot een multinational met tienduizenden medewerkers. Wat wel verschilt per bedrijfsgrootte is de proportionaliteit van de invulling. Een klein marketingbureau van 5 mensen dat uitsluitend ChatGPT gebruikt voor tekst-suggesties mag volstaan met een basistraining van enkele uren plus een simpel certificaat. Een middelgroot accountantskantoor dat AI inzet voor financiele analyses moet verder gaan: rolspecifieke training, een gedocumenteerd AI-beleid en een jaarlijkse herhalingscheck. De wet vraagt niet om een compliance-afdeling. De wet vraagt wel om aantoonbare actie die aansluit bij je risicoprofiel. \"Proportioneel\" betekent nadrukkelijk niet \"niets doen.\"" },
  { q: "Wat zegt Artikel 4 van de EU AI Act precies over AI-geletterdheid?", a: "Artikel 4 van de EU AI Act (Verordening 2024/1689, gepubliceerd in het EU Publicatieblad op 12 juli 2024) luidt in de officiele Nederlandse vertaling: aanbieders en deployers van AI-systemen nemen passende maatregelen om, naar best vermogen, te waarborgen dat hun personeel en andere personen die namens hen AI-systemen exploiteren of gebruiken, beschikken over voldoende AI-geletterdheid, rekening houdend met hun technische kennis, ervaring, opleiding en scholing en de context waarin de AI-systemen worden gebruikt. Drie elementen zijn cruciaal in deze formulering. Ten eerste geldt het voor \"deployers\": dat zijn organisaties die AI-systemen gebruiken, niet alleen bedrijven die ze bouwen. Bijna elke Nederlandse organisatie die AI-tools inzet is een deployer. Ten tweede is het \"naar best vermogen\": de wet erkent dat het niet altijd perfect kan, maar verwacht dat je serieuze pogingen onderneemt en die documenteert. Ten derde geldt het voor \"personeel en andere personen\": dus ook zzp'ers, tijdelijke krachten en stagiaires die namens jou AI gebruiken vallen hieronder. Deze verplichting is van kracht sinds 2 februari 2025." },
  { q: "Geldt de AI-geletterdheidsplicht ook voor zzp'ers en freelancers?", a: "Ja. Als je als zelfstandige AI-systemen inzet in je werkzaamheden, ben je in de zin van de wet een deployer en geldt Artikel 4 voor jou. De proportionaliteitsmarge is hier het grootst: voor een zzp'er volstaat in de meeste gevallen een erkende basistraining met certificaat, gecombineerd met een korte notitie over welke tools je gebruikt en voor welk doel. Die notitie hoeft niet meer dan een halve A4 te zijn. Wat je niet kunt doen als zzp'er: aantonen dat je \"het wel weet\" zonder documentatie. Bij een audit of een juridisch geschil met een opdrachtgever is een certificaat van een erkende AI-geletterdheidsmodule het enige bewijs dat telt. Let op: als jij als zzp'er werkt voor een opdrachtgever die AI-systemen gebruikt, is de opdrachtgever verantwoordelijk voor jouw AI-geletterdheid als je namens hen met die systemen werkt. Dat moet dan contractueel worden geregeld." },
  { q: "Wat als mijn medewerkers AI gebruiken zonder dat ik het weet?", a: "Dit is een van de meest onderschatte risico's voor MKB-organisaties. Onderzoek toont aan dat in de meeste organisaties medewerkers meer AI-tools gebruiken dan de werkgever zich realiseert, van ChatGPT en Copilot tot AI-functies in bestaande software als Salesforce, HubSpot of zelfs Google Workspace. De juridische verantwoordelijkheid ligt bij de organisatie, niet bij de individuele medewerker. Als een medewerker AI gebruikt voor werkgerelateerde taken en daarmee schade aanricht, aan klanten, aan persoonsgegevens of aan de kwaliteit van beslissingen, is de werkgever aansprakelijk, ook als die niet op de hoogte was van het AI-gebruik. De oplossing is tweeledig. Stap 1: voer een AI-inventarisatie uit waarbij je per afdeling navraagt welke tools worden gebruikt. Stap 2: stel een eenvoudig AI-beleid op waarin staat welke tools zijn goedgekeurd, welke verboden zijn en wat de procedure is voor nieuwe tools. Een organisatie met zo'n beleid staat aanzienlijk sterker bij een handhavingstraject dan een organisatie die zegt \"we wisten het niet.\"" },
  { q: "Moeten ook medewerkers die nooit bewust AI gebruiken een training volgen?", a: "Dit hangt af van de definitie van \"AI-systeem\" in de context van jouw organisatie. De definitie in de EU AI Act is breed: elk systeem dat op basis van invoer inferenties genereert zoals voorspellingen, aanbevelingen of beslissingen. In de praktijk betekent dit dat medewerkers die werken met moderne CRM-systemen, e-mailplatforms met slimme sorteerfuncties, HR-software met automatische shortlisting of boekhoudpaketten met AI-analyses, vrijwel altijd met AI-systemen werken, ook als ze dat niet als zodanig ervaren. Een vuistregel: als een medewerker software gebruikt die aanbevelingen of beslissingen genereert op basis van data, is AI-geletterdheidsplicht van toepassing. Voor medewerkers die uitsluitend werken met volledig statische tools zonder enige AI-component is de verplichting minimaal. In twijfelgevallen is een korte basistraining altijd de veiligste keuze, zeker omdat de tijdsinvestering beperkt is en het bewijs oplevert." },
  { q: "Hoe lang duurt een goede basistraining voor AI-geletterdheid?", a: "Een kwalitatief goede basistraining die voldoet aan de eisen van Artikel 4 van de EU AI Act heeft een minimale doorlooptijd van 60 tot 90 minuten voor niet-technische medewerkers, en 2 tot 3 uur voor medewerkers die AI actief inzetten in hun werkproces. Trainingen die korter zijn dan 30 minuten zijn doorgaans te oppervlakkig om bij een audit als \"passende maatregel\" te worden erkend. Trainingen die langer zijn dan 4 uur per module zijn voor de meeste MKB-medewerkers praktisch niet haalbaar en ook niet noodzakelijk. De ideale structuur: een basismodule van 60-90 minuten voor alle medewerkers, gevolgd door een kortere verdiepingsmodule van 30-45 minuten voor medewerkers die AI intensief gebruiken in hun rol. Beide modules sluiten af met een toets en een individueel certificaat. De totale tijdsinvestering per medewerker is daarmee 1,5 tot 2,5 uur, vergelijkbaar met een verplichte BHV-opfriscursus of een GDPR-training." },
  { q: "Wat is het verschil tussen een AI-geletterdheidsplicht onder de EU AI Act en een GDPR-training?", a: "De GDPR-training en de AI-geletterdheidsplicht hebben een ander juridisch fundament, een ander doel en een andere scope, maar ze vullen elkaar sterk aan. De GDPR (AVG) regelt hoe persoonsgegevens worden verwerkt: rechtmatigheid, doelbinding, minimale dataverzameling, beveiligingsmaatregelen en rechten van betrokkenen. Een GDPR-training leert medewerkers hoe ze veilig omgaan met persoonsgegevens. De AI-geletterdheidsplicht onder Artikel 4 EU AI Act gaat specifiek over het begrijpen van AI-systemen: hoe ze werken, welke risico's ze met zich meebrengen (bias, hallucinaties, gebrek aan uitlegbaarheid), en hoe je als medewerker verantwoord met AI-uitkomsten omgaat. De overlap: wanneer AI persoonsgegevens verwerkt, wat bij de meeste zakelijke AI-tools het geval is, gelden beide wetgevingen tegelijk. Een goede AI-geletterdheidsmodule behandelt daarom ook de AVG-raakvlakken. Een GDPR-training vervangt echter de AI-geletterdheidsplicht niet, en andersom. Je hebt allebei nodig als je organisatie AI-tools gebruikt die persoonsgegevens verwerken." },
  { q: "Is een eenmalige AI-training voldoende, of moet ik dit jaarlijks herhalen?", a: "De EU AI Act schrijft geen vaste herhalingsfrequentie voor, maar de wet stelt wel dat de maatregelen \"passend\" moeten zijn in de huidige context. AI-tools en hun risico's veranderen snel. Een training die in 2024 voldoende was, dekt mogelijk niet de AI-tools die jouw organisatie in 2026 gebruikt. Op basis van de richtsnoeren en de handhavingspraktijk is de aanbevolen aanpak: een volledige basistraining eenmalig voor alle medewerkers, gevolgd door een jaarlijkse herhalingscheck van 20-30 minuten waarin de belangrijkste updates worden behandeld. Praktisch betekent dit ook: nieuwe medewerkers moeten de basistraining volgen bij indiensttreding, en wanneer de organisatie een nieuw significant AI-systeem in gebruik neemt moet worden gecontroleerd of de bestaande training dat systeem dekt. Bij een audit is een trainingskalender, een overzicht van wie wanneer welke training heeft gevolgd en wanneer de volgende herhalingscheck gepland staat, een sterk bewijs van serieus beleid." },
  { q: "Waar bewaar ik de AI-geletterdheid certificaten het best?", a: "De meest auditbestendige bewaarwijze is het personeelsdossier, digitaal of fysiek, per individuele medewerker. Koppel elk certificaat aan de naam van de medewerker, de datum van afronding, de naam en versie van de training, en een notitie over welke AI-tools die medewerker gebruikt. Als je organisatie een HR-informatiesysteem gebruikt (zoals AFAS, Exact HR, Personio of vergelijkbaar), is de certificaatsectie in dat systeem de aangewezen plek. Een gedeelde SharePoint- of Google Drive-map per medewerker werkt ook, mits de toegang beheerd is. Wat je moet vermijden: een gedeelde \"AI-training-certificaten\"-map zonder naam-koppeling, of een Excel-overzicht zonder de certificaten zelf als bijlage. Bij een audit wil de toezichthouder het individuele bewijs zien, niet een lijst met namen. Sla de certificaten minimaal zolang op als de medewerker bij je in dienst is, plus twee jaar na uitdiensttreding." },
  { q: "Kan ik de AI-geletterdheidsplicht afdekken met een intern verzorgde training?", a: "Dat mag, maar de eisen zijn streng. Een intern verzorgde training telt als \"passende maatregel\" als ze aan de volgende voorwaarden voldoet: de inhoud sluit aantoonbaar aan op de verplichtingen van Artikel 4 EU AI Act, de training wordt gegeven door iemand met aantoonbare kennis van AI en de relevante regelgeving, de training sluit af met een objectief bewijsmoment (toets, schriftelijke verklaring of ondertekende aanwezigheidsregistratie) en de inhoud wordt periodiek bijgewerkt. Het nadeel van een interne training is dat de \"aantoonbaarheid\" moeilijker te bewijzen is bij een externe audit. Een externe gecertificeerde training heeft het voordeel dat de certificering op zichzelf al bewijs is van inhoud en kwaliteit. Als je toch kiest voor een interne training: documenteer de trainingsinhoud, de gebruikte bronnen (verwijs expliciet naar de EU AI Act Verordening 2024/1689), de naam van de trainer en diens kwalificaties, en bewaar de deelnemerslijsten met individuele handtekeningen of digitale bevestigingen." },
  { q: "Wat zijn de boetes als een MKB-bedrijf de AI-geletterdheidsplicht niet naleeft?", a: "De AI-geletterdheidsplicht uit Artikel 4 heeft geen aparte boetecategorie in Artikel 99 van de EU AI Act. Maar dat betekent niet dat er geen gevolgen zijn. Het niet naleven van Artikel 4 valt onder de algemene categorie van schendingen van deployer-verplichtingen, wat de weg opent naar boetes in de categorie van maximaal 15.000.000 euro of 3% van de wereldwijde jaaromzet. Voor MKB-bedrijven geldt daarbij de MKB-regel uit Artikel 99, lid 6: kleine en middelgrote ondernemingen betalen het laagste van het vaste bedrag of het percentage. Concreet voor een bedrijf met 3 miljoen euro omzet: 3% = 90.000 euro maximale boete. Dat is geen theoretisch bedrag. Naast de directe boete speelt het niet naleven van de geletterdheidsplicht bij elke andere audit een rol: een organisatie zonder trainingsbewijzen wordt als minder compliant beoordeeld, wat de kans op hogere boetes voor andere overtredingen vergroot. De slimste investering is daarom een gecertificeerde training: de kosten zijn een fractie van de maximale boete." },
  { q: "Geldt de AI-geletterdheidsplicht ook voor AI-tools die we via een SaaS-abonnement gebruiken, zoals Microsoft Copilot of Google Gemini?", a: "Ja, en dit is het meest onderschatte toepassingsgebied van Artikel 4. Microsoft Copilot, Google Gemini, Salesforce Einstein, HubSpot AI en vergelijkbare ingebouwde AI-assistenten in zakelijke software zijn AI-systemen in de zin van de wet. Wanneer jouw medewerkers deze tools gebruiken in hun dagelijks werk, ben jij als organisatie de deployer en geldt de AI-geletterdheidsplicht. De leverancier (Microsoft, Google, Salesforce) is de aanbieder en heeft zijn eigen verplichtingen. Maar de verantwoordelijkheid om je medewerkers te trainen in het verantwoord gebruik van die tools ligt volledig bij jou als deployer. Een praktische aanpak: maak in je AI-inventarisatie expliciet onderscheid tussen \"standalone AI-tools\" (zoals ChatGPT via de website) en \"ingebouwde AI-functies in bestaande software.\" Beide categorieen tellen mee. Een medewerker die Copilot gebruikt voor het samenvatten van vergadernotulen heeft basiskennis nodig over de risico's van AI-samenvatting: wat kan worden gemist, wat kan worden vervormd, en hoe verifieer je de uitkomst?" },
  { q: "Wat moet er minimaal in een AI-beleid voor een klein bedrijf staan?", a: "Een AI-beleid voor een MKB-organisatie hoeft geen uitgebreid juridisch document te zijn. De wet vereist documentatie die aantoont dat je organisatie bewust en gestructureerd omgaat met AI. Een A4 of twee A4's met de volgende zes onderdelen volstaat als minimale invulling. Onderdeel 1: een lijst van goedgekeurde AI-tools per afdeling of functie. Onderdeel 2: het doel waarvoor elke tool mag worden gebruikt. Onderdeel 3: de verificatieprocedure, hoe medewerkers AI-uitkomsten moeten controleren voordat ze worden gebruikt in beslissingen, communicatie of producten. Onderdeel 4: verboden toepassingen, wat mag absoluut niet met AI in jouw organisatie (bijv. het verwerken van persoonsgegevens in niet-goedgekeurde tools). Onderdeel 5: het aanspreekpunt voor AI-vragen en incidenten. Onderdeel 6: de datum van het beleid en de naam van de verantwoordelijke persoon. Laat medewerkers dit beleid ondertekenen bij ontvangst. Die handtekening is zelf ook een bewijs van bewustwording." },
  { q: "Telt een Engelstalige AI-training ook mee voor de AI-geletterdheidsplicht?", a: "Formeel stelt de wet geen taaleis. Een Engelstalige training kan in principe voldoen aan Artikel 4 als de inhoud aansluit op de EU AI Act en de medewerker de inhoud aantoonbaar heeft begrepen. In de praktijk zijn er echter twee serieuze bezwaren. Ten eerste: de effectiviteit van een training in een tweede taal is doorgaans lager. Medewerkers die niet dagelijks professioneel Engels gebruiken, retineren de stof slechter en zullen bij een audit minder goed kunnen uitleggen wat ze hebben geleerd. Ten tweede: de toezichthouder beoordeelt of de maatregel \"passend\" is. Een Nederlandstalige organisatie die haar medewerkers een Engelstalige training laat volgen, kan moeite hebben te bewijzen dat dit de meest passende keuze was. Als alternatief: gebruik een Nederlandstalige training die de EU AI Act en de Nederlandse handhavingscontext behandelt. De Autoriteit Persoonsgegevens communiceert in het Nederlands, handhavingsbrieven zijn Nederlandstalig, en de context van compliance in Nederland is anders dan in andere EU-landen." },
  { q: "Wanneer begint de handhaving van de AI-geletterdheidsplicht en door wie wordt er gehandhaafd?", a: "De AI-geletterdheidsplicht uit Artikel 4 is van kracht sinds 2 februari 2025, dat is de datum waarop de eerste verplichtingen van de EU AI Act in werking traden. De Autoriteit Persoonsgegevens (AP) is in Nederland aangesteld als coordinerend toezichthouder voor de EU AI Act. De AP heeft per 2 februari 2025 handhavingsbevoegdheden voor de geletterdheidsplicht. In de praktijk richt vroege handhaving zich op sectoren met hoog-risico AI: financiele dienstverlening, zorg, HR en overheid. Maar de bevoegdheid om ook kleinere organisaties te controleren bestaat al. Een handhavingstraject kan worden gestart op basis van een klacht van een medewerker, een melding door een concurrent of een steekproef in een sector. De AP kan documenten opvragen, medewerkers bevragen en bij niet-naleving een sanctie opleggen. De verwachting op basis van de GDPR-precedent: brede handhaving richting ook MKB start rond 2026-2027, maar organisaties die nu niets hebben geregeld lopen nu al risico als er een incident plaatsvindt." },
  { q: "Hoe weet ik welke AI-tools in mijn bedrijf \"hoog risico\" zijn?", a: "De EU AI Act gebruikt een risicogebaseerd model met vier categorieen: verboden AI, hoog-risico AI, beperkt-risico AI en minimaal-risico AI. Voor de meeste MKB-bedrijven zijn de hoog-risico categorieen relevant die zijn opgenomen in Bijlage III van de wet. De categorieen die het vaakst voorkomen in Nederlandse MKB-organisaties zijn: AI voor werving, selectie en beoordeling van medewerkers (ATS-systemen, cv-screening tools, prestatiebeoordeling AI), AI voor kredietwaardigheids- of financiele risicobeoordelingen, AI voor toegang tot essentiele diensten (verzekeringen, leningen, scholing) en AI in kritieke infrastructuur. Een praktische toets: vraag jezelf bij elke AI-tool af of de uitkomst van dit systeem invloed heeft op een beslissing over een persoon. Als het antwoord ja is, is de kans groot dat je in de hoog-risico zone zit. De AIGA AI Use Case Checker helpt je dit per tool snel te bepalen. Voor hoog-risico AI gelden aanvullende verplichtingen bovenop de basisgeletterdheidsplicht: menselijk toezicht, logging, incidentmelding en conformiteitsdocumentatie." },
  { q: "Moet ik mijn klanten of leveranciers informeren over het AI-gebruik in mijn bedrijf?", a: "De EU AI Act bevat een transparantieverplichting voor specifieke situaties. Als je AI-tools gebruikt die direct communiceren met klanten, chatbots, AI-gegenereerde e-mails, geautomatiseerde beslissingen over klanten, gelden de transparantieregels uit Artikel 50. Klanten moeten weten dat ze met een AI-systeem communiceren wanneer dat niet vanzelfsprekend is. Voor interne AI-tools die je gebruikt in je eigen processen, zonder directe klantinteractie, is er geen algemene informatieplicht richting klanten. Wel geldt de AVG: als je AI-tools persoonsgegevens van klanten of leveranciers verwerken, moet je dat vermelden in je privacyverklaring. In de praktijk zien we dat grote inkooporganisaties en overheden steeds vaker vragen om een AI-beleidsdocument of compliance-verklaring van hun leveranciers. Het hebben van aantoonbare AI-geletterdheid en een gedocumenteerd AI-beleid is daarmee ook een commercieel voordeel geworden, los van de wettelijke verplichting." },
  { q: "Wat is het verschil tussen een AI-aanbieder en een AI-deployer, en welke categorie ben ik als MKB?", a: "De EU AI Act maakt een fundamenteel onderscheid tussen aanbieders en deployers, en het is cruciaal om te weten in welke categorie jouw organisatie valt. Een aanbieder (provider) is een organisatie die een AI-systeem ontwikkelt en op de markt brengt. Denk aan OpenAI (ChatGPT), Microsoft (Copilot), Google (Gemini) of een Nederlands softwarebedrijf dat een AI-gedreven tool bouwt. Aanbieders hebben de zwaarste verplichtingen: technische documentatie, conformiteitsbeoordeling, CE-markering voor hoog-risico AI en registratie in de EU-database. Een deployer is een organisatie die een bestaand AI-systeem inzet in de eigen bedrijfsvoering. Vrijwel alle MKB-bedrijven in Nederland zijn deployers. Als je ChatGPT, Copilot, een AI-CRM of een AI-planningtool gebruikt voor je bedrijf, ben je een deployer. Als deployer heb je minder verplichtingen dan een aanbieder, maar de AI-geletterdheidsplicht en (bij hoog-risico AI) de deployer-verplichtingen uit Artikel 26 gelden wel degelijk. Let op: als je intern een AI-tool bouwt voor eigen gebruik, bijvoorbeeld een custom GPT-model voor klantenservice, kun je tegelijk aanbieder en deployer zijn, met cumulatieve verplichtingen." },
  { q: "Hoe leg ik medewerkers uit waarom de AI-geletterdheidsplicht er is, zonder dat het als verplicht nummer voelt?", a: "De AI-geletterdheidsplicht is het makkelijkst intern te \"verkopen\" als je het koppelt aan concrete, herkenbare risico's in het dagelijks werk van de medewerker, niet als juridische verplichting van bovenaf. De meest effectieve framing: \"We willen dat iedereen AI veilig en slim gebruikt, zodat jij niet met fouten te maken krijgt die je niet kunt zien aankomen.\" Voorbeeldrisico's per rol die werken als motivatie: een accountant die niet weet dat AI-modellen afwijken op kleine datasets kan een klant verkeerde financiele cijfers presenteren. Een HR-medewerker die niet weet dat AI-selectietools kunnen discrimineren op basis van trainingsdata, kan het bedrijf blootstellen aan aansprakelijkheid. Een marketeer die AI-gegenereerde content publiceert zonder controle kan feitelijke fouten of auteursrechtproblemen over het hoofd zien. Maak de training zo kort en praktisch mogelijk, met directe voorbeelden uit de eigen branche. Een training die 90 minuten duurt en gevuld is met herkenbare situaties heeft een hogere voltooiingsgraad en hogere retentie dan een 4-uur durende juridische cursus." },
  { q: "Waar begin ik als ik vandaag nog niets heb geregeld rondom AI-geletterdheid?", a: "Begin vandaag met drie stappen die samen minder dan een halve werkdag kosten en je al een sterke positie geven als er een audit of incident plaatsvindt. Stap 1: doe de gratis AI Gereedheidscan op aigeletterdheid.academy/gereedheidscan, in drie minuten weet je hoe je organisatie scoort op vijf dimensies, inclusief AI-geletterdheid. Geen registratie vereist. Stap 2: maak een lijst van alle AI-tools die in jouw organisatie worden gebruikt, per afdeling en per medewerker. Dit hoeft niet meer te zijn dan een simpele tabel in Word of Excel. Stap 3: plan een gecertificeerde basistraining voor alle medewerkers die AI-tools gebruiken. Zorg dat de training Nederlandstalig is, aansluit op de EU AI Act (Verordening 2024/1689) en afsluit met een individueel certificaat per medewerker. Sla die certificaten op in de personeelsdossiers. Met deze drie stappen heb je de kern van je AI-geletterdheidsbeleid staan. Je bent dan een van de best-voorbereide MKB-organisaties in Nederland, want het overgrote deel heeft nog niets geregeld." },
];

const MKB_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: MKB_FAQ.map((f) => ({
    "@type": "Question" as const,
    name: f.q,
    acceptedAnswer: { "@type": "Answer" as const, text: f.a },
  })),
};

const WAT_IS_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: WAT_IS_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const BOETES_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: BOETES_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const VIJF_STAPPEN_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: VIJF_STAPPEN_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [prevArticle, setPrevArticle] = useState<AdjacentArticle | null>(null);
  const [nextArticle, setNextArticle] = useState<AdjacentArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<AdjacentArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleInternalLinkClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (href && (href.startsWith("/kenniscentrum") || href.startsWith("/training") || href.startsWith("/masterclass") || href.startsWith("/faq") || href.startsWith("/over-aiga") || href.startsWith("/contact") || href.startsWith("/gereedheidscan") || href.startsWith("/risicoscan") || href.startsWith("/tools"))) {
      e.preventDefault();
      navigate(href);
    }
  }, [navigate]);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      setLoading(true);
      const { data: current } = await supabase
        .from("articles")
        .select("id, title, category, url, image_url, content, slug, sort_order, created_at, updated_at, published_date, read_time_minutes, meta_description, seo_keywords, h1_override")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      setArticle(current as Article | null);

      if (current) {
        const { data: allArticles } = await supabase
          .from("articles")
          .select("title, slug, category, image_url, sort_order")
          .eq("published", true)
          .order("sort_order", { ascending: true });

        if (allArticles && allArticles.length > 1) {
          const idx = allArticles.findIndex((a) => a.slug === slug);
          setPrevArticle(idx > 0 ? (allArticles[idx - 1] as AdjacentArticle) : null);
          setNextArticle(idx < allArticles.length - 1 ? (allArticles[idx + 1] as AdjacentArticle) : null);

          // Related: same category, exclude current, max 3
          const related = allArticles
            .filter((a) => a.category === current.category && a.slug !== slug)
            .slice(0, 3) as AdjacentArticle[];
          setRelatedArticles(related);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  const articleContent = useMemo(() => {
    if (!article?.content) return "Geen content beschikbaar.";
    return stripLeadingTitle(article.content, article.title);
  }, [article]);

  const wordCount = useMemo(() => articleContent.split(/\s+/).length, [articleContent]);
  const readingTime = article?.read_time_minutes || Math.max(1, Math.ceil(wordCount / 200));
  const headings = useMemo(() => extractH2Headings(articleContent), [articleContent]);
  const showToc = wordCount >= 600 && headings.length >= 2;
  const isLegalCategory = article?.category === "Wetten en regels";

  const publishedDate = article?.published_date ? article.published_date + "T00:00:00Z" : (article?.created_at ? new Date(article.created_at).toISOString() : "2025-01-15T00:00:00Z");
  const modifiedDate = article?.updated_at ? new Date(article.updated_at).toISOString() : "2026-03-27T00:00:00Z";

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Laden...</p></div>;
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Artikel niet gevonden.</p>
        <Link to="/kenniscentrum" className="text-primary hover:underline">← Terug naar kenniscentrum</Link>
      </div>
    );
  }

  const isHtmlContent = (text: string) => /^\s*<[a-z][\s\S]*>/i.test(text);
  const heroImgNorm = article.image_url ? article.image_url.replace(/^https?:\/\//, "").split("?")[0] : "";

  const isWatIs = article.slug === "wat-is-ai-geletterdheid";
  const isBoetes = article.slug === "eu-ai-act-boetes-maximale-bedragen";
  const is5Stappen = article.slug === "ai-geletterdheidsplicht-zo-voldoe-je-in-5-stappen-aiga";
  const isTrainingVergelijken = article.slug === "ai-geletterdheid-training-vergelijken-hoe-kies-je-de-juiste";
  const isZorgSector = article.slug === "ai-act-per-sector-zorg-welzijn";
  const isMkbGids = article.slug === "ai-geletterdheidsplicht-voor-het-mkb-de-complete-gids-2026";
  const seoTitle = isWatIs
    ? "Wat is AI-geletterdheid? Complete gids voor organisaties (2026)"
    : isBoetes
    ? "EU AI Act boetes: wat zijn de maximale bedragen? | AIGA"
    : isMkbGids
    ? "AI-geletterdheidsplicht MKB: wat je verplicht bent (en hoe je het regelt)"
    : `${article.title} | AIGA Kenniscentrum`;
  const seoDescription = isWatIs
    ? "AI-geletterdheid is wettelijk verplicht sinds februari 2025. Lees wat het inhoudt, welke verplichtingen de EU AI Act stelt, wat voorbeelden zijn en hoe jij je organisatie compliant maakt."
    : isBoetes
    ? "Wat zijn de maximale boetes onder de EU AI Act? Artikel 99 legt de bedragen vast. Lees wat jouw organisatie riskeert en bereken het direct."
    : isMkbGids
    ? "Artikel 4 EU AI Act geldt ook voor kleine bedrijven. Lees wat AI-geletterdheid voor het MKB concreet betekent, wat het kost en hoe je compliant wordt voor augustus 2026."
    : (article.meta_description || (article.content ? article.content.slice(0, 155).replace(/[#*\n]/g, "") + "..." : "Lees dit artikel over AI-geletterdheid op het AIGA Kenniscentrum."));

  const articleJsonLd = isWatIs
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Wat is AI-geletterdheid? Complete gids voor organisaties (2026)",
        description: seoDescription,
        image: "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png",
        datePublished: "2025-02-01",
        dateModified: "2026-03-21",
        wordCount,
        keywords: ["AI-geletterdheid", "ai geletterdheid", "EU AI Act", "AI Act artikel 4", "AI geletterdheid certificaat", "AI geletterdheid verplicht", "wat is AI-geletterdheid"],
        inLanguage: "nl-NL",
        author: { "@type": "Person", name: "Ferry Hoes", url: "https://aigeletterdheid.academy/over-aiga", jobTitle: "AI Expert & Trainer", worksFor: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy" } },
        publisher: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy", logo: { "@type": "ImageObject", url: "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png" } },
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://aigeletterdheid.academy/kenniscentrum/wat-is-ai-geletterdheid" },
        about: { "@type": "Thing", name: "AI-geletterdheid", description: "Het vermogen van medewerkers om AI te begrijpen, ermee te werken en de gevolgen ervan te overzien binnen hun werkcontext, zoals vereist door artikel 4 van de EU AI Act." },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: seoDescription,
        image: article.image_url || FALLBACK_IMAGE,
        datePublished: publishedDate,
        dateModified: modifiedDate,
        wordCount,
        ...(article.seo_keywords ? { keywords: article.seo_keywords.split(",").map(k => k.trim()).filter(Boolean) } : {}),
        author: { "@type": "Person", name: "Ferry Hoes", url: "https://aigeletterdheid.academy/over-aiga", jobTitle: "AI-expert & Keynote Spreker", sameAs: "https://www.linkedin.com/in/ferryhoes" },
        publisher: { "@type": "Organization", name: "AIGA — AI Geletterdheid Academy", logo: { "@type": "ImageObject", url: "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png" } },
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://aigeletterdheid.academy/kenniscentrum/${article.slug}` },
        inLanguage: "nl",
        about: { "@type": "Thing", name: "AI-geletterdheid" },
      };

  return (
    <div className="min-h-screen">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`/kenniscentrum/${article.slug}`}
        ogImage={article.image_url || FALLBACK_IMAGE}
        ogType="article"
        keywords={article.seo_keywords || undefined}
        articleMeta={{
          publishedTime: isWatIs ? "2025-02-01" : publishedDate,
          modifiedTime: isWatIs ? "2026-03-21" : modifiedDate,
          author: "Ferry Hoes",
          section: article.category,
        }}
        jsonLd={articleJsonLd}
      />
      {isWatIs && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(WAT_IS_FAQ_JSONLD)}</script>
        </Helmet>
      )}
      {isBoetes && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(BOETES_FAQ_JSONLD)}</script>
        </Helmet>
      )}
      {is5Stappen && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(VIJF_STAPPEN_FAQ_JSONLD)}</script>
        </Helmet>
      )}
      {isTrainingVergelijken && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(TRAINING_VERGELIJKEN_FAQ_JSONLD)}</script>
        </Helmet>
      )}
      {isZorgSector && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(ZORG_FAQ_JSONLD)}</script>
        </Helmet>
      )}
      {isMkbGids && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(MKB_FAQ_JSONLD)}</script>
        </Helmet>
      )}
      {/* Breadcrumb */}
      <BreadcrumbNav items={[
        { label: "Home", href: "/" },
        { label: "Kenniscentrum", href: "/kenniscentrum" },
        { label: article.title },
      ]} />

      {/* Hero image */}
      {article.image_url && (
        <div className="w-full max-h-[50vh] overflow-hidden mt-4">
          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="pt-8">
              <Link to="/kenniscentrum" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft size={16} /> Terug naar kenniscentrum
              </Link>
              <Badge variant="secondary" className="mb-3 text-xs block w-fit">{article.category}</Badge>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight mb-2">
                {article.h1_override || (isWatIs ? "Wat is AI-geletterdheid?" : article.title)}
              </h1>
              {isWatIs && (
                <>
                  <p className="text-lg text-muted-foreground leading-relaxed mt-4 mb-2">
                    AI-geletterdheid is inmiddels net zo fundamenteel als lezen en schrijven. Niet omdat het modewoord van het jaar is, maar omdat de wet het verplicht. Sinds februari 2025 moeten alle organisaties in de EU die met AI-systemen werken aantoonbaar investeren in de AI-geletterdheid van hun medewerkers. Maar wat betekent dat precies? Wat verwacht de wet van jouw organisatie? En hoe pak je het concreet aan?
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    Dit is de meest complete Nederlandstalige gids over AI-geletterdheid: geschreven voor leidinggevenden, HR-professionals en beleidsmakers die helder willen begrijpen wat AI-geletterdheid is, waarom het urgent is en hoe ze er nu mee aan de slag kunnen.
                  </p>
                </>
              )}
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border mt-4">
              <Link to="/over-aiga" className="hover:text-primary transition-colors" rel="author">Ferry Hoes</Link>
              <span>{formatDate(isWatIs ? "2025-02-01T00:00:00Z" : publishedDate)}</span>
              <span>Bijgewerkt: {new Date(modifiedDate).toLocaleDateString("nl-NL", { month: "long", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {readingTime} min leestijd</span>
            </div>

            {/* Table of Contents */}
            {showToc && (
              <nav className="bg-accent border border-primary/20 rounded-xl p-5 mb-8">
                <p className="text-sm font-semibold text-foreground mb-3">Inhoudsopgave</p>
                <ul className="space-y-1.5">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-sm text-primary hover:underline">{h.text}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Article content */}
            {isHtmlContent(articleContent) ? (
              <article
                className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-primary/30 prose-hr:border-border prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: articleContent }}
                onClick={handleInternalLinkClick}
              />
            ) : (
              <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-primary/30 prose-hr:border-border prose-img:rounded-xl">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children, ...props }) => {
                      if (href && (href.startsWith("/kenniscentrum") || href.startsWith("/training") || href.startsWith("/masterclass") || href.startsWith("/faq") || href.startsWith("/over-aiga") || href.startsWith("/contact") || href.startsWith("/gereedheidscan") || href.startsWith("/risicoscan") || href.startsWith("/tools"))) {
                        return <Link to={href} className="text-primary hover:underline">{children}</Link>;
                      }
                      return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
                    },
                    img: ({ src, alt, ...props }) => {
                      if (src) {
                        const srcNorm = src.replace(/^https?:\/\//, "").split("?")[0];
                        if (srcNorm === heroImgNorm) return null;
                      }
                      return <img src={src} alt={alt || ""} className="rounded-xl my-6 w-full" loading="lazy" {...props} />;
                    },
                    h2: ({ children, ...props }) => {
                      const text = String(children).replace(/\*\*/g, "").trim();
                      const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
                      return <h2 id={id} {...props}>{children}</h2>;
                    },
                  }}
                >
                  {articleContent}
                </ReactMarkdown>
              </article>
            )}
          </AnimatedSection>

          {/* FAQ accordion for wat-is-ai-geletterdheid */}
          {isWatIs && (
            <AnimatedSection delay={0.05}>
              <div className="mt-12">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">Veelgestelde vragen over AI-geletterdheid</h2>
                <Accordion type="single" collapsible className="w-full">
                  {WAT_IS_FAQ.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-base font-semibold">{faq.q}</AccordionTrigger>
                      <AccordionContent><p className="text-muted-foreground leading-relaxed">{faq.a}</p></AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AnimatedSection>
          )}

          {/* FAQ accordion for boetes article */}
          {isBoetes && (
            <AnimatedSection delay={0.05}>
              <div className="mt-12">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">Veelgestelde vragen over AI Act boetes</h2>
                <Accordion type="single" collapsible className="w-full">
                  {BOETES_FAQ.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-base font-semibold">{faq.q}</AccordionTrigger>
                      <AccordionContent><p className="text-muted-foreground leading-relaxed">{faq.a}</p></AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AnimatedSection>
          )}

          {/* FAQ accordion for 5-stappen article */}
          {is5Stappen && (
            <AnimatedSection delay={0.05}>
              <div className="mt-12">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">Veelgestelde vragen</h2>
                <Accordion type="single" collapsible className="w-full">
                  {VIJF_STAPPEN_FAQ.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-base font-semibold">{faq.q}</AccordionTrigger>
                      <AccordionContent><p className="text-muted-foreground leading-relaxed">{faq.a}</p></AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AnimatedSection>
          )}

          {/* FAQ accordion for training-vergelijken article */}
          {isTrainingVergelijken && (
            <AnimatedSection delay={0.05}>
              <div className="mt-12">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">Veelgestelde vragen</h2>
                <Accordion type="single" collapsible className="w-full">
                  {TRAINING_VERGELIJKEN_FAQ.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-base font-semibold">{faq.q}</AccordionTrigger>
                      <AccordionContent><p className="text-muted-foreground leading-relaxed">{faq.a}</p></AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AnimatedSection>
          )}

          {/* FAQ accordion for zorg sector article */}
          {isZorgSector && (
            <AnimatedSection delay={0.05}>
              <div className="mt-12">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">AI Act in de zorg: alle veelgestelde vragen beantwoord</h2>
                <Accordion type="single" collapsible className="w-full">
                  {ZORG_FAQ.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border-primary/20">
                      <AccordionTrigger className="text-left text-base font-semibold">{faq.q}</AccordionTrigger>
                      <AccordionContent><p className="text-muted-foreground leading-relaxed">{faq.a}</p></AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AnimatedSection>
          )}

          {/* MKB Gids interactive components */}
          {isMkbGids && (
            <>
              <MkbRiskTable />
              <MkbComparisonTable />
              <MkbStepTracker />
              <MkbFaqAccordion items={MKB_FAQ} />
              <MkbCtaBanner />
              <MkbLeesOok />
            </>
          )}

          {/* CTA section for wat-is-ai-geletterdheid */}
          {isWatIs && (
            <AnimatedSection delay={0.1}>
              <div className="mt-12 p-8 bg-card border border-border rounded-2xl text-center">
                <h2 className="text-2xl font-display font-bold text-foreground mb-3">Klaar om je team AI-geletterd te maken?</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  AIGA biedt de meest praktische en schaalbare AI-geletterdheid training voor Nederlandse organisaties. Volledig online, in eigen tempo, afsluitend met een audit-proof certificaat.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild><Link to="/training">Bekijk de online training</Link></Button>
                  <Button asChild variant="outline"><Link to="/gereedheidscan">Doe de gratis AI Gereedheidscan</Link></Button>
                  <Button asChild variant="outline"><Link to="/contact">Vraag een offerte aan</Link></Button>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* CTA for 5-stappen article */}
          {is5Stappen && (
            <AnimatedSection delay={0.1}>
              <div className="mt-12 p-8 bg-card border border-border rounded-2xl text-center neon-glow">
                <h2 className="text-2xl font-display font-bold text-foreground mb-3">Klaar om te starten?</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Onze training is volledig Nederlandstalig, gebaseerd op de EU AI Act, en bevat een audit-proof certificaat.
                </p>
                <Button asChild><Link to="/training">Bekijk de AI Geletterdheid Training →</Link></Button>
              </div>
            </AnimatedSection>
          )}

          {/* Slug-based CTA blocks */}
          {article.slug && ARTICLE_CTAS[article.slug] && !isWatIs && (
            <AnimatedSection delay={0.08}>
              <div className="mt-12 bg-card border border-border rounded-2xl p-6 sm:p-8">
                <p className="text-sm font-semibold text-foreground mb-4">Gerelateerde tool</p>
                <div className="flex flex-col gap-3">
                  {ARTICLE_CTAS[article.slug].map((cta) => (
                    <Link
                      key={cta.href}
                      to={cta.href}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                    >
                      {cta.text}
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* External sources for legal articles */}
          {isLegalCategory && (
            <AnimatedSection delay={0.05}>
              <div className="mt-10 p-6 bg-card border border-border rounded-2xl">
                <h3 className="text-sm font-semibold text-foreground mb-3">Officiële bronnen</h3>
                <ul className="space-y-2 text-sm">
                  {EU_AI_ACT_SOURCES.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{s.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          )}

          {/* Author bio card */}
          <AnimatedSection delay={0.1}>
            <div className="mt-16 neon-border-lg rounded-2xl" style={{ padding: "3px" }}>
              <div className="neon-inner bg-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img src={ferryImg} alt="Ferry Hoes" className="w-20 h-20 rounded-full object-cover shrink-0" loading="lazy" decoding="async" width={80} height={80} />
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary font-medium mb-1">Over de auteur</p>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    <Link to="/over-aiga" className="hover:text-primary transition-colors" rel="author">Ferry Hoes</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{FERRY_BIO}</p>
                  <Link to="/over-aiga" className="text-xs text-primary hover:underline mt-2 inline-block">Lees meer over Ferry →</Link>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <AnimatedSection delay={0.15}>
              <div className="mt-12">
                <h3 className="text-lg font-display font-semibold text-foreground mb-6">Gerelateerde artikelen</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedArticles.map((ra) => (
                    ra.slug && (
                      <Link
                        key={ra.slug}
                        to={`/kenniscentrum/${ra.slug}`}
                        className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 neon-glow transition-all duration-300"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img src={ra.image_url} alt={ra.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{ra.title}</p>
                        </div>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Prev / Next navigation */}
          {(prevArticle || nextArticle) && (
            <AnimatedSection delay={0.2}>
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevArticle?.slug ? (
                  <Link to={`/kenniscentrum/${prevArticle.slug}`} className="group flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-neon-purple/40 neon-glow transition-all duration-300">
                    <ArrowLeft size={18} className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Vorig artikel</p>
                      <p className="text-sm font-medium text-foreground truncate">{prevArticle.title}</p>
                    </div>
                  </Link>
                ) : <div />}
                {nextArticle?.slug ? (
                  <Link to={`/kenniscentrum/${nextArticle.slug}`} className="group flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-neon-purple/40 neon-glow transition-all duration-300 text-right sm:justify-end">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Volgend artikel</p>
                      <p className="text-sm font-medium text-foreground truncate">{nextArticle.title}</p>
                    </div>
                    <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                  </Link>
                ) : <div />}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
