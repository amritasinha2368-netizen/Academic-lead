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
    <header className="h-15 bg-[#0F172A] text-white px-5 flex items-center justify-between shrink-0 shadow-md">
      
      {/* Brand & Global Search */}
      <div className="flex items-center space-x-5 flex-1 max-w-xl">
        <div className="flex items-center space-x-2.5 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-sm">
            <IconShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-white tracking-tight leading-none">LeadSquared</div>
            <div className="text-[10px] text-slate-300 font-bold mt-0.5">Academy CRM</div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full max-w-sm hidden md:block">
          <IconSearch className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search leads, phone, email, course..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#1E293B] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
          />
        </div>
      </div>

      {/* Header Action Controls */}
      <div className="flex items-center space-x-2.5">
        
        {/* Role Switcher */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1E293B] border border-slate-700 text-xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase hidden sm:inline">Role:</span>
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
            className="bg-transparent text-xs font-bold text-blue-400 focus:outline-none cursor-pointer"
          >
            <option value="Super Admin" className="bg-[#0F172A] text-white">Super Admin</option>
            <option value="Team Leader" className="bg-[#0F172A] text-white">Team Leader</option>
            <option value="Counsellor" className="bg-[#0F172A] text-white">Counsellor</option>
            <option value="Marketing Admin" className="bg-[#0F172A] text-white">Marketing Admin</option>
            <option value="Finance" className="bg-[#0F172A] text-white">Admissions / Finance</option>
          </select>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-300 hover:bg-[#1E293B] border border-slate-700 rounded-lg relative transition-all"
            title="Notifications"
          >
            <IconAlertTriangle className="w-4 h-4 text-amber-400" />
            {totalNotifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                {totalNotifications}
              </span>
            )}
          </button>

          {/* Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-[#0F172A] border border-slate-700 rounded-xl shadow-xl p-3 z-50 text-xs space-y-2.5 animate-fadeIn text-white">
              <div className="font-bold border-b border-slate-700 pb-2 flex items-center justify-between">
                <span>System Notifications</span>
                <span className="text-[10px] text-rose-400 font-mono font-bold">{totalNotifications} Active</span>
              </div>

              {overdueCount > 0 && (
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                  <strong>{overdueCount} Overdue Follow-up Calls</strong> scheduled.
                </div>
              )}

              {escalatedCount > 0 && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  <strong>{escalatedCount} Stalled Leads Escalated</strong> to Manager.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onOpenAddModal}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all"
        >
          <IconPlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Lead</span>
        </button>

      </div>

    </header>
  );
};
