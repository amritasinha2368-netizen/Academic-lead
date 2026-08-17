import { NextRequest, NextResponse } from 'next/server';
import { getServerLeads, createServerLead } from '@/lib/server-db';

// GET /api/leads - Filter & List Leads
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('searchQuery') || undefined;
    const status = searchParams.get('status') || undefined;
    const course = searchParams.get('course') || undefined;
    const source = searchParams.get('source') || undefined;
    const counsellorId = searchParams.get('counsellorId') || undefined;

    const leads = getServerLeads({
      searchQuery,
      status,
      course,
      source,
      counsellorId,
    });

    return NextResponse.json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/leads - Submit Lead (Enquiry Form & Chatbot API)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Student Name and Phone number are required.' },
        { status: 400 }
      );
    }

    const { lead, duplicateResult } = createServerLead(body);

    return NextResponse.json({
      success: true,
      data: lead,
      duplicateCheck: duplicateResult,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
