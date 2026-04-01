import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import CookieBanner from "@/components/CookieBanner";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Training from "./pages/Training";
import Masterclass from "./pages/Masterclass";
import Kenniscentrum from "./pages/Kenniscentrum";
import OverAiga from "./pages/OverAiga";
import Contact from "./pages/Contact";
import Quiz from "./pages/Quiz";
import Faq from "./pages/Faq";
import ArticleDetail from "./pages/ArticleDetail";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Privacyverklaring from "./pages/Privacyverklaring";
import Licentie from "./pages/Licentie";
import AiGeletterdheidNederland from "./pages/AiGeletterdheidNederland";
import AiTrainingVoorBedrijven from "./pages/AiTrainingVoorBedrijven";
import AiActComplianceNederland from "./pages/AiActComplianceNederland";
import AiCursusMedewerkers from "./pages/AiCursusMedewerkers";
import AiToolsOverzicht from "./pages/AiToolsOverzicht";
import Tools from "./pages/Tools";
import UseCaseChecker from "./pages/UseCaseChecker";
import SpeakersAcademy from "./pages/SpeakersAcademy";
import EuAiActA4 from "./pages/EuAiActA4";
import Boetecalculator from "./pages/Boetecalculator";
import AiRisicoscan from "./pages/AiRisicoscan";
import Downloads from "./pages/Downloads";
import ComplianceChecklist from "./pages/ComplianceChecklist";
import AiBeleidstemplate from "./pages/AiBeleidstemplate";
import ChecklistLanding from "./pages/ChecklistLanding";
import BeleidstemplateLanding from "./pages/BeleidstemplateLanding";
import AiActDeadlines from "./pages/AiActDeadlines";
import AiBegrippen from "./pages/AiBegrippen";
import Unsubscribe from "./pages/Unsubscribe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AppContent = () => {
  const { pathname } = useLocation();
  const isQuizActive = pathname === "/gereedheidscan";
  const isAdminActive = pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminActive && <Navbar />}
      <main className={isAdminActive ? "" : "pt-16"}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/training" element={<Training />} />
          <Route path="/masterclass" element={<Masterclass />} />
          <Route path="/kenniscentrum" element={<Kenniscentrum />} />
          <Route path="/kenniscentrum/:slug" element={<ArticleDetail />} />
          <Route path="/over-aiga" element={<OverAiga />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/gereedheidscan" element={<Quiz />} />
          <Route path="/risicoscan" element={<Navigate to="/gereedheidscan" replace />} />
          <Route path="/ai-geletterdheid-nederland" element={<AiGeletterdheidNederland />} />
          <Route path="/ai-training-voor-bedrijven" element={<AiTrainingVoorBedrijven />} />
          <Route path="/ai-act-compliance-nederland" element={<AiActComplianceNederland />} />
          <Route path="/ai-cursus-medewerkers" element={<AiCursusMedewerkers />} />
          <Route path="/ai-tools-onder-de-ai-act" element={<AiToolsOverzicht />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/ai-use-case-checker" element={<UseCaseChecker />} />
          <Route path="/speakers-academy" element={<SpeakersAcademy />} />
          <Route path="/kenniscentrum/eu-ai-act-in-1-a4" element={<EuAiActA4 />} />
          <Route path="/tools/boetecalculator" element={<Boetecalculator />} />
          <Route path="/tools/ai-risicoscan" element={<AiRisicoscan />} />
          <Route path="/tools/downloads" element={<Downloads />} />
          <Route path="/tools/downloads/ai-act-compliance-checklist" element={<ChecklistLanding />} />
          <Route path="/tools/downloads/ai-act-compliance-checklist/document" element={<ComplianceChecklist />} />
          <Route path="/tools/downloads/ai-beleid-opstellen" element={<BeleidstemplateLanding />} />
          <Route path="/tools/downloads/ai-beleid-opstellen/document" element={<AiBeleidstemplate />} />
          <Route path="/tools/downloads/ai-beleid-template" element={<Navigate to="/tools/downloads/ai-beleid-opstellen" replace />} />
          <Route path="/ai-act-deadlines" element={<AiActDeadlines />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/privacyverklaring" element={<Privacyverklaring />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="/licentie" element={<Licentie />} />
          {/* Redirects for broken internal links in legacy article content */}
          <Route path="/eu-ai-act-uitgelegd" element={<Navigate to="/kenniscentrum/eu-ai-act-uitgelegd" replace />} />
          <Route path="/hoe-herken-je-ai-bias" element={<Navigate to="/kenniscentrum/hoe-herken-je-ai-bias" replace />} />
          <Route path="/llms-generatieve-ai-geletterdheid" element={<Navigate to="/kenniscentrum/llms-generatieve-ai-geletterdheid" replace />} />
          <Route path="/wat-is-ai-geletterdheid" element={<Navigate to="/kenniscentrum/wat-is-ai-geletterdheid" replace />} />
          <Route path="/wat-zijn-high-risk-ai-systemen" element={<Navigate to="/kenniscentrum/wat-zijn-high-risk-ai-systemen" replace />} />
          <Route path="/welke-ai-systemen-zijn-verboden" element={<Navigate to="/kenniscentrum/welke-ai-systemen-zijn-verboden" replace />} />
          <Route path="/ai-geletterdheid-training" element={<Navigate to="/training" replace />} />
          <Route path="/masterclass-voor-leidinggevenden" element={<Navigate to="/masterclass" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isQuizActive && !isAdminActive && <Footer />}
      <CookieBanner />
      <AccessibilityWidget />
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
