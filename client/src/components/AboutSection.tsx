import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { CheckCircle } from 'lucide-react';
import { 
  SiAdobepremierepro, 
  SiApple,
  SiBlackmagicdesign,
  SiAdobeaftereffects,
  SiAudacity 
} from "react-icons/si";

export default function AboutSection() {
  const { ref, controls } = useScrollReveal();

  const expertise = [
    'Cinematic Editing',
    'Color Grading',
    'Motion Graphics',
    'Sound Design',
    'VFX'
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const floatingParticles = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 6) + 3,
    x: Math.floor(Math.random() * 90) + 5,
    y: Math.floor(Math.random() * 80) + 10,
    delay: Math.random() * 2
  }));

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Particle Background Effect */}
      <div className="absolute inset-0 opacity-20 z-0">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${
              particle.id % 2 === 0 ? 'bg-[#00F0FF]' : 'bg-[#FF2D55]'
            }`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* Image Column */}
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 mb-12 md:mb-0"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#00F0FF] rounded-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=800&auto=format&q=80" 
                className="rounded-lg relative z-10 w-full"
                alt="Saim Afzal - Video Editor" 
              />
              <motion.div 
                className="absolute bottom-4 -right-4 bg-[#131313] border border-[#00F0FF] p-4 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={controls}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p className="font-['Space_Grotesk'] text-sm">
                  <span className="text-[#00F0FF]">10+</span> Years Experience
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Content Column */}
          <motion.div 
            className="w-full md:w-1/2 md:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-['Montserrat'] font-bold mb-6">About Me</h2>
            <div className="w-20 h-1 bg-[#00F0FF] mb-8"></div>
            
            <motion.p 
              className="mb-6 text-lg"
              variants={itemVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.1 }}
            >
              I'm a professional video editor with over a decade of experience crafting compelling visual stories for brands, artists, and filmmakers.
            </motion.p>
            
            <motion.p 
              className="mb-6 text-lg"
              variants={itemVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.2 }}
            >
              My approach combines technical precision with creative intuition, allowing me to transform raw footage into captivating narratives that resonate with audiences.
            </motion.p>
            
            <motion.p 
              className="mb-8 text-lg"
              variants={itemVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.3 }}
            >
              I specialize in cinematic editing, color grading, and motion graphics, bringing a unique visual style to every project I touch.
            </motion.p>
            
            {/* Expertise Tags */}
            <motion.div 
              className="flex flex-wrap gap-3 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {expertise.map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-[#131313] border border-[#00F0FF] text-[#00F0FF] rounded-full text-sm"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Software Icons */}
            <motion.div 
              className="flex space-x-6"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              <motion.div 
                variants={itemVariants} 
                whileHover={{ scale: 1.2, color: "#00F0FF" }}
                className="text-[#9CA3AF] text-2xl hover:text-[#00F0FF] transition-colors"
                title="Adobe Premiere Pro"
              >
                <SiAdobepremierepro size={24} />
              </motion.div>
              <motion.div 
                variants={itemVariants} 
                whileHover={{ scale: 1.2, color: "#00F0FF" }}
                className="text-[#9CA3AF] text-2xl hover:text-[#00F0FF] transition-colors"
                title="Final Cut Pro"
              >
                <SiApple size={24} />
              </motion.div>
              <motion.div 
                variants={itemVariants} 
                whileHover={{ scale: 1.2, color: "#00F0FF" }}
                className="text-[#9CA3AF] text-2xl hover:text-[#00F0FF] transition-colors"
                title="DaVinci Resolve"
              >
                <SiBlackmagicdesign size={24} />
              </motion.div>
              <motion.div 
                variants={itemVariants} 
                whileHover={{ scale: 1.2, color: "#00F0FF" }}
                className="text-[#9CA3AF] text-2xl hover:text-[#00F0FF] transition-colors"
                title="After Effects"
              >
                <SiAdobeaftereffects size={24} />
              </motion.div>
              <motion.div 
                variants={itemVariants} 
                whileHover={{ scale: 1.2, color: "#00F0FF" }}
                className="text-[#9CA3AF] text-2xl hover:text-[#00F0FF] transition-colors"
                title="Audio Editing"
              >
                <SiAudacity size={24} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
