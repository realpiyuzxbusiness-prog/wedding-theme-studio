import { Link } from "react-router-dom";
import heroImg from "@/assets/wedding-couple-3.webp";

const NotFound = () => (
  <div
    className="relative min-h-screen flex items-center justify-center"
    style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
  >
    <div className="absolute inset-0 bg-black/80" />
    <div className="relative z-10 text-center px-6">
      <p className="text-xs text-gold uppercase tracking-[0.2em] mb-4">Error 404</p>
      <h1 className="font-heading text-white text-5xl md:text-7xl mb-4">
        THIS FRAME DIDN'T DEVELOP.
      </h1>
      <p className="text-white/60 text-base mb-8">
        The page you're looking for has moved or doesn't exist.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-solid-gold">Back to Home</Link>
        <Link to="/portfolio" className="btn-outline-gold border-white text-white hover:bg-white hover:text-charcoal">View Portfolio</Link>
      </div>
    </div>
  </div>
);

export default NotFound;
