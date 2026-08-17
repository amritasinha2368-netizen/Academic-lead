'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Lead, 
  LeadStatus, 
  LeadSource, 
  FilterOptions, 
  Counsellor, 
  DuplicateCheckResult, 
  ActivityLog,
  UserRole,
  DocumentAttachment,
  PaymentRecord,
  ScheduledCall
} from './types';
import { INITIAL_LEADS, COUNSELLORS } from './mock-data';

interface LeadContextType {
  leads: Lead[];
  allLeadsUnfiltered: Lead[];
  counsellors: Counsellor[];
  activeView: 'dashboard' | 'analytics' | 'website-sandbox';
  setActiveView: (view: 'dashboard' | 'analytics' | 'website-sandbox') => void;
  kanbanViewMode: 'board' | 'table';
  setKanbanViewMode: (mode: 'board' | 'table') => void;
  
  // Role Access Control (RBAC)
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeCounsellorId: string;
  setActiveCounsellorId: (id: string) => void;

  // Filter state
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  
  // Selection state
  selectedLeadIds: string[];
  toggleSelectLead: (id: string) => void;
  toggleSelectAll: () => void;
  clearSelection: () => void;
  
  // Core lead actions
  addLeadFromWebsite: (newLeadData: Partial<Lead>) => { lead: Lead; duplicateResult: DuplicateCheckResult };
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  assignCounsellor: (id: string, counsellorId: string) => void;
  bulkUpdateStatus: (ids: string[], status: LeadStatus) => void;
  bulkAssignCounsellor: (ids: string[], counsellorId: string) => void;
  deleteLead: (id: string) => void;
  addLeadNote: (id: string, note: string, author?: string) => void;
  resolveDuplicateFlag: (id: string) => void;
  mergeDuplicateLeads: (primaryLeadId: string, duplicateLeadId: string) => void;
  convertLeadToStudent: (id: string) => void;
  
  // Schedule Calls & Documents & Payments
  addScheduledCall: (leadId: string, date: string, time: string, notes: string) => void;
  addDocumentAttachment: (leadId: string, doc: Omit<DocumentAttachment, 'id' | 'uploadDate'>) => void;
  addPaymentRecord: (leadId: string, payment: Omit<PaymentRecord, 'id' | 'receiptNumber'>) => void;

  // Dialer & Softphone state
  activeDialerLead: Lead | null;
  openDialer: (lead: Lead) => void;
  closeDialer: () => void;
  logCompletedCall: (leadId: string, durationSeconds: number, summaryNotes: string) => void;

  // Direct Message Composer state
  activeMessageComposer: { lead: Lead; channel?: 'whatsapp' | 'email' | 'sms' } | null;
  openMessageComposer: (lead: Lead, channel?: 'whatsapp' | 'email' | 'sms') => void;
  closeMessageComposer: () => void;

  // Reset
  resetData: () => void;
  
  // Auto-Ack & Duplicate Review modals
  lastAckModal: Lead | null;
  closeAckModal: () => void;
  activeDuplicateReview: { primary: Lead; matchReason: string } | null;
  closeDuplicateReview: () => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

const STORAGE_KEY = 'aura_academy_leads_v2';

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [counsellors] = useState<Counsellor[]>(COUNSELLORS);
  const [activeView, setActiveView] = useState<'dashboard' | 'analytics' | 'website-sandbox'>('dashboard');
  const [kanbanViewMode, setKanbanViewMode] = useState<'board' | 'table'>('table');
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  
  // Role & User Context
  const [currentRole, setCurrentRole] = useState<UserRole>('Super Admin');
  const [activeCounsellorId, setActiveCounsellorId] = useState<string>('counsellor-1');

  // Modals state
  const [lastAckModal, setLastAckModal] = useState<Lead | null>(null);
  const [activeDuplicateReview, setActiveDuplicateReview] = useState<{ primary: Lead; matchReason: string } | null>(null);
  const [activeDialerLead, setActiveDialerLead] = useState<Lead | null>(null);
  const [activeMessageComposer, setActiveMessageComposer] = useState<{ lead: Lead; channel?: 'whatsapp' | 'email' | 'sms' } | null>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    status: 'All',
    course: 'All',
    source: 'All',
    counsellorId: 'All',
    city: 'All',
    duplicateOnly: false,
  });

  // Persistence & Server sync
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setLeads(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load leads from storage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to save leads to storage', e);
    }
  }, [leads]);

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      status: 'All',
      course: 'All',
      source: 'All',
      counsellorId: 'All',
      city: 'All',
      duplicateOnly: false,
    });
  };

  const toggleSelectLead = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const filteredIds = getFilteredLeads().map((l) => l.id);
    if (selectedLeadIds.length === filteredIds.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(filteredIds);
    }
  };

  const clearSelection = () => setSelectedLeadIds([]);

  // Check duplicate engine
  const checkDuplicate = (phone: string, email: string): DuplicateCheckResult => {
    const cleanPhone = phone.replace(/\D/g, '');
    const cleanEmail = email.toLowerCase().trim();

    for (const lead of leads) {
      const existingCleanPhone = lead.phone.replace(/\D/g, '');
      const existingCleanEmail = lead.email.toLowerCase().trim();

      const phoneMatch = cleanPhone.length > 5 && existingCleanPhone === cleanPhone;
      const emailMatch = cleanEmail.length > 3 && existingCleanEmail === cleanEmail;

      if (phoneMatch && emailMatch) {
        return { isDuplicate: true, matchingLead: lead, matchReason: 'both' };
      } else if (phoneMatch) {
        return { isDuplicate: true, matchingLead: lead, matchReason: 'phone' };
      } else if (emailMatch) {
        return { isDuplicate: true, matchingLead: lead, matchReason: 'email' };
      }
    }
    return { isDuplicate: false };
  };

  // Add lead from website, form, or chatbot
  const addLeadFromWebsite = (newLeadData: Partial<Lead>) => {
    const dupCheck = checkDuplicate(newLeadData.phone || '', newLeadData.email || '');

    const assignedCounsellor = newLeadData.assignedCounsellorId || COUNSELLORS[Math.floor(Math.random() * COUNSELLORS.length)].id;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: newLeadData.name || 'Anonymous Student',
      phone: newLeadData.phone || '',
      alternatePhone: newLeadData.alternatePhone || '',
      email: newLeadData.email || '',
      city: newLeadData.city || 'Online / Remote',
      course: newLeadData.course || 'Data Science & AI Master Bootcamp',
      qualification: newLeadData.qualification || 'Undergraduate',
      preferredBatch: newLeadData.preferredBatch || 'Morning (9 AM - 12 PM)',
      graduationYear: newLeadData.graduationYear || '2025',
      workExperience: newLeadData.workExperience || 'None',
      message: newLeadData.message || '',
      status: 'New',
      source: newLeadData.source || 'Homepage',
      utmSource: newLeadData.utmSource || 'website',
      utmMedium: newLeadData.utmMedium || 'organic',
      utmCampaign: newLeadData.utmCampaign || 'direct_visit',
      entryPoint: newLeadData.entryPoint || 'Enroll Form',
      assignedCounsellorId: assignedCounsellor,
      dateAdded: new Date().toISOString(),
      isDuplicate: dupCheck.isDuplicate,
      duplicateCount: dupCheck.isDuplicate ? (dupCheck.matchingLead?.duplicateCount || 1) + 1 : 0,
      duplicateOfId: dupCheck.isDuplicate ? dupCheck.matchingLead?.id : undefined,
      totalCourseFee: 3200,
      ackSent: {
        email: true,
        sms: true,
        whatsapp: true,
        timestamp: new Date().toISOString(),
      },
      notes: newLeadData.notes || '',
      activityHistory: [
        {
          id: `act-${Date.now()}-1`,
          type: 'Auto-Acknowledgement',
          author: 'System Auto-Ack',
          message: 'Automated Thank You Email, SMS & WhatsApp dispatched to student.',
          timestamp: new Date().toISOString(),
        },
        ...(dupCheck.isDuplicate
          ? [
              {
                id: `act-${Date.now()}-2` as string,
                type: 'Duplicate Alert' as const,
                author: 'Duplicate Engine',
                message: `Duplicate detected matching existing lead "${dupCheck.matchingLead?.name}" (${dupCheck.matchReason} match).`,
                timestamp: new Date().toISOString(),
              },
            ]
          : []),
      ],
      documents: [],
      payments: [],
      scheduledCalls: [],
      callRecordings: [],
    };

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead),
    }).catch((err) => console.log('Syncing to server API route:', err));

    setLeads((prev) => [newLead, ...prev]);
    setLastAckModal(newLead);

    if (dupCheck.isDuplicate && dupCheck.matchingLead) {
      setActiveDuplicateReview({
        primary: dupCheck.matchingLead,
        matchReason: dupCheck.matchReason || 'contact',
      });
    }

    return { lead: newLead, duplicateResult: dupCheck };
  };

  const updateLeadStatus = (id: string, newStatus: LeadStatus) => {
    fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    }).catch((err) => console.log('Syncing to server API route:', err));

    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === id) {
          const newActivity: ActivityLog = {
            id: `act-${Date.now()}`,
            type: 'Status Change',
            author: currentRole === 'Counsellor' ? 'Sarah Jenkins' : 'CRM Manager',
            message: `Changed status from ${lead.status} to ${newStatus}.`,
            timestamp: new Date().toISOString(),
          };
          return {
            ...lead,
            status: newStatus,
            activityHistory: [newActivity, ...lead.activityHistory],
          };
        }
        return lead;
      })
    );
  };

  const assignCounsellor = (id: string, counsellorId: string) => {
    const counsellorName = COUNSELLORS.find((c) => c.id === counsellorId)?.name || 'Unassigned';
    
    fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignedCounsellorId: counsellorId }),
    }).catch((err) => console.log('Syncing to server API route:', err));

    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === id) {
          const newActivity: ActivityLog = {
            id: `act-${Date.now()}`,
            type: 'Counsellor Assigned',
            author: 'Admin Manager',
            message: `Reassigned lead to ${counsellorName}.`,
            timestamp: new Date().toISOString(),
          };
          return {
            ...lead,
            assignedCounsellorId: counsellorId,
            activityHistory: [newActivity, ...lead.activityHistory],
          };
        }
        return lead;
      })
    );
  };

  const bulkUpdateStatus = (ids: string[], newStatus: LeadStatus) => {
    fetch('/api/leads/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, status: newStatus }),
    }).catch((err) => console.log('Syncing bulk API route:', err));

    setLeads((prev) =>
      prev.map((lead) => {
        if (ids.includes(lead.id)) {
          const newActivity: ActivityLog = {
            id: `act-${Date.now()}`,
            type: 'Status Change',
            author: 'Bulk Action API',
            message: `Bulk updated status to ${newStatus}.`,
            timestamp: new Date().toISOString(),
          };
          return {
            ...lead,
            status: newStatus,
            activityHistory: [newActivity, ...lead.activityHistory],
          };
        }
        return lead;
      })
    );
    clearSelection();
  };

  const bulkAssignCounsellor = (ids: string[], counsellorId: string) => {
    const counsellorName = COUNSELLORS.find((c) => c.id === counsellorId)?.name || 'Unassigned';
    setLeads((prev) =>
      prev.map((lead) => {
        if (ids.includes(lead.id)) {
          const newActivity: ActivityLog = {
            id: `act-${Date.now()}`,
            type: 'Counsellor Assigned',
            author: 'Bulk Action API',
            message: `Bulk assigned to ${counsellorName}.`,
            timestamp: new Date().toISOString(),
          };
          return {
            ...lead,
            assignedCounsellorId: counsellorId,
            activityHistory: [newActivity, ...lead.activityHistory],
          };
        }
        return lead;
      })
    );
    clearSelection();
  };

  const deleteLead = (id: string) => {
    fetch(`/api/leads/${id}`, {
      method: 'DELETE',
    }).catch((err) => console.log('Delete API call:', err));

    setLeads((prev) => prev.filter((l) => l.id !== id));
    setSelectedLeadIds((prev) => prev.filter((i) => i !== id));
  };

  const addLeadNote = (id: string, noteText: string, author: string = 'Staff Counsellor') => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === id) {
          const newLog: ActivityLog = {
            id: `act-${Date.now()}`,
            type: 'Note',
            author,
            message: noteText,
            timestamp: new Date().toISOString(),
          };
          return {
            ...lead,
            notes: lead.notes ? `${lead.notes}\n\n[${new Date().toLocaleDateString()}] ${noteText}` : noteText,
            activityHistory: [newLog, ...lead.activityHistory],
          };
        }
        return lead;
      })
    );
  };

  const convertLeadToStudent = (id: string) => {
    const studentId = `STU-2026-${Math.floor(100 + Math.random() * 900)}`;
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === id) {
          const conversionLog: ActivityLog = {
            id: `act-${Date.now()}`,
            type: 'Status Change',
            author: 'Admissions Office API',
            message: `ENROLLED CONVERSION! Lead record converted to official Student ID #${studentId}.`,
            timestamp: new Date().toISOString(),
          };
          return {
            ...lead,
            status: 'Enrolled',
            enrolledStudentId: studentId,
            activityHistory: [conversionLog, ...lead.activityHistory],
          };
        }
        return lead;
      })
    );
  };

  const addScheduledCall = (leadId: string, date: string, time: string, notes: string) => {
    const newCall: ScheduledCall = {
      id: `call-${Date.now()}`,
      scheduledDate: date,
      scheduledTime: time,
      notes,
      completed: false,
      assignedCounsellorId: activeCounsellorId,
    };
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const callLog: ActivityLog = {
            id: `act-${Date.now()}`,
            type: 'Note',
            author: 'Scheduler Bot',
            message: `Scheduled follow-up call for ${date} at ${time}. Reminder set.`,
            timestamp: new Date().toISOString(),
          };
          return {
            ...lead,
            scheduledCalls: [newCall, ...lead.scheduledCalls],
            activityHistory: [callLog, ...lead.activityHistory],
          };
        }
        return lead;
      })
    );
  };

  const addDocumentAttachment = (leadId: string, doc: Omit<DocumentAttachment, 'id' | 'uploadDate'>) => {
    const newDoc: DocumentAttachment = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadDate: new Date().toISOString(),
    };
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const docLog: ActivityLog = {
            id: `act-${Date.now()}`,
            type: 'Note',
            author: 'Document Portal',
            message: `Uploaded document: ${doc.title} (${doc.type}).`,
            timestamp: new Date().toISOString(),
          };
          return {
            ...lead,
            documents: [newDoc, ...lead.documents],
            activityHistory: [docLog, ...lead.activityHistory],
          };
        }
        return lead;
      })
    );
  };

  const addPaymentRecord = (leadId: string, payment: Omit<PaymentRecord, 'id' | 'receiptNumber'>) => {
    const receipt = `REC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newPay: PaymentRecord = {
      ...payment,
      id: `pay-${Date.now()}`,
      receiptNumber: receipt,
    };
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const payLog: ActivityLog = {
            id: `act-${Date.now()}`,
            type: 'Payment',
            author: 'Billing Gateway API',
            message: `Received payment of $${payment.amount} via ${payment.paymentMethod}. Receipt #${receipt}.`,
            timestamp: new Date().toISOString(),
          };
          return {
            ...lead,
            payments: [newPay, ...lead.payments],
            activityHistory: [payLog, ...lead.activityHistory],
          };
        }
        return lead;
      })
    );
  };

  const resolveDuplicateFlag = (id: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === id) {
          return { ...lead, isDuplicate: false };
        }
        return lead;
      })
    );
  };

  const mergeDuplicateLeads = (primaryLeadId: string, duplicateLeadId: string) => {
    const dupLead = leads.find((l) => l.id === duplicateLeadId);
    if (!dupLead) return;

    setLeads((prev) =>
      prev
        .filter((l) => l.id !== duplicateLeadId)
        .map((lead) => {
          if (lead.id === primaryLeadId) {
            const mergedActivity: ActivityLog = {
              id: `act-${Date.now()}`,
              type: 'Note',
              author: 'Merge Engine API',
              message: `Merged duplicate enquiry from ${dupLead.entryPoint} (${dupLead.course}). Notes: "${dupLead.message || 'N/A'}"`,
              timestamp: new Date().toISOString(),
            };
            return {
              ...lead,
              isDuplicate: false,
              activityHistory: [mergedActivity, ...lead.activityHistory, ...dupLead.activityHistory],
              documents: [...lead.documents, ...dupLead.documents],
              payments: [...lead.payments, ...dupLead.payments],
            };
          }
          return lead;
        })
    );
    clearSelection();
  };

  const logCompletedCall = (leadId: string, durationSeconds: number, summaryNotes: string) => {
    const mins = Math.floor(durationSeconds / 60);
    const secs = durationSeconds % 60;
    const durText = `${mins}m ${secs}s`;

    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const callLog: ActivityLog = {
            id: `act-${Date.now()}`,
            type: 'Call Log',
            author: COUNSELLORS.find(c => c.id === activeCounsellorId)?.name || 'Counsellor',
            message: `Outbound call completed (${durText}). Remarks: "${summaryNotes || 'No notes entered.'}"`,
            timestamp: new Date().toISOString(),
          };
          return {
            ...lead,
            status: lead.status === 'New' ? 'Contacted' : lead.status,
            activityHistory: [callLog, ...lead.activityHistory],
          };
        }
        return lead;
      })
    );
  };

  const resetData = () => {
    setLeads(INITIAL_LEADS);
    localStorage.removeItem(STORAGE_KEY);
    clearSelection();
    resetFilters();
  };

  const getFilteredLeads = () => {
    return leads.filter((lead) => {
      if (currentRole === 'Counsellor' && lead.assignedCounsellorId !== activeCounsellorId) {
        return false;
      }

      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const nameMatch = lead.name.toLowerCase().includes(query);
        const phoneMatch = lead.phone.toLowerCase().includes(query);
        const emailMatch = lead.email.toLowerCase().includes(query);
        const cityMatch = lead.city.toLowerCase().includes(query);
        if (!nameMatch && !phoneMatch && !emailMatch && !cityMatch) return false;
      }

      if (filters.status !== 'All' && lead.status !== filters.status) return false;
      if (filters.course !== 'All' && lead.course !== filters.course) return false;
      if (filters.source !== 'All' && lead.source !== filters.source) return false;
      if (filters.counsellorId !== 'All' && lead.assignedCounsellorId !== filters.counsellorId) return false;
      if (filters.city !== 'All' && lead.city !== filters.city) return false;
      if (filters.duplicateOnly && !lead.isDuplicate) return false;

      return true;
    });
  };

  return (
    <LeadContext.Provider
      value={{
        leads: getFilteredLeads(),
        allLeadsUnfiltered: leads,
        counsellors,
        activeView,
        setActiveView,
        kanbanViewMode,
        setKanbanViewMode,
        currentRole,
        setCurrentRole,
        activeCounsellorId,
        setActiveCounsellorId,
        filters,
        setFilters,
        resetFilters,
        selectedLeadIds,
        toggleSelectLead,
        toggleSelectAll,
        clearSelection,
        addLeadFromWebsite,
        updateLeadStatus,
        assignCounsellor,
        bulkUpdateStatus,
        bulkAssignCounsellor,
        deleteLead,
        addLeadNote,
        resolveDuplicateFlag,
        mergeDuplicateLeads,
        convertLeadToStudent,
        addScheduledCall,
        addDocumentAttachment,
        addPaymentRecord,
        activeDialerLead,
        openDialer: (lead) => setActiveDialerLead(lead),
        closeDialer: () => setActiveDialerLead(null),
        logCompletedCall,
        activeMessageComposer,
        openMessageComposer: (lead, channel) => setActiveMessageComposer({ lead, channel }),
        closeMessageComposer: () => setActiveMessageComposer(null),
        resetData,
        lastAckModal,
        closeAckModal: () => setLastAckModal(null),
        activeDuplicateReview,
        closeDuplicateReview: () => setActiveDuplicateReview(null),
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLeadStore = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeadStore must be used within a LeadProvider');
  }
  return context;
};
