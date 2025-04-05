import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-[#00F0FF]/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-4 md:mb-0"
            whileHover={{ scale: 1.1 }}
          >
            <a href="#hero" className="text-2xl font-['Montserrat'] font-bold text-[#00F0FF]">SA</a>
          </motion.div>
          
          <p className="text-[#9CA3AF] text-sm">
            &copy; {currentYear} Saim Afzal. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-[#9CA3AF] hover:text-[#00F0FF] transition-colors text-sm mx-2">Privacy Policy</a>
            <a href="#" className="text-[#9CA3AF] hover:text-[#00F0FF] transition-colors text-sm mx-2">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
