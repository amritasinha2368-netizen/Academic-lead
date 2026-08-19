import { Lead, LeadStatus, LeadSource, Qualification, PreferredBatch } from './types';
import { INITIAL_LEADS } from './mock-data';

let SERVER_LEADS_DB: Lead[] = [...INITIAL_LEADS];

export async function getServerLeads(): Promise<Lead[]> {
  return SERVER_LEADS_DB;
}

export async function getServerLeadById(id: string): Promise<Lead | null> {
  const found = SERVER_LEADS_DB.find((l) => l.id === id);
  return found || null;
}

export async function createServerLead(newLeadData: Partial<Lead>): Promise<Lead> {
  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    name: newLeadData.name || '12th Pass Applicant',
    phone: newLeadData.phone || '',
    alternatePhone: newLeadData.alternatePhone || '',
    email: newLeadData.email || '',
    city: newLeadData.city || 'San Francisco',
    course: newLeadData.course || 'B.Tech Computer Science & AI',
    qualification: (newLeadData.qualification as Qualification) || '12th Science (PCM)',
    class12Percentage: newLeadData.class12Percentage || 88,
    preferredBatch: (newLeadData.preferredBatch as PreferredBatch) || 'Regular Morning College Batch',
    graduationYear: '2026 12th Pass',
    workExperience: 'Fresh 12th Graduate',
    message: newLeadData.message || '',
    status: (newLeadData.status as LeadStatus) || 'New',
    source: (newLeadData.source as LeadSource) || 'Homepage',
    utmSource: newLeadData.utmSource || 'website',
    utmMedium: newLeadData.utmMedium || 'organic',
    utmCampaign: newLeadData.utmCampaign || 'undergrad_admissions_2026',
    entryPoint: newLeadData.entryPoint || '12th Application Form',
    assignedCounsellorId: newLeadData.assignedCounsellorId || 'counsellor-1',
    dateAdded: new Date().toISOString(),
    isDuplicate: false,
    totalCourseFee: 4800,
    activityHistory: [
      {
        id: `act-${Date.now()}-1`,
        type: 'Auto-Acknowledgement',
        author: 'Server Ingestion API',
        message: 'Lead created in server database & 12th College Prospectus dispatched.',
        timestamp: new Date().toISOString(),
      },
    ],
    documents: [],
    payments: [],
    scheduledCalls: [],
    callRecordings: [],
  };

  SERVER_LEADS_DB = [newLead, ...SERVER_LEADS_DB];
  return newLead;
}

export async function updateServerLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  let updatedLead: Lead | null = null;
  SERVER_LEADS_DB = SERVER_LEADS_DB.map((lead) => {
    if (lead.id === id) {
      updatedLead = { ...lead, ...updates };
      return updatedLead;
    }
    return lead;
  });
  return updatedLead;
}

export async function bulkUpdateServerStatus(ids: string[], status: LeadStatus): Promise<number> {
  let count = 0;
  SERVER_LEADS_DB = SERVER_LEADS_DB.map((lead) => {
    if (ids.includes(lead.id)) {
      count++;
      return { ...lead, status };
    }
    return lead;
  });
  return count;
}

export async function deleteServerLead(id: string): Promise<boolean> {
  const initialLen = SERVER_LEADS_DB.length;
  SERVER_LEADS_DB = SERVER_LEADS_DB.filter((l) => l.id !== id);
  return SERVER_LEADS_DB.length < initialLen;
}
