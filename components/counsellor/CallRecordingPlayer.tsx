'use client';

import React, { useState } from 'react';
import { CallRecording } from '@/lib/types';
import { IconPlay, IconPause, IconMic, IconSparkles, IconCheckCircle, IconX } from '@/components/ui/Icons';

interface CallRecordingPlayerProps {
  recording: CallRecording;
  onClose?: () => void;
}

export const CallRecordingPlayer: React.FC<CallRecordingPlayerProps> = ({ recording, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 70) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  return (
    <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4 shadow-2xl relative">
      {onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <IconX className="w-5 h-5" />
        </button>
      )}

      {/* Recording Header & AI Score Badge */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <IconMic className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-extrabold text-white text-sm">Call Recording & AI Transcripts</h4>
              <span className="text-[10px] font-mono text-slate-400">#{recording.id}</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Direction: <span className="font-semibold text-white">{recording.direction}</span> • Duration:{' '}
              <span className="font-mono text-blue-400">{Math.floor(recording.durationSeconds / 60)}m {recording.durationSeconds % 60}s</span>
            </p>
          </div>
        </div>

        {/* AI Call Score Pill */}
        <div className={`px-3 py-1.5 rounded-2xl border flex items-center space-x-1.5 ${getScoreColor(recording.aiCallScore)}`}>
          <IconSparkles className="w-4 h-4 text-amber-300" />
          <div>
            <span className="text-[10px] uppercase font-bold block leading-none">AI Call Score</span>
            <span className="text-sm font-black font-mono">{recording.aiCallScore} / 100</span>
          </div>
        </div>
      </div>

      {/* Audio Player Controls */}
      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center space-x-4">
        <button
          onClick={togglePlay}
          className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 shrink-0"
        >
          {isPlaying ? <IconPause className="w-5 h-5" /> : <IconPlay className="w-5 h-5 ml-0.5" />}
        </button>

        {/* Simulated Waveform */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center space-x-1 h-6">
            {[40, 70, 30, 90, 60, 80, 100, 50, 65, 45, 85, 95, 35, 75, 60, 80, 50, 70, 90, 40, 60, 75].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-full transition-all ${
                  isPlaying && i % 3 === 0 ? 'bg-blue-400 animate-pulse' : 'bg-slate-800'
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>00:00</span>
            <span>{Math.floor(recording.durationSeconds / 60)}:{recording.durationSeconds % 60}</span>
          </div>
        </div>
      </div>

      {/* Speech-to-Text Transcript */}
      <div className="space-y-1.5 text-xs">
        <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">
          Speech-to-Text Transcript:
        </label>
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-300 italic font-mono text-[11px] leading-relaxed max-h-28 overflow-y-auto">
          "{recording.transcriptionText}"
        </div>
      </div>

      {/* AI Intelligence Insights (Summary, Objections, Next-Best-Action) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
        
        {/* AI Summary & Objections */}
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center space-x-1.5 text-blue-400 font-bold">
            <IconSparkles className="w-3.5 h-3.5" />
            <span>AI Call Summary</span>
          </div>
          <p className="text-slate-300 text-[11px]">{recording.aiSummary}</p>
          
          {recording.aiObjections.length > 0 && (
            <div className="pt-1">
              <span className="text-[10px] text-rose-400 font-bold uppercase block">Surfaced Objections:</span>
              <ul className="list-disc list-inside text-[11px] text-rose-300">
                {recording.aiObjections.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* AI Next-Best-Action Prompt */}
        <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/40 space-y-2">
          <div className="flex items-center space-x-1.5 text-indigo-300 font-bold">
            <IconCheckCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Next-Best-Action Prompt</span>
          </div>
          <p className="text-slate-200 text-[11px] font-medium leading-snug">
            "{recording.aiNextBestAction}"
          </p>
        </div>

      </div>

    </div>
  );
};
