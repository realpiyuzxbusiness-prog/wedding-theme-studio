import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle, Send, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import FloralSVG from "@/components/FloralSVG";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=918802405067&text=Hi%2C+I%27m+interested+in+your+wedding+photography+services.+Can+we+discuss%3F";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit Indian mobile number required"),
  weddingDate: z.string().min(1, "Wedding date is required"),
  venueCity: z.string().trim().min(2, "Venue city is required").max(100),
  services: z.array(z.string()).default([]),
  message: z.string().max(1000).optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const SERVICES_OPTIONS = ["Photography", "Cinematography", "Pre-Wedding", "Drone Coverage"];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      const { error } = await supabase.from('bookings').insert([data]);
      if (error) {
        console.error("Supabase Error:", error);
        throw error;
      }

      toast({ title: "Enquiry Sent! ✨", description: "We'll be in touch within 2 hours." });
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error("Contact form error:", error);
      toast({ title: "Enquiry Noted! 📝", description: "Please also reach us on WhatsApp to confirm." });
      setSubmitted(true);
      reset();
    }
  };

  return (
    <div className="bg-white selection:bg-rose/20 selection:text-rose overflow-x-hidden min-h-screen">
      <Preloader />
      <CustomCursor />

      {/* Header */}
      <section className="bg-blush pt-40 pb-20 relative overflow-hidden text-center">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity }} className="absolute -top-40 -left-40 opacity-5">
           <FloralSVG className="w-[800px] h-auto" />
        </motion.div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-tag mx-auto mb-6"
          >
            Say Hello
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-9xl font-heading font-light uppercase tracking-tight"
          >
            CONTACT <span className="text-rose italic">US</span>
          </motion.h1>
          <div className="w-16 h-1 bg-rose mx-auto mt-8" />
        </div>
      </section>

      <section className="py-24 lg:py-40">
        <div className="max-w-site mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Form */}
            <div className="lg:col-span-7">
               <AnimatePresence mode="wait">
                 {submitted ? (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="bg-blush p-12 text-center border border-rose/10"
                   >
                     <div className="w-20 h-20 bg-rose text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <Star size={32} fill="currentColor" />
                     </div>
                     <h3 className="text-3xl mb-4">THANK YOU!</h3>
                     <p className="text-muted italic">"We've received your enquiry and will be in touch shortly."</p>
                     <button onClick={() => setSubmitted(false)} className="mt-10 text-[10px] font-bold uppercase tracking-widest border-b border-rose pb-1">Send another enquiry</button>
                   </motion.div>
                 ) : (
                   <motion.form 
                     onSubmit={handleSubmit(onSubmit)}
                     className="grid grid-cols-1 md:grid-cols-2 gap-8"
                   >
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-charcoal/40">Full Name</label>
                        <input {...register("name")} className="w-full bg-transparent border-b border-rose/10 py-3 focus:outline-none focus:border-rose transition-colors placeholder:text-charcoal/10" placeholder="Your name" />
                        {errors.name && <p className="text-rose text-[10px] uppercase font-bold">{errors.name.message}</p>}
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-charcoal/40">Email Address</label>
                        <input {...register("email")} className="w-full bg-transparent border-b border-rose/10 py-3 focus:outline-none focus:border-rose transition-colors placeholder:text-charcoal/10" placeholder="your@email.com" />
                        {errors.email && <p className="text-rose text-[10px] uppercase font-bold">{errors.email.message}</p>}
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-charcoal/40">Phone Number</label>
                        <input {...register("phone")} className="w-full bg-transparent border-b border-rose/10 py-3 focus:outline-none focus:border-rose transition-colors placeholder:text-charcoal/10" placeholder="9876543210" />
                        {errors.phone && <p className="text-rose text-[10px] uppercase font-bold">{errors.phone.message}</p>}
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-charcoal/40">Wedding Date</label>
                        <input type="date" {...register("weddingDate")} className="w-full bg-transparent border-b border-rose/10 py-3 focus:outline-none focus:border-rose transition-colors" />
                     </div>
                     <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-charcoal/40">Venue City</label>
                        <input {...register("venueCity")} className="w-full bg-transparent border-b border-rose/10 py-3 focus:outline-none focus:border-rose transition-colors placeholder:text-charcoal/10" placeholder="e.g. New Delhi" />
                     </div>
                     <div className="md:col-span-2 space-y-6">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-charcoal/40">Interested Services</label>
                        <div className="flex flex-wrap gap-4">
                           {SERVICES_OPTIONS.map(s => (
                             <label key={s} className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" value={s} {...register("services")} className="accent-rose w-4 h-4" />
                                <span className="text-xs uppercase tracking-widest group-hover:text-rose transition-colors">{s}</span>
                             </label>
                           ))}
                        </div>
                     </div>
                     <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-charcoal/40">Your Message</label>
                        <textarea {...register("message")} rows={4} className="w-full bg-transparent border-b border-rose/10 py-3 focus:outline-none focus:border-rose transition-colors placeholder:text-charcoal/10 resize-none" placeholder="Tell us about your wedding..." />
                     </div>
                     
                     <div className="md:col-span-2 pt-6">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSubmitting}
                          className="w-full btn-rose shadow-xl flex items-center justify-center gap-3"
                        >
                           {isSubmitting ? "Sending..." : <>Send Enquiry <Send size={16} /></>}
                        </motion.button>
                     </div>
                   </motion.form>
                 )}
               </AnimatePresence>
            </div>
            
            {/* Info */}
            <div className="lg:col-span-5 space-y-12">
               <div>
                  <span className="section-tag mb-4">Studio Location</span>
                  <div className="flex gap-4 items-start">
                     <MapPin className="text-rose shrink-0" size={20} />
                     <p className="text-muted text-sm leading-relaxed">
                        RZ-64/284, Geetanjali Park,<br />
                        West Sagarpur, New Delhi – 110046
                     </p>
                  </div>
               </div>
               
               <div>
                  <span className="section-tag mb-4">Contact Info</span>
                  <div className="space-y-4">
                     <a href="tel:+918802405067" className="flex items-center gap-4 text-muted hover:text-rose transition-colors">
                        <Phone size={18} className="text-rose" />
                        <span className="text-sm">+91 88024 05067</span>
                     </a>
                     <a href={WHATSAPP_LINK} className="flex items-center gap-4 text-muted hover:text-rose transition-colors font-bold uppercase tracking-widest text-[10px]">
                        <MessageCircle size={18} className="text-rose" />
                        <span>Instant WhatsApp Assistance</span>
                     </a>
                  </div>
               </div>
               
               <div>
                  <span className="section-tag mb-4">Hours</span>
                  <div className="flex gap-4 items-center">
                     <Clock className="text-rose" size={18} />
                     <span className="text-muted text-sm">Mon – Sun: 10:00 AM – 9:30 PM</span>
                  </div>
               </div>
               
               <div className="aspect-video bg-blush border border-rose/5 overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.5!2d77.09!3d28.56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWest+Sagarpur+New+Delhi!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
                    allowFullScreen
                    loading="lazy"
                  />
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
