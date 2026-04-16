'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-primary pt-12 md:pt-32 pb-12 md:pb-16 relative overflow-hidden text-left border-t border-white/5">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-12">
          
          {/* Brand & Info */}
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1 space-y-6 md:space-y-8 flex flex-col items-start">
            <Link href="/" className="block group">
              <Image 
                src="/logo.png" 
                alt="RBZ Climate Solutions Logo" 
                width={180} 
                height={64} 
                className="h-auto w-[140px] md:w-[180px] transition-all duration-300 group-hover:opacity-80"
                priority
              />
            </Link>
            <p className="text-white text-sm md:text-base font-bold leading-relaxed max-w-xs mx-auto md:mx-0">
              Pioneering precision climate control for homes across the GTA and Ontario. Quality you can feel in every breath. Licensed, insured, and 24/7 dedicated.
            </p>
            <div className="flex gap-4 pt-2 justify-center md:justify-start">
               {['facebook', 'share', 'language'].map((icon) => (
                 <motion.div 
                   key={icon} 
                   whileHover={{ y: -5, scale: 1.1, backgroundColor: "rgba(var(--primary), 1)", color: "white" }}
                   whileTap={{ scale: 0.9 }}
                   className="w-10 h-10 md:w-12 md:h-12 bg-surface-container rounded-xl md:rounded-2xl flex items-center justify-center text-primary cursor-pointer transition-all shadow-sm border border-outline-variant/10"
                 >
                   <span className="material-symbols-outlined text-lg md:text-xl font-black">{icon}</span>
                 </motion.div>
               ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col items-start">
            <h4 className="font-black text-white mb-4 md:mb-10 uppercase tracking-[0.3em] text-[10px] md:text-[12px]">Navigation</h4>
            <ul className="space-y-3 md:space-y-5 flex flex-col items-start">
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Careers', href: '/careers' }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-white hover:text-accent transition-all text-xs md:text-sm font-black uppercase tracking-widest flex items-center gap-2 group"
                  >
                    <motion.span 
                      initial={{ width: 0 }}
                      whileHover={{ width: 12 }}
                      className="h-[2px] bg-accent rounded-full block hidden md:block"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Services */}
          <motion.div variants={itemVariants} className="flex flex-col items-start">
            <h4 className="font-black text-white mb-4 md:mb-10 uppercase tracking-[0.3em] text-[10px] md:text-[12px]">Expertise</h4>
            <ul className="space-y-3 md:space-y-5 flex flex-col items-start">
              {['Gas Furnace', 'Central Air', 'Heat Pumps', 'Small Commercial Kitchens', 'Barbeque Gas Lines', 'Pool Heaters', 'Duct Cleaning', 'Repair Services'].map((link) => (
                <li key={link}>
                  <Link 
                    href="/services" 
                    className="text-white hover:text-accent transition-all text-xs md:text-sm font-black uppercase tracking-widest flex items-center gap-2 group"
                  >
                    <motion.span 
                      initial={{ width: 0 }}
                      whileHover={{ width: 12 }}
                      className="h-[2px] bg-accent rounded-full block hidden md:block"
                    />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1 flex flex-col items-start pt-4 lg:pt-0 border-t border-white/10 lg:border-none">
            <h4 className="font-black text-white mb-6 md:mb-10 uppercase tracking-[0.3em] text-[10px] md:text-[12px]">Get In Touch</h4>
            <div className="space-y-6 md:space-y-8 flex flex-col items-start">
              <div className="group cursor-pointer text-left">
                <div className="text-[14px] md:text-base text-white font-bold leading-tight flex flex-col gap-1">
                  <span className="whitespace-nowrap">#220, 205 Morningside Avenue</span>
                  <span className="whitespace-nowrap">Scarborough, Ontario, M1E 3E2</span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-secondary group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                  <span className="material-symbols-outlined text-xl font-black">phone</span>
                </div>
                <p className="text-xs md:text-sm text-white font-black group-hover:text-white transition-colors">+1 647 299 9648</p>
              </div>
              <div className="flex flex-row items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-secondary group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                  <span className="material-symbols-outlined text-xl font-black">mail</span>
                </div>
                <p className="text-xs md:text-sm text-white font-black group-hover:text-white transition-colors">info@rbzclimatesolutions.com</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="mt-10 md:mt-32 pt-6 md:pt-10 border-t border-white/10 flex flex-row justify-between items-center gap-3 md:gap-8"
        >
          <p className="text-white text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em]">
            © 2024 RBZ Climate Solutions.
          </p>
          <div className="flex gap-4 md:gap-10">
            <Link href="#" className="text-white hover:text-accent text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-white hover:text-accent text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
