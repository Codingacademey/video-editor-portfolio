import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, Play } from 'lucide-react';
import ReactPlayer from 'react-player/lazy';

type Project = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
};

export default function PortfolioSection() {
  const { ref, controls } = useScrollReveal();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Using the uploaded video files for our portfolio
  const projects: Project[] = [
    { 
      id: 1, 
      title: 'Corporate Brand Film', 
      description: 'Creative direction for tech startup', 
      thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&q=80', 
      videoUrl: '/videos/portfolio-video-1.mp4' 
    },
    { 
      id: 2, 
      title: 'Music Video', 
      description: 'Dynamic visuals for indie artist', 
      thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&q=80', 
      videoUrl: '/videos/portfolio-video-2.mp4' 
    },
    { 
      id: 3, 
      title: 'Wedding Film', 
      description: 'Cinematic storytelling of special day', 
      thumbnail: 'https://images.unsplash.com/photo-1493804714600-6edb1cd93080?w=800&auto=format&q=80', 
      videoUrl: '/videos/portfolio-video-3.mp4' 
    },
    { 
      id: 4, 
      title: 'Documentary', 
      description: 'Environmental awareness piece', 
      thumbnail: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&auto=format&q=80', 
      videoUrl: '/videos/portfolio-video-4.mp4' 
    },
    { 
      id: 5, 
      title: 'Commercial', 
      description: 'Premium product advertisement', 
      thumbnail: 'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?w=800&auto=format&q=80', 
      videoUrl: '/videos/portfolio-video-5.mp4' 
    },
    { 
      id: 6, 
      title: 'Travel Vlog', 
      description: 'Asian adventure series', 
      thumbnail: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=800&auto=format&q=80', 
      videoUrl: '/videos/portfolio-video-6.mp4' 
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-[#131313]">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-['Montserrat'] font-bold mb-4">Portfolio</h2>
          <div className="w-20 h-1 bg-[#00F0FF] mx-auto"></div>
          <p className="text-[#9CA3AF] mt-6 max-w-2xl mx-auto">
            A collection of my best cinematic work across different genres and clients.
          </p>
        </motion.div>
        
        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            // Create a ref for each video thumbnail
            const videoRef = useRef<HTMLVideoElement>(null);

            return (
              <motion.div 
                key={project.id}
                className="video-card group cursor-pointer relative overflow-hidden rounded-lg h-64 bg-[#0A0A0A]"
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                transition={{ delay: 0.1 * index }}
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.02 }}
                onMouseEnter={() => {
                  if (videoRef.current) {
                    videoRef.current.play().catch(e => console.log("Video autoplay prevented"));
                  }
                }}
                onMouseLeave={() => {
                  if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                  }
                }}
              >
                <div className="relative w-full h-full">
                  {/* Fallback image */}
                  <img 
                    src={project.thumbnail} 
                    className="w-full h-full object-cover absolute top-0 left-0 z-10" 
                    alt={project.title}
                  />
                  
                  {/* Video Thumbnail (muted, no controls, playing on hover) */}
                  <video 
                    ref={videoRef}
                    src={project.videoUrl}
                    className="w-full h-full object-cover absolute top-0 left-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  
                  {/* Overlay with gradient and info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent z-30 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-['Montserrat'] font-bold">{project.title}</h3>
                    <p className="text-[#9CA3AF] mt-2">{project.description}</p>
                  </div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div 
                      className="w-16 h-16 bg-[#00F0FF]/80 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                    >
                      <Play size={24} className="text-[#0A0A0A] ml-1" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ delay: 0.6 }}
        >
          <motion.a 
            href="#"
            className="inline-block px-8 py-3 text-[#00F0FF] border-2 border-[#00F0FF] rounded-md transition-all hover:bg-[#00F0FF] hover:text-[#0A0A0A] hover:shadow-[0_0_15px_rgba(0,240,255,0.5)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects
          </motion.a>
        </motion.div>
      </div>

      {/* Video Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[85vw] max-h-[90vh] p-0 bg-[#0A0A0A] border-[#00F0FF]/30 shadow-[0_0_25px_rgba(0,240,255,0.15)] overflow-hidden">
          <motion.div 
            className="relative pt-[56.25%] w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-50 bg-[#0A0A0A]/80 text-white p-2 rounded-full hover:bg-[#00F0FF] hover:text-[#0A0A0A] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
            
            {/* Video player with glow effect */}
            <div className="absolute inset-0 glow-effect">
              {selectedProject && (
                <ReactPlayer
                  url={selectedProject.videoUrl}
                  controls
                  playing
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  light={false}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                        disablePictureInPicture: true
                      }
                    }
                  }}
                />
              )}
            </div>
            
            {/* Edge glow effect */}
            <div className="absolute inset-0 pointer-events-none border border-[#00F0FF]/20 z-40"></div>
            <div className="absolute inset-[-1px] blur-[1px] border border-[#00F0FF]/10 pointer-events-none z-30"></div>
          </motion.div>
          
          {selectedProject && (
            <motion.div 
              className="p-6 border-t border-[#00F0FF]/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-2xl font-['Montserrat'] font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    {selectedProject.title}
                  </h3>
                  <p className="text-[#9CA3AF] mt-2">{selectedProject.description}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="px-4 py-2 bg-[#00F0FF]/20 hover:bg-[#00F0FF]/30 text-[#00F0FF] rounded border border-[#00F0FF]/30 transition-all flex items-center gap-2">
                    <span>Project Details</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
