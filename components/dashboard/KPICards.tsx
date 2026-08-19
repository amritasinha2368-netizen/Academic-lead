'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { 
  IconUsers, 
  IconUserPlus, 
  IconPhone, 
  IconGraduationCap, 
  IconAlertTriangle 
} from '@/components/ui/Icons';

export const KPICards: React.FC = () => {
  const { leads } = useLeadStore();

  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const followUps = leads.filter((l) => l.status === 'Follow-up' || l.status === 'Contacted' || l.status === 'Counselling').length;
  const enrolled = leads.filter((l) => l.status === 'Enrolled').length;
  const highIntent = leads.filter((l) => (l.aiLeadScore || 0) >= 80).length;

  const conversionRate = total > 0 ? Math.round((enrolled / total) * 100) : 0;

  const CARDS = [
    {
      title: 'Total Enquiries',
      value: total,
      subtext: 'Active Lead Database',
      icon: IconUsers,
      accentColor: 'text-[#0066FF]',
      badgeBg: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',
    },
    {
      title: 'New Incoming',
      value: newLeads,
      subtext: 'Unassigned / New Queue',
      icon: IconUserPlus,
      accentColor: 'text-[#FF6B00]',
      badgeBg: 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400',
    },
    {
      title: 'High Intent Leads',
      value: highIntent,
      subtext: 'Score ≥ 80% 🔥',
      icon: IconPhone,
      accentColor: 'text-amber-600 dark:text-amber-400',
      badgeBg: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
    },
    {
      title: 'Students Enrolled',
      value: enrolled,
      subtext: `${conversionRate}% Admissions Conversion`,
      icon: IconGraduationCap,
      accentColor: 'text-emerald-600 dark:text-emerald-400',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {CARDS.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            className="ls-card p-5 flex items-center justify-between transition-all hover:shadow-md"
          >
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {card.title}
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono tracking-tight">
                {card.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                {card.subtext}
              </div>
            </div>

            <div className={`p-3 rounded-2xl ${card.badgeBg}`}>
              <IconComponent className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
