'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { IconAlertTriangle, IconX } from '@/components/ui/Icons';

export const DuplicateModal: React.FC = () => {
  const { activeDuplicateReview, closeDuplicateReview } = useLeadStore();

  if (!activeDuplicateReview) return null;

  const { primary, matchReason } = activeDuplicateReview;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-rose-500/40 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
        
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <IconAlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Duplicate Lead Detected</h3>
              <p className="text-xs text-rose-300">System prevented duplicate entry clutter</p>
            </div>
          </div>
          <button onClick={closeDuplicateReview} className="text-slate-400 hover:text-white">
            <IconX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 text-slate-300">
          <p>
            An enquiry matching phone/email already exists for student:
          </p>
          <div className="font-bold text-white text-sm bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            {primary.name}
          </div>
          <div className="text-[11px] text-slate-400 space-y-1 pt-1">
            <div>• Phone: <span className="text-slate-200">{primary.phone}</span></div>
            <div>• Course: <span className="text-slate-200">{primary.course}</span></div>
            <div>• Current Status: <span className="text-blue-400 font-semibold">{primary.status}</span></div>
            <div>• Match Type: <span className="text-rose-400 uppercase font-mono">{matchReason} match</span></div>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <button
            onClick={closeDuplicateReview}
            className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md"
          >
            Review in Dashboard
          </button>
          <button
            onClick={closeDuplicateReview}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-xl"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
};
