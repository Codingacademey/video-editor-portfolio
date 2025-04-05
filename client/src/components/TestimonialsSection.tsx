import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  title: string;
  avatar: string;
};

export default function TestimonialsSection() {
  const { ref, controls } = useScrollReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Saim transformed our raw footage into a compelling brand story. His attention to detail and creative vision exceeded our expectations. Highly recommended!",
      name: "Michael Carter",
      title: "CEO, Horizon Media",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&q=80"
    },
    {
      id: 2,
      quote: "The music video Saim edited for me captured exactly the vibe I was going for. His rhythm and visual sense are incredible, and he's incredibly collaborative.",
      name: "Alicia Rey",
      title: "Recording Artist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&q=80"
    },
    {
      id: 3,
      quote: "Our wedding video makes us cry every time we watch it. Saim captured all the right moments and edited them into a beautiful story that we'll cherish forever.",
      name: "David & Emma",
      title: "Wedding Clients",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&q=80"
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto play testimonials
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-['Montserrat'] font-bold mb-4">Client Reviews</h2>
          <div className="w-20 h-1 bg-[#00F0FF] mx-auto"></div>
          <p className="text-[#9CA3AF] mt-6 max-w-2xl mx-auto">
            What clients have to say about my work and editing approach.
          </p>
        </motion.div>
        
        {/* Testimonial Slider */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden p-4">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#131313] p-8 rounded-lg border border-[#00F0FF]/20 h-full col-span-1 md:col-span-3">
                    <div className="flex items-center mb-6">
                      <div className="text-[#00F0FF]">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="fill-current" size={16} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-[#9CA3AF] italic mb-6">
                      "{testimonials[currentIndex].quote}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonials[currentIndex].avatar} 
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-['Montserrat'] font-bold">{testimonials[currentIndex].name}</h4>
                        <p className="text-[#9CA3AF] text-sm">{testimonials[currentIndex].title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Slider Controls */}
          <button 
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-10 h-10 bg-[#0A0A0A] rounded-full flex items-center justify-center border border-[#00F0FF]/30 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#0A0A0A] transition-colors z-10"
            onClick={prevSlide}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-10 h-10 bg-[#0A0A0A] rounded-full flex items-center justify-center border border-[#00F0FF]/30 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#0A0A0A] transition-colors z-10"
            onClick={nextSlide}
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`mx-1 w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-[#00F0FF]' : 'bg-[#9CA3AF]/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
