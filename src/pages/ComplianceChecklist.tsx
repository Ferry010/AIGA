import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";
import ShareDocumentButton from "@/components/ShareDocumentButton";

const DeadlineBadge = ({ text }: { text: string }) => (
  <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-accent text-primary border border-primary/20">
    {text}
  </span>
);

const CheckItem = ({ color, children }: { color: "red" | "yellow" | "green"; children: React.ReactNode }) => {
  const dot = color === "red" ? "🔴" : color === "yellow" ? "🟡" : "🟢";
  return (
    <label className="flex items-start gap-3 py-1.5 cursor-pointer">
      <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border accent-primary shrink-0" />
      <span className="text-sm leading-relaxed">
        {dot} {children}
      </span>
    </label>
  );
};

const Toelichting = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-3 p-3 bg-accent/50 border border-border rounded text-sm text-muted-foreground leading-relaxed">
    💡 <strong>Toelichting:</strong> {children}
  </div>
);

const SectionTitle = ({ number, title }: { number: number; title: string }) => (
  <h2 className="text-lg font-display font-bold text-foreground mt-8 mb-1">
    Sectie {number} — {title}
  </h2>
);

const ComplianceChecklist = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="AI Act Compliance Checklist | AIGA"
        description="Stap-voor-stap compliance checklist voor deployers op basis van EU AI Act Verordening 2024/1689."
        canonical="/tools/downloads/ai-act-compliance-checklist"
      />
      <div className="print:hidden">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Downloads", href: "/tools/downloads" },
            { label: "Compliance Checklist" },
          ]}
        />
      </div>

      {/* A4 document */}
      <div className="max-w-[210mm] mx-auto bg-white px-8 sm:px-12 py-10 print:px-[20mm] print:py-[15mm] print:shadow-none shadow-lg my-8 print:my-0">
        {/* Print button */}
        <div className="flex justify-end gap-2 mb-6 print:hidden">
          <ShareDocumentButton document="checklist" documentUrl={window.location.href} />
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer size={16} /> Print / PDF
          </Button>
        </div>

        {/* Header */}
        <header className="border-b border-border pb-6 mb-8">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            AI Act Compliance Checklist
          </h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Voor organisaties die AI-systemen inzetten (deployers) — Gebaseerd op EU AI Act Verordening 2024/1689
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Versie: 1.0 · Bijgewerkt: maart 2025 · Bron: EUR-Lex 32024R1689
          </p>
        </header>

        {/* Introductie */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Deze checklist is bestemd voor organisaties die AI-systemen van derden inzetten in hun bedrijfsvoering
          (deployers). De checklist volgt de officiële verplichtingen uit de EU AI Act. Niet alle verplichtingen gelden
          voor alle organisaties: gebruik de risico-indicator per stap om te bepalen wat op jou van toepassing is.
        </p>

        {/* Leeswijzer */}
        <div className="p-4 border border-border rounded-lg bg-accent/30 mb-8 text-sm space-y-1">
          <p className="font-semibold text-foreground mb-2">Leeswijzer</p>
          <p>🔴 Verplicht voor alle deployers van hoog-risico AI (Bijlage III)</p>
          <p>🟡 Verplicht voor alle deployers die AI inzetten waarbij output zichtbaar is voor anderen</p>
          <p>🟢 Verplicht voor ALLE organisaties die AI gebruiken (ongeacht risiconiveau)</p>
          <p className="mt-2 text-muted-foreground">
            Deadline-indicator per item: <DeadlineBadge text="Feb 2025" /> <DeadlineBadge text="Aug 2025" />{" "}
            <DeadlineBadge text="Aug 2026" /> <DeadlineBadge text="Aug 2027" />
          </p>
        </div>

        {/* SECTIE 1 */}
        <SectionTitle number={1} title="AI-geletterdheid (Artikel 4)" />
        <p className="text-xs text-muted-foreground mb-2">
          Deadline: <DeadlineBadge text="Feb 2025 — al van kracht" />
        </p>
        <div className="space-y-0.5">
          <CheckItem color="green">Breng in kaart welke medewerkers AI-systemen gebruiken of bedienen namens de organisatie</CheckItem>
          <CheckItem color="green">Stel het benodigde kennisniveau vast per functiegroep (technisch, operationeel, management)</CheckItem>
          <CheckItem color="green">Zorg voor aantoonbare AI-geletterdheidsmaatregelen voor al deze medewerkers</CheckItem>
          <CheckItem color="green">Documenteer welke training is gevolgd en door wie (bewaarplicht voor audit)</CheckItem>
          <CheckItem color="green">Houd trainingsrecords actueel bij nieuwe medewerkers en nieuwe AI-tools</CheckItem>
        </div>
        <Toelichting>
          Artikel 4 vereist dat zowel providers als deployers "passende maatregelen nemen" voor AI-geletterdheid van
          medewerkers die AI-systemen gebruiken of bedienen. Er is geen minimumdrempel: ook gebruik van ChatGPT of
          Copilot valt hieronder. Het certificaat van de AIGA-training geldt als aantoonbaar bewijs.
        </Toelichting>

        {/* SECTIE 2 */}
        <SectionTitle number={2} title="AI-inventarisatie en risicoclassificatie (Artikel 6 + Bijlage III)" />
        <p className="text-xs text-muted-foreground mb-2">
          Deadline: <DeadlineBadge text="Aug 2025" /> voor GPAI-systemen / <DeadlineBadge text="Aug 2026" /> voor hoog-risico
        </p>
        <div className="space-y-0.5">
          <CheckItem color="green">Stel een register op van alle AI-systemen die de organisatie gebruikt of inzet</CheckItem>
          <CheckItem color="green">Noteer per tool: naam, leverancier, versie, doel en betrokken medewerkers/processen</CheckItem>
          <CheckItem color="yellow">Beoordeel per tool of het gebruik valt onder een Bijlage III categorie (hoog risico)</CheckItem>
          <CheckItem color="red">Markeer tools die altijd hoog-risico zijn (bijv. AI voor werving, kredietbeoordeling, medische triage)</CheckItem>
          <CheckItem color="yellow">Documenteer per tool of er een risicobeoordeling heeft plaatsgevonden</CheckItem>
        </div>

        <div className="mt-4 p-3 border border-border rounded text-sm">
          <p className="font-semibold text-foreground mb-2">📋 Bijlage III hoog-risico categorieën (samenvatting):</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Biometrie (gezichtsherkenning, emotieherkenning)</li>
            <li>Kritieke infrastructuur (energie, water, transport)</li>
            <li>Onderwijs &amp; beroepsopleiding (toelating, beoordeling)</li>
            <li>Werkgelegenheid (werving, selectie, beoordeling, ontslag)</li>
            <li>Essentiële diensten (krediet, verzekering, uitkeringen, zorg)</li>
            <li>Rechtshandhaving</li>
            <li>Migratie &amp; grenscontrole</li>
            <li>Rechtsbedeling &amp; democratisch proces</li>
          </ul>
        </div>

        {/* SECTIE 3 */}
        <SectionTitle number={3} title="Menselijk toezicht (Artikel 26, lid 1 & 2)" />
        <p className="text-xs text-muted-foreground mb-2">
          Deadline: <DeadlineBadge text="Aug 2026" />
        </p>
        <div className="space-y-0.5">
          <CheckItem color="red">Wijs voor elk hoog-risico AI-systeem een verantwoordelijk persoon aan met bevoegdheid om in te grijpen</CheckItem>
          <CheckItem color="red">Zorg dat deze persoon de nodige competentie, training en autoriteit heeft (Art. 26 lid 2)</CheckItem>
          <CheckItem color="red">Leg vast wie menselijk toezicht uitoefent op welk systeem en op welke manier</CheckItem>
          <CheckItem color="red">Zorg dat medewerkers weten wanneer en hoe ze het systeem kunnen pauzeren of negeren</CheckItem>
          <CheckItem color="yellow">Instrueer medewerkers om output van AI-systemen kritisch te beoordelen voor gebruik</CheckItem>
        </div>

        {/* SECTIE 4 */}
        <SectionTitle number={4} title="Invoerdata & kwaliteitsbeheer (Artikel 26, lid 4)" />
        <p className="text-xs text-muted-foreground mb-2">
          Deadline: <DeadlineBadge text="Aug 2026" />
        </p>
        <div className="space-y-0.5">
          <CheckItem color="red">Zorg dat invoerdata voor hoog-risico AI-systemen relevant en representatief is voor het beoogde doel</CheckItem>
          <CheckItem color="red">Leg vast welke data als input wordt gebruikt en hoe de kwaliteit wordt geborgd</CheckItem>
          <CheckItem color="yellow">Controleer of datagebruik in lijn is met AVG/GDPR-verplichtingen</CheckItem>
        </div>

        {/* SECTIE 5 */}
        <SectionTitle number={5} title="Monitoring & logbeheer (Artikel 26, lid 5 & 6)" />
        <p className="text-xs text-muted-foreground mb-2">
          Deadline: <DeadlineBadge text="Aug 2026" />
        </p>
        <div className="space-y-0.5">
          <CheckItem color="red">Monitor het functioneren van hoog-risico AI-systemen op basis van de gebruiksaanwijzing van de leverancier</CheckItem>
          <CheckItem color="red">Bewaar automatisch gegenereerde logs minimaal 6 maanden (tenzij AVG kortere termijn vereist)</CheckItem>
          <CheckItem color="red">Informeer de leverancier of toezichthouder bij signalen dat het systeem een risico vormt (Art. 79)</CheckItem>
          <CheckItem color="red">Staak het gebruik onmiddellijk als een ernstig incident wordt vastgesteld</CheckItem>
        </div>

        {/* SECTIE 6 */}
        <SectionTitle number={6} title="Transparantie naar medewerkers (Artikel 26, lid 7)" />
        <p className="text-xs text-muted-foreground mb-2">
          Deadline: <DeadlineBadge text="Aug 2026" />
        </p>
        <div className="space-y-0.5">
          <CheckItem color="red">Informeer medewerkers vóór ingebruikname dat zij worden blootgesteld aan een hoog-risico AI-systeem op de werkvloer</CheckItem>
          <CheckItem color="red">Doe dit conform cao- en nationale informatieregels (bijv. OR-medezeggenschapsrecht in NL)</CheckItem>
          <CheckItem color="yellow">Stel een intern communicatiedocument op over welke AI-systemen worden gebruikt en voor welk doel</CheckItem>
        </div>

        {/* SECTIE 7 */}
        <SectionTitle number={7} title="Transparantie naar gebruikers/klanten (Artikel 50)" />
        <p className="text-xs text-muted-foreground mb-2">
          Deadline: <DeadlineBadge text="Aug 2025" />
        </p>
        <div className="space-y-0.5">
          <CheckItem color="yellow">Informeer gebruikers/klanten die direct interacteren met een AI-systeem dat ze met AI te maken hebben (bijv. chatbot)</CheckItem>
          <CheckItem color="yellow">Label AI-gegenereerde content (beeld, audio, video, tekst) die publiekelijk wordt gedeeld als AI-gegenereerd</CheckItem>
          <CheckItem color="yellow">Bij gebruik van deepfake-technologie: altijd expliciet disclosure, ook in artistieke context</CheckItem>
          <CheckItem color="yellow">Bij gebruik van emotieherkenning of biometrische categorisering: informeer betrokkenen</CheckItem>
        </div>

        {/* SECTIE 8 */}
        <SectionTitle number={8} title="Verboden AI-praktijken (Artikel 5)" />
        <p className="text-xs text-muted-foreground mb-2">
          Deadline: <DeadlineBadge text="Feb 2025 — al van kracht" />
        </p>
        <div className="space-y-0.5">
          <CheckItem color="green">Gebruik geen AI-systemen die subliminale of manipulatieve technieken inzetten om gedrag te beïnvloeden zonder bewustzijn van de gebruiker</CheckItem>
          <CheckItem color="green">Gebruik geen AI voor social scoring van personen op basis van gedrag of persoonlijkheidskenmerken</CheckItem>
          <CheckItem color="green">Gebruik geen realtime biometrische identificatiesystemen in openbare ruimten (tenzij wettelijk toegestaan)</CheckItem>
          <CheckItem color="green">Gebruik geen AI die kwetsbare groepen uitbuit (leeftijd, beperking, sociaaleconomische situatie)</CheckItem>
          <CheckItem color="green">Gebruik geen AI voor het voorspellen van crimineel gedrag op basis van persoonskenmerken</CheckItem>
        </div>

        {/* SECTIE 9 */}
        <SectionTitle number={9} title="Documentatie & audit-readiness" />
        <p className="text-xs text-muted-foreground mb-2">
          Deadline: <DeadlineBadge text="Aug 2026" />
        </p>
        <div className="space-y-0.5">
          <CheckItem color="green">Stel een intern AI-register op (overzicht van alle AI-tools, doel, risico, verantwoordelijke)</CheckItem>
          <CheckItem color="green">Documenteer alle compliance-maatregelen en bewaar deze minimaal 10 jaar (Art. 18)</CheckItem>
          <CheckItem color="yellow">Stel een organisatie-breed AI-beleid op dat de governance van AI-gebruik regelt</CheckItem>
          <CheckItem color="red">Voer een data protection impact assessment (DPIA) uit voor hoog-risico AI-systemen die persoonsgegevens verwerken (Art. 26 lid 9 jo. AVG Art. 35)</CheckItem>
          <CheckItem color="red">Registreer hoog-risico AI-systemen in de EU-database indien vereist (Art. 49 — geldt voor overheidsinstanties)</CheckItem>
        </div>

        {/* SECTIE 10 */}
        <SectionTitle number={10} title="Tijdlijn & deadlines (Artikel 113)" />
        <div className="mt-4 space-y-4">
          {[
            { date: "2 februari 2025", text: "Verboden AI-praktijken (Art. 5) + AI-geletterdheidsplicht (Art. 4) van kracht" },
            { date: "2 augustus 2025", text: "Handhaving GPAI-verplichtingen, governance en toezichtsbepalingen (Ch. V, VII, XII)" },
            { date: "2 augustus 2026", text: "Volledige toepassing EU AI Act — alle deployer- en providerverplichtingen actief" },
            { date: "2 augustus 2027", text: "Hoog-risico AI-systemen die onder bestaande productveiligheidswetgeving vallen (Art. 6 lid 1)" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1" />
                {i < 3 && <div className="w-0.5 h-8 bg-border" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">📅 {item.date}</p>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground text-center space-y-1">
          <p className="font-semibold">AIGA Academy · aigeletterdheid.academy</p>
          <p>E-mail: aanvraag@aigeletterdheid.academy · Telefoon: +31 (0)10 316 7827</p>
          <p>
            Gebaseerd op EUR-Lex 32024R1689 · Dit document is geen juridisch advies. Raadpleeg een jurist voor bindende
            uitspraken.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ComplianceChecklist;
