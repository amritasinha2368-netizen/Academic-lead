'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { MOCK_CALL_RECORDINGS } from '@/lib/mock-data';
import { IconMic, IconPlay, IconPhone, IconSparkles, IconCheckCircle } from '@/components/ui/Icons';

export const AnalyticsDashboard: React.FC = () => {
  const { openDialer, leads } = useLeadStore();

  return (
    <div className="space-y-6 pb-8 text-slate-900">
      
      {/* Header Banner */}
      <div className="ls-card p-6 border-l-4 border-l-blue-600 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-blue-100 text-blue-800">
            <IconMic className="w-7 h-7" />
          </div>
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-300">
              Voice Intelligence & Call Scoring
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">Telephony & AI Call Logs</h1>
            <p className="text-sm font-bold text-slate-600 mt-0.5">
              Click-to-call softphone audio recordings, speech-to-text transcripts, and AI call quality scorecards.
            </p>
          </div>
        </div>

        <button
          onClick={() => openDialer(leads[0])}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0"
        >
          <IconPhone className="w-5 h-5" />
          <span>Launch Softphone Dialer</span>
        </button>
      </div>

      {/* Call Recordings List */}
      <div className="ls-card overflow-hidden bg-white">
        <div className="p-5 border-b border-slate-300 bg-slate-100 flex items-center justify-between">
          <h2 className="text-base font-black text-slate-900 flex items-center space-x-2">
            <IconMic className="w-5 h-5 text-blue-600" />
            <span>Call Audio Recordings & AI Quality Scorecard ({MOCK_CALL_RECORDINGS.length})</span>
          </h2>
        </div>

        <div className="divide-y divide-slate-200 bg-white">
          {MOCK_CALL_RECORDINGS.map((call) => (
            <div key={call.id} className="p-6 space-y-4 hover:bg-slate-50 transition-colors">
              
              {/* Call Header info */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shadow-sm">
                    {call.counsellorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-slate-900 text-base">{call.counsellorName}</span>
                      <span className="px-2.5 py-0.5 rounded text-xs font-black bg-blue-100 text-blue-900 border border-blue-300">
                        {call.direction} Call
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-bold mt-0.5">
                      Disposition: <strong className="text-slate-900">{call.disposition}</strong> • Duration: <span className="font-mono text-slate-800">{Math.floor(call.durationSeconds / 60)}m {call.durationSeconds % 60}s</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-mono font-black text-sm border border-amber-300">
                    🔥 AI Quality Score: {call.aiCallScore}/100
                  </div>
                </div>
              </div>

              {/* Speech Transcript */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 space-y-2">
                <div className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                  <IconSparkles className="w-4 h-4 text-blue-600" />
                  <span>AI Speech-to-Text Transcription</span>
                </div>
                <p className="text-sm font-bold text-slate-800 italic">"{call.transcriptionText}"</p>
              </div>

              {/* AI Summary & Next Action */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
                  <div className="font-black text-blue-900 uppercase">AI Executive Summary</div>
                  <p>{call.aiSummary}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                  <div className="font-black text-emerald-900 uppercase">AI Recommended Next Action</div>
                  <p>{call.aiNextBestAction}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
