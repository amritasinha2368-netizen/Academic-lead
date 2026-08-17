'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { IconCheckCircle, IconMail, IconPhone, IconMessageSquare, IconX, IconExternalLink } from '@/components/ui/Icons';

export const AutoAckModal: React.FC = () => {
  const { lastAckModal, closeAckModal, setActiveView } = useLeadStore();

  if (!lastAckModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-emerald-500/40 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5 relative">
        
        {/* Top ambient glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500" />

        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <IconCheckCircle className="w-7 h-7 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-lg text-white">Enquiry Received!</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Auto-Ack Sent
                </span>
              </div>
              <p className="text-xs text-slate-400">Confirmation dispatched to student & logged in portal</p>
            </div>
          </div>
          <button onClick={closeAckModal} className="text-slate-400 hover:text-white">
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Lead summary pill */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
          <div className="flex items-center justify-between text-slate-300 font-bold">
            <span>{lastAckModal.name}</span>
            <span className="text-blue-400 font-mono">{lastAckModal.phone}</span>
          </div>
          <div className="text-slate-400 flex items-center justify-between">
            <span>Course: <strong className="text-slate-200">{lastAckModal.course}</strong></span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
              Source: {lastAckModal.source}
            </span>
          </div>
        </div>

        {/* Dispatch Receipts Grid */}
        <div className="space-y-2 text-xs">
          <label className="font-bold text-slate-300 block uppercase tracking-wider text-[11px]">
            System Auto-Acknowledgement Receipts:
          </label>
          
          <div className="space-y-2">
            {/* Email Dispatch */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                  <IconMail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Welcome Email Dispatched</div>
                  <div className="text-[11px] text-slate-400">Brochure PDF & course syllabus sent to {lastAckModal.email}</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">DELIVERED</span>
            </div>

            {/* SMS Dispatch */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <IconPhone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">SMS Receipt Confirmation</div>
                  <div className="text-[11px] text-slate-400">Enquiry ID #{lastAckModal.id} sent via SMS gateway</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">DELIVERED</span>
            </div>

            {/* WhatsApp Dispatch */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <IconMessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">WhatsApp Welcome Bot</div>
                  <div className="text-[11px] text-slate-400">Automated WhatsApp message with counsellor intro sent</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">DELIVERED</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 pt-2">
          <button
            onClick={() => {
              closeAckModal();
              setActiveView('dashboard');
            }}
            className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center space-x-1.5"
          >
            <IconExternalLink className="w-4 h-4" />
            <span>Open Central Lead Dashboard</span>
          </button>
          <button
            onClick={closeAckModal}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
