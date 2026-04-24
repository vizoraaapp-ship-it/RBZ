"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '../ui/Button';
import Image from 'next/image';
import BookingModal from '../ui/BookingModal';
import { motion, AnimatePresence, useScroll, useTransform, useAnimation } from 'framer-motion';
import { createPortal } from 'react-dom';

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
  { 
    name: 'Commercial', 
    icon: 'kitchen', 
    href: '/services/commercial-kitchen',
    subItems: [
      { name: 'Commercial Kitchens', desc: 'HVAC solutions for small commercial kitchen environments', icon: 'kitchen' },
      { name: 'Ventilation', desc: 'Professional kitchen exhaust and ventilation systems', icon: 'air' },
    ]
  },
  { 
    name: 'Gas Lines', 
    icon: 'outdoor_grill', 
    href: '/services/gas-lines',
    subItems: [
      { name: 'BBQ Gas Lines', desc: 'Professional installation of outdoor BBQ gas lines', icon: 'outdoor_grill' },
      { name: 'Gas Appliances', desc: 'Safe connections for all gas-powered home appliances', icon: 'settings_input_component' },
    ]
  },
  { 
    name: 'Pool Heaters', 
    icon: 'pool', 
    href: '/services/pool-heaters',
    subItems: [
      { name: 'Pool Heating', desc: 'Efficient gas and heat pump pool heating solutions', icon: 'pool' },
      { name: 'Maintenance', desc: 'Seasonal maintenance and repair for pool heaters', icon: 'build' },
    ]
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const logoScale = useTransform(scrollY, [0, 50], [1.1, 0.9]);
  const headerHeight = useTransform(scrollY, [0, 50], [104, 80]);

  const [mounted, setMounted] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent, categoryName: string, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Use fixed positions for the portal
    setDropdownPos({ 
      top: rect.bottom, 
      left: rect.left,
      width: rect.width
    });
    setActiveCategory(categoryName + index);
  };

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  const controls = useAnimation();

  useEffect(() => {
    if (activeCategory) {
      controls.stop();
    } else {
      controls.start({
        x: ["0%", "-50%"],
        transition: { 
          duration: 50, 
          repeat: Infinity, 
          ease: "linear" 
        }
      });
    }
  }, [activeCategory, controls]);

  return (
    <header className="fixed top-0 w-full z-50">
      <motion.nav 
        style={{ 
          backgroundColor: "var(--color-primary)",
          height: headerHeight,
          boxShadow: useTransform(scrollY, [0, 50], ["none", "0 10px 15px -3px rgb(0 0 0 / 0.2)"])
        }}
        className="w-full transition-shadow duration-300 border-b border-white/10 flex items-center shadow-md"
      >
        <div className="max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[1800px] mx-auto px-6 md:px-8 flex justify-between items-center w-full">
          <Link href="/" className="flex items-center">
            <motion.div style={{ scale: logoScale, originX: 0 }}>
              <Image 
                src="/logo.png" 
                alt="RBZ Climate Solutions Logo" 
                width={224} 
                height={80} 
                className="h-auto w-[120px] sm:w-[170px] md:w-64 transition-all duration-300"
                priority
              />
            </motion.div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`relative group transition-all font-black py-1 tracking-[0.08em] uppercase text-[12px] md:text-[13px] ${isActive(link.href) ? 'text-white' : 'text-white/70 hover:text-white'}`}
              >
                {link.name}
                {isActive(link.href) ? (
                  <motion.div 
                    layoutId="nav-underline" 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" 
                  />
                ) : (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent/50 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button size="sm" className="xs:inline-flex sm:inline-flex shadow-lg text-[10px] sm:text-base px-3 sm:px-6 py-2" onClick={() => setBookingOpen(true)}>Book Service</Button>
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-white p-2 flex items-center justify-center bg-white/10 rounded-lg scale-90"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-3xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="hidden md:block w-full relative z-[45]"
      >
        <div className="w-full h-[52px] bg-primary shadow-md rounded-b-2xl overflow-hidden relative border-t border-white/5">
          <motion.div 
            className="flex items-stretch h-full w-max"
            animate={controls}
          >
            {[...HVAC_CATEGORIES, ...HVAC_CATEGORIES, ...HVAC_CATEGORIES, ...HVAC_CATEGORIES].map((category, index) => (
              <div 
                key={`${category.name}-${index}`} 
                className="relative flex items-center flex-shrink-0"
                onMouseEnter={(e) => handleMouseEnter(e, category.name, index)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button 
                  className={`flex items-center gap-3 px-10 h-full text-white font-bold transition-all duration-300 border-r border-white/10 last:border-r-0 ${activeCategory === category.name + index ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >
                  <span className="material-symbols-outlined text-lg">{category.icon}</span>
                  <span className="whitespace-nowrap tracking-tight">{category.name}</span>
                  <span className="material-symbols-outlined text-sm font-black transition-transform duration-300" style={{ transform: activeCategory === category.name + index ? 'rotate(180deg)' : 'none' }}>expand_more</span>
                </button>

                {/* Dropdown via Portal to avoid overflow clipping */}
                {mounted && activeCategory === category.name + index && typeof document !== 'undefined' && createPortal(
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="fixed z-[9999] p-4 pointer-events-auto"
                    style={{ 
                      top: dropdownPos.top, 
                      left: index % HVAC_CATEGORIES.length > 6 ? dropdownPos.left - 300 + dropdownPos.width : dropdownPos.left,
                      minWidth: '340px'
                    }}
                    onMouseEnter={() => setActiveCategory(category.name + index)}
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden border border-outline-variant/10">
                      <div className="bg-primary p-6 flex items-center gap-4 text-white">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl font-black">{category.icon}</span>
                        </div>
                        <div>
                          <span className="font-black text-xl tracking-tight leading-none block mb-1">{category.name} Solutions</span>
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Expert Installation & Repair</span>
                        </div>
                      </div>
                      <div className="p-3 bg-white">
                        {category.subItems.map((sub) => (
                          <Link 
                            key={sub.name}
                            href="/services" 
                            className="flex items-start gap-4 p-4 rounded-3xl hover:bg-primary/5 transition-all group/item mb-1 last:mb-0"
                            onClick={() => setActiveCategory(null)}
                          >
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all shadow-sm">
                              <span className="material-symbols-outlined text-xl font-black">{sub.icon}</span>
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="font-black text-primary text-sm group-hover/item:text-secondary transition-colors tracking-tight">{sub.name}</h4>
                              <p className="text-[10px] font-bold leading-tight text-primary/60">{sub.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>,
                  document.body
                )}
              </div>
            ))}
          </motion.div>
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
            />
            
            {/* Slide-in Drawer (From Right) */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[85%] max-w-[320px] h-full bg-primary z-[70] md:hidden shadow-2xl flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
            >
              {/* Close Button Header */}
              <div className="absolute top-6 right-6">
                 <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl text-white">
                    <span className="material-symbols-outlined text-3xl font-black">close</span>
                 </button>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-4 px-4">Navigation</div>
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
                        ? 'bg-white text-primary shadow-lg' 
                        : 'text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 space-y-6">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-4 px-4">Our Services</div>
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
                         className="h-[52px] flex items-center gap-4 px-4 rounded-2xl hover:bg-white/10 group"
                         onClick={() => setIsMobileMenuOpen(false)}
                       >
                         <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-colors">
                           <span className="material-symbols-outlined text-xl font-black">{cat.icon}</span>
                         </div>
                         <span className="font-black text-white tracking-tight">{cat.name}</span>
                       </Link>
                     </motion.div>
                   ))}
                </div>
              </div>
              
              <div className="mt-auto pt-10 border-t border-white/10">
                 <Button fullWidth variant="surface" size="xl" onClick={() => { setBookingOpen(true); setIsMobileMenuOpen(false); }}>Book Service</Button>
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
