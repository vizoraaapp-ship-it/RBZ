'use client';
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import AutoSlider from '@/components/ui/AutoSlider';
import CareerModal from '@/components/ui/CareerModal';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const JOBS = [
  {
    id: 1,
    title: 'HVAC Service Technician',
    type: 'Full-Time',
    location: 'Scarborough / GTA',
    description: 'Seeking experienced technicians for diagnostic and repair services. TSSA certification required.',
    icon: 'build'
  },
  {
    id: 2,
    title: 'Lead HVAC Installer',
    type: 'Full-Time',
    location: 'Barrie / Simcoe County',
    description: 'Manage installation teams for residential and commercial heating and cooling systems.',
    icon: 'construction'
  },
  {
    id: 3,
    title: 'Sales & Estimation Specialist',
    type: 'Full-Time / Commission',
    location: 'Hybrid / GTA',
    description: 'Expert in HVAC systems to provide accurate quotes and energy-efficient solutions to clients.',
    icon: 'sell'
  },
  {
    id: 4,
    title: 'Customer Support Representative',
    type: 'Part-Time',
    location: 'Office (Scarborough)',
    description: 'Dedicated support for scheduling and client communications in a fast-paced environment.',
    icon: 'support_agent'
  }
];

const BENEFITS = [
  { title: 'Training & Growth', icon: 'school', desc: 'Continuous education on the latest HVAC and smart home technology.' },
  { title: 'Premium Gear', icon: 'handyman', desc: 'Access to top-tier diagnostic tools and well-maintained service vehicles.' },
  { title: 'Collaborative Environment', icon: 'groups', desc: 'A supportive team culture where technical expertise is shared and celebrated.' },
  { title: 'Competitive Rewards', icon: 'card_giftcard', desc: 'Industry-leading pay, benefits, and performance-based incentives.' }
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 }
    }
  };

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      {/* Careers Hero Section - Optimized Overlay */}
      <header className="relative w-full h-[70vh] min-h-[500px] md:h-screen md:min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/career-hero.png" 
            alt="Careers at RBZ Climate Solutions" 
            fill 
            className="object-cover"
            priority
          />
          {/* Black Shade Filter Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />
        </motion.div>

        {/* Content Centered - Matched to Service Page Style */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative z-20 max-w-4xl mx-auto px-6 md:px-8 text-center space-y-8 md:space-y-12"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/20 mx-auto"
          >
            <motion.span 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="material-symbols-outlined text-white text-sm"
            >
              rocket_launch
            </motion.span>
            <span className="text-white text-[10px] font-black tracking-[0.3em] uppercase">Join Our Expert Team</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-4xl md:text-8xl font-black tracking-tight text-white leading-[1.1] drop-shadow-2xl"
          >
            Precision in <br />
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-primary-fixed-dim"
            >
              Your Career
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-base md:text-2xl text-white/90 font-bold leading-relaxed max-w-2xl mx-auto drop-shadow-lg opacity-80"
          >
            Grow your skills at RBZ Climate Solutions. We're looking for dedicated technicians and professionals to help us redefine home comfort across Ontario.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="pt-4 md:pt-8"
          >
            <Button size="xl" href="#openings" className="shadow-2xl">View Open Positions</Button>
          </motion.div>
        </motion.div>
      </header>

      {/* Why Join Us & Slider */}
      <Section background="surface" className="py-16 md:py-32">
        {/* Desktop Benefits Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {BENEFITS.map((item, index) => (
             <BenefitCard key={index} item={item} />
          ))}
        </motion.div>

        {/* Mobile Benefits Auto-Slider */}
        <div className="md:hidden relative -mx-4">
          <AutoSlider interval={4000}>
            {BENEFITS.map((item, index) => (
              <BenefitCard key={index} item={item} />
            ))}
          </AutoSlider>
        </div>
      </Section>

      {/* Student Opportunity Section - Mobile Proportions */}
      <Section id="students" background="high" className="py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 border border-outline-variant/10 shadow-2xl flex flex-col md:flex-row items-center gap-10 md:gap-12 relative overflow-hidden group"
        >
           {/* Subtle background motif */}
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             className="absolute -right-20 -bottom-20 w-80 h-80 border-2 border-primary/5 rounded-full pointer-events-none" 
           />

           <motion.div 
            whileHover={{ scale: 1.1, rotate: 12 }}
            className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-primary/10 rounded-[1.75rem] md:rounded-[2.5rem] flex items-center justify-center text-primary shadow-inner"
           >
              <span className="material-symbols-outlined text-4xl md:text-6xl">diversity_3</span>
           </motion.div>
           <div className="space-y-4 md:space-y-6 text-center md:text-left relative z-10">
              <h2 className="text-2xl md:text-4xl font-black text-on-surface leading-tight tracking-tight">Collaboration &amp; Mentorship <br /><span className="text-primary text-xl md:text-3xl">(HVAC Students)</span></h2>
              <p className="text-on-surface-variant text-base md:text-xl font-bold leading-relaxed opacity-70">
                Supporting student growth through industry connections and knowledge sharing. At RBZ, we believe in mentoring the next generation of HVAC experts.
              </p>
              <div className="pt-4 flex justify-center md:justify-start">
                <Button variant="outline" href="/contact" fullWidth className="sm:w-auto" size="lg">Inquire for Mentorship</Button>
              </div>
           </div>
        </motion.div>
      </Section>

      {/* Openings Section */}
      <Section id="openings" background="surface" className="py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24 space-y-4"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[10px] tracking-[0.3em] uppercase"
          >
            Open Positions
          </motion.span>
          <h2 className="text-3xl md:text-6xl font-black text-on-background tracking-tight leading-tight">Current Opportunities</h2>
          <p className="text-base md:text-xl font-bold opacity-60 max-w-md mx-auto">Looking for professional growth? Apply today.</p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="space-y-8 md:space-y-10 max-w-5xl mx-auto px-4 md:px-0"
        >
          {JOBS.map((job) => (
            <motion.div 
              key={job.id} 
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ 
                x: 10,
                backgroundColor: "rgba(255, 255, 255, 1)",
                boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.1)"
              }}
              className="group bg-white/60 backdrop-blur-sm p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] border border-outline-variant/10 shadow-sm transition-all duration-500 flex flex-col xl:flex-row items-center xl:items-center justify-between gap-8 md:gap-10 text-center xl:text-left"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start w-full">
                 <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="w-20 h-20 bg-primary/10 rounded-[1.75rem] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm shrink-0"
                 >
                    <span className="material-symbols-outlined text-4xl">{job.icon}</span>
                 </motion.div>
                 <div className="space-y-4 flex-grow">
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight group-hover:text-primary transition-colors leading-tight">{job.title}</h3>
                    <div className="flex flex-wrap justify-center xl:justify-start gap-x-4 gap-y-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                      <span className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
                        <span className="material-symbols-outlined text-base">work</span> {job.type}
                      </span>
                      <span className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full border border-outline-variant/10 text-on-surface-variant">
                        <span className="material-symbols-outlined text-base">location_on</span> {job.location}
                      </span>
                    </div>
                    <p className="pt-4 text-on-surface-variant max-w-2xl font-bold text-sm md:text-lg opacity-80 group-hover:opacity-100 transition-opacity leading-relaxed">{job.description}</p>
                  </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full xl:w-auto mt-4 xl:mt-0"
              >
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="xl:px-12 rounded-2xl shadow-xl shadow-primary/20"
                  onClick={() => setSelectedJob(job.title)}
                >
                  Apply Now
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Footer />

      {/* Career Application Modal */}
      <CareerModal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        jobTitle={selectedJob ?? ''}
      />
    </main>
  );
}

const BenefitCard = ({ item }: { item: any }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1 }
    }}
    whileHover={{ 
      y: -10, 
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderColor: "rgba(var(--primary), 0.1)"
    }}
    className="p-8 md:p-10 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-outline-variant/10 shadow-sm transition-all duration-500 overflow-hidden relative group h-full flex flex-col"
  >
    <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
    <div className="text-primary mb-6 md:mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 flex-shrink-0">
      <span className="material-symbols-outlined text-4xl md:text-5xl font-black">{item.icon}</span>
    </div>
    <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight group-hover:text-primary transition-colors leading-tight">{item.title}</h3>
    <p className="text-on-surface-variant text-sm md:text-base leading-relaxed font-bold opacity-70 group-hover:opacity-100 transition-opacity flex-grow">{item.desc}</p>
  </motion.div>
);
