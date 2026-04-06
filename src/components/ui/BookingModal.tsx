'use client';
import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { supabase } from '@/lib/supabase';

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
    await supabase.from('bookings').insert({
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      service_type: form.serviceType,
      message: form.message || null,
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setForm(INITIAL_STATE);
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  const inputClass = (field: keyof typeof INITIAL_STATE) =>
    `w-full px-4 py-3 rounded-xl border text-on-surface bg-surface-container-lowest placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm font-medium ${
      errors[field] ? 'border-error/60 bg-error/5' : 'border-outline-variant/30 hover:border-outline-variant/60'
    }`;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Book a Service">
      {submitted ? (
        <div className="py-16 flex flex-col items-center text-center gap-6 animate-in fade-in duration-500">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-on-surface">Request Submitted!</h3>
            <p className="text-on-surface-variant font-medium max-w-sm">
              Thank you, {form.fullName}. We&apos;ll be in touch shortly to confirm your service appointment.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="mt-4 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dim transition-colors"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <p className="text-on-surface-variant text-sm font-medium">
            Fill in the form below and our team will get back to you within 24 hours.
          </p>

          {/* 2-col grid on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="booking-fullName" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Full Name <span className="text-error">*</span>
              </label>
              <input
                id="booking-fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
                className={inputClass('fullName')}
              />
              {errors.fullName && <p className="text-error text-xs font-semibold">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="booking-email" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Email Address <span className="text-error">*</span>
              </label>
              <input
                id="booking-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass('email')}
              />
              {errors.email && <p className="text-error text-xs font-semibold">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label htmlFor="booking-phone" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Phone Number <span className="text-error">*</span>
              </label>
              <input
                id="booking-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 000 000 0000"
                value={form.phone}
                onChange={handleChange}
                className={inputClass('phone')}
              />
              {errors.phone && <p className="text-error text-xs font-semibold">{errors.phone}</p>}
            </div>

            {/* Service Type */}
            <div className="space-y-1.5">
              <label htmlFor="booking-serviceType" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Service Type <span className="text-error">*</span>
              </label>
              <select
                id="booking-serviceType"
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                className={`${inputClass('serviceType')} cursor-pointer`}
              >
                <option value="" disabled>Select a service...</option>
                {SERVICE_TYPES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.serviceType && <p className="text-error text-xs font-semibold">{errors.serviceType}</p>}
            </div>
          </div>

          {/* Message — full width */}
          <div className="space-y-1.5">
            <label htmlFor="booking-message" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Additional Message
            </label>
            <textarea
              id="booking-message"
              name="message"
              rows={4}
              placeholder="Tell us more about your needs..."
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 hover:border-outline-variant/60 text-on-surface bg-surface-container-lowest placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm font-medium resize-none"
            />
          </div>

          {/* Submit */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={!isValid}
              className="w-full py-4 bg-primary text-white font-black text-base rounded-xl hover:bg-primary-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              Submit Request
            </button>
            <p className="text-center text-xs text-on-surface-variant font-medium leading-relaxed">
              If you need to send a resume or additional documents, email us at{' '}
              <a
                href="mailto:support@company.com"
                className="text-primary underline underline-offset-2 hover:text-primary-dim transition-colors"
              >
                support@company.com
              </a>
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default BookingModal;
