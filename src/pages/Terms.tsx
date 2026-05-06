import { Link } from "react-router-dom";

const SECTIONS = [
  {
    title: "1. Booking & Payment",
    body: [
      "A signed agreement and a non-refundable booking advance of 30% of the package value is required to confirm your date.",
      "The remaining balance is payable in two instalments — 40% one week before the event and the final 30% on or before delivery of edited files.",
      "Payments may be made via bank transfer, UPI, or cheque. GST, if applicable, is charged extra.",
      "Travel, stay and out-of-station logistics for destination shoots are billed at actuals over and above the package price.",
    ],
  },
  {
    title: "2. Cancellation & Rescheduling",
    body: [
      "The booking advance is non-refundable but is transferable to a new mutually agreed date within 12 months, subject to availability.",
      "Cancellations made within 30 days of the event date will require payment of 50% of the total package value to compensate for blocked dates.",
      "If Wedding Theme Studio cannot deliver due to a force majeure event (illness, accident, natural calamity), a suitable replacement team of equal standard will be arranged or the advance refunded in full.",
    ],
  },
  {
    title: "3. Coverage, Delivery & Storage",
    body: [
      "Edited photo highlights are delivered within 2–3 weeks. Full galleries within 6–8 weeks. Cinematic films within 8–12 weeks of the event.",
      "Final files are delivered through a private password-protected online gallery and a USB/pen drive on request.",
      "Raw / unedited files are not part of any package and remain the property of the studio.",
      "We retain final delivered files for 12 months from delivery date. Clients are advised to back up their files immediately upon receipt.",
    ],
  },
  {
    title: "4. Usage Rights & Copyright",
    body: [
      "Copyright of all photographs and films remains with Wedding Theme Studio.",
      "Clients receive a perpetual, non-exclusive personal-use license — they may print, share and post on personal social media without restriction.",
      "Wedding Theme Studio retains the right to use delivered images and films for portfolio, website, social media, exhibitions, awards entries and marketing material, with appropriate credit.",
      "Commercial use, resale, or use by third parties (publications, brands, vendors) requires prior written permission and may be subject to a licensing fee.",
    ],
  },
  {
    title: "5. Liability",
    body: [
      "While we use professional backup equipment and dual-card recording, our liability in case of equipment failure, data loss, or any unforeseen incident is limited to a refund of fees paid for the affected coverage.",
      "We are not responsible for missed shots due to obstruction by guests, other vendors, or restrictions imposed by the venue.",
    ],
  },
];

const Terms = () => (
  <div className="bg-white">
    <section className="bg-blush py-24 lg:py-32 text-center px-6">
      <span className="section-tag mx-auto text-sukuna">Legal</span>
      <h1 className="uppercase text-4xl md:text-5xl lg:text-6xl">Terms <span className="text-sukuna italic">& Conditions</span></h1>
      <p className="text-muted max-w-2xl mx-auto mt-6 font-light">
        Booking, cancellation and usage rights for all services delivered by Wedding Theme Studio.
      </p>
    </section>

    <section className="max-w-3xl mx-auto px-6 py-20 space-y-12">
      {SECTIONS.map((s) => (
        <article key={s.title}>
          <h2 className="font-heading text-2xl uppercase tracking-tight text-charcoal mb-5">{s.title}</h2>
          <ul className="space-y-3 text-muted font-light leading-relaxed text-[15px]">
            {s.body.map((p, i) => <li key={i} className="pl-4 border-l-2 border-rose/20">{p}</li>)}
          </ul>
        </article>
      ))}

      <p className="text-xs text-muted/70 pt-8 border-t border-rose/10">
        Last updated: May 2026. For any clarifications, please <Link to="/contact" className="text-rose hover:underline">contact us</Link>.
      </p>
    </section>
  </div>
);

export default Terms;
