'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { UserRole } from '@/lib/types';
import { 
  IconSearch, 
  IconPlus, 
  IconAlertTriangle, 
  IconRefreshCw, 
  IconUsers,
  IconShieldCheck
} from '@/components/ui/Icons';

interface HeaderProps {
  onOpenAddModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAddModal, activeTab, setActiveTab }) => {
  const { 
    allLeadsUnfiltered,
    resetData,
    currentRole,
    setCurrentRole
  } = useLeadStore();

  const [showNotifications, setShowNotifications] = useState(false);

  const overdueCount = allLeadsUnfiltered.reduce((sum, l) => {
    return sum + l.scheduledCalls.filter((c) => c.isOverdue).length;
  }, 0);

  const escalatedCount = allLeadsUnfiltered.filter((l) => l.escalatedToManager || l.status === 'Counselling').length;
  const totalNotifications = overdueCount + escalatedCount;

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
      
      {/* Search Input */}
      <div className="flex items-center space-x-3 flex-1 max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <IconSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search leads, calls, documents (Cmd + K)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center space-x-3">
        
        {/* Role Switcher Selector */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase hidden sm:inline">Role:</span>
          <select
            value={currentRole}
            onChange={(e) => {
              const r = e.target.value as UserRole;
              setCurrentRole(r);
              if (r === 'Counsellor') setActiveTab('queue');
              else if (r === 'Team Leader') setActiveTab('queue');
              else if (r === 'Marketing Admin') setActiveTab('marketing');
              else if (r === 'Finance') setActiveTab('documents');
              else if (r === 'Super Admin') setActiveTab('audit');
            }}
            className="bg-transparent text-xs font-bold text-blue-400 focus:outline-none cursor-pointer"
          >
            <option value="Super Admin" className="bg-slate-900 text-slate-200">Super Admin</option>
            <option value="Team Leader" className="bg-slate-900 text-slate-200">Team Leader</option>
            <option value="Counsellor" className="bg-slate-900 text-slate-200">Counsellor</option>
            <option value="Marketing Admin" className="bg-slate-900 text-slate-200">Marketing Admin</option>
            <option value="Finance" className="bg-slate-900 text-slate-200">Admissions / Finance</option>
          </select>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-xl relative transition-all"
            title="Notifications"
          >
            <IconAlertTriangle className="w-4 h-4 text-amber-400" />
            {totalNotifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                {totalNotifications}
              </span>
            )}
          </button>

          {/* Notification Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-2 animate-fadeIn">
              <div className="font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>Alerts</span>
                <span className="text-[10px] text-rose-400 font-mono">{totalNotifications} Active</span>
              </div>

              {overdueCount > 0 && (
                <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-[11px]">
                  <strong>{overdueCount} Overdue Follow-up Calls</strong> in queue.
                </div>
              )}

              {escalatedCount > 0 && (
                <div className="p-2 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-[11px]">
                  <strong>{escalatedCount} Stalled Leads Escalated</strong> to Manager.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onOpenAddModal}
          className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-all"
        >
          <IconPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Lead</span>
        </button>

        {/* Reset Dataset */}
        <button
          onClick={() => {
            if (confirm('Reset dataset to initial state?')) resetData();
          }}
          className="p-2 text-slate-400 hover:text-slate-200 bg-slate-950 rounded-xl border border-slate-800 transition-colors"
          title="Reset Dataset"
        >
          <IconRefreshCw className="w-4 h-4" />
        </button>

      </div>

    </header>
  );
};
