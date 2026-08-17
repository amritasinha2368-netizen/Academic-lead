'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { LeadStatus } from '@/lib/types';
import { 
  IconCheck, 
  IconUserPlus, 
  IconSend, 
  IconX, 
  IconFileSpreadsheet 
} from '@/components/ui/Icons';

interface BulkActionsBarProps {
  onOpenBulkMessage: () => void;
}

export const BulkActionsBar: React.FC<BulkActionsBarProps> = ({ onOpenBulkMessage }) => {
  const { 
    selectedLeadIds, 
    clearSelection, 
    bulkUpdateStatus, 
    bulkAssignCounsellor,
    counsellors,
    leads 
  } = useLeadStore();

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [counsellorDropdownOpen, setCounsellorDropdownOpen] = useState(false);

  if (selectedLeadIds.length === 0) return null;

  const STATUSES: LeadStatus[] = ['New', 'Contacted', 'Follow-up', 'Interested', 'Enrolled', 'Dropped'];

  const exportSelectedToCSV = () => {
    const selectedLeads = leads.filter((l) => selectedLeadIds.includes(l.id));
    if (selectedLeads.length === 0) return;

    const headers = ['ID', 'Name', 'Phone', 'Email', 'City', 'Course', 'Qualification', 'Status', 'Source', 'Counsellor', 'Date Added'];
    const rows = selectedLeads.map((l) => {
      const counsellor = counsellors.find((c) => c.id === l.assignedCounsellorId)?.name || 'Unassigned';
      return [
        l.id,
        `"${l.name}"`,
        `"${l.phone}"`,
        `"${l.email}"`,
        `"${l.city}"`,
        `"${l.course}"`,
        `"${l.qualification}"`,
        l.status,
        l.source,
        `"${counsellor}"`,
        new Date(l.dateAdded).toLocaleDateString(),
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Academy_Leads_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-3xl">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-blue-500/40 shadow-2xl shadow-blue-500/10 rounded-2xl p-3 px-4 flex flex-wrap items-center justify-between gap-3 text-white">
        
        {/* Selection Count Badge */}
        <div className="flex items-center space-x-2">
          <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            {selectedLeadIds.length}
          </div>
          <span className="text-xs sm:text-sm font-semibold text-slate-200">
            {selectedLeadIds.length === 1 ? '1 Lead Selected' : `${selectedLeadIds.length} Leads Selected`}
          </span>
        </div>

        {/* Bulk Action Buttons */}
        <div className="flex items-center space-x-2 flex-wrap">
          
          {/* Change Status Dropdown */}
          <div className="relative">
            <button
              onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-all"
            >
              <IconCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Change Status</span>
            </button>

            {statusDropdownOpen && (
              <div className="absolute bottom-full mb-2 left-0 w-44 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-1 z-50">
                {STATUSES.map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      bulkUpdateStatus(selectedLeadIds, st);
                      setStatusDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-blue-600/30 rounded-lg transition-colors"
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Assign Counsellor Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCounsellorDropdownOpen(!counsellorDropdownOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-all"
            >
              <IconUserPlus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Assign Staff</span>
            </button>

            {counsellorDropdownOpen && (
              <div className="absolute bottom-full mb-2 left-0 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-1 z-50">
                {counsellors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      bulkAssignCounsellor(selectedLeadIds, c.id);
                      setCounsellorDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-indigo-600/30 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-slate-400">{c.role}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bulk Announcement Message */}
          <button
            onClick={onOpenBulkMessage}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 rounded-lg border border-emerald-500/40 transition-all"
          >
            <IconSend className="w-3.5 h-3.5" />
            <span>Send Announcement</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={exportSelectedToCSV}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 rounded-lg border border-blue-500/40 transition-all"
            title="Export selected to CSV spreadsheet"
          >
            <IconFileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

        </div>

        {/* Close / Deselect button */}
        <button
          onClick={clearSelection}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Deselect all"
        >
          <IconX className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
