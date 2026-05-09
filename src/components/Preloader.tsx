import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Small buffer for smoothness
      setTimeout(() => setLoading(false), 1200);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            rotateX: 10,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[10000] bg-blush flex flex-col items-center justify-center origin-top"
        >
          <div className="overflow-hidden mb-6">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-4"
            >
              <img src="/logo.png" alt="Wedding Theme Studio" className="h-24 w-auto object-contain" />
              <div className="text-charcoal text-xl md:text-2xl font-heading font-bold uppercase tracking-[0.15em]">
                Wedding <span className="text-rose">Theme</span> Studio
              </div>
            </motion.div>
          </div>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-32 h-[1px] bg-rose/20 relative"
          >
            <motion.div 
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full w-1/2 bg-rose"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
