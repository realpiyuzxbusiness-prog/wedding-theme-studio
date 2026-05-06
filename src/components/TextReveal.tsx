import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

const TextReveal = ({ children, text, className, delay = 0, as: Component = "span" }: TextRevealProps) => {
  // Use provided text string, or extract text from children if it's a string
  const content = text || (typeof children === 'string' ? children : '');
  
  if (!content && children) {
    // If it's complex children (not a string), just do a simple fade up
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const words = content.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transform: "translateY(0%) rotate(0deg)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(5px)",
      transform: "translateY(50%) rotate(2deg)",
    },
  };

  return (
    <Component className={cn("", className)}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="inline-flex flex-wrap"
      >
        {words.map((word, index) => (
          <motion.span
            variants={child}
            style={{ marginRight: "0.25em" }}
            key={index}
            className="inline-block"
            dangerouslySetInnerHTML={{ __html: word.replace(/\n/g, '<br/>') }}
          />
        ))}
      </motion.span>
    </Component>
  );
};

export default TextReveal;
