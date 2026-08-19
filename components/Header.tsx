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
  IconMoon
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

  const overdueCount = allLeadsUnfiltered.reduce((sum, l) => {
    return sum + l.scheduledCalls.filter((c) => c.isOverdue).length;
  }, 0);

  const escalatedCount = allLeadsUnfiltered.filter((l) => l.escalatedToManager || l.status === 'Counselling').length;
  const totalNotifications = overdueCount + escalatedCount;

  return (
    <header className="h-16 bg-white dark:bg-[#131B2E] border-b border-slate-200 dark:border-[#232D42] px-6 flex items-center justify-between shrink-0 transition-colors">
      
      {/* Search Bar */}
      <div className="flex items-center space-x-3 flex-1 max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <IconSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search student leads, calls, documents (Cmd + K)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#232D42] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors font-medium"
          />
        </div>
      </div>

      {/* Header Action Controls */}
      <div className="flex items-center space-x-3">
        
        {/* Light / Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="px-3 py-2 bg-slate-100 dark:bg-[#0B0F19] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-[#232D42] transition-all flex items-center space-x-2 text-xs font-bold"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? (
            <>
              <IconMoon className="w-4 h-4 text-indigo-600" />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <IconSun className="w-4 h-4 text-amber-400" />
              <span>Light Mode</span>
            </>
          )}
        </button>

        {/* Role Switcher */}
        <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#232D42] text-xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase hidden sm:inline">Role:</span>
          <select
            value={currentRole}
            onChange={(e) => {
              const r = e.target.value as UserRole;
              setCurrentRole(r);
              if (r === 'Counsellor') setActiveTab('dashboard');
              else if (r === 'Team Leader') setActiveTab('dashboard');
              else if (r === 'Marketing Admin') setActiveTab('marketing');
              else if (r === 'Finance') setActiveTab('documents');
              else if (r === 'Super Admin') setActiveTab('audit');
            }}
            className="bg-transparent text-xs font-extrabold text-indigo-600 dark:text-indigo-400 focus:outline-none cursor-pointer"
          >
            <option value="Super Admin" className="bg-white dark:bg-[#131B2E] text-slate-900 dark:text-white">Super Admin</option>
            <option value="Team Leader" className="bg-white dark:bg-[#131B2E] text-slate-900 dark:text-white">Team Leader</option>
            <option value="Counsellor" className="bg-white dark:bg-[#131B2E] text-slate-900 dark:text-white">Counsellor</option>
            <option value="Marketing Admin" className="bg-white dark:bg-[#131B2E] text-slate-900 dark:text-white">Marketing Admin</option>
            <option value="Finance" className="bg-white dark:bg-[#131B2E] text-slate-900 dark:text-white">Admissions / Finance</option>
          </select>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#232D42] rounded-xl relative transition-all"
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
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-[#232D42] rounded-2xl shadow-2xl p-4 z-50 text-xs space-y-3 animate-fadeIn">
              <div className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-[#232D42] pb-2 flex items-center justify-between">
                <span>Alerts & Notifications</span>
                <span className="text-[10px] text-rose-500 font-mono font-bold">{totalNotifications} Active</span>
              </div>

              {overdueCount > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs">
                  <strong>{overdueCount} Overdue Follow-up Calls</strong> scheduled.
                </div>
              )}

              {escalatedCount > 0 && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300 text-xs">
                  <strong>{escalatedCount} Stalled Leads Escalated</strong> to Manager.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onOpenAddModal}
          className="flex items-center space-x-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/20 transition-all"
        >
          <IconPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Lead</span>
        </button>

      </div>

    </header>
  );
};
