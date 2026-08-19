'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { Lead, LeadStatus } from '@/lib/types';
import { formatDateString } from '@/lib/utils';
import { 
  IconPhone, 
  IconAlertTriangle, 
  IconEye, 
  IconTrash, 
  IconTag,
  IconInstagram,
  IconGoogle,
  IconGlobe,
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
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Contacted':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'Follow-up':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Interested':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Enrolled':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Dropped':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const renderChannelBadge = (source: string) => {
    if (source.includes('Instagram') || source.includes('Meta')) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-pink-100 text-pink-900 border border-pink-300 whitespace-nowrap">
          <IconInstagram className="w-3.5 h-3.5 text-pink-700 shrink-0" />
          <span>Instagram</span>
        </span>
      );
    }
    if (source.includes('Google')) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-sky-100 text-sky-900 border border-sky-300 whitespace-nowrap">
          <IconGoogle className="w-3.5 h-3.5 text-sky-700 shrink-0" />
          <span>Google Ads</span>
        </span>
      );
    }
    if (source.includes('Homepage') || source.includes('Website')) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-300 whitespace-nowrap">
          <IconGlobe className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
          <span>Website</span>
        </span>
      );
    }
    if (source.includes('Brochure')) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 whitespace-nowrap">
          <IconFileText className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>Brochure Gate</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-900 border border-slate-300 whitespace-nowrap">
        <IconTag className="w-3.5 h-3.5 shrink-0" />
        <span>{source}</span>
      </span>
    );
  };

  return (
    <div className="ls-card overflow-hidden">
      
      {/* Scrollable Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-900 whitespace-nowrap">
          
          {/* Table Header */}
          <thead className="bg-slate-100 text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-300">
            <tr>
              <th scope="col" className="p-3.5 w-10 text-center">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-400 bg-white text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                />
              </th>
              <th scope="col" className="py-3.5 px-4 min-w-[280px]">Student / Contact</th>
              <th scope="col" className="py-3.5 px-4 min-w-[320px]">Course Program</th>
              <th scope="col" className="py-3.5 px-4 min-w-[140px]">Pipeline Stage</th>
              <th scope="col" className="py-3.5 px-4 min-w-[160px]">Lead Channel Origin</th>
              <th scope="col" className="py-3.5 px-4 min-w-[170px]">Assigned Counsellor</th>
              <th scope="col" className="py-3.5 px-4 min-w-[140px]">Created Date</th>
              <th scope="col" className="py-3.5 px-4 text-right min-w-[130px]">Actions</th>
            </tr>
          </thead>

          {/* Table Body (Increased Readability Font) */}
          <tbody className="divide-y divide-slate-200 bg-white">
            {paginatedLeads.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-slate-500 font-bold text-xs">
                  <div className="flex flex-col items-center justify-center space-y-1.5">
                    <IconAlertTriangle className="w-6 h-6 text-slate-400" />
                    <p>No leads found matching current filters.</p>
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
                    className={`hover:bg-slate-50 transition-colors ${
                      isSelected ? 'bg-blue-50/60' : ''
                    }`}
                  >
                    
                    {/* Checkbox */}
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectLead(lead.id)}
                        className="rounded border-slate-400 bg-white text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                      />
                    </td>

                    {/* Student Name & Phone (STRICT SINGLE LINE) */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-xl bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 whitespace-nowrap">
                            <span 
                              onClick={() => onSelectLeadDetail(lead)}
                              className="font-extrabold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors text-xs"
                            >
                              {lead.name}
                            </span>

                            {lead.aiLeadScore && (
                              <span className="px-1.5 py-0.5 rounded text-[11px] font-mono font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                                🔥 {lead.aiLeadScore}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 text-xs text-slate-600 mt-0.5 font-bold whitespace-nowrap">
                            <span className="font-mono">{lead.phone}</span>
                            <span>•</span>
                            <span>{lead.city}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Course Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900 text-xs whitespace-nowrap">
                        {lead.course}
                      </div>
                      <div className="text-xs text-slate-600 font-bold mt-0.5 whitespace-nowrap">
                        {lead.qualification}
                      </div>
                    </td>

                    {/* Lead Stage Select */}
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none transition-all cursor-pointer whitespace-nowrap ${getStatusBadgeStyle(lead.status)}`}
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

                    {/* Channel Badge */}
                    <td className="py-3.5 px-4">
                      {renderChannelBadge(lead.source)}
                    </td>

                    {/* Assigned Counsellor */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2 whitespace-nowrap">
                        {assignedCounsellor ? (
                          <>
                            <img
                              src={assignedCounsellor.avatar}
                              alt={assignedCounsellor.name}
                              className="w-5.5 h-5.5 rounded-full object-cover border border-slate-300 shrink-0"
                            />
                            <select
                              value={lead.assignedCounsellorId || ''}
                              onChange={(e) => assignCounsellor(lead.id, e.target.value)}
                              className="bg-transparent text-xs text-slate-900 font-bold focus:outline-none cursor-pointer"
                            >
                              {counsellors.map((c) => (
                                <option key={c.id} value={c.id} className="bg-white text-slate-900">
                                  {c.name}
                                </option>
                              ))}
                            </select>
                          </>
                        ) : (
                          <span className="text-slate-500 text-xs font-bold">Unassigned</span>
                        )}
                      </div>
                    </td>

                    {/* Date Added */}
                    <td className="py-3.5 px-4 text-xs text-slate-600 font-mono font-bold whitespace-nowrap">
                      {formatDateString(lead.dateAdded)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => openDialer(lead)}
                          className="p-1.5 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                          title="Call Softphone"
                        >
                          <IconPhone className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openMessageComposer(lead, 'whatsapp')}
                          className="p-1.5 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Send WhatsApp"
                        >
                          <IconMessageSquare className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onSelectLeadDetail(lead)}
                          className="p-1.5 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                          title="View 360° Profile"
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

      {/* Pagination Footer */}
      <div className="bg-slate-100 px-5 py-2.5 border-t border-slate-300 flex items-center justify-between text-xs text-slate-700 font-bold">
        <div>
          Showing <span className="font-bold text-slate-900">{leads.length > 0 ? startIndex + 1 : 0}</span> to{' '}
          <span className="font-bold text-slate-900">{Math.min(startIndex + itemsPerPage, leads.length)}</span> of{' '}
          <span className="font-bold text-slate-900">{leads.length}</span> entries
        </div>

        {totalPages > 1 && (
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 bg-white text-slate-800 rounded border border-slate-300 disabled:opacity-40 hover:bg-slate-50 font-bold text-xs"
            >
              Prev
            </button>
            <span className="px-2 font-bold text-slate-800 text-xs">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 bg-white text-slate-800 rounded border border-slate-300 disabled:opacity-40 hover:bg-slate-50 font-bold text-xs"
            >
              Next
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
