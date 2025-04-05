import { useEffect, useRef } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function useScrollReveal(threshold = 0.1) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 0.8,
          ease: 'easeOut'
        }
      });
    }
  }, [controls, inView]);
  
  return { ref, controls, inView };
}
