'use client';

import React, { useState } from 'react';
import { useLeadStore } from '@/lib/lead-store';
import { Lead } from '@/lib/types';

import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { KPICards } from '@/components/dashboard/KPICards';
import { SplitWorkspace } from '@/components/dashboard/SplitWorkspace';
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

  const [activeTab, setActiveTab] = useState<string>('queue');
  const [viewMode, setViewMode] = useState<'split' | 'table' | 'kanban'>('split');

  const [selectedProfileLead, setSelectedProfileLead] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkMessageOpen, setIsBulkMessageOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white flex overflow-hidden font-sans transition-colors">
      
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
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Main Queue Workspace */}
          {activeTab === 'queue' && (
            <>
              {/* Hero KPI Cards */}
              <KPICards />

              {/* View Selector Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold shadow-sm">
                  <button
                    onClick={() => setViewMode('split')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      viewMode === 'split'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    ⚡ Linear Split Workspace
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      viewMode === 'table'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    📋 Datatable
                  </button>
                  <button
                    onClick={() => setViewMode('kanban')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      viewMode === 'kanban'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    📊 Pipeline Kanban
                  </button>
                </div>
              </div>

              {/* View Render */}
              {viewMode === 'split' && <SplitWorkspace />}
              {viewMode === 'table' && (
                <div className="space-y-4">
                  <LeadFilters />
                  <LeadTable onSelectLeadDetail={(lead) => setSelectedProfileLead(lead)} />
                </div>
              )}
              {viewMode === 'kanban' && <LeadKanban onSelectLeadDetail={(lead) => setSelectedProfileLead(lead)} />}

              {/* Manager Escalation Queue & Call QA Scorecard */}
              {(currentRole === 'Team Leader' || currentRole === 'Super Admin') && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                  <EscalationQueue />
                  <AICallScoring />
                </div>
              )}
            </>
          )}

          {/* Telephony & AI Calls View */}
          {activeTab === 'telephony' && <AnalyticsDashboard />}

          {/* Marketing & ROI View */}
          {activeTab === 'marketing' && <CampaignROIDashboard />}

          {/* Document Vault View */}
          {activeTab === 'documents' && <DocumentVault />}

          {/* System Audit Trail View */}
          {activeTab === 'audit' && <AuditTrail />}

          {/* Public Website Simulator Sandbox */}
          {activeTab === 'sandbox' && <WebsiteSimulator />}

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
