import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import sakuraPetal from "@/assets/custom-petal-white-bg-removed.png";

// A single randomly generated falling petal
const FallingPetal = ({ delay, duration, size, startX, xOffset, rotateStart, rotateEnd }: any) => {
  return (
    <motion.div
      initial={{ top: "-10vh", left: `${startX}vw`, rotate: rotateStart, opacity: 0 }}
      animate={{ 
        top: "110vh", 
        left: `${startX + xOffset}vw`, 
        rotate: rotateEnd, 
        opacity: [0, 0.8, 0.8, 0] 
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      className="fixed z-[60] pointer-events-none opacity-80"
      style={{
        width: `${size}px`,
      }}
    >
      <img src={sakuraPetal} alt="" className="w-full h-auto" />
    </motion.div>
  );
};

const FallingPetals = ({ count = 15 }: { count?: number }) => {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    // Generate random values only once on client side to avoid hydration mismatch
    const generatedPetals = [...Array(count)].map(() => ({
      size: 15 + Math.random() * 25, // 15px to 40px
      delay: Math.random() * -20, // Random negative delay so they are scattered completely on mount
      duration: 10 + Math.random() * 15, // 10s to 25s falling time
      startX: Math.random() * 100, // 0 to 100vw
      xOffset: (Math.random() - 0.5) * 30, // Drift across X axis by up to 15vw
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 720,
    }));
    setPetals(generatedPetals);
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[40]">
      {petals.map((props, i) => (
        <FallingPetal key={i} {...props} />
      ))}
    </div>
  );
};

export default FallingPetals;
