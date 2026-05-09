import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import FloralSVG from "./FloralSVG";

const Footer = () => (
  <footer className="bg-blush pt-24 pb-12 relative overflow-hidden border-t border-rose/10 transition-colors duration-500">
    <FloralSVG className="absolute left-0 bottom-0 w-60 h-auto opacity-5" variant={1} />
    <FloralSVG className="absolute right-0 bottom-0 w-60 h-auto opacity-5 scale-x-[-1]" variant={1} />
    
    <div className="max-w-site mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center pb-20 border-b border-rose/10 mb-20 gap-8">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Wedding Theme Studio" className="h-16 w-auto object-contain" />
          <span className="logo-font text-3xl text-charcoal hover:text-rose transition-colors hidden sm:inline-block">
            Wedding <span className="text-rose">Theme</span> Studio
          </span>
        </Link>
        <div className="flex gap-4">
           {[
             { Icon: Facebook, href: "https://www.facebook.com/100067947641476/photos/" },
             { Icon: Instagram, href: "https://instagram.com/weddingthemestudio" },
             { Icon: Youtube, href: "https://www.youtube.com/@weddingthemestudio" },
             { Icon: Linkedin, href: "https://www.linkedin.com/" },
           ].map(({ Icon, href }, i) => (
             <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-rose/20 rounded-full flex items-center justify-center text-rose hover:bg-rose hover:text-white transition-all duration-500">
                <Icon size={18} />
             </a>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        <div>
          <h4 className="font-heading text-xl mb-8 uppercase tracking-widest text-charcoal">Contact Info</h4>
          <ul className="space-y-4 text-muted text-[13px] font-body">
            <li className="flex items-center gap-3"><Phone size={14} className="text-rose" /> +91 88024 05067</li>
            <li className="flex items-center gap-3"><Mail size={14} className="text-rose" /> opomprakash011@gmail.com</li>
            <li className="flex items-center gap-3 mt-4">
              <MapPin size={18} className="text-rose self-start mt-0.5" /> 
              <span className="leading-relaxed">RZ-64/284, Geetanjali Park, West Sagarpur, New Delhi – 110046</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-xl mb-8 uppercase tracking-widest text-charcoal">Information</h4>
          <ul className="space-y-3 text-muted text-[13px] font-body uppercase tracking-wider">
            <li><Link to="/about" className="hover:text-rose transition-colors">Our Team</Link></li>
            <li><Link to="/help" className="hover:text-rose transition-colors">Faq's</Link></li>
            <li><Link to="/contact" className="hover:text-rose transition-colors">Contact</Link></li>
            <li><Link to="/services" className="hover:text-rose transition-colors">What we do</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-xl mb-8 uppercase tracking-widest text-charcoal">Quick Links</h4>
          <ul className="space-y-3 text-muted text-[13px] font-body uppercase tracking-wider">
            <li><Link to="/about" className="hover:text-rose transition-colors">About Us</Link></li>
            <li><Link to="/portfolio" className="hover:text-rose transition-colors">Portfolio</Link></li>
            <li><Link to="/pricing" className="hover:text-rose transition-colors">Pricing</Link></li>
            <li><Link to="/terms" className="hover:text-rose transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/support" className="hover:text-rose transition-colors">Support</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-xl mb-8 uppercase tracking-widest text-charcoal">Subscribe Now</h4>
          <p className="text-muted text-[13px] mb-6 font-body">Don’t worry we don’t spam your email</p>
          <div className="flex flex-col gap-3">
            <input type="email" placeholder="Email Address" className="bg-white border border-rose/10 px-6 py-4 text-xs focus:outline-none focus:border-rose transition-colors" />
            <button className="btn-rose w-full py-4">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="text-center pt-12 border-t border-rose/10">
        <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-muted">
          © {new Date().getFullYear()} <span className="text-rose">Wedding Theme Studio.</span> All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
