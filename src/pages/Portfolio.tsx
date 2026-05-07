import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "@/components/ui/SafeImage";
import { SITE_CONFIG } from "@/config/siteConfig";
import FloralSVG from "@/components/FloralSVG";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { X, Search } from "lucide-react";
import Masonry from "@/components/Masonry";

const CATEGORIES = ["All", "Wedding", "Destination", "Pre-Wedding", "Cinematic Films"];

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const filtered = active === "All" 
    ? SITE_CONFIG.portfolioItems 
    : SITE_CONFIG.portfolioItems.filter((img) => img.cat === active);

  return (
    <div className="bg-white selection:bg-rose/20 selection:text-rose overflow-x-hidden min-h-screen">
      <Preloader />
      <CustomCursor />

      {/* Header */}
      <section className="bg-blush pt-40 pb-20 relative overflow-hidden text-center">
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute -top-60 -right-60 opacity-5">
           <FloralSVG className="w-[800px] h-auto" />
        </motion.div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-tag mx-auto mb-6"
          >
            Our Gallery
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-9xl font-heading font-light uppercase tracking-tight"
          >
            TIMLESS <span className="text-rose italic">MOMENTS</span>
          </motion.h1>
          <div className="w-16 h-1 bg-rose mx-auto mt-8" />
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-[64px] md:top-[72px] z-40 bg-white/90 backdrop-blur-md border-y border-rose/10 transition-all py-6">
        <div className="max-w-site mx-auto px-6 flex justify-center gap-10 overflow-x-auto no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[10px] uppercase tracking-[0.25em] whitespace-nowrap pb-2 transition-all relative font-bold ${
                active === cat ? "text-rose" : "text-charcoal/40 hover:text-rose"
              }`}
            >
              {cat}
              {active === cat && (
                <motion.span 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose" 
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-20 min-h-screen relative z-10">
        <Masonry 
          items={filtered.map((item, i) => {
            // Provide a varied array of heights (these get divided by 2 in Masonry.tsx)
            // This creates actual DOM heights of roughly 400, 250, 600, 300, 750, 450, etc.
            const variedHeights = [800, 500, 1200, 600, 1500, 900, 1000, 700, 1600, 850, 1100, 550];
            return {
              id: i,
              img: item.src,
              height: variedHeights[i % variedHeights.length],
              cat: item.cat,
              title: item.location
            };
          })}
          animateFrom="bottom"
          stagger={0.03}
          scaleOnHover={true}
          hoverScale={1.02}
          onImageClick={setLightboxSrc}
        />
      </section>

      {/* CTA Item */}
      <section className="py-24 bg-blush text-center relative overflow-hidden">
         <FloralSVG className="absolute bottom-0 left-0 w-80 h-auto opacity-10" variant={1} />
         <div className="max-w-2xl mx-auto px-6 relative z-10">
            <h2 className="mb-8">LET'S CREATE <br /><span className="text-rose italic">YOUR STORY</span></h2>
            <Link to="/contact" className="portfolio-cta-btn">Work With Us</Link>
         </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-charcoal text-white flex items-center justify-center p-4 backdrop-blur-lg bg-opacity-95" 
            onClick={() => setLightboxSrc(null)}
          >
            <motion.button 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
              onClick={() => setLightboxSrc(null)}
            >
              <X size={32} />
            </motion.button>
            <motion.img 
              layoutId="lightboxImage"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              src={lightboxSrc} 
              alt="Full size" 
              className="max-w-[95vw] max-h-[90vh] object-contain shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10" 
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
