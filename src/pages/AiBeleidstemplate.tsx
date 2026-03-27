import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SEO from "@/components/SEO";
import ShareDocumentButton from "@/components/ShareDocumentButton";
import SendCopyForm from "@/components/SendCopyForm";

const Placeholder = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-primary/10 px-1 rounded font-mono text-sm text-primary">{children}</span>
);

const PlaceholderCell = ({ children }: { children: React.ReactNode }) => (
  <td className="border border-border px-3 py-2 text-sm">
    <Placeholder>{children}</Placeholder>
  </td>
);

const SectionTitle = ({ number, title }: { number: number; title: string }) => (
  <h2 className="text-lg font-display font-bold text-foreground mt-8 mb-2">
    {number}. {title}
  </h2>
);

const AiBeleidstemplate = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="AI-beleid Template | AIGA"
        description="Kant-en-klaar AI-beleidstemplate op basis van de EU AI Act. Pas aan voor jouw organisatie."
        canonical="/tools/downloads/ai-beleid-template"
      />
      <div className="print:hidden">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Downloads", href: "/tools/downloads" },
            { label: "AI-beleid template" },
          ]}
        />
      </div>

      {/* A4 document */}
      <div className="max-w-[210mm] mx-auto bg-white px-8 sm:px-12 py-10 print:px-[20mm] print:py-[15mm] print:shadow-none shadow-lg my-8 print:my-0">
        {/* Print button */}
        <div className="flex flex-col gap-3 mb-6 print:hidden">
          <div className="flex justify-end gap-2">
            <ShareDocumentButton document="template" documentUrl="/tools/downloads/ai-beleid-opstellen/document" />
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer size={16} /> Print / PDF
            </Button>
          </div>
          <SendCopyForm document="template" />
        </div>

        {/* Header */}
        <header className="border-b border-border pb-6 mb-8">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            AI-gebruiksbeleid <Placeholder>[NAAM ORGANISATIE]</Placeholder>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Template op basis van EU AI Act (Verordening 2024/1689) · Versie 1.0
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-xs text-muted-foreground">
            <span>Datum vastgesteld: <Placeholder>[DATUM]</Placeholder></span>
            <span>Vastgesteld door: <Placeholder>[NAAM/FUNCTIE]</Placeholder></span>
            <span>Volgende review: <Placeholder>[DATUM]</Placeholder></span>
          </div>
        </header>

        {/* 1 */}
        <SectionTitle number={1} title="Doel en reikwijdte" />
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          Dit beleid beschrijft hoe <Placeholder>[NAAM ORGANISATIE]</Placeholder> omgaat met het gebruik van kunstmatige
          intelligentie (AI) in haar bedrijfsvoering. Het beleid is van toepassing op alle medewerkers, contractors en
          externe partijen die namens <Placeholder>[NAAM ORGANISATIE]</Placeholder> AI-systemen gebruiken of beheren.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Dit beleid is opgesteld in overeenstemming met de verplichtingen uit de EU AI Act (Verordening 2024/1689), in
          het bijzonder Artikel 4 (AI-geletterdheid) en Artikel 26 (verplichtingen van deployers).
        </p>

        {/* 2 */}
        <SectionTitle number={2} title="Definities" />
        <ul className="text-sm text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
          <li><strong>AI-systeem:</strong> een machinaal systeem zoals bedoeld in Art. 3 lid 1 EU AI Act</li>
          <li><strong>Deployer:</strong> <Placeholder>[NAAM ORGANISATIE]</Placeholder> in haar hoedanigheid als gebruiker van AI-systemen van derden</li>
          <li><strong>Hoog-risico AI-systeem:</strong> AI-systeem zoals bedoeld in Artikel 6 jo. Bijlage III EU AI Act</li>
          <li><strong>AI-geletterdheid:</strong> het vermogen van medewerkers om AI te begrijpen, risico's in te schatten en AI verantwoord in te zetten (Art. 4)</li>
        </ul>

        {/* 3 */}
        <SectionTitle number={3} title="Toegestaan AI-gebruik" />
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          De volgende AI-systemen zijn goedgekeurd voor gebruik binnen <Placeholder>[NAAM ORGANISATIE]</Placeholder>:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full border-collapse border border-border text-sm">
            <thead>
              <tr className="bg-accent/50">
                <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">Tool</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">Doel</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">Risiconiveau</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">Goedgekeurd door</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">Datum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <PlaceholderCell>[TOOL]</PlaceholderCell>
                <PlaceholderCell>[DOEL]</PlaceholderCell>
                <PlaceholderCell>[NIVEAU]</PlaceholderCell>
                <PlaceholderCell>[NAAM]</PlaceholderCell>
                <PlaceholderCell>[DATUM]</PlaceholderCell>
              </tr>
              <tr>
                <PlaceholderCell>[TOOL]</PlaceholderCell>
                <PlaceholderCell>[DOEL]</PlaceholderCell>
                <PlaceholderCell>[NIVEAU]</PlaceholderCell>
                <PlaceholderCell>[NAAM]</PlaceholderCell>
                <PlaceholderCell>[DATUM]</PlaceholderCell>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Gebruik van niet-goedgekeurde AI-tools is niet toegestaan zonder voorafgaande beoordeling door{" "}
          <Placeholder>[NAAM VERANTWOORDELIJKE/AFDELING]</Placeholder>.
        </p>

        {/* 4 */}
        <SectionTitle number={4} title="Verboden gebruik" />
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          Het is medewerkers verboden AI-systemen in te zetten voor:
        </p>
        <ul className="text-sm text-muted-foreground leading-relaxed space-y-1 list-disc list-inside">
          <li>Subliminale beïnvloeding of manipulatie van personen (Art. 5a)</li>
          <li>Social scoring of profilering van personen op basis van gedrag (Art. 5c)</li>
          <li>Biometrische identificatie in openbare ruimten (Art. 5h)</li>
          <li>Enig gebruik dat in strijd is met geldende wet- en regelgeving, waaronder de AVG</li>
        </ul>

        {/* 5 */}
        <SectionTitle number={5} title="AI-geletterdheid en training" />
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          Alle medewerkers die AI-systemen gebruiken zijn verplicht een door <Placeholder>[NAAM ORGANISATIE]</Placeholder>{" "}
          erkende AI-geletterdheidstoets te voltooien. Dit is een wettelijke verplichting op grond van Artikel 4 EU AI Act.
        </p>
        <ul className="text-sm text-muted-foreground leading-relaxed space-y-1 list-disc list-inside">
          <li>Erkende training: <Placeholder>[NAAM TRAINING, bijv. AIGA AI Literacy Practitioner]</Placeholder></li>
          <li>Uiterste datum voor certificering bestaande medewerkers: <Placeholder>[DATUM]</Placeholder></li>
          <li>Nieuwe medewerkers: certificering vereist binnen <Placeholder>[X]</Placeholder> weken na indiensttreding</li>
          <li>Certificaten worden bewaard in: <Placeholder>[HR-systeem/locatie]</Placeholder></li>
        </ul>

        {/* 6 */}
        <SectionTitle number={6} title="Menselijk toezicht" />
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          Voor hoog-risico AI-systemen wijst <Placeholder>[NAAM ORGANISATIE]</Placeholder> een verantwoordelijk persoon aan die:
        </p>
        <ul className="text-sm text-muted-foreground leading-relaxed space-y-1 list-disc list-inside mb-3">
          <li>Toezicht houdt op het functioneren van het systeem (Art. 26 lid 1)</li>
          <li>Bevoegd en opgeleid is om in te grijpen of het systeem te pauzeren (Art. 26 lid 2)</li>
          <li>Incidenten registreert en meldt conform Artikel 73</li>
        </ul>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border text-sm">
            <thead>
              <tr className="bg-accent/50">
                <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">AI-systeem</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">Verantwoordelijke</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">Functie</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">Contactgegevens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <PlaceholderCell>[SYSTEEM]</PlaceholderCell>
                <PlaceholderCell>[NAAM]</PlaceholderCell>
                <PlaceholderCell>[FUNCTIE]</PlaceholderCell>
                <PlaceholderCell>[EMAIL/TEL]</PlaceholderCell>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 7 */}
        <SectionTitle number={7} title="Dataverwerking en privacy" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          AI-systemen die persoonsgegevens verwerken, vallen onder het privacybeleid van{" "}
          <Placeholder>[NAAM ORGANISATIE]</Placeholder> en de AVG. Voor hoog-risico AI-systemen die persoonsgegevens
          verwerken wordt een DPIA uitgevoerd conform Art. 35 AVG.
        </p>

        {/* 8 */}
        <SectionTitle number={8} title="Incidentrapportage" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Medewerkers die een incident of onverwacht gedrag van een AI-systeem vaststellen, melden dit direct bij{" "}
          <Placeholder>[NAAM/AFDELING]</Placeholder> via <Placeholder>[KANAAL]</Placeholder>. Ernstige incidenten worden
          gemeld bij de leverancier en indien van toepassing bij de toezichthouder.
        </p>

        {/* 9 */}
        <SectionTitle number={9} title="Beleidsbeheer en review" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Dit beleid wordt minimaal jaarlijks herzien, of eerder bij significante wijzigingen in wet- en regelgeving of
          het AI-gebruik van de organisatie. Verantwoordelijk voor dit beleid:{" "}
          <Placeholder>[NAAM/FUNCTIE]</Placeholder>.
        </p>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground text-center space-y-1">
          <p className="font-semibold">AIGA Academy · aigeletterdheid.academy</p>
          <p>E-mail: aanvraag@aigeletterdheid.academy · Telefoon: +31 (0)10 316 7827</p>
          <p>Template door AIGA Academy · Pas aan naar jouw situatie · Geen juridisch advies</p>
        </footer>
      </div>
    </div>
  );
};

export default AiBeleidstemplate;
