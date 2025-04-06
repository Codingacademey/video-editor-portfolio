import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type ParallaxSectionProps = {
  children: ReactNode;
  speed?: number; // Negative for scroll faster, positive for slower than normal
  className?: string;
};

export default function ParallaxSection({ 
  children, 
  speed = 0.2, 
  className = '' 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll position
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress into Y translation
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, speed * 100]
  );
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        style={{ y }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}