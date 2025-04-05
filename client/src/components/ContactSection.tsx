import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from 'lucide-react';
import { SiVimeo } from 'react-icons/si';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { ref, controls } = useScrollReveal();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSending(false);
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    setIsSending(true);
    contactMutation.mutate(data);
  };

  const socialLinks = [
    { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
    { icon: <SiVimeo size={18} />, href: "#", label: "Vimeo" },
    { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
    { icon: <Youtube size={18} />, href: "#", label: "YouTube" },
  ];

  return (
    <section id="contact" className="py-20 bg-[#131313]">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-['Montserrat'] font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-[#00F0FF] mx-auto"></div>
          <p className="text-[#9CA3AF] mt-6 max-w-2xl mx-auto">
            Ready to discuss your project? Contact me for a consultation.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mb-6">
                <input 
                  type="text" 
                  id="name" 
                  placeholder=" "
                  className={`border-0 border-b-2 ${errors.name ? 'border-red-500' : 'border-[#9CA3AF]'} py-2 px-0 bg-transparent w-full text-white focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_1px_0_0_#00F0FF] transition-all`}
                  {...register('name')}
                />
                <label 
                  htmlFor="name"
                  className="absolute top-2 left-0 text-[#9CA3AF] pointer-events-none transition-all duration-300 ease-in-out"
                  style={{
                    transform: errors.name?.message || register('name').name ? 'translateY(-20px) scale(0.8)' : ''
                  }}
                >
                  Your Name
                </label>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div className="relative mb-6">
                <input 
                  type="email" 
                  id="email" 
                  placeholder=" "
                  className={`border-0 border-b-2 ${errors.email ? 'border-red-500' : 'border-[#9CA3AF]'} py-2 px-0 bg-transparent w-full text-white focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_1px_0_0_#00F0FF] transition-all`}
                  {...register('email')}
                />
                <label 
                  htmlFor="email"
                  className="absolute top-2 left-0 text-[#9CA3AF] pointer-events-none transition-all duration-300 ease-in-out"
                  style={{
                    transform: errors.email?.message || register('email').name ? 'translateY(-20px) scale(0.8)' : ''
                  }}
                >
                  Email Address
                </label>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div className="relative mb-6">
                <input 
                  type="text" 
                  id="subject" 
                  placeholder=" "
                  className={`border-0 border-b-2 ${errors.subject ? 'border-red-500' : 'border-[#9CA3AF]'} py-2 px-0 bg-transparent w-full text-white focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_1px_0_0_#00F0FF] transition-all`}
                  {...register('subject')}
                />
                <label 
                  htmlFor="subject"
                  className="absolute top-2 left-0 text-[#9CA3AF] pointer-events-none transition-all duration-300 ease-in-out"
                  style={{
                    transform: errors.subject?.message || register('subject').name ? 'translateY(-20px) scale(0.8)' : ''
                  }}
                >
                  Subject
                </label>
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                )}
              </div>
              
              <div className="relative mb-6">
                <textarea 
                  id="message" 
                  rows={4} 
                  placeholder=" "
                  className={`border-0 border-b-2 ${errors.message ? 'border-red-500' : 'border-[#9CA3AF]'} py-2 px-0 bg-transparent w-full text-white focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_1px_0_0_#00F0FF] transition-all resize-none`}
                  {...register('message')}
                ></textarea>
                <label 
                  htmlFor="message"
                  className="absolute top-2 left-0 text-[#9CA3AF] pointer-events-none transition-all duration-300 ease-in-out"
                  style={{
                    transform: errors.message?.message || register('message').name ? 'translateY(-20px) scale(0.8)' : ''
                  }}
                >
                  Your Message
                </label>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>
              
              <motion.button 
                type="submit"
                className="w-full py-3 px-6 bg-[#00F0FF] text-[#0A0A0A] font-semibold rounded-md hover:bg-[#00F0FF]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSending}
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-[#0A0A0A] p-8 rounded-lg border border-[#00F0FF]/30 h-full">
              <h3 className="text-2xl font-['Montserrat'] font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#00F0FF]/10 flex items-center justify-center mr-4 mt-1">
                    <Mail className="text-[#00F0FF]" size={18} />
                  </div>
                  <div>
                    <p className="font-bold mb-1">Email</p>
                    <a href="mailto:contact@saimafzal.com" className="text-[#9CA3AF] hover:text-[#00F0FF] transition-colors">
                      contact@saimafzal.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#00F0FF]/10 flex items-center justify-center mr-4 mt-1">
                    <Phone className="text-[#00F0FF]" size={18} />
                  </div>
                  <div>
                    <p className="font-bold mb-1">Phone</p>
                    <a href="tel:+1234567890" className="text-[#9CA3AF] hover:text-[#00F0FF] transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#00F0FF]/10 flex items-center justify-center mr-4 mt-1">
                    <MapPin className="text-[#00F0FF]" size={18} />
                  </div>
                  <div>
                    <p className="font-bold mb-1">Location</p>
                    <p className="text-[#9CA3AF]">Available for remote work worldwide</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-10">
                <p className="font-bold mb-4">Connect With Me</p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a 
                      key={index}
                      href={social.href} 
                      className="w-10 h-10 rounded-full border border-[#00F0FF]/50 flex items-center justify-center text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#0A0A0A] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
