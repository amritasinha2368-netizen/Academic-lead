export type LeadStatus = 
  | 'New' 
  | 'Assigned' 
  | 'Contacted' 
  | 'Follow-up'
  | 'Interested' 
  | 'Counselling' 
  | 'Visit' 
  | 'Application' 
  | 'Documents' 
  | 'Payment' 
  | 'Enrolled' 
  | 'Dropped';

export type LeadSource = 
  | 'Homepage' 
  | 'Google Ads' 
  | 'Instagram' 
  | 'Referral' 
  | 'Walk-in' 
  | 'Brochure Gate' 
  | 'Callback Request'
  | 'AI Chatbot'
  | 'Events'
  | 'Meta Ads';

export type Qualification = 
  | 'High School' 
  | 'Undergraduate' 
  | 'Postgraduate' 
  | 'Working Professional' 
  | 'Other';

export type PreferredBatch = 
  | 'Morning (9 AM - 12 PM)' 
  | 'Evening (6 PM - 9 PM)' 
  | 'Weekend (Sat-Sun)';

export type UserRole = 
  | 'Super Admin' 
  | 'Team Leader' 
  | 'Counsellor' 
  | 'Marketing Admin' 
  | 'Finance';

export type LostReason = 
  | 'Not Interested' 
  | 'No Response' 
  | 'Wrong Number' 
  | 'Duplicate' 
  | 'Fee-Location-Timing Issue' 
  | 'Competitor' 
  | 'Future Requirement' 
  | 'Unqualified';

export type CallDisposition = 
  | 'Connected' 
  | 'Busy' 
  | 'No Answer' 
  | 'Wrong Number' 
  | 'Interested' 
  | 'Not Interested' 
  | 'Call Back' 
  | 'Follow-up';

export type DocumentStatus = 'Pending' | 'Approved' | 'Rejected' | 'Missing';

export interface Counsellor {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'Senior Counsellor' | 'Admissions Manager' | 'Academic Advisor' | 'Team Lead';
  assignedLeadCount?: number;
}

export interface ActivityLog {
  id: string;
  type: 'Note' | 'Status Change' | 'Counsellor Assigned' | 'Auto-Acknowledgement' | 'Duplicate Alert' | 'Call Log' | 'Direct Message' | 'Payment' | 'Document Verification' | 'Manager Escalation';
  author: string;
  message: string;
  timestamp: string;
}

export interface CallRecording {
  id: string;
  url: string;
  durationSeconds: number;
  timestamp: string;
  direction: 'Outbound' | 'Inbound';
  counsellorName: string;
  disposition: CallDisposition;
  transcriptionText: string;
  aiSummary: string;
  aiObjections: string[];
  aiNextBestAction: string;
  aiCallScore: number; // 0 - 100
  scoreBreakdown: {
    greeting: number;
    discovery: number;
    explanation: number;
    objectionHandling: number;
    closing: number;
  };
}

export interface DocumentAttachment {
  id: string;
  title: string;
  type: 'Dissertation' | 'ID Proof' | 'Marksheet' | 'Certificate' | 'Address Proof';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  fileUrl?: string;
  abstractText?: string;
  status: DocumentStatus;
  verifierNotes?: string;
  ocrAlerts?: string[];
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  paymentMethod: 'Credit Card' | 'Bank Transfer' | 'Installment Plan' | 'Scholarship Grant';
  status: 'Paid' | 'Pending';
  receiptNumber: string;
  notes?: string;
}

export interface ScheduledCall {
  id: string;
  scheduledDate: string;
  scheduledTime: string;
  notes: string;
  completed: boolean;
  assignedCounsellorId: string;
  isOverdue?: boolean;
}

export interface CampaignROI {
  id: string;
  campaignName: string;
  source: LeadSource;
  spend: number;
  leadsCount: number;
  qualifiedLeads: number;
  applications: number;
  admissions: number;
  cpl: number;
  cac: number;
  roiPercent: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  targetLeadId: string;
  leadName: string;
  fieldChanged?: string;
  oldValue?: string;
  newValue?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  address?: string;
  city: string;
  center?: string;
  batch?: string;
  course: string;
  qualification: Qualification;
  preferredBatch: PreferredBatch;
  graduationYear?: string;
  workExperience?: string;
  message?: string;
  status: LeadStatus;
  source: LeadSource;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  entryPoint: 'Enroll Form' | 'Callback Modal' | 'Brochure Download' | 'Manual Add' | 'AI Chatbot';
  assignedCounsellorId?: string;
  dateAdded: string;
  isDuplicate?: boolean;
  duplicateCount?: number;
  duplicateOfId?: string;
  enrolledStudentId?: string;
  totalCourseFee?: number;
  lostReason?: LostReason;
  lostReasonNotes?: string;
  escalatedToManager?: boolean;
  aiLeadScore?: number;
  ackSent?: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    timestamp: string;
  };
  notes?: string;
  activityHistory: ActivityLog[];
  documents: DocumentAttachment[];
  payments: PaymentRecord[];
  scheduledCalls: ScheduledCall[];
  callRecordings: CallRecording[];
}

export interface FilterOptions {
  searchQuery: string;
  status: LeadStatus | 'All';
  course: string | 'All';
  source: LeadSource | 'All';
  counsellorId: string | 'All';
  city: string | 'All';
  duplicateOnly: boolean;
  overdueOnly?: boolean;
  escalatedOnly?: boolean;
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  matchingLead?: Lead;
  matchReason?: 'phone' | 'email' | 'both';
}
