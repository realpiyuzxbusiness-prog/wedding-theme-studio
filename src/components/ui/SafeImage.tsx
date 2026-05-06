import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  placeholderSrc?: string;
  containerClassName?: string;
}

/**
 * A robust image component that handles errors and shows a placeholder.
 */
const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className,
  fallbackText,
  placeholderSrc = "/studio-images/portfolio-placeholder.svg",
  containerClassName,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inView, setInView] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading 200px before it enters
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden w-full h-full bg-blush/30", containerClassName)}
    >
      {(loading || !inView) && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-rose/10 border-t-rose animate-spin opacity-20"></div>
        </div>
      )}
      
      {inView && !error ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-1000 ease-out",
            loading ? "opacity-0 scale-110 blur-sm" : "opacity-100 scale-100 blur-0",
            className
          )}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          {...props}
        />
      ) : error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-surface border border-charcoal/5">
          <img 
            src={placeholderSrc} 
            alt="Placeholder" 
            className="w-16 h-16 opacity-20 mb-3"
          />
          {fallbackText && (
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/30">
              {fallbackText}
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SafeImage;
