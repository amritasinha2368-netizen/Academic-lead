import { Lead, LeadStatus, DuplicateCheckResult, ActivityLog } from './types';
import { INITIAL_LEADS, COUNSELLORS } from './mock-data';

let serverLeadsDb: Lead[] = [...INITIAL_LEADS];

export function getServerLeads(filters?: {
  searchQuery?: string;
  status?: string;
  course?: string;
  source?: string;
  counsellorId?: string;
}): Lead[] {
  let result = [...serverLeadsDb];

  if (!filters) return result;

  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    const q = filters.searchQuery.toLowerCase();
    result = result.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q)
    );
  }

  if (filters.status && filters.status !== 'All') {
    result = result.filter((l) => l.status === filters.status);
  }

  if (filters.course && filters.course !== 'All') {
    result = result.filter((l) => l.course === filters.course);
  }

  if (filters.source && filters.source !== 'All') {
    result = result.filter((l) => l.source === filters.source);
  }

  if (filters.counsellorId && filters.counsellorId !== 'All') {
    result = result.filter((l) => l.assignedCounsellorId === filters.counsellorId);
  }

  return result;
}

export function getServerLeadById(id: string): Lead | undefined {
  return serverLeadsDb.find((l) => l.id === id);
}

export function checkServerDuplicate(phone: string, email: string): DuplicateCheckResult {
  const cleanPhone = phone.replace(/\D/g, '');
  const cleanEmail = email.toLowerCase().trim();

  for (const lead of serverLeadsDb) {
    const p = lead.phone.replace(/\D/g, '');
    const e = lead.email.toLowerCase().trim();

    const phoneMatch = cleanPhone.length > 5 && p === cleanPhone;
    const emailMatch = cleanEmail.length > 3 && e === cleanEmail;

    if (phoneMatch && emailMatch) {
      return { isDuplicate: true, matchingLead: lead, matchReason: 'both' };
    } else if (phoneMatch) {
      return { isDuplicate: true, matchingLead: lead, matchReason: 'phone' };
    } else if (emailMatch) {
      return { isDuplicate: true, matchingLead: lead, matchReason: 'email' };
    }
  }

  return { isDuplicate: false };
}

export function createServerLead(newLeadData: Partial<Lead>): { lead: Lead; duplicateResult: DuplicateCheckResult } {
  const dupResult = checkServerDuplicate(newLeadData.phone || '', newLeadData.email || '');

  const unassignedCounsellor = COUNSELLORS[Math.floor(Math.random() * COUNSELLORS.length)].id;

  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    name: newLeadData.name || 'Anonymous Student',
    phone: newLeadData.phone || '',
    alternatePhone: newLeadData.alternatePhone || '',
    email: newLeadData.email || '',
    address: newLeadData.address || '',
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
    utmMedium: newLeadData.utmMedium || 'cpc',
    utmCampaign: newLeadData.utmCampaign || 'organic',
    entryPoint: newLeadData.entryPoint || 'Enroll Form',
    assignedCounsellorId: newLeadData.assignedCounsellorId || unassignedCounsellor,
    dateAdded: new Date().toISOString(),
    isDuplicate: dupResult.isDuplicate,
    duplicateCount: dupResult.isDuplicate ? (dupResult.matchingLead?.duplicateCount || 1) + 1 : 0,
    duplicateOfId: dupResult.isDuplicate ? dupResult.matchingLead?.id : undefined,
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
        author: 'System Auto-Ack API',
        message: 'Automated Thank You Email, SMS & WhatsApp dispatched.',
        timestamp: new Date().toISOString(),
      },
    ],
    documents: [],
    payments: [],
    scheduledCalls: [],
    callRecordings: [],
  };

  serverLeadsDb = [newLead, ...serverLeadsDb];
  return { lead: newLead, duplicateResult: dupResult };
}

export function updateServerLead(id: string, updates: Partial<Lead>): Lead | undefined {
  let updatedLead: Lead | undefined;

  serverLeadsDb = serverLeadsDb.map((lead) => {
    if (lead.id === id) {
      updatedLead = { ...lead, ...updates };
      return updatedLead;
    }
    return lead;
  });

  return updatedLead;
}

export function deleteServerLead(id: string): boolean {
  const initialLength = serverLeadsDb.length;
  serverLeadsDb = serverLeadsDb.filter((l) => l.id !== id);
  return serverLeadsDb.length < initialLength;
}

export function bulkUpdateServerStatus(ids: string[], status: LeadStatus): number {
  let count = 0;
  serverLeadsDb = serverLeadsDb.map((lead) => {
    if (ids.includes(lead.id)) {
      count++;
      return { ...lead, status };
    }
    return lead;
  });
  return count;
}
