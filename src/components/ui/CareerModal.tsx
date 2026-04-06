'use client';
import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
    `w-full px-4 py-3 rounded-xl border text-on-surface bg-surface-container-lowest placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm font-medium ${
      errors[field] ? 'border-error/60 bg-error/5' : 'border-outline-variant/30 hover:border-outline-variant/60'
    }`;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Apply for Position">
      {submitted ? (
        <div className="py-16 flex flex-col items-center text-center gap-6 animate-in fade-in duration-500">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-on-surface">Application Submitted!</h3>
            <p className="text-on-surface-variant font-medium max-w-sm">
              Thank you, {form.fullName}! We&apos;ve received your application for <strong>{jobTitle}</strong> and will be in touch soon.
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
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-primary text-sm">work</span>
            <span className="text-primary text-xs font-bold tracking-widest uppercase truncate max-w-[240px]">{jobTitle}</span>
          </div>

          {/* 2-col grid on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="career-fullName" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
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
              {errors.fullName && <p className="text-error text-xs font-semibold">{errors.fullName}</p>}
            </div>

            {/* Age */}
            <div className="space-y-1.5">
              <label htmlFor="career-age" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
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
              {errors.age && <p className="text-error text-xs font-semibold">{errors.age}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label htmlFor="career-phone" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Phone Number <span className="text-error">*</span>
              </label>
              <input
                id="career-phone"
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

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="career-email" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
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
              {errors.email && <p className="text-error text-xs font-semibold">{errors.email}</p>}
            </div>

            {/* University */}
            <div className="space-y-1.5">
              <label htmlFor="career-university" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
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
            <div className="space-y-1.5">
              <label htmlFor="career-college" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
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
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={!isValid}
              className="w-full py-4 bg-primary text-white font-black text-base rounded-xl hover:bg-primary-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              Submit Application
            </button>
            <p className="text-center text-xs text-on-surface-variant font-medium leading-relaxed">
              To share your resume, email us at{' '}
              <a
                href="mailto:careers@company.com"
                className="text-primary underline underline-offset-2 hover:text-primary-dim transition-colors"
              >
                careers@company.com
              </a>
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default CareerModal;
