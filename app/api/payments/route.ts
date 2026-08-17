import { NextRequest, NextResponse } from 'next/server';
import { getServerLeadById, updateServerLead } from '@/lib/server-db';
import { PaymentRecord } from '@/lib/types';

// POST /api/payments - Tuition Fee Payment & Receipt Generator
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, amount, paymentMethod, notes } = body;

    if (!leadId || !amount) {
      return NextResponse.json(
        { success: false, error: 'Lead ID and Amount are required.' },
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

    const receiptNumber = `REC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      amount: Number(amount),
      date: new Date().toISOString(),
      paymentMethod: paymentMethod || 'Credit Card',
      status: 'Paid',
      receiptNumber,
      notes: notes || 'Tuition fee installment receipt generated.'
    };

    const updatedLead = updateServerLead(leadId, {
      payments: [newPayment, ...lead.payments],
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          type: 'Payment',
          author: 'Payment Gateway API',
          message: `Received payment of $${amount} via ${paymentMethod || 'Credit Card'}. Generated Official Receipt #${receiptNumber}.`,
          timestamp: new Date().toISOString()
        },
        ...lead.activityHistory
      ]
    });

    return NextResponse.json({
      success: true,
      data: updatedLead,
      payment: newPayment,
      receiptNumber
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
