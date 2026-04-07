import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/244933777333"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-white text-brand-dark w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 group ring-4 ring-[#25D366]/20"
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.1,
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contactar via WhatsApp"
    >
      {/* Discrete pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-pulse-slow group-hover:hidden"></span>
      
      {/* Official WhatsApp Logo */}
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp" 
        className="w-10 h-10 relative z-10"
        referrerPolicy="no-referrer"
      />
    </motion.a>
  );
}
