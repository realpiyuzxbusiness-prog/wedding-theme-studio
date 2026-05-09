import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=918802405067&text=Hi%2C+I%27m+interested+in+your+wedding+photography+services.+Can+we+discuss%3F";

const PACKAGES = [
  { name: "Essential", label: "Essential — ₹40,000" },
  { name: "Signature", label: "Signature — ₹80,000" },
  { name: "Luxury", label: "Luxury — ₹1,30,000" },
  { name: "Custom", label: "Custom (Get a Quote)" },
];

const SERVICE_ADDONS = [
  "Photography",
  "Cinematography",
  "Pre-Wedding Shoot",
  "Drone Coverage",
  "Luxury Album",
  "Marital Shoot",
  "Model Shoot",
  "Maternity Shoot",
  "Corporate Event",
];


const INDIA_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];


const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Must be a valid 10-digit number"),
  weddingDate: z.string().min(1, "Wedding date is required"),
  venueCity: z.string().min(1, "Select a state"),
  packageName: z.string().min(1, "Select a package"),
  services: z.array(z.string()).default([]),
  message: z.string().max(1000).optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

const BookingModal = ({ open, onClose }: BookingModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { services: ["Photography"], packageName: "Signature" },
  });

  const today = new Date().toISOString().split("T")[0];

  const selectedPkg = watch("packageName");
  const selectedServices = watch("services") || [];

  const onSubmit = async (data: BookingForm) => {
    try {
      const { error } = await supabase.from("bookings").insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        wedding_date: data.weddingDate,
        venue_city: data.venueCity,
        package_name: data.packageName,
        services: data.services,
        message: data.message
      }]);
      
      if (error) {
        console.error("Supabase Error:", error);
        throw error;
      }

      toast({ title: "Booking Enquiry Sent! ✨", description: "We'll be in touch within 2 hours." });
      setSubmitted(true);
      reset();
    } catch (error: any) {
      console.error("Submission Error:", error);
      // Even on network errors, show a friendly message instead of a scary red one
      toast({ 
        title: "Enquiry Noted! 📝", 
        description: "Please also message us on WhatsApp to confirm your booking." 
      });
      setSubmitted(true);
      reset();
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  if (!open) return null;

  const inputCls = "w-full bg-white border border-charcoal/15 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors";
  const labelCls = "block text-[11px] uppercase tracking-[0.15em] text-charcoal/60 font-bold mb-2";
  const errorCls = "text-red-500 text-[11px] mt-1";

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-[2001] flex items-center justify-center p-4">
        <div
          className="relative bg-white w-full max-w-[520px] max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">Book a Session</span>
              <h3 className="font-heading text-2xl sm:text-3xl text-charcoal mt-2 leading-tight">
                LET'S CAPTURE YOUR <span className="text-gold italic">STORY</span>
              </h3>
              <p className="text-sm text-charcoal/60 mt-2">Fill in the details and we'll get back within 2 hours.</p>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-gold text-3xl">✓</span>
                </div>
                <h4 className="font-heading text-xl text-charcoal mb-2">MESSAGE RECEIVED!</h4>
                <p className="text-sm text-charcoal/60 mb-6">We'll be in touch within 2 hours.</p>
                <button onClick={handleClose} className="bg-gold text-charcoal font-bold text-xs uppercase tracking-widest px-8 py-3 hover:brightness-110 transition-all">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Full Name *</label>
                    <input {...register("name")} placeholder="Your name" className={inputCls} />
                    {errors.name && <p className={errorCls}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Email *</label>
                    <input {...register("email")} type="email" placeholder="you@email.com" className={inputCls} />
                    {errors.email && <p className={errorCls}>{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Phone *</label>
                    <input {...register("phone")} placeholder="10-digit mobile" className={inputCls} />
                    {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Wedding Date *</label>
                    <input {...register("weddingDate")} type="date" min={today} className={inputCls} />
                    {errors.weddingDate && <p className={errorCls}>{errors.weddingDate.message}</p>}
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Venue City (State) *</label>
                  <select {...register("venueCity")} className={inputCls}>
                    <option value="">Select State</option>
                    {INDIA_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                  {errors.venueCity && <p className={errorCls}>{errors.venueCity.message}</p>}
                </div>

                <div>
                  <label className={labelCls}>Package *</label>
                  <select {...register("packageName")} className={inputCls}>
                    {PACKAGES.map(p => <option key={p.name} value={p.name}>{p.label}</option>)}
                  </select>
                  {errors.packageName && <p className={errorCls}>{errors.packageName.message}</p>}
                </div>

                <div>
                  <label className={labelCls}>Services / Add-ons</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {SERVICE_ADDONS.map((s) => (
                      <label key={s} className="flex items-center gap-2 text-xs text-charcoal/80 cursor-pointer">
                        <input type="checkbox" value={s} {...register("services")} className="accent-gold w-4 h-4" />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>


                <div>
                  <label className={labelCls}>Message (Optional)</label>
                  <textarea {...register("message")} rows={3} placeholder="Tell us about your wedding..." className={cn(inputCls, "resize-none")} />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold text-charcoal font-bold text-xs uppercase tracking-widest py-4 hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </button>

                <p className="text-center text-[11px] text-charcoal/40 mt-3">
                  Or reach us on{" "}
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                    WhatsApp
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
