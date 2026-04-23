'use client';
import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

const SERVICE_TYPES = [
  'Air Conditioning',
  'Furnace',
  'Heat Pump',
  'Water Tank',
  'Boiler',
  'Duct Work',
  'Repair',
  'Accessories',
  'Smart Home',
  'Ductless Heat Pump',
  'Humidifier / Air Quality',
  'Tankless Water Heater',
];

const INITIAL_STATE = {
  fullName: '',
  email: '',
  phone: '',
  serviceType: '',
  serviceCategory: '',
  bookingDate: '',
  bookingTime: '',
  message: '',
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof INITIAL_STATE>>({});

  const validate = () => {
    const newErrors: Partial<typeof INITIAL_STATE> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.serviceType) newErrors.serviceType = 'Please select a service type';
    // Date, Time, and Category are now optional
    return newErrors;
  };

  const isValid =
    form.fullName.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.phone.trim() &&
    form.serviceType;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    const { error } = await supabase.from('bookings').insert({
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      service_type: form.serviceType,
      service_category: form.serviceCategory || null,
      booking_date: form.bookingDate || null,
      booking_time: form.bookingTime || null,
      message: form.message || null,
    });
    
    if (error) {
      alert(`Error submitting request: ${error.message}`);
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
    <Modal isOpen={isOpen} onClose={handleClose} title="Book a Service">
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
            <h3 className="text-3xl font-black text-on-surface tracking-tight">Request Received!</h3>
            <p className="text-on-surface-variant font-bold text-lg leading-relaxed max-w-sm mx-auto opacity-70">
              Thank you, {form.fullName}. Our expert team will review your request and contact you within 24 hours.
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
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 mb-8">
            <p className="text-on-surface-variant text-sm md:text-base font-bold leading-relaxed opacity-80">
              Schedule your professional HVAC service today. Our certified technicians serve all of Ontario with 24/7 support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {/* Full Name */}
            <div className="group">
              <label htmlFor="booking-fullName" className={labelClass}>
                Full Name <span className="text-error">*</span>
              </label>
              <input
                id="booking-fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                value={form.fullName || ''}
                onChange={handleChange}
                className={inputClass('fullName')}
              />
              {errors.fullName && <p className="text-error text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="group">
              <label htmlFor="booking-email" className={labelClass}>
                Email Address <span className="text-error">*</span>
              </label>
              <input
                id="booking-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="john@example.com"
                value={form.email || ''}
                onChange={handleChange}
                className={inputClass('email')}
              />
              {errors.email && <p className="text-error text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="group">
              <label htmlFor="booking-phone" className={labelClass}>
                Phone Number <span className="text-error">*</span>
              </label>
              <input
                id="booking-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 (000) 000-0000"
                value={form.phone || ''}
                onChange={handleChange}
                className={inputClass('phone')}
              />
              {errors.phone && <p className="text-error text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors.phone}</p>}
            </div>

            {/* Service Type */}
            <div className="group">
              <label htmlFor="booking-serviceType" className={labelClass}>
                Service Type <span className="text-error">*</span>
              </label>
              <div className="relative">
                <select
                  id="booking-serviceType"
                  name="serviceType"
                  value={form.serviceType || ''}
                  onChange={handleChange}
                  className={`${inputClass('serviceType')} cursor-pointer appearance-none`}
                >
                  <option value="" disabled>Choose a service...</option>
                  {SERVICE_TYPES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/50">
                   <span className="material-symbols-outlined font-black">unfold_more</span>
                </div>
              </div>
              {errors.serviceType && <p className="text-error text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors.serviceType}</p>}
            </div>

            {/* Service Category */}
            <div className="group">
              <label htmlFor="booking-serviceCategory" className={labelClass}>
                What Service <span className="text-[9px] opacity-50 lowercase">(Optional)</span>
              </label>
              <div className="relative">
                <select
                  id="booking-serviceCategory"
                  name="serviceCategory"
                  value={form.serviceCategory || ''}
                  onChange={handleChange}
                  className={`${inputClass('serviceCategory')} cursor-pointer appearance-none`}
                >
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

            {/* Booking Date */}
            <div className="group">
              <label htmlFor="booking-date" className={labelClass}>
                Preferred Date <span className="text-[9px] opacity-50 lowercase">(Optional)</span>
              </label>
              <input
                id="booking-date"
                name="bookingDate"
                type="date"
                value={form.bookingDate || ''}
                onChange={handleChange}
                className={inputClass('bookingDate')}
              />
              {errors.bookingDate && <p className="text-error text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors.bookingDate}</p>}
            </div>

            {/* Booking Time */}
            <div className="group">
              <label htmlFor="booking-time" className={labelClass}>
                Preferred Time (24h) <span className="text-[9px] opacity-50 lowercase">(Optional)</span>
              </label>
              <input
                id="booking-time"
                name="bookingTime"
                type="time"
                value={form.bookingTime || ''}
                onChange={handleChange}
                className={inputClass('bookingTime')}
              />
              {errors.bookingTime && <p className="text-error text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors.bookingTime}</p>}
            </div>
          </div>

          {/* Message */}
          <div className="group">
            <label htmlFor="booking-message" className={labelClass}>
              Additional Message
            </label>
            <textarea
              id="booking-message"
              name="message"
              rows={4}
              placeholder="Tell us more about your requirements..."
              value={form.message || ''}
              onChange={handleChange}
              className={`${inputClass('message')} resize-none min-h-[120px]`}
            />
          </div>

          {/* Submit */}
          <div className="pt-4 flex flex-col gap-6">
            <button
              type="submit"
              disabled={!isValid}
              className="w-full py-5 bg-primary text-white font-black text-lg rounded-2xl hover:bg-primary-dim transition-all duration-300 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0"
            >
              Confirm Booking Request
            </button>
            <div className="flex items-center gap-4 text-on-surface-variant/60">
              <div className="h-px bg-current flex-grow opacity-10" />
              <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                Direct Contact
              </p>
              <div className="h-px bg-current flex-grow opacity-10" />
            </div>
            <p className="text-center text-xs md:text-sm text-on-surface-variant font-bold opacity-70 leading-relaxed">
              For immediate assistance, please call us at{' '}
              <a
                href="tel:+16472999648"
                className="text-primary hover:underline underline-offset-4 decoration-2 transition-all"
              >
                +1 (647) 299-9648
              </a>
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default BookingModal;
