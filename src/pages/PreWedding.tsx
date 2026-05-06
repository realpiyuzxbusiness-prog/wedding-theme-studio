import { useState } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import img1 from "@/assets/wedding-prewedding.png";
import img2 from "@/assets/wedding-couple-1.webp";
import img3 from "@/assets/wedding-couple-2.png";
import img4 from "@/assets/wedding-couple-3.webp";
import img5 from "@/assets/wedding-mehndi.webp";
import img6 from "@/assets/wedding-mehndi-2.webp";
import img7 from "@/assets/wedding-bride-1.png";
import img8 from "@/assets/wedding-bride-2.webp";
const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=918802405067&text=Hi%2C+I%27m+interested+in+your+pre-wedding+photography+services.+Can+we+discuss%3F";
const IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img1, img3, img5, img7];
const PreWedding = () => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  return (
    <div className="bg-white">
      <div className="pt-24" />
      <section className="max-w-site mx-auto px-6 md:px-12 py-12">
        <RevealOnScroll>
          <span className="section-tag">Pre-Wedding Shoots</span>
          <h1 className="section-h2">PRE-WEDDING SHOOTS</h1>
          <p className="font-serif italic text-base text-muted-foreground mb-4">Delhi · Rajasthan · Himachal · Destination</p>
          <p className="text-body text-[15px] leading-[1.8] max-w-xl">Before the wedding day arrives, there is a story worth telling. Pre-wedding shoots are our chance to photograph you as you are — relaxed, playful, in love.</p>
        </RevealOnScroll>
      </section>
      <section className="max-w-site mx-auto px-6 md:px-12 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {IMAGES.map((img, i) => (
            <RevealOnScroll key={i} delay={i * 60}>
              <div className="relative group overflow-hidden cursor-pointer aspect-[3/4]" onClick={() => setLightboxSrc(img)}>
                <img src={img} alt={`Pre-wedding ${i + 1}`} className="w-full h-full object-cover group-hover:scale-[1.04] transition-all duration-300" loading="lazy" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/35 transition-colors flex items-center justify-center">
                  <span className="font-heading text-xl text-gold tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity">VIEW</span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
      <section className="py-16 text-center">
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-solid-gold">Book a Pre-Wedding Shoot</a>
      </section>
      {lightboxSrc && (
        <div className="fixed inset-0 z-[2000] bg-black/[0.92] flex items-center justify-center" onClick={() => setLightboxSrc(null)}>
          <span className="absolute top-6 right-8 text-white text-[40px] cursor-pointer leading-none">×</span>
          <img src={lightboxSrc} alt="Full size" className="max-w-[90vw] max-h-[90vh] object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};
export default PreWedding;
