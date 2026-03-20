import {
  Users,
  BarChart3,
  MessageSquare,
  CreditCard,
  Shield,
  Scale,
  HeartPulse,
  ScanLine,
  Building2,
  Palette,
  Headphones,
  AlertTriangle,
  Code,
  PieChart,
  FileText,
  Mic,
  Languages,
  Image,
  Share2,
  Landmark,
  type LucideIcon,
} from "lucide-react";

export interface UseCase {
  id: string;
  label: string;
  sector: string;
  icon: LucideIcon;
}

export const useCases: UseCase[] = [
  { id: "cv-screening", label: "CV's beoordelen of kandidaten selecteren", sector: "HR", icon: Users },
  { id: "performance", label: "Prestatiebeoordeling of promotieadvies", sector: "HR", icon: BarChart3 },
  { id: "recruitment-interview", label: "Sollicitatiegesprekken analyseren", sector: "HR", icon: MessageSquare },
  { id: "credit-scoring", label: "Kredietwaardigheid beoordelen", sector: "Finance", icon: CreditCard },
  { id: "insurance-pricing", label: "Verzekeringspremies bepalen", sector: "Finance", icon: Shield },
  { id: "legal-decisions", label: "Juridische adviezen of contractbeoordeling", sector: "Legal", icon: Scale },
  { id: "medical-triage", label: "Medische triage of symptoomanalyse", sector: "Zorg", icon: HeartPulse },
  { id: "medical-imaging", label: "Medische beeldanalyse", sector: "Zorg", icon: ScanLine },
  { id: "critical-infra", label: "Beheer van kritieke infrastructuur", sector: "Veiligheid", icon: Building2 },
  { id: "content-marketing", label: "Content maken voor marketing", sector: "Marketing", icon: Palette },
  { id: "customer-service", label: "Klantenservice of chatbot", sector: "Communicatie", icon: Headphones },
  { id: "fraud-detection", label: "Fraudedetectie", sector: "Finance", icon: AlertTriangle },
  { id: "code-generation", label: "Code schrijven of reviewen", sector: "Development", icon: Code },
  { id: "data-analysis", label: "Data-analyse en rapportage", sector: "Analytics", icon: PieChart },
  { id: "internal-docs", label: "Interne documenten of beleid opstellen", sector: "Productiviteit", icon: FileText },
  { id: "meeting-transcription", label: "Vergaderingen transcriberen of samenvatten", sector: "Productiviteit", icon: Mic },
  { id: "translation", label: "Vertalen van teksten", sector: "Productiviteit", icon: Languages },
  { id: "image-generation", label: "Afbeeldingen genereren", sector: "Marketing", icon: Image },
  { id: "social-media", label: "Social media content maken", sector: "Marketing", icon: Share2 },
  { id: "benefits-decisions", label: "Beslissingen over uitkeringen of toeslagen", sector: "Overheid", icon: Landmark },
];

const allExceptMedImgAndInfra = useCases
  .filter((uc) => uc.id !== "medical-imaging" && uc.id !== "critical-infra")
  .map((uc) => uc.id);

const allUseCaseIds = useCases.map((uc) => uc.id);

export const toolUseCaseMap: Record<string, string[]> = {
  // Generatieve AI
  "ChatGPT (Free/Pro)": allExceptMedImgAndInfra,
  "ChatGPT Enterprise": allExceptMedImgAndInfra,
  "Claude (Anthropic)": allExceptMedImgAndInfra,
  "Google Gemini": allExceptMedImgAndInfra,
  "Google Gemini for Workspace": allExceptMedImgAndInfra,
  "Meta Llama (intern gebruik)": allExceptMedImgAndInfra,
  "Mistral AI": allExceptMedImgAndInfra,
  "Perplexity AI": allExceptMedImgAndInfra,
  "Grok (xAI)": allExceptMedImgAndInfra,

  // Productiviteit
  "Microsoft Copilot (M365)": ["cv-screening", "performance", "internal-docs", "meeting-transcription", "data-analysis", "legal-decisions", "content-marketing"],
  "Microsoft Copilot Studio": allUseCaseIds,
  "Notion AI": ["internal-docs", "content-marketing", "meeting-transcription", "social-media"],
  "Grammarly AI": ["content-marketing", "internal-docs", "social-media", "legal-decisions"],
  "Otter.ai": ["meeting-transcription", "recruitment-interview"],
  "Fireflies.ai": ["meeting-transcription", "recruitment-interview"],
  "Google Translate": ["translation", "internal-docs", "legal-decisions"],
  "DeepL": ["translation", "internal-docs", "legal-decisions"],
  "Zapier AI / Make AI": allUseCaseIds,

  // HR & Recruitment
  "HireVue": ["cv-screening", "recruitment-interview", "performance"],
  "Recruitee AI": ["cv-screening", "recruitment-interview", "performance"],
  "LinkedIn Talent AI": ["cv-screening", "recruitment-interview", "performance"],
  "Textkernel": ["cv-screening", "recruitment-interview", "performance"],
  "Teamtailor AI": ["cv-screening", "recruitment-interview", "performance"],
  "15Five AI": ["performance", "internal-docs"],
  "Leapsome AI": ["performance", "internal-docs"],

  // Marketing & Sales
  "Salesforce Einstein AI": ["credit-scoring", "customer-service", "fraud-detection", "data-analysis"],
  "HubSpot AI": ["content-marketing", "customer-service", "social-media", "data-analysis"],
  "Midjourney": ["image-generation", "content-marketing", "social-media"],
  "DALL-E / Adobe Firefly": ["image-generation", "content-marketing", "social-media"],
  "Jasper AI": ["content-marketing", "social-media"],
  "LinkedIn Ads AI": ["social-media", "content-marketing"],
  "Persado": ["content-marketing", "social-media"],
  "Pencil AI": ["content-marketing", "social-media"],

  // Finance & Legal
  "AI creditscoring (bijv. FICO)": ["credit-scoring", "insurance-pricing", "benefits-decisions"],
  "Workiva AI": ["data-analysis", "legal-decisions", "internal-docs"],
  "Harvey AI": ["legal-decisions"],
  "Luminance": ["legal-decisions"],
  "Kira Systems": ["legal-decisions"],
  "Darktrace": ["critical-infra", "fraud-detection"],

  // Zorg & Veiligheid
  "IBM Watson (zorg)": ["medical-triage", "medical-imaging"],
  "Babylon Health AI": ["medical-triage", "medical-imaging"],
  "Aidoc": ["medical-triage", "medical-imaging"],
  "Verkeersveiligheidssystemen AI": ["critical-infra"],

  // Developer tools
  "GitHub Copilot": ["code-generation"],
  "Tabnine": ["code-generation"],
  "Cursor AI": ["code-generation"],
  "Replit Ghostwriter": ["code-generation"],
  "Codeium / Windsurf": ["code-generation"],

  // Data & Analytics
  "Tableau AI": ["data-analysis"],
  "Power BI Copilot": ["data-analysis"],
  "DataRobot": allUseCaseIds,
  "Palantir AIP": ["data-analysis", "benefits-decisions", "critical-infra", "cv-screening"],
  "Qlik Sense AI": ["data-analysis"],

  // Communicatie
  "Intercom AI (Fin)": ["customer-service"],
  "Zendesk AI": ["customer-service"],
  "Synthesia": ["content-marketing", "social-media", "customer-service"],
  "ElevenLabs": ["content-marketing", "social-media", "customer-service"],
  "Spotify / Netflix aanbevelingen": [],
};

export const highRiskUseCases = new Set([
  "cv-screening",
  "recruitment-interview",
  "performance",
  "credit-scoring",
  "insurance-pricing",
  "legal-decisions",
  "medical-triage",
  "medical-imaging",
  "critical-infra",
  "benefits-decisions",
]);

export const annexCategory: Record<string, string> = {
  "cv-screening": "Werkgelegenheid en personeelsbeheer (Bijlage III, punt 4)",
  "recruitment-interview": "Werkgelegenheid en personeelsbeheer (Bijlage III, punt 4)",
  "performance": "Werkgelegenheid en personeelsbeheer (Bijlage III, punt 4)",
  "credit-scoring": "Toegang tot essentiële private diensten (Bijlage III, punt 5)",
  "insurance-pricing": "Toegang tot essentiële private diensten (Bijlage III, punt 5)",
  "legal-decisions": "Rechtsbedeling en democratische processen (Bijlage III, punt 8)",
  "medical-triage": "Toegang tot essentiële diensten — gezondheidszorg (Bijlage III, punt 5)",
  "medical-imaging": "Toegang tot essentiële diensten — gezondheidszorg (Bijlage III, punt 5)",
  "critical-infra": "Kritieke infrastructuur (Bijlage III, punt 2)",
  "benefits-decisions": "Toegang tot publieke diensten en uitkeringen (Bijlage III, punt 5)",
};

export const outOfScopeTools = ["Spotify / Netflix aanbevelingen"];

export const alwaysHighRiskTools = ["Microsoft Copilot Studio", "DataRobot", "Palantir AIP"];
