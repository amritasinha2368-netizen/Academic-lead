import { NextRequest, NextResponse } from 'next/server';
import { getServerLeadById, updateServerLead, deleteServerLead } from '@/lib/server-db';

// GET /api/leads/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const lead = getServerLeadById(params.id);
  if (!lead) {
    return NextResponse.json(
      { success: false, error: 'Lead not found' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: lead });
}

// PATCH /api/leads/[id] - Update status, counsellor, convert
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = updateServerLead(params.id, body);
    
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/leads/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const deleted = deleteServerLead(params.id);
  if (!deleted) {
    return NextResponse.json(
      { success: false, error: 'Lead not found' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
}
