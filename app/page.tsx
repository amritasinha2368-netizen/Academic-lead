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
    currentRole, 
    lastAckModal, 
    activeDuplicateReview, 
    activeDialerLead,
    activeMessageComposer
  } = useLeadStore();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedProfileLead, setSelectedProfileLead] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkMessageOpen, setIsBulkMessageOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white flex overflow-hidden font-sans transition-colors">
      
      {/* Left Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <Header 
          onOpenAddModal={() => setIsAddModalOpen(true)} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Workspace Body Scroll Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Overview Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Hero KPI Summary Cards */}
              <KPICards />

              {/* Master Lead Datatable & Filters */}
              <div className="space-y-4">
                <LeadFilters />
                <LeadTable onSelectLeadDetail={(lead) => setSelectedProfileLead(lead)} />
              </div>

              {/* Manager Escalation Queue & Call QA Scorecard */}
              {(currentRole === 'Team Leader' || currentRole === 'Super Admin') && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                  <EscalationQueue />
                  <AICallScoring />
                </div>
              )}
            </div>
          )}

          {/* Kanban Pipeline Tab */}
          {activeTab === 'pipeline' && (
            <div className="animate-fadeIn space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900 dark:text-white">Pipeline Stage Board</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Drag and drop leads through stages</p>
                </div>
              </div>
              <LeadKanban onSelectLeadDetail={(lead) => setSelectedProfileLead(lead)} />
            </div>
          )}

          {/* Telephony & AI Calls View */}
          {activeTab === 'telephony' && (
            <div className="animate-fadeIn">
              <AnalyticsDashboard />
            </div>
          )}

          {/* Marketing & ROI View */}
          {activeTab === 'marketing' && (
            <div className="animate-fadeIn">
              <CampaignROIDashboard />
            </div>
          )}

          {/* Document Vault View */}
          {activeTab === 'documents' && (
            <div className="animate-fadeIn">
              <DocumentVault />
            </div>
          )}

          {/* System Audit Trail View */}
          {activeTab === 'audit' && (
            <div className="animate-fadeIn">
              <AuditTrail />
            </div>
          )}

          {/* Public Website Simulator Sandbox */}
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
