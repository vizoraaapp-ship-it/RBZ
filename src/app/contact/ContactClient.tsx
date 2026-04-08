'use client';
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactClient() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState<Partial<typeof INITIAL>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Partial<typeof INITIAL> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    return e;
  };

  const isValid = form.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.phone.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm(p => ({ ...p, [id]: value }));
    if (errors[id as keyof typeof errors]) setErrors(p => ({ ...p, [id]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    const { error } = await supabase.from('contacts').insert({
      name: form.name, email: form.email, phone: form.phone,
      subject: form.subject || null, message: form.message || null,
    });
    setLoading(false);
    
    if (error) {
      alert(`Error sending message: ${error.message}`);
      console.error(error);
      return;
    }
    setSubmitted(true);
  };

  const inp = (id: keyof typeof INITIAL) =>
    `w-full bg-surface-container-lowest border rounded-2xl px-6 py-4 font-bold text-on-surface focus:ring-8 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/30 ${errors[id] ? 'border-error/60' : 'border-outline-variant/20'}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
  };

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      <header className="w-full bg-gradient-to-b from-primary-container/20 to-surface py-24 md:py-56 px-6 text-center relative overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] border border-primary/5 rounded-full pointer-events-none" 
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6 md:space-y-8 relative z-10"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-headline text-3xl md:text-8xl font-black tracking-tight text-on-surface leading-tight"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-body text-base md:text-2xl text-on-surface-variant max-w-2xl mx-auto font-bold opacity-80"
          >
            Ready to schedule a service or get a free estimate? Our team is available 24/7 for all your comfort needs.
          </motion.p>
        </motion.div>
      </header>

      <Section className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 relative">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            <motion.div variants={itemVariants} className="space-y-4 text-center lg:text-left">
              <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Reach Our Experts</h2>
              <p className="text-on-surface-variant text-base md:text-xl leading-relaxed font-bold opacity-80">
                Whether it's an emergency repair or a consultation for a new installation, we're just a call or message away.
              </p>
            </motion.div>
            
            <div className="space-y-8 md:space-y-12">
              {[
                { icon: 'location_on', title: 'Our Office', content: '#220, 205 Morningside Avenue\nScarborough, Ontario, M1E 3E2' },
                { icon: 'phone_in_talk', title: 'Contact Details', content: 'Main: +1 647 299 9648\nEmail: info@rbzclimate.ca' },
                { icon: 'schedule', title: 'Business Hours', content: 'Mon - Fri: 8:00 AM - 6:00 PM\n24/7 Support Available' },
              ].map((item, idx) => (
                <motion.div 
                  key={item.title} 
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 md:gap-6 group cursor-pointer"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-12 h-12 md:w-16 md:h-16 bg-primary/5 rounded-xl md:rounded-[1.25rem] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm shrink-0"
                  >
                    <span className="material-symbols-outlined text-2xl md:text-3xl font-black">{item.icon}</span>
                  </motion.div>
                  <div>
                    <h3 className="font-black text-lg md:text-2xl mb-2 md:mb-3 tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                    {item.content.split('\n').map((line, i) => (
                      <p key={i} className="text-on-surface-variant font-bold text-sm md:text-base opacity-70 leading-relaxed">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="w-full h-96 bg-surface-container rounded-[3rem] overflow-hidden relative shadow-2xl group border border-outline-variant/10"
            >
              <div className="absolute inset-0 bg-primary/5 backdrop-blur-sm flex items-center justify-center">
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ duration: 4, repeat: Infinity }}
                  className="material-symbols-outlined text-7xl text-primary/20"
                >
                  map
                </motion.span>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-4 rounded-2xl shadow-2xl font-black text-primary tracking-tight cursor-pointer">
                  View On Google Maps
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="bg-white p-6 md:p-20 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-outline-variant/10 h-fit"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center text-center gap-8 py-20"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner"
                  >
                    <span className="material-symbols-outlined text-5xl font-black">check_circle</span>
                  </motion.div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-on-surface tracking-tight">Message Sent!</h3>
                    <p className="text-on-surface-variant font-bold text-lg opacity-70 max-w-sm mx-auto">
                      Thank you, {form.name}! Our team will review your inquiry and get back to you within 24 hours.
                    </p>
                  </div>
                  <Button size="lg" onClick={() => { setForm(INITIAL); setSubmitted(false); }} className="mt-4">
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-8 md:mb-12 text-center md:text-left">
                    <h2 className="text-2xl md:text-4xl font-black mb-3 md:mb-4 text-on-surface tracking-tight">Request a Consultation</h2>
                    <p className="text-on-surface-variant font-bold opacity-60 text-sm">Fill out the form below and we'll reach out to you shortly.</p>
                  </div>
                  
                  <form className="space-y-10" onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">Full Name *</label>
                        <input type="text" id="name" value={form.name} onChange={handleChange} className={inp('name')} placeholder="Your Name" />
                        {errors.name && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-error text-[10px] font-black uppercase tracking-widest ml-1">{errors.name}</motion.p>}
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">Email *</label>
                        <input type="email" id="email" value={form.email} onChange={handleChange} className={inp('email')} placeholder="email@example.com" />
                        {errors.email && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-error text-[10px] font-black uppercase tracking-widest ml-1">{errors.email}</motion.p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">Phone *</label>
                        <input type="tel" id="phone" value={form.phone} onChange={handleChange} className={inp('phone')} placeholder="+1 000 000 0000" />
                        {errors.phone && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-error text-[10px] font-black uppercase tracking-widest ml-1">{errors.phone}</motion.p>}
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="subject" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">Topic</label>
                        <select id="subject" value={form.subject} onChange={handleChange} className={inp('subject')}>
                          <option value="">Select a topic...</option>
                          <option>Air Conditioning</option>
                          <option>Furnace / Heating</option>
                          <option>Heat Pump</option>
                          <option>Water Systems</option>
                          <option>Emergency Repair</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">Your Message</label>
                      <textarea id="message" rows={5} value={form.message} onChange={handleChange} className={`${inp('message')} resize-none`} placeholder="Tell us how we can help..." />
                    </div>
                    
                    <div className="pt-4 flex justify-center md:justify-start">
                      <Button size="md" type="submit" disabled={!isValid || loading} className="w-auto px-12 md:px-16 shadow-2xl shadow-primary/20">
                        {loading ? 'Processing...' : 'Submit Request'}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </Section>
      
      <Footer />
    </main>
  );
}
