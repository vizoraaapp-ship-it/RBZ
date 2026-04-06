'use client';
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactPage() {
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
    await supabase.from('contacts').insert({
      name: form.name, email: form.email, phone: form.phone,
      subject: form.subject || null, message: form.message || null,
    });
    setLoading(false);
    setSubmitted(true);
  };

  const inp = (id: keyof typeof INITIAL) =>
    `w-full bg-surface-container-lowest border rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all ${errors[id] ? 'border-error/60' : 'border-outline-variant/20'}`;

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <header className="w-full bg-gradient-to-b from-primary-container/30 to-surface py-32 md:py-48 px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-top duration-1000">
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface">Get in Touch</h1>
          <p className="font-body text-xl text-on-surface-variant max-w-2xl mx-auto">
            Ready to schedule a service or get a free estimate? Our team is available 24/7 for all your comfort needs.
          </p>
        </div>
      </header>

      <Section className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative overflow-hidden">
          {/* Left: Info */}
          <div className="space-y-12 animate-in fade-in slide-in-from-left duration-1000">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-on-surface uppercase tracking-widest text-xs">Reach Our Experts</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Whether it s an emergency repair or a consultation for a new installation, we re just a call or message away.
              </p>
            </div>
            <div className="space-y-10">
              {[
                { icon: 'location_on', title: 'Our Office', content: '#220, 205 Morningside Avenue\nScarborough, Ontario, M1E 3E2' },
                { icon: 'phone_in_talk', title: 'Contact Details', content: 'Main: +1 647 299 9648\nEmail: info@rbzclimate.ca' },
                { icon: 'schedule', title: 'Business Hours', content: 'Mon - Fri: 8:00 AM - 6:00 PM\n24/7 Emergency Support Available' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-5 group">
                  <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    {item.content.split('\n').map((line, i) => (
                      <p key={i} className="text-on-surface-variant font-medium">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full h-80 bg-surface-container rounded-3xl overflow-hidden relative shadow-inner group">
              <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-primary/30">map</span>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-3 rounded-full shadow-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                  View On Google Maps
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-right duration-1000 border border-outline-variant/10">
            {submitted ? (
              <div className="flex flex-col items-center text-center gap-6 py-16">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-black text-on-surface">Message Sent!</h3>
                <p className="text-on-surface-variant font-medium max-w-sm">
                  Thank you, {form.name}! We&apos;ll get back to you within 24 hours.
                </p>
                <button onClick={() => { setForm(INITIAL); setSubmitted(false); }} className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dim transition-colors">
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-8 text-on-surface">Request a Consultation</h2>
                <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Full Name *</label>
                      <input type="text" id="name" value={form.name} onChange={handleChange} className={inp('name')} placeholder="John Doe" />
                      {errors.name && <p className="text-error text-xs font-semibold">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email Address *</label>
                      <input type="email" id="email" value={form.email} onChange={handleChange} className={inp('email')} placeholder="john@example.com" />
                      {errors.email && <p className="text-error text-xs font-semibold">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Phone Number *</label>
                      <input type="tel" id="phone" value={form.phone} onChange={handleChange} className={inp('phone')} placeholder="+1 000 000 0000" />
                      {errors.phone && <p className="text-error text-xs font-semibold">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Subject</label>
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
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Additional Message</label>
                    <textarea id="message" rows={4} value={form.message} onChange={handleChange} className={`${inp('message')} resize-none`} placeholder="Tell us more about your needs..." />
                  </div>
                  <Button size="xl" fullWidth type="submit" disabled={!isValid || loading}>
                    {loading ? 'Sending...' : 'Submit Request'}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
