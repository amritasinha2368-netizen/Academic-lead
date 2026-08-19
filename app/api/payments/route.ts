import { NextRequest, NextResponse } from 'next/server';
import { getServerLeadById, updateServerLead } from '@/lib/server-db';
import { PaymentRecord } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, amount, paymentMethod, notes } = body;

    if (!leadId || !amount) {
      return NextResponse.json({ error: 'Missing leadId or amount' }, { status: 400 });
    }

    const lead = await getServerLeadById(leadId);
    if (!lead) {
      return NextResponse.json({ error: 'Lead record not found' }, { status: 404 });
    }

    const receiptNumber = `REC-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      amount: Number(amount),
      date: new Date().toISOString(),
      paymentMethod: paymentMethod || 'Credit Card',
      status: 'Paid',
      receiptNumber,
      notes,
    };

    const updatedLead = await updateServerLead(leadId, {
      payments: [newPayment, ...(lead.payments || [])],
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          type: 'Payment',
          author: 'Billing Gateway API',
          message: `Received tuition fee payment of $${amount}. Receipt #${receiptNumber}.`,
          timestamp: new Date().toISOString(),
        },
        ...(lead.activityHistory || []),
      ],
    });

    return NextResponse.json({ success: true, lead: updatedLead, receiptNumber });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record payment' }, { status: 500 });
  }
}
