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
  IconKanban,
  IconAlertTriangle
} from '@/components/ui/Icons';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const NAV_ITEMS = [
    { id: 'leads', label: 'Leads & Enquiries', icon: IconUsers },
    { id: 'pipeline', label: 'Kanban Pipeline', icon: IconKanban },
    { id: 'manager', label: 'Manager QA & Escalations', icon: IconAlertTriangle },
    { id: 'telephony', label: 'Telephony & AI Calls', icon: IconMic },
    { id: 'marketing', label: 'Marketing ROI', icon: IconTrendingUp },
    { id: 'documents', label: 'Document Vault', icon: IconFileText },
    { id: 'audit', label: 'Audit Logs', icon: IconLock },
    { id: 'sandbox', label: 'Website Simulator', icon: IconSparkles },
  ];

  return (
    <aside className="w-60 bg-white border-r border-slate-300 flex flex-col justify-between shrink-0 hidden md:flex transition-colors">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200 flex items-center space-x-2.5">
        <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-sm">
          <IconShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="font-extrabold text-sm text-slate-900 tracking-tight">LeadSquared</div>
          <div className="text-[11px] text-slate-500 font-bold">Academy CRM</div>
        </div>
      </div>

      {/* Navigation Items (13px Font) */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Main Navigation
        </div>

        {NAV_ITEMS.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg font-bold text-xs transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Status */}
      <div className="p-4 border-t border-slate-200 text-xs text-slate-500 font-semibold">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-700 text-[11px]">v3.6 • System Online</span>
        </div>
      </div>

    </aside>
  );
};
