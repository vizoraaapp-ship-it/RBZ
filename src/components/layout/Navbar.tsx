"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '../ui/Button';
import Image from 'next/image';
import BookingModal from '../ui/BookingModal';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Careers', href: '/careers' },
];

const HVAC_CATEGORIES = [
  { 
    name: 'Furnace', 
    icon: 'heat_pump', 
    href: '/services/furnace',
    subItems: [
      { name: 'Gas Furnace', desc: 'Reliable and efficient gas-powered heating systems', icon: 'mode_fan' },
      { name: 'Propane Furnace', desc: 'Efficient propane-powered heating systems', icon: 'propane_tank' },
    ]
  },
  { 
    name: 'Boiler', 
    icon: 'water_heater', 
    href: '/services/boiler',
    subItems: [
      { name: 'Standard Boiler', desc: 'Traditional high-efficiency boilers', icon: 'hvac' },
      { name: 'Combi Boiler', desc: 'Combined heating and hot water systems', icon: 'water_damage' },
    ]
  },
  { 
    name: 'Air Conditioner', 
    icon: 'ac_unit', 
    href: '/services/ac',
    subItems: [
      { name: 'Central AC', desc: 'Whole-home central air conditioning systems', icon: 'ac_unit' },
      { name: 'Ductless AC', desc: 'Flexible ductless mini-split systems', icon: 'heat_pump' },
    ]
  },
  { 
    name: 'Heat Pump', 
    icon: 'thermostat', 
    href: '/services/heat-pump',
    subItems: [
      { name: 'Air Source Heat Pump', desc: 'Energy-efficient outdoor air heat pump systems', icon: 'thermostat' },
      { name: 'Ground Source Heat Pump', desc: 'Geothermal ground-source heat pump systems', icon: 'public' },
    ]
  },
  { 
    name: 'Water Tank', 
    icon: 'plumbing', 
    href: '/services/water-tank',
    subItems: [
      { name: 'Conventional Tank', desc: 'Traditional water tank systems', icon: 'water_heater' },
      { name: 'Power Vent Tank', desc: 'Efficient power vented water tanks', icon: 'plumbing' },
      { name: 'Tankless System', desc: 'On-demand tankless water systems', icon: 'water_damage' },
    ]
  },
  { 
    name: 'Duct Work', 
    icon: 'air', 
    href: '/services/duct-work',
    subItems: [
      { name: 'Custom Duct Work', desc: 'Professional custom ductwork installation and design', icon: 'air' },
      { name: 'Duct Repair', desc: 'Expert duct repair and maintenance services', icon: 'build_circle' },
    ]
  },
  { 
    name: 'Accessories', 
    icon: 'settings', 
    href: '/services/accessories',
    subItems: [
      { name: 'HVAC Accessories', desc: 'Essential accessories for HVAC system optimization', icon: 'settings' },
      { name: 'Water Treatment Accessories', desc: 'Components and accessories for water treatment systems', icon: 'water_drop' },
    ]
  },
  { 
    name: 'Repair', 
    icon: 'build', 
    href: '/services/repair',
    subItems: [
      { name: 'HVAC Repair', desc: 'Professional HVAC repair services', icon: 'engineering' },
      { name: 'Water System Repair', desc: 'Expert repair services for water treatment systems', icon: 'plumbing' },
    ]
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const logoScale = useTransform(scrollY, [0, 50], [0.9, 0.8]);
  const headerHeight = useTransform(scrollY, [0, 50], [72, 64]);
  const headerPadding = useTransform(scrollY, [0, 50], [8, 4]);

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 w-full z-50">
      <motion.nav 
        style={{ 
          backgroundColor: useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.96)"]),
          backdropFilter: "blur(12px)",
          height: headerHeight,
          boxShadow: useTransform(scrollY, [0, 50], ["none", "0 10px 15px -3px rgb(0 0 0 / 0.1)"])
        }}
        className="w-full transition-shadow duration-300 border-b border-outline-variant/10 flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center w-full">
          <Link href="/" className="flex items-center">
            <motion.div style={{ scale: logoScale, originX: 0 }}>
              <Image 
                src="/logo.png" 
                alt="RBZ Climate Solutions Logo" 
                width={224} 
                height={80} 
                className="h-auto w-[170px] md:w-56 transition-all duration-300"
                priority
              />
            </motion.div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="relative group transition-all font-black py-1 text-on-surface-variant hover:text-primary tracking-[0.08em] uppercase text-[12px] md:text-[13px]"
              >
                {link.name}
                {isActive(link.href) ? (
                  <motion.div 
                    layoutId="nav-underline" 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" 
                  />
                ) : (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button size="sm" className="xs:inline-flex sm:inline-flex shadow-xl shadow-primary/10 text-[10px] sm:text-base px-3 sm:px-6 py-2" onClick={() => setBookingOpen(true)}>Book Service</Button>
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-primary p-2 flex items-center justify-center bg-surface-container/50 rounded-lg scale-90"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-3xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Secondary Category Bar (Desktop) */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="hidden md:block w-full bg-primary border-t border-white/5 shadow-2xl relative"
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-start items-stretch font-headline text-[11px] font-black uppercase tracking-[0.15em] h-[52px]">
          {HVAC_CATEGORIES.map((category, index) => (
            <div 
              key={category.name} 
              className="relative flex items-center"
              onMouseEnter={() => setActiveCategory(category.name)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button 
                className={`flex items-center gap-3 px-6 h-full text-white transition-all duration-300 border-r border-white/10 last:border-r-0 ${activeCategory === category.name ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                <span className="material-symbols-outlined text-lg">{category.icon}</span>
                {category.name}
                <motion.span 
                  animate={{ rotate: activeCategory === category.name ? 180 : 0 }}
                  className="material-symbols-outlined text-sm font-black"
                >
                  expand_more
                </motion.span>
              </button>

              {/* Localized Dropdown Card */}
              <AnimatePresence>
                {activeCategory === category.name && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute top-full w-85 z-50 p-4 ${index > 4 ? 'right-0' : 'left-0'}`}
                  >
                    <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.25)] overflow-hidden border border-outline-variant/10">
                      <div className="bg-primary p-6 flex items-center gap-4 text-white">
                        <motion.div 
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-2xl font-black">{category.icon}</span>
                        </motion.div>
                        <div>
                          <span className="font-black text-xl tracking-tight leading-none block mb-1">{category.name} Solutions</span>
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Expert Installation & Repair</span>
                        </div>
                      </div>
                      <div className="p-3 bg-surface-container-lowest/50">
                        {category.subItems.map((sub, idx) => (
                          <motion.div
                            key={sub.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link 
                              href="/services" 
                              className="flex items-start gap-4 p-4 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all group/item mb-1 last:mb-0 border border-transparent hover:border-outline-variant/10"
                            >
                              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500 shadow-sm">
                                <span className="material-symbols-outlined text-2xl font-black">{sub.icon}</span>
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-black text-on-surface text-base group-hover/item:text-primary transition-colors tracking-tight">{sub.name}</h4>
                                <p className="text-[11px] font-bold leading-relaxed text-on-surface-variant/60 group-hover/item:text-on-surface-variant transition-colors">{sub.desc}</p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            
            {/* Slide-in Drawer (From Right) */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[85%] max-w-[320px] h-full bg-white z-[70] md:hidden shadow-2xl flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
            >
              {/* Close Button Header */}
              <div className="absolute top-6 right-6">
                 <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center bg-primary/5 rounded-xl text-primary">
                    <span className="material-symbols-outlined text-3xl font-black">close</span>
                 </button>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 opacity-60 px-4">Navigation</div>
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link 
                      href={link.href} 
                      className={`h-[56px] flex items-center px-4 rounded-2xl font-black text-xl tracking-tight transition-all ${
                        isActive(link.href) 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'text-on-surface-variant hover:bg-primary/5'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 space-y-6">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 opacity-60 px-4">Our Services</div>
                <div className="grid grid-cols-1 gap-2">
                   {HVAC_CATEGORIES.map((cat, idx) => (
                     <motion.div 
                      key={cat.name} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                     >
                       <Link 
                         href="/services" 
                         className="h-[52px] flex items-center gap-4 px-4 rounded-2xl hover:bg-primary/5 group"
                         onClick={() => setIsMobileMenuOpen(false)}
                       >
                         <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                           <span className="material-symbols-outlined text-xl font-black">{cat.icon}</span>
                         </div>
                         <span className="font-black text-on-surface tracking-tight">{cat.name}</span>
                       </Link>
                     </motion.div>
                   ))}
                </div>
              </div>
              
              <div className="mt-auto pt-10 border-t border-outline-variant/10">
                 <Button fullWidth size="xl" onClick={() => { setBookingOpen(true); setIsMobileMenuOpen(false); }}>Book Service</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </header>
  );
};

export default Navbar;
