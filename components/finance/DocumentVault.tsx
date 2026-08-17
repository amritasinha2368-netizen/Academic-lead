'use client';

import React from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { DocumentStatus } from '@/lib/types';
import { IconFileText, IconCheckCircle, IconAlertTriangle, IconDownload, IconXCircle } from '@/components/ui/Icons';

export const DocumentVault: React.FC = () => {
  const { allLeadsUnfiltered, addDocumentAttachment } = useLeadStore();

  // Collect all documents across all leads
  const docsWithLead = allLeadsUnfiltered.flatMap((lead) =>
    lead.documents.map((doc) => ({ doc, lead }))
  );

  const handleToggleDocStatus = (leadId: string, docId: string, currentStatus: DocumentStatus) => {
    const nextStatus: DocumentStatus = 
      currentStatus === 'Pending' ? 'Approved' : currentStatus === 'Approved' ? 'Rejected' : 'Pending';

    alert(`Updated document verification status to "${nextStatus}". Audit log generated.`);
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Pending':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Rejected':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'Missing':
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-950 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <IconFileText className="w-3.5 h-3.5" />
            <span>Section 4: Admissions & Verification Vault</span>
          </div>
          <h2 className="text-2xl font-black text-white">Student Document Vault & OCR Verification</h2>
          <p className="text-xs text-slate-400 mt-1">Review dissertations, degree marksheets, national ID scans, and automated OCR validation alerts.</p>
        </div>
      </div>

      {/* Document Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docsWithLead.length === 0 ? (
          <div className="col-span-2 py-12 text-center text-slate-500 glass-panel rounded-2xl border border-slate-800 text-xs">
            No documents uploaded in system vault.
          </div>
        ) : (
          docsWithLead.map(({ doc, lead }) => (
            <div
              key={doc.id}
              className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4 shadow-xl hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 uppercase border border-blue-500/30">
                    {doc.type}
                  </span>
                  <h4 className="font-extrabold text-base text-white mt-2">{doc.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Student: <strong className="text-white">{lead.name}</strong> • Course: <span className="text-blue-400 font-semibold">{lead.course}</span>
                  </p>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${getStatusBadge(doc.status)}`}>
                  {doc.status}
                </span>
              </div>

              {doc.abstractText && (
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 italic">
                  <span className="font-bold text-slate-400 not-italic block mb-1">Thesis Abstract Preview:</span>
                  "{doc.abstractText}"
                </div>
              )}

              {doc.ocrAlerts && doc.ocrAlerts.length > 0 && (
                <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs space-y-1">
                  <div className="font-bold text-indigo-300 flex items-center space-x-1.5 text-[11px]">
                    <IconAlertTriangle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Automated OCR Field Validation Alert</span>
                  </div>
                  {doc.ocrAlerts.map((alert, i) => (
                    <p key={i} className="text-slate-300 text-[11px]">{alert}</p>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="font-mono text-slate-500 text-[11px]">{doc.fileName} ({doc.fileSize})</span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleDocStatus(lead.id, doc.id, doc.status)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all"
                  >
                    Change Status
                  </button>
                  <button
                    onClick={() => alert(`Downloading PDF file ${doc.fileName}...`)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
                  >
                    <IconDownload className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
