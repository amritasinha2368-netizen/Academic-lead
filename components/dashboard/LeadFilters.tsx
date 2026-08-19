'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { COURSES } from '@/lib/mock-data';
import { LeadStatus, LeadSource } from '@/lib/types';
import { IconSearch, IconRefreshCw } from '@/components/ui/Icons';

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
    <div className="ls-card p-4">
      {/* Single Clean Filter Bar Row */}
      <div className="flex flex-wrap items-center gap-2.5">
        
        {/* Search Bar Input */}
        <div className="relative flex-1 min-w-[220px]">
          <IconSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Search leads by name, phone, email..."
            className="w-full pl-10 pr-3.5 py-2 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
          />
        </div>

        {/* Stage Filter */}
        <select
          value={filters.status}
          onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value as any }))}
          className="px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-pointer"
        >
          <option value="All">All Lead Stages</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Course Filter */}
        <select
          value={filters.course}
          onChange={(e) => setFilters((prev) => ({ ...prev, course: e.target.value }))}
          className="px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-pointer"
        >
          <option value="All">All Courses</option>
          {COURSES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Channel Filter */}
        <select
          value={filters.source}
          onChange={(e) => setFilters((prev) => ({ ...prev, source: e.target.value as any }))}
          className="px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-pointer"
        >
          <option value="All">All Channels</option>
          {SOURCES.map((src) => (
            <option key={src} value={src}>{src}</option>
          ))}
        </select>

        {/* Counsellor Filter */}
        <select
          value={filters.counsellorId}
          onChange={(e) => setFilters((prev) => ({ ...prev, counsellorId: e.target.value }))}
          className="px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-pointer"
        >
          <option value="All">All Staff</option>
          {counsellors.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* Duplicates Toggle */}
        <button
          onClick={() => setFilters((prev) => ({ ...prev, duplicateOnly: !prev.duplicateOnly }))}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
            filters.duplicateOnly
              ? 'bg-rose-100 text-rose-900 border-rose-400'
              : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
          }`}
        >
          Duplicates
        </button>

        {/* Reset Button (In line with all filters) */}
        <button
          onClick={resetFilters}
          className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 rounded-xl transition-colors border border-slate-300 flex items-center space-x-1"
          title="Reset all filters"
        >
          <IconRefreshCw className="w-3.5 h-3.5 text-slate-600" />
          <span>Reset</span>
        </button>

      </div>
    </div>
  );
};
