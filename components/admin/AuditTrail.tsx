'use client';

import React from 'react';
import { AUDIT_TRAIL_LOGS } from '@/lib/mock-data';
import { IconShieldCheck, IconLock, IconCheckCircle } from '@/components/ui/Icons';

export const AuditTrail: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <IconShieldCheck className="w-3.5 h-3.5" />
            <span>Section 5: Super Admin Security & Compliance</span>
          </div>
          <h2 className="text-2xl font-black text-white">System Audit Trail & Access Control Log</h2>
          <p className="text-xs text-slate-400 mt-1">Immutable chronological audit log capturing user actions, timestamps, target leads, old values, and new values.</p>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <IconLock className="w-5 h-5 text-indigo-400" />
          <span>System Audit Trail Logs ({AUDIT_TRAIL_LOGS.length})</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">User & Role</th>
                <th className="py-3 px-3">Action Performed</th>
                <th className="py-3 px-3">Target Lead</th>
                <th className="py-3 px-3">Field Modified</th>
                <th className="py-3 px-3 text-rose-400">Old Value</th>
                <th className="py-3 px-3 text-emerald-400">New Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {AUDIT_TRAIL_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/50">
                  <td className="py-3 px-3 text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="py-3 px-3 font-sans">
                    <strong className="text-white block">{log.user}</strong>
                    <span className="text-[10px] text-blue-400">{log.role}</span>
                  </td>
                  <td className="py-3 px-3 text-indigo-300 font-sans font-bold">{log.action}</td>
                  <td className="py-3 px-3 text-slate-200 font-sans">{log.leadName}</td>
                  <td className="py-3 px-3 text-slate-400">{log.fieldChanged || 'N/A'}</td>
                  <td className="py-3 px-3 text-rose-400">{log.oldValue || '—'}</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">{log.newValue || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
