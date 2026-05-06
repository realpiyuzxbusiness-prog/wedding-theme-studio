import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dotRef.current && followerRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        
        // Follower with slight delay
        setTimeout(() => {
          if (followerRef.current) {
            followerRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
          }
        }, 50);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-rose rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out" 
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-rose/30 rounded-full pointer-events-none z-[9998] transition-transform duration-300 ease-out" 
      />
    </>
  );
};

export default CustomCursor;
