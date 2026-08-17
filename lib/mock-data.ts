import { Lead, Counsellor, CampaignROI, AutomationRule, AuditLogEntry } from './types';

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
    name: 'Alex Rivera',
    email: 'alex.r@auraacademy.edu',
    phone: '+1 (555) 876-5432',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Admissions Manager'
  },
  {
    id: 'counsellor-3',
    name: 'Priya Sharma',
    email: 'priya.s@auraacademy.edu',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'Academic Advisor'
  },
  {
    id: 'counsellor-4',
    name: 'Marcus Chen',
    email: 'marcus.c@auraacademy.edu',
    phone: '+1 (555) 987-6543',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Team Lead'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-101',
    name: 'Rohan Mehta',
    phone: '+1 (555) 123-4567',
    alternatePhone: '+1 (555) 123-9999',
    email: 'rohan.mehta@gmail.com',
    address: '742 Evergreen Terrace, Suite 4B',
    city: 'San Francisco',
    center: 'Silicon Valley Campus',
    batch: 'Fall 2026 Weekend Batch A',
    course: 'Data Science & AI Master Bootcamp',
    qualification: 'Undergraduate',
    preferredBatch: 'Weekend (Sat-Sun)',
    graduationYear: '2024',
    workExperience: '2 Years in QA Automation',
    message: 'Looking for a hands-on AI course to transition from Software Testing to Machine Learning.',
    status: 'Interested',
    source: 'Google Ads',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'google_cpc_ai_master',
    entryPoint: 'Enroll Form',
    assignedCounsellorId: 'counsellor-1',
    dateAdded: '2026-08-14T10:15:00Z',
    isDuplicate: false,
    aiLeadScore: 92,
    escalatedToManager: false,
    totalCourseFee: 3500,
    ackSent: {
      email: true,
      sms: true,
      whatsapp: true,
      timestamp: '2026-08-14T10:15:05Z'
    },
    notes: 'Submitted enquiry via Google Ads landing page. Highly interested in dissertation project on NLP.',
    activityHistory: [
      {
        id: 'act-1',
        type: 'Auto-Acknowledgement',
        author: 'System Bot',
        message: 'Sent automated Welcome SMS & Email with course brochure.',
        timestamp: '2026-08-14T10:15:05Z'
      },
      {
        id: 'act-2',
        type: 'Counsellor Assigned',
        author: 'System Auto-Assign',
        message: 'Assigned lead to Sarah Jenkins based on course expertise.',
        timestamp: '2026-08-14T10:16:00Z'
      }
    ],
    documents: [
      {
        id: 'doc-1',
        title: 'B.Sc Computer Science Thesis & Dissertation',
        type: 'Dissertation',
        fileName: 'Rohan_Mehta_ML_Dissertation_2024.pdf',
        fileSize: '4.2 MB',
        uploadDate: '2026-08-14T10:15:00Z',
        abstractText: 'An Empirical Study of Transformer Architectures in Predictive Financial Sentiment Analysis using Natural Language Processing.',
        status: 'Approved',
        verifierNotes: 'Verified by Academic Dean'
      },
      {
        id: 'doc-2',
        title: 'National Identity Proof (Passport Scan)',
        type: 'ID Proof',
        fileName: 'Rohan_Mehta_Passport_Copy.pdf',
        fileSize: '1.1 MB',
        uploadDate: '2026-08-14T10:15:00Z',
        status: 'Approved',
        ocrAlerts: ['Match confirmed: Name & DOB match Application record']
      }
    ],
    payments: [
      {
        id: 'pay-1',
        amount: 500,
        date: '2026-08-14T10:20:00Z',
        paymentMethod: 'Credit Card',
        status: 'Paid',
        receiptNumber: 'REC-2026-901',
        notes: 'Initial seat reservation token fee.'
      }
    ],
    scheduledCalls: [
      {
        id: 'call-1',
        scheduledDate: '2026-08-16',
        scheduledTime: '11:00',
        notes: 'Follow up regarding fee payment installment plan and syllabus review.',
        completed: false,
        assignedCounsellorId: 'counsellor-1'
      }
    ],
    callRecordings: [
      {
        id: 'rec-101',
        url: 'https://actions.google.com/sounds/v1/ambiences/office_space.ogg',
        durationSeconds: 245,
        timestamp: '2026-08-15T11:20:00Z',
        direction: 'Outbound',
        counsellorName: 'Sarah Jenkins',
        disposition: 'Interested',
        transcriptionText: 'Sarah: Hello Rohan! Calling from Aura Academy. I reviewed your B.Sc thesis on Transformer models. Rohan: Hi Sarah, yes! I want to confirm if the Machine Learning bootcamp includes PyTorch deep learning modules. Sarah: Absolutely, module 3 focuses on PyTorch and Model Deployment.',
        aiSummary: 'Student inquired about PyTorch curriculum alignment with his B.Sc thesis background. Counsellor explained Module 3 deep learning syllabus.',
        aiObjections: ['Wants 2-month monthly installment plan option'],
        aiNextBestAction: 'Send customized fee installment agreement link via WhatsApp and follow up on Aug 16.',
        aiCallScore: 88,
        scoreBreakdown: {
          greeting: 18,
          discovery: 19,
          explanation: 19,
          objectionHandling: 16,
          closing: 16
        }
      }
    ]
  },
  {
    id: 'lead-102',
    name: 'Emily Watson',
    phone: '+1 (555) 987-1122',
    alternatePhone: '+1 (555) 987-0000',
    email: 'emily.watson@techhub.io',
    address: '1200 5th Avenue',
    city: 'Seattle',
    center: 'Downtown Innovation Hub',
    batch: 'Fall 2026 Evening Batch B',
    course: 'Full Stack Web Development (MERN)',
    qualification: 'Working Professional',
    preferredBatch: 'Evening (6 PM - 9 PM)',
    graduationYear: '2022',
    workExperience: '3 Years as UI Designer',
    message: 'Interested in the evening batch schedule and scholarship options.',
    status: 'Contacted',
    source: 'Instagram',
    utmSource: 'instagram',
    utmMedium: 'social_story',
    utmCampaign: 'insta_story_promo',
    entryPoint: 'Brochure Download',
    assignedCounsellorId: 'counsellor-2',
    dateAdded: '2026-08-13T14:30:00Z',
    isDuplicate: false,
    aiLeadScore: 78,
    escalatedToManager: false,
    totalCourseFee: 2800,
    ackSent: {
      email: true,
      sms: true,
      whatsapp: false,
      timestamp: '2026-08-13T14:30:10Z'
    },
    notes: 'Spoke over phone. Wants details about income share agreement or monthly installment plan.',
    activityHistory: [
      {
        id: 'act-3',
        type: 'Call Log',
        author: 'Alex Rivera',
        message: 'Brief 8 min intro call. Sent fee structure via email.',
        timestamp: '2026-08-13T16:00:00Z'
      }
    ],
    documents: [
      {
        id: 'doc-3',
        title: 'Undergraduate Marksheet Transcript',
        type: 'Marksheet',
        fileName: 'Emily_Watson_BDes_Transcript.pdf',
        fileSize: '2.4 MB',
        uploadDate: '2026-08-13T14:30:00Z',
        status: 'Pending',
        ocrAlerts: ['Awaiting manual verification of final semester GPA']
      }
    ],
    payments: [],
    scheduledCalls: [
      {
        id: 'call-overdue-1',
        scheduledDate: '2026-08-14',
        scheduledTime: '09:30',
        notes: 'Overdue call: Confirm scholarship approval status',
        completed: false,
        assignedCounsellorId: 'counsellor-2',
        isOverdue: true
      }
    ],
    callRecordings: [
      {
        id: 'rec-102',
        url: 'https://actions.google.com/sounds/v1/ambiences/office_space.ogg',
        durationSeconds: 180,
        timestamp: '2026-08-13T16:00:00Z',
        direction: 'Outbound',
        counsellorName: 'Alex Rivera',
        disposition: 'Follow-up',
        transcriptionText: 'Alex: Hello Emily, following up on your MERN Stack inquiry. Emily: I am comparing Aura Academy with General Assembly. What is your job guarantee policy?',
        aiSummary: 'Competitor comparison with General Assembly. Student requested job guarantee details.',
        aiObjections: ['Competitor GA offering 10% lower upfront fee'],
        aiNextBestAction: 'Share alumni hiring report (Google, Amazon placements) & offer $200 early bird scholarship discount.',
        aiCallScore: 82,
        scoreBreakdown: {
          greeting: 17,
          discovery: 17,
          explanation: 18,
          objectionHandling: 15,
          closing: 15
        }
      }
    ]
  },
  {
    id: 'lead-103',
    name: 'David Kim',
    phone: '+1 (555) 456-7890',
    email: 'david.kim@designco.com',
    city: 'Austin',
    center: 'Austin Innovation Park',
    batch: 'Fall 2026 Morning Batch A',
    course: 'UI/UX Product Design Specialist',
    qualification: 'Undergraduate',
    preferredBatch: 'Morning (9 AM - 12 PM)',
    graduationYear: '2025',
    workExperience: 'Student Intern',
    message: 'Need brochure for UI/UX product design certificate.',
    status: 'Counselling',
    source: 'Brochure Gate',
    entryPoint: 'Brochure Download',
    assignedCounsellorId: 'counsellor-3',
    dateAdded: '2026-08-12T09:00:00Z',
    isDuplicate: false,
    aiLeadScore: 85,
    escalatedToManager: true,
    totalCourseFee: 2400,
    ackSent: {
      email: true,
      sms: true,
      whatsapp: true,
      timestamp: '2026-08-12T09:00:05Z'
    },
    notes: 'Scheduled follow-up call after demo class session.',
    activityHistory: [
      {
        id: 'act-4',
        type: 'Manager Escalation',
        author: 'System Manager Escalation',
        message: 'Lead escalated to Team Leader Marcus Chen: High intent lead stalled in Counselling >48h.',
        timestamp: '2026-08-15T09:00:00Z'
      }
    ],
    documents: [
      {
        id: 'doc-4',
        title: 'Design Portfolio Dissertation & Case Studies',
        type: 'Dissertation',
        fileName: 'David_Kim_UIUX_CaseStudy_Dissertation.pdf',
        fileSize: '8.5 MB',
        uploadDate: '2026-08-12T09:00:00Z',
        abstractText: 'Evaluating Micro-Interactions in Mobile Healthcare Interfaces for Elderly Users.',
        status: 'Approved'
      }
    ],
    payments: [],
    scheduledCalls: [],
    callRecordings: []
  },
  {
    id: 'lead-105',
    name: 'Carlos Gomez',
    phone: '+1 (555) 321-7654',
    email: 'carlos.gomez@gmail.com',
    city: 'New York',
    center: 'Manhattan Tech Center',
    batch: 'Fall 2026 Evening Batch A',
    course: 'Cloud Computing & DevOps Engineering',
    qualification: 'Working Professional',
    preferredBatch: 'Evening (6 PM - 9 PM)',
    graduationYear: '2021',
    workExperience: 'DevOps Engineer',
    message: 'Enrolled in full program with batch starting next week.',
    status: 'Enrolled',
    source: 'Referral',
    entryPoint: 'Enroll Form',
    assignedCounsellorId: 'counsellor-1',
    dateAdded: '2026-08-09T08:20:00Z',
    isDuplicate: false,
    enrolledStudentId: 'STU-2026-049',
    aiLeadScore: 100,
    totalCourseFee: 3800,
    ackSent: {
      email: true,
      sms: true,
      whatsapp: true,
      timestamp: '2026-08-09T08:20:05Z'
    },
    notes: 'ENROLLED & CONFIRMED. Tuition fee paid in full. Student ID generated.',
    activityHistory: [
      {
        id: 'act-6',
        type: 'Status Change',
        author: 'Sarah Jenkins',
        message: 'Marked as Enrolled! Student converted successfully.',
        timestamp: '2026-08-10T14:00:00Z'
      }
    ],
    documents: [
      {
        id: 'doc-5',
        title: 'Cloud Security Research Dissertation',
        type: 'Dissertation',
        fileName: 'Carlos_Gomez_DevOps_Cloud_Thesis.pdf',
        fileSize: '5.1 MB',
        uploadDate: '2026-08-09T08:20:00Z',
        abstractText: 'Automating Zero-Trust Infrastructure Pipelines with Kubernetes and Terraform.',
        status: 'Approved'
      }
    ],
    payments: [
      {
        id: 'pay-3',
        amount: 3800,
        date: '2026-08-10T13:50:00Z',
        paymentMethod: 'Credit Card',
        status: 'Paid',
        receiptNumber: 'REC-2026-770',
        notes: 'Full tuition fee paid in one shot.'
      }
    ],
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
    cpl: 42, // Cost Per Lead
    cac: 350, // Customer Acquisition Cost
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
  },
  {
    id: 'camp-3',
    campaignName: 'Campus Open House & Walk-ins',
    source: 'Walk-in',
    spend: 1200,
    leadsCount: 30,
    qualifiedLeads: 25,
    applications: 18,
    admissions: 14,
    cpl: 40,
    cac: 85.7,
    roiPercent: 620
  },
  {
    id: 'camp-4',
    campaignName: 'Alumni Referral Reward Incentive Program',
    source: 'Referral',
    spend: 1500,
    leadsCount: 25,
    qualifiedLeads: 22,
    applications: 19,
    admissions: 16,
    cpl: 60,
    cac: 93.7,
    roiPercent: 780
  }
];

export const AUTOMATION_RULES: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'Auto-Assign High Intent AI Leads to Senior Telecaller',
    trigger: 'Lead Source = Google Ads AND Course = Data Science & AI',
    action: 'Assign to Sarah Jenkins & Send Instant WhatsApp Brochure',
    enabled: true
  },
  {
    id: 'rule-2',
    name: 'Escalate Stalled Leads to Team Manager (>48 Hours)',
    trigger: 'Status = Counselling AND Uncontacted > 48 Hours',
    action: 'Flag Escalation Queue Alert for Marcus Chen',
    enabled: true
  },
  {
    id: 'rule-3',
    name: 'Auto-Dispatch Welcome SMS & Email Ack',
    trigger: 'New Form Submission',
    action: 'Send Welcome Email + SMS confirmation code',
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
  },
  {
    id: 'audit-3',
    timestamp: '2026-08-14T16:45:00Z',
    user: 'Finance Admin',
    role: 'Finance',
    action: 'Document Verification',
    targetLeadId: 'lead-101',
    leadName: 'Rohan Mehta',
    fieldChanged: 'Dissertation Verification',
    oldValue: 'Pending',
    newValue: 'Approved'
  }
];
