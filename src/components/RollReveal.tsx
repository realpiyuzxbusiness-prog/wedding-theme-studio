import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  staggerChildren?: boolean;
}

/**
 * A component that provides a premium "Roll-Down" reveal effect.
 * Elements appear to roll down from the top into place with 3D perspective.
 */
const RollReveal = ({ 
  children, 
  delay = 0, 
  duration = 1.2, 
  className = "",
  staggerChildren = false
}: RollRevealProps) => {
  
  if (staggerChildren) {
    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay
        }
      }
    };

    const item = {
      hidden: { 
        opacity: 0, 
        rotateX: 25, 
        y: -60,
        transformPerspective: 1200
      },
      show: { 
        opacity: 1, 
        rotateX: 0, 
        y: 0,
        transition: {
          duration: duration,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    };

    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        rotateX: 25, 
        y: -60,
        transformPerspective: 1200
      }}
      whileInView={{ 
        opacity: 1, 
        rotateX: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
      style={{ transformOrigin: "top center" }}
    >
      {children}
    </motion.div>
  );
};

export default RollReveal;
