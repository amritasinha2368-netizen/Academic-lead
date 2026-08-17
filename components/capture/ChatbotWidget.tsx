'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { COURSES } from '@/lib/mock-data';
import { IconSparkles, IconX, IconSend, IconMessageSquare, IconCheckCircle } from '@/components/ui/Icons';

export const ChatbotWidget: React.FC = () => {
  const { addLeadFromWebsite, setActiveView } = useLeadStore();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [botData, setBotData] = useState({
    course: COURSES[0],
    name: '',
    phone: '',
    email: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2 && botData.name.trim()) setStep(3);
    else if (step === 3 && botData.phone.trim()) {
      // Complete bot submission
      addLeadFromWebsite({
        name: botData.name,
        phone: botData.phone,
        email: botData.email || `${botData.name.toLowerCase().replace(/\s+/g, '')}@student.org`,
        course: botData.course,
        source: 'AI Chatbot',
        entryPoint: 'AI Chatbot',
        message: 'Enquiry captured via Website AI Admissions Chatbot Widget.',
      });
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Trigger Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2.5 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-full shadow-2xl shadow-blue-500/30 transition-transform hover:scale-105 border border-blue-400/30"
        >
          <div className="relative">
            <IconSparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
          </div>
          <span>Chat with Admissions AI</span>
        </button>
      )}

      {/* Chatbot Dialog */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-slate-900 border border-blue-500/40 rounded-3xl shadow-2xl overflow-hidden text-xs animate-fadeIn flex flex-col">
          
          {/* Bot Header */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                <IconSparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-white">Aura Admissions Assistant</div>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Immediate Reply</span>
                </div>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <IconX className="w-5 h-5" />
            </button>
          </div>

          {/* Bot Body Conversation */}
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto bg-slate-950/60">
            
            {/* Message 1 */}
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 space-y-1">
              <p className="font-semibold text-blue-400">🤖 Aura Bot:</p>
              <p>Welcome to Aura Academy! I can instantly help you reserve a seat and check scholarship eligibility.</p>
            </div>

            {/* Step 1: Course Selection */}
            {step >= 1 && (
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2">
                <p className="font-semibold text-blue-400">🤖 Aura Bot:</p>
                <p>Which bootcamp program are you interested in?</p>

                {step === 1 && (
                  <div className="space-y-1 pt-1">
                    {COURSES.slice(0, 4).map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setBotData({ ...botData, course: c });
                          setStep(2);
                        }}
                        className="w-full text-left px-2.5 py-1.5 bg-slate-950 hover:bg-blue-600/20 text-slate-300 hover:text-white rounded-lg border border-slate-800 transition-colors text-[11px]"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Name */}
            {step >= 2 && (
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2">
                <p className="font-semibold text-blue-400">🤖 Aura Bot:</p>
                <p>Great choice! What is your full name?</p>

                {step === 2 && (
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={botData.name}
                      onChange={(e) => setBotData({ ...botData, name: e.target.value })}
                      placeholder="Enter full name..."
                      className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={handleNext}
                      disabled={!botData.name.trim()}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Phone */}
            {step >= 3 && !submitted && (
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2">
                <p className="font-semibold text-blue-400">🤖 Aura Bot:</p>
                <p>What is your contact phone number to receive the brochure via WhatsApp?</p>

                <div className="flex gap-2 pt-1">
                  <input
                    type="tel"
                    value={botData.phone}
                    onChange={(e) => setBotData({ ...botData, phone: e.target.value })}
                    placeholder="+1 (555) 000-1122"
                    className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleNext}
                    disabled={!botData.phone.trim()}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl font-bold disabled:opacity-40"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {/* Submitted Success */}
            {submitted && (
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 space-y-2 text-center">
                <IconCheckCircle className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                <p className="font-bold text-white">Enquiry Submitted Successfully!</p>
                <p className="text-[11px] text-slate-300">
                  Lead was pushed live to the portal. An advisor will contact you shortly.
                </p>
                <button
                  onClick={() => {
                    setActiveView('dashboard');
                    setIsOpen(false);
                  }}
                  className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  View Lead in Portal Dashboard
                </button>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
