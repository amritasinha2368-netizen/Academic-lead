import { NextResponse } from 'next/server';
import { getServerLeads } from '@/lib/server-db';

// GET /api/analytics - Server calculated metrics
export async function GET() {
  const leads = getServerLeads();
  const totalLeads = leads.length;

  const funnel = {
    new: leads.filter((l) => l.status === 'New').length,
    contacted: leads.filter((l) => l.status === 'Contacted').length,
    followUp: leads.filter((l) => l.status === 'Follow-up').length,
    interested: leads.filter((l) => l.status === 'Interested').length,
    enrolled: leads.filter((l) => l.status === 'Enrolled').length,
    dropped: leads.filter((l) => l.status === 'Dropped').length,
  };

  const conversionRate = totalLeads > 0 ? Math.round((funnel.enrolled / totalLeads) * 100) : 0;

  // Source ROI Map
  const sourcesMap = leads.reduce((acc, lead) => {
    const src = lead.source;
    if (!acc[src]) {
      acc[src] = { total: 0, enrolled: 0 };
    }
    acc[src].total += 1;
    if (lead.status === 'Enrolled') acc[src].enrolled += 1;
    return acc;
  }, {} as Record<string, { total: number; enrolled: number }>);

  return NextResponse.json({
    success: true,
    totalLeads,
    conversionRate,
    funnel,
    sourcesMap,
  });
}
