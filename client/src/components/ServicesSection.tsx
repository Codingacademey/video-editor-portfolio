import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { 
  Film, 
  Music, 
  Heart, 
  Palette, 
  Wand, 
  Video, 
  Check, 
  ArrowRight 
} from 'lucide-react';

type Service = {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  features: string[];
};

export default function ServicesSection() {
  const { ref, controls } = useScrollReveal();

  const services: Service[] = [
    {
      id: 1,
      title: 'Commercial Editing',
      description: 'High-impact video editing for brands and businesses looking to make a powerful impression.',
      icon: <Film className="text-[#00F0FF] text-2xl" />,
      features: ['Product showcases', 'Brand films', 'Social media content']
    },
    {
      id: 2,
      title: 'Music Videos',
      description: 'Creative and rhythmic editing that enhances the visual storytelling of your music.',
      icon: <Music className="text-[#00F0FF] text-2xl" />,
      features: ['Sync with beat', 'Visual effects', 'Color grading']
    },
    {
      id: 3,
      title: 'Wedding Films',
      description: 'Emotional storytelling that captures the magic of your special day in cinematic style.',
      icon: <Heart className="text-[#00F0FF] text-2xl" />,
      features: ['Highlight reels', 'Documentary style', 'Same-day edits']
    },
    {
      id: 4,
      title: 'Color Grading',
      description: 'Professional color correction and stylistic grading to enhance your visual aesthetics.',
      icon: <Palette className="text-[#00F0FF] text-2xl" />,
      features: ['Cinematic looks', 'Color matching', 'Custom LUTs']
    },
    {
      id: 5,
      title: 'Motion Graphics',
      description: 'Engaging animated elements that bring your videos to life and enhance key messages.',
      icon: <Wand className="text-[#00F0FF] text-2xl" />,
      features: ['Title animations', 'Lower thirds', 'Infographics']
    },
    {
      id: 6,
      title: 'Documentary Editing',
      description: 'Thoughtful, narrative-driven editing that brings your documentary vision to life.',
      icon: <Video className="text-[#00F0FF] text-2xl" />,
      features: ['Story development', 'Interview compilation', 'B-roll integration']
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#131313]">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-['Montserrat'] font-bold mb-4">Services</h2>
          <div className="w-20 h-1 bg-[#00F0FF] mx-auto"></div>
          <p className="text-[#9CA3AF] mt-6 max-w-2xl mx-auto">
            Professional video editing services tailored to your specific needs and vision.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              className="bg-[#0A0A0A] p-8 rounded-lg border border-[#00F0FF]/30 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_10px_25px_-5px_rgba(0,240,255,0.3)]"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-14 h-14 rounded-full bg-[#00F0FF]/10 flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-['Montserrat'] font-bold mb-4">{service.title}</h3>
              <p className="text-[#9CA3AF] mb-6">
                {service.description}
              </p>
              <ul className="space-y-2 text-sm text-[#9CA3AF] mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="text-[#00F0FF] mr-2" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a 
                href="#contact" 
                className="text-[#00F0FF] flex items-center text-sm hover:text-shadow-[0_0_10px_rgba(0,240,255,0.7)] transition-all"
              >
                <span>Learn more</span>
                <ArrowRight className="ml-2" size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
