import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReduceMotion } from "@/hooks/use-reduce-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedSection = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => {
  const reduced = useReduceMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={reduced ? { duration: 0 } : { duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const reduced = useReduceMotion();
  return (
    <motion.div
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const reduced = useReduceMotion();
  return (
    <motion.div
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
