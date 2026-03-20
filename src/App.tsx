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
import Tools from "./pages/Tools";
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
          <Route path="/tools" element={<Tools />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/privacyverklaring" element={<Privacyverklaring />} />
          <Route path="/licentie" element={<Licentie />} />
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
