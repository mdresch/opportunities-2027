import React, { useEffect, useState } from 'react';
import {
  FileText,
  FlaskConical,
  LayoutDashboard,
  Menu,
  RefreshCw,
  Table2,
  X,
} from 'lucide-react';
import type { Opportunity, PortfolioData } from './types';
import { OverviewView } from './components/OverviewView';
import { InventoryView } from './components/InventoryView';
import { HypothesesView } from './components/HypothesesView';
import { ReportsView } from './components/ReportsView';
import { OpportunityDrawer } from './components/OpportunityDrawer';

type NavTab = 'overview' | 'inventory' | 'hypotheses' | 'reports';

const NAV_ITEMS: Array<{
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
  { id: 'inventory', label: 'Opportunity Inventory', icon: Table2 },
  { id: 'hypotheses', label: 'Hypotheses & Wave 1', icon: FlaskConical },
  { id: 'reports', label: 'Reports & Briefs', icon: FileText },
];

export default function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [pendingReportSlug, setPendingReportSlug] = useState<string | null>(null);
  const [pendingDocPath, setPendingDocPath] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const loadPortfolio = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error('Failed to fetch portfolio data');
      const json: PortfolioData = await res.json();
      setData(json);
    } catch {
      setError('Could not load portfolio data from the repository server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  const handleOpenReportSlug = (slug: string) => {
    setSelectedOpportunity(null);
    setPendingReportSlug(slug);
    setPendingDocPath(null);
    setActiveTab('reports');
  };

  const handleOpenDocument = (docPath: string) => {
    setSelectedOpportunity(null);
    setPendingDocPath(docPath);
    setPendingReportSlug(null);
    setActiveTab('reports');
  };

  const currentTabLabel = NAV_ITEMS.find((n) => n.id === activeTab)?.label ?? 'Overview';

  return (
    <div className="min-h-screen flex bg-[#f5f8fa] text-[#17243a]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#10253f] text-white shrink-0 border-r border-[#1e3b5c]">
        <div className="px-6 py-5 border-b border-[#1e3b5c]">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className="text-left block w-full cursor-pointer"
          >
            <div className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap">
              Opportunities 2027
            </div>
            <div className="text-xs text-[#9cb4cc] mt-1">CBa Consult · Portfolio Explorer</div>
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#0c8b82] text-white'
                    : 'text-[#d8e4f0] hover:bg-[#1e3b5c] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t border-[#1e3b5c] text-xs text-[#9cb4cc] space-y-1">
          <div className="text-white font-medium">Menno Drescher</div>
          <div>Tailored Hybrid SIDPA</div>
          {data && (
            <div className="font-mono text-[11px] text-[#48c5b2] pt-1">
              {data.summary.totalOpportunities} ideas · {data.summary.totalFolders} workspaces
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex bg-[#10253f]/50">
          <div className="w-64 bg-[#10253f] text-white flex flex-col h-full">
            <div className="px-5 py-4 border-b border-[#1e3b5c] flex items-center justify-between">
              <span className="font-display font-bold text-base">Opportunities 2027</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#d8e4f0] hover:text-white cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-md whitespace-nowrap cursor-pointer ${
                      active ? 'bg-[#0c8b82] text-white' : 'text-[#d8e4f0] hover:bg-[#1e3b5c]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar — Clean Breadcrumb + Primary Action */}
        <header className="h-14 bg-white border-b border-[#dae3e9] px-4 sm:px-8 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-[#40536b] hover:text-[#10253f] cursor-pointer"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm min-w-0">
              <span className="text-[#52647a] hidden sm:inline whitespace-nowrap">
                Opportunities 2027
              </span>
              <span className="text-[#dae3e9] hidden sm:inline" aria-hidden="true">
                /
              </span>
              <span className="font-semibold text-[#10253f] truncate">{currentTabLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={loadPortfolio}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#40536b] hover:text-[#10253f] bg-[#f5f8fa] hover:bg-[#eef5f7] border border-[#dae3e9] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </header>

        {/* Viewport */}
        <main className="flex-1 px-4 sm:px-8 py-7 max-w-[1360px] w-full mx-auto">
          {loading && !data ? (
            <div className="space-y-6">
              <div className="h-8 w-80 bg-[#dae3e9]/60 rounded animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-28 bg-white border border-[#dae3e9] rounded-md p-5 animate-pulse"
                  />
                ))}
              </div>
              <div className="h-72 bg-white border border-[#dae3e9] rounded-md animate-pulse" />
            </div>
          ) : error ? (
            <div className="bg-white border border-[#dae3e9] rounded-md p-8 text-center max-w-lg mx-auto my-12">
              <h2 className="text-base font-semibold text-[#10253f]">Portfolio Data Unavailable</h2>
              <p className="text-sm text-[#52647a] mt-2">{error}</p>
              <button
                type="button"
                onClick={loadPortfolio}
                className="mt-4 px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : data ? (
            <>
              {activeTab === 'overview' && (
                <OverviewView
                  data={data}
                  onSelectOpportunity={setSelectedOpportunity}
                  onNavigateTab={setActiveTab}
                  onOpenDocument={handleOpenDocument}
                />
              )}
              {activeTab === 'inventory' && (
                <InventoryView
                  opportunities={data.opportunities}
                  pillars={data.pillars}
                  onSelectOpportunity={setSelectedOpportunity}
                />
              )}
              {activeTab === 'hypotheses' && (
                <HypothesesView
                  hypotheses={data.hypotheses}
                  onOpenDocument={handleOpenDocument}
                />
              )}
              {activeTab === 'reports' && (
                <ReportsView
                  htmlReports={data.htmlReports}
                  coreDocuments={data.coreDocuments}
                  initialReportSlug={pendingReportSlug}
                  initialDocPath={pendingDocPath}
                  onClearInitial={() => {
                    setPendingReportSlug(null);
                    setPendingDocPath(null);
                  }}
                />
              )}
            </>
          ) : null}
        </main>
      </div>

      {/* Opportunity Detail Slide-Over */}
      <OpportunityDrawer
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        onOpenReportSlug={handleOpenReportSlug}
      />
    </div>
  );
}
