import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoHovering, setIsVideoHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const addHoverEvents = () => {
      const links = document.querySelectorAll('a, button');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => setIsHovering(true));
        link.addEventListener('mouseleave', () => setIsHovering(false));
      });

      const videoCards = document.querySelectorAll('.video-card');
      videoCards.forEach(card => {
        card.addEventListener('mouseenter', () => setIsVideoHovering(true));
        card.addEventListener('mouseleave', () => setIsVideoHovering(false));
      });
    };

    // Initial setup
    document.addEventListener('mousemove', updatePosition);
    
    // We need to delay adding hover events until elements are rendered
    const timeoutId = setTimeout(addHoverEvents, 1000);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      clearTimeout(timeoutId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className={`pointer-events-none fixed z-50 mix-blend-difference ${
          isVideoHovering ? 
            "bg-[rgba(255,45,85,0.3)] border border-[#FF2D55] flex items-center justify-center after:content-['Play'] after:font-['Space_Grotesk'] after:text-xs after:text-white" : 
            isHovering ? 
              "bg-[rgba(0,240,255,0.1)] border border-[#00F0FF]" : 
              "border-2 border-[#00F0FF] bg-transparent"
        }`}
        style={{
          width: isVideoHovering ? "70px" : isHovering ? "50px" : "20px",
          height: isVideoHovering ? "70px" : isHovering ? "50px" : "20px",
          borderRadius: "50%",
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          x: position.x,
          y: position.y,
          scale: isVideoHovering ? 1 : isHovering ? 1 : 1
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          x: { duration: 0.1, ease: "linear" },
          y: { duration: 0.1, ease: "linear" }
        }}
      />
      <motion.div 
        className="pointer-events-none fixed z-50 w-1 h-1 rounded-full bg-[#00F0FF] mix-blend-difference"
        animate={{ 
          x: position.x, 
          y: position.y 
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.05
        }}
        style={{
          width: "5px",
          height: "5px"
        }}
      />
    </>
  );
}
