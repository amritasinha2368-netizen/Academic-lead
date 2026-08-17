import { NextRequest, NextResponse } from 'next/server';
import { bulkUpdateServerStatus } from '@/lib/server-db';
import { LeadStatus } from '@/lib/types';

// POST /api/leads/bulk - Bulk update status / reassignment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids, status } = body;

    if (!Array.isArray(ids) || !status) {
      return NextResponse.json(
        { success: false, error: 'Array of lead IDs and target status are required.' },
        { status: 400 }
      );
    }

    const updatedCount = bulkUpdateServerStatus(ids, status as LeadStatus);

    return NextResponse.json({
      success: true,
      updatedCount,
      message: `Successfully updated ${updatedCount} leads to ${status}.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
