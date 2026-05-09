import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Clock, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import BookingModal from "./BookingModal";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Packages", path: "/pricing" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      
      {/* Top Bar */}
      <div className="hidden lg:block bg-blush border-b border-rose/15 py-2 px-10 relative z-[1001]">
        <div className="max-w-site mx-auto flex justify-between items-center text-[12px] font-body text-muted tracking-wider">
          <div className="flex gap-8">
            <span className="flex items-center gap-2"><Clock size={12} className="text-rose" /> Working: 10:00am – 9:30pm</span>
            <span className="flex items-center gap-2"><Mail size={12} className="text-rose" /> opomprakash011@gmail.com</span>
          </div>
          <div className="flex gap-6 items-center">
            <div className="flex gap-4 border-r border-rose/15 pr-6">
              <Link to="/help" className="hover:text-rose transition-colors">Help</Link>
              <Link to="/support" className="hover:text-rose transition-colors">Support</Link>
              <Link to="/contact" className="hover:text-rose transition-colors">Contact</Link>
            </div>
            <div className="flex gap-4 items-center pl-2">
              <span className="text-[10px] uppercase font-bold text-charcoal/40">Visit Us:</span>
              <a href="https://www.facebook.com/100067947641476/photos/" target="_blank" rel="noopener noreferrer" className="hover:text-rose transition-colors"><Facebook size={14} /></a>
              <a href="https://instagram.com/weddingthemestudio" target="_blank" rel="noopener noreferrer" className="hover:text-rose transition-colors"><Instagram size={14} /></a>
              <a href="https://www.youtube.com/@weddingthemestudio" target="_blank" rel="noopener noreferrer" className="hover:text-rose transition-colors"><Youtube size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      <nav
        className={cn(
          "sticky top-0 left-0 right-0 z-[1000] w-full transition-all duration-500 py-6 px-6 lg:px-10 flex justify-between items-center",
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-white"
        )}
      >
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Wedding Theme Studio" className="h-12 w-auto object-contain" />
          <span className="logo-font text-charcoal hidden sm:inline-block">
            Wedding <span className="text-rose">Theme</span> Studio
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex gap-10 items-center">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={cn(
                "nav-link",
                location.pathname === link.path && "nav-link-active text-rose"
              )}
            >
              {link.label}
            </Link>
          ))}
          <button 
            onClick={() => setBookingOpen(true)}
            className="btn-rose ml-4"
          >
            Get a Quotation
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden text-charcoal p-2"
          aria-label="Toggle menu"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div className={cn(
        "fixed inset-0 z-[2000] bg-white transition-transform duration-700 flex flex-col p-10",
        mobileOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <button 
          className="self-end text-charcoal mb-10 p-2"
          onClick={() => setMobileOpen(false)}
        >
          <X size={32} />
        </button>
        <div className="flex flex-col gap-8 items-center justify-center flex-1">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="font-heading text-4xl text-charcoal hover:text-rose transition-colors uppercase"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button 
            onClick={() => { setBookingOpen(true); setMobileOpen(false); }}
            className="btn-rose mt-10"
          >
            Get a Quotation
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
