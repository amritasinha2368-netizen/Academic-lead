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
  const duplicates = leads.filter((l) => l.isDuplicate).length;

  const conversionRate = total > 0 ? Math.round((enrolled / total) * 100) : 0;

  const CARDS = [
    {
      title: 'Total Enquiries',
      value: total,
      subtext: 'Active Lead Pool',
      icon: IconUsers,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-500/10',
    },
    {
      title: 'New Incoming',
      value: newLeads,
      subtext: `${newLeads} Action Required`,
      icon: IconUserPlus,
      color: 'text-sky-600 dark:text-sky-400',
      bgColor: 'bg-sky-50 dark:bg-sky-500/10',
    },
    {
      title: 'Active Follow-Ups',
      value: followUps,
      subtext: 'In Pipeline',
      icon: IconPhone,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-500/10',
    },
    {
      title: 'Students Enrolled',
      value: enrolled,
      subtext: `${conversionRate}% Conversion Rate`,
      icon: IconGraduationCap,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      title: 'Duplicates Flagged',
      value: duplicates,
      subtext: `${duplicates} Reviewed`,
      icon: IconAlertTriangle,
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {CARDS.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            className="clean-surface p-4 flex flex-col justify-between space-y-3 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{card.title}</span>
              <div className={`p-2 rounded-xl ${card.bgColor} ${card.color}`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">{card.value}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{card.subtext}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
