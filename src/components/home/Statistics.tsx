import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import Section from '../ui/Section';

const Statistics = () => {
  return (
    <Section background="high" className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative group animate-in fade-in slide-in-from-left duration-1000">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image 
              src="/technicians.png" 
              alt="RBZ Climate Solutions Technicians" 
              width={600} 
              height={600}
              className="w-full object-cover aspect-square hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          <div className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-2xl text-white z-20 shadow-xl hidden md:block group-hover:scale-105 transition-transform">
            <div className="text-4xl font-black">98%</div>
            <div className="text-sm uppercase tracking-widest font-bold opacity-80">Referral Rate</div>
          </div>
        </div>

        <div className="space-y-8 animate-in fade-in slide-in-from-right duration-1000">
          <h2 className="text-4xl lg:text-5xl font-black text-on-background mb-6 leading-tight">
            Trust and Reliability <br />
            <span className="text-primary">in Every Ontario Home</span>
          </h2>
          
          <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
            <p>
              For over 15 years, RBZ Climate Solutions has been the leading provider of premium HVAC services across the Greater Toronto Area and Simcoe County.
            </p>
            <p>
              We believe that your indoor environment is the foundation of your family's comfort. Our technicians are highly certified, continuously trained on the latest smart climate technology, and committed to transparency in every quote.
            </p>
            
            <ul className="space-y-5 pt-4">
              {[
                'Serving GTA & Simcoe County',
                'Licensed & Fully Insured Technicians',
                'Energy-Saving Solutions Experts',
                '24/7 Emergency Response'
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-on-background font-semibold">
                  <span className="material-symbols-outlined text-primary fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
            
            <div className="pt-8">
              <Button size="lg" href="/about">Learn More About Us</Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Statistics;
