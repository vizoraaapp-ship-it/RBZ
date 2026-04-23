'use client';
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import AutoSlider from '@/components/ui/AutoSlider';
import CareerModal from '@/components/ui/CareerModal';
import Image from 'next/image';
import { motion } from 'framer-motion';

const JOBS = [
  {
    id: 1,
    title: 'HVAC Service Technician',
    type: 'Full-Time / Part-time / Interns / Volunteers',
    location: 'Ontario/GTA',
    description: 'Seeking experienced technicians for diagnostic and repair services. TSSA certification required.',
    icon: 'build'
  },
  {
    id: 2,
    title: 'Lead HVAC Installer',
    type: 'Full-Time / Part-time / Interns / Volunteers',
    location: 'Ontario/GTA',
    description: 'Manage installation teams for residential and commercial heating and cooling systems.',
    icon: 'construction'
  },
  {
    id: 3,
    title: 'Sales & Estimation Specialist',
    type: 'Full-Time / Part-time / Interns / Volunteers',
    location: 'Ontario/GTA',
    description: 'Expert in HVAC systems to provide accurate quotes and energy-efficient solutions to clients.',
    icon: 'sell'
  },
  {
    id: 4,
    title: 'Customer Support Representative',
    type: 'Full-Time / Part-time / Interns / Volunteers',
    location: 'Ontario/GTA',
    description: 'Dedicated support for scheduling and client communications in a fast-paced environment.',
    icon: 'support_agent'
  },
  {
    id: 5,
    title: 'Content Creator & Social Media',
    type: 'Full-Time / Part-time / Interns / Volunteers',
    location: 'Ontario/GTA',
    description: 'Seeking a creative professional to capture on-site content, manage social media presence, and elevate our digital brand Story.',
    icon: 'video_camera_front'
  }
];

const BENEFITS = [
  { title: 'Training & Growth', icon: 'school', desc: 'Continuous education on the latest HVAC and smart home technology.' },
  { title: 'Premium Gear', icon: 'handyman', desc: 'Access to top-tier diagnostic tools and well-maintained service vehicles.' },
  { title: 'Collaborative Environment', icon: 'groups', desc: 'A supportive team culture where technical expertise is shared and celebrated.' },
  { title: 'Competitive Rewards', icon: 'card_giftcard', desc: 'Industry-leading pay, benefits, and performance-based incentives.' }
];

export default function CareersClient() {
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
      
      <header className="relative w-full h-[70vh] min-h-[500px] md:h-[calc(100vh-156px)] md:min-h-[700px] flex items-center justify-center overflow-hidden mt-[104px] md:mt-[156px]">
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
            unoptimized
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 text-left space-y-8 md:space-y-12 w-full"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/20"
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
            Join <br />
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-secondary"
            >
              RBZ Team
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-base md:text-2xl text-white/90 font-bold leading-relaxed max-w-2xl text-left drop-shadow-lg opacity-80"
          >
            We are expanding our team of dedicated experts across the GTA & Ontario. Recent graduates are welcome at RBZ Climate Solutions. If you have the drive to learn and a passion for technical excellence, we’ll provide the platform to grow.
          </motion.p>
          
          <div className="pt-0">
            <Button size="xl" href="#openings" className="shadow-2xl">View Open Positions</Button>
          </div>
        </motion.div>
      </header>

      <Section background="surface" className="py-8 md:py-12">
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

        <div className="md:hidden relative -mx-4">
          <AutoSlider interval={4000}>
            {BENEFITS.map((item, index) => (
              <BenefitCard key={index} item={item} />
            ))}
          </AutoSlider>
        </div>
      </Section>

      <Section id="students" background="high" className="py-8 md:py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-outline-variant/10 shadow-xl flex flex-col md:flex-row items-center gap-6 md:gap-8 relative overflow-hidden group"
        >
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             className="absolute -right-10 -bottom-10 w-40 h-40 border border-primary/5 rounded-full pointer-events-none" 
           />

           <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner"
           >
              <span className="material-symbols-outlined text-3xl md:text-4xl">diversity_3</span>
           </motion.div>
           <div className="space-y-3 md:space-y-4 text-center md:text-left relative z-10">
              <h2 className="text-xl md:text-2xl font-black text-on-surface leading-tight tracking-tight">Collaboration & Mentorship <br /><span className="text-primary text-base md:text-lg">(HVAC Students)</span></h2>
              <p className="text-on-surface-variant text-sm md:text-base font-bold leading-relaxed opacity-70">
                Supporting student growth through industry connections and knowledge sharing.
              </p>
              <div className="pt-2 flex justify-center md:justify-start">
                <Button variant="outline" href="/contact" size="sm">Inquire Now</Button>
              </div>
           </div>
        </motion.div>
      </Section>

      <Section id="openings" background="surface" className="py-8 md:py-12">
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
            className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-black text-[10px] tracking-[0.3em] uppercase"
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
                hidden: { opacity: 0, scale: 0.98 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
              }}
              whileHover={{ 
                x: 5,
                backgroundColor: "rgba(255, 255, 255, 1)",
                boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)"
              }}
              className="group bg-white/60 backdrop-blur-sm p-4 md:p-6 rounded-2xl md:rounded-3xl border border-outline-variant/10 shadow-sm transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 text-center md:text-left"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center w-full">
                 <motion.div 
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shrink-0"
                 >
                    <span className="material-symbols-outlined text-2xl font-black">{job.icon}</span>
                 </motion.div>
                 <div className="space-y-2 flex-grow">
                    <h3 className="text-lg md:text-xl font-black tracking-tight group-hover:text-secondary transition-colors leading-tight">{job.title}</h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-1.5 text-[9px] font-black uppercase tracking-widest text-secondary/60">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary/5 rounded-full border border-secondary/10">
                        <span className="material-symbols-outlined text-[14px]">work</span> {job.type}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full border border-outline-variant/10 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px]">location_on</span> {job.location}
                      </span>
                    </div>
                    <p className="pt-1 text-on-surface-variant max-w-2xl font-bold text-xs md:text-sm opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">{job.description}</p>
                  </div>
              </div>
              <div className="w-full md:w-auto mt-2 md:mt-0">
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  className="md:px-8 rounded-xl shadow-lg shadow-primary/10 whitespace-nowrap"
                  onClick={() => setSelectedJob(job.title)}
                >
                  Apply Now
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Footer />

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
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors" />
      <div className="text-secondary mb-6 md:mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 flex-shrink-0">
        <span className="material-symbols-outlined" style={{ fontSize: '6rem', lineHeight: 1 }}>{item.icon}</span>
      </div>
      <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight group-hover:text-secondary transition-colors leading-tight">{item.title}</h3>
      <p className="text-on-surface-variant text-sm md:text-base leading-relaxed font-bold opacity-70 group-hover:opacity-100 transition-opacity flex-grow">{item.desc}</p>
    </motion.div>
);
