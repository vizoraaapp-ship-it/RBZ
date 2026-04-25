'use client';
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL = { name: '', email: '', phone: '', serviceType: '', serviceCategory: '', bookingDate: '', bookingTime: '', message: '' };

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
      name: form.name, 
      email: form.email, 
      phone: form.phone,
      service_type: form.serviceType || null, 
      service_category: form.serviceCategory || null,
      booking_date: form.bookingDate || null,
      booking_time: form.bookingTime || null,
      message: form.message || null,
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
    `w-full px-6 py-4 rounded-2xl border text-base md:text-sm font-bold transition-all duration-300 outline-none ${
      errors[id] 
        ? 'border-error bg-error/5 text-error placeholder:text-error/40' 
        : 'border-outline-variant/30 bg-surface-container-lowest text-on-surface hover:border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-on-surface-variant/30'
    }`;

  const labelStyle = "text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-primary mb-3 block ml-1";

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
      
      <header className="relative w-full h-[60vh] min-h-[500px] md:h-[calc(100vh-156px)] md:min-h-[700px] flex items-center justify-center overflow-hidden mt-[104px] md:mt-[156px]">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/contact-hero.png" 
            alt="Contact RBZ Climate Solutions" 
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
          className="relative z-20 max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[1800px] mx-auto px-6 md:px-8 text-left space-y-6 md:space-y-8 w-full"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-headline text-4xl md:text-8xl font-black tracking-tight text-white leading-tight drop-shadow-2xl"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-body text-base md:text-2xl text-white/90 font-bold leading-relaxed max-w-2xl text-left drop-shadow-lg opacity-80"
          >
            Want to book or ask for a free estimate? Our team is always ready to assist you 24/7
          </motion.p>
          <motion.a 
            href="tel:+16472999648"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="block text-3xl md:text-6xl text-white font-black drop-shadow-2xl hover:text-primary transition-colors"
          >
            +1 647 299 9648
          </motion.a>
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
              <h2 className="text-xl md:text-3xl font-black text-primary uppercase tracking-[0.2em]">Connect With the GTA’s HVAC professional.</h2>
              <p className="text-on-surface-variant text-base md:text-xl leading-relaxed font-bold opacity-80">
                Contact us now for a professional consultation and see why RBZ is the GTA's trusted name in climate control.
              </p>
            </motion.div>
            
            <div className="space-y-8 md:space-y-12">
              {[
                { icon: 'location_on', title: 'Our Office', content: '#220, 205 Morningside Avenue\nScarborough, GTA, M1E 3E2' },
                { icon: 'phone_in_talk', title: 'Contact Details', content: 'Main: +1 647 299 9648\nEmail: info@rbzclimatesolutions.com' },
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
              whileHover={{ scale: 1.01 }}
              className="w-full h-80 md:h-96 bg-surface-container rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative shadow-2xl group border border-outline-variant/10"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.222!2d-79.1842545!3d43.7654239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4db53d4ee3cf3%3A0x6d9b7e300c72b537!2sRBZ%20Climate%20Solutions!5e0!3m2!1sen!2sca!4v1714041234567!5m2!1sen!2sca"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-none"
              />
              <a 
                href="https://www.google.com/maps/place/RBZ+Climate+Solutions/@43.7654239,-79.1842545,17z/data=!3m1!4b1!4m6!3m5!1s0x89d4db53d4ee3cf3:0x6d9b7e300c72b537!8m2!3d43.7654239!4d-79.1842545!16s%2Fg%2F11z0_hv5hx"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-xl shadow-xl font-black text-primary text-xs tracking-tight hover:bg-primary hover:text-white transition-all duration-300"
              >
                Open in Maps
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="bg-white p-6 md:p-16 xl:p-20 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-outline-variant/10 h-fit"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center text-center gap-10 py-20"
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
                  <div className="mb-10 md:mb-16 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 text-on-surface tracking-tight">Connect with an RBZ Specialist</h2>
                    <p className="text-on-surface-variant font-bold opacity-60 text-sm md:text-base leading-relaxed">Complete the brief inquiry below, and our TSSA-certified team will reach out shortly to discuss your requirements.</p>
                  </div>
                  
                  <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group">
                        <label htmlFor="name" className={labelStyle}>Full Name *</label>
                        <input type="text" id="name" value={form.name} onChange={handleChange} className={inp('name')} placeholder="Your Name" />
                        {errors.name && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-error text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors.name}</motion.p>}
                      </div>
                      <div className="group">
                        <label htmlFor="email" className={labelStyle}>Email *</label>
                        <input type="email" id="email" value={form.email} onChange={handleChange} className={inp('email')} placeholder="email@example.com" />
                        {errors.email && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-error text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors.email}</motion.p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group">
                        <label htmlFor="phone" className={labelStyle}>Phone *</label>
                        <input type="tel" id="phone" value={form.phone} onChange={handleChange} className={inp('phone')} placeholder="+1 (000) 000-0000" />
                        {errors.phone && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-error text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors.phone}</motion.p>}
                      </div>
                      <div className="group">
                        <label htmlFor="serviceType" className={labelStyle}>Service Type *</label>
                        <div className="relative">
                          <select id="serviceType" value={form.serviceType} onChange={handleChange} className={`${inp('serviceType')} appearance-none cursor-pointer`}>
                            <option value="">Select a topic...</option>
                            <option>Air Conditioning</option>
                            <option>Furnace / Heating</option>
                            <option>Heat Pump</option>
                            <option>Water Tank</option>
                            <option>Boiler</option>
                            <option>Duct Work</option>
                            <option>Repair</option>
                            <option>Other</option>
                          </select>
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/50">
                            <span className="material-symbols-outlined font-black">unfold_more</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group">
                        <label htmlFor="serviceCategory" className={labelStyle}>Service Category (Optional)</label>
                        <div className="relative">
                          <select id="serviceCategory" value={form.serviceCategory} onChange={handleChange} className={`${inp('serviceCategory')} appearance-none cursor-pointer`}>
                            <option value="">Select category...</option>
                            <option value="Install">Install</option>
                            <option value="Repair">Repair</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Opinion">Opinion</option>
                          </select>
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/50">
                            <span className="material-symbols-outlined font-black">unfold_more</span>
                          </div>
                        </div>
                      </div>
                      <div className="group">
                        <label htmlFor="bookingDate" className={labelStyle}>Preferred Date (Optional)</label>
                        <input type="date" id="bookingDate" value={form.bookingDate} onChange={handleChange} className={inp('bookingDate')} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group">
                        <label htmlFor="bookingTime" className={labelStyle}>Preferred Time (Optional)</label>
                        <input type="time" id="bookingTime" value={form.bookingTime} onChange={handleChange} className={inp('bookingTime')} />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label htmlFor="message" className={labelStyle}>Your Message</label>
                      <textarea id="message" rows={5} value={form.message} onChange={handleChange} className={`${inp('message')} resize-none min-h-[140px]`} placeholder="Tell us how we can help..." />
                    </div>
                    
                    <div className="pt-6">
                      <Button size="xl" type="submit" disabled={!isValid || loading} className="w-full md:w-auto px-16 shadow-2xl shadow-primary/20">
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
