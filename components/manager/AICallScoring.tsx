'use client';

import React from 'react';
import { MOCK_CALL_RECORDINGS } from '@/lib/mock-data';
import { IconSparkles, IconCheckCircle } from '@/components/ui/Icons';

export const AICallScoring: React.FC = () => {
  return (
    <div className="ls-card p-6 bg-white space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-300 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
            <IconSparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900">AI Call Scorecards & Performance</h2>
            <p className="text-xs text-slate-600 font-bold">Automated telecaller call scoring out of 100</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-amber-100 text-amber-900 border border-amber-300">
          AI Evaluated
        </span>
      </div>

      {/* Scorecards */}
      <div className="space-y-3">
        {MOCK_CALL_RECORDINGS.map((call) => (
          <div key={call.id} className="p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-extrabold text-slate-900 text-sm">{call.counsellorName}</div>
                <div className="text-xs text-slate-600 font-bold">Call Disposition: {call.disposition}</div>
              </div>
              <div className="px-3 py-1 bg-amber-100 text-amber-900 font-mono font-black text-sm rounded-lg border border-amber-300">
                Score: {call.aiCallScore}/100
              </div>
            </div>

            {/* Criteria Breakdown */}
            <div className="grid grid-cols-5 gap-1.5 text-center text-xs font-bold">
              <div className="p-2 rounded bg-white border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase">Greeting</div>
                <div className="text-slate-900 font-mono">{call.scoreBreakdown.greeting}/20</div>
              </div>
              <div className="p-2 rounded bg-white border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase">Discovery</div>
                <div className="text-slate-900 font-mono">{call.scoreBreakdown.discovery}/20</div>
              </div>
              <div className="p-2 rounded bg-white border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase">Pitch</div>
                <div className="text-slate-900 font-mono">{call.scoreBreakdown.explanation}/20</div>
              </div>
              <div className="p-2 rounded bg-white border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase">Objections</div>
                <div className="text-slate-900 font-mono">{call.scoreBreakdown.objectionHandling}/20</div>
              </div>
              <div className="p-2 rounded bg-white border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase">Closing</div>
                <div className="text-slate-900 font-mono">{call.scoreBreakdown.closing}/20</div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
