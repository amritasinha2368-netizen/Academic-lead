'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { MOCK_AUDIT_TRAIL } from '@/lib/mock-data';
import { formatDateString } from '@/lib/utils';
import { IconLock, IconShieldCheck, IconUserPlus } from '@/components/ui/Icons';

export const AuditTrail: React.FC = () => {
  return (
    <div className="space-y-6 pb-8 text-slate-900">
      
      {/* Header Banner */}
      <div className="ls-card p-6 border-l-4 border-l-blue-600 bg-white flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-blue-100 text-blue-800">
            <IconLock className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-300">
                Security & Compliance Audit Log
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1">System Audit Trail</h1>
            <p className="text-sm font-bold text-slate-600 mt-0.5">
              Immutable chronological log capturing user actions, timestamps, target leads, old values, and new values.
            </p>
          </div>
        </div>
      </div>

      {/* Audit Log Datatable */}
      <div className="ls-card overflow-hidden bg-white">
        <div className="p-5 border-b border-slate-300 bg-slate-100 flex items-center justify-between">
          <h2 className="text-base font-black text-slate-900 flex items-center space-x-2">
            <IconShieldCheck className="w-5 h-5 text-blue-600" />
            <span>Audit Trail Entries ({MOCK_AUDIT_TRAIL.length})</span>
          </h2>
          <span className="text-xs font-mono font-black px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300">
            LOG ENCRYPTION ACTIVE
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-900">
            <thead className="bg-slate-200 text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-300">
              <tr>
                <th scope="col" className="py-4 px-5">Timestamp</th>
                <th scope="col" className="py-4 px-5">User & Role</th>
                <th scope="col" className="py-4 px-5">Action Performed</th>
                <th scope="col" className="py-4 px-5">Target Lead</th>
                <th scope="col" className="py-4 px-5">Field Modified</th>
                <th scope="col" className="py-4 px-5">Old Value</th>
                <th scope="col" className="py-4 px-5">New Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {MOCK_AUDIT_TRAIL.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-5 text-xs text-slate-800 font-mono font-bold">
                    {formatDateString(entry.timestamp)}
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-extrabold text-slate-900 text-sm">{entry.user}</div>
                    <div className="text-xs font-black text-blue-700">{entry.role}</div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-blue-100 text-blue-900 border border-blue-300">
                      {entry.action}
                    </span>
                  </td>
                  <td className="py-4 px-5 font-extrabold text-slate-900 text-sm">
                    {entry.leadName}
                  </td>
                  <td className="py-4 px-5 text-xs text-slate-800 font-bold">
                    {entry.fieldChanged || 'N/A'}
                  </td>
                  <td className="py-4 px-5 text-xs text-rose-800 font-mono font-extrabold bg-rose-50 px-2 py-1 rounded">
                    {entry.oldValue || '—'}
                  </td>
                  <td className="py-4 px-5 text-xs text-emerald-800 font-mono font-extrabold bg-emerald-50 px-2 py-1 rounded">
                    {entry.newValue || '—'}
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
