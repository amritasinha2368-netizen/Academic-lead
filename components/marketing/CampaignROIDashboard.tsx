'use client';

import React from 'react';
import { MOCK_CAMPAIGN_ROI, AUTOMATION_RULES } from '@/lib/mock-data';
import { IconTrendingUp, IconDollarSign, IconSparkles, IconCheckCircle } from '@/components/ui/Icons';

export const CampaignROIDashboard: React.FC = () => {
  const totalSpend = MOCK_CAMPAIGN_ROI.reduce((sum, c) => sum + c.spend, 0);
  const totalLeads = MOCK_CAMPAIGN_ROI.reduce((sum, c) => sum + c.leadsCount, 0);
  const totalAdmissions = MOCK_CAMPAIGN_ROI.reduce((sum, c) => sum + c.admissions, 0);
  const avgCpl = totalLeads > 0 ? Math.round(totalSpend / totalLeads) : 0;

  return (
    <div className="space-y-6 pb-8 text-slate-900">
      
      {/* Header Banner */}
      <div className="ls-card p-6 border-l-4 border-l-blue-600 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-blue-100 text-blue-800">
            <IconTrendingUp className="w-7 h-7" />
          </div>
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-300">
              Channel Attribution & Marketing Spend Analytics
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">Campaign ROI & Lead Attribution</h1>
            <p className="text-sm font-bold text-slate-600 mt-0.5">
              Real-time CPL (Cost Per Lead), CAC (Customer Acquisition Cost), and ROI % by marketing origin.
            </p>
          </div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="ls-card p-5 bg-white">
          <div className="text-xs font-black text-slate-500 uppercase">Total Campaign Spend</div>
          <div className="text-3xl font-black text-slate-900 mt-1 font-mono">${totalSpend.toLocaleString()}</div>
          <div className="text-xs font-bold text-slate-600 mt-1">Across 4 Active Campaigns</div>
        </div>
        <div className="ls-card p-5 bg-white">
          <div className="text-xs font-black text-slate-500 uppercase">Total Leads Captured</div>
          <div className="text-3xl font-black text-blue-700 mt-1 font-mono">{totalLeads}</div>
          <div className="text-xs font-bold text-slate-600 mt-1">Multi-Channel Attribution</div>
        </div>
        <div className="ls-card p-5 bg-white">
          <div className="text-xs font-black text-slate-500 uppercase">Average CPL (Cost/Lead)</div>
          <div className="text-3xl font-black text-emerald-700 mt-1 font-mono">${avgCpl}</div>
          <div className="text-xs font-bold text-slate-600 mt-1">Blended Cost Per Acquisition</div>
        </div>
        <div className="ls-card p-5 bg-white">
          <div className="text-xs font-black text-slate-500 uppercase">Admissions Converted</div>
          <div className="text-3xl font-black text-purple-700 mt-1 font-mono">{totalAdmissions}</div>
          <div className="text-xs font-bold text-slate-600 mt-1">Enrolled Students</div>
        </div>
      </div>

      {/* Campaign Attribution Table */}
      <div className="ls-card overflow-hidden bg-white">
        <div className="p-5 border-b border-slate-300 bg-slate-100 flex items-center justify-between">
          <h2 className="text-base font-black text-slate-900 flex items-center space-x-2">
            <IconDollarSign className="w-5 h-5 text-blue-600" />
            <span>Campaign ROI Breakdown ({MOCK_CAMPAIGN_ROI.length})</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-900">
            <thead className="bg-slate-200 text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-300">
              <tr>
                <th scope="col" className="py-4 px-5">Campaign Name</th>
                <th scope="col" className="py-4 px-5">Source Channel</th>
                <th scope="col" className="py-4 px-5">Ad Spend</th>
                <th scope="col" className="py-4 px-5">Leads Count</th>
                <th scope="col" className="py-4 px-5">Admissions</th>
                <th scope="col" className="py-4 px-5">CPL (Cost/Lead)</th>
                <th scope="col" className="py-4 px-5">CAC (Cost/Student)</th>
                <th scope="col" className="py-4 px-5">ROI %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {MOCK_CAMPAIGN_ROI.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-5 font-black text-slate-900 text-sm">{c.campaignName}</td>
                  <td className="py-4 px-5 font-bold text-blue-700 text-xs">{c.source}</td>
                  <td className="py-4 px-5 font-mono font-bold text-slate-900">${c.spend.toLocaleString()}</td>
                  <td className="py-4 px-5 font-bold text-slate-900">{c.leadsCount}</td>
                  <td className="py-4 px-5 font-bold text-emerald-700">{c.admissions}</td>
                  <td className="py-4 px-5 font-mono font-bold text-slate-900">${c.cpl}</td>
                  <td className="py-4 px-5 font-mono font-bold text-slate-900">${c.cac}</td>
                  <td className="py-4 px-5">
                    <span className="px-3 py-1 rounded-lg text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                      +{c.roiPercent}% ROI
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
