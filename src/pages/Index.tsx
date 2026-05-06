import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Trophy, Camera, Star, Award, Heart, Video, Plane, ChevronDown, Play, ArrowRight, Star as StarIcon } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import SafeImage from "@/components/ui/SafeImage";
import { cn } from "@/lib/utils";
import BookingModal from "@/components/BookingModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import FloralSVG from "@/components/FloralSVG";
import RollReveal from "@/components/RollReveal";
import TextReveal from "@/components/TextReveal";
import FallingPetals from "@/components/FallingPetals";

import { PORTFOLIO_IMAGES, SITE_ASSETS } from "@/config/images";

import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Floating Animation Helper
const floatAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const
  }
};

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Parallax Values
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Initialize Text Splitting for Hero
    Splitting({ target: ".split-text", by: "chars" });

    let ctx = gsap.context(() => {
      // Hero Character Entrance
      gsap.from(".char", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.03,
        ease: "power4.out",
        delay: 0.8
      });

      // Stats counter animation
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll(".stat-number");
        counters.forEach((counter: any) => {
          const target = parseInt(counter.getAttribute("data-target") || "0");
          gsap.fromTo(counter, 
            { innerText: 0 }, 
            { 
              innerText: target, 
              duration: 2.5, 
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: counter,
                start: "top 95%",
              },
              onUpdate: function() {
                counter.innerText = Math.floor(counter.innerText) + (counter.getAttribute("data-suffix") || "");
              }
            }
          );
        });
      }
    }, mainRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={mainRef} className="bg-white selection:bg-sukuna/20 selection:text-sukuna overflow-x-hidden">
      <Preloader />
      <CustomCursor />
      <FallingPetals count={20} />

      {/* Hero Section */}
      <section className="bg-blush min-h-[calc(100vh-105px)] grid grid-cols-1 lg:grid-cols-2 overflow-hidden border-b border-rose/10 relative">


        {/* Hero Left - Images */}
        <div className="relative lg:h-auto w-full flex flex-col pt-0 order-2 lg:order-1 px-4 lg:px-6 lg:py-6 gap-3 lg:gap-4">
          <motion.div 
            style={{ y: y1 }}
            className="w-full aspect-[4/3] lg:aspect-[4/3] relative overflow-hidden shadow-xl bg-charcoal/5"
          >
            <SafeImage 
              src={SITE_ASSETS.hero} 
              alt="Wedding Theme Studio Hero" 
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </motion.div>
          <div className="grid grid-cols-2 relative z-10 gap-3 lg:gap-4">
            <motion.div 
              style={{ y: y2 }}
              className="relative overflow-hidden shadow-xl aspect-[4/5] bg-charcoal/5"
            >
               <SafeImage src={SITE_ASSETS.couplePose} className="w-full h-full object-cover object-center" />
            </motion.div>
            <motion.div 
              style={{ y: y1 }}
              className="relative overflow-hidden shadow-xl aspect-[4/5] bg-charcoal/5"
            >
               <SafeImage src={SITE_ASSETS.brideOne} className="w-full h-full object-cover object-center" />
            </motion.div>
          </div>
        </div>

        <div className="p-8 lg:p-24 flex flex-col justify-center relative order-1 lg:order-2">
          <motion.div animate={floatAnimation} className="absolute top-10 right-10 z-0 text-sukuna/5">
            <FloralSVG className="w-40 h-auto rotate-12" variant={1} />
          </motion.div>
          
          <RollReveal
            className="relative z-10"
          >
            <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.3em] font-body text-muted mb-6 block font-bold">Capturing your most precious moments</span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-[88px] leading-[1.05] text-charcoal mb-8 uppercase font-light">
              <span className="split-text" data-splitting>WEDDING</span><br />
              <span className="text-sukuna italic split-text" data-splitting>THEME</span><br />
              <span className="split-text" data-splitting>STUDIO</span>
            </h1>
            <div className="w-16 h-[1.5px] bg-sukuna mb-8" />
            <TextReveal 
              text="Delhi NCR's award-winning wedding photographer with 500+ weddings, trusted by couples across India for cinematic storytelling and candid memories." 
              className="max-w-[400px] text-body text-[14px] lg:text-[15px] leading-relaxed mb-10 font-light block" 
              delay={0.5} 
            />
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(210, 54, 105, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setBookingOpen(true)}
              className="btn-rose w-full lg:w-fit"
            >
              Make Reservation
            </motion.button>
          </RollReveal>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-charcoal py-8 lg:py-12 overflow-hidden border-y border-sukuna/10">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1,2,3,4].map((i) => (
            <div key={i} className="flex items-center gap-10 mx-10">
              <span className="text-white/20 font-heading italic text-2xl lg:text-4xl uppercase">Capturing timeless moments</span>
              <span className="text-sukuna text-xl lg:text-2xl">✦</span>
              <span className="text-white/20 font-heading italic text-2xl lg:text-4xl uppercase">Delhi's most trusted wedding studio</span>
              <span className="text-sukuna text-xl lg:text-2xl">✦</span>
              <span className="text-white/20 font-heading italic text-2xl lg:text-4xl uppercase">Every tear, every smile, every glance</span>
              <span className="text-sukuna text-xl lg:text-2xl">✦</span>
            </div>
          ))}
        </div>
      </div>

      <section id="about" className="py-24 lg:py-40 bg-white">
        <div className="max-w-site mx-auto px-6">
          <RollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-5">
              <span className="section-tag text-sukuna">Our Story</span>
              <h2 className="mb-8 uppercase text-3xl md:text-5xl lg:text-6xl">OUR WEDDING <br /><span className="text-sukuna italic">STORY TO DATE</span></h2>
              <div className="space-y-6 text-body text-base leading-relaxed mb-10 font-light">
                <TextReveal 
                  text="Founded by Om Prakash in 2014, Wedding Theme Studio brings over a decade of expertise in capturing the real emotions, candid moments, and cinematic beauty of your wedding day. We focus on stress-free experiences and timeless memories."
                  className="block"
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setBookingOpen(true)} 
                className="btn-outline-rose w-full lg:w-fit"
              >
                Make Reservation
              </motion.button>
            </div>
            
            <motion.div 
              style={{ scale }}
              className="lg:col-span-7 grid grid-cols-2 gap-4 h-[350px] md:h-[500px] lg:h-[600px]"
            >
              <div className="row-span-2 relative overflow-hidden group">
                <SafeImage src={SITE_ASSETS.brideOrig} alt="Bridal Profile" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
              <div className="relative overflow-hidden group">
                <SafeImage src={SITE_ASSETS.couple1} alt="Bridal Veil Detail" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
              <div className="relative overflow-hidden group bg-charcoal/5">
                <SafeImage src={SITE_ASSETS.couple2} alt="Emotional Bridal Moment" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
            </motion.div>
          </RollReveal>
        </div>
      </section>

      {/* Experience / Why Us Section */}
      <section className="py-24 lg:py-40 bg-white">
        <div className="max-w-site mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <RollReveal>
                <span className="text-sukuna font-heading italic text-2xl lg:text-3xl mb-4 block">Why Us</span>
                <h2 className="text-charcoal mb-12 max-w-[600px] uppercase text-3xl md:text-5xl lg:text-6xl">
                  PLANNING A WEDDING IS <span className="text-sukuna italic">OVERWHELMING</span>. <br />
                  YOUR PHOTOGRAPHY <span className="text-sukuna italic">SHOULDN'T BE</span>.
                </h2>
                
                <div className="space-y-6 lg:space-y-8 mb-16">
                  {[
                    "Afraid of missed once-in-a-lifetime moments?",
                    "Don't want awkward poses and forced smiles?",
                    "Worried about photographers who just \"show up and shoot\"?",
                  ].map((text, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-4 lg:w-6 h-[1px] bg-sukuna mt-3 flex-shrink-0" />
                      <TextReveal text={text} className="text-body text-lg lg:text-xl font-light italic block" />
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-sukuna/10 pt-10">
                  <TextReveal 
                    text="Your wedding happens once. The memories should last forever." 
                    className="text-charcoal text-xl lg:text-2xl font-body font-light block"
                  />
                </div>
              </RollReveal>
            </div>
            
            <div className="lg:col-span-5 relative">
              <motion.div 
                style={{ rotate: 3 }}
                className="aspect-[3/4] overflow-hidden shadow-2xl relative z-10"
              >
                <SafeImage src={SITE_ASSETS.experience} alt="Breathtaking Bridal Portrait" className="w-full h-full object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-blush -z-0 translate-x-4 lg:translate-x-8 translate-y-4 lg:translate-y-8" />
              <motion.div 
                animate={floatAnimation}
                className="absolute -top-10 -right-10 z-20 opacity-20 hidden lg:block"
              >
                <FloralSVG className="w-60 h-auto" variant={2} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Carousel Section */}
      <section id="portfolio" className="py-24 lg:py-40 bg-surface relative overflow-hidden">
        <div className="max-w-site mx-auto px-6">
          <RollReveal className="text-center mb-16">
            <span className="section-tag mx-auto text-sukuna">Portfolio</span>
            <h2 className="uppercase text-3xl md:text-5xl lg:text-6xl">FEATURED <span className="text-sukuna italic">GALLERY</span></h2>
          </RollReveal>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {[
                SITE_ASSETS.hero,
                SITE_ASSETS.brideOrig,
                SITE_ASSETS.brideOne,
                SITE_ASSETS.experience,
                SITE_ASSETS.couple1,
                SITE_ASSETS.couple2,
                SITE_ASSETS.couple3,
                SITE_ASSETS.couplePose,
              ].map((src, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="aspect-[3/4] overflow-hidden group shadow-2xl bg-charcoal/5">
                    <SafeImage
                      src={src}
                      alt={`Featured Portfolio ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden lg:flex items-center justify-center gap-4 mt-12">
              <CarouselPrevious className="static translate-y-0 border-sukuna text-sukuna hover:bg-sukuna hover:text-white" />
              <CarouselNext className="static translate-y-0 border-sukuna text-sukuna hover:bg-sukuna hover:text-white" />
            </div>
          </Carousel>

          <div className="text-center mt-16">
            <Link to="/portfolio" className="btn-outline-rose">View Full Portfolio →</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-blush relative py-24 lg:py-40">
        <div className="max-w-site mx-auto px-6">
          <RollReveal className="text-center mb-16 lg:mb-20">
            <span className="section-tag mx-auto text-sukuna">Our Services</span>
            <h2 className="uppercase text-3xl md:text-5xl lg:text-6xl">CRAFTING <span className="text-sukuna italic">MEMORIES</span></h2>
          </RollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              { title: "Wedding Photography", icon: <Award size={40} strokeWidth={1} />, tag: "Full Day · Candid", desc: "Award-winning photography capturing every emotion, from haldi to reception. We blend traditional elegance with modern candid storytelling." },
              { title: "Pre-Wedding Shoots", icon: <Camera size={40} strokeWidth={1} />, tag: "Outdoor / Studio", desc: "Romantic pre-wedding shoots across Delhi NCR and destination locations, crafting your love story into a beautiful visual narrative." },
              { title: "Cinematic Films", icon: <Video size={40} strokeWidth={1} />, tag: "4K Videography", desc: "Cinematic wedding films with professional editing, color grading, and drone shots that bring your wedding day back to life in movie quality." },
            ].map((service, i) => (
              <motion.div 
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: -40, rotateX: 15 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, delay: i * 0.1 } }
                }}
                className="bg-white p-8 lg:p-16 border border-rose/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:z-10 group"
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blush rounded-full flex items-center justify-center text-sukuna mb-8 lg:mb-10 group-hover:bg-sukuna group-hover:text-white transition-colors duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl lg:text-2xl mb-4 uppercase">{service.title}</h3>
                <span className="text-[10px] font-bold text-sukuna uppercase tracking-widest block mb-6">{service.tag}</span>
                <TextReveal text={service.desc} className="text-muted text-[13px] leading-relaxed font-light block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="contact" className="relative py-24 lg:py-40 overflow-hidden bg-charcoal">
        <div className="max-w-[700px] mx-auto px-6 relative z-10 text-center">
          <RollReveal className="mb-16">
            <span className="section-tag mx-auto text-white/50">Let us know if you coming</span>
            <h2 className="text-white uppercase text-3xl md:text-5xl lg:text-6xl">GET A <span className="text-sukuna italic">FREE QUOTE!</span></h2>
          </RollReveal>
          
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="flex flex-col gap-6 items-center"
          >
             <TextReveal 
               text="Click below to reach out to us directly for tailored wedding quotes." 
               className="text-white/60 font-body font-light mb-4 block"
             />
             <Link to="/contact" className="btn-rose w-full md:w-fit text-center">Enquire Now</Link>
          </motion.div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
};

export default Index;
