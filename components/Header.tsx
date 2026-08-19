'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { UserRole } from '@/lib/types';
import { 
  IconSearch, 
  IconPlus, 
  IconAlertTriangle, 
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
    currentRole,
    setCurrentRole,
  } = useLeadStore();

  const [showNotifications, setShowNotifications] = useState(false);

  const overdueCount = (allLeadsUnfiltered || []).reduce((sum, l) => {
    const calls = l.scheduledCalls || [];
    return sum + calls.filter((c) => c.isOverdue).length;
  }, 0);

  const escalatedCount = (allLeadsUnfiltered || []).filter((l) => l.escalatedToManager || l.status === 'Counselling').length;
  const totalNotifications = overdueCount + escalatedCount;

  return (
    <header className="h-22 bg-[#E0F2FE] border-b-2 border-[#BAE6FD] text-slate-900 px-8 flex items-center justify-between shrink-0 shadow-sm transition-all">
      
      {/* Brand & Global Search */}
      <div className="flex items-center space-x-8 flex-1 max-w-2xl">
        
        {/* Brand Logo Box with Contrast Accent Color */}
        <div className="flex items-center space-x-3.5 shrink-0">
          <div className="h-11 w-11 rounded-2xl bg-[#0F2537] text-white flex items-center justify-center font-black shadow-md shadow-slate-900/20">
            <IconShieldCheck className="w-6 h-6 text-[#FF6B00]" />
          </div>
          <div>
            <div className="font-black text-lg text-[#0F2537] tracking-tight leading-none">LeadSquared</div>
            <div className="text-xs text-blue-800 font-extrabold mt-1">Academy Admissions Suite</div>
          </div>
        </div>

        {/* Global Search Input */}
        <div className="relative w-full max-w-md hidden md:block">
          <IconSearch className="w-4 h-4 text-blue-600 absolute left-4 top-3" />
          <input
            type="text"
            placeholder="Search leads by name, phone, email, course..."
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-sky-300 rounded-xl text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-600 font-semibold shadow-sm"
          />
        </div>
      </div>

      {/* Header Action Controls */}
      <div className="flex items-center space-x-3.5">
        
        {/* Role Switcher */}
        <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-sky-300 text-xs shadow-sm">
          <span className="text-xs text-blue-900 font-extrabold uppercase hidden sm:inline">Role:</span>
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
            className="bg-transparent text-xs font-black text-blue-700 focus:outline-none cursor-pointer"
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
            className="p-2.5 text-blue-900 bg-white hover:bg-sky-50 border border-sky-300 rounded-xl relative transition-all shadow-sm"
            title="Notifications"
          >
            <IconAlertTriangle className="w-5 h-5 text-amber-500" />
            {totalNotifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center shadow-sm">
                {totalNotifications}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-sky-300 rounded-2xl shadow-xl p-4 z-50 text-xs space-y-3 animate-fadeIn text-slate-900">
              <div className="font-black border-b border-sky-200 pb-2 flex items-center justify-between">
                <span>System Notifications</span>
                <span className="text-xs text-rose-600 font-mono font-bold">{totalNotifications} Active</span>
              </div>

              {overdueCount > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                  <strong>{overdueCount} Overdue Follow-up Calls</strong> scheduled.
                </div>
              )}

              {escalatedCount > 0 && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold">
                  <strong>{escalatedCount} Stalled Leads Escalated</strong> to Manager.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Primary Action Button (Vibrant Contrast Blue) */}
        <button
          onClick={onOpenAddModal}
          className="flex items-center space-x-2 px-4.5 py-2.5 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/30 transition-all"
        >
          <IconPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Lead</span>
        </button>

      </div>

    </header>
  );
};
