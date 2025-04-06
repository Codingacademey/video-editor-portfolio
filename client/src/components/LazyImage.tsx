import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
};

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Create IntersectionObserver to detect when image enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        // When image is in view, set isInView to true
        if (entries[0].isIntersecting) {
          setIsInView(true);
          // Stop observing once it's in view
          if (imgRef.current) {
            observer.unobserve(imgRef.current);
          }
        }
      },
      // Start loading when image is 300px before it appears in viewport
      { rootMargin: "300px" }
    );

    // Start observing the image element
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  // Handle image load completion
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Low-quality placeholder or loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 animate-pulse" />
      )}
      
      {/* Actual image that will load when in viewport */}
      <motion.img
        ref={imgRef}
        src={isInView ? src : ''}  
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleImageLoad}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}