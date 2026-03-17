import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useReduceMotion } from "@/hooks/use-reduce-motion";

const COOKIE_KEY = "aiga_cookie_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  const reduced = useReduceMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? false : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={reduced ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-3xl mx-auto rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-lg p-5 sm:p-6">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Wij gebruiken functionele cookies om de website goed te laten werken en Google Analytics om het gebruik van de site te analyseren.
              Lees meer in onze{" "}
              <Link to="/privacyverklaring" className="neon-text font-medium hover:underline">
                privacyverklaring
              </Link>.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={accept}
                className="btn-neon text-sm px-5 py-2 rounded-lg"
              >
                Accepteren
              </button>
              <button
                onClick={decline}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
              >
                Alleen noodzakelijke
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
