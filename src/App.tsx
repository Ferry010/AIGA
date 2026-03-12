import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Training from "./pages/Training";
import Masterclass from "./pages/Masterclass";
import Kenniscentrum from "./pages/Kenniscentrum";
import OverAiga from "./pages/OverAiga";
import Contact from "./pages/Contact";
import Quiz from "./pages/Quiz";
import Faq from "./pages/Faq";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AppContent = () => {
  const { pathname } = useLocation();
  const isQuizActive = pathname === "/risicoscan";
  const isAdminActive = pathname === "/admin";

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
          <Route path="/over-aiga" element={<OverAiga />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/risicoscan" element={<Quiz />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isQuizActive && !isAdminActive && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
