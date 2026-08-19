import { NextResponse } from 'next/server';
import { getServerLeads } from '@/lib/server-db';

export async function GET() {
  const leads = await getServerLeads();
  const totalLeads = leads.length;

  const funnel = {
    new: leads.filter((l) => l.status === 'New').length,
    contacted: leads.filter((l) => l.status === 'Contacted').length,
    interested: leads.filter((l) => l.status === 'Interested').length,
    counselling: leads.filter((l) => l.status === 'Counselling').length,
    enrolled: leads.filter((l) => l.status === 'Enrolled').length,
    dropped: leads.filter((l) => l.status === 'Dropped').length,
  };

  return NextResponse.json({
    totalLeads,
    funnel,
    conversionRate: totalLeads > 0 ? Math.round((funnel.enrolled / totalLeads) * 100) : 0,
  });
}
