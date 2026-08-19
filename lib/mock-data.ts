import { Lead, Counsellor, CampaignROI, AutomationRule, AuditLogEntry, CallRecording } from './types';

export const COURSES = [
  'Data Science & AI Master Bootcamp',
  'Full Stack Web Development (MERN)',
  'UI/UX Product Design Specialist',
  'Cybersecurity & Ethical Hacking',
  'Digital Marketing & Growth Lead',
  'Cloud Computing & DevOps Engineering'
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
  'Downtown Innovation Hub',
  'Silicon Valley Campus',
  'Manhattan Tech Center',
  'Austin Innovation Park',
  'Online Virtual Campus'
];

export const COUNSELLORS: Counsellor[] = [
  {
    id: 'counsellor-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@auraacademy.edu',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'Senior Counsellor'
  },
  {
    id: 'counsellor-2',
    name: 'Marcus Chen',
    email: 'marcus.c@auraacademy.edu',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Admissions Manager'
  },
  {
    id: 'counsellor-3',
    name: 'Priya Sharma',
    email: 'priya.s@auraacademy.edu',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'Academic Advisor'
  },
  {
    id: 'counsellor-4',
    name: 'David Kim',
    email: 'david.k@auraacademy.edu',
    phone: '+1 (555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Senior Counsellor'
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
    center: 'Downtown Innovation Hub',
    course: 'Data Science & AI Master Bootcamp',
    qualification: 'Postgraduate',
    preferredBatch: 'Morning (9 AM - 12 PM)',
    graduationYear: '2024',
    workExperience: '2 Years in Analytics',
    message: 'Looking for advanced AI project-based learning with placement assistance.',
    status: 'Interested',
    source: 'Google Ads',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'google_cpc_ai_master',
    entryPoint: 'Enroll Form',
    assignedCounsellorId: 'counsellor-1',
    dateAdded: '2026-08-16T08:30:00Z',
    isDuplicate: false,
    totalCourseFee: 3200,
    aiLeadScore: 92,
    ackSent: {
      email: true,
      sms: true,
      whatsapp: true,
      timestamp: '2026-08-16T08:30:05Z'
    },
    notes: 'Very interested in AI & Deep Learning modules. Requested weekend demo class link.',
    activityHistory: [
      {
        id: 'act-101-1',
        type: 'Auto-Acknowledgement',
        author: 'System Auto-Ack API',
        message: 'Automated Thank You Email, SMS & WhatsApp dispatched.',
        timestamp: '2026-08-16T08:30:05Z'
      },
      {
        id: 'act-101-2',
        type: 'Call Log',
        author: 'Sarah Jenkins',
        message: 'Outbound call connected. Discussed curriculum & placement assistance.',
        timestamp: '2026-08-16T11:15:00Z'
      }
    ],
    documents: [
      {
        id: 'doc-1',
        title: 'B.Tech Degree Certificate & Marksheet',
        type: 'Marksheet',
        fileName: 'Rohan_Mehta_Degree.pdf',
        fileSize: '2.4 MB',
        uploadDate: '2026-08-16T09:00:00Z',
        status: 'Approved'
      }
    ],
    payments: [
      {
        id: 'pay-1',
        amount: 500,
        date: '2026-08-16T12:00:00Z',
        paymentMethod: 'Credit Card',
        status: 'Paid',
        receiptNumber: 'REC-2026-901',
        notes: 'Seat reservation fee paid.'
      }
    ],
    scheduledCalls: [
      {
        id: 'call-1',
        scheduledDate: '2026-08-18',
        scheduledTime: '11:00',
        notes: 'Discuss installment payment plan.',
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
        transcriptionText: 'Hi Rohan! Following up on your Data Science & AI Master Bootcamp application. We discussed batch timing and placement support.',
        aiSummary: 'Student interested in Morning Batch. Requested fee installment plan.',
        aiObjections: ['Fee structure', 'Weekend vs Morning timing'],
        aiNextBestAction: 'Send WhatsApp fee receipt link & schedule follow-up call.',
        aiCallScore: 92,
        scoreBreakdown: { greeting: 18, discovery: 19, explanation: 19, objectionHandling: 18, closing: 18 }
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
    center: 'Manhattan Tech Center',
    course: 'Full Stack Web Development (MERN)',
    qualification: 'Undergraduate',
    preferredBatch: 'Evening (6 PM - 9 PM)',
    graduationYear: '2025',
    workExperience: 'None',
    message: 'Interested in evening batch for web dev bootcamp.',
    status: 'New',
    source: 'Instagram',
    utmSource: 'instagram',
    utmMedium: 'social_story',
    utmCampaign: 'insta_story_promo',
    entryPoint: 'Callback Modal',
    assignedCounsellorId: 'counsellor-2',
    dateAdded: '2026-08-16T09:15:00Z',
    isDuplicate: false,
    totalCourseFee: 2800,
    aiLeadScore: 85,
    ackSent: {
      email: true,
      sms: true,
      whatsapp: true,
      timestamp: '2026-08-16T09:15:04Z'
    },
    notes: 'New enquiry from Instagram Story Ad.',
    activityHistory: [
      {
        id: 'act-102-1',
        type: 'Auto-Acknowledgement',
        author: 'System Auto-Ack API',
        message: 'Automated Thank You Email, SMS & WhatsApp dispatched.',
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
    course: 'UI/UX Product Design Specialist',
    qualification: 'Working Professional',
    preferredBatch: 'Weekend (Sat-Sun)',
    status: 'Contacted',
    source: 'Referral',
    entryPoint: 'Enroll Form',
    assignedCounsellorId: 'counsellor-3',
    dateAdded: '2026-08-15T14:10:00Z',
    isDuplicate: false,
    totalCourseFee: 2500,
    aiLeadScore: 88,
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
    campaignName: 'Google Search - AI & Data Science Master',
    source: 'Google Ads',
    spend: 4200,
    leadsCount: 100,
    qualifiedLeads: 48,
    applications: 22,
    admissions: 12,
    cpl: 42,
    cac: 350,
    roiPercent: 340
  },
  {
    id: 'camp-2',
    campaignName: 'Meta Instagram Stories - MERN & Web Dev',
    source: 'Instagram',
    spend: 2800,
    leadsCount: 85,
    qualifiedLeads: 35,
    applications: 14,
    admissions: 8,
    cpl: 32.9,
    cac: 350,
    roiPercent: 280
  }
];

export const MOCK_CAMPAIGN_ROI = CAMPAIGN_ROI_DATA;

export const AUTOMATION_RULES: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'Auto-Assign High Intent AI Leads to Senior Telecaller',
    trigger: 'Lead Source = Google Ads AND Course = Data Science & AI',
    action: 'Assign to Sarah Jenkins & Send Instant WhatsApp Brochure',
    enabled: true
  }
];

export const AUDIT_TRAIL_LOGS: AuditLogEntry[] = [
  {
    id: 'audit-1',
    timestamp: '2026-08-16T10:30:00Z',
    user: 'Marcus Chen',
    role: 'Team Leader',
    action: 'Lead Reassignment',
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
    action: 'Status Pipeline Update',
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
    transcriptionText: 'Hi Rohan! Following up on your Data Science & AI Master Bootcamp application. We discussed batch timing and placement support.',
    aiSummary: 'Student interested in Morning Batch. Requested fee installment plan.',
    aiObjections: ['Fee structure', 'Weekend vs Morning timing'],
    aiNextBestAction: 'Send WhatsApp fee receipt link & schedule follow-up call.',
    aiCallScore: 92,
    scoreBreakdown: { greeting: 18, discovery: 19, explanation: 19, objectionHandling: 18, closing: 18 }
  }
];
