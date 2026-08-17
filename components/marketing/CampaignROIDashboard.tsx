'use client';

import React, { useState } from 'react';
import { CAMPAIGN_ROI_DATA, AUTOMATION_RULES } from '@/lib/mock-data';
import { IconTrendingUp, IconDollarSign, IconTag, IconSparkles, IconCheckCircle, IconSend } from '@/components/ui/Icons';

export const CampaignROIDashboard: React.FC = () => {
  const [rules, setRules] = useState(AUTOMATION_RULES);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const totalSpend = CAMPAIGN_ROI_DATA.reduce((sum, c) => sum + c.spend, 0);
  const totalLeads = CAMPAIGN_ROI_DATA.reduce((sum, c) => sum + c.leadsCount, 0);
  const totalAdmissions = CAMPAIGN_ROI_DATA.reduce((sum, c) => sum + c.admissions, 0);
  const avgCPL = Math.round(totalSpend / totalLeads);
  const avgCAC = Math.round(totalSpend / totalAdmissions);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <IconTrendingUp className="w-3.5 h-3.5" />
            <span>Section 3: Marketing Intelligence & ROI Hub</span>
          </div>
          <h2 className="text-2xl font-black text-white">Campaign Attribution & Spend ROI</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time CPL (Cost Per Lead), CAC (Customer Acquisition Cost), and channel conversion tracking.</p>
        </div>

        <div className="flex items-center space-x-4 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
          <div className="text-right">
            <div className="text-xs text-slate-400">Total Spend</div>
            <div className="text-xl font-black text-white">${totalSpend.toLocaleString()}</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div className="text-right">
            <div className="text-xs text-slate-400">Avg Cost / Lead (CPL)</div>
            <div className="text-xl font-black text-emerald-400">${avgCPL}</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div className="text-right">
            <div className="text-xs text-slate-400">Acquisition Cost (CAC)</div>
            <div className="text-xl font-black text-blue-400">${avgCAC}</div>
          </div>
        </div>
      </div>

      {/* Campaign ROI Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <IconDollarSign className="w-5 h-5 text-emerald-400" />
          <span>Marketing Channel ROI & Attribution Performance</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Ad Campaign / Channel</th>
                <th className="py-3 px-3 text-center">Spend</th>
                <th className="py-3 px-3 text-center">Leads</th>
                <th className="py-3 px-3 text-center">Qualified</th>
                <th className="py-3 px-3 text-center">Admissions</th>
                <th className="py-3 px-3 text-center">CPL</th>
                <th className="py-3 px-3 text-center">CAC</th>
                <th className="py-3 px-3 text-right">Channel ROI %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {CAMPAIGN_ROI_DATA.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-900/50">
                  <td className="py-3.5 px-3 font-sans font-extrabold text-white">{camp.campaignName}</td>
                  <td className="py-3.5 px-3 text-center text-slate-300">${camp.spend}</td>
                  <td className="py-3.5 px-3 text-center text-slate-200">{camp.leadsCount}</td>
                  <td className="py-3.5 px-3 text-center text-slate-300">{camp.qualifiedLeads}</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400 font-bold">{camp.admissions}</td>
                  <td className="py-3.5 px-3 text-center text-amber-400">${camp.cpl}</td>
                  <td className="py-3.5 px-3 text-center text-blue-400">${camp.cac}</td>
                  <td className="py-3.5 px-3 text-right font-black text-emerald-400">{camp.roiPercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Rule-Based Automation & Drip Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Rule-Based Automation Engine */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-base text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <IconSparkles className="w-5 h-5 text-indigo-400" />
            <span>Rule-Based Automation Engine</span>
          </h3>

          <div className="space-y-3 text-xs">
            {rules.map((rule) => (
              <div key={rule.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-bold text-white text-xs">{rule.name}</div>
                  <div className="text-[11px] text-slate-400">Trigger: <span className="text-blue-400">{rule.trigger}</span></div>
                  <div className="text-[11px] text-slate-300">Action: {rule.action}</div>
                </div>

                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all ${
                    rule.enabled
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {rule.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Nurture Drip Sequences */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-base text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <IconSend className="w-5 h-5 text-purple-400" />
            <span>Drip Nurture Campaign Sequences</span>
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { day: 'Day 1', label: 'Instant Welcome Email & WhatsApp Syllabus PDF Link' },
              { day: 'Day 7', label: 'Live Masterclass Demo Session Invitation' },
              { day: 'Day 15', label: 'Student Placement & Alumni Salary Report' },
              { day: 'Day 30', label: 'Early Bird Scholarship Discount Code ($200 Off)' }
            ].map((drip) => (
              <div key={drip.day} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 font-extrabold font-mono text-xs border border-purple-500/30 shrink-0">
                  {drip.day}
                </span>
                <span className="text-slate-200 font-medium">{drip.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
