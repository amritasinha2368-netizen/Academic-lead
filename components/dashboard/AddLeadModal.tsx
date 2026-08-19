'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { COURSES } from '@/lib/mock-data';
import { LeadStatus, LeadSource, Qualification, PreferredBatch } from '@/lib/types';
import { IconX, IconUserPlus } from '@/components/ui/Icons';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose }) => {
  const { addLeadFromWebsite, counsellors } = useLeadStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('San Francisco');
  const [course, setCourse] = useState(COURSES[0]);
  const [qualification, setQualification] = useState<Qualification>('12th Science (PCM)');
  const [class12Percentage, setClass12Percentage] = useState<number>(85);
  const [batch, setBatch] = useState<PreferredBatch>('Regular Morning College Batch');
  const [status, setStatus] = useState<LeadStatus>('New');
  const [source, setSource] = useState<LeadSource>('Walk-in');
  const [assignedCounsellorId, setAssignedCounsellorId] = useState(counsellors[0]?.id || '');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    addLeadFromWebsite({
      name,
      phone,
      email,
      city,
      course,
      qualification,
      class12Percentage: Number(class12Percentage),
      preferredBatch: batch,
      graduationYear: '2026 12th Pass',
      workExperience: 'Fresh 12th Graduate',
      status,
      source,
      assignedCounsellorId,
      notes: notes || `Class 12th Pass Student (${qualification}) - Board Score: ${class12Percentage}%`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#93C5FD] rounded-2xl shadow-2xl w-full max-w-xl text-slate-900 animate-fadeIn overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 bg-[#E0F2FE] border-b border-sky-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white font-bold">
              <IconUserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#0F172A]">Add 12th Pass College Applicant</h2>
              <p className="text-xs text-blue-900 font-bold">Register new high school graduate applying for Undergrad Degree</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-500 hover:text-slate-900 rounded-lg">
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-bold">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 mb-1">Student Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rohan Mehta"
                className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 987-6543"
                className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">City / Location</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="San Francisco"
                className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* 12th Pass Specific Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 mb-1">12th Grade Stream *</label>
              <select
                value={qualification}
                onChange={(e) => setQualification(e.target.value as Qualification)}
                className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              >
                <option value="12th Science (PCM)">12th Science (PCM)</option>
                <option value="12th Science (PCB)">12th Science (PCB)</option>
                <option value="12th Commerce">12th Commerce</option>
                <option value="12th Arts / Humanities">12th Arts / Humanities</option>
                <option value="12th Pass (Awaiting Result)">12th Pass (Awaiting Result)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 mb-1">Class 12th Board Marks %</label>
              <input
                type="number"
                min="35"
                max="100"
                value={class12Percentage}
                onChange={(e) => setClass12Percentage(Number(e.target.value))}
                placeholder="e.g. 88.5"
                className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 mb-1">Target College Degree Program *</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-extrabold focus:outline-none focus:border-blue-600"
            >
              {COURSES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 mb-1">Lead Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as LeadSource)}
                className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none"
              >
                <option value="Walk-in">Walk-in Campus Visit</option>
                <option value="Google Ads">Google Search Ad</option>
                <option value="Instagram">Instagram Ad</option>
                <option value="Referral">Referral</option>
                <option value="Homepage">Website Form</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 mb-1">Assign Counsellor</label>
              <select
                value={assignedCounsellorId}
                onChange={(e) => setAssignedCounsellorId(e.target.value)}
                className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none"
              >
                {counsellors.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-bold hover:bg-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-extrabold shadow-md hover:bg-blue-700"
            >
              Register 12th Applicant
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
