import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  logoSrc: string;
  onLoaded?: () => void;
}

export default function Preloader({ logoSrc, onLoaded }: PreloaderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onLoaded) {
        onLoaded();
      }
    }, 1100);

    return () => {
      clearTimeout(timer);
    };
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          id="page-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stone-50 text-stone-800 select-none pointer-events-none"
        >
          {/* Centered Minimalist Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center space-y-4"
          >
            <motion.img
              src={logoSrc}
              alt="Rasika & Amal"
              className="h-14 sm:h-16 w-auto object-contain"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              referrerPolicy="no-referrer"
            />

            {/* Minimalist hairline accent line */}
            <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
