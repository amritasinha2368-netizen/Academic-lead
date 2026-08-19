import { NextRequest, NextResponse } from 'next/server';
import { getServerLeadById, updateServerLead } from '@/lib/server-db';
import { DocumentStatus } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, documentId, status, notes } = body;

    if (!leadId || !documentId || !status) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const lead = await getServerLeadById(leadId);
    if (!lead) {
      return NextResponse.json({ error: 'Lead record not found' }, { status: 404 });
    }

    const updatedDocuments = (lead.documents || []).map((doc) => {
      if (doc.id === documentId) {
        return {
          ...doc,
          status: status as DocumentStatus,
        };
      }
      return doc;
    });

    const updatedLead = await updateServerLead(leadId, {
      documents: updatedDocuments,
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          type: 'Document Verification',
          author: 'Admissions Document API',
          message: `Document status updated to ${status}. Notes: "${notes || 'Verification status changed.'}"`,
          timestamp: new Date().toISOString(),
        },
        ...(lead.activityHistory || []),
      ],
    });

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to verify document' }, { status: 500 });
  }
}
