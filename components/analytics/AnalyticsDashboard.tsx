'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { LeadStatus } from '@/lib/types';
import { 
  IconUsers, 
  IconGraduationCap, 
  IconTag, 
  IconSparkles, 
  IconCheckCircle 
} from '@/components/ui/Icons';

export const AnalyticsDashboard: React.FC = () => {
  const { allLeadsUnfiltered, counsellors } = useLeadStore();

  const totalLeads = allLeadsUnfiltered.length;
  const newLeads = allLeadsUnfiltered.filter((l) => l.status === 'New').length;
  const contactedLeads = allLeadsUnfiltered.filter((l) => l.status === 'Contacted').length;
  const followUpLeads = allLeadsUnfiltered.filter((l) => l.status === 'Follow-up').length;
  const interestedLeads = allLeadsUnfiltered.filter((l) => l.status === 'Interested').length;
  const enrolledLeads = allLeadsUnfiltered.filter((l) => l.status === 'Enrolled').length;
  const droppedLeads = allLeadsUnfiltered.filter((l) => l.status === 'Dropped').length;

  const STAGES: { label: string; count: number; status: LeadStatus; color: string }[] = [
    { label: 'New Enquiries', count: newLeads, status: 'New', color: 'bg-indigo-500' },
    { label: 'Contacted', count: contactedLeads, status: 'Contacted', color: 'bg-blue-500' },
    { label: 'Follow-up Scheduled', count: followUpLeads, status: 'Follow-up', color: 'bg-amber-500' },
    { label: 'High Interest', count: interestedLeads, status: 'Interested', color: 'bg-purple-500' },
    { label: 'Enrolled / Converted', count: enrolledLeads, status: 'Enrolled', color: 'bg-emerald-500' },
  ];

  // Lead Source ROI Breakdown
  const sourcesMap = allLeadsUnfiltered.reduce((acc, lead) => {
    const src = lead.source;
    if (!acc[src]) {
      acc[src] = { total: 0, enrolled: 0 };
    }
    acc[src].total += 1;
    if (lead.status === 'Enrolled') {
      acc[src].enrolled += 1;
    }
    return acc;
  }, {} as Record<string, { total: number; enrolled: number }>);

  // Counsellor Performance Stats
  const counsellorPerformance = counsellors.map((c) => {
    const assignedLeads = allLeadsUnfiltered.filter((l) => l.assignedCounsellorId === c.id);
    const totalAssigned = assignedLeads.length;
    const totalCalls = assignedLeads.reduce((sum, l) => {
      const calls = l.activityHistory.filter((a) => a.type === 'Call Log').length;
      return sum + calls;
    }, 0);
    const converted = assignedLeads.filter((l) => l.status === 'Enrolled').length;
    const convRate = totalAssigned > 0 ? Math.round((converted / totalAssigned) * 100) : 0;

    return {
      counsellor: c,
      totalAssigned,
      totalCalls,
      converted,
      convRate,
    };
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Overview Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <IconSparkles className="w-3.5 h-3.5" />
            <span>Section 7: Executive Intelligence</span>
          </div>
          <h2 className="text-2xl font-black text-white">Reports & Conversion Analytics Hub</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time breakdown of conversion funnel, lead source ROI, and counsellor performance.</p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
          <div className="text-right">
            <div className="text-xs text-slate-400">Total Portal Pool</div>
            <div className="text-2xl font-black text-white">{totalLeads} Leads</div>
          </div>
          <div className="h-10 w-[1px] bg-slate-800" />
          <div className="text-right">
            <div className="text-xs text-slate-400">Overall Conversion</div>
            <div className="text-2xl font-black text-emerald-400">
              {totalLeads > 0 ? Math.round((enrolledLeads / totalLeads) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>

      {/* Grid Row 1: Conversion Funnel Visualizer */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
            <IconGraduationCap className="w-5 h-5 text-blue-400" />
            <span>Academy Admissions Conversion Funnel</span>
          </h3>
          <span className="text-xs font-bold text-slate-400">
            {enrolledLeads} Enrolled of {totalLeads} Total Enquiries
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {STAGES.map((stage) => {
            const percentage = totalLeads > 0 ? Math.round((stage.count / totalLeads) * 100) : 0;

            return (
              <div key={stage.status} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{stage.label}</span>
                  <span className="font-mono text-slate-400">
                    <strong className="text-white">{stage.count} leads</strong> ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${stage.color}`}
                    style={{ width: `${Math.max(percentage, 4)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid Row 2: Lead Source ROI Report & Counsellor Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Lead Source ROI */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
              <IconTag className="w-5 h-5 text-indigo-400" />
              <span>Lead Source ROI Performance</span>
            </h3>
            <span className="text-xs text-slate-400">Channel Efficiency</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Traffic Channel</th>
                  <th className="py-2.5 px-3 text-center">Total Enquiries</th>
                  <th className="py-2.5 px-3 text-center">Enrolled</th>
                  <th className="py-2.5 px-3 text-right">Conv. Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {Object.entries(sourcesMap).map(([source, stats]) => {
                  const rate = stats.total > 0 ? Math.round((stats.enrolled / stats.total) * 100) : 0;
                  return (
                    <tr key={source} className="hover:bg-slate-900/50">
                      <td className="py-3 px-3 font-semibold text-white">{source}</td>
                      <td className="py-3 px-3 text-center font-mono text-slate-300">{stats.total}</td>
                      <td className="py-3 px-3 text-center font-mono text-emerald-400 font-bold">{stats.enrolled}</td>
                      <td className="py-3 px-3 text-right font-bold text-blue-400">{rate}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Counsellor Performance Leaderboard */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
              <IconUsers className="w-5 h-5 text-emerald-400" />
              <span>Counsellor Performance Leaderboard</span>
            </h3>
            <span className="text-xs text-slate-400">Staff Workload</span>
          </div>

          <div className="space-y-3">
            {counsellorPerformance.map((item) => (
              <div
                key={item.counsellor.id}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.counsellor.avatar}
                    alt={item.counsellor.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <div className="font-bold text-white text-xs">{item.counsellor.name}</div>
                    <div className="text-[11px] text-slate-400">{item.counsellor.role}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs font-mono">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Assigned</div>
                    <div className="font-bold text-slate-200">{item.totalAssigned}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Calls</div>
                    <div className="font-bold text-blue-400">{item.totalCalls}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Conversions</div>
                    <div className="font-bold text-emerald-400">{item.converted} ({item.convRate}%)</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
