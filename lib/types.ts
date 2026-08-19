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

export type CallDisposition = LeadStatus;

export type LostReason = 
  | 'Not Interested'
  | 'No Response'
  | 'Wrong Number'
  | 'Duplicate'
  | 'Fee-Location-Timing Issue'
  | 'Competitor'
  | 'Future Requirement'
  | 'Unqualified'
  | 'Fees Too High' 
  | 'Joined Another College' 
  | 'Course Not Available' 
  | 'Location Constraint' 
  | 'Not Eligible' 
  | 'Other';

export type LeadSource = 
  | 'Homepage' 
  | 'Google Ads' 
  | 'Instagram' 
  | 'Referral' 
  | 'Walk-in' 
  | 'Brochure Gate' 
  | 'Callback Request' 
  | 'AI Chatbot';

export type UserRole = 
  | 'Super Admin' 
  | 'Team Leader' 
  | 'Counsellor' 
  | 'Marketing Admin' 
  | 'Finance';

/* 12th Pass High School Stream Qualification */
export type Qualification = 
  | '12th Science (PCM)'
  | '12th Science (PCB)'
  | '12th Commerce'
  | '12th Arts / Humanities'
  | '12th Pass (Awaiting Result)';

export type PreferredBatch = 
  | 'Regular Morning College Batch' 
  | 'Day Honors College Batch' 
  | 'Integrated Hostel Batch';

export type DocumentStatus = 'Pending' | 'Approved' | 'Rejected';

export interface ActivityLog {
  id: string;
  type: 'Note' | 'Status Change' | 'Counsellor Assigned' | 'Auto-Acknowledgement' | 'Call Log' | 'Payment' | 'Document Verification';
  author: string;
  message: string;
  timestamp: string;
}

export interface DocumentAttachment {
  id: string;
  title: string;
  type: '12th Marksheet' | 'ID Proof' | 'Transfer Certificate' | 'Admit Card';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  abstractText?: string;
  status: DocumentStatus;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  paymentMethod: 'Credit Card' | 'Bank Transfer' | 'Installment Plan' | 'UPI';
  status: 'Paid' | 'Pending' | 'Refunded';
  receiptNumber: string;
  notes?: string;
}

export interface ScheduledCall {
  id: string;
  scheduledDate: string;
  scheduledTime: string;
  notes: string;
  completed: boolean;
  assignedCounsellorId?: string;
  isOverdue?: boolean;
}

export interface CallRecording {
  id: string;
  url: string;
  durationSeconds: number;
  timestamp: string;
  direction: 'Inbound' | 'Outbound';
  counsellorName: string;
  disposition: LeadStatus;
  transcriptionText: string;
  aiSummary: string;
  aiObjections: string[];
  aiNextBestAction: string;
  aiCallScore: number;
  scoreBreakdown: {
    greeting: number;
    discovery: number;
    explanation: number;
    objectionHandling: number;
    closing: number;
  };
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
  course: string; // Target College Degree (B.Tech, BBA, BCA, B.Sc)
  qualification: Qualification; // 12th Pass Stream
  class12Percentage?: number; // 12th Board Marks %
  preferredBatch: PreferredBatch;
  graduationYear?: string; // 2026 12th Pass
  workExperience?: string;
  message?: string;
  status: LeadStatus;
  source: LeadSource;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  entryPoint?: string;
  assignedCounsellorId?: string;
  dateAdded: string;
  isDuplicate?: boolean;
  duplicateCount?: number;
  duplicateOfId?: string;
  aiLeadScore?: number;
  totalCourseFee?: number;
  enrolledStudentId?: string;
  escalatedToManager?: boolean;
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

export interface Counsellor {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
}

export interface FilterOptions {
  searchQuery: string;
  status: LeadStatus | 'All';
  course: string;
  source: LeadSource | 'All';
  counsellorId: string;
  city: string;
  duplicateOnly: boolean;
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  matchingLead?: Lead;
  matchReason?: 'phone' | 'email' | 'both';
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
