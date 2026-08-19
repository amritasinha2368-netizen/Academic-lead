'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { 
  IconUsers, 
  IconUserPlus, 
  IconPhone, 
  IconGraduationCap 
} from '@/components/ui/Icons';

export const KPICards: React.FC = () => {
  const { leads } = useLeadStore();

  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const enrolled = leads.filter((l) => l.status === 'Enrolled').length;
  const highIntent = leads.filter((l) => (l.aiLeadScore || 0) >= 80).length;

  const conversionRate = total > 0 ? Math.round((enrolled / total) * 100) : 0;

  const CARDS = [
    {
      title: 'Total Enquiries',
      value: total,
      subtext: 'Active Lead Database',
      icon: IconUsers,
      accentColor: 'text-blue-600',
      badgeBg: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'New Incoming Queue',
      value: newLeads,
      subtext: 'Action Required',
      icon: IconUserPlus,
      accentColor: 'text-orange-600',
      badgeBg: 'bg-orange-100 text-orange-800',
    },
    {
      title: 'High Intent Leads',
      value: highIntent,
      subtext: 'Score ≥ 80% 🔥',
      icon: IconPhone,
      accentColor: 'text-amber-600',
      badgeBg: 'bg-amber-100 text-amber-800',
    },
    {
      title: 'Students Enrolled',
      value: enrolled,
      subtext: `${conversionRate}% Admission Rate`,
      icon: IconGraduationCap,
      accentColor: 'text-emerald-600',
      badgeBg: 'bg-emerald-100 text-emerald-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {CARDS.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            className="ls-card p-4 flex items-center justify-between transition-all hover:shadow-md"
          >
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {card.title}
              </span>
              <div className="text-2xl font-bold text-slate-900 mt-0.5 font-mono tracking-tight">
                {card.value}
              </div>
              <div className="text-xs text-slate-600 mt-0.5 font-medium">
                {card.subtext}
              </div>
            </div>

            <div className={`p-3 rounded-xl ${card.badgeBg}`}>
              <IconComponent className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
