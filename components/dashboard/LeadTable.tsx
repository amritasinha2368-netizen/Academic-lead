'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { Lead, LeadStatus } from '@/lib/types';
import { formatDateString } from '@/lib/utils';
import { 
  IconPhone, 
  IconMapPin, 
  IconAlertTriangle, 
  IconEye, 
  IconTrash, 
  IconTag,
  IconInstagram,
  IconGoogle,
  IconGlobe,
  IconSparkles,
  IconFileText,
  IconMessageSquare
} from '@/components/ui/Icons';

interface LeadTableProps {
  onSelectLeadDetail: (lead: Lead) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({ onSelectLeadDetail }) => {
  const { 
    leads, 
    counsellors, 
    selectedLeadIds, 
    toggleSelectLead, 
    toggleSelectAll, 
    updateLeadStatus, 
    assignCounsellor,
    deleteLead,
    openDialer,
    openMessageComposer
  } = useLeadStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(leads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = leads.slice(startIndex, startIndex + itemsPerPage);

  const allVisibleSelected = 
    paginatedLeads.length > 0 && 
    paginatedLeads.every((l) => selectedLeadIds.includes(l.id));

  const getStatusBadgeStyle = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
      case 'Contacted':
        return 'bg-[#FFF3EB] dark:bg-orange-500/10 text-[#FF6B00] dark:text-orange-400 border-[#FFE0CC] dark:border-orange-500/30';
      case 'Follow-up':
        return 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
      case 'Interested':
        return 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/30';
      case 'Enrolled':
        return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
      case 'Dropped':
        return 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const renderChannelBadge = (source: string) => {
    if (source.includes('Instagram') || source.includes('Meta')) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400 border border-pink-200 dark:border-pink-500/30">
          <IconInstagram className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400 shrink-0" />
          <span>Instagram</span>
        </span>
      );
    }
    if (source.includes('Google')) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30">
          <IconGoogle className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
          <span>Google Ads</span>
        </span>
      );
    }
    if (source.includes('Homepage') || source.includes('Website')) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">
          <IconGlobe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>Website</span>
        </span>
      );
    }
    if (source.includes('Brochure')) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
          <IconFileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Brochure Gate</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <IconTag className="w-3.5 h-3.5 shrink-0" />
        <span>{source}</span>
      </span>
    );
  };

  return (
    <div className="ls-card overflow-hidden">
      
      {/* Scrollable Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
          
          {/* Table Header (LeadSquared Blue-Gray Header) */}
          <thead className="bg-slate-100 dark:bg-[#182638] text-[11px] font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th scope="col" className="p-3.5 w-10 text-center">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[#FF6B00] focus:ring-[#FF6B00] h-4 w-4 cursor-pointer"
                />
              </th>
              <th scope="col" className="py-3.5 px-4 min-w-[210px]">Lead Name & Score</th>
              <th scope="col" className="py-3.5 px-4 min-w-[190px]">Target Course Program</th>
              <th scope="col" className="py-3.5 px-4 min-w-[130px]">Pipeline Stage</th>
              <th scope="col" className="py-3.5 px-4 min-w-[150px]">Lead Channel / Source</th>
              <th scope="col" className="py-3.5 px-4 min-w-[150px]">Assigned Counsellor</th>
              <th scope="col" className="py-3.5 px-4 min-w-[120px]">Created Date</th>
              <th scope="col" className="py-3.5 px-4 text-right min-w-[120px]">LeadSquared Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 bg-white dark:bg-slate-900/30">
            {paginatedLeads.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-1.5">
                    <IconAlertTriangle className="w-6 h-6 text-slate-400" />
                    <p className="font-medium text-xs">No leads found matching current filters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedLeads.map((lead) => {
                const isSelected = selectedLeadIds.includes(lead.id);
                const assignedCounsellor = counsellors.find((c) => c.id === lead.assignedCounsellorId);

                return (
                  <tr
                    key={lead.id}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                      isSelected ? 'bg-orange-50/50 dark:bg-orange-950/20' : ''
                    }`}
                  >
                    
                    {/* Checkbox */}
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectLead(lead.id)}
                        className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[#FF6B00] focus:ring-[#FF6B00] h-4 w-4 cursor-pointer"
                      />
                    </td>

                    {/* Lead Name & Score */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-xl bg-[#0F2537] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span 
                              onClick={() => onSelectLeadDetail(lead)}
                              className="font-extrabold text-slate-900 dark:text-white hover:text-[#FF6B00] dark:hover:text-[#FF6B00] cursor-pointer transition-colors text-xs"
                            >
                              {lead.name}
                            </span>

                            {lead.aiLeadScore && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-black bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30">
                                🔥 {lead.aiLeadScore}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                            <span className="font-mono">{lead.phone}</span>
                            <span>•</span>
                            <span>{lead.city}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-slate-200 text-xs truncate max-w-[180px]" title={lead.course}>
                        {lead.course}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {lead.qualification}
                      </div>
                    </td>

                    {/* Lead Status */}
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg border focus:outline-none transition-all cursor-pointer ${getStatusBadgeStyle(lead.status)}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Interested">Interested</option>
                        <option value="Counselling">Counselling</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Dropped">Dropped</option>
                      </select>
                    </td>

                    {/* Lead Channel / Origin */}
                    <td className="py-3.5 px-4">
                      {renderChannelBadge(lead.source)}
                    </td>

                    {/* Assigned Counsellor */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        {assignedCounsellor ? (
                          <>
                            <img
                              src={assignedCounsellor.avatar}
                              alt={assignedCounsellor.name}
                              className="w-5 h-5 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                            />
                            <select
                              value={lead.assignedCounsellorId || ''}
                              onChange={(e) => assignCounsellor(lead.id, e.target.value)}
                              className="bg-transparent text-xs text-slate-700 dark:text-slate-300 font-bold focus:outline-none cursor-pointer"
                            >
                              {counsellors.map((c) => (
                                <option key={c.id} value={c.id} className="bg-white dark:bg-[#0F2537] text-slate-900 dark:text-white">
                                  {c.name}
                                </option>
                              ))}
                            </select>
                          </>
                        ) : (
                          <span className="text-slate-400 text-xs font-medium">Unassigned</span>
                        )}
                      </div>
                    </td>

                    {/* Date Added */}
                    <td className="py-3.5 px-4 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      {formatDateString(lead.dateAdded)}
                    </td>

                    {/* LeadSquared Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => openDialer(lead)}
                          className="p-1.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors"
                          title="Call Softphone"
                        >
                          <IconPhone className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openMessageComposer(lead, 'whatsapp')}
                          className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition-colors"
                          title="Send WhatsApp"
                        >
                          <IconMessageSquare className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onSelectLeadDetail(lead)}
                          className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Lead 360° View"
                        >
                          <IconEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete lead "${lead.name}"?`)) deleteLead(lead.id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>

      {/* LeadSquared Pagination Footer */}
      <div className="bg-slate-100 dark:bg-[#101A28] px-5 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
        <div>
          Showing <span className="font-bold text-slate-900 dark:text-white">{leads.length > 0 ? startIndex + 1 : 0}</span> to{' '}
          <span className="font-bold text-slate-900 dark:text-white">{Math.min(startIndex + itemsPerPage, leads.length)}</span> of{' '}
          <span className="font-bold text-slate-900 dark:text-white">{leads.length}</span> entries
        </div>

        {totalPages > 1 && (
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 font-bold text-xs"
            >
              Prev
            </button>
            <span className="px-2 font-bold text-slate-700 dark:text-slate-300 text-xs">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 font-bold text-xs"
            >
              Next
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
