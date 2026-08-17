'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { KPICards } from '@/components/dashboard/KPICards';
import { LeadFilters } from '@/components/dashboard/LeadFilters';
import { LeadTable } from '@/components/dashboard/LeadTable';
import { LeadKanban } from '@/components/dashboard/LeadKanban';
import { BulkActionsBar } from '@/components/dashboard/BulkActionsBar';
import { DetailedProfileModal } from '@/components/profile/DetailedProfileModal';
import { AddLeadModal } from '@/components/dashboard/AddLeadModal';
import { BulkMessageModal } from '@/components/dashboard/BulkMessageModal';
import { DuplicateModal } from '@/components/dashboard/DuplicateModal';
import { AutoAckModal } from '@/components/capture/AutoAckModal';
import { WebsiteSimulator } from '@/components/capture/WebsiteSimulator';
import { ChatbotWidget } from '@/components/capture/ChatbotWidget';
import { DialerModal } from '@/components/communication/DialerModal';
import { DirectMessageComposer } from '@/components/communication/DirectMessageComposer';
import { LostReasonModal } from '@/components/counsellor/LostReasonModal';
import { EscalationQueue } from '@/components/manager/EscalationQueue';
import { AICallScoring } from '@/components/manager/AICallScoring';
import { CampaignROIDashboard } from '@/components/marketing/CampaignROIDashboard';
import { DocumentVault } from '@/components/finance/DocumentVault';
import { AuditTrail } from '@/components/admin/AuditTrail';
import { Lead } from '@/lib/types';
import { IconTable, IconKanban } from '@/components/ui/Icons';

export default function Home() {
  const { kanbanViewMode, setKanbanViewMode, currentRole } = useLeadStore();

  const [activeTab, setActiveTab] = useState<string>('queue');
  const [selectedLeadDetail, setSelectedLeadDetail] = useState<Lead | null>(null);
  
  // Modals state
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isBulkMessageModalOpen, setIsBulkMessageModalOpen] = useState(false);
  const [lostReasonLeadId, setLostReasonLeadId] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans text-slate-100">
      
      {/* HubSpot/Pipedrive Style Left Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <Header
          onOpenAddModal={() => setIsAddLeadModalOpen(true)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Scrollable Workspace Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Tab 1: Leads & Pipeline Queue */}
          {activeTab === 'queue' && (
            <div className="space-y-5">
              
              {/* Workspace Header Title & View Toggle */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">Leads & Admissions Pipeline</h1>
                  <p className="text-xs text-slate-400 mt-0.5">Manage enquiries, track status stages, and convert leads to students.</p>
                </div>

                {/* Table vs Kanban Toggle */}
                <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
                  <button
                    onClick={() => setKanbanViewMode('table')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      kanbanViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <IconTable className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>
                  <button
                    onClick={() => setKanbanViewMode('board')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      kanbanViewMode === 'board'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <IconKanban className="w-3.5 h-3.5" />
                    <span>Kanban</span>
                  </button>
                </div>
              </div>

              {/* Metric Cards */}
              <KPICards />

              {/* Search & Filter Bar */}
              <LeadFilters />

              {/* Master Data View */}
              {kanbanViewMode === 'table' ? (
                <LeadTable onSelectLeadDetail={(lead) => setSelectedLeadDetail(lead)} />
              ) : (
                <LeadKanban onSelectLeadDetail={(lead) => setSelectedLeadDetail(lead)} />
              )}

              {/* Multi-Select Bulk Actions Bar */}
              {currentRole !== 'Finance' && (
                <BulkActionsBar onOpenBulkMessage={() => setIsBulkMessageModalOpen(true)} />
              )}

              {/* Escalation Queue for Team Leader */}
              {currentRole === 'Team Leader' && (
                <EscalationQueue />
              )}

            </div>
          )}

          {/* Tab 2: Telephony & AI Calls */}
          {activeTab === 'telephony' && (
            <AICallScoring />
          )}

          {/* Tab 3: Marketing ROI */}
          {activeTab === 'marketing' && (
            <CampaignROIDashboard />
          )}

          {/* Tab 4: Document Vault */}
          {activeTab === 'documents' && (
            <DocumentVault />
          )}

          {/* Tab 5: Audit Logs */}
          {activeTab === 'audit' && (
            <AuditTrail />
          )}

          {/* Tab 6: Website Capture Sandbox */}
          {activeTab === 'sandbox' && (
            <>
              <WebsiteSimulator />
              <ChatbotWidget />
            </>
          )}

        </main>

      </div>

      {/* Shared Portal Modals & Drawers */}
      <DetailedProfileModal
        lead={selectedLeadDetail}
        onClose={() => setSelectedLeadDetail(null)}
      />

      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
      />

      <BulkMessageModal
        isOpen={isBulkMessageModalOpen}
        onClose={() => setIsBulkMessageModalOpen(false)}
      />

      <LostReasonModal
        leadId={lostReasonLeadId}
        onClose={() => setLostReasonLeadId(null)}
      />

      <DuplicateModal />
      <AutoAckModal />
      <DialerModal />
      <DirectMessageComposer />

    </div>
  );
}
