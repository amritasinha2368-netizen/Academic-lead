import { NextRequest, NextResponse } from 'next/server';
import { getServerLeadById, updateServerLead } from '@/lib/server-db';
import { CallRecording, CallDisposition } from '@/lib/types';

// POST /api/telephony/call-log - Record Telephony Call & AI Quality Score
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, durationSeconds, disposition, summaryNotes, counsellorName } = body;

    if (!leadId) {
      return NextResponse.json(
        { success: false, error: 'Target Lead ID is required.' },
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

    const mins = Math.floor((durationSeconds || 120) / 60);
    const secs = (durationSeconds || 120) % 60;
    const durText = `${mins}m ${secs}s`;

    // Simulated AI Speech-to-Text & QA Score Engine
    const aiScore = Math.floor(75 + Math.random() * 20); // 75 - 95 score
    const newRecording: CallRecording = {
      id: `rec-${Date.now()}`,
      url: 'https://actions.google.com/sounds/v1/ambiences/office_space.ogg',
      durationSeconds: durationSeconds || 180,
      timestamp: new Date().toISOString(),
      direction: 'Outbound',
      counsellorName: counsellorName || 'Sarah Jenkins',
      disposition: (disposition as CallDisposition) || 'Interested',
      transcriptionText: `Counsellor: Hello ${lead.name}! Following up regarding your inquiry for ${lead.course}. Student: Yes, I want to review the syllabus and batch schedule.`,
      aiSummary: summaryNotes || 'Outbound telecaller conversation regarding curriculum details and fee installment options.',
      aiObjections: ['Inquired about weekend vs evening batch schedule flexibilities'],
      aiNextBestAction: 'Send syllabus PDF and follow up within 48 hours.',
      aiCallScore: aiScore,
      scoreBreakdown: {
        greeting: 18,
        discovery: 18,
        explanation: 18,
        objectionHandling: 16,
        closing: 15
      }
    };

    const updated = updateServerLead(leadId, {
      status: lead.status === 'New' ? 'Contacted' : lead.status,
      callRecordings: [newRecording, ...lead.callRecordings],
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          type: 'Call Log',
          author: counsellorName || 'Softphone API',
          message: `Outbound call completed (${durText}). AI Quality Score: ${aiScore}/100. Notes: "${summaryNotes || 'Call logged successfully.'}"`,
          timestamp: new Date().toISOString()
        },
        ...lead.activityHistory
      ]
    });

    return NextResponse.json({
      success: true,
      data: updated,
      callRecording: newRecording
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
