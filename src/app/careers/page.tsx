import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Image from 'next/image';

const JOBS = [
  {
    title: 'HVAC Service Technician',
    type: 'Full-Time',
    location: 'Scarborough / GTA',
    description: 'Seeking experienced technicians for diagnostic and repair services. TSSA certification required.',
    icon: 'build'
  },
  {
    title: 'Lead HVAC Installer',
    type: 'Full-Time',
    location: 'Barrie / Simcoe County',
    description: 'Manage installation teams for residential and commercial heating and cooling systems.',
    icon: 'construction'
  },
  {
    title: 'Sales & Estimation Specialist',
    type: 'Full-Time / Commission',
    location: 'Hybrid / GTA',
    description: 'Expert in HVAC systems to provide accurate quotes and energy-efficient solutions to clients.',
    icon: 'sell'
  },
  {
    title: 'Customer Support Representative',
    type: 'Part-Time',
    location: 'Office (Scarborough)',
    description: 'Dedicated support for scheduling and client communications in a fast-paced environment.',
    icon: 'support_agent'
  }
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      {/* Careers Hero Section - Immersive Full-Screen Style */}
      <header className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/career-hero.png" 
            alt="Careers at RBZ Climate Solutions" 
            fill 
            className="object-cover"
            priority
          />
          {/* Black Shade Filter Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>

        {/* Content Centered - Matched to Service Page Style */}
        <div className="relative z-20 max-w-4xl mx-auto px-8 text-center space-y-10 animate-in fade-in slide-in-from-top duration-1000">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mx-auto">
            <span className="material-symbols-outlined text-white text-sm">rocket_launch</span>
            <span className="text-white text-xs font-bold tracking-widest uppercase">Join Our Expert Team</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-2xl">
            Precision in <br />
            <span className="text-primary-fixed-dim">Your Career</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 font-body leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            Grow your skills at RBZ Climate Solutions. We re looking for dedicated technicians and professionals to help us redefine home comfort across Ontario.
          </p>
          
          <div className="pt-8">
            <Button size="xl" href="#openings">View Open Positions</Button>
          </div>
        </div>
      </header>

      {/* Why Join Us */}
      <Section background="surface">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { title: 'Training & Growth', icon: 'school', desc: 'Continuous education on the latest HVAC and smart home technology.' },
            { title: 'Premium Gear', icon: 'handyman', desc: 'Access to top-tier diagnostic tools and well-maintained service vehicles.' },
            { title: 'Collaborative Environment', icon: 'groups', desc: 'A supportive team culture where technical expertise is shared and celebrated.' },
            { title: 'Competitive Rewards', icon: 'card_giftcard', desc: 'Industry-leading pay, benefits, and performance-based incentives.' }
          ].map((item, index) => (
            <div key={index} className="p-8 bg-white rounded-2xl border border-outline-variant/10 shadow-sm animate-in fade-in slide-in-from-bottom duration-700 hover:shadow-xl transition-all" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="text-primary mb-6">
                <span className="material-symbols-outlined text-4xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Student Opportunity / Collaboration Section */}
      <Section id="students" background="high">
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-10 md:p-16 border border-outline-variant/10 shadow-xl flex flex-col md:flex-row items-center gap-10 animate-in fade-in slide-in-from-bottom duration-1000">
           <div className="w-24 h-24 shrink-0 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-5xl">diversity_3</span>
           </div>
           <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-black text-on-surface leading-tight">Collaboration & Networking <span className="text-primary">(HVAC Students)</span></h2>
              <p className="text-on-surface-variant text-lg font-semibold leading-relaxed">
                Supporting student growth through industry connections and knowledge sharing. At RBZ, we believe in mentoring the next generation of HVAC experts.
              </p>
              <div className="pt-4 flex justify-center md:justify-start">
                <Button variant="outline" href="/contact">Inquire for Mentorship</Button>
              </div>
           </div>
        </div>
      </Section>

      {/* Openings Section */}
      <Section id="openings" background="surface">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-on-surface">Current Opportunities</h2>
          <p className="text-on-surface-variant text-lg">Looking for professional growth? Apply today.</p>
        </div>
        
        <div className="space-y-6 max-w-5xl mx-auto">
          {JOBS.map((job, index) => (
            <div 
              key={index} 
              className="group bg-surface-container-lowest p-8 md:p-10 rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 animate-in fade-in slide-in-from-left duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-6 items-start">
                 <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-2xl">{job.icon}</span>
                 </div>
                 <div className="space-y-1">
                    <h3 className="text-2xl font-bold">{job.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-on-surface-variant text-sm font-medium uppercase tracking-widest">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">work</span> {job.type}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">location_on</span> {job.location}</span>
                    </div>
                    <p className="pt-4 text-on-surface-variant max-w-xl font-medium">{job.description}</p>
                  </div>
              </div>
              <Button variant="outline" className="shrink-0" href="mailto:careers@rbzclimate.ca?subject=Application for Job">Apply Now</Button>
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  );
}
