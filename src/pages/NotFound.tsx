import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import aigaLogo from "@/assets/AIGA_transparent.png";
import { useReduceMotion } from "@/hooks/use-reduce-motion";

const NotFound = () => {
  const reduced = useReduceMotion();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <img src={aigaLogo} alt="AIGA logo" className="mx-auto mb-8 h-10" />

        <h1 className="neon-text font-display text-[8rem] font-bold leading-none md:text-[12rem]">
          404
        </h1>

        <p className="mt-4 font-display text-2xl font-semibold text-foreground">
          Pagina niet gevonden
        </p>
        <p className="mt-2 max-w-md text-muted-foreground">
          De pagina die je zoekt bestaat niet of is verplaatst.
        </p>

        <Link
          to="/"
          className="btn-neon mt-8 inline-block rounded-lg px-8 py-3 text-sm font-semibold"
        >
          Terug naar home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
