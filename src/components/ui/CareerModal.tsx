'use client';
import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

const INITIAL_STATE = {
  fullName: '',
  age: '',
  phone: '',
  email: '',
  university: '',
  college: '',
};

interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

const CareerModal: React.FC<CareerModalProps> = ({ isOpen, onClose, jobTitle }) => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof INITIAL_STATE>>({});

  const validate = () => {
    const newErrors: Partial<typeof INITIAL_STATE> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(form.age)) || Number(form.age) < 16 || Number(form.age) > 80) {
      newErrors.age = 'Enter a valid age (16–80)';
    }
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    return newErrors;
  };

  const isValid =
    form.fullName.trim() &&
    form.age.trim() &&
    !isNaN(Number(form.age)) &&
    Number(form.age) >= 16 &&
    form.phone.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Save to Supabase
    const { error } = await supabase.from('careers').insert({
      full_name: form.fullName,
      age: Number(form.age),
      phone: form.phone,
      email: form.email,
      university: form.university || null,
      college: form.college || null,
      role: jobTitle,
    });
    
    if (error) {
      alert(`Error submitting application: ${error.message}`);
      console.error(error);
      return;
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setForm(INITIAL_STATE);
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  const inputClass = (field: keyof typeof INITIAL_STATE) =>
    `w-full px-5 py-4 rounded-2xl border text-base md:text-sm font-bold transition-all duration-300 outline-none ${
      errors[field] 
        ? 'border-error bg-error/5 text-error placeholder:text-error/40' 
        : 'border-outline-variant/30 bg-surface-container-lowest text-on-surface hover:border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-on-surface-variant/30'
    }`;

  const labelClass = "text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-primary mb-2 block ml-1";

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Join Our Team">
      {submitted ? (
        <div className="py-20 flex flex-col items-center text-center gap-10 animate-in fade-in zoom-in duration-500">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner"
          >
            <span className="material-symbols-outlined text-5xl font-black">check_circle</span>
          </motion.div>
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-on-surface tracking-tight">Application Sent!</h3>
            <p className="text-on-surface-variant font-bold text-lg leading-relaxed max-w-sm mx-auto opacity-70">
              Thank you, {form.fullName}! We&apos;ve received your application for <strong>{jobTitle}</strong>. Our hiring team will contact you soon.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="px-12 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-dim transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
          >
            Finish
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-8 pb-10 md:pb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-primary/5 p-6 rounded-2xl border border-primary/10 mb-8">
            <div className="space-y-1">
              <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest opacity-60">Applying For</p>
              <h4 className="text-primary font-black text-lg md:text-xl tracking-tight leading-tight">{jobTitle}</h4>
            </div>
            <div className="hidden md:flex w-12 h-12 bg-primary/10 rounded-xl items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl font-black">work</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {/* Full Name */}
            <div className="group">
              <label htmlFor="career-fullName" className={labelClass}>
                Full Name <span className="text-error">*</span>
              </label>
              <input
                id="career-fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
                className={inputClass('fullName')}
              />
              {errors.fullName && <p className="text-error text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors.fullName}</p>}
            </div>

            {/* Age */}
            <div className="group">
              <label htmlFor="career-age" className={labelClass}>
                Age <span className="text-error">*</span>
              </label>
              <input
                id="career-age"
                name="age"
                type="number"
                min={16}
                max={80}
                placeholder="e.g. 28"
                value={form.age}
                onChange={handleChange}
                className={inputClass('age')}
              />
              {errors.age && <p className="text-error text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors.age}</p>}
            </div>

            {/* Phone */}
            <div className="group">
              <label htmlFor="career-phone" className={labelClass}>
                Phone Number <span className="text-error">*</span>
              </label>
              <input
                id="career-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 (000) 000-0000"
                value={form.phone}
                onChange={handleChange}
                className={inputClass('phone')}
              />
              {errors.phone && <p className="text-error text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div className="group">
              <label htmlFor="career-email" className={labelClass}>
                Email Address <span className="text-error">*</span>
              </label>
              <input
                id="career-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass('email')}
              />
              {errors.email && <p className="text-error text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors.email}</p>}
            </div>

            {/* University */}
            <div className="group">
              <label htmlFor="career-university" className={labelClass}>
                University Name
              </label>
              <input
                id="career-university"
                name="university"
                type="text"
                placeholder="e.g. University of Toronto"
                value={form.university}
                onChange={handleChange}
                className={inputClass('university')}
              />
            </div>

            {/* College */}
            <div className="group">
              <label htmlFor="career-college" className={labelClass}>
                College Name
              </label>
              <input
                id="career-college"
                name="college"
                type="text"
                placeholder="e.g. Centennial College"
                value={form.college}
                onChange={handleChange}
                className={inputClass('college')}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 flex flex-col gap-6">
            <button
              type="submit"
              disabled={!isValid}
              className="w-full py-5 bg-primary text-white font-black text-lg rounded-2xl hover:bg-primary-dim transition-all duration-300 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0"
            >
              Submit Application
            </button>
            <div className="flex items-center gap-4 text-on-surface-variant/60">
              <div className="h-px bg-current flex-grow opacity-10" />
              <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                Resume Submission
              </p>
              <div className="h-px bg-current flex-grow opacity-10" />
            </div>
            <p className="text-center text-xs md:text-sm text-red-600 font-black leading-relaxed">
              To share your resume or portfolio, please email us directly at{' '}
              <a
                href="mailto:careers@rbzclimatesolutions.com"
                className="text-red-600 hover:text-red-700 hover:underline underline-offset-4 decoration-2 transition-all"
              >
                careers@rbzclimatesolutions.com
              </a>
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default CareerModal;
