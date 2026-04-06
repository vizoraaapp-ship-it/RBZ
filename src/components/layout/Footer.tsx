import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

const Footer = () => {
  return (
    <footer className="bg-surface-container-high border-t border-outline-variant/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand & Info */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-black tracking-tighter text-primary font-headline">
              RBZ Climate Solutions
            </Link>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
              Pioneering precision climate control for homes across Ontario. Quality you can feel in every breath. Licensed, insured, and 24/7 dedicated.
            </p>
            <div className="flex gap-4">
               {['facebook', 'share', 'language'].map((icon) => (
                 <div key={icon} className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all shadow-sm">
                   <span className="material-symbols-outlined text-xl">{icon}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline font-bold text-on-background mb-8 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'About Us', 'Contact', 'Careers'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-headline font-bold text-on-background mb-8 uppercase tracking-widest text-xs">Our Services</h4>
            <ul className="space-y-4">
              {['Gas Furnace', 'Propane Furnace', 'Central Air', 'Duct Cleaning', 'Repair Services', 'Heat Pumps'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-headline font-bold text-on-background mb-8 uppercase tracking-widest text-xs">Contact Information</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                <p className="text-sm text-on-surface-variant font-medium">
                  #220, 205 Morningside Avenue<br />
                  Scarborough, Ontario, M1E 3E2
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">phone</span>
                <p className="text-sm text-on-surface-variant font-medium">+1 647 299 9648</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">mail</span>
                <p className="text-sm text-on-surface-variant font-medium">info@rbzclimate.ca</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                <p className="text-sm text-on-surface-variant font-medium">24/7 Emergency Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-on-surface-variant/60 text-xs font-bold uppercase tracking-widest">
            © 2024 RBZ Climate Solutions. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-on-surface-variant/60 hover:text-primary text-xs font-bold uppercase tracking-widest">Privacy Policy</Link>
            <Link href="#" className="text-on-surface-variant/60 hover:text-primary text-xs font-bold uppercase tracking-widest">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
