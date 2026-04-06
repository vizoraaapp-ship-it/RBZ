"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '../ui/Button';
import Image from 'next/image';
import BookingModal from '../ui/BookingModal';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Top Nav Bar */}
      <nav className={`w-full transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-1' : 'bg-white/80 backdrop-blur-md py-3'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="RBZ Climate Solutions Logo" 
              width={240} 
              height={80} 
              className={`h-auto transition-all duration-300 ${isScrolled ? 'w-44' : 'w-56'}`}
              priority
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`transition-all font-bold pb-1 ${
                  isActive(link.href) 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-on-surface-variant hover:text-primary hover:border-b-2 hover:border-primary/30'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button size="md" className="hidden sm:inline-flex" onClick={() => setBookingOpen(true)}>Book Service</Button>
            
            <button 
              className="md:hidden text-primary p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-3xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Secondary Category Bar (Desktop) */}
      <div className="hidden md:block w-full bg-primary border-t border-white/10 shadow-2xl relative">
        <div className="max-w-7xl mx-auto px-6 flex justify-start items-stretch font-headline text-sm font-semibold tracking-tight h-[52px]">
          {HVAC_CATEGORIES.map((category, index) => (
            <div key={category.name} className="group relative flex items-center">
              <button 
                className="flex items-center gap-2 px-6 h-full text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 border-r border-white/10 last:border-r-0"
              >
                <span className="material-symbols-outlined text-xl">{category.icon}</span>
                {category.name}
                <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform duration-300">expand_more</span>
              </button>

              {/* Localized Dropdown Card */}
              <div className={`absolute top-full w-80 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-50 transform -translate-y-2 group-hover:translate-y-0 p-4 ${index > 4 ? 'right-0' : 'left-0'}`}>
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/10">
                  {/* Dropdown Header */}
                  <div className="bg-primary p-5 flex items-center gap-3 text-white">
                    <span className="material-symbols-outlined">{category.icon}</span>
                    <span className="font-bold text-lg">{category.name}</span>
                  </div>
                  
                  {/* Dropdown Body */}
                  <div className="p-2">
                    {category.subItems.map((sub) => (
                      <Link 
                        key={sub.name} 
                        href="#" 
                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-container transition-all group/item mb-1 last:mb-0"
                      >
                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant group-hover/item:text-primary group-hover/item:bg-primary/5 transition-colors">
                          <span className="material-symbols-outlined text-xl">{sub.icon}</span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-on-surface text-base group-hover/item:text-primary transition-colors">{sub.name}</h4>
                          <p className="text-[11px] font-body font-medium leading-relaxed text-on-surface-variant/80">{sub.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 w-full bg-white border-b border-outline-variant/10 shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300 max-h-[85vh] overflow-y-auto z-50">
           <div className="px-2 mb-4">
              <Image 
                src="/logo.png" 
                alt="RBZ Climate Solutions Logo" 
                width={180} 
                height={60} 
                className="h-auto w-40"
              />
           </div>
           
           {NAV_LINKS.map((link) => (
             <Link 
               key={link.name} 
               href={link.href} 
               className={`text-lg font-bold px-2 ${
                 isActive(link.href) ? 'text-primary underline decoration-2 underline-offset-4' : 'text-on-surface-variant'
               }`}
               onClick={() => setIsMobileMenuOpen(false)}
             >
               {link.name}
             </Link>
           ))}
           
           <div className="px-2 font-bold text-on-surface-variant uppercase tracking-widest text-[10px] pt-4">Expertise Categories</div>
           
           <div className="grid grid-cols-1 gap-8 pt-4 border-t border-outline-variant/10">
              {HVAC_CATEGORIES.map((cat) => (
                <div key={cat.name} className="space-y-4 px-2">
                  <div className="flex items-center gap-3 text-primary font-black">
                    <span className="material-symbols-outlined p-2 bg-primary/5 rounded-lg">{cat.icon}</span>
                    {cat.name}
                  </div>
                  <div className="grid grid-cols-1 gap-3 pl-12 border-l-2 border-primary/10 ml-5">
                     {cat.subItems.map(sub => (
                       <Link key={sub.name} href="#" className="text-sm text-on-surface-variant font-bold hover:text-primary transition-colors">{sub.name}</Link>
                     ))}
                  </div>
                </div>
              ))}
           </div>
           
           <div className="pt-8 border-t border-outline-variant/10">
              <div className="mt-6">
                <Button fullWidth onClick={() => { setBookingOpen(true); setIsMobileMenuOpen(false); }}>Book Service</Button>
              </div>
           </div>
        </div>
      )}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </header>
  );
};

export default Navbar;
