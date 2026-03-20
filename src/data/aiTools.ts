export interface AiTool {
  name: string;
  vendor: string;
  category: string;
  type: "GPAI" | "Gespecialiseerd" | "Gespecialiseerd HR" | "Gespecialiseerd Finance" | "Gespecialiseerd Legal" | "Gespecialiseerd Zorg" | "Platform/Agent";
  defaultCategory: "Minimaal risico" | "Beperkt risico" | "Hoog risico (altijd)";
  highRiskWhen: string;
  trainingRequired: true;
}

export const AI_CATEGORIES = [
  "Generatieve AI",
  "Productiviteit",
  "HR & Recruitment",
  "Marketing & Sales",
  "Finance & Legal",
  "Zorg & Veiligheid",
  "Developer tools",
  "Data & Analytics",
  "Communicatie",
] as const;

export const TYPE_FILTERS = [
  "Alle tools",
  "GPAI",
  "Gespecialiseerd HR",
  "Gespecialiseerd Finance/Legal",
  "Gespecialiseerd Zorg",
  "Platform/Agent",
] as const;

export const aiTools: AiTool[] = [
  // Generatieve AI
  { name: "ChatGPT (Free/Pro)", vendor: "OpenAI", category: "Generatieve AI", type: "GPAI", defaultCategory: "Beperkt risico", highRiskWhen: "CV-screening, medische adviezen aan patiënten, kredietbeoordelingen, beslissingen over uitkeringen", trainingRequired: true },
  { name: "ChatGPT Enterprise", vendor: "OpenAI", category: "Generatieve AI", type: "GPAI", defaultCategory: "Beperkt risico", highRiskWhen: "Zelfde als Free/Pro. Let op: geen GDPR-dekking tenzij DPA getekend — gebruik voor vertrouwelijke bedrijfsdata is risicovol", trainingRequired: true },
  { name: "Claude (Anthropic)", vendor: "Anthropic", category: "Generatieve AI", type: "GPAI", defaultCategory: "Beperkt risico", highRiskWhen: "CV-screening, juridische beslissingsondersteuning, medische triage, kredietadvies", trainingRequired: true },
  { name: "Google Gemini", vendor: "Google", category: "Generatieve AI", type: "GPAI", defaultCategory: "Beperkt risico", highRiskWhen: "Zelfde use cases als ChatGPT. Bij inzet in HR-processen of financiële beslissingen: hoog risico", trainingRequired: true },
  { name: "Google Gemini for Workspace", vendor: "Google", category: "Generatieve AI", type: "GPAI", defaultCategory: "Beperkt risico", highRiskWhen: "Wanneer geïntegreerd in HR-workflows of beslissingsprocessen met impact op medewerkers", trainingRequired: true },
  { name: "Meta Llama (intern gebruik)", vendor: "Meta", category: "Generatieve AI", type: "GPAI", defaultCategory: "Beperkt risico", highRiskWhen: "Zodra ingezet voor Bijlage III use cases: werving, krediet, zorg. Organisatie draagt zelf volledige verantwoordelijkheid", trainingRequired: true },
  { name: "Mistral AI", vendor: "Mistral", category: "Generatieve AI", type: "GPAI", defaultCategory: "Beperkt risico", highRiskWhen: "Zelfde als andere GPAI-modellen. Open-weight: organisatie wordt zelf deployer met bijbehorende plichten", trainingRequired: true },
  { name: "Perplexity AI", vendor: "Perplexity", category: "Generatieve AI", type: "GPAI", defaultCategory: "Beperkt risico", highRiskWhen: "Bij gebruik voor medische of juridische beslissingen met directe impact op personen", trainingRequired: true },
  { name: "Grok (xAI)", vendor: "xAI", category: "Generatieve AI", type: "GPAI", defaultCategory: "Beperkt risico", highRiskWhen: "Zelfde als andere GPAI-modellen. Beperkte GDPR-garanties — zakelijk gebruik vereist aandacht", trainingRequired: true },

  // Productiviteit
  { name: "Microsoft Copilot (M365)", vendor: "Microsoft", category: "Productiviteit", type: "GPAI", defaultCategory: "Beperkt risico", highRiskWhen: "Gebruik in HR-beoordelingen, financiële beslissingen of processen met impact op arbeidsrechtelijke positie medewerkers", trainingRequired: true },
  { name: "Microsoft Copilot Studio", vendor: "Microsoft", category: "Productiviteit", type: "Platform/Agent", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd: door agents te bouwen wordt de organisatie juridisch mede-aanbieder van een AI-systeem", trainingRequired: true },
  { name: "Notion AI", vendor: "Notion", category: "Productiviteit", type: "GPAI", defaultCategory: "Beperkt risico", highRiskWhen: "Wanneer AI-output direct gebruikt wordt in beleidsdocumenten die rechten of arbeidsomstandigheden van medewerkers beïnvloeden", trainingRequired: true },
  { name: "Grammarly AI", vendor: "Grammarly", category: "Productiviteit", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Zelden hoog risico — tenzij ingezet voor het opstellen van juridisch bindende documenten zonder menselijke review", trainingRequired: true },
  { name: "Otter.ai", vendor: "Otter", category: "Productiviteit", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Bij transcriptie van vertrouwelijke HR-gesprekken of juridische besprekingen waar beslissingen uit voortvloeien", trainingRequired: true },
  { name: "Fireflies.ai", vendor: "Fireflies", category: "Productiviteit", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Bij gebruik in sollicitatiegesprekken als basis voor selectiebeslissingen: hoog risico (Bijlage III werving)", trainingRequired: true },
  { name: "Google Translate", vendor: "Google", category: "Productiviteit", type: "Gespecialiseerd", defaultCategory: "Minimaal risico", highRiskWhen: "Bij vertaling van medische instructies of juridische documenten met directe impact op rechten van personen", trainingRequired: true },
  { name: "DeepL", vendor: "DeepL", category: "Productiviteit", type: "Gespecialiseerd", defaultCategory: "Minimaal risico", highRiskWhen: "Zelfde als Google Translate. Minimaal risico bij standaard zakelijk gebruik", trainingRequired: true },
  { name: "Zapier AI / Make AI", vendor: "Zapier / Make", category: "Productiviteit", type: "Platform/Agent", defaultCategory: "Beperkt risico", highRiskWhen: "Wanneer geautomatiseerde workflows beslissingen nemen over medewerkers, klanten of uitkeringen zonder menselijke tussenkomst", trainingRequired: true },

  // HR & Recruitment
  { name: "HireVue", vendor: "HireVue", category: "HR & Recruitment", type: "Gespecialiseerd HR", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd: speciaal gebouwd voor AI-gestuurde beoordeling van kandidaten — expliciet in Bijlage III", trainingRequired: true },
  { name: "Recruitee AI", vendor: "Recruitee", category: "HR & Recruitment", type: "Gespecialiseerd HR", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd: AI-kandidaatselectie valt per definitie onder Bijlage III werkgelegenheid", trainingRequired: true },
  { name: "LinkedIn Talent AI", vendor: "LinkedIn", category: "HR & Recruitment", type: "Gespecialiseerd HR", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd: AI-ranking van kandidaten met impact op aannamebeslissingen = Bijlage III", trainingRequired: true },
  { name: "Textkernel", vendor: "Textkernel", category: "HR & Recruitment", type: "Gespecialiseerd HR", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd: CV-parsing en matching voor selectiedoeleinden = Bijlage III. Extra risico op discriminatoire bias", trainingRequired: true },
  { name: "Teamtailor AI", vendor: "Teamtailor", category: "HR & Recruitment", type: "Gespecialiseerd HR", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd: ATS met AI-selectiefuncties valt onder werkgelegenheid Bijlage III", trainingRequired: true },
  { name: "15Five AI", vendor: "15Five", category: "HR & Recruitment", type: "Gespecialiseerd HR", defaultCategory: "Beperkt risico", highRiskWhen: "Wanneer AI-scores direct leiden tot beslissingen over promotie, beloning of ontslag", trainingRequired: true },
  { name: "Leapsome AI", vendor: "Leapsome", category: "HR & Recruitment", type: "Gespecialiseerd HR", defaultCategory: "Beperkt risico", highRiskWhen: "Wanneer AI-analyses input zijn voor beoordelingsgesprekken met arbeidsrechtelijke gevolgen", trainingRequired: true },

  // Marketing & Sales
  { name: "Salesforce Einstein AI", vendor: "Salesforce", category: "Marketing & Sales", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Wanneer kredietscoring of verzekeringsrisico-inschatting via AI plaatsvindt: hoog risico Bijlage III", trainingRequired: true },
  { name: "HubSpot AI", vendor: "HubSpot", category: "Marketing & Sales", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Zelden hoog risico in marketingcontext — tenzij gepersonaliseerde prijsstelling voor essentiële diensten", trainingRequired: true },
  { name: "Midjourney", vendor: "Midjourney", category: "Marketing & Sales", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Zelden hoog risico. Transparantieverplichting: AI-gegenereerde beelden labelen bij extern gebruik", trainingRequired: true },
  { name: "DALL-E / Adobe Firefly", vendor: "OpenAI / Adobe", category: "Marketing & Sales", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Zelden hoog risico. Adobe Firefly heeft betere auteursrechtpositie dan DALL-E", trainingRequired: true },
  { name: "Jasper AI", vendor: "Jasper", category: "Marketing & Sales", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Zelden hoog risico in marketingcontext", trainingRequired: true },
  { name: "LinkedIn Ads AI", vendor: "LinkedIn", category: "Marketing & Sales", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Bij microtargeting op basis van gevoelige kenmerken (gezondheid, politieke voorkeur)", trainingRequired: true },
  { name: "Persado", vendor: "Persado", category: "Marketing & Sales", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Bij gepersonaliseerde communicatie over financiële producten of verzekeringen", trainingRequired: true },
  { name: "Pencil AI", vendor: "Pencil", category: "Marketing & Sales", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Zelden hoog risico in standaard advertentiecontext", trainingRequired: true },

  // Finance & Legal
  { name: "AI creditscoring (bijv. FICO)", vendor: "FICO / divers", category: "Finance & Legal", type: "Gespecialiseerd Finance", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd: kredietbeoordeling is expliciet benoemd in Bijlage III essentiële diensten", trainingRequired: true },
  { name: "Workiva AI", vendor: "Workiva", category: "Finance & Legal", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Bij gebruik in compliance-rapportages die direct leiden tot besluiten met rechtsgevolgen", trainingRequired: true },
  { name: "Harvey AI", vendor: "Harvey", category: "Finance & Legal", type: "Gespecialiseerd Legal", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd bij gebruik in juridische beslissingen: rechtsbedeling is Bijlage III categorie", trainingRequired: true },
  { name: "Luminance", vendor: "Luminance", category: "Finance & Legal", type: "Gespecialiseerd Legal", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd bij contractreview met rechtsgevolgen. Menselijk toezicht verplicht bij alle conclusies", trainingRequired: true },
  { name: "Kira Systems", vendor: "Kira", category: "Finance & Legal", type: "Gespecialiseerd Legal", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd bij juridische of financiële documentextractie voor beslissingen", trainingRequired: true },
  { name: "Darktrace", vendor: "Darktrace", category: "Finance & Legal", type: "Gespecialiseerd", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd: autonoom handelende cybersecurity-AI in kritieke infrastructuur = Bijlage III", trainingRequired: true },

  // Zorg & Veiligheid
  { name: "IBM Watson (zorg)", vendor: "IBM", category: "Zorg & Veiligheid", type: "Gespecialiseerd Zorg", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd bij medische triage of beslissingsondersteuning: Bijlage III toegang tot essentiële diensten", trainingRequired: true },
  { name: "Babylon Health AI", vendor: "Babylon", category: "Zorg & Veiligheid", type: "Gespecialiseerd Zorg", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd: AI-triage en symptoomchecker met medische impact = hoog risico", trainingRequired: true },
  { name: "Aidoc", vendor: "Aidoc", category: "Zorg & Veiligheid", type: "Gespecialiseerd Zorg", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd: radiologie-AI is ook medisch hulpmiddel — zowel MDR als AI Act verplichtingen", trainingRequired: true },
  { name: "Verkeersveiligheidssystemen AI", vendor: "Divers", category: "Zorg & Veiligheid", type: "Gespecialiseerd", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd: kritieke infrastructuur = Bijlage III", trainingRequired: true },

  // Developer tools
  { name: "GitHub Copilot", vendor: "Microsoft", category: "Developer tools", type: "GPAI", defaultCategory: "Beperkt risico", highRiskWhen: "Wanneer gegenereerde code ingezet wordt in medische systemen, veiligheidssystemen of kritieke infrastructuur", trainingRequired: true },
  { name: "Tabnine", vendor: "Tabnine", category: "Developer tools", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Zelfde als GitHub Copilot — context van inzet bepaalt risicocategorie", trainingRequired: true },
  { name: "Cursor AI", vendor: "Cursor", category: "Developer tools", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Zelfde als GitHub Copilot", trainingRequired: true },
  { name: "Replit Ghostwriter", vendor: "Replit", category: "Developer tools", type: "Gespecialiseerd", defaultCategory: "Minimaal risico", highRiskWhen: "Bij professionele inzet in productiesystemen met impact op gezondheid of veiligheid", trainingRequired: true },
  { name: "Codeium / Windsurf", vendor: "Codeium", category: "Developer tools", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Zelfde als GitHub Copilot", trainingRequired: true },

  // Data & Analytics
  { name: "Tableau AI", vendor: "Salesforce", category: "Data & Analytics", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Wanneer AI-inzichten direct leiden tot beslissingen over medewerkers, klanten of uitkeringen", trainingRequired: true },
  { name: "Power BI Copilot", vendor: "Microsoft", category: "Data & Analytics", type: "GPAI", defaultCategory: "Beperkt risico", highRiskWhen: "Zelfde als Tableau AI — context van gebruik bepaalt categorie", trainingRequired: true },
  { name: "DataRobot", vendor: "DataRobot", category: "Data & Analytics", type: "Platform/Agent", defaultCategory: "Beperkt risico", highRiskWhen: "Hoog risico zodra ingezet in HR, krediet of zorg — AutoML bouwt feitelijk een nieuw AI-systeem", trainingRequired: true },
  { name: "Palantir AIP", vendor: "Palantir", category: "Data & Analytics", type: "Platform/Agent", defaultCategory: "Hoog risico (altijd)", highRiskWhen: "Altijd bij overheid en defensie: beslissingsondersteuning in kritieke contexten = Bijlage III", trainingRequired: true },
  { name: "Qlik Sense AI", vendor: "Qlik", category: "Data & Analytics", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Bij AI-gestuurde beslissingen over medewerkers of klanten in gereguleerde sectoren", trainingRequired: true },

  // Communicatie
  { name: "Intercom AI (Fin)", vendor: "Intercom", category: "Communicatie", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Bij volledig geautomatiseerde beslissingen over toegang tot diensten of financiële producten", trainingRequired: true },
  { name: "Zendesk AI", vendor: "Zendesk", category: "Communicatie", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Zelfde als Intercom — transparantieverplichting geldt altijd bij klantcontact", trainingRequired: true },
  { name: "Synthesia", vendor: "Synthesia", category: "Communicatie", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Bij gebruik in politieke communicatie of bewust misleidende deepfake-toepassingen", trainingRequired: true },
  { name: "ElevenLabs", vendor: "ElevenLabs", category: "Communicatie", type: "Gespecialiseerd", defaultCategory: "Beperkt risico", highRiskWhen: "Bij gebruik voor het nabootsen van stemmen zonder toestemming of in misleidende context", trainingRequired: true },
  { name: "Spotify / Netflix aanbevelingen", vendor: "Divers", category: "Communicatie", type: "Gespecialiseerd", defaultCategory: "Minimaal risico", highRiskWhen: "Buiten scope voor werkgevers — consumentenapps in privécontext", trainingRequired: true },
];
