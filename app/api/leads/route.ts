import { NextRequest, NextResponse } from 'next/server';
import { getServerLeads, createServerLead } from '@/lib/server-db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('searchQuery') || undefined;
    const status = searchParams.get('status') || undefined;
    const course = searchParams.get('course') || undefined;
    const source = searchParams.get('source') || undefined;
    const counsellorId = searchParams.get('counsellorId') || undefined;

    let leads = await getServerLeads();

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      leads = leads.filter((l) => l.name.toLowerCase().includes(q) || l.phone.includes(q) || l.email.toLowerCase().includes(q));
    }
    if (status && status !== 'All') leads = leads.filter((l) => l.status === status);
    if (course && course !== 'All') leads = leads.filter((l) => l.course === course);
    if (source && source !== 'All') leads = leads.filter((l) => l.source === source);
    if (counsellorId && counsellorId !== 'All') leads = leads.filter((l) => l.assignedCounsellorId === counsellorId);

    return NextResponse.json({ leads, count: leads.length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newLead = await createServerLead(body);
    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
