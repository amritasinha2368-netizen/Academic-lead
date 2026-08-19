'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { COURSES } from '@/lib/mock-data';
import { LeadStatus, LeadSource } from '@/lib/types';
import { IconSearch } from '@/components/ui/Icons';

export const LeadFilters: React.FC = () => {
  const { filters, setFilters, counsellors, resetFilters } = useLeadStore();

  const STATUSES: LeadStatus[] = [
    'New',
    'Assigned',
    'Contacted',
    'Interested',
    'Counselling',
    'Visit',
    'Application',
    'Documents',
    'Payment',
    'Enrolled',
    'Dropped',
  ];

  const SOURCES: LeadSource[] = [
    'Homepage',
    'Google Ads',
    'Instagram',
    'Referral',
    'Walk-in',
    'Brochure Gate',
    'Callback Request',
    'AI Chatbot',
  ];

  return (
    <div className="ls-card p-5 space-y-4">
      
      {/* Search & Filters Container */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        
        {/* Search Input (14px Font) */}
        <div className="relative flex-1 w-full">
          <IconSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Search by student name, phone number, email, or city..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-600 font-bold"
          />
        </div>

        {/* Filter Selectors (14px Font) */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          
          <select
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value as any }))}
            className="px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-sm text-slate-900 font-extrabold focus:outline-none focus:border-blue-600"
          >
            <option value="All">All Lead Stages</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={filters.course}
            onChange={(e) => setFilters((prev) => ({ ...prev, course: e.target.value }))}
            className="px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-sm text-slate-900 font-extrabold focus:outline-none focus:border-blue-600"
          >
            <option value="All">All Courses</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={filters.source}
            onChange={(e) => setFilters((prev) => ({ ...prev, source: e.target.value as any }))}
            className="px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-sm text-slate-900 font-extrabold focus:outline-none focus:border-blue-600"
          >
            <option value="All">All Channels</option>
            {SOURCES.map((src) => (
              <option key={src} value={src}>{src}</option>
            ))}
          </select>

          <select
            value={filters.counsellorId}
            onChange={(e) => setFilters((prev) => ({ ...prev, counsellorId: e.target.value }))}
            className="px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-sm text-slate-900 font-extrabold focus:outline-none focus:border-blue-600"
          >
            <option value="All">All Staff</option>
            {counsellors.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <button
            onClick={() => setFilters((prev) => ({ ...prev, duplicateOnly: !prev.duplicateOnly }))}
            className={`px-4 py-2.5 rounded-xl text-sm font-black transition-all border ${
              filters.duplicateOnly
                ? 'bg-rose-100 text-rose-900 border-rose-400'
                : 'bg-slate-100 text-slate-800 border-slate-300'
            }`}
          >
            Duplicates
          </button>

          <button
            onClick={resetFilters}
            className="px-4 py-2.5 text-sm font-black text-slate-600 hover:text-slate-900 bg-slate-200 rounded-xl transition-colors"
          >
            Reset
          </button>

        </div>

      </div>

    </div>
  );
};
