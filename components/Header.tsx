'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { UserRole } from '@/lib/types';
import { 
  IconSearch, 
  IconPlus, 
  IconAlertTriangle, 
  IconRefreshCw, 
  IconSun,
  IconMoon,
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
    setCurrentRole,
    theme,
    toggleTheme
  } = useLeadStore();

  const [showNotifications, setShowNotifications] = useState(false);

  const overdueCount = (allLeadsUnfiltered || []).reduce((sum, l) => {
    const calls = l.scheduledCalls || [];
    return sum + calls.filter((c) => c.isOverdue).length;
  }, 0);

  const escalatedCount = (allLeadsUnfiltered || []).filter((l) => l.escalatedToManager || l.status === 'Counselling').length;
  const totalNotifications = overdueCount + escalatedCount;

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-sm transition-colors">
      
      {/* LeadSquared Brand & Search */}
      <div className="flex items-center space-x-6 flex-1 max-w-2xl">
        <div className="flex items-center space-x-2.5 shrink-0">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-600/20">
            <IconShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-slate-900 tracking-tight leading-none">LeadSquared</div>
            <div className="text-[10px] text-slate-500 font-bold">Academy Portal</div>
          </div>
        </div>

        {/* Global Search Input */}
        <div className="relative w-full max-w-md hidden md:block">
          <IconSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search leads, phone numbers, email, student ID (Cmd + K)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors font-medium"
          />
        </div>
      </div>

      {/* Header Action Controls */}
      <div className="flex items-center space-x-3">
        
        {/* Light / Dark Toggle */}
        <button
          onClick={toggleTheme}
          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-all flex items-center space-x-2 text-xs font-bold"
          title="Toggle Color Mode"
        >
          <IconSun className="w-4 h-4 text-amber-500" />
          <span className="hidden sm:inline">Theme</span>
        </button>

        {/* Role Switcher */}
        <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs">
          <span className="text-[10px] text-slate-500 font-bold uppercase hidden sm:inline">Role:</span>
          <select
            value={currentRole}
            onChange={(e) => {
              const r = e.target.value as UserRole;
              setCurrentRole(r);
              if (r === 'Counsellor') setActiveTab('leads');
              else if (r === 'Team Leader') setActiveTab('leads');
              else if (r === 'Marketing Admin') setActiveTab('marketing');
              else if (r === 'Finance') setActiveTab('documents');
              else if (r === 'Super Admin') setActiveTab('audit');
            }}
            className="bg-transparent text-xs font-extrabold text-blue-600 focus:outline-none cursor-pointer"
          >
            <option value="Super Admin" className="bg-white text-slate-900">Super Admin</option>
            <option value="Team Leader" className="bg-white text-slate-900">Team Leader</option>
            <option value="Counsellor" className="bg-white text-slate-900">Counsellor</option>
            <option value="Marketing Admin" className="bg-white text-slate-900">Marketing Admin</option>
            <option value="Finance" className="bg-white text-slate-900">Admissions / Finance</option>
          </select>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-xl relative transition-all"
            title="Notifications"
          >
            <IconAlertTriangle className="w-4 h-4 text-amber-500" />
            {totalNotifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                {totalNotifications}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 text-xs space-y-3 animate-fadeIn text-slate-900">
              <div className="font-bold border-b border-slate-200 pb-2 flex items-center justify-between">
                <span>Alerts & Notifications</span>
                <span className="text-[10px] text-rose-600 font-mono font-bold">{totalNotifications} Active</span>
              </div>

              {overdueCount > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                  <strong>{overdueCount} Overdue Follow-up Calls</strong> scheduled.
                </div>
              )}

              {escalatedCount > 0 && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                  <strong>{escalatedCount} Stalled Leads Escalated</strong> to Manager.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onOpenAddModal}
          className="flex items-center space-x-2 px-4 py-2 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all"
        >
          <IconPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Lead</span>
        </button>

      </div>

    </header>
  );
};
