'use client';

import React from 'react';
import { 
  IconShieldCheck, 
  IconUsers, 
  IconMic, 
  IconTrendingUp, 
  IconFileText, 
  IconLock, 
  IconSparkles,
  IconKanban
} from '@/components/ui/Icons';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: IconUsers },
    { id: 'pipeline', label: 'Kanban Pipeline', icon: IconKanban },
    { id: 'telephony', label: 'Telephony & AI Calls', icon: IconMic },
    { id: 'marketing', label: 'Marketing ROI', icon: IconTrendingUp },
    { id: 'documents', label: 'Document Vault', icon: IconFileText },
    { id: 'audit', label: 'Audit Trail', icon: IconLock },
    { id: 'sandbox', label: 'Website Simulator', icon: IconSparkles },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#131B2E] border-r border-slate-200 dark:border-[#232D42] flex flex-col justify-between shrink-0 hidden md:flex transition-colors">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-200 dark:border-[#232D42] flex items-center space-x-3">
        <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-md shadow-indigo-600/20">
          <IconShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <div className="font-black text-base text-slate-900 dark:text-white tracking-tight">Aura CRM</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Admissions Portal</div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Main Views
        </div>

        {NAV_ITEMS.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Status */}
      <div className="p-5 border-t border-slate-200 dark:border-[#232D42] text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">v3.5 • System Active</span>
        </div>
      </div>

    </aside>
  );
};
