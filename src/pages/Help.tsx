import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, HelpCircle } from "lucide-react";

const FAQS = [
  { q: "How do I book a wedding session?", a: "Click 'Get a Quotation' or 'Make Reservation' on any page, fill the enquiry form, and our team will contact you within 24 hours to discuss dates, packages and venues." },
  { q: "What areas do you cover?", a: "We are based in Delhi NCR and travel across India for destination weddings. Travel charges may apply outside Delhi NCR." },
  { q: "When should I book my date?", a: "We recommend booking 6–12 months in advance for peak wedding season (October–February). For 2026 dates, bookings are open from April onwards." },
  { q: "Do you provide both photo and video?", a: "Yes — wedding photography, cinematic 4K films, pre-wedding shoots and drone coverage are all offered. See the Services page for details." },
  { q: "How long until we receive our photos?", a: "Edited highlights are delivered within 2–3 weeks. Full albums and cinematic films are delivered within 8–12 weeks." },
  { q: "What is your cancellation / refund policy?", a: "Booking advances are non-refundable but transferable to a new date within 12 months, subject to availability. Detailed terms are shared with the contract." },
];

const Help = () => (
  <div className="bg-white">
    <section className="bg-blush py-24 lg:py-32 text-center px-6">
      <span className="section-tag mx-auto text-sukuna">Help Centre</span>
      <h1 className="uppercase text-4xl md:text-5xl lg:text-6xl">How can we <span className="text-sukuna italic">help you?</span></h1>
      <p className="text-muted max-w-xl mx-auto mt-6 font-light">Answers to the most common questions from couples planning their wedding with us.</p>
    </section>

    <section className="max-w-3xl mx-auto px-6 py-20">
      <div className="space-y-6">
        {FAQS.map((f) => (
          <details key={f.q} className="group border border-rose/15 bg-white p-6 open:shadow-md transition-shadow">
            <summary className="flex items-start gap-3 cursor-pointer list-none">
              <HelpCircle className="text-rose mt-1 flex-shrink-0" size={18} />
              <span className="font-heading text-lg text-charcoal">{f.q}</span>
            </summary>
            <p className="text-muted leading-relaxed font-light mt-4 ml-7">{f.a}</p>
          </details>
        ))}
      </div>
    </section>

    <section className="bg-charcoal text-white py-20 text-center px-6">
      <h2 className="uppercase text-3xl md:text-4xl mb-6">Still need <span className="text-sukuna italic">help?</span></h2>
      <p className="text-white/70 mb-10 font-light">Reach out — we usually respond within a few hours.</p>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <a href="tel:+918802405067" className="btn-rose flex items-center gap-2"><Phone size={16} /> +91 88024 05067</a>
        <a href="mailto:opomprakash011@gmail.com" className="btn-outline-rose text-white border-white/40 hover:bg-white hover:text-charcoal flex items-center gap-2"><Mail size={16} /> Email Us</a>
        <Link to="/support" className="btn-outline-rose text-white border-white/40 hover:bg-white hover:text-charcoal flex items-center gap-2"><MessageCircle size={16} /> Support</Link>
      </div>
    </section>
  </div>
);

export default Help;
