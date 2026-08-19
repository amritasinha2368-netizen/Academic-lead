import { NextRequest, NextResponse } from 'next/server';
import { getServerLeadById, updateServerLead } from '@/lib/server-db';
import { CallRecording, CallDisposition } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, durationSeconds, summaryNotes, disposition, counsellorName } = body;

    if (!leadId) {
      return NextResponse.json({ error: 'Missing leadId' }, { status: 400 });
    }

    const lead = await getServerLeadById(leadId);
    if (!lead) {
      return NextResponse.json({ error: 'Lead record not found' }, { status: 404 });
    }

    const duration = durationSeconds || 120;
    const mins = Math.floor(duration / 60);
    const secs = duration % 60;
    const durText = `${mins}m ${secs}s`;

    const newCallLog: CallRecording = {
      id: `rec-${Date.now()}`,
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      durationSeconds: duration,
      timestamp: new Date().toISOString(),
      direction: 'Outbound',
      counsellorName: counsellorName || 'Sarah Jenkins',
      disposition: (disposition as CallDisposition) || 'Interested',
      transcriptionText: `Counsellor: Hello ${lead.name}! Following up regarding your 12th college application for ${lead.course}. Student: Yes, I want to review the campus prospectus and hostel fee structure.`,
      aiSummary: summaryNotes || 'Outbound telecaller conversation regarding 12th board eligibility and campus visit booking.',
      aiObjections: ['Inquired about 12th board percentage cutoff criteria'],
      aiNextBestAction: 'Send 12th college prospectus PDF and schedule campus tour.',
      aiCallScore: 92,
      scoreBreakdown: {
        greeting: 18,
        discovery: 19,
        explanation: 19,
        objectionHandling: 18,
        closing: 18,
      },
    };

    const updatedLead = await updateServerLead(leadId, {
      callRecordings: [newCallLog, ...(lead.callRecordings || [])],
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          type: 'Call Log',
          author: counsellorName || 'Admissions Officer',
          message: `Outbound call completed (${durText}). Remarks: "${summaryNotes || 'No notes entered.'}"`,
          timestamp: new Date().toISOString(),
        },
        ...(lead.activityHistory || []),
      ],
    });

    return NextResponse.json({ success: true, lead: updatedLead, callLog: newCallLog });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record call log' }, { status: 500 });
  }
}
