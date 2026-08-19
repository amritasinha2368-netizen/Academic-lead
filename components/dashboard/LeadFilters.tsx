'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { COURSES } from '@/lib/mock-data';
import { LeadStatus, LeadSource } from '@/lib/types';
import { IconSearch, IconFilter, IconAlertTriangle } from '@/components/ui/Icons';

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
    <div className="clean-surface p-4 space-y-3">
      
      {/* Search & Filters Container */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <IconSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Search leads by name, phone, email, or city..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filter Selectors */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          
          <select
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value as any }))}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={filters.course}
            onChange={(e) => setFilters((prev) => ({ ...prev, course: e.target.value }))}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Courses</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={filters.source}
            onChange={(e) => setFilters((prev) => ({ ...prev, source: e.target.value as any }))}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Channels</option>
            {SOURCES.map((src) => (
              <option key={src} value={src}>{src}</option>
            ))}
          </select>

          <select
            value={filters.counsellorId}
            onChange={(e) => setFilters((prev) => ({ ...prev, counsellorId: e.target.value }))}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Staff</option>
            {counsellors.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <button
            onClick={() => setFilters((prev) => ({ ...prev, duplicateOnly: !prev.duplicateOnly }))}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              filters.duplicateOnly
                ? 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/40'
                : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
            }`}
          >
            Duplicates
          </button>

          <button
            onClick={resetFilters}
            className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-200 dark:bg-slate-800 rounded-xl transition-colors"
          >
            Reset
          </button>

        </div>

      </div>

    </div>
  );
};
