import { motion, useScroll, useTransform } from "framer-motion";
import SafeImage from "@/components/ui/SafeImage";
import { PORTFOLIO_IMAGES } from "@/config/images";
import FloralSVG from "@/components/FloralSVG";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { Award, Camera, Heart, Users, Star } from "lucide-react";
import RollReveal from "@/components/RollReveal";

// Floating Animation Helper
const floatAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const
  }
};

const About = () => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="bg-white selection:bg-rose/20 selection:text-rose overflow-x-hidden">
      <Preloader />
      <CustomCursor />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-charcoal">
        <motion.div 
          style={{ y: yParallax }}
          className="absolute inset-0 z-0 opacity-60"
        >
          <SafeImage 
            src={PORTFOLIO_IMAGES.brideNoseRing} 
            alt="Luxury Wedding Story" 
            className="w-full h-full object-cover object-center scale-110"
            loading="eager"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/80" />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center px-6 mt-32 lg:mt-0"
        >
          <span className="text-rose font-heading italic text-xl mb-4 block">Est. 2014</span>
          <h1 className="text-white text-6xl lg:text-9xl font-heading font-light uppercase tracking-tight">
            OUR <span className="text-rose italic">STORY</span>
          </h1>
          <div className="w-24 h-[1px] bg-rose/50 mx-auto mt-8" />
        </motion.div>
      </section>

      {/* Founder Section */}
      <section className="py-24 lg:py-40 bg-white relative">
        <motion.div animate={floatAnimation} className="absolute top-20 right-10 opacity-10">
          <FloralSVG className="w-60 h-auto" variant={1} />
        </motion.div>
        
        <div className="max-w-site mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <RollReveal className="lg:col-span-6">
            <span className="section-tag">The Visionary</span>
            <h2 className="mb-8">OM PRAKASH <br /><span className="text-rose italic">Lead Storyteller</span></h2>
            <div className="space-y-6 text-body text-base leading-relaxed mb-10 font-light">
              <p>
                Om Prakash founded Wedding Theme Studio in 2014 with a simple but radical idea: 
                wedding photography shouldn't be about posing people — it should be about catching them being themselves.
              </p>
              <p>
                Over the past decade, that philosophy has taken him across Delhi, Rajasthan, 
                the hills of Himachal, and beyond — 500+ weddings, and counting.
              </p>
              <p>
                His approach is quiet observation and fast reflexes. His team is small on purpose. 
                And every couple who books with Wedding Theme Studio gets Om's personal attention from the first call to the final delivery.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <span className="text-4xl font-heading text-rose block mb-1">500+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted">Weddings Captured</span>
              </div>
              <div>
                <span className="text-4xl font-heading text-rose block mb-1">10+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted">Years Exp.</span>
              </div>
            </div>
          </RollReveal>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative"
          >
            <div className="aspect-[4/5] overflow-hidden shadow-2xl relative z-10">
              <SafeImage src="/studio-images/owner-1.jpg" alt="Om Prakash" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blush -z-0" />
            <motion.div animate={floatAnimation} className="absolute -top-10 -right-10 z-20">
               <div className="bg-white p-6 shadow-xl flex items-center gap-4">
                  <Award className="text-rose" size={32} />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest">Award Winning</p>
                    <p className="text-rose font-heading italic">Artist of 2024</p>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid (Mini) */}
      <section className="bg-blush py-24 lg:py-40">
        <div className="max-w-site mx-auto px-6">
          <RollReveal className="text-center mb-20">
            <span className="section-tag mx-auto">What We Value</span>
            <h2>OUR CORE <span className="text-rose italic">PHILOSOPHY</span></h2>
          </RollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Authenticity", icon: <Heart size={32} />, desc: "We believe in capturing real moments as they unfold, without forcing or scripting emotions." },
              { title: "Quality", icon: <Camera size={32} />, desc: "High-end equipment and cinematic editing ensure your memories are preserved in stunning detail." },
              { title: "Personal Touch", icon: <Users size={32} />, desc: "We maintain a boutique approach, ensuring every wedding gets our heart and soul." },
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial="hidden"
                whileInView="visible"
                variants={{
                  hidden: { opacity: 0, y: -40, rotateX: 10 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, delay: i * 0.1 } }
                }}
                viewport={{ once: true }}
                style={{ transformOrigin: "top center" }}
                className="bg-white p-12 text-center border border-rose/10 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-blush rounded-full flex items-center justify-center text-rose mx-auto mb-8">
                  {item.icon}
                </div>
                <h3 className="text-xl mb-4 uppercase">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 lg:py-40 bg-charcoal text-white text-center relative overflow-hidden">
        <FloralSVG className="absolute top-0 left-0 w-80 h-auto opacity-10" variant={2} />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl lg:text-5xl font-heading font-light leading-snug italic"
          >
            "A cinematic approach that prioritizes authentic, natural emotions over scripted poses — storytelling through visual media."
          </motion.p>
          <div className="w-16 h-1 bg-rose mx-auto mt-12 mb-8" />
          <p className="uppercase tracking-[0.3em] text-[10px] font-bold text-rose">Wedding Theme Studio</p>
        </div>
      </section>
    </div>
  );
};

export default About;
