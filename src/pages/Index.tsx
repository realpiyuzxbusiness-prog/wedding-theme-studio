import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import SafeImage from "@/components/ui/SafeImage";
import { PORTFOLIO_IMAGES } from "@/config/images";
import { SITE_CONFIG, TESTIMONIALS } from "@/config/siteConfig";
import FloralSVG from "@/components/FloralSVG";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import RollReveal from "@/components/RollReveal";
import TextReveal from "@/components/TextReveal";
import FallingPetals from "@/components/FallingPetals";
import { Camera, Film, MapPin, Heart, ArrowRight, Quote, Star, Zap, CheckCircle, Video } from "lucide-react";

const MarqueeStrip = ({ text }: { text: string }) => {
  return (
    <div className="bg-[#1a1a1a] py-6 overflow-hidden whitespace-nowrap flex border-y border-white/5 relative z-20">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex items-center"
      >
        <div className="flex items-center text-white/50 font-heading italic text-xl uppercase tracking-[0.2em]">
          {Array(4).fill(0).map((_, i) => (
            <span key={i} className="flex items-center">
              {text.split(" ✦ ").map((item, j) => (
                <span key={j} className="flex items-center">
                  {item} <span className="mx-6 text-[#C94070]">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="bg-white selection:bg-rose/20 selection:text-rose overflow-x-hidden">
      <Preloader />
      <CustomCursor />

      {/* Hero Section Redesign */}
      <section className="min-h-screen flex flex-col lg:flex-row bg-[#FAF8F5] relative overflow-hidden pt-2 lg:pt-4">
        {/* Left Side - Image (50%) */}
        <div className="w-full lg:w-1/2 flex flex-col h-[70vh] lg:h-[calc(100vh-20px)] px-4 lg:px-8 pt-2 pb-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative overflow-hidden shadow-lg"
          >
            <SafeImage 
              src={PORTFOLIO_IMAGES.hero} 
              alt="Luxury Wedding" 
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Right Side - Content (50%) */}
        <div className="w-full lg:w-1/2 bg-[#FAF8F5] flex items-center justify-center p-8 lg:p-24 relative">
          <div className="absolute inset-0 pointer-events-none z-0">
             <FallingPetals count={6} />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg relative z-10"
          >
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 0.6, letterSpacing: "0.5em" }}
              transition={{ duration: 1.5 }}
              className="text-[#C94070] uppercase text-[10px] font-bold mb-8 block"
            >
              CAPTURING YOUR MOST PRECIOUS MOMENTS
            </motion.span>
            <h1 className="font-heading font-normal leading-[0.9] mb-12">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="block text-black text-[clamp(52px,8vw,85px)] uppercase tracking-tight"
              >
                WEDDING
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="block text-[#C94070] italic text-[clamp(52px,8vw,85px)] tracking-tight py-2"
              >
                THEME
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="block text-black text-[clamp(52px,8vw,85px)] uppercase tracking-tight"
              >
                STUDIO
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-body text-sm md:text-base leading-relaxed mb-12 font-light max-w-sm"
            >
              We document legacies through cinematic storytelling. Based in Delhi NCR, 
              we capture the most intimate and emotional moments of your life with a signature editorial style.
            </motion.p>
            <Link to="/contact" className="inline-block bg-[#C94070] text-white px-10 py-5 uppercase tracking-[0.2em] text-[11px] font-bold hover:brightness-110 transition-all rounded-[2px] shadow-lg">
              MAKE RESERVATION
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Marquee Strip 1 */}
      <MarqueeStrip text="CAPTURING TIMELESS MOMENTS ✦ DELHI'S MOST TRUSTED WEDDING STUDIO ✦ EVERY TEAR EVERY SMILE ✦ 500+ WEDDINGS" />

      {/* About Teaser - OUR WEDDING STORY TO DATE */}
      <section className="py-32 lg:py-48 relative overflow-hidden flex items-center justify-center text-white text-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <SafeImage src={PORTFOLIO_IMAGES.ourStoryBg} className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-charcoal/60" /> {/* Dark overlay for readability */}
        </div>
        
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-white tracking-[0.3em] text-xs font-bold uppercase mb-6 block">Since 2014</span>
            <h2 className="mb-8 font-heading text-4xl lg:text-6xl uppercase leading-tight text-white drop-shadow-lg">
              OUR WEDDING <br />
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-[#C94070] italic"
              >
                STORY TO DATE
              </motion.span>
            </h2>
            <div className="space-y-6 text-white/90 font-light text-base md:text-lg leading-relaxed mb-10">
              <p>
                At Wedding Theme Studio, we don't just take pictures; we document legacies. 
                Founded by Om Prakash, our studio has spent over a decade perfecting the art of cinematic storytelling.
              </p>
              <p>
                Based in Delhi NCR, we travel across the globe to capture the most intimate, 
                vibrant, and emotional moments of your life with a signature editorial style.
              </p>
            </div>
            <Link to="/about" className="btn-rose bg-[#C94070] border-none">
              Our Full Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 5 - Planning is Overwhelming */}
      <section className="py-24 lg:py-40 bg-[#FAF8F5]">
        <div className="max-w-site mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1.2 }}
               viewport={{ once: true }}
               className="aspect-[4/5] overflow-hidden shadow-2xl relative z-10"
             >
                <SafeImage src={PORTFOLIO_IMAGES.experience} className="w-full h-full object-cover" />
             </motion.div>
             <motion.div 
               initial={{ opacity: 0, rotate: 45 }}
               whileInView={{ opacity: 0.1, rotate: 0 }}
               className="absolute -bottom-12 -right-12 w-2/3 aspect-square bg-[#C94070] -z-0" 
             />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
             <span className="section-tag">Why Us</span>
             <h2 className="mb-10 text-4xl lg:text-6xl font-heading uppercase leading-tight">
               PLANNING A WEDDING IS <br />
               <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-[#C94070] italic inline-block"
               >
                 OVERWHELMING.
               </motion.span><br />
               YOUR PHOTOGRAPHY <br />
               <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#C94070] italic inline-block"
               >
                 SHOULDN'T BE.
               </motion.span>
             </h2>
             <div className="space-y-6 text-body/70 text-lg font-light leading-relaxed mb-12 italic">
               <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>"Which rituals should we focus on?"</motion.p>
               <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>"Can we have a mix of natural and posed?"</motion.p>
               <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>"What if we're camera-shy?"</motion.p>
             </div>
             <p className="text-muted-foreground text-sm max-w-md font-light">
               We've answered these questions for 500+ couples. Our mission is to make your memories feel effortless and look timeless.
             </p>
          </motion.div>
        </div>
      </section>

      {/* Services Breakdown - CRAFTING MEMORIES */}
      <section className="py-24 lg:py-40 bg-white relative">
        <div className="max-w-site mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <span className="section-tag mx-auto">Our Expertise</span>
            <h2 className="text-4xl lg:text-6xl uppercase font-heading">
              CRAFTING <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-[#C94070] italic">MEMORIES</motion.span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Camera size={32} />, title: "WEDDING PHOTOGRAPHY", tag: "HEART & SOUL", desc: "Capturing those unposed, raw emotional moments that tell the true story of your day." },
              { icon: <Film size={32} />, title: "CINEMATIC FILMS", tag: "STORYTELLING", desc: "4K cinematic wedding films with professional grading and soulful sound design." },
              { icon: <Video size={32} />, title: "EVENT COVERAGE", tag: "PROFESSIONAL", desc: "Full coverage of your special events with multi-camera setups and high-end audio recording." },
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-12 text-center shadow-sm border border-black/5 group hover:shadow-xl transition-all duration-500"
              >
                 <div className="w-20 h-20 bg-[#C94070]/10 rounded-full flex items-center justify-center text-[#C94070] mx-auto mb-8 group-hover:bg-[#C94070] group-hover:text-white transition-all">
                    {service.icon}
                 </div>
                 <h4 className="text-lg font-bold mb-2 tracking-wider">{service.title}</h4>
                 <span className="text-[10px] text-[#C94070] font-bold tracking-[0.2em] block mb-6 uppercase">{service.tag}</span>
                 <p className="text-muted-foreground text-sm font-light leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Strip 2 */}
      <MarqueeStrip text="WEDDING PHOTOGRAPHY ✦ PRE-WEDDING SHOOTS ✦ CINEMATIC FILMS ✦ DRONE COVERAGE ✦ LUXURY ALBUMS ✦ DESTINATION WEDDINGS ✦ CANDID MOMENTS ✦ 4K VIDEOGRAPHY" />

      {/* FAQ / AEO Section - Answers to common searches */}
      <section className="py-24 lg:py-40 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="section-tag mx-auto">Common Questions</span>
            <h2 className="text-4xl lg:text-5xl uppercase font-heading">
              EVERYTHING YOU <br /><motion.span className="text-[#C94070] italic">WANT TO KNOW</motion.span>
            </h2>
          </div>
          
          <div className="space-y-8">
            {[
              { 
                q: "Looking for the best photographer near me in Delhi NCR?", 
                a: "Wedding Theme Studio is a top-rated photography studio based in Delhi NCR. We provide premium candid photography, cinematic wedding films, and professional event coverage across New Delhi, Noida, Gurgaon, and Faridabad." 
              },
              { 
                q: "What makes your wedding photography services unique?", 
                a: "We blend editorial style with raw documentary storytelling. Led by Om Prakash, our team focuses on capturing unscripted emotions and artistic frames that tell a timeless story of your legacy." 
              },
              { 
                q: "Do you travel for destination weddings?", 
                a: "Yes! While we are the preferred choice for couples searching for a 'photographer near me' in Delhi, we travel globally for destination weddings, especially across Rajasthan, Uttarakhand, and Himachal Pradesh." 
              },
              { 
                q: "How soon can we expect our wedding photos and films?", 
                a: "We prioritize quality and speed. You'll receive a teaser set within 48 hours, and the complete high-resolution edited gallery and cinematic films are typically delivered within 4 to 6 weeks." 
              }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm border border-black/5"
              >
                <h4 className="text-lg font-bold mb-3 text-charcoal flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#C94070] text-white rounded-full flex items-center justify-center text-[10px]">Q</span>
                  {faq.q}
                </h4>
                <p className="text-muted-foreground text-sm font-light leading-relaxed pl-9">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas - SEO Boost */}
      <section className="py-16 bg-white border-y border-black/5">
        <div className="max-w-site mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-8">Serving premium clients across</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-charcoal/40 font-heading text-xl uppercase italic">
            <span>New Delhi</span>
            <span>Noida</span>
            <span>Gurgaon</span>
            <span>Faridabad</span>
            <span>Ghaziabad</span>
            <span>Jaipur</span>
            <span>Udaipur</span>
          </div>
        </div>
      </section>

      {/* Global CTA - GET A FREE QUOTE */}
      <section className="py-24 lg:py-40 bg-charcoal text-white text-center relative overflow-hidden">
        <div className="max-w-Site mx-auto px-6 relative z-10">
           <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-white text-5xl lg:text-8xl mb-12 uppercase font-heading"
           >
            GET A <motion.span initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="text-[#C94070] italic">FREE QUOTE!</motion.span>
           </motion.h2>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link to="/contact" className="btn-rose bg-[#C94070]">Inquire Now</Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
