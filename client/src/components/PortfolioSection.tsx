import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
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

  // In a real implementation, this would come from an API or CMS
  const projects: Project[] = [
    { 
      id: 1, 
      title: 'Corporate Brand Film', 
      description: 'Creative direction for tech startup', 
      thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&q=80', 
      videoUrl: 'https://player.vimeo.com/external/517090081.hd.mp4?s=ec21b8190937b1c6b67767d428123d043c43230e&profile_id=175' 
    },
    { 
      id: 2, 
      title: 'Music Video', 
      description: 'Dynamic visuals for indie artist', 
      thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&q=80', 
      videoUrl: 'https://player.vimeo.com/external/403270659.hd.mp4?s=c0fb71de8c7193e57d2c25f7a99541c4c8ee1d30&profile_id=175' 
    },
    { 
      id: 3, 
      title: 'Wedding Film', 
      description: 'Cinematic storytelling of special day', 
      thumbnail: 'https://images.unsplash.com/photo-1493804714600-6edb1cd93080?w=800&auto=format&q=80', 
      videoUrl: 'https://player.vimeo.com/external/269971860.hd.mp4?s=c740cdcff53a749904364556d5f0f5f947bf45fb&profile_id=175' 
    },
    { 
      id: 4, 
      title: 'Documentary', 
      description: 'Environmental awareness piece', 
      thumbnail: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&auto=format&q=80', 
      videoUrl: 'https://player.vimeo.com/external/316346769.hd.mp4?s=bd95f54f7aaa1650120967b0d7fff987c1893aaf&profile_id=175' 
    },
    { 
      id: 5, 
      title: 'Commercial', 
      description: 'Premium product advertisement', 
      thumbnail: 'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?w=800&auto=format&q=80', 
      videoUrl: 'https://player.vimeo.com/external/363625327.hd.mp4?s=a08e28d71f55767208161c1e9992c45279ddd3f2&profile_id=175' 
    },
    { 
      id: 6, 
      title: 'Travel Vlog', 
      description: 'Asian adventure series', 
      thumbnail: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=800&auto=format&q=80', 
      videoUrl: 'https://player.vimeo.com/external/405996715.hd.mp4?s=77da70d74fad0e27a261e446a52a585c29c77ca1&profile_id=175' 
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
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="video-card group cursor-pointer relative overflow-hidden rounded-lg h-64"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ delay: 0.1 * index }}
              onClick={() => setSelectedProject(project)}
              whileHover={{ scale: 1.02 }}
            >
              <motion.img 
                src={project.thumbnail} 
                className="w-full h-full object-cover transition-transform duration-500" 
                alt={project.title}
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute inset-0 bg-[#0A0A0A]/70 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-['Montserrat'] font-bold">{project.title}</h3>
                <p className="text-[#9CA3AF] mt-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
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
        <DialogContent className="sm:max-w-[80vw] max-h-[90vh] p-0 bg-[#0A0A0A] border-[#00F0FF]/30">
          <div className="relative pt-[56.25%] w-full">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-[#0A0A0A]/80 text-white p-2 rounded-full hover:bg-[#00F0FF] hover:text-[#0A0A0A] transition-colors"
            >
              <X size={20} />
            </button>
            {selectedProject && (
              <ReactPlayer
                url={selectedProject.videoUrl}
                controls
                playing
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
            )}
          </div>
          {selectedProject && (
            <div className="p-6">
              <h3 className="text-2xl font-['Montserrat'] font-bold">{selectedProject.title}</h3>
              <p className="text-[#9CA3AF] mt-2">{selectedProject.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
