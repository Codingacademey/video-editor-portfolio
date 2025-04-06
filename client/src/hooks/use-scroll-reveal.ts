import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, AnimationControls } from 'framer-motion';

type ScrollRevealOptions = {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  rootMargin?: string;
  duration?: number;
};

export function useScrollReveal(threshold = 0.1, options?: ScrollRevealOptions) {
  const controls = useAnimation();
  
  const { 
    triggerOnce = true, 
    delay = 0.2, 
    rootMargin = "0px",
    duration = 0.6
  } = options || {};
  
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin
  });
  
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration,
          delay,
          ease: "easeOut"
        }
      });
    }
  }, [controls, inView, delay, duration]);
  
  return { ref, controls, inView };
}