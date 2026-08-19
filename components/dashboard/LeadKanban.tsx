'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { Lead, LeadStatus } from '@/lib/types';
import { IconPhone, IconEye } from '@/components/ui/Icons';

interface LeadKanbanProps {
  onSelectLeadDetail: (lead: Lead) => void;
}

export const LeadKanban: React.FC<LeadKanbanProps> = ({ onSelectLeadDetail }) => {
  const { leads, updateLeadStatus, openDialer } = useLeadStore();

  const STAGES: LeadStatus[] = [
    'New',
    'Contacted',
    'Follow-up',
    'Interested',
    'Counselling',
    'Enrolled',
    'Dropped',
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-6">
      {STAGES.map((stage) => {
        const stageLeads = leads.filter((l) => l.status === stage);

        return (
          <div key={stage} className="w-80 shrink-0 ls-card p-4 bg-slate-100 border border-slate-300 space-y-3">
            
            {/* Stage Header */}
            <div className="flex justify-between items-center pb-2 border-b border-slate-300">
              <h3 className="font-extrabold text-sm text-slate-900">{stage}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-black bg-white text-slate-900 border border-slate-300 shadow-sm">
                {stageLeads.length}
              </span>
            </div>

            {/* Stage Cards */}
            <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
              {stageLeads.length === 0 ? (
                <div className="p-6 text-center text-xs font-bold text-slate-400 bg-white rounded-xl border border-slate-200">
                  No leads in stage
                </div>
              ) : (
                stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 bg-white rounded-xl border border-slate-300 space-y-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => onSelectLeadDetail(lead)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-extrabold text-slate-900 text-sm">{lead.name}</div>
                      {lead.aiLeadScore && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-black bg-amber-100 text-amber-900 border border-amber-300">
                          🔥 {lead.aiLeadScore}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 font-bold truncate">{lead.course}</p>

                    <div className="flex justify-between items-center text-xs text-slate-500 font-mono font-bold pt-1 border-t border-slate-100">
                      <span>{lead.phone}</span>
                      <span className="text-blue-700 font-extrabold">{lead.source}</span>
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
