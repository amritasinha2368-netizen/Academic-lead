'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { Lead } from '@/lib/types';

import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { KPICards } from '@/components/dashboard/KPICards';
import { LeadTable } from '@/components/dashboard/LeadTable';
import { LeadKanban } from '@/components/dashboard/LeadKanban';
import { LeadFilters } from '@/components/dashboard/LeadFilters';
import { BulkActionsBar } from '@/components/dashboard/BulkActionsBar';
import { BulkMessageModal } from '@/components/dashboard/BulkMessageModal';

import { DetailedProfileModal } from '@/components/profile/DetailedProfileModal';
import { AddLeadModal } from '@/components/dashboard/AddLeadModal';
import { AutoAckModal } from '@/components/capture/AutoAckModal';
import { DuplicateModal } from '@/components/dashboard/DuplicateModal';
import { DialerModal } from '@/components/communication/DialerModal';
import { DirectMessageComposer } from '@/components/communication/DirectMessageComposer';

import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { EscalationQueue } from '@/components/manager/EscalationQueue';
import { AICallScoring } from '@/components/manager/AICallScoring';
import { CampaignROIDashboard } from '@/components/marketing/CampaignROIDashboard';
import { DocumentVault } from '@/components/finance/DocumentVault';
import { AuditTrail } from '@/components/admin/AuditTrail';
import { WebsiteSimulator } from '@/components/capture/WebsiteSimulator';

export default function Home() {
  const { 
    lastAckModal, 
    activeDuplicateReview, 
    activeDialerLead,
    activeMessageComposer
  } = useLeadStore();

  const [activeTab, setActiveTab] = useState<string>('leads');
  const [selectedProfileLead, setSelectedProfileLead] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkMessageOpen, setIsBulkMessageOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex overflow-hidden font-sans transition-colors">
      
      {/* Left Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <Header 
          onOpenAddModal={() => setIsAddModalOpen(true)} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Dedicated Page Scroll Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Page 1: Leads & Enquiries Master View */}
          {activeTab === 'leads' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Summary Stats Strip */}
              <KPICards />

              {/* Master Data Table & Filters */}
              <div className="space-y-4">
                <LeadFilters />
                <LeadTable onSelectLeadDetail={(lead) => setSelectedProfileLead(lead)} />
              </div>
            </div>
          )}

          {/* Page 2: Kanban Pipeline View */}
          {activeTab === 'pipeline' && (
            <div className="animate-fadeIn space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h1 className="text-xl font-extrabold text-slate-900">Lead Pipeline Board</h1>
                  <p className="text-xs text-slate-500 font-medium">Visual drag-and-drop stage tracking</p>
                </div>
              </div>
              <LeadKanban onSelectLeadDetail={(lead) => setSelectedProfileLead(lead)} />
            </div>
          )}

          {/* Page 3: Manager QA & Escalation Queue */}
          {activeTab === 'manager' && (
            <div className="animate-fadeIn space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h1 className="text-xl font-extrabold text-slate-900">Manager Quality & Escalation Hub</h1>
                  <p className="text-xs text-slate-500 font-medium">Review stalled leads and AI call scorecards</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EscalationQueue />
                <AICallScoring />
              </div>
            </div>
          )}

          {/* Page 4: Telephony & AI Call Logs */}
          {activeTab === 'telephony' && (
            <div className="animate-fadeIn">
              <AnalyticsDashboard />
            </div>
          )}

          {/* Page 5: Marketing ROI & Attribution */}
          {activeTab === 'marketing' && (
            <div className="animate-fadeIn">
              <CampaignROIDashboard />
            </div>
          )}

          {/* Page 6: Document Vault & Payments */}
          {activeTab === 'documents' && (
            <div className="animate-fadeIn">
              <DocumentVault />
            </div>
          )}

          {/* Page 7: Audit Logs */}
          {activeTab === 'audit' && (
            <div className="animate-fadeIn">
              <AuditTrail />
            </div>
          )}

          {/* Page 8: Website Simulator Sandbox */}
          {activeTab === 'sandbox' && (
            <div className="animate-fadeIn">
              <WebsiteSimulator />
            </div>
          )}

        </main>
      </div>

      {/* Floating Bulk Actions Overlay */}
      <BulkActionsBar onOpenBulkMessage={() => setIsBulkMessageOpen(true)} />

      {/* Slide-over Profile Detail Drawer */}
      <DetailedProfileModal
        lead={selectedProfileLead}
        onClose={() => setSelectedProfileLead(null)}
      />

      {/* Modals */}
      {isAddModalOpen && <AddLeadModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />}
      {isBulkMessageOpen && <BulkMessageModal isOpen={isBulkMessageOpen} onClose={() => setIsBulkMessageOpen(false)} />}
      {lastAckModal && <AutoAckModal />}
      {activeDuplicateReview && <DuplicateModal />}
      {activeDialerLead && <DialerModal />}
      {activeMessageComposer && <DirectMessageComposer />}

    </div>
  );
}
