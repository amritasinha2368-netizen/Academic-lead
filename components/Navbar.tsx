'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { UserRole } from '@/lib/types';
import { 
  IconShieldCheck, 
  IconUsers, 
  IconMic, 
  IconTrendingUp, 
  IconFileText, 
  IconLock, 
  IconSparkles, 
  IconPlus, 
  IconAlertTriangle,
  IconRefreshCw
} from '@/components/ui/Icons';

interface NavbarProps {
  onOpenAddModal: () => void;
  activeRoleTab: string;
  setActiveRoleTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAddModal, activeRoleTab, setActiveRoleTab }) => {
  const { 
    allLeadsUnfiltered,
    resetData,
    currentRole,
    setCurrentRole
  } = useLeadStore();

  const [showNotifications, setShowNotifications] = useState(false);

  // Overdue and escalation counts
  const overdueCount = allLeadsUnfiltered.reduce((sum, l) => {
    return sum + l.scheduledCalls.filter((c) => c.isOverdue).length;
  }, 0);

  const escalatedCount = allLeadsUnfiltered.filter((l) => l.escalatedToManager || l.status === 'Counselling').length;
  const totalNotifications = overdueCount + escalatedCount;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <IconShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base text-white tracking-tight">Aura CRM</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  v3.0
                </span>
              </div>
            </div>
          </div>

          {/* Clean Segmented Navigation Tabs */}
          <nav className="hidden lg:flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveRoleTab('queue')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeRoleTab === 'queue'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconUsers className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveRoleTab('telephony')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeRoleTab === 'telephony'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconMic className="w-3.5 h-3.5" />
              <span>Telephony & AI</span>
            </button>

            <button
              onClick={() => setActiveRoleTab('marketing')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeRoleTab === 'marketing'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconTrendingUp className="w-3.5 h-3.5" />
              <span>Marketing ROI</span>
            </button>

            <button
              onClick={() => setActiveRoleTab('documents')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeRoleTab === 'documents'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconFileText className="w-3.5 h-3.5" />
              <span>Documents</span>
            </button>

            <button
              onClick={() => setActiveRoleTab('audit')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeRoleTab === 'audit'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconLock className="w-3.5 h-3.5" />
              <span>Audit Log</span>
            </button>

            <button
              onClick={() => setActiveRoleTab('sandbox')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeRoleTab === 'sandbox'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconSparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Capture Sandbox</span>
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-2.5">
            
            {/* Sleek Role Switcher */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-[10px] text-slate-500 font-bold uppercase hidden sm:inline">Role:</span>
              <select
                value={currentRole}
                onChange={(e) => {
                  const r = e.target.value as UserRole;
                  setCurrentRole(r);
                  if (r === 'Counsellor') setActiveRoleTab('queue');
                  else if (r === 'Team Leader') setActiveRoleTab('queue');
                  else if (r === 'Marketing Admin') setActiveRoleTab('marketing');
                  else if (r === 'Finance') setActiveRoleTab('documents');
                  else if (r === 'Super Admin') setActiveRoleTab('audit');
                }}
                className="bg-transparent text-xs font-bold text-indigo-400 focus:outline-none cursor-pointer"
              >
                <option value="Super Admin" className="bg-slate-900 text-slate-200">Super Admin</option>
                <option value="Team Leader" className="bg-slate-900 text-slate-200">Team Leader</option>
                <option value="Counsellor" className="bg-slate-900 text-slate-200">Counsellor</option>
                <option value="Marketing Admin" className="bg-slate-900 text-slate-200">Marketing Admin</option>
                <option value="Finance" className="bg-slate-900 text-slate-200">Admissions / Finance</option>
              </select>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl relative transition-all"
                title="Notifications"
              >
                <IconAlertTriangle className="w-4 h-4 text-amber-400" />
                {totalNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center">
                    {totalNotifications}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-2 animate-fadeIn">
                  <div className="font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
                    <span>Notifications</span>
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

            {/* Add Lead Primary Button */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center space-x-1 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm transition-all"
            >
              <IconPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Lead</span>
            </button>

            {/* Reset Mock Data */}
            <button
              onClick={() => {
                if (confirm('Reset dataset to initial clean state?')) resetData();
              }}
              className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-900 rounded-xl border border-slate-800 transition-colors"
              title="Reset Dataset"
            >
              <IconRefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Mobile Nav Tabs */}
        <div className="flex lg:hidden pb-3 pt-1 space-x-1.5 overflow-x-auto text-[11px]">
          {(['queue', 'telephony', 'marketing', 'documents', 'audit', 'sandbox'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveRoleTab(t)}
              className={`px-3 py-1 rounded-lg font-semibold capitalize whitespace-nowrap ${
                activeRoleTab === t ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

      </div>
    </header>
  );
};
