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
    { id: 'sandbox', label: 'Website Form Sandbox', icon: IconSparkles },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 hidden md:flex transition-colors">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-200 flex items-center space-x-3">
        <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-600/20">
          <IconShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <div className="font-extrabold text-base text-slate-900 tracking-tight">LeadSquared</div>
          <div className="text-[11px] text-slate-500 font-bold">Academy CRM</div>
        </div>
      </div>

      {/* Navigation List - Separate Pages */}
      <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
          CRM Navigation Pages
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
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Status */}
      <div className="p-5 border-t border-slate-200 text-xs text-slate-500 font-semibold">
        <div className="flex items-center space-x-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-700 text-[11px]">System Online • v3.6</span>
        </div>
      </div>

    </aside>
  );
};
