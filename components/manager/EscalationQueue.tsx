'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { IconAlertTriangle, IconUserPlus } from '@/components/ui/Icons';

export const EscalationQueue: React.FC = () => {
  const { allLeadsUnfiltered, counsellors, assignCounsellor } = useLeadStore();

  const escalatedLeads = allLeadsUnfiltered.filter((l) => l.escalatedToManager || l.status === 'Counselling');

  return (
    <div className="ls-card p-6 bg-white space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-300 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-800">
            <IconAlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900">Manager Escalation Queue</h2>
            <p className="text-xs text-slate-600 font-bold">Leads stalled in Counselling &gt; 48 hours</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-rose-100 text-rose-900 border border-rose-300">
          {escalatedLeads.length} Stalled
        </span>
      </div>

      {/* Escalated Queue List */}
      <div className="space-y-3">
        {escalatedLeads.length === 0 ? (
          <div className="py-8 text-center text-slate-500 font-bold text-sm bg-slate-50 rounded-xl border border-slate-200">
            No escalated or stalled leads requiring manager intervention.
          </div>
        ) : (
          escalatedLeads.map((lead) => (
            <div key={lead.id} className="p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-extrabold text-slate-900 text-base">{lead.name}</div>
                  <div className="text-xs text-slate-600 font-bold">{lead.course} • {lead.phone}</div>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-black bg-rose-100 text-rose-900 border border-rose-300">
                  Stalled
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs font-bold">
                <span className="text-slate-600">Reassign Telecaller:</span>
                <select
                  value={lead.assignedCounsellorId || ''}
                  onChange={(e) => assignCounsellor(lead.id, e.target.value)}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-slate-900 font-bold text-xs"
                >
                  {counsellors.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
