'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { IconFileText, IconDownload } from '@/components/ui/Icons';

export const DocumentVault: React.FC = () => {
  const { allLeadsUnfiltered, addDocumentAttachment } = useLeadStore();

  const leadsWithDocs = allLeadsUnfiltered.filter((l) => (l.documents || []).length > 0);

  const [selectedLeadId, setSelectedLeadId] = useState<string>(leadsWithDocs[0]?.id || allLeadsUnfiltered[0]?.id || '');
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState<'12th Marksheet' | 'ID Proof' | 'Transfer Certificate' | 'Admit Card'>('12th Marksheet');

  const selectedLead = allLeadsUnfiltered.find((l) => l.id === selectedLeadId) || allLeadsUnfiltered[0];

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() || !selectedLead) return;
    addDocumentAttachment(selectedLead.id, {
      title: docTitle,
      type: docType,
      fileName: `${docTitle.replace(/\s+/g, '_')}.pdf`,
      fileSize: '2.8 MB',
      status: 'Approved',
    });
    setDocTitle('');
    alert('12th Grade Student Document added to Vault!');
  };

  return (
    <div className="space-y-6 pb-8 text-slate-900">
      
      {/* Header Banner */}
      <div className="ls-card p-6 border-l-4 border-l-blue-600 bg-white flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-blue-100 text-blue-800">
            <IconFileText className="w-7 h-7" />
          </div>
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-300">
              12th Pass Admissions Document Vault
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">Class 12th Document Verification Vault</h1>
            <p className="text-sm font-bold text-slate-600 mt-0.5">
              Verified storage for 12th Board Marksheets, School Transfer Certificates, Admit Cards, and Tuition Receipts.
            </p>
          </div>
        </div>
      </div>

      {/* Upload & Document View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Form */}
        <div className="ls-card p-6 bg-white space-y-4">
          <h2 className="text-base font-black text-slate-900 border-b border-slate-300 pb-3">Upload 12th Student Document</h2>
          
          <form onSubmit={handleUpload} className="space-y-4 text-sm font-bold">
            <div>
              <label className="block text-xs font-black text-slate-600 mb-1">Select 12th Applicant</label>
              <select
                value={selectedLeadId}
                onChange={(e) => setSelectedLeadId(e.target.value)}
                className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none"
              >
                {allLeadsUnfiltered.map((l) => (
                  <option key={l.id} value={l.id}>{l.name} ({l.qualification})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-600 mb-1">Document Title</label>
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                placeholder="e.g. 12th Board Physics & Math Marksheet"
                className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-600 mb-1">Document Category</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as any)}
                className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none"
              >
                <option value="12th Marksheet">12th Marksheet</option>
                <option value="ID Proof">ID Proof</option>
                <option value="Transfer Certificate">Transfer Certificate</option>
                <option value="Admit Card">Admit Card</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md transition-all"
            >
              Upload to 12th Vault
            </button>
          </form>
        </div>

        {/* Vault Document View */}
        <div className="lg:col-span-2 ls-card p-6 bg-white space-y-4">
          <h2 className="text-base font-black text-slate-900 border-b border-slate-300 pb-3">
            Attached Documents for {selectedLead?.name} ({selectedLead?.documents?.length || 0})
          </h2>

          <div className="space-y-3">
            {(!selectedLead?.documents || selectedLead.documents.length === 0) ? (
              <div className="p-8 text-center text-slate-500 font-bold text-sm bg-slate-50 rounded-xl border border-slate-200">
                No documents uploaded for this student.
              </div>
            ) : (
              selectedLead.documents.map((doc) => (
                <div key={doc.id} className="p-4 rounded-xl bg-slate-50 border border-slate-300 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-blue-100 text-blue-900 font-bold">
                      <IconFileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">{doc.title}</div>
                      <div className="text-xs text-slate-600 font-bold mt-0.5">
                        {doc.fileName} • {doc.fileSize} • Status: <strong className="text-emerald-700">{doc.status}</strong>
                      </div>
                    </div>
                  </div>

                  <button className="p-2 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors font-bold text-xs flex items-center space-x-1">
                    <IconDownload className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
