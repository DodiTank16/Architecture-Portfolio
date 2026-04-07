'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const WHATSAPP_NUMBER = '919904777068';

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? 'Something went wrong');
      }

      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const whatsappMsg = `Hello! I'm interested in a consultation for my architecture project.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="w-12 h-12 border border-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-light mb-3">Message Received</h3>
            <p className="text-muted text-sm max-w-sm mx-auto">
              Thank you for reaching out. We will review your inquiry and get back to you within 24 hours.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-8 text-accent text-xs tracking-[0.2em] uppercase hover:text-accent-light transition-colors duration-300"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs text-muted tracking-[0.15em] uppercase mb-2 font-sans">
                  Full Name <span className="text-accent">*</span>
                </label>
                <input
                  {...register('name')}
                  placeholder="Your full name"
                  className="form-input"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-muted tracking-[0.15em] uppercase mb-2 font-sans">
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="your@email.com"
                  className="form-input"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Row 2: Phone + Project Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs text-muted tracking-[0.15em] uppercase mb-2 font-sans">
                  Phone Number <span className="text-accent">*</span>
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="form-input"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-muted tracking-[0.15em] uppercase mb-2 font-sans">
                  Project Type <span className="text-accent">*</span>
                </label>
                <select {...register('projectType')} className="form-input">
                  <option value="">Select type</option>
                  <option>Residential (Villa / Bungalow)</option>
                  <option>Residential (Apartment)</option>
                  <option>Commercial Office</option>
                  <option>Retail / Hospitality</option>
                  <option>Interior Design</option>
                  <option>Urban / Master Plan</option>
                  <option>Other</option>
                </select>
                {errors.projectType && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.projectType.message}</p>
                )}
              </div>
            </div>

            {/* Row 3: Budget */}
            <div>
              <label className="block text-xs text-muted tracking-[0.15em] uppercase mb-2 font-sans">
                Estimated Budget <span className="text-accent">*</span>
              </label>
              <select {...register('budget')} className="form-input">
                <option value="">Select budget range</option>
                <option>Under ₹50 Lakhs</option>
                <option>₹50 Lakhs – ₹1 Cr</option>
                <option>₹1 Cr – ₹3 Cr</option>
                <option>₹3 Cr – ₹10 Cr</option>
                <option>₹10 Cr – ₹50 Cr</option>
                <option>Above ₹50 Cr</option>
              </select>
              {errors.budget && (
                <p className="mt-1.5 text-xs text-red-400">{errors.budget.message}</p>
              )}
            </div>

            {/* Row 4: Message */}
            <div>
              <label className="block text-xs text-muted tracking-[0.15em] uppercase mb-2 font-sans">
                Project Brief <span className="text-light/30">(Optional)</span>
              </label>
              <textarea
                {...register('message')}
                placeholder="Tell us about your project, timeline, and any specific requirements…"
                rows={4}
                className="form-input resize-none"
              />
            </div>

            {/* Error */}
            {status === 'error' && (
              <p className="text-sm text-red-400">{errorMsg}</p>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending…' : 'Send Inquiry'}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs uppercase tracking-[0.15em] font-sans hover:bg-[#25D366]/20 transition-colors duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.554 4.122 1.523 5.854L0 24l6.335-1.521A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.9 0-3.667-.514-5.192-1.41l-.373-.22-3.767.904.92-3.665-.24-.378A9.783 9.783 0 012.182 12C2.182 6.677 6.677 2.182 12 2.182S21.818 6.677 21.818 12 17.323 21.818 12 21.818z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
