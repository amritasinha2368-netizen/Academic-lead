'use client';

import React, { useState, useEffect } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { 
  IconPhone, 
  IconX, 
  IconCheckCircle, 
  IconMessageSquare,
  IconUserPlus
} from '@/components/ui/Icons';

export const DialerModal: React.FC = () => {
  const { activeDialerLead, closeDialer, logCompletedCall } = useLeadStore();

  const [callState, setCallState] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [callNotes, setCallNotes] = useState('');

  // Call timer interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeDialerLead) {
      setCallState('connecting');
      setSeconds(0);
      setIsMuted(false);
      setIsOnHold(false);
      setCallNotes('');

      // Simulate connection delay
      const connTimer = setTimeout(() => {
        setCallState('connected');
      }, 1500);

      return () => clearTimeout(connTimer);
    }
  }, [activeDialerLead]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'connected' && !isOnHold) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState, isOnHold]);

  if (!activeDialerLead) return null;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallState('ended');
  };

  const handleSaveCallLog = () => {
    logCompletedCall(activeDialerLead.id, seconds, callNotes);
    closeDialer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-blue-500/40 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6 relative">
        
        {/* Softphone Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-extrabold text-sm text-white tracking-wide">Aura Softphone Dialer</span>
          </div>
          <button onClick={closeDialer} className="text-slate-400 hover:text-white">
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Call Target Details & Status */}
        <div className="text-center space-y-3 py-2">
          <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 mx-auto flex items-center justify-center text-white font-extrabold text-3xl shadow-xl shadow-blue-500/20 border-2 border-blue-400/30">
            {activeDialerLead.name.charAt(0)}
          </div>
          
          <div>
            <h3 className="font-extrabold text-xl text-white">{activeDialerLead.name}</h3>
            <p className="text-sm font-mono text-blue-400 mt-0.5">{activeDialerLead.phone}</p>
            <p className="text-xs text-slate-400">{activeDialerLead.course}</p>
          </div>

          {/* Call Status Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
            {callState === 'connecting' && (
              <span className="text-amber-400 animate-pulse font-semibold">Dialing & Connecting...</span>
            )}
            {callState === 'connected' && (
              <span className="text-emerald-400 font-bold flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Call Active • {formatTimer(seconds)}</span>
              </span>
            )}
            {callState === 'ended' && (
              <span className="text-slate-400 font-semibold">Call Completed ({formatTimer(seconds)})</span>
            )}
          </div>
        </div>

        {/* Softphone Control Pad */}
        {callState !== 'ended' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className={`py-3 rounded-2xl font-bold text-xs border transition-all flex flex-col items-center justify-center space-y-1 ${
                  isMuted
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span className="text-sm">{isMuted ? '🔇' : '🎙️'}</span>
                <span>{isMuted ? 'Muted' : 'Mute'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOnHold(!isOnHold)}
                className={`py-3 rounded-2xl font-bold text-xs border transition-all flex flex-col items-center justify-center space-y-1 ${
                  isOnHold
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span className="text-sm">⏸️</span>
                <span>{isOnHold ? 'On Hold' : 'Hold'}</span>
              </button>

              <button
                type="button"
                className="py-3 rounded-2xl font-bold text-xs bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800 flex flex-col items-center justify-center space-y-1"
              >
                <span className="text-sm">🔊</span>
                <span>Speaker</span>
              </button>
            </div>

            {/* End Call Button */}
            <button
              onClick={handleEndCall}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2"
            >
              <IconPhone className="w-5 h-5 transform rotate-[135deg]" />
              <span>End Outbound Call</span>
            </button>
          </div>
        ) : (
          /* Post-Call Summary & Log Entry Form */
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center space-x-2">
              <IconCheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Call Duration: {formatTimer(seconds)}. Record call remarks below:</span>
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Counsellor Call Remarks *</label>
              <textarea
                rows={3}
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                placeholder="Recorded student interest in batch schedule, requested fee breakdown email..."
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleSaveCallLog}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-blue-600/30"
            >
              Save Call Log to Student Timeline
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
