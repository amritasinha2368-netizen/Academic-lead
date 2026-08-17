'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { IconSend, IconX, IconCheckCircle } from '@/components/ui/Icons';

interface BulkMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BulkMessageModal: React.FC<BulkMessageModalProps> = ({ isOpen, onClose }) => {
  const { selectedLeadIds, leads } = useLeadStore();
  const [channel, setChannel] = useState<'whatsapp' | 'email' | 'sms'>('whatsapp');
  const [template, setTemplate] = useState('batch_start');
  const [customMessage, setCustomMessage] = useState(
    'Hi {Student_Name}! Warm greetings from Aura Academy. Our next Data Science & Web Development batch starts on Monday. Limited seats available!'
  );
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const targetLeads = leads.filter((l) => selectedLeadIds.includes(l.id));

  const handleTemplateChange = (tmpl: string) => {
    setTemplate(tmpl);
    if (tmpl === 'batch_start') {
      setCustomMessage('Hi {Student_Name}! Warm greetings from Aura Academy. Our next batch starts on Monday. Limited seats available! Reply to confirm.');
    } else if (tmpl === 'fee_offer') {
      setCustomMessage('Hi {Student_Name}! Exclusive 15% Early-Bird scholarship available for your requested course enrollment. Contact your counsellor today.');
    } else if (tmpl === 'webinar') {
      setCustomMessage('Hi {Student_Name}! You are invited to our live AI & Web Development career masterclass this Saturday at 11 AM.');
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
        
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <IconSend className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Bulk Announcement Dispatch</h3>
              <p className="text-xs text-slate-400">Targeting {targetLeads.length} selected leads</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {sentSuccess ? (
          <div className="py-8 text-center space-y-3">
            <IconCheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="font-bold text-white text-lg">Broadcast Dispatched Successfully!</h4>
            <p className="text-xs text-slate-400">
              Sent broadcast message via {channel.toUpperCase()} to {targetLeads.length} leads.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4 text-xs">
            
            {/* Channel Selection */}
            <div>
              <label className="font-bold text-slate-300 block mb-1">Select Communication Channel</label>
              <div className="grid grid-cols-3 gap-2">
                {(['whatsapp', 'email', 'sms'] as const).map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setChannel(ch)}
                    className={`py-2 rounded-lg font-semibold border capitalize transition-all ${
                      channel === ch
                        ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Template Selection */}
            <div>
              <label className="font-bold text-slate-300 block mb-1">Select Message Template</label>
              <select
                value={template}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="batch_start">New Batch Starting Announcement</option>
                <option value="fee_offer">15% Early-Bird Fee Discount Offer</option>
                <option value="webinar">Live Career Masterclass Invitation</option>
              </select>
            </div>

            {/* Message Body */}
            <div>
              <label className="font-bold text-slate-300 block mb-1">Message Content</label>
              <textarea
                rows={4}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Dynamic variable <code className="text-emerald-400">{"{Student_Name}"}</code> will be auto-replaced.
              </p>
            </div>

            {/* Recipients Preview list snippet */}
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Recipients ({targetLeads.length}):</span>
              <span className="font-mono text-slate-200 truncate max-w-[200px]">
                {targetLeads.map((l) => l.name.split(' ')[0]).join(', ')}
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex items-center space-x-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20"
              >
                Send Broadcast Message
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
        )}

      </div>
    </div>
  );
};
