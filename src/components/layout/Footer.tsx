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
        className="max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[1800px] mx-auto px-6 md:px-12 relative z-10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-12">
          
          {/* Brand & Info */}
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1 space-y-6 md:space-y-8 flex flex-col items-start">
            <Link href="/" className="block group">
              <Image 
                src="/logo.png" 
                alt="RBZ Climate Solutions Logo" 
                width={320} 
                height={114} 
                className="h-auto w-[180px] sm:w-[240px] md:w-[320px] transition-all duration-300 group-hover:opacity-80"
                priority
              />
            </Link>
            <p className="text-white text-sm md:text-base font-bold leading-relaxed max-w-xs mx-auto md:mx-0">
              Pioneering precision climate control for homes across the GTA. Quality you can feel in every breath. Licensed, insured, and 24/7 dedicated.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
               {/* Instagram */}
               <motion.a 
                 href="https://www.instagram.com/rbzclimatesolutions?utm_source=qr&igsh=MTlqanMwbnBnYXc2ZA=="
                 target="_blank"
                 rel="noopener noreferrer"
                 whileHover={{ y: -5, scale: 1.1, backgroundColor: "#E4405F", color: "white" }}
                 whileTap={{ scale: 0.9 }}
                 className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-[#E4405F] cursor-pointer transition-all shadow-sm border border-outline-variant/10"
               >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="md:w-6 md:h-6">
                   <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                 </svg>
               </motion.a>

               {/* Facebook */}
               <motion.a 
                 href="https://www.facebook.com/profile.php?id=61585673990442"
                 target="_blank"
                 rel="noopener noreferrer"
                 whileHover={{ y: -5, scale: 1.1, backgroundColor: "#1877F2", color: "white" }}
                 whileTap={{ scale: 0.9 }}
                 className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-[#1877F2] cursor-pointer transition-all shadow-sm border border-outline-variant/10"
               >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="md:w-6 md:h-6">
                   <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                 </svg>
               </motion.a>

               {/* LinkedIn */}
               <motion.a 
                 href="https://www.linkedin.com/in/rbz-climatesolutions-6b98273b5/"
                 target="_blank"
                 rel="noopener noreferrer"
                 whileHover={{ y: -5, scale: 1.1, backgroundColor: "#0A66C2", color: "white" }}
                 whileTap={{ scale: 0.9 }}
                 className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-[#0A66C2] cursor-pointer transition-all shadow-sm border border-outline-variant/10"
               >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="md:w-6 md:h-6">
                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                 </svg>
               </motion.a>

               {/* TikTok */}
               <motion.a 
                 href="https://www.tiktok.com/@rbzclimatesolutions?_r=1&_t=ZS-95o8aeNZCy2"
                 target="_blank"
                 rel="noopener noreferrer"
                 whileHover={{ y: -5, scale: 1.1, backgroundColor: "#000000", color: "white" }}
                 whileTap={{ scale: 0.9 }}
                 className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-black cursor-pointer transition-all shadow-sm border border-outline-variant/10"
               >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="md:w-6 md:h-6">
                   <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.26-.18-.52-.38-.75-.59v6.4c.02 2.1-.5 4.31-2.12 5.86-1.58 1.56-3.87 2.19-6.07 1.93-2.58-.29-4.83-2.1-5.65-4.59-.87-2.59-.25-5.63 1.69-7.55 1.77-1.78 4.67-2.3 7.05-1.37v4.1c-1.3-.59-2.91-.39-3.99.59-.96.88-1.18 2.37-.53 3.49.52.88 1.55 1.35 2.55 1.23 1.09-.07 2.05-.98 2.09-2.07l.03-15.86z"/>
                 </svg>
               </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col items-start">
            <h4 className="font-black text-[#003366] mb-4 md:mb-10 uppercase tracking-[0.3em] text-[12px] md:text-[16px]">Navigation</h4>
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
            <h4 className="font-black text-[#003366] mb-4 md:mb-10 uppercase tracking-[0.3em] text-[12px] md:text-[16px]">Expertise</h4>
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
            <h4 className="font-black text-[#003366] mb-6 md:mb-10 uppercase tracking-[0.3em] text-[12px] md:text-[16px]">Get In Touch</h4>
            <div className="space-y-6 md:space-y-8 flex flex-col items-start">
              <div className="group cursor-pointer text-left">
                <div className="text-[14px] md:text-base text-white font-bold leading-tight flex flex-col gap-1">
                  <span className="whitespace-nowrap">#220, 205 Morningside Avenue</span>
                  <span className="whitespace-nowrap">Scarborough, GTA, M1E 3E2</span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-xl font-black">phone</span>
                </div>
                <p className="text-xs md:text-sm text-white font-black group-hover:text-white transition-colors">+1 647 299 9648</p>
              </div>
              <div className="flex flex-row items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-xl font-black">mail</span>
                </div>
                <p className="text-xs md:text-sm text-white font-black group-hover:text-white transition-colors">info@rbzclimatesolutions.com</p>
              </div>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </footer>
  );
};

export default Footer;
