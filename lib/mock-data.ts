import { Lead, Counsellor, CampaignROI, AutomationRule, AuditLogEntry, CallRecording } from './types';

export const COURSES = [
  'B.Tech Computer Science & AI',
  'B.Tech Information Technology & Robotics',
  'BBA (Bachelor of Business Administration)',
  'B.Sc Computer Science & Data Analytics',
  'BCA (Bachelor of Computer Applications)',
  'B.Com (Hons) International Finance',
  'BA (Hons) Journalism & Digital Media',
  'B.Des (Bachelor of Product & UI/UX Design)'
];

export const CITIES = [
  'San Francisco',
  'New York',
  'Austin',
  'Seattle',
  'Chicago',
  'Toronto',
  'London',
  'Remote / Online'
];

export const CENTERS = [
  'Downtown Campus',
  'Innovation Engineering Block',
  'Manhattan College Campus',
  'Austin Science Wing',
  'Online Virtual Classroom'
];

export const COUNSELLORS: Counsellor[] = [
  {
    id: 'counsellor-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@auraacademy.edu',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'College Admissions Officer'
  },
  {
    id: 'counsellor-2',
    name: 'Marcus Chen',
    email: 'marcus.c@auraacademy.edu',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Head of Undergrad Admissions'
  },
  {
    id: 'counsellor-3',
    name: 'Priya Sharma',
    email: 'priya.s@auraacademy.edu',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: '12th Pass Academic Advisor'
  },
  {
    id: 'counsellor-4',
    name: 'David Kim',
    email: 'david.k@auraacademy.edu',
    phone: '+1 (555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Undergrad Admissions Counsellor'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-101',
    name: 'Rohan Mehta',
    phone: '+1 (555) 912-3456',
    alternatePhone: '+1 (555) 912-9999',
    email: 'rohan.mehta@example.com',
    address: '450 Mission St, Suite 200',
    city: 'San Francisco',
    center: 'Downtown Campus',
    course: 'B.Tech Computer Science & AI',
    qualification: '12th Science (PCM)',
    class12Percentage: 88.5,
    preferredBatch: 'Regular Morning College Batch',
    graduationYear: '2026 12th Pass',
    workExperience: 'Fresh 12th Graduate',
    message: 'Just passed 12th Science (PCM) with 88.5% marks. Looking for B.Tech CSE Admission 2026.',
    status: 'Interested',
    source: 'Google Ads',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'btech_cs_admissions_2026',
    entryPoint: 'College Application Form',
    assignedCounsellorId: 'counsellor-1',
    dateAdded: '2026-08-16T08:30:00Z',
    isDuplicate: false,
    totalCourseFee: 4800,
    aiLeadScore: 94,
    ackSent: {
      email: true,
      sms: true,
      whatsapp: true,
      timestamp: '2026-08-16T08:30:05Z'
    },
    notes: 'Completed 12th Grade PCM with distinction. Inquiring about scholarship seats and hostel facilities.',
    activityHistory: [
      {
        id: 'act-101-1',
        type: 'Auto-Acknowledgement',
        author: 'Admissions System API',
        message: 'Automated 12th Admission Brochure, Prospectus & Welcome Code sent via Email, SMS & WhatsApp.',
        timestamp: '2026-08-16T08:30:05Z'
      },
      {
        id: 'act-101-2',
        type: 'Call Log',
        author: 'Sarah Jenkins',
        message: 'Connected call with Rohan and his parents. Discussed 12th marks eligibility and B.Tech CSE labs.',
        timestamp: '2026-08-16T11:15:00Z'
      }
    ],
    documents: [
      {
        id: 'doc-1',
        title: 'Class 12th Board Marksheet & Certificate',
        type: '12th Marksheet',
        fileName: 'Rohan_12th_PCM_Marksheet.pdf',
        fileSize: '1.8 MB',
        uploadDate: '2026-08-16T09:00:00Z',
        status: 'Approved'
      }
    ],
    payments: [
      {
        id: 'pay-1',
        amount: 600,
        date: '2026-08-16T12:00:00Z',
        paymentMethod: 'Credit Card',
        status: 'Paid',
        receiptNumber: 'REC-2026-901',
        notes: '12th Admission Seat Lock Booking Fee Paid.'
      }
    ],
    scheduledCalls: [
      {
        id: 'call-1',
        scheduledDate: '2026-08-18',
        scheduledTime: '11:00',
        notes: 'Campus visit appointment with student and parents.',
        completed: false,
        assignedCounsellorId: 'counsellor-1'
      }
    ],
    callRecordings: [
      {
        id: 'rec-101',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        durationSeconds: 185,
        timestamp: '2026-08-16T11:15:00Z',
        direction: 'Outbound',
        counsellorName: 'Sarah Jenkins',
        disposition: 'Interested',
        transcriptionText: 'Hello Rohan! Congratulations on passing 12th PCM with 88.5%. We discussed B.Tech CSE seat allocation and campus tour dates.',
        aiSummary: 'Student passed 12th PCM. Applying for B.Tech Computer Science & AI 4-Year Degree.',
        aiObjections: ['Hostel availability', 'Merit scholarship threshold'],
        aiNextBestAction: 'Send campus prospectus and schedule parent counseling session.',
        aiCallScore: 95,
        scoreBreakdown: { greeting: 19, discovery: 19, explanation: 19, objectionHandling: 19, closing: 19 }
      }
    ]
  },
  {
    id: 'lead-102',
    name: 'Emily Watson',
    phone: '+1 (555) 823-4567',
    alternatePhone: '',
    email: 'emily.w@example.com',
    address: '120 Market St',
    city: 'New York',
    center: 'Manhattan College Campus',
    course: 'BBA (Bachelor of Business Administration)',
    qualification: '12th Commerce',
    class12Percentage: 91.2,
    preferredBatch: 'Day Honors College Batch',
    graduationYear: '2026 12th Pass',
    workExperience: 'Fresh 12th Graduate',
    message: 'Passed 12th Commerce with 91.2%. Searching for 3-Year BBA Honors College Admission.',
    status: 'New',
    source: 'Instagram',
    utmSource: 'instagram',
    utmMedium: 'social_story',
    utmCampaign: 'undergrad_bba_2026',
    entryPoint: 'Callback Modal',
    assignedCounsellorId: 'counsellor-2',
    dateAdded: '2026-08-16T09:15:00Z',
    isDuplicate: false,
    totalCourseFee: 4200,
    aiLeadScore: 89,
    ackSent: {
      email: true,
      sms: true,
      whatsapp: true,
      timestamp: '2026-08-16T09:15:04Z'
    },
    notes: 'Inquiring about 12th Commerce cutoff marks and international student exchange program.',
    activityHistory: [
      {
        id: 'act-102-1',
        type: 'Auto-Acknowledgement',
        author: 'Admissions System API',
        message: 'Automated 12th Commerce BBA Admission Prospectus sent.',
        timestamp: '2026-08-16T09:15:04Z'
      }
    ],
    documents: [],
    payments: [],
    scheduledCalls: [],
    callRecordings: []
  },
  {
    id: 'lead-103',
    name: 'Sophia Martinez',
    phone: '+1 (555) 734-5678',
    email: 'sophia.m@example.com',
    city: 'Austin',
    course: 'B.Des (Bachelor of Product & UI/UX Design)',
    qualification: '12th Arts / Humanities',
    class12Percentage: 86.0,
    preferredBatch: 'Regular Morning College Batch',
    status: 'Contacted',
    source: 'Referral',
    entryPoint: 'Application Form',
    assignedCounsellorId: 'counsellor-3',
    dateAdded: '2026-08-15T14:10:00Z',
    isDuplicate: false,
    totalCourseFee: 3900,
    aiLeadScore: 90,
    activityHistory: [],
    documents: [],
    payments: [],
    scheduledCalls: [],
    callRecordings: []
  }
];

export const CAMPAIGN_ROI_DATA: CampaignROI[] = [
  {
    id: 'camp-1',
    campaignName: 'Google Search - 12th Pass B.Tech Admissions 2026',
    source: 'Google Ads',
    spend: 4200,
    leadsCount: 120,
    qualifiedLeads: 85,
    applications: 42,
    admissions: 28,
    cpl: 35,
    cac: 150,
    roiPercent: 520
  },
  {
    id: 'camp-2',
    campaignName: 'Instagram Stories - Class 12th BBA & BCA College Search',
    source: 'Instagram',
    spend: 2800,
    leadsCount: 95,
    qualifiedLeads: 60,
    applications: 32,
    admissions: 20,
    cpl: 29.4,
    cac: 140,
    roiPercent: 440
  }
];

export const MOCK_CAMPAIGN_ROI = CAMPAIGN_ROI_DATA;

export const AUTOMATION_RULES: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'Auto-Assign High 12th Board Marks (>85%) to Senior Admissions Officer',
    trigger: 'Qualification = 12th Science PCM AND Board Marks > 85%',
    action: 'Assign to Marcus Chen & Send Instant Admission Form Code',
    enabled: true
  }
];

export const AUDIT_TRAIL_LOGS: AuditLogEntry[] = [
  {
    id: 'audit-1',
    timestamp: '2026-08-16T10:30:00Z',
    user: 'Marcus Chen',
    role: 'Team Leader',
    action: '12th Application Reassignment',
    targetLeadId: 'lead-103',
    leadName: 'David Kim',
    fieldChanged: 'Assigned Counsellor',
    oldValue: 'Priya Sharma',
    newValue: 'Marcus Chen'
  },
  {
    id: 'audit-2',
    timestamp: '2026-08-15T14:20:00Z',
    user: 'Sarah Jenkins',
    role: 'Counsellor',
    action: 'Undergrad Status Update',
    targetLeadId: 'lead-101',
    leadName: 'Rohan Mehta',
    fieldChanged: 'Status Stage',
    oldValue: 'New',
    newValue: 'Interested'
  }
];

export const MOCK_AUDIT_TRAIL = AUDIT_TRAIL_LOGS;

export const MOCK_CALL_RECORDINGS: CallRecording[] = [
  {
    id: 'rec-101',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    durationSeconds: 185,
    timestamp: '2026-08-16T11:15:00Z',
    direction: 'Outbound',
    counsellorName: 'Sarah Jenkins',
    disposition: 'Interested',
    transcriptionText: 'Hello Rohan! Congratulations on passing 12th PCM with 88.5%. We discussed B.Tech CSE seat allocation and campus tour dates.',
    aiSummary: 'Student passed 12th PCM. Applying for B.Tech Computer Science & AI 4-Year Degree.',
    aiObjections: ['Hostel availability', 'Merit scholarship threshold'],
    aiNextBestAction: 'Send campus prospectus and schedule parent counseling session.',
    aiCallScore: 95,
    scoreBreakdown: { greeting: 19, discovery: 19, explanation: 19, objectionHandling: 19, closing: 19 }
  }
];
