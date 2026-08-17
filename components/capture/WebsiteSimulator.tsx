'use client';

import React, { useState } from 'react';
import { EnquiryForm } from './EnquiryForm';
import { EntryModals } from './EntryModals';
import { COURSES } from '@/lib/mock-data';
import { LeadSource } from '@/lib/types';
import { 
  IconSparkles, 
  IconPhone, 
  IconDownload, 
  IconGraduationCap, 
  IconTag, 
  IconCheckCircle,
  IconExternalLink
} from '@/components/ui/Icons';
import { useLeadStore } from '@/lib/lead-store';

export const WebsiteSimulator: React.FC = () => {
  const { setActiveView } = useLeadStore();

  // Simulated traffic referrer selector
  const [selectedTraffic, setSelectedTraffic] = useState<{
    source: LeadSource;
    utmSource: string;
    utmCampaign: string;
    label: string;
  }>({
    source: 'Google Ads',
    utmSource: 'google',
    utmCampaign: 'ai_bootcamp_sf',
    label: 'Google Ads Search Campaign',
  });

  const [activeModal, setActiveModal] = useState<'callback' | 'brochure' | null>(null);
  const [selectedCourseForBrochure, setSelectedCourseForBrochure] = useState<string>(COURSES[0]);

  const TRAFFIC_PRESETS = [
    { source: 'Google Ads' as LeadSource, utmSource: 'google', utmCampaign: 'google_cpc_ai', label: 'Google Ads Campaign' },
    { source: 'Instagram' as LeadSource, utmSource: 'instagram', utmCampaign: 'insta_story_promo', label: 'Instagram Ad Campaign' },
    { source: 'Homepage' as LeadSource, utmSource: 'direct_organic', utmCampaign: 'homepage_hero', label: 'Direct Website Homepage' },
    { source: 'Referral' as LeadSource, utmSource: 'alumni_network', utmCampaign: 'friend_referral', label: 'Alumni Referral Link' },
    { source: 'Walk-in' as LeadSource, utmSource: 'campus_desk', utmCampaign: 'open_house_event', label: 'Campus Walk-in Desk' },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Simulation Referrer Control Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-indigo-500/30 bg-indigo-950/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
              <IconTag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm text-white">Source & UTM Simulation Sandbox</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Feature #1 Demo
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Switch traffic channels below to test automatic lead source tagging and tracking.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            {TRAFFIC_PRESETS.map((preset) => (
              <button
                key={preset.source}
                onClick={() => setSelectedTraffic(preset)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedTraffic.source === preset.source
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Public Academy Website Simulation Header / Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 border border-slate-800 p-8 lg:p-12 shadow-2xl">
        
        {/* Glow circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <IconSparkles className="w-3.5 h-3.5" />
              <span>Fall 2026 Admissions Open</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Launch Your Career in <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">AI & Tech Innovation</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Join industry-led bootcamps in Data Science, Full Stack Engineering, UI/UX, and Cloud Architecture with 100% placement support.
            </p>

            {/* Multiple Entry Point Triggers */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#enquiry-form-section"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center space-x-2"
              >
                <span>Enroll Now</span>
              </a>

              <button
                onClick={() => setActiveModal('callback')}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all flex items-center space-x-2"
              >
                <IconPhone className="w-4 h-4 text-emerald-400" />
                <span>Request a Callback</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCourseForBrochure(COURSES[0]);
                  setActiveModal('brochure');
                }}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all flex items-center space-x-2"
              >
                <IconDownload className="w-4 h-4 text-amber-400" />
                <span>Download Brochure</span>
              </button>
            </div>

            <div className="flex items-center space-x-6 pt-4 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center space-x-2">
                <IconCheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Live Interactive Batches</span>
              </div>
              <div className="flex items-center space-x-2">
                <IconCheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Scholarship Grants</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Embedded Quick Lead Form */}
          <div id="enquiry-form-section" className="lg:col-span-5">
            <EnquiryForm
              sourceOverride={selectedTraffic.source}
              utmSource={selectedTraffic.utmSource}
              utmCampaign={selectedTraffic.utmCampaign}
              entryPoint="Enroll Form"
            />
          </div>

        </div>

      </div>

      {/* Courses Catalog Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
              <IconGraduationCap className="w-6 h-6 text-blue-400" />
              <span>Explore Programs & Download Syllabus</span>
            </h2>
            <p className="text-xs text-slate-400">Clicking download brochure opens a gated lead capture entry point.</p>
          </div>
          
          <button
            onClick={() => setActiveView('dashboard')}
            className="hidden sm:flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-blue-400 rounded-xl border border-slate-800 text-xs font-bold transition-colors"
          >
            <span>View Live Dashboard Pool</span>
            <IconExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COURSES.map((courseTitle, idx) => (
            <div
              key={courseTitle}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-blue-400 font-bold">BATCH #{idx + 101}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">12 Weeks</span>
                </div>
                <h3 className="font-extrabold text-white text-base leading-snug">{courseTitle}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Comprehensive hands-on curriculum with real-world capstone projects and mentor code reviews.
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    setSelectedCourseForBrochure(courseTitle);
                    setActiveModal('brochure');
                  }}
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-semibold text-xs rounded-xl border border-amber-500/30 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <IconDownload className="w-3.5 h-3.5" />
                  <span>Brochure</span>
                </button>

                <button
                  onClick={() => setActiveModal('callback')}
                  className="flex-1 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-semibold text-xs rounded-xl border border-blue-500/40 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <IconPhone className="w-3.5 h-3.5" />
                  <span>Callback</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Entry Point Modals */}
      <EntryModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        selectedCourse={selectedCourseForBrochure}
      />

    </div>
  );
};
