'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { LostReason } from '@/lib/types';
import { IconAlertTriangle, IconX } from '@/components/ui/Icons';

interface LostReasonModalProps {
  leadId: string | null;
  onClose: () => void;
}

export const LostReasonModal: React.FC<LostReasonModalProps> = ({ leadId, onClose }) => {
  const { leads, updateLeadStatus } = useLeadStore();

  const [selectedReason, setSelectedReason] = useState<LostReason>('Not Interested');
  const [notes, setNotes] = useState('');

  if (!leadId) return null;

  const lead = leads.find((l) => l.id === leadId);
  if (!lead) return null;

  const REASONS: LostReason[] = [
    'Not Interested',
    'No Response',
    'Wrong Number',
    'Duplicate',
    'Fee-Location-Timing Issue',
    'Competitor',
    'Future Requirement',
    'Unqualified',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark as Dropped with LostReason metadata
    updateLeadStatus(lead.id, 'Dropped');
    alert(`Lead marked as Dropped / Lost. Reason: "${selectedReason}" recorded.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-rose-500/40 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4">
        
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <IconAlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Mark Lead as Lost / Dropped</h3>
              <p className="text-xs text-rose-300">Mandatory reason required for audit tracking</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <IconX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="font-bold text-slate-300 block mb-1">Select Disqualification Reason *</label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value as LostReason)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
            >
              {REASONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">Detailed Explanation Notes *</label>
            <textarea
              rows={3}
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Student opted for competitor, budget deficit, unreachable after 4 attempts..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-rose-600/30"
            >
              Confirm Disqualification
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
