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
    <header className="h-16 bg-[#0F2537] text-white px-6 flex items-center justify-between shrink-0 shadow-md">
      
      {/* LeadSquared Brand & Search */}
      <div className="flex items-center space-x-6 flex-1 max-w-2xl">
        <div className="flex items-center space-x-2.5 shrink-0">
          <div className="h-9 w-9 rounded-xl bg-[#FF6B00] flex items-center justify-center text-white font-black shadow-md">
            <IconShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-white tracking-tight leading-none">LeadSquared</div>
            <div className="text-[10px] text-slate-300 font-medium">Academy Admissions Suite</div>
          </div>
        </div>

        {/* LeadSquared Global Search Input */}
        <div className="relative w-full max-w-md hidden md:block">
          <IconSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Quick Search Leads, Phone, Email, Student ID (Cmd + K)..."
            className="w-full pl-10 pr-4 py-2 bg-[#162D42] border border-[#233F58] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FF6B00] transition-colors"
          />
        </div>
      </div>

      {/* Header Action Controls */}
      <div className="flex items-center space-x-3">
        
        {/* Light / Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="px-3 py-2 bg-[#162D42] hover:bg-[#1C3852] text-slate-200 rounded-xl border border-[#233F58] transition-all flex items-center space-x-2 text-xs font-bold"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? (
            <>
              <IconMoon className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Dark Mode</span>
            </>
          ) : (
            <>
              <IconSun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Light Mode</span>
            </>
          )}
        </button>

        {/* Role Switcher */}
        <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#162D42] border border-[#233F58] text-xs">
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
            className="bg-transparent text-xs font-bold text-[#FF6B00] focus:outline-none cursor-pointer"
          >
            <option value="Super Admin" className="bg-[#0F2537] text-white">Super Admin</option>
            <option value="Team Leader" className="bg-[#0F2537] text-white">Team Leader</option>
            <option value="Counsellor" className="bg-[#0F2537] text-white">Counsellor</option>
            <option value="Marketing Admin" className="bg-[#0F2537] text-white">Marketing Admin</option>
            <option value="Finance" className="bg-[#0F2537] text-white">Admissions / Finance</option>
          </select>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-300 hover:bg-[#162D42] border border-[#233F58] rounded-xl relative transition-all"
            title="Notifications"
          >
            <IconAlertTriangle className="w-4 h-4 text-amber-400" />
            {totalNotifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#FF6B00] text-white text-[9px] font-bold flex items-center justify-center">
                {totalNotifications}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-[#0F2537] border border-[#233F58] rounded-2xl shadow-2xl p-4 z-50 text-xs space-y-3 animate-fadeIn text-white">
              <div className="font-bold border-b border-[#233F58] pb-2 flex items-center justify-between">
                <span>Notifications</span>
                <span className="text-[10px] text-[#FF6B00] font-mono font-bold">{totalNotifications} Active</span>
              </div>

              {overdueCount > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                  <strong>{overdueCount} Overdue Follow-up Calls</strong> scheduled.
                </div>
              )}

              {escalatedCount > 0 && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  <strong>{escalatedCount} Stalled Leads Escalated</strong> to Manager.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Primary Action Button (LeadSquared Coral Orange) */}
        <button
          onClick={onOpenAddModal}
          className="flex items-center space-x-2 px-4 py-2 text-xs font-extrabold text-white bg-[#FF6B00] hover:bg-[#e05e00] rounded-xl shadow-md shadow-orange-900/20 transition-all"
        >
          <IconPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Create Lead</span>
        </button>

      </div>

    </header>
  );
};
