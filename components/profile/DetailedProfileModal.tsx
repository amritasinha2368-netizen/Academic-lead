'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { Lead, LeadStatus } from '@/lib/types';
import { formatDateString } from '@/lib/utils';
import { 
  IconX, 
  IconPhone, 
  IconMessageSquare, 
  IconTag,
  IconGraduationCap
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
    addDocumentAttachment,
    openDialer,
    openMessageComposer
  } = useLeadStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'schedule' | 'payments'>('overview');
  
  const [newNoteText, setNewNoteText] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState<'12th Marksheet' | 'ID Proof' | 'Transfer Certificate' | 'Admit Card'>('12th Marksheet');

  if (!lead) return null;

  const currentLead = leads.find((l) => l.id === lead.id) || lead;
  const assignedCounsellor = counsellors.find((c) => c.id === currentLead.assignedCounsellorId);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addLeadNote(currentLead.id, newNoteText, assignedCounsellor ? assignedCounsellor.name : 'Admissions Officer');
    setNewNoteText('');
  };

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;
    addDocumentAttachment(currentLead.id, {
      title: docTitle,
      type: docType,
      fileName: `${docTitle.replace(/\s+/g, '_')}.pdf`,
      fileSize: '3.4 MB',
      status: 'Pending',
    });
    setDocTitle('');
    alert('12th Grade Document attached successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
      
      {/* LeadSquared 360 View Slide-Over Drawer */}
      <div className="w-full max-w-2xl bg-white border-l border-slate-300 h-full flex flex-col shadow-2xl animate-slideInRight text-slate-900">
        
        {/* Drawer Header */}
        <div className="p-5 bg-[#0F2537] text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center space-x-3.5">
            <div className="h-12 w-12 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white text-xl font-black shadow-md">
              {currentLead.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-extrabold text-white">{currentLead.name}</h2>
                {currentLead.aiLeadScore && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    🔥 Intent: {currentLead.aiLeadScore}%
                  </span>
                )}
                {currentLead.enrolledStudentId && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    STUDENT #{currentLead.enrolledStudentId}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Applicant ID: <span className="font-mono text-blue-400 font-bold">{currentLead.id}</span> • 12th Pass Candidate
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
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1"
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

        {/* Drawer Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 text-xs font-bold shrink-0">
          {(['overview', 'documents', 'schedule', 'payments'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-5 border-b-2 capitalize transition-all ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600 font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab === 'documents' ? `Documents (${(currentLead.documents || []).length})` : tab}
              {tab === 'schedule' && ` (${(currentLead.scheduledCalls || []).length})`}
              {tab === 'payments' && ` (${(currentLead.payments || []).length})`}
            </button>
          ))}
        </div>

        {/* Drawer Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-5">
          
          {activeTab === 'overview' && (
            <div className="space-y-5 text-xs">
              
              {/* Pipeline Stage Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Admission Stage</label>
                    <select
                      value={currentLead.status}
                      onChange={(e) => updateLeadStatus(currentLead.id, e.target.value as LeadStatus)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-blue-600 focus:outline-none"
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
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Admissions Officer</label>
                    <select
                      value={currentLead.assignedCounsellorId || ''}
                      onChange={(e) => assignCounsellor(currentLead.id, e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-bold"
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
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md transition-all text-xs"
                  >
                    Convert 12th Applicant to Enrolled College Student
                  </button>
                )}
              </div>

              {/* 12th Student Academic Profile */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-slate-700">
                <h3 className="font-bold text-slate-900 uppercase text-[11px] border-b border-slate-200 pb-2 flex items-center space-x-1.5">
                  <IconGraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Class 12th Academic Background</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div><span className="text-slate-500">12th Stream:</span> <strong className="text-slate-900">{currentLead.qualification}</strong></div>
                  <div><span className="text-slate-500">Board Marks %:</span> <strong className="text-emerald-700 font-mono">{currentLead.class12Percentage || 88.5}%</strong></div>
                  <div><span className="text-slate-500">Phone:</span> <strong className="text-slate-900 font-mono">{currentLead.phone}</strong></div>
                  <div><span className="text-slate-500">Email:</span> <span className="text-slate-900">{currentLead.email}</span></div>
                  <div><span className="text-slate-500">City:</span> <span className="text-slate-900">{currentLead.city}</span></div>
                  <div><span className="text-slate-500">Passing Year:</span> <span className="text-slate-900">{currentLead.graduationYear || '2026'}</span></div>
                  <div className="col-span-2"><span className="text-slate-500">Target College Degree:</span> <span className="text-blue-700 font-extrabold">{currentLead.course}</span></div>
                </div>
              </div>

              {/* Remarks */}
              <div className="space-y-3">
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Log counselor notes or 12th board transcript remarks..."
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none font-medium"
                  />
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs">Add Note</button>
                </form>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {(currentLead.activityHistory || []).map((act) => (
                    <div key={act.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-0.5">
                      <div className="flex justify-between font-bold text-blue-700">
                        <span>{act.author}</span>
                        <span className="text-slate-400 font-normal">{formatDateString(act.timestamp)}</span>
                      </div>
                      <p className="text-slate-800">{act.message}</p>
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
                  <div key={doc.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{doc.title}</span>
                      <span className="text-blue-600 font-mono text-[11px]">{doc.status}</span>
                    </div>
                    <div className="text-xs text-slate-600">{doc.fileName} • {doc.fileSize}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
