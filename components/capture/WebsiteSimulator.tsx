'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { COURSES } from '@/lib/mock-data';
import { PreferredBatch, Qualification } from '@/lib/types';
import { IconSparkles, IconCheckCircle, IconSend, IconGlobe } from '@/components/ui/Icons';

export const WebsiteSimulator: React.FC = () => {
  const { addLeadFromWebsite } = useLeadStore();

  const [simChannel, setSimChannel] = useState<'Google Ads' | 'Instagram' | 'Homepage' | 'Referral' | 'Walk-in'>('Instagram');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState(COURSES[0]);
  const [qualification, setQualification] = useState<Qualification>('12th Science (PCM)');
  const [class12Percentage, setClass12Percentage] = useState<number>(88);
  const [batch, setBatch] = useState<PreferredBatch>('Regular Morning College Batch');
  const [city, setCity] = useState('San Francisco');

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    addLeadFromWebsite({
      name,
      phone,
      email,
      course,
      qualification,
      class12Percentage: Number(class12Percentage),
      preferredBatch: batch,
      graduationYear: '2026 12th Pass',
      workExperience: 'Fresh 12th Graduate',
      city,
      source: simChannel,
      utmSource: simChannel.toLowerCase().replace(/\s+/g, '_'),
      entryPoint: '12th College Application Form',
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="space-y-6 pb-8 text-slate-900">
      
      {/* Header Banner */}
      <div className="ls-card p-6 border-l-4 border-l-blue-600 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-blue-100 text-blue-800">
            <IconGlobe className="w-7 h-7" />
          </div>
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-300">
              Class 12th College Admissions Portal Simulator
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">12th Pass Student Application Simulator</h1>
            <p className="text-sm font-bold text-slate-600 mt-0.5">
              Simulate high school 12th pass students applying for Undergraduate Degree admissions (B.Tech, BBA, BCA).
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Channel Selector & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Channel Selector */}
        <div className="ls-card p-6 bg-white space-y-4">
          <h2 className="text-base font-black text-slate-900 border-b border-slate-300 pb-3">
            Select Marketing Traffic Source
          </h2>

          <div className="space-y-2 text-sm font-bold">
            {(['Instagram', 'Google Ads', 'Homepage', 'Referral', 'Walk-in'] as const).map((channel) => (
              <button
                key={channel}
                onClick={() => setSimChannel(channel)}
                className={`w-full p-3.5 rounded-xl border text-left font-black transition-all flex items-center justify-between ${
                  simChannel === channel
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <span>{channel} Campaign</span>
                {simChannel === channel && <IconCheckCircle className="w-5 h-5 text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Live Form */}
        <div className="lg:col-span-2 ls-card p-6 bg-white space-y-5">
          <div className="border-b border-slate-300 pb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900">
              Simulated 12th Pass Application Form ({simChannel})
            </h2>
            {submitted && (
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center space-x-1">
                <IconCheckCircle className="w-4 h-4" />
                <span>Submitted & Auto-Ack Prospectus Dispatched!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm font-bold">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-600 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rohan Mehta"
                  className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-600 mb-1">Student Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 912-3456"
                  className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-600 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-600 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="San Francisco"
                  className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* 12th Stream & Percentage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-600 mb-1">12th Grade Stream *</label>
                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value as Qualification)}
                  className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                >
                  <option value="12th Science (PCM)">12th Science (PCM)</option>
                  <option value="12th Science (PCB)">12th Science (PCB)</option>
                  <option value="12th Commerce">12th Commerce</option>
                  <option value="12th Arts / Humanities">12th Arts / Humanities</option>
                  <option value="12th Pass (Awaiting Result)">12th Pass (Awaiting Result)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-600 mb-1">12th Board Score (%)</label>
                <input
                  type="number"
                  min="35"
                  max="100"
                  value={class12Percentage}
                  onChange={(e) => setClass12Percentage(Number(e.target.value))}
                  placeholder="88.5"
                  className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-600 mb-1">Target College Degree Program *</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full p-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-extrabold focus:outline-none focus:border-blue-600"
              >
                {COURSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm"
            >
              <IconSend className="w-5 h-5" />
              <span>Submit 12th College Application ({simChannel})</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
