import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

const Support = () => (
  <div className="bg-white">
    <section className="bg-blush py-24 lg:py-32 text-center px-6">
      <span className="section-tag mx-auto text-sukuna">Support</span>
      <h1 className="uppercase text-4xl md:text-5xl lg:text-6xl">We're <span className="text-sukuna italic">here for you</span></h1>
      <p className="text-muted max-w-xl mx-auto mt-6 font-light">Existing client? Need delivery updates, file re-shares, or album revisions? Use the channels below.</p>
    </section>

    <section className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        { Icon: Phone, title: "Call Us", value: "+91 88024 05067", href: "tel:+918802405067" },
        { Icon: MessageCircle, title: "WhatsApp", value: "Chat with our team", href: "https://wa.me/918802405067" },
        { Icon: Mail, title: "Email", value: "opomprakash011@gmail.com", href: "mailto:opomprakash011@gmail.com" },
        { Icon: Clock, title: "Working Hours", value: "10:00 AM – 9:30 PM (Mon–Sun)", href: "#" },
      ].map(({ Icon, title, value, href }) => (
        <a key={title} href={href} target="_blank" rel="noopener noreferrer" className="border border-rose/15 p-8 flex items-start gap-4 hover:shadow-lg transition-shadow group">
          <div className="w-12 h-12 bg-blush rounded-full flex items-center justify-center text-rose group-hover:bg-rose group-hover:text-white transition-colors">
            <Icon size={20} />
          </div>
          <div>
            <h3 className="uppercase text-lg mb-2">{title}</h3>
            <p className="text-muted font-light">{value}</p>
          </div>
        </a>
      ))}
    </section>

    <section className="max-w-3xl mx-auto px-6 pb-24">
      <div className="border border-rose/15 p-8 flex items-start gap-4">
        <MapPin className="text-rose mt-1" size={20} />
        <div>
          <h3 className="uppercase text-lg mb-2">Studio Address</h3>
          <p className="text-muted font-light leading-relaxed">RZ-64/284, Geetanjali Park, West Sagarpur, New Delhi – 110046</p>
        </div>
      </div>
    </section>
  </div>
);

export default Support;
