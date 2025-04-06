import { ReactNode, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type ScrollRevealSectionProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  className?: string;
  once?: boolean;
};

export default function ScrollRevealSection({
  children,
  delay = 0.2,
  duration = 0.6,
  distance = 50,
  direction = 'up',
  threshold = 0.1,
  className = '',
  once = true
}: ScrollRevealSectionProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once
  });
  
  // Map direction to x/y values
  const directionToOffset = () => {
    switch (direction) {
      case 'up': return { x: 0, y: distance };
      case 'down': return { x: 0, y: -distance };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
      default: return { x: 0, y: distance };
    }
  };
  
  // Initial animation values
  const initialOffset = directionToOffset();
  
  // Animate when in view
  useEffect(() => {
    if (inView) {
      controls.start({ 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: { 
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        } 
      });
    }
  }, [controls, inView, delay, duration]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initialOffset }}
      animate={controls}
      className={className}
      style={{ 
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
}