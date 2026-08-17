'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { IconAlertTriangle, IconUserPlus, IconCheckCircle } from '@/components/ui/Icons';

export const EscalationQueue: React.FC = () => {
  const { allLeadsUnfiltered, counsellors, assignCounsellor } = useLeadStore();

  // Escalated leads or stalled leads (>48 hrs)
  const escalatedLeads = allLeadsUnfiltered.filter((l) => l.escalatedToManager || l.status === 'Counselling');

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-rose-500/40 bg-rose-950/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <IconAlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-extrabold text-white">Manager Escalation Queue</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {escalatedLeads.length} Stalled Leads
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Leads stalled in Counselling &gt; 48 hours automatically escalated for manager intervention</p>
          </div>
        </div>
      </div>

      {/* Escalated Queue List */}
      <div className="space-y-4">
        {escalatedLeads.length === 0 ? (
          <div className="py-12 text-center text-slate-500 glass-panel rounded-2xl border border-slate-800 text-xs">
            No escalated or stalled leads requiring manager intervention.
          </div>
        ) : (
          escalatedLeads.map((lead) => {
            const assigned = counsellors.find((c) => c.id === lead.assignedCounsellorId);

            return (
              <div
                key={lead.id}
                className="glass-panel p-5 rounded-2xl border border-rose-500/30 bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl hover:border-rose-500/60 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-extrabold text-base text-white">{lead.name}</span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Stage: {lead.status}
                    </span>
                    <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                      Uncontacted 52h
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    Course: <span className="font-semibold text-white">{lead.course}</span> • Contact: <span className="font-mono text-blue-400">{lead.phone}</span> • City: {lead.city}
                  </p>

                  <p className="text-xs text-slate-400 italic">
                    "{lead.notes || 'High intent lead requested portfolio review demo.'}"
                  </p>
                </div>

                {/* Manager Reassign & Action Controls */}
                <div className="flex items-center space-x-3 shrink-0">
                  <div className="text-right text-xs">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Currently Assigned</div>
                    <div className="font-semibold text-slate-200">{assigned?.name || 'Unassigned'}</div>
                  </div>

                  <select
                    value={lead.assignedCounsellorId || ''}
                    onChange={(e) => {
                      assignCounsellor(lead.id, e.target.value);
                      alert(`Reassigned lead ${lead.name} to senior telecaller.`);
                    }}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 font-bold focus:outline-none"
                  >
                    <option value="" disabled>Reassign Staff</option>
                    {counsellors.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
