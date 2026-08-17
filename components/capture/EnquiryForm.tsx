'use client';

import React, { useState, useEffect } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { COURSES, CITIES } from '@/lib/mock-data';
import { LeadSource, Qualification, PreferredBatch } from '@/lib/types';
import { 
  IconSparkles, 
  IconAlertTriangle,
  IconSend,
  IconLock
} from '@/components/ui/Icons';

interface EnquiryFormProps {
  sourceOverride?: LeadSource;
  entryPoint?: 'Enroll Form' | 'Callback Modal' | 'Brochure Download';
  utmSource?: string;
  utmCampaign?: string;
  onSubmittedSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  sourceOverride,
  entryPoint = 'Enroll Form',
  utmSource = 'google_ads',
  utmCampaign = 'summer_bootcamp_2026',
  onSubmittedSuccess,
  title = "Apply Now & Secure Your Seat",
  subtitle = "Fill in your details to receive full syllabus details and fee structure"
}) => {
  const { addLeadFromWebsite, leads } = useLeadStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: CITIES[0],
    course: COURSES[0],
    qualification: 'Undergraduate' as Qualification,
    preferredBatch: 'Morning (9 AM - 12 PM)' as PreferredBatch,
    message: '',
    honeypot: '', // Spam bot detection field
  });

  // Math CAPTCHA states
  const [num1, setNum1] = useState(7);
  const [num2, setNum2] = useState(4);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  // Live duplicate warning state
  const [isLiveDuplicate, setIsLiveDuplicate] = useState(false);

  // Generate random captcha on mount
  useEffect(() => {
    setNum1(Math.floor(Math.random() * 8) + 2);
    setNum2(Math.floor(Math.random() * 8) + 1);
  }, []);

  // Check duplicate live as user types phone
  useEffect(() => {
    const cleanPhone = formData.phone.replace(/\D/g, '');
    const cleanEmail = formData.email.toLowerCase().trim();
    if (cleanPhone.length >= 7 || cleanEmail.length >= 5) {
      const found = leads.some((l) => {
        const p = l.phone.replace(/\D/g, '');
        const e = l.email.toLowerCase().trim();
        return (cleanPhone.length >= 7 && p === cleanPhone) || (cleanEmail.length >= 5 && e === cleanEmail);
      });
      setIsLiveDuplicate(found);
    } else {
      setIsLiveDuplicate(false);
    }
  }, [formData.phone, formData.email, leads]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Spam Honeypot Check
    if (formData.honeypot.trim() !== '') {
      console.warn('Bot detected via honeypot');
      return;
    }

    // 2. CAPTCHA verification
    if (parseInt(captchaInput) !== num1 + num2) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);

    // 3. Dispatch to Lead Store
    const finalSource: LeadSource = sourceOverride || (utmSource === 'instagram' ? 'Instagram' : utmSource === 'google' ? 'Google Ads' : 'Homepage');

    addLeadFromWebsite({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      course: formData.course,
      qualification: formData.qualification,
      preferredBatch: formData.preferredBatch,
      message: formData.message,
      source: finalSource,
      utmSource: utmSource,
      utmMedium: 'cpc',
      utmCampaign: utmCampaign,
      entryPoint: entryPoint,
    });

    // Reset form fields
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: CITIES[0],
      course: COURSES[0],
      qualification: 'Undergraduate',
      preferredBatch: 'Morning (9 AM - 12 PM)',
      message: '',
      honeypot: '',
    });
    setCaptchaInput('');

    if (onSubmittedSuccess) {
      onSubmittedSuccess();
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      
      {/* Decorative ambient background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Form Header */}
      <div className="mb-5 space-y-1">
        <div className="flex items-center space-x-2">
          <IconSparkles className="w-5 h-5 text-blue-400" />
          <h3 className="font-extrabold text-lg text-white">{title}</h3>
        </div>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>

      {/* Live Duplicate Alert Banner */}
      {isLiveDuplicate && (
        <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs flex items-start space-x-2 text-rose-300">
          <IconAlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Duplicate Detected:</span> An enquiry with this phone/email already exists in our academy portal. Submitting will flag this record for merge review.
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {/* Spam Honeypot Hidden Input */}
        <input
          type="text"
          name="website_url_hp"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Full Name */}
        <div>
          <label className="font-bold text-slate-300 block mb-1">Full Student Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Sophia Martinez"
            className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Contact Phone & Email Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-300 block mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 987-6543"
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="font-bold text-slate-300 block mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="sophia@example.com"
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Course Interested In */}
        <div>
          <label className="font-bold text-slate-300 block mb-1">Course / Program Interested In *</label>
          <select
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500 truncate"
          >
            {COURSES.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* City & Qualification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-300 block mb-1">Current City *</label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">Highest Qualification</label>
            <select
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value as Qualification })}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Working Professional">Working Professional</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Preferred Batch */}
        <div>
          <label className="font-bold text-slate-300 block mb-1">Preferred Batch Schedule</label>
          <div className="grid grid-cols-3 gap-2">
            {(['Morning (9 AM - 12 PM)', 'Evening (6 PM - 9 PM)', 'Weekend (Sat-Sun)'] as const).map((batch) => (
              <button
                key={batch}
                type="button"
                onClick={() => setFormData({ ...formData, preferredBatch: batch })}
                className={`py-2 px-1 rounded-xl text-[11px] font-semibold border transition-all text-center ${
                  formData.preferredBatch === batch
                    ? 'bg-blue-600/20 text-blue-400 border-blue-500/60 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {batch.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Message */}
        <div>
          <label className="font-bold text-slate-300 block mb-1">Message / Career Goals (Optional)</label>
          <textarea
            rows={2}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about your background or specific batch requirements..."
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Bot & Spam CAPTCHA Verification */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300 flex items-center space-x-1.5">
              <IconLock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Spam / Bot Validation: Solve Math Quiz</span>
            </span>
            <span className="font-mono font-extrabold text-blue-400 text-sm px-2 py-0.5 rounded bg-blue-500/10">
              {num1} + {num2} = ?
            </span>
          </div>

          <div className="flex space-x-2">
            <input
              type="number"
              required
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter answer"
              className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
            />
          </div>
          {captchaError && (
            <p className="text-[11px] text-rose-400 font-semibold">Incorrect answer. Please solve the security question.</p>
          )}
        </div>

        {/* Source & Entry Metadata Tag Footnote */}
        <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
          <span>Source Tag: <code className="text-slate-400">{sourceOverride || utmSource}</code></span>
          <span>Entry Point: <code className="text-slate-400">{entryPoint}</code></span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2"
        >
          <IconSend className="w-4 h-4" />
          <span>Submit Enquiry & Get Course Details</span>
        </button>

      </form>

    </div>
  );
};
