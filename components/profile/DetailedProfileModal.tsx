'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { Lead, LeadStatus } from '@/lib/types';
import { formatDateString } from '@/lib/utils';
import { 
  IconX, 
  IconPhone, 
  IconMail, 
  IconMapPin, 
  IconGraduationCap, 
  IconCalendar, 
  IconPlus, 
  IconMessageSquare, 
  IconDownload, 
  IconCheckCircle, 
  IconSparkles,
  IconTag
} from '@/components/ui/Icons';

interface DetailedProfileModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export const DetailedProfileModal: React.FC<DetailedProfileModalProps> = ({ lead, onClose }) => {
  const { 
    leads, 
    counsellors, 
    updateLeadStatus, 
    assignCounsellor, 
    addLeadNote, 
    convertLeadToStudent,
    addScheduledCall,
    addDocumentAttachment,
    addPaymentRecord,
    openDialer,
    openMessageComposer
  } = useLeadStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'schedule' | 'payments'>('overview');
  
  const [newNoteText, setNewNoteText] = useState('');
  const [callDate, setCallDate] = useState('2026-08-20');
  const [callTime, setCallTime] = useState('11:00');
  const [callNotes, setCallNotes] = useState('');

  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState<'Dissertation' | 'ID Proof' | 'Marksheet'>('Dissertation');
  const [docAbstract, setDocAbstract] = useState('');

  const [payAmount, setPayAmount] = useState(500);
  const [payMethod, setPayMethod] = useState<'Credit Card' | 'Bank Transfer' | 'Installment Plan'>('Credit Card');

  if (!lead) return null;

  const currentLead = leads.find((l) => l.id === lead.id) || lead;
  const assignedCounsellor = counsellors.find((c) => c.id === currentLead.assignedCounsellorId);

  const totalFee = currentLead.totalCourseFee || 3200;
  const totalPaid = (currentLead.payments || []).reduce((sum, p) => sum + (p.status === 'Paid' ? p.amount : 0), 0);
  const balanceDue = totalFee - totalPaid;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addLeadNote(currentLead.id, newNoteText, assignedCounsellor ? assignedCounsellor.name : 'Staff Counsellor');
    setNewNoteText('');
  };

  const handleScheduleCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callDate || !callTime) return;
    addScheduledCall(currentLead.id, callDate, callTime, callNotes || 'Follow-up call');
    setCallNotes('');
    alert(`Follow-up call scheduled for ${callDate} at ${callTime}`);
  };

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;
    addDocumentAttachment(currentLead.id, {
      title: docTitle,
      type: docType,
      fileName: `${docTitle.replace(/\s+/g, '_')}.pdf`,
      fileSize: '3.4 MB',
      abstractText: docAbstract,
      status: 'Pending',
    });
    setDocTitle('');
    setDocAbstract('');
    alert('Document attached successfully!');
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (payAmount <= 0) return;
    addPaymentRecord(currentLead.id, {
      amount: Number(payAmount),
      date: new Date().toISOString(),
      paymentMethod: payMethod,
      status: 'Paid',
    });
    alert(`Payment of $${payAmount} recorded! Receipt issued.`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
      
      {/* LeadSquared 360 View Slide-Over Drawer */}
      <div className="w-full max-w-2xl bg-white dark:bg-[#141F2E] border-l border-slate-200 dark:border-[#202D3D] h-full flex flex-col shadow-2xl animate-slideInRight text-slate-900 dark:text-white">
        
        {/* LeadSquared Drawer Header (Deep Navy Header) */}
        <div className="p-5 bg-[#0F2537] text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center space-x-3.5">
            <div className="h-12 w-12 rounded-2xl bg-[#FF6B00] flex items-center justify-center text-white text-xl font-black shadow-md">
              {currentLead.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-extrabold text-white">{currentLead.name}</h2>
                {currentLead.aiLeadScore && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    🔥 Lead Score: {currentLead.aiLeadScore}
                  </span>
                )}
                {currentLead.enrolledStudentId && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    STUDENT #{currentLead.enrolledStudentId}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Lead ID: <span className="font-mono text-[#FF6B00] font-bold">{currentLead.id}</span> • Added {formatDateString(currentLead.dateAdded)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => openDialer(currentLead)}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1"
            >
              <IconPhone className="w-3.5 h-3.5" />
              <span>Call</span>
            </button>
            <button
              onClick={() => openMessageComposer(currentLead, 'whatsapp')}
              className="px-3.5 py-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1"
            >
              <IconMessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-[#162D42]"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LeadSquared Drawer Navigation Bar */}
        <div className="flex border-b border-slate-200 dark:border-[#202D3D] bg-slate-50 dark:bg-[#0B131E] px-4 text-xs font-bold shrink-0">
          {(['overview', 'documents', 'schedule', 'payments'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-5 border-b-2 capitalize transition-all ${
                activeTab === tab
                  ? 'border-[#FF6B00] text-[#FF6B00] font-black'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab === 'documents' ? `Documents (${(currentLead.documents || []).length})` : tab}
              {tab === 'schedule' && ` (${(currentLead.scheduledCalls || []).length})`}
              {tab === 'payments' && ` ($${totalPaid})`}
            </button>
          ))}
        </div>

        {/* Drawer Body Scroll Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-5">
          
          {activeTab === 'overview' && (
            <div className="space-y-5 text-xs">
              
              {/* Pipeline Stage Selector Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B131E] border border-slate-200 dark:border-[#202D3D] space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Lead Stage</label>
                    <select
                      value={currentLead.status}
                      onChange={(e) => updateLeadStatus(currentLead.id, e.target.value as LeadStatus)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#141F2E] border border-slate-300 dark:border-[#202D3D] rounded-xl text-xs font-bold text-[#FF6B00] focus:outline-none"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Interested">Interested</option>
                      <option value="Counselling">Counselling</option>
                      <option value="Enrolled">Enrolled</option>
                      <option value="Dropped">Dropped</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Assigned Telecaller</label>
                    <select
                      value={currentLead.assignedCounsellorId || ''}
                      onChange={(e) => assignCounsellor(currentLead.id, e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#141F2E] border border-slate-300 dark:border-[#202D3D] rounded-xl text-xs text-slate-800 dark:text-slate-200 font-bold"
                    >
                      <option value="" disabled>Unassigned</option>
                      {counsellors.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {!currentLead.enrolledStudentId && (
                  <button
                    onClick={() => convertLeadToStudent(currentLead.id)}
                    className="w-full py-2.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white font-extrabold rounded-xl shadow-md transition-all text-xs"
                  >
                    Convert Lead to Enrolled Student
                  </button>
                )}
              </div>

              {/* Lead Origin & Attribution */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B131E] border border-slate-200 dark:border-[#202D3D] space-y-2 text-xs">
                <h3 className="font-bold text-slate-900 dark:text-white uppercase text-[11px] border-b border-slate-200 dark:border-[#202D3D] pb-2 flex items-center space-x-1.5">
                  <IconTag className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Lead 360° Channel Attribution</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 pt-1 text-slate-600 dark:text-slate-300">
                  <div><span className="text-slate-400">Traffic Source:</span> <span className="font-extrabold text-[#FF6B00]">{currentLead.source}</span></div>
                  <div><span className="text-slate-400">Entry Form:</span> <span className="text-slate-900 dark:text-white font-semibold">{currentLead.entryPoint}</span></div>
                  <div><span className="text-slate-400">utm_source:</span> <span className="font-mono text-slate-700 dark:text-slate-300">{currentLead.utmSource || 'website'}</span></div>
                  <div><span className="text-slate-400">utm_campaign:</span> <span className="font-mono text-slate-700 dark:text-slate-300">{currentLead.utmCampaign || 'organic'}</span></div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B131E] border border-slate-200 dark:border-[#202D3D] space-y-2 text-slate-600 dark:text-slate-300">
                <h3 className="font-bold text-slate-900 dark:text-white uppercase text-[11px] border-b border-slate-200 dark:border-[#202D3D] pb-2">Student Profile</h3>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div><span className="text-slate-400">Phone:</span> <strong className="text-slate-900 dark:text-white font-mono">{currentLead.phone}</strong></div>
                  <div><span className="text-slate-400">Email:</span> <span className="text-slate-900 dark:text-white">{currentLead.email}</span></div>
                  <div><span className="text-slate-400">City:</span> <span className="text-slate-900 dark:text-white">{currentLead.city}</span></div>
                  <div><span className="text-slate-400">Qualification:</span> <span className="text-slate-900 dark:text-white">{currentLead.qualification}</span></div>
                  <div className="col-span-2"><span className="text-slate-400">Target Course:</span> <span className="text-[#0066FF] font-bold">{currentLead.course}</span></div>
                </div>
              </div>

              {/* Remarks & History */}
              <div className="space-y-3">
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Log LeadSquared activity notes or remarks..."
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#0B131E] border border-slate-300 dark:border-[#202D3D] rounded-xl text-slate-900 dark:text-white focus:outline-none font-medium"
                  />
                  <button type="submit" className="px-4 py-2 bg-[#FF6B00] text-white font-bold rounded-xl text-xs">Add Note</button>
                </form>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {(currentLead.activityHistory || []).map((act) => (
                    <div key={act.id} className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B131E] border border-slate-200 dark:border-[#202D3D] text-[11px] space-y-0.5">
                      <div className="flex justify-between font-bold text-[#FF6B00]">
                        <span>{act.author}</span>
                        <span className="text-slate-400 font-normal">{formatDateString(act.timestamp)}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{act.message}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 gap-3">
                {(currentLead.documents || []).map((doc) => (
                  <div key={doc.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B131E] border border-slate-200 dark:border-[#202D3D] space-y-2">
                    <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                      <span>{doc.title}</span>
                      <span className="text-[#FF6B00] font-mono text-[11px]">{doc.status}</span>
                    </div>
                    {doc.abstractText && <p className="text-slate-500 italic text-[11px]">"{doc.abstractText}"</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B131E] border border-slate-200 dark:border-[#202D3D]">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Total Fee</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">${totalFee}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B131E] border border-slate-200 dark:border-[#202D3D]">
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold">Paid</div>
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">${totalPaid}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B131E] border border-slate-200 dark:border-[#202D3D]">
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 uppercase font-bold">Balance</div>
                  <div className="text-base font-bold text-amber-600 dark:text-amber-400">${balanceDue}</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
