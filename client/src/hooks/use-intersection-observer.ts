import { useState, useEffect, useRef, RefObject } from 'react';

type IntersectionObserverOptions = {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
};

export function useIntersectionObserver<T extends Element>({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  triggerOnce = false,
}: IntersectionObserverOptions = {}): [RefObject<T>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<T>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Skip if already triggered and triggerOnce is true
    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);

        // If element has entered view and triggerOnce is true,
        // mark as triggered and unobserve
        if (isElementIntersecting && triggerOnce) {
          hasTriggered.current = true;
          observer.unobserve(element);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, root, rootMargin, triggerOnce]);

  return [elementRef, isIntersecting];
}