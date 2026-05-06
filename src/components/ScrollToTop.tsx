import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-[calc(2rem+52px+1rem)] z-50 w-11 h-11 border border-[#E8E0D5] bg-white/80 backdrop-blur-sm flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all"
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  );
};

export default ScrollToTop;
