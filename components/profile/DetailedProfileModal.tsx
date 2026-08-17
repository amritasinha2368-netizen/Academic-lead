'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { Lead, LeadStatus } from '@/lib/types';
import { formatDateString, formatDateOnly } from '@/lib/utils';
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
  IconSparkles 
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
    openMessageComposer,
    currentRole
  } = useLeadStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'schedule' | 'payments'>('overview');
  
  const [newNoteText, setNewNoteText] = useState('');
  const [callDate, setCallDate] = useState('2026-08-18');
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
  const totalPaid = currentLead.payments.reduce((sum, p) => sum + (p.status === 'Paid' ? p.amount : 0), 0);
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
      
      {/* HubSpot Style Slide-Over Right Drawer */}
      <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-slideInRight text-slate-100">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg font-black shadow-md">
              {currentLead.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white">{currentLead.name}</h2>
                {currentLead.enrolledStudentId && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    #{currentLead.enrolledStudentId}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Added {formatDateString(currentLead.dateAdded)} • <span className="text-blue-400 font-semibold">{currentLead.source}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => openDialer(currentLead)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-1"
            >
              <IconPhone className="w-3.5 h-3.5" />
              <span>Call</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Segmented Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 text-xs font-semibold shrink-0">
          {(['overview', 'documents', 'schedule', 'payments'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 border-b-2 capitalize transition-all ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'documents' ? `Docs (${currentLead.documents.length})` : tab}
              {tab === 'schedule' && ` (${currentLead.scheduledCalls.length})`}
              {tab === 'payments' && ` ($${totalPaid})`}
            </button>
          ))}
        </div>

        {/* Drawer Body Scroll Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-5">
          
          {activeTab === 'overview' && (
            <div className="space-y-5 text-xs">
              
              {/* Quick Status & Assign Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Pipeline Stage</label>
                    <select
                      value={currentLead.status}
                      onChange={(e) => updateLeadStatus(currentLead.id, e.target.value as LeadStatus)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-blue-400 focus:outline-none"
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
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Assigned Telecaller</label>
                    <select
                      value={currentLead.assignedCounsellorId || ''}
                      onChange={(e) => assignCounsellor(currentLead.id, e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200"
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
                    className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-md"
                  >
                    Convert Lead to Enrolled Student
                  </button>
                )}
              </div>

              {/* Personal Details */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-slate-300">
                <h3 className="font-bold text-white uppercase text-[11px] border-b border-slate-800 pb-2">Student Information</h3>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div><span className="text-slate-500">Phone:</span> <strong className="text-white font-mono">{currentLead.phone}</strong></div>
                  <div><span className="text-slate-500">Email:</span> <span className="text-white">{currentLead.email}</span></div>
                  <div><span className="text-slate-500">City:</span> <span className="text-white">{currentLead.city}</span></div>
                  <div><span className="text-slate-500">Qualification:</span> <span className="text-white">{currentLead.qualification}</span></div>
                  <div><span className="text-slate-500">Course:</span> <span className="text-blue-400 font-semibold">{currentLead.course}</span></div>
                  <div><span className="text-slate-500">Graduation:</span> <span className="text-slate-300">{currentLead.graduationYear || '2025'}</span></div>
                </div>
              </div>

              {/* Remarks & History */}
              <div className="space-y-3">
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add call notes or remarks..."
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  />
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl">Add Note</button>
                </form>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {currentLead.activityHistory.map((act) => (
                    <div key={act.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] space-y-0.5">
                      <div className="flex justify-between font-bold text-blue-400">
                        <span>{act.author}</span>
                        <span className="text-slate-500 font-normal">{formatDateString(act.timestamp)}</span>
                      </div>
                      <p className="text-slate-300">{act.message}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 gap-3">
                {currentLead.documents.map((doc) => (
                  <div key={doc.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between font-bold text-white">
                      <span>{doc.title}</span>
                      <span className="text-blue-400 font-mono text-[11px]">{doc.status}</span>
                    </div>
                    {doc.abstractText && <p className="text-slate-400 italic text-[11px]">"{doc.abstractText}"</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Total Fee</div>
                  <div className="text-base font-bold text-white">${totalFee}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-emerald-400 uppercase font-bold">Paid</div>
                  <div className="text-base font-bold text-emerald-400">${totalPaid}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-amber-400 uppercase font-bold">Balance</div>
                  <div className="text-base font-bold text-amber-400">${balanceDue}</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
