import { ReactNode, useEffect } from 'react';

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  // Add smooth scrolling behavior
  useEffect(() => {
    // Smooth scroll to anchor links
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#')) {
        const targetElement = document.querySelector(link.hash);
        
        if (targetElement) {
          e.preventDefault();
          
          // Scroll smoothly to the element
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without forcing a page jump
          window.history.pushState(null, '', link.hash);
        }
      }
    };
    
    // Add click listener to the document
    document.addEventListener('click', handleLinkClick);
    
    // Optimize scroll performance
    const optimizeScroll = () => {
      let ticking = false;
      
      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            // Apply any scroll-based effects here if needed
            ticking = false;
          });
          
          ticking = true;
        }
      };
      
      document.addEventListener('scroll', onScroll, { passive: true });
      
      return () => {
        document.removeEventListener('scroll', onScroll);
      };
    };
    
    const cleanup = optimizeScroll();
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
      cleanup();
    };
  }, []);
  
  return <>{children}</>;
}