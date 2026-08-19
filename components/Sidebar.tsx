'use client';

import React from 'react';
import { 
  IconShieldCheck, 
  IconUsers, 
  IconMic, 
  IconTrendingUp, 
  IconFileText, 
  IconLock, 
  IconSparkles 
} from '@/components/ui/Icons';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const NAV_ITEMS = [
    { id: 'queue', label: 'Leads & Pipeline', icon: IconUsers },
    { id: 'telephony', label: 'Telephony & AI Calls', icon: IconMic },
    { id: 'marketing', label: 'Marketing & ROI', icon: IconTrendingUp },
    { id: 'documents', label: 'Document Vault', icon: IconFileText },
    { id: 'audit', label: 'Audit Logs', icon: IconLock },
    { id: 'sandbox', label: 'Website Capture', icon: IconSparkles },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex transition-colors">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3">
        <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/20">
          <IconShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">Aura CRM</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Admissions Suite</div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Main Navigation
        </div>

        {NAV_ITEMS.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Status */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">System Online • v3.2</span>
        </div>
      </div>

    </aside>
  );
};
