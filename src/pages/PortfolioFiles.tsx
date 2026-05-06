import { useState } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import SafeImage from "@/components/ui/SafeImage";
import { X } from "lucide-react";
import { SITE_CONFIG } from "@/config/siteConfig";

const CATEGORIES = ["All", "Wedding", "Destination", "Pre-Wedding", "Cinematic Films"];

const PortfolioFiles = () => {
  const [active, setActive] = useState("All");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const filtered = active === "All"
    ? SITE_CONFIG.portfolioItems
    : SITE_CONFIG.portfolioItems.filter((img) => img.cat === active);

  return (
    <div className="bg-white">
      <div className="pt-24" />
      <section className="max-w-site mx-auto px-6 md:px-12 py-12">
        <RevealOnScroll>
          <span className="section-tag">Gallery</span>
          <h2 className="section-h2">FULL PORTFOLIO</h2>
          <p className="text-body text-base max-w-xl">
            Browse our complete collection of wedding photography and cinematic work.
          </p>
        </RevealOnScroll>
      </section>

      <div className="sticky top-[64px] md:top-[72px] z-40 bg-white border-y border-[#E8E0D5] shadow-sm overflow-hidden">
        <div className="max-w-site mx-auto px-6 md:px-12 py-4 flex gap-8 overflow-x-auto no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-xs uppercase tracking-[0.12em] whitespace-nowrap pb-1 transition-colors relative font-semibold ${
                active === cat ? "text-gold" : "text-muted-foreground hover:text-gold"
              }`}
            >
              {cat}
              {active === cat && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
              )}
            </button>
          ))}
        </div>
      </div>

      <section className="max-w-site mx-auto px-4 md:px-8 py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <RevealOnScroll key={`${item.src}-${i}`} delay={i * 40}>
              <div
                className="relative group overflow-hidden cursor-pointer break-inside-avoid"
                onClick={() => setLightboxSrc(item.src)}
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <SafeImage
                    src={item.src}
                    alt={item.location}
                    className="group-hover:scale-[1.04]"
                    fallbackText={item.location}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <span className="text-gold text-[10px] uppercase tracking-widest font-bold mb-1">{item.cat}</span>
                  <span className="text-white text-sm font-medium">{item.location}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center">
                    <span className="text-charcoal font-bold text-xs uppercase tracking-wider">View</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[2000] bg-black/[0.95] flex items-center justify-center p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          <img
            src={lightboxSrc}
            alt="Full size preview"
            className="max-w-[95vw] max-h-[90vh] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default PortfolioFiles;