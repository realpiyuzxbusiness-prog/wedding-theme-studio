import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, X, Star } from "lucide-react";
import FloralSVG from "@/components/FloralSVG";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

const waLink = (pkg: string, price: string) =>
  `https://api.whatsapp.com/send/?phone=918802405067&text=${encodeURIComponent(
    `Hi Wedding Theme Studio, I'm interested in the ${pkg} package (${price}). Please share availability and details.`
  )}`;

const PACKAGES = [
  {
    name: "Essential",
    price: "₹40,000",
    badge: null,
    tagline: "Intimate coverage for smaller celebrations — perfect for engagements, court marriages and single-day events.",
    features: [
      { label: "Hours Covered", val: "8 hours" },
      { label: "Photography Team", val: "1 photographer" },
      { label: "Candid Coverage", val: true },
      { label: "Drone Coverage", val: false },
      { label: "Highlight Reel", val: false },
      { label: "Private Online Gallery", val: true },
    ],
  },
  {
    name: "Signature",
    price: "₹80,000",
    badge: "Most Popular",
    tagline: "Complete photo + cinematic coverage for the full wedding day with our signature editorial finish.",
    features: [
      { label: "Hours Covered", val: "12 hours" },
      { label: "Photography Team", val: "2 photographers" },
      { label: "Candid Coverage", val: true },
      { label: "Drone Coverage", val: true },
      { label: "Highlight Reel", val: true },
      { label: "Private Online Gallery", val: true },
    ],
  },
  {
    name: "Luxury",
    price: "₹1,30,000",
    badge: "Full Service",
    tagline: "Multi-day, multi-event luxury coverage with full team, drone, cinematic films and premium album.",
    features: [
      { label: "Hours Covered", val: "Full day" },
      { label: "Photography Team", val: "3+ person team" },
      { label: "Candid Coverage", val: true },
      { label: "Drone Coverage", val: true },
      { label: "Highlight Reel", val: true },
      { label: "Print Album", val: "Included" },
    ],
  },
];

const FAQS = [
  { q: "How far in advance should I book?", a: "We recommend booking at least 6–12 months in advance, especially for peak season (October–February)." },
  { q: "Do you travel outside Delhi NCR?", a: "Absolutely. We cover destinations across India and internationally. Travel and accommodation are charged at actuals." },
  { q: "How are our photos delivered?", a: "All edited photos are delivered via a private, password-protected online gallery within 4–6 weeks." },
  { q: "Do you shoot destination weddings?", a: "Yes. We've covered weddings in Udaipur, Goa, Jaipur, Jim Corbett, and more." },
];

const Pricing = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white selection:bg-rose/20 selection:text-rose overflow-x-hidden min-h-screen">
      <Preloader />
      <CustomCursor />

      {/* Header */}
      <section className="bg-blush pt-40 pb-20 relative overflow-hidden text-center">
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-20 -left-20 opacity-5">
           <FloralSVG className="w-[600px] h-auto" />
        </motion.div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-tag mx-auto mb-6"
          >
            Investment
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-9xl font-heading font-light uppercase tracking-tight"
          >
            PACKAGES <span className="text-rose italic">& RATES</span>
          </motion.h1>
          <div className="w-16 h-1 bg-rose mx-auto mt-8" />
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 lg:py-40 max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-rose/10 p-10 lg:p-14 relative hover:shadow-2xl transition-all group"
            >
              {pkg.badge && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-rose text-white text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 flex items-center gap-2">
                  <Star size={10} fill="currentColor" /> {pkg.badge}
                </div>
              )}
              <h3 className="text-3xl font-heading uppercase mb-2">{pkg.name}</h3>
              <p className="text-rose font-heading text-2xl mb-4">{pkg.price}</p>
              <p className="text-muted text-sm font-light leading-relaxed mb-8">{pkg.tagline}</p>
              
              <div className="space-y-4 mb-12">
                {pkg.features.map((f) => (
                  <div key={f.label} className="flex justify-between items-center text-[12px] uppercase tracking-wider border-b border-rose/5 pb-3">
                    <span className="text-charcoal/40 font-bold">{f.label}</span>
                    <span className="text-charcoal flex items-center gap-2">
                       {f.val === true ? <Check size={14} className="text-rose" /> : f.val === false ? <X size={14} className="text-charcoal/10" /> : f.val}
                    </span>
                  </div>
                ))}
              </div>

              <a 
                href={waLink(pkg.name, pkg.price)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-outline-rose block text-center"
              >
                Inquire on WhatsApp
              </a>
            </motion.div>
          ))}
        </div>
        
        <p className="text-center mt-20 text-[11px] uppercase tracking-[0.3em] font-bold text-muted max-w-2xl mx-auto">
          Rates vary by travel distance and specific event requirements. Custom day packages available on request.
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-blush py-24 lg:py-40">
        <div className="max-w-site mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5">
               <span className="section-tag">Help Center</span>
               <h2 className="mb-8">FREQUENTLY <br /><span className="text-rose italic">ASKED QUESTIONS</span></h2>
               <p className="text-body text-sm font-light leading-relaxed italic">
                 "Photography is a way of feeling, of touching, of loving. What you have caught on film is captured forever..."
               </p>
            </div>
            
            <div className="lg:col-span-7 space-y-4">
              {FAQS.map((faq, i) => (
                <motion.div 
                  key={i}
                  className="bg-white border border-rose/5"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-8 text-left group"
                  >
                    <span className="text-charcoal font-heading text-xl uppercase tracking-tight group-hover:text-rose transition-colors">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-rose transition-transform duration-500 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="p-8 pt-0 text-muted text-sm leading-relaxed font-light">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
