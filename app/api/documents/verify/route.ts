import { NextRequest, NextResponse } from 'next/server';
import { getServerLeadById, updateServerLead } from '@/lib/server-db';
import { DocumentStatus } from '@/lib/types';

// POST /api/documents/verify - Document Verification & Audit Log
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, documentId, status, notes } = body;

    if (!leadId || !documentId || !status) {
      return NextResponse.json(
        { success: false, error: 'Lead ID, Document ID and Status are required.' },
        { status: 400 }
      );
    }

    const lead = getServerLeadById(leadId);
    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    const updatedDocuments = lead.documents.map((doc) => {
      if (doc.id === documentId) {
        return {
          ...doc,
          status: status as DocumentStatus,
          verifierNotes: notes || 'Verified via Admissions Verification API'
        };
      }
      return doc;
    });

    const updatedLead = updateServerLead(leadId, {
      documents: updatedDocuments,
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          type: 'Document Verification',
          author: 'Admissions Document API',
          message: `Document status updated to ${status}. Notes: "${notes || 'Verification status changed.'}"`,
          timestamp: new Date().toISOString()
        },
        ...lead.activityHistory
      ]
    });

    return NextResponse.json({
      success: true,
      data: updatedLead
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
