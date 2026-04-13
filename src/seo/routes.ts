const BASE = "https://aigeletterdheid.academy";

export interface RouteMeta {
  title: string;
  description: string;
  ogImage: string;
}

const routes: Record<string, RouteMeta> = {
  "/": {
    title: "AI Geletterdheid Academy | EU AI Act Training voor Organisaties",
    description: "Bereid je organisatie voor op de EU AI Act. Praktische AI-trainingen en certificering voor teams, managers en bestuurders.",
    ogImage: `${BASE}/og/home.jpg`,
  },
  "/training": {
    title: "AI Training | AI Geletterdheid Academy",
    description: "Praktische AI-trainingen voor organisaties. Van bewustwording tot certificering — voor elk niveau en elke sector.",
    ogImage: `${BASE}/og/training.jpg`,
  },
  "/masterclass": {
    title: "AI Masterclass | AI Geletterdheid Academy",
    description: "Een intensieve masterclass over AI-geletterdheid en de EU AI Act. Voor managers, bestuurders en besluitvormers.",
    ogImage: `${BASE}/og/masterclass.jpg`,
  },
  "/kenniscentrum": {
    title: "Kenniscentrum | AI Geletterdheid Academy",
    description: "Alles wat je moet weten over AI-geletterdheid en de EU AI Act. Artikelen, uitleg en praktische gidsen.",
    ogImage: `${BASE}/og/kenniscentrum.jpg`,
  },
  "/tools": {
    title: "AI Tools | AI Geletterdheid Academy",
    description: "Gratis tools om je AI-gereedheid te testen. Ontdek waar je organisatie staat met de EU AI Act.",
    ogImage: `${BASE}/og/tools.jpg`,
  },
  "/over-aiga": {
    title: "Over AIGA | AI Geletterdheid Academy",
    description: "Wie zijn wij? De AI Geletterdheid Academy helpt Nederlandse organisaties klaar te zijn voor de EU AI Act.",
    ogImage: `${BASE}/og/over-aiga.jpg`,
  },
  "/gereedheidscan": {
    title: "AI Gereedheidscan | Hoe AI-ready is jouw organisatie?",
    description: "Doe de gratis AI Gereedheidscan en ontdek in 10 minuten hoe jouw organisatie scoort op de EU AI Act vereisten.",
    ogImage: `${BASE}/og/gereedheidscan.jpg`,
  },
  "/contact": {
    title: "Contact | AI Geletterdheid Academy",
    description: "Neem contact op met de AI Geletterdheid Academy. We helpen je graag op weg met AI-training en EU AI Act compliance.",
    ogImage: `${BASE}/og/contact.jpg`,
  },
  "/faq": {
    title: "Veelgestelde Vragen | AI Geletterdheid Academy",
    description: "Antwoorden op de meest gestelde vragen over AI-geletterdheid, de EU AI Act en onze trainingen.",
    ogImage: `${BASE}/og/faq.jpg`,
  },
  "/speakers-academy": {
    title: "Speakers Academy | AI Geletterdheid Academy",
    description: "Ferry Hoes is beschikbaar als keynote spreker over AI-geletterdheid en de EU AI Act via Speakers Academy.",
    ogImage: `${BASE}/og/speakers-academy.jpg`,
  },
};

export default routes;
