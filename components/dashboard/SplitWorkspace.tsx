'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { Lead, LeadStatus } from '@/lib/types';
import { formatDateString } from '@/lib/utils';
import { 
  IconPhone, 
  IconMail, 
  IconMapPin, 
  IconGraduationCap, 
  IconCalendar, 
  IconSparkles, 
  IconMessageSquare, 
  IconDownload, 
  IconCheckCircle, 
  IconPlus,
  IconSearch,
  IconTag,
  IconInstagram,
  IconGoogle,
  IconGlobe,
  IconTrash
} from '@/components/ui/Icons';

export const SplitWorkspace: React.FC = () => {
  const { 
    leads, 
    counsellors, 
    updateLeadStatus, 
    assignCounsellor, 
    addLeadNote, 
    convertLeadToStudent,
    openDialer,
    openMessageComposer,
    deleteLead,
    filters,
    setFilters
  } = useLeadStore();

  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');
  const [newNoteText, setNewNoteText] = useState('');

  const currentLead = leads.find((l) => l.id === selectedLeadId) || leads[0];
  const assignedCounsellor = counsellors.find((c) => c.id === currentLead?.assignedCounsellorId);

  const PIPELINE_STAGES: LeadStatus[] = [
    'New',
    'Contacted',
    'Follow-up',
    'Interested',
    'Counselling',
    'Enrolled',
    'Dropped'
  ];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !currentLead) return;
    addLeadNote(currentLead.id, newNoteText, assignedCounsellor ? assignedCounsellor.name : 'Staff Counsellor');
    setNewNoteText('');
  };

  const renderChannelBadge = (source: string) => {
    if (source.includes('Instagram')) return <span className="text-pink-600 dark:text-pink-400 flex items-center gap-1"><IconInstagram className="w-3 h-3" /> Instagram</span>;
    if (source.includes('Google')) return <span className="text-sky-600 dark:text-sky-400 flex items-center gap-1"><IconGoogle className="w-3 h-3" /> Google Ads</span>;
    return <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1"><IconGlobe className="w-3 h-3" /> {source}</span>;
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-5 overflow-hidden">
      
      {/* LEFT PANE: Master Lead Stream (Linear / Notion Style) */}
      <div className="w-full lg:w-96 clean-surface flex flex-col shrink-0 overflow-hidden">
        
        {/* Stream Search & Filters */}
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative">
            <IconSearch className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Filter lead stream..."
              className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span className="font-bold">{leads.length} Leads Stream</span>
            <select
              value={filters.status}
              onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value as any }))}
              className="bg-transparent font-semibold text-indigo-600 dark:text-indigo-400 focus:outline-none cursor-pointer"
            >
              <option value="All">All Stages</option>
              {PIPELINE_STAGES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lead Stream List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-200 dark:divide-slate-800/60">
          {leads.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No leads match criteria
            </div>
          ) : (
            leads.map((lead) => {
              const isSelected = lead.id === selectedLeadId;

              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={`p-3.5 cursor-pointer transition-all space-y-1.5 ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-l-4 border-indigo-600'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{lead.name}</span>
                      {lead.aiLeadScore && (
                        <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          🔥 {lead.aiLeadScore}%
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {lead.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{lead.course}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                    {renderChannelBadge(lead.source)}
                    <span className="font-mono">{lead.city}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* RIGHT PANE: Lead Intelligence & Action Workspace */}
      {currentLead ? (
        <div className="flex-1 clean-surface flex flex-col overflow-hidden">
          
          {/* Workspace Top Header Bar */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-4 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-lg font-black shadow-md">
                {currentLead.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{currentLead.name}</h2>
                  {currentLead.enrolledStudentId && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                      STUDENT #{currentLead.enrolledStudentId}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Enquiry ID: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{currentLead.id}</span> • Added {formatDateString(currentLead.dateAdded)}
                </p>
              </div>
            </div>

            {/* Direct Action Toolbar */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => openDialer(currentLead)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
              >
                <IconPhone className="w-3.5 h-3.5" />
                <span>Call Softphone</span>
              </button>

              <button
                onClick={() => openMessageComposer(currentLead, 'whatsapp')}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
              >
                <IconMessageSquare className="w-3.5 h-3.5" />
                <span>Send WhatsApp</span>
              </button>

              {!currentLead.enrolledStudentId && (
                <button
                  onClick={() => convertLeadToStudent(currentLead.id)}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
                >
                  <IconSparkles className="w-3.5 h-3.5" />
                  <span>Enroll Student</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (confirm(`Delete lead "${currentLead.name}"?`)) deleteLead(currentLead.id);
                }}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-xl transition-colors"
                title="Delete"
              >
                <IconTrash className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Pipeline Stepper Bar */}
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0">
            <div className="flex items-center justify-between space-x-1 text-xs">
              {PIPELINE_STAGES.map((stage, idx) => {
                const isActive = currentLead.status === stage;
                const isPassed = PIPELINE_STAGES.indexOf(currentLead.status) > idx;

                return (
                  <button
                    key={stage}
                    onClick={() => updateLeadStatus(currentLead.id, stage)}
                    className={`flex-1 py-1.5 text-center font-bold rounded-lg border transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : isPassed
                        ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {stage}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workspace Inner Scroll Area */}
          <div className="p-5 flex-1 overflow-y-auto space-y-5">
            
            {/* Grid 1: Details & Attribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Student Personal Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <h3 className="font-bold text-slate-900 dark:text-white uppercase text-[11px] border-b border-slate-200 dark:border-slate-800 pb-2">
                  Student Information
                </h3>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300 pt-1">
                  <div><span className="text-slate-400">Phone:</span> <strong className="text-slate-900 dark:text-white font-mono">{currentLead.phone}</strong></div>
                  <div><span className="text-slate-400">Email:</span> <span className="text-slate-900 dark:text-white">{currentLead.email}</span></div>
                  <div><span className="text-slate-400">City:</span> <span className="text-slate-900 dark:text-white">{currentLead.city}</span></div>
                  <div><span className="text-slate-400">Qualification:</span> <span className="text-slate-900 dark:text-white">{currentLead.qualification}</span></div>
                  <div className="col-span-2"><span className="text-slate-400">Target Course:</span> <span className="font-bold text-indigo-600 dark:text-indigo-400">{currentLead.course}</span></div>
                </div>
              </div>

              {/* Channel Attribution Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <h3 className="font-bold text-slate-900 dark:text-white uppercase text-[11px] border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center space-x-1">
                  <IconTag className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Channel Origin & UTM Tracking</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300 pt-1">
                  <div><span className="text-slate-400">Traffic Source:</span> <span className="font-bold text-indigo-600 dark:text-indigo-400">{currentLead.source}</span></div>
                  <div><span className="text-slate-400">Entry Form:</span> <span className="text-slate-900 dark:text-white">{currentLead.entryPoint}</span></div>
                  <div><span className="text-slate-400">utm_source:</span> <span className="font-mono text-slate-700 dark:text-slate-300">{currentLead.utmSource || 'website'}</span></div>
                  <div><span className="text-slate-400">utm_campaign:</span> <span className="font-mono text-slate-700 dark:text-slate-300">{currentLead.utmCampaign || 'organic'}</span></div>
                </div>
              </div>

            </div>

            {/* Grid 2: Notes & Activity Timeline */}
            <div className="space-y-3">
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Record call remarks, student intent, or follow-up notes..."
                  className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="px-4 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-sm">
                  Add Remark
                </button>
              </form>

              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Interaction History Timeline ({currentLead.activityHistory.length})</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {currentLead.activityHistory.map((act) => (
                    <div key={act.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-indigo-600 dark:text-indigo-400 text-[11px]">
                        <span>{act.author}</span>
                        <span className="text-slate-400 font-normal">{formatDateString(act.timestamp)}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{act.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div className="flex-1 clean-surface flex items-center justify-center text-slate-400 text-xs">
          Select a lead from the left stream
        </div>
      )}

    </div>
  );
};
