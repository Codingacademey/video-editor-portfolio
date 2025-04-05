import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { ChevronDown, Play } from 'lucide-react';
import ReactPlayer from 'react-player';

export default function HeroSection() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  // Demo video URL - in production this would be replaced with actual showreel
  const videoUrl = "https://player.vimeo.com/external/470731135.hd.mp4?s=70801cfdb44e79bddbded5863e2aad38b82612c0&profile_id=175";
  
  const [typewriterText] = useTypewriter({
    words: ['Cinematic Cuts. Seamless Stories.'],
    typeSpeed: 80,
    loop: 1,
  });

  return (
    <section id="hero" className="relative h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A0A0A] opacity-70 z-10"></div>
        <div className="h-full w-full">
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
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0A0A0A] to-[#131313]"></div>
          )}
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-['Montserrat'] font-bold mb-4">
            <motion.span 
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Saim Afzal
            </motion.span>
            <motion.span 
              className="text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.7)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Video Editor
            </motion.span>
          </h1>
          <p className="text-xl md:text-2xl font-['Space_Grotesk'] mb-8">
            {typewriterText}
            <Cursor cursorStyle='|' />
          </p>
          <motion.a 
            href="#portfolio" 
            className="group inline-flex items-center px-8 py-3 text-base border-2 border-[#00F0FF] text-[#00F0FF] rounded-md transition-all hover:bg-[#00F0FF] hover:text-[#0A0A0A] hover:shadow-[0_0_15px_rgba(0,240,255,0.5)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Watch Showreel</span>
            <Play className="ml-2 group-hover:animate-pulse" size={18} />
          </motion.a>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="text-[#00F0FF] text-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
