'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { Lead, LeadStatus } from '@/lib/types';
import { IconPhone, IconMapPin, IconAlertTriangle } from '@/components/ui/Icons';

interface LeadKanbanProps {
  onSelectLeadDetail: (lead: Lead) => void;
}

export const LeadKanban: React.FC<LeadKanbanProps> = ({ onSelectLeadDetail }) => {
  const { leads, updateLeadStatus } = useLeadStore();

  const STAGES: { label: string; status: LeadStatus; color: string }[] = [
    { label: 'New Enquiries', status: 'New', color: 'border-t-indigo-500' },
    { label: 'Contacted', status: 'Contacted', color: 'border-t-blue-500' },
    { label: 'Follow-up', status: 'Follow-up', color: 'border-t-amber-500' },
    { label: 'Interested', status: 'Interested', color: 'border-t-purple-500' },
    { label: 'Counselling', status: 'Counselling', color: 'border-t-pink-500' },
    { label: 'Enrolled', status: 'Enrolled', color: 'border-t-emerald-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
      {STAGES.map((stage) => {
        const stageLeads = leads.filter((l) => l.status === stage.status);

        return (
          <div
            key={stage.status}
            className={`clean-card p-3 border-t-4 ${stage.color} flex flex-col min-h-[460px]`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80 mb-3">
              <span className="font-bold text-xs text-white">{stage.label}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                {stageLeads.length}
              </span>
            </div>

            {/* Cards List */}
            <div className="space-y-2.5 flex-1 overflow-y-auto pr-0.5">
              {stageLeads.length === 0 ? (
                <div className="py-8 text-center text-slate-600 text-[11px] font-medium border border-dashed border-slate-800/80 rounded-xl">
                  No leads in stage
                </div>
              ) : (
                stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => onSelectLeadDetail(lead)}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer space-y-2 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-xs text-white truncate max-w-[120px]">
                        {lead.name}
                      </h4>
                      {lead.isDuplicate && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          DUP
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 font-medium truncate" title={lead.course}>
                      {lead.course}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
                      <span>{lead.city}</span>
                      <span className="font-mono text-indigo-400">{lead.source}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
};
