export interface AiTool {
  name: string;
  vendor: string;
  category: string;
  risk: "Minimaal" | "Beperkt" | "Hoog";
  trainingRequired: boolean;
  note: string;
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

export const aiTools: AiTool[] = [
  // Generatieve AI
  { name: "ChatGPT (Free/Pro)", vendor: "OpenAI", category: "Generatieve AI", risk: "Beperkt", trainingRequired: true, note: "Transparantieverplichting bij klantcontact. Output herkennen en beoordelen is verplicht." },
  { name: "ChatGPT Enterprise", vendor: "OpenAI", category: "Generatieve AI", risk: "Beperkt", trainingRequired: true, note: "Zelfde als Free/Pro maar met extra dataverwerking. Verwerkersovereenkomst met OpenAI vereist." },
  { name: "Claude", vendor: "Anthropic", category: "Generatieve AI", risk: "Beperkt", trainingRequired: true, note: "Transparantieverplichting bij klantinteracties. Let op dataprivacy bij bedrijfsgevoelige info." },
  { name: "Google Gemini", vendor: "Google", category: "Generatieve AI", risk: "Beperkt", trainingRequired: true, note: "Extra aandacht bij klantcommunicatie en contentstrategie. Zelfde verplichtingen als ChatGPT." },
  { name: "Google Gemini for Workspace", vendor: "Google", category: "Generatieve AI", risk: "Beperkt", trainingRequired: true, note: "Geïntegreerd in Google Workspace. Medewerkers moeten weten wanneer AI-content gebruikt wordt." },
  { name: "Meta Llama (intern gebruik)", vendor: "Meta", category: "Generatieve AI", risk: "Beperkt", trainingRequired: true, note: "Open-source model, maar gebruiksverantwoordelijkheid ligt bij de organisatie zelf." },
  { name: "Mistral AI", vendor: "Mistral", category: "Generatieve AI", risk: "Beperkt", trainingRequired: true, note: "Frans open-weight model. Zelfde transparantieverplichtingen als andere LLMs." },
  { name: "Perplexity AI", vendor: "Perplexity", category: "Generatieve AI", risk: "Beperkt", trainingRequired: true, note: "AI-gestuurde zoekmachine. Medewerkers moeten bronnen altijd zelf verifiëren." },
  { name: "Grok", vendor: "xAI", category: "Generatieve AI", risk: "Beperkt", trainingRequired: true, note: "Geïntegreerd in X/Twitter. Zelfde transparantieverplichtingen als andere LLMs." },

  // Productiviteit
  { name: "Microsoft Copilot (M365)", vendor: "Microsoft", category: "Productiviteit", risk: "Beperkt", trainingRequired: true, note: "Risicocategorie afhankelijk van toepassing. In HR of finance: mogelijk hoog risico." },
  { name: "Microsoft Copilot Studio", vendor: "Microsoft", category: "Productiviteit", risk: "Hoog", trainingRequired: true, note: "Bouwen van autonome AI-agents. Organisatie wordt mede-aanbieder — extra verplichtingen." },
  { name: "Notion AI", vendor: "Notion", category: "Productiviteit", risk: "Beperkt", trainingRequired: true, note: "Intern gebruik met beperkt risico. Let op bij AI-gegenereerde beleidsdocumentatie." },
  { name: "Grammarly AI", vendor: "Grammarly", category: "Productiviteit", risk: "Beperkt", trainingRequired: true, note: "Schrijfassistent. Medewerkers moeten output kritisch evalueren, niet klakkeloos overnemen." },
  { name: "Otter.ai", vendor: "Otter", category: "Productiviteit", risk: "Beperkt", trainingRequired: true, note: "Automatische transcriptie. Deelnemers informeren dat AI meeschrijft is verplicht." },
  { name: "Fireflies.ai", vendor: "Fireflies", category: "Productiviteit", risk: "Beperkt", trainingRequired: true, note: "AI-vergadernotulen. Transparantie naar deelnemers vereist bij externe meetings." },
  { name: "Google Translate", vendor: "Google", category: "Productiviteit", risk: "Minimaal", trainingRequired: false, note: "Geen trainingsplicht, maar bewustzijn van beperkingen (nuance, vaktaal) is verstandig." },
  { name: "DeepL", vendor: "DeepL", category: "Productiviteit", risk: "Minimaal", trainingRequired: false, note: "Minimaal risico bij standaard vertaalwerk. Let op bij vertrouwelijke documenten." },
  { name: "Zapier AI / Make AI", vendor: "Zapier / Make", category: "Productiviteit", risk: "Beperkt", trainingRequired: true, note: "Geautomatiseerde workflows met AI-stappen. Medewerkers moeten outputs controleren." },

  // HR & Recruitment
  { name: "HireVue", vendor: "HireVue", category: "HR & Recruitment", risk: "Hoog", trainingRequired: true, note: "Bijlage III AI Act: AI-videobeoordelingen in werving zijn expliciet hoog risico. Documentatieplicht + menselijk toezicht verplicht." },
  { name: "Recruitee AI", vendor: "Recruitee", category: "HR & Recruitment", risk: "Hoog", trainingRequired: true, note: "AI-gestuurde kandidaatselectie valt onder hoog risico. HR moet beslissingen altijd zelf toetsen." },
  { name: "LinkedIn Talent AI", vendor: "LinkedIn", category: "HR & Recruitment", risk: "Hoog", trainingRequired: true, note: "AI-kandidaatranking = hoog risico. Transparantie naar kandidaten over gebruik van AI vereist." },
  { name: "Textkernel", vendor: "Textkernel", category: "HR & Recruitment", risk: "Hoog", trainingRequired: true, note: "CV-parsing en matching. Risico op bias; auditverplichtingen gelden bij hoog-risico HR-AI." },
  { name: "Teamtailor AI", vendor: "Teamtailor", category: "HR & Recruitment", risk: "Hoog", trainingRequired: true, note: "AI-functies in ATS voor kandidaatbeoordeling. Menselijk toezicht bij alle selectiebeslissingen verplicht." },
  { name: "15Five AI", vendor: "15Five", category: "HR & Recruitment", risk: "Beperkt", trainingRequired: true, note: "AI-gestuurde performance reviews. Medewerkers moeten weten dat AI-inzichten meewegen." },
  { name: "Leapsome AI", vendor: "Leapsome", category: "HR & Recruitment", risk: "Beperkt", trainingRequired: true, note: "HR-platform met AI-feedback. Transparantie naar medewerkers over hoe AI-analyses tot stand komen." },

  // Marketing & Sales
  { name: "Salesforce Einstein AI", vendor: "Salesforce", category: "Marketing & Sales", risk: "Beperkt", trainingRequired: true, note: "Bij klantscoring of churnpredictie: transparantie naar klanten vereist." },
  { name: "HubSpot AI", vendor: "HubSpot", category: "Marketing & Sales", risk: "Beperkt", trainingRequired: true, note: "AI-gegenereerde e-mails en contentaanbevelingen. Medewerkers verantwoordelijk voor eindredactie." },
  { name: "Midjourney", vendor: "Midjourney", category: "Marketing & Sales", risk: "Beperkt", trainingRequired: true, note: "AI-beelden moeten herkenbaar zijn als AI bij extern gebruik. Auteursrechtvraagstukken spelen mee." },
  { name: "DALL-E / Adobe Firefly", vendor: "OpenAI / Adobe", category: "Marketing & Sales", risk: "Beperkt", trainingRequired: true, note: "Adobe Firefly is relatief veilig qua auteursrecht door trainingsdataset. Labeling bij extern gebruik verplicht." },
  { name: "Jasper AI", vendor: "Jasper", category: "Marketing & Sales", risk: "Beperkt", trainingRequired: true, note: "AI-contentgeneratie voor marketing. Feitenchecks blijven menselijke verantwoordelijkheid." },
  { name: "LinkedIn Ads AI", vendor: "LinkedIn", category: "Marketing & Sales", risk: "Beperkt", trainingRequired: true, note: "Geautomatiseerde targeting op basis van profieldata. Transparantie-eisen gelden voor adverteerders." },
  { name: "Persado", vendor: "Persado", category: "Marketing & Sales", risk: "Beperkt", trainingRequired: true, note: "AI-gegenereerde marketingteksten. Bij groot bereik: transparantieverplichting over AI-gebruik." },
  { name: "Recently / Pencil AI", vendor: "Divers", category: "Marketing & Sales", risk: "Beperkt", trainingRequired: true, note: "AI-advertentiegeneratie. Creatief team blijft verantwoordelijk voor compliance van uitingen." },

  // Finance & Legal
  { name: "AI creditscoring (bijv. FICO)", vendor: "FICO / divers", category: "Finance & Legal", risk: "Hoog", trainingRequired: true, note: "Expliciet in Bijlage III. Zwaarste verplichtingen: registratie EU-database, menselijk toezicht verplicht." },
  { name: "Workiva AI", vendor: "Workiva", category: "Finance & Legal", risk: "Beperkt", trainingRequired: true, note: "AI-rapportage voor finance en compliance. Medewerkers verantwoordelijk voor validatie van outputs." },
  { name: "Harvey AI (legal)", vendor: "Harvey", category: "Finance & Legal", risk: "Hoog", trainingRequired: true, note: "AI voor juridisch advies en contractanalyse. Bij gebruik in beslissingen met rechtsgevolgen: hoog risico." },
  { name: "Luminance (legal AI)", vendor: "Luminance", category: "Finance & Legal", risk: "Hoog", trainingRequired: true, note: "Contract review door AI. Juridische professionals blijven eindverantwoordelijk voor beoordeling." },
  { name: "Kira Systems", vendor: "Kira", category: "Finance & Legal", risk: "Hoog", trainingRequired: true, note: "Documentextractie in juridische en financiële context. Menselijk toezicht verplicht." },
  { name: "Darktrace (cybersecurity AI)", vendor: "Darktrace", category: "Finance & Legal", risk: "Hoog", trainingRequired: true, note: "Autonome beslissingen in securitycontext. Valt onder kritieke infrastructuurbescherming in Bijlage III." },

  // Zorg & Veiligheid
  { name: "IBM Watson (zorg/krediet)", vendor: "IBM", category: "Zorg & Veiligheid", risk: "Hoog", trainingRequired: true, note: "Medische triage of kredietbeoordeling: zwaarste verplichtingen. Conformiteitsverklaring vereist." },
  { name: "Babylon Health AI", vendor: "Babylon", category: "Zorg & Veiligheid", risk: "Hoog", trainingRequired: true, note: "AI-triage en symptoomchecker. Medische beslissingsondersteuning = altijd hoog risico." },
  { name: "Aidoc (medische beeldanalyse)", vendor: "Aidoc", category: "Zorg & Veiligheid", risk: "Hoog", trainingRequired: true, note: "Radiologie-AI valt onder Bijlage III. CE-markering én AI Act nalevingsvereisten van toepassing." },
  { name: "Verkeersveiligheidssystemen AI", vendor: "Divers", category: "Zorg & Veiligheid", risk: "Hoog", trainingRequired: true, note: "Veiligheidsinfrastructuur = hoog risico. Overheidsorganisaties hebben extra documentatieplicht." },

  // Developer tools
  { name: "GitHub Copilot", vendor: "Microsoft", category: "Developer tools", risk: "Beperkt", trainingRequired: true, note: "Developers moeten gegenereerde code beoordelen op veiligheid. Auteursrecht van output is aandachtspunt." },
  { name: "Tabnine", vendor: "Tabnine", category: "Developer tools", risk: "Beperkt", trainingRequired: true, note: "Privacy-vriendelijker dan Copilot (on-premise optie). Zelfde evaluatieplicht voor output." },
  { name: "Cursor AI", vendor: "Cursor", category: "Developer tools", risk: "Beperkt", trainingRequired: true, note: "AI-first code editor. Developers verantwoordelijk voor veiligheid en correctheid van AI-code." },
  { name: "Replit Ghostwriter", vendor: "Replit", category: "Developer tools", risk: "Minimaal", trainingRequired: false, note: "Educatieve context, minimaal risico. Geen trainingsplicht, wel bewustzijn over codekwaliteit." },
  { name: "Codeium / Windsurf", vendor: "Codeium", category: "Developer tools", risk: "Beperkt", trainingRequired: true, note: "Gratis Copilot-alternatief. Zelfde verplichtingen: developers beoordelen alle gegenereerde output." },

  // Data & Analytics
  { name: "Tableau AI / Einstein Analytics", vendor: "Salesforce", category: "Data & Analytics", risk: "Beperkt", trainingRequired: true, note: "AI-inzichten in data-analyse. Bij gebruik in kritieke bedrijfsbeslissingen: hogere aandacht vereist." },
  { name: "Power BI Copilot", vendor: "Microsoft", category: "Data & Analytics", risk: "Beperkt", trainingRequired: true, note: "AI-gestuurde rapportage. Medewerkers moeten AI-gegenereerde inzichten altijd valideren." },
  { name: "DataRobot", vendor: "DataRobot", category: "Data & Analytics", risk: "Hoog", trainingRequired: true, note: "AutoML platform. Hoog risico bij inzet in HR, finance of zorg." },
  { name: "Palantir AIP", vendor: "Palantir", category: "Data & Analytics", risk: "Hoog", trainingRequired: true, note: "Veelgebruikt bij overheid en defensie. Beslissingsondersteunende AI met grote impact = hoog risico." },
  { name: "Qlik Sense AI", vendor: "Qlik", category: "Data & Analytics", risk: "Beperkt", trainingRequired: true, note: "Business intelligence met AI-aanbevelingen. Menselijke validatie van inzichten altijd vereist." },

  // Communicatie
  { name: "Intercom AI (Fin)", vendor: "Intercom", category: "Communicatie", risk: "Beperkt", trainingRequired: true, note: "AI-chatbot voor klantenservice. Klanten moeten weten dat ze met AI communiceren." },
  { name: "Zendesk AI", vendor: "Zendesk", category: "Communicatie", risk: "Beperkt", trainingRequired: true, note: "AI-ticket routing en antwoordsuggesties. Transparantie bij volledig geautomatiseerde klantrespons vereist." },
  { name: "Synthesia", vendor: "Synthesia", category: "Communicatie", risk: "Beperkt", trainingRequired: true, note: "AI-gegenereerde video met avatars. Bij extern gebruik: duidelijk labelen als AI-video." },
  { name: "ElevenLabs", vendor: "ElevenLabs", category: "Communicatie", risk: "Beperkt", trainingRequired: true, note: "AI-stemgeneratie. Deepfake-risico bij misbruik; transparantie-eis bij professioneel gebruik." },
  { name: "Spotify / Netflix aanbevelingen", vendor: "Divers", category: "Communicatie", risk: "Minimaal", trainingRequired: false, note: "Consumentenapps buiten professionele context vallen buiten scope Artikel 4 voor werkgevers." },
];
