'use client';

import React from 'react';
import { EnquiryForm } from './EnquiryForm';
import { IconX } from '@/components/ui/Icons';

interface EntryModalsProps {
  activeModal: 'callback' | 'brochure' | null;
  onClose: () => void;
  selectedCourse?: string;
}

export const EntryModals: React.FC<EntryModalsProps> = ({ activeModal, onClose, selectedCourse }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl relative">
        
        {/* Close Button overlay */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 p-2 bg-slate-800 text-slate-300 hover:text-white rounded-full border border-slate-700 shadow-xl transition-transform hover:scale-110"
        >
          <IconX className="w-5 h-5" />
        </button>

        {activeModal === 'callback' ? (
          <EnquiryForm
            entryPoint="Callback Modal"
            sourceOverride="Callback Request"
            title="Request Instant Counsellor Callback"
            subtitle="Enter your details and an admissions advisor will call you within 15 minutes."
            onSubmittedSuccess={onClose}
          />
        ) : (
          <EnquiryForm
            entryPoint="Brochure Download"
            sourceOverride="Brochure Gate"
            title={`Download ${selectedCourse || 'Course'} Syllabus & Fee Guide`}
            subtitle="Submit enquiry to instantly unlock and receive the full curriculum PDF."
            onSubmittedSuccess={onClose}
          />
        )}

      </div>
    </div>
  );
};
