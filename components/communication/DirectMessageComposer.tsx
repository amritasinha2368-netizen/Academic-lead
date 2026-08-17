'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { IconSend, IconX, IconCheckCircle, IconMessageSquare, IconMail, IconPhone } from '@/components/ui/Icons';

export const DirectMessageComposer: React.FC = () => {
  const { activeMessageComposer, closeMessageComposer, addLeadNote } = useLeadStore();

  const [channel, setChannel] = useState<'whatsapp' | 'email' | 'sms'>(
    activeMessageComposer?.channel || 'whatsapp'
  );
  const [template, setTemplate] = useState('syllabus');
  const [messageText, setMessageText] = useState(
    'Hi! Here is the detailed syllabus PDF and batch schedule for the Data Science bootcamp at Aura Academy.'
  );
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!activeMessageComposer) return null;
  const { lead } = activeMessageComposer;

  const handleTemplateChange = (t: string) => {
    setTemplate(t);
    if (t === 'syllabus') {
      setMessageText(`Hi ${lead.name}! Here is the official curriculum guide and brochure for ${lead.course}: https://auraacademy.edu/brochure/${lead.id}`);
    } else if (t === 'fee_plan') {
      setMessageText(`Hi ${lead.name}! Your monthly fee installment plan breakdown for ${lead.course} is ready. Total fee: $${lead.totalCourseFee || 3200}.`);
    } else if (t === 'class_invite') {
      setMessageText(`Hi ${lead.name}! You are invited to join our upcoming live interactive class session this Saturday at 10 AM.`);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);

    addLeadNote(
      lead.id,
      `[1-on-1 ${channel.toUpperCase()} Message Dispatched] "${messageText}"`,
      'Counsellor'
    );

    setTimeout(() => {
      setSentSuccess(false);
      closeMessageComposer();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4">
        
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <IconSend className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Send Direct Message</h3>
              <p className="text-xs text-slate-400">Target Student: <span className="font-semibold text-slate-200">{lead.name}</span></p>
            </div>
          </div>
          <button onClick={closeMessageComposer} className="text-slate-400 hover:text-white">
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {sentSuccess ? (
          <div className="py-8 text-center space-y-3">
            <IconCheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="font-bold text-white text-lg">Message Dispatched!</h4>
            <p className="text-xs text-slate-400">Logged to {lead.name}'s interaction history.</p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4 text-xs">
            
            {/* Channel Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setChannel('whatsapp')}
                className={`py-2 rounded-xl font-bold flex items-center justify-center space-x-1.5 border transition-all ${
                  channel === 'whatsapp'
                    ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <IconMessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setChannel('email')}
                className={`py-2 rounded-xl font-bold flex items-center justify-center space-x-1.5 border transition-all ${
                  channel === 'email'
                    ? 'bg-blue-600/20 text-blue-300 border-blue-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <IconMail className="w-4 h-4" />
                <span>Email</span>
              </button>

              <button
                type="button"
                onClick={() => setChannel('sms')}
                className={`py-2 rounded-xl font-bold flex items-center justify-center space-x-1.5 border transition-all ${
                  channel === 'sms'
                    ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <IconPhone className="w-4 h-4" />
                <span>SMS</span>
              </button>
            </div>

            {/* Quick Templates */}
            <div>
              <label className="font-bold text-slate-300 block mb-1">Quick Message Template</label>
              <select
                value={template}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="syllabus">Brochure & Syllabus Guide Link</option>
                <option value="fee_plan">Fee Structure & Monthly Installments</option>
                <option value="class_invite">Live Demo Class Invitation</option>
              </select>
            </div>

            {/* Message Body */}
            <div>
              <label className="font-bold text-slate-300 block mb-1">Message Text</label>
              <textarea
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Submit Actions */}
            <div className="flex items-center space-x-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/20"
              >
                Send {channel.toUpperCase()} Message
              </button>
              <button
                type="button"
                onClick={closeMessageComposer}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl"
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
