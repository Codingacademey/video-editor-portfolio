import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { ChevronDown, Play } from 'lucide-react';
import ReactPlayer from 'react-player';

export default function HeroSection() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const playerRef = useRef<ReactPlayer>(null);
  const heroRef = useRef<HTMLElement>(null);
  const textControls = useAnimation();

  // Demo video URL - in production this would be replaced with actual showreel
  const videoUrl = "https://player.vimeo.com/external/470731135.hd.mp4?s=70801cfdb44e79bddbded5863e2aad38b82612c0&profile_id=175";
  
  // Typing effect for tagline
  const [typewriterText] = useTypewriter({
    words: ['Cinematic Cuts. Seamless Stories.'],
    typeSpeed: 60,
    deleteSpeed: 50,
    delaySpeed: 1500,
    loop: 1,
  });

  // Animate each letter of "Saim Afzal" individually
  const nameText = "Saim Afzal";
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.08),
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { width, height, left, top } = heroRef.current.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Trigger text animations on load
    textControls.start("visible");

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [textControls]);

  // Floating elements
  const floatingShapes = [
    { id: 1, size: 60, x: 20, y: 30, delay: 0, rotation: 30, shape: 'circle' },
    { id: 2, size: 80, x: 75, y: 60, delay: 1.3, rotation: -15, shape: 'square' },
    { id: 3, size: 40, x: 85, y: 25, delay: 0.7, rotation: 45, shape: 'triangle' },
    { id: 4, size: 65, x: 15, y: 70, delay: 2, rotation: 60, shape: 'diamond' },
    { id: 5, size: 50, x: 60, y: 15, delay: 1, rotation: -30, shape: 'circle' }
  ];

  // Render a shape based on type
  const renderShape = (shape: string) => {
    switch(shape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-md';
      case 'triangle':
        return 'clip-path-triangle';
      case 'diamond':
        return 'rotate-45 rounded-md';
      default:
        return 'rounded-full';
    }
  };

  // Function to handle showreel button click
  const scrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        {/* Video Background with ultra-low opacity */}
        <div className="h-full w-full absolute inset-0">
          {!videoError ? (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] to-[#131313] opacity-95 mix-blend-multiply z-10"></div>
          ) : null}
          <div className="absolute inset-0 z-0">
            {!videoError ? (
              <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                playing
                loop
                muted
                width="100%"
                height="100%"
                playsinline
                onError={() => setVideoError(true)}
                onReady={() => setHasPlayed(true)}
                style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                config={{
                  file: {
                    attributes: {
                      style: {
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }
                    }
                  }
                }}
              />
            ) : null}
          </div>
        </div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-[#0A0A0Aaa] via-[#0A0A0Aee] to-[#030303] z-10"></div>
        
        {/* Animated grid lines overlay */}
        <div className="absolute inset-0 z-20 opacity-10 pointer-events-none grid-pattern"></div>
        
        {/* Floating holographic shapes */}
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`absolute ${renderShape(shape.shape)} border border-[#00F0FF]/30 backdrop-blur-md bg-[#00F0FF]/5 z-20`}
            style={{ 
              width: shape.size, 
              height: shape.size,
              top: `${shape.y}%`,
              left: `${shape.x}%`,
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.3, 0.2],
              scale: 1,
              x: mousePosition.x * -30,
              y: mousePosition.y * -30,
              rotateZ: shape.rotation
            }}
            transition={{
              delay: shape.delay,
              duration: 4,
              ease: "easeInOut",
              opacity: {
                repeat: Infinity,
                duration: 3,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-30">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-['Montserrat'] font-bold mb-8 text-center">
            {/* Animated name with letter-by-letter reveal */}
            <div className="mb-4 overflow-hidden">
              <motion.div 
                className="flex justify-center"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08
                    }
                  }
                }}
              >
                {nameText.split('').map((char, index) => (
                  <motion.span
                    key={`char-${index}`}
                    className={char === ' ' ? 'w-4' : 'text-white'}
                    custom={index}
                    variants={letterVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Video Editor with glow effect */}
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.span 
                className="text-[#00F0FF] relative z-10 tracking-wide inline-block text-glitch"
                whileHover={{
                  textShadow: [
                    "0 0 8px rgba(0,240,255,0.8), 0 0 12px rgba(0,240,255,0.5)",
                    "0 0 2px rgba(0,240,255,0.6), 0 0 4px rgba(0,240,255,0.4)",
                    "0 0 9px rgba(0,240,255,0.9), 0 0 15px rgba(0,240,255,0.6)",
                    "0 0 5px rgba(0,240,255,0.7), 0 0 10px rgba(0,240,255,0.5)",
                  ],
                  scale: 1.05,
                  transition: {
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
                animate={{
                  textShadow: [
                    "0 0 4px rgba(0,240,255,0.6)",
                    "0 0 8px rgba(0,240,255,0.8)",
                    "0 0 4px rgba(0,240,255,0.6)",
                  ],
                  transition: {
                    duration: 2,
                    repeat: Infinity
                  }
                }}
              >
                Video Editor
              </motion.span>
              {/* Subtle glow effect underneath */}
              <div className="absolute w-full h-full blur-xl bg-[#00F0FF]/20 z-0"></div>
            </motion.div>
          </h1>

          {/* Tagline with typewriter effect */}
          <motion.div 
            className="text-xl md:text-2xl font-['Space_Grotesk'] mb-10 text-center overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <span className="text-slate-300">{typewriterText}</span>
            <Cursor cursorStyle='|' cursorColor="#00F0FF" />
          </motion.div>

          {/* Call to Action Button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <motion.a 
              href="#portfolio"
              onClick={scrollToPortfolio}
              className="group relative inline-flex items-center px-8 py-4 text-base bg-transparent border-2 border-[#00F0FF] text-[#00F0FF] rounded-md overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(0, 240, 255, 0.1)" 
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ boxShadow: "0 0 0px rgba(0, 240, 255, 0)" }}
              animate={{ 
                boxShadow: [
                  "0 0 0px rgba(0, 240, 255, 0)",
                  "0 0 10px rgba(0, 240, 255, 0.5)",
                  "0 0 0px rgba(0, 240, 255, 0)"
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }
              }}
            >
              <span className="relative z-10">Watch Showreel</span>
              <motion.span
                className="ml-2 relative z-10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Play size={18} />
              </motion.span>

              {/* Hover gradient effect */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00F0FF]/0 via-[#00F0FF]/20 to-[#00F0FF]/0 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-[#00F0FF] text-2xl filter drop-shadow-glow" />
        </motion.div>
      </motion.div>
    </section>
  );
}
