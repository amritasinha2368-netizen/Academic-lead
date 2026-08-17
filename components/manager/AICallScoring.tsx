'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { CallRecordingPlayer } from '@/components/counsellor/CallRecordingPlayer';
import { IconAward, IconSparkles, IconMic, IconUsers } from '@/components/ui/Icons';
import { CallRecording } from '@/lib/types';

export const AICallScoring: React.FC = () => {
  const { allLeadsUnfiltered, counsellors } = useLeadStore();

  // Flatten all recordings across leads
  const recordingsWithLead = allLeadsUnfiltered.flatMap((lead) =>
    lead.callRecordings.map((rec) => ({ recording: rec, lead }))
  );

  const [activeRecording, setActiveRecording] = useState<CallRecording | null>(
    recordingsWithLead[0]?.recording || null
  );

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
            <IconAward className="w-3.5 h-3.5" />
            <span>Section 2.2: Manager QA & Quality Scorecard</span>
          </div>
          <h2 className="text-2xl font-black text-white">AI Counsellor Call Score & QA Review</h2>
          <p className="text-xs text-slate-400 mt-1">Automated AI evaluation of counsellor greetings, objection handling, pitch accuracy, and closing skills.</p>
        </div>
      </div>

      {/* Selected Recording Active Player */}
      {activeRecording && (
        <CallRecordingPlayer recording={activeRecording} />
      )}

      {/* Recording QA Scorecard List */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <IconMic className="w-5 h-5 text-blue-400" />
          <span>Team Telecaller Call Audits ({recordingsWithLead.length})</span>
        </h3>

        <div className="space-y-3">
          {recordingsWithLead.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No recorded calls logged yet. Initiate calls from the Click-to-Call dialer to generate AI quality scores.
            </div>
          ) : (
            recordingsWithLead.map(({ recording, lead }) => (
              <div
                key={recording.id}
                onClick={() => setActiveRecording(recording)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  activeRecording?.id === recording.id
                    ? 'bg-blue-950/30 border-blue-500/50 shadow-lg'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-white text-sm">{recording.counsellorName}</span>
                    <span className="text-xs text-slate-400">calling <strong className="text-slate-200">{lead.name}</strong></span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                      {recording.disposition}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    {new Date(recording.timestamp).toLocaleString()} • Duration: {Math.floor(recording.durationSeconds / 60)}m {recording.durationSeconds % 60}s
                  </p>
                  <p className="text-xs text-slate-300 italic max-w-xl truncate">
                    "{recording.aiSummary}"
                  </p>
                </div>

                {/* Score Breakdown Pills */}
                <div className="flex items-center space-x-4 shrink-0">
                  <div className="hidden lg:grid grid-cols-5 gap-1.5 text-center text-[10px] font-mono">
                    <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block">Greeting</span>
                      <strong className="text-blue-400">{recording.scoreBreakdown.greeting}/20</strong>
                    </div>
                    <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block">Discovery</span>
                      <strong className="text-blue-400">{recording.scoreBreakdown.discovery}/20</strong>
                    </div>
                    <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block">Pitch</span>
                      <strong className="text-blue-400">{recording.scoreBreakdown.explanation}/20</strong>
                    </div>
                    <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block">Objections</span>
                      <strong className="text-amber-400">{recording.scoreBreakdown.objectionHandling}/20</strong>
                    </div>
                    <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block">Closing</span>
                      <strong className="text-emerald-400">{recording.scoreBreakdown.closing}/20</strong>
                    </div>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-center font-mono font-black text-sm">
                    {recording.aiCallScore} / 100
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
