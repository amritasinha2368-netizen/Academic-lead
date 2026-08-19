'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { COURSES, CITIES } from '@/lib/mock-data';
import { PreferredBatch, Qualification } from '@/lib/types';
import { IconCheckCircle, IconSend, IconSparkles, IconAlertTriangle } from '@/components/ui/Icons';

interface EnquiryFormProps {
  entryPoint?: string;
  sourceOverride?: string;
  title?: string;
  subtitle?: string;
  onSubmittedSuccess?: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  entryPoint = 'Homepage Enquiry Form',
  sourceOverride,
  title = 'Class 12th College Application Form',
  subtitle = 'Undergraduate Degree Admissions 2026',
  onSubmittedSuccess,
}) => {
  const { addLeadFromWebsite } = useLeadStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: CITIES[0],
    course: COURSES[0],
    qualification: '12th Science (PCM)' as Qualification,
    class12Percentage: 88,
    preferredBatch: 'Regular Morning College Batch' as PreferredBatch,
    message: '',
    honeypot: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [duplicateAlert, setDuplicateAlert] = useState<{ isDuplicate: boolean; matchReason?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) return;
    if (!formData.name || !formData.phone || !formData.email) return;

    const result = addLeadFromWebsite({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      course: formData.course,
      qualification: formData.qualification,
      class12Percentage: Number(formData.class12Percentage),
      preferredBatch: formData.preferredBatch,
      message: formData.message,
      source: (sourceOverride as any) || 'Homepage',
      utmSource: 'website',
      utmMedium: 'organic',
      utmCampaign: 'undergrad_admissions_2026',
      entryPoint,
    });

    if (result.duplicateResult.isDuplicate) {
      setDuplicateAlert({
        isDuplicate: true,
        matchReason: result.duplicateResult.matchReason,
      });
    }

    setSubmitted(true);
    if (onSubmittedSuccess) onSubmittedSuccess();

    setFormData({
      name: '',
      phone: '',
      email: '',
      city: CITIES[0],
      course: COURSES[0],
      qualification: '12th Science (PCM)',
      class12Percentage: 88,
      preferredBatch: 'Regular Morning College Batch',
      message: '',
      honeypot: '',
    });
  };

  return (
    <div className="ls-card p-6 bg-white space-y-4">
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900">{title}</h2>
          <p className="text-xs text-slate-600 font-bold mt-0.5">{subtitle}</p>
        </div>
        {submitted && (
          <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center space-x-1">
            <IconCheckCircle className="w-4 h-4 text-emerald-700" />
            <span>Submitted!</span>
          </span>
        )}
      </div>

      {duplicateAlert && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center space-x-2">
          <IconAlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
          <div>
            <strong>Duplicate Application Detected ({duplicateAlert.matchReason} match):</strong> Your application has been logged and merged with your primary student profile.
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-600 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rohan Mehta"
              className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-slate-600 mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 912-3456"
              className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-600 mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-slate-600 mb-1">Current City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 12th Stream & Percentage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-600 mb-1">12th Grade Stream *</label>
            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none"
            >
              <option value="12th Science (PCM)">12th Science (PCM)</option>
              <option value="12th Science (PCB)">12th Science (PCB)</option>
              <option value="12th Commerce">12th Commerce</option>
              <option value="12th Arts / Humanities">12th Arts / Humanities</option>
              <option value="12th Pass (Awaiting Result)">12th Pass (Awaiting Result)</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-600 mb-1">12th Board Score (%)</label>
            <input
              type="number"
              name="class12Percentage"
              min="35"
              max="100"
              value={formData.class12Percentage}
              onChange={handleChange}
              placeholder="88.5"
              className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-600 mb-1">Target College Degree Program *</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-extrabold focus:outline-none"
          >
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
        >
          <IconSend className="w-4 h-4" />
          <span>Submit College Application</span>
        </button>
      </form>
    </div>
  );
};
