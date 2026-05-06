import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_IMAGES } from "@/config/images";
import FloralSVG from "@/components/FloralSVG";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { ArrowRight, Star, Camera, Video, Award, Users, Briefcase, Zap, CheckCircle } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import RollReveal from "@/components/RollReveal";
import TextReveal from "@/components/TextReveal";
import FallingPetals from "@/components/FallingPetals";
import { cn } from "@/lib/utils";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi 
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=75`;
const IMGS = {
  // Mapped from registry in src/config/images.ts for fast CDN loading and easy central management
  destination: PORTFOLIO_IMAGES.brideFullPortrait,
  preWedding:  PORTFOLIO_IMAGES.preWedding,
  candid:      PORTFOLIO_IMAGES.candid,
  wedding:     PORTFOLIO_IMAGES.wedding,
  cinematic:   PORTFOLIO_IMAGES.cinematic,
  commercial:  PORTFOLIO_IMAGES.commercial,
  corporate:   PORTFOLIO_IMAGES.corporate,
  maternity:   PORTFOLIO_IMAGES.maternity,
  marital:     PORTFOLIO_IMAGES.marital,
  model:       PORTFOLIO_IMAGES.model,
};

const SERVICES = [
  { 
    tag: "Pre-Wedding", 
    title: "PRE-WEDDING SHOOT", 
    desc: "Styled sessions at iconic locations — Lodhi Garden, Humayun's Tomb, Hauz Khas, or destination shoots across Rajasthan and beyond. We create romantic, cinematic imagery that's social-media ready and print quality. Perfect for save-the-date cards and wedding invitations.", 
    img: IMGS.preWedding,
    tiers: [
      { name: "Essential", price: "Starting ₹25,000", features: ["4 Hours", "20 Edited Photos", "Online Gallery"] },
      { name: "Premium", price: "Starting ₹45,000", features: ["Full Day", "50 Edited Photos", "Cinematic Reel"] }
    ]
  },
  { 
    tag: "Candid", 
    title: "CANDID SHOOT", 
    desc: "Unscripted, documentary-style photography that captures the real you. No forced poses — pure real moments. Best for couples who want authentic storytelling over traditional portraits. We blend into your wedding like guests but deliver like artists.", 
    img: IMGS.candid, 
    reverse: true,
    tiers: [
      { name: "Day Rate", price: "Starting ₹35,000", features: ["1 Lead Photographer", "Unlimited Raw", "100+ Edited"] }
    ]
  },
  { 
    tag: "Wedding", 
    title: "WEDDING SHOOT", 
    desc: "Full editorial coverage of your entire wedding celebration — from the morning rituals to the reception. Detail shots, family portraits, couple portraits, and every candid moment in between. Magazine-quality final delivery with professional editing and colour grading.", 
    img: IMGS.wedding,
    tiers: [
      { name: "Standard", price: "Starting ₹80,000", features: ["Full Day", "Luxury Album", "2 Photographers"] },
      { name: "Grand", price: "Starting ₹1,50,000", features: ["Multi-Day", "2 Albums", "Drone Included"] }
    ]
  },
  { 
    tag: "Cinematography", 
    title: "CINEMATIC SHOOT", 
    desc: "Full-day filming by a dedicated video team. Delivered as a short highlight reel (3–5 min) plus full-length feature film. Professional colour grading, sound design, and cinematic scoring. Your wedding day transformed into a movie-quality experience.", 
    img: IMGS.cinematic, 
    reverse: true,
    tiers: [
      { name: "Feature", price: "Starting ₹60,000", features: ["Highlight Film", "Full Length", "4K Delivery"] }
    ]
  },
  { 
    tag: "Commercial", 
    title: "COMMERCIAL PHOTOGRAPHY", 
    desc: "Professional photography for brands, products, and advertising. We offer high-end product styling and advanced lighting setups to create images that elevate your brand's visual identity. Ideal for marketing campaigns and e-commerce.", 
    img: IMGS.commercial,
    tiers: [
      { name: "Studio", price: "Starting ₹15,000", features: ["Product Styling", "High-End Lighting", "Retouching"] },
      { name: "On-Location", price: "Custom Quote", features: ["Full Production", "Models/Stylists", "Usage Rights"] }
    ]
  },
  { 
    tag: "Corporate", 
    title: "CORPORATE EVENTS", 
    desc: "Comprehensive coverage for conferences, product launches, and gala dinners. We also specialize in executive portraits and team headshots, providing a polished and professional look for your corporate communications.", 
    img: IMGS.corporate, 
    reverse: true,
    tiers: [
      { name: "Event", price: "Starting ₹20,000", features: ["Conference Coverage", "Same-Day Delivery", "Rights Included"] },
      { name: "Portraits", price: "Starting ₹5,000/head", features: ["Executive Headshots", "Studio Lighting", "Retouching"] }
    ]
  },
  { 
    tag: "Maternity", 
    title: "MATERNITY SHOOT", 
    desc: "Beautiful, intimate maternity photography that celebrates the journey of motherhood. Indoor studio or outdoor sessions with professional styling and lighting. Soft, warm tones that capture this precious chapter of your life with elegance and grace.", 
    img: IMGS.maternity,
    tiers: [
      { name: "Indoor", price: "Starting ₹15,000", features: ["Studio Session", "Props Included", "10 Edited Photos"] },
      { name: "Outdoor", price: "Starting ₹25,000", features: ["Natural Location", "2 Outfits", "20 Edited Photos"] }
    ]
  },
  { 
    tag: "Marital", 
    title: "MARITAL SHOOT", 
    desc: "Celebrate your married life with refined couple portraits — anniversary sessions, first-year shoots, or simply documenting your bond. Editorial styling, intimate moments, and timeless imagery you'll cherish for decades.", 
    img: IMGS.marital, 
    reverse: true,
    tiers: [
      { name: "Anniversary", price: "Starting ₹20,000", features: ["2 Hour Session", "Editorial Editing", "Print Rights"] }
    ]
  },
  { 
    tag: "Model", 
    title: "MODEL SHOOT", 
    desc: "Portfolio-grade model shoots for aspiring models, influencers and brands. Professional lighting, location scouting, styling guidance and high-end retouching to deliver a portfolio that opens doors.", 
    img: IMGS.model,
    tiers: [
      { name: "Starter", price: "Starting ₹12,000", features: ["5 Look Portfolio", "Digital Delivery", "Styling Guide"] },
      { name: "Pro", price: "Starting ₹30,000", features: ["10 Look Portfolio", "Comp Card Design", "Pro Retouching"] }
    ]
  },
];

const Services = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const carouselImages = [
    IMGS.destination,
    IMGS.preWedding,
    IMGS.wedding,
    IMGS.cinematic,
    IMGS.candid
  ];

  return (
    <div className="bg-white selection:bg-sukuna/20 selection:text-sukuna overflow-x-hidden relative">
      <Preloader />
      <CustomCursor />
      <FallingPetals count={20} />

      {/* Header */}
      <section className="bg-blush pt-40 pb-24 text-center relative overflow-hidden z-10">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute -top-40 -left-40 opacity-5">
           <FloralSVG className="w-[600px] h-auto" />
        </motion.div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-tag text-sukuna mx-auto mb-6"
          >
            Our Offerings
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl lg:text-[80px] font-heading font-light leading-[1.1] uppercase mb-8"
          >
            EVERYTHING YOUR <br />
            <span className="text-sukuna italic">STORY</span> DESERVES
          </motion.h1>
          <div className="w-16 h-1 bg-sukuna mx-auto" />
        </div>
      </section>

      {/* Portfolio Carousel Section */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-site mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sukuna font-heading italic text-xl mb-2 block">Portfolio Showcase</span>
            <h2 className="text-3xl lg:text-4xl uppercase font-heading font-light">Breathtaking <span className="text-sukuna italic">Moments</span></h2>
          </div>

          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full relative"
          >
            <CarouselContent>
              {carouselImages.map((src, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="aspect-[4/5] overflow-hidden group shadow-lg">
                    <SafeImage
                      src={src}
                      alt={`Portfolio item ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden lg:block">
              <CarouselPrevious className="-left-12 border-sukuna text-sukuna hover:bg-sukuna hover:text-white" />
              <CarouselNext className="-right-12 border-sukuna text-sukuna hover:bg-sukuna hover:text-white" />
            </div>
            
            {/* Dots / Thumbnail Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {carouselImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    current === i ? "bg-sukuna w-8" : "bg-sukuna/20"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 lg:py-40 relative z-10">
        <div className="max-w-site mx-auto px-6 space-y-32 lg:space-y-60">
          {SERVICES.map((s, i) => (
            <RollReveal 
              key={s.title}
              className={`flex flex-col ${s.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16 lg:gap-24`}
            >
              <div className="flex-1 w-full relative">
                <div className="aspect-[4/5] overflow-hidden group shadow-2xl relative z-10">
                  <SafeImage 
                    src={s.img} 
                    alt={s.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className={`absolute -bottom-10 ${s.reverse ? "-left-10" : "-right-10"} w-40 h-40 bg-blush -z-0`} 
                />
              </div>
              
              <div className="flex-1 max-w-[500px]">
                <span className="text-sukuna font-heading italic text-lg mb-4 block">{s.tag}</span>
                <h3 className="text-4xl lg:text-5xl font-heading font-light uppercase mb-8 leading-tight text-charcoal">
                  {s.title.split(' ').map((word, j) => (
                    j === 1 || j === 2 ? <span key={j} className="text-sukuna italic block">{word}</span> : <span key={j}>{word} </span>
                  ))}
                </h3>
                <TextReveal text={s.desc} className="text-body text-base leading-relaxed mb-10 font-light block" />
                
                {/* Pricing Tiers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {s.tiers.map((tier) => (
                    <div key={tier.name} className="p-4 bg-blush/50 border border-sukuna/10 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap size={14} className="text-sukuna" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{tier.name}</span>
                      </div>
                      <div className="text-sm font-heading text-charcoal mb-3">{tier.price}</div>
                      <ul className="space-y-1.5">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <CheckCircle size={10} className="text-sukuna/40" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-6">
                  <Link to="/contact">
                    <motion.button 
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-charcoal border-b border-sukuna pb-2 w-fit hover:text-sukuna transition-colors"
                    >
                      Enquire About This Service <ArrowRight size={14} className="text-sukuna" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </RollReveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-charcoal text-center text-white relative overflow-hidden z-10">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-0 right-0 opacity-10">
          <FloralSVG className="w-80 h-auto rotate-180" />
        </motion.div>
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="text-white mb-8 text-4xl lg:text-6xl uppercase">READY TO CAPTURE <br /><span className="text-sukuna italic">YOUR MOMENTS?</span></h2>
          <Link to="/contact" className="btn-rose shadow-xl inline-block">Build Your Package</Link>
          <div className="mt-16 flex justify-center gap-4 text-sukuna">
            {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={16} />)}
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-widest font-bold opacity-50">500+ Happy Couples Across India</p>
        </div>
      </section>
    </div>
  );
};

export default Services;

