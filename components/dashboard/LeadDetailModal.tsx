'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { Lead, LeadStatus } from '@/lib/types';
import { formatDateString } from '@/lib/utils';
import { 
  IconX, 
  IconPhone, 
  IconMail, 
  IconMapPin, 
  IconGraduationCap, 
  IconCalendar, 
  IconAlertTriangle,
  IconPlus,
  IconMessageSquare
} from '@/components/ui/Icons';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, onClose }) => {
  const { 
    leads, 
    counsellors, 
    updateLeadStatus, 
    assignCounsellor, 
    addLeadNote, 
    resolveDuplicateFlag,
    mergeDuplicateLeads
  } = useLeadStore();

  const [newNoteText, setNewNoteText] = useState('');

  if (!lead) return null;

  // Refresh current lead state from store
  const currentLead = leads.find((l) => l.id === lead.id) || lead;
  const assignedCounsellor = counsellors.find((c) => c.id === currentLead.assignedCounsellorId);

  // If duplicate, find potential original lead
  const duplicateOriginal = currentLead.duplicateOfId
    ? leads.find((l) => l.id === currentLead.duplicateOfId)
    : leads.find((l) => l.id !== currentLead.id && (l.phone.replace(/\D/g, '') === currentLead.phone.replace(/\D/g, '') || l.email.toLowerCase() === currentLead.email.toLowerCase()));

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addLeadNote(currentLead.id, newNoteText, assignedCounsellor ? assignedCounsellor.name : 'Staff Counsellor');
    setNewNoteText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950 flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold border border-blue-400/20 shadow-lg">
              {currentLead.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-extrabold text-white">{currentLead.name}</h2>
                {currentLead.isDuplicate && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse-subtle">
                    DUPLICATE FLAG
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Enquiry ID: <span className="font-mono text-slate-300">{currentLead.id}</span> • Added{' '}
                {formatDateString(currentLead.dateAdded)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Student Contact & Course Details */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Actions / Status Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Lead Status Stage</label>
              <select
                value={currentLead.status}
                onChange={(e) => updateLeadStatus(currentLead.id, e.target.value as LeadStatus)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-bold text-blue-400 focus:outline-none focus:border-blue-500"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Interested">Interested</option>
                <option value="Enrolled">Enrolled</option>
                <option value="Dropped">Dropped</option>
              </select>

              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block pt-2">Assigned Counsellor</label>
              <select
                value={currentLead.assignedCounsellorId || ''}
                onChange={(e) => assignCounsellor(currentLead.id, e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled>Unassigned</option>
                {counsellors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Duplicate Flag Alert & Merge Action */}
            {currentLead.isDuplicate && (
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs space-y-2">
                <div className="flex items-center space-x-2 text-rose-300 font-bold">
                  <IconAlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Duplicate Record Detected</span>
                </div>
                <p className="text-slate-300">
                  Phone number or email matches an existing enquiry in the database.
                </p>
                {duplicateOriginal && (
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                    Original Lead: <span className="font-semibold text-white">{duplicateOriginal.name}</span> ({duplicateOriginal.status})
                  </div>
                )}
                <div className="flex space-x-2 pt-1">
                  {duplicateOriginal && (
                    <button
                      onClick={() => {
                        if (confirm(`Merge this lead into ${duplicateOriginal.name}?`)) {
                          mergeDuplicateLeads(duplicateOriginal.id, currentLead.id);
                          onClose();
                        }
                      }}
                      className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded text-[11px] transition-colors"
                    >
                      Merge Leads
                    </button>
                  )}
                  <button
                    onClick={() => resolveDuplicateFlag(currentLead.id)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded text-[11px]"
                  >
                    Dismiss Flag
                  </button>
                </div>
              </div>
            )}

            {/* Personal Details */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <h3 className="font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
                Contact & Background
              </h3>

              <div className="space-y-2 text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5"><IconPhone className="w-3.5 h-3.5" /> Phone</span>
                  <span className="font-semibold font-mono text-white">{currentLead.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5"><IconMail className="w-3.5 h-3.5" /> Email</span>
                  <span className="font-medium text-white truncate max-w-[160px]">{currentLead.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5"><IconMapPin className="w-3.5 h-3.5" /> City</span>
                  <span className="font-medium text-white">{currentLead.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5"><IconGraduationCap className="w-3.5 h-3.5" /> Qualification</span>
                  <span className="font-medium text-white">{currentLead.qualification}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5"><IconCalendar className="w-3.5 h-3.5" /> Preferred Batch</span>
                  <span className="font-medium text-blue-400">{currentLead.preferredBatch}</span>
                </div>
              </div>
            </div>

            {/* Source & Entry Point Info */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <h3 className="font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
                Source Attribution
              </h3>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">Lead Source</span>
                <span className="font-semibold text-blue-400">{currentLead.source}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">Entry Point</span>
                <span className="font-medium text-slate-200">{currentLead.entryPoint}</span>
              </div>
              {currentLead.utmSource && (
                <div className="pt-2 text-[11px] font-mono text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
                  <div>utm_source: {currentLead.utmSource}</div>
                  <div>utm_medium: {currentLead.utmMedium}</div>
                  <div>utm_campaign: {currentLead.utmCampaign}</div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Interaction Log & Notes */}
          <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
            
            {/* Student Message */}
            {currentLead.message && (
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs">
                <h4 className="font-bold text-blue-300 uppercase tracking-wider mb-1">Student Enquiry Message</h4>
                <p className="text-slate-300 italic">"{currentLead.message}"</p>
              </div>
            )}

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Add Counsellor Remarks & Call Note
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Record call outcome, student preferences, or follow-up date..."
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center space-x-1"
                >
                  <IconPlus className="w-3.5 h-3.5" />
                  <span>Add Note</span>
                </button>
              </div>
            </form>

            {/* Activity History Timeline */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs text-slate-300 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
                <IconMessageSquare className="w-4 h-4 text-blue-400" />
                <span>Interaction Timeline & Audit Log</span>
              </h3>

              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
                {currentLead.activityHistory.map((act) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-blue-400">{act.author}</span>
                      <span className="text-slate-500">{formatDateString(act.timestamp)}</span>
                    </div>
                    <p className="text-slate-300">{act.message}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
