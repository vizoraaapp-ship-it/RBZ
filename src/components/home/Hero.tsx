import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 bg-gradient-to-br from-primary to-primary-dim text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-secondary-fixed fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="text-sm font-bold tracking-widest uppercase">#1 Rated HVAC Service in Ontario</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Install, Repair <br />
            <span className="text-primary-fixed">and Maintenance</span>
          </h1>
          
          <p className="text-xl text-primary-fixed/90 max-w-xl leading-relaxed">
            Precision climate control solutions for your home and business. Delivering excellence and comfort with over 9 years of technical mastery.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="surface" size="lg" href="/contact">Get a Free Quote</Button>
            <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10" href="/services">Explore Services</Button>
          </div>
          
          <div className="pt-8 flex gap-12 border-t border-white/10">
            <div>
              <div className="text-3xl font-black">9+</div>
              <div className="text-xs text-primary-fixed/70 uppercase tracking-widest font-semibold mt-1">Years Exp.</div>
            </div>
            <div>
              <div className="text-3xl font-black">5k+</div>
              <div className="text-xs text-primary-fixed/70 uppercase tracking-widest font-semibold mt-1">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-black">24/7</div>
              <div className="text-xs text-primary-fixed/70 uppercase tracking-widest font-semibold mt-1">Emergency Support</div>
            </div>
          </div>
        </div>

        <div className="relative group lg:block animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
          <div className="relative bg-white p-4 md:p-8 rounded-[2.5rem] shadow-2xl transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="rounded-2xl overflow-hidden aspect-square relative">
              <Image 
                src="/hero-furnace.png" 
                alt="Premium HVAC Furnace Unit" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl z-20 hidden md:block">
             <div className="text-primary font-black text-4xl">98%</div>
             <div className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">Referral Rate</div>
          </div>
        </div>
      </div>

      {/* Wave Footer */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,88.75,117.05,82.34,175.75,82.34,228.61,82.34,281,89.5,321.39,56.44Z" fill="#fbf8ff"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
