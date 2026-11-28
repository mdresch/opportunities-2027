import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import {
  FileText,
  FlaskConical,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Presentation,
  RefreshCw,
  Table2,
  X,
} from 'lucide-react';
import type { ClientPortfolioData, Opportunity, PortfolioData } from './types';
import { ClientShowcase } from './components/ClientShowcase';
import { ErrorBoundary } from './components/ErrorBoundary';

const ClientReportsPage = lazy(() =>
  import('./components/ClientReportsPage').then((m) => ({ default: m.ClientReportsPage }))
);
const AgentGovernancePortal = lazy(() =>
  import('./components/AgentGovernancePortal').then((m) => ({ default: m.AgentGovernancePortal }))
);
const InternalAuthGate = lazy(() =>
  import('./components/InternalAuthGate').then((m) => ({ default: m.InternalAuthGate }))
);
const OverviewView = lazy(() =>
  import('./components/OverviewView').then((m) => ({ default: m.OverviewView }))
);
const InventoryView = lazy(() =>
  import('./components/InventoryView').then((m) => ({ default: m.InventoryView }))
);
const HypothesesView = lazy(() =>
  import('./components/HypothesesView').then((m) => ({ default: m.HypothesesView }))
);
const ReportsView = lazy(() =>
  import('./components/ReportsView').then((m) => ({ default: m.ReportsView }))
);
const ScopingRequestsView = lazy(() =>
  import('./components/ScopingRequestsView').then((m) => ({ default: m.ScopingRequestsView }))
);
const OpportunityDrawer = lazy(() =>
  import('./components/OpportunityDrawer').then((m) => ({ default: m.OpportunityDrawer }))
);

type NavTab = 'overview' | 'inventory' | 'hypotheses' | 'reports' | 'inquiries';
type AppMode = 'internal' | 'client' | 'client-reports' | 'assessment';

const SHORTLIST_STORAGE_KEY = 'cba_client_shortlist_v1';

const NAV_ITEMS: Array<{
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
  { id: 'inventory', label: 'Opportunity Inventory', icon: Table2 },
  { id: 'hypotheses', label: 'Hypotheses & Wave 1', icon: FlaskConical },
  { id: 'reports', label: 'Reports & Briefs', icon: FileText },
  { id: 'inquiries', label: 'Scoping Requests', icon: Inbox },
];

const MODE_TITLES: Record<AppMode, string> = {
  client: 'CBa Consult — Executive AI, Finance & Governance Advisory',
  'client-reports': 'Executive Reports & Priority Briefs — CBa Consult',
  assessment: 'Enterprise AI Agent Governance Self-Assessment — CBa Consult',
  internal: 'Opportunities 2027 — Internal Portfolio Explorer',
};

function getInitialMode(): AppMode {
  if (typeof window === 'undefined') return 'client';
  const pathname = window.location.pathname;
  if (pathname === '/reports' || pathname.startsWith('/reports/')) {
    return 'client-reports';
  }
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');
  if (view === 'internal') return 'internal';
  if (view === 'reports' || view === 'briefs') return 'client-reports';
  if (
    params.get('assessment') === 'agent-governance' ||
    view === 'agent-governance'
  ) {
    return 'assessment';
  }
  return 'client';
}

function loadStoredShortlist(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SHORTLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .slice(0, 12);
  } catch {
    return [];
  }
}

const PageLoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-[#f5f8fa] flex items-center justify-center p-6">
    <div className="w-full max-w-md bg-white border border-[#dae3e9] rounded-md p-6 space-y-3">
      <div className="h-5 w-40 bg-[#eef5f7] rounded animate-pulse" />
      <div className="h-4 w-full bg-[#f5f8fa] rounded animate-pulse" />
      <div className="h-4 w-4/5 bg-[#f5f8fa] rounded animate-pulse" />
    </div>
  </div>
);

export default function App() {
  const [mode, setMode] = useState<AppMode>(getInitialMode);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<string | null>(null);
  const [data, setData] = useState<PortfolioData | null>(null);
  const [clientPortfolio, setClientPortfolio] = useState<ClientPortfolioData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [pendingReportSlug, setPendingReportSlug] = useState<string | null>(null);
  const [pendingDocPath, setPendingDocPath] = useState<string | null>(null);
  const [pendingClientSection, setPendingClientSection] = useState<string | null>(null);
  const [shortlist, setShortlist] = useState<string[]>(loadStoredShortlist);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(SHORTLIST_STORAGE_KEY, JSON.stringify(shortlist));
    } catch {
      // Ignore storage errors (e.g. private browsing quota)
    }
  }, [shortlist]);

  useEffect(() => {
    document.title = MODE_TITLES[mode];
  }, [mode]);

  useEffect(() => {
    const handlePopState = () => {
      setMode(getInitialMode());
      setMobileMenuOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleShortlist = useCallback((label: string) => {
    const clean = label.trim();
    if (!clean) return;
    setShortlist((prev) =>
      prev.includes(clean)
        ? prev.filter((x) => x !== clean)
        : prev.length < 12
        ? [...prev, clean]
        : prev
    );
  }, []);

  const addToShortlist = useCallback((label: string) => {
    const clean = label.trim();
    if (!clean) return;
    setShortlist((prev) =>
      prev.includes(clean) ? prev : prev.length < 12 ? [...prev, clean] : prev
    );
  }, []);

  const clearShortlist = useCallback(() => {
    setShortlist([]);
  }, []);

  const switchMode = useCallback((nextMode: AppMode) => {
    setMode(nextMode);
    setMobileMenuOpen(false);
    const url = new URL(window.location.href);
    if (url.pathname === '/reports' || url.pathname.startsWith('/reports/')) {
      url.pathname = '/';
    }
    url.searchParams.delete('view');
    url.searchParams.delete('assessment');
    url.searchParams.delete('report');
    url.searchParams.delete('brief');
    if (nextMode === 'internal') {
      url.searchParams.set('view', 'internal');
    } else if (nextMode === 'client-reports') {
      url.searchParams.set('view', 'reports');
    } else if (nextMode === 'assessment') {
      url.searchParams.set('assessment', 'agent-governance');
    }
    if (url.toString() !== window.location.href) {
      window.history.pushState({ mode: nextMode }, '', url.toString());
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleUnauthorized = useCallback(() => {
    setAuthToken(null);
    setAuthUser(null);
    setData(null);
    setSelectedOpportunity(null);
    setError(null);
  }, []);

  const handleSignOut = async () => {
    const tokenToRevoke = authToken;
    handleUnauthorized();
    switchMode('client');
    if (tokenToRevoke) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${tokenToRevoke}` },
        });
      } catch {
        // Ignore network errors on sign-out after clearing local session state
      }
    }
  };

  const loadPortfolio = useCallback(
    async (token: string) => {
      setLoading(true);
      setError(null);
      try {
        const [res, cpRes] = await Promise.all([
          fetch('/api/portfolio', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('/api/client-portfolio').catch(() => null),
        ]);
        if (res.status === 401) {
          handleUnauthorized();
          return;
        }
        if (!res.ok) throw new Error('Failed to fetch portfolio data');
        const json: PortfolioData = await res.json();
        setData(json);
        if (cpRes && cpRes.ok) {
          const cpJson: ClientPortfolioData = await cpRes.json();
          setClientPortfolio(cpJson);
        }
      } catch {
        setError('Could not load portfolio data from the repository server.');
      } finally {
        setLoading(false);
      }
    },
    [handleUnauthorized]
  );

  useEffect(() => {
    if (mode === 'internal' && authToken && !data) {
      loadPortfolio(authToken);
    }
  }, [mode, authToken, data, loadPortfolio]);

  if (mode === 'assessment') {
    return (
      <ErrorBoundary
        resetKey={mode}
        title="Unable to Display Diagnostic"
        onBackToClient={() => switchMode('client')}
      >
        <Suspense fallback={<PageLoadingFallback />}>
          <AgentGovernancePortal
            onBackToShowcase={() => switchMode('client')}
            onSwitchToInternal={() => switchMode('internal')}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  if (mode === 'client-reports') {
    return (
      <ErrorBoundary
        resetKey={mode}
        title="Unable to Display Publications"
        onBackToClient={() => switchMode('client')}
      >
        <Suspense fallback={<PageLoadingFallback />}>
          <ClientReportsPage
            shortlist={shortlist}
            onToggleShortlist={toggleShortlist}
            onBackToShowcase={(targetSection, shortlistItem) => {
              setPendingClientSection(targetSection ?? null);
              if (shortlistItem) addToShortlist(shortlistItem);
              switchMode('client');
            }}
            onOpenAgentAssessment={() => switchMode('assessment')}
            onSwitchToInternal={() => switchMode('internal')}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  if (mode === 'client') {
    return (
      <ErrorBoundary resetKey={mode} title="Unable to Display Advisory Showcase">
        <ClientShowcase
          shortlist={shortlist}
          onToggleShortlist={toggleShortlist}
          onAddToShortlist={addToShortlist}
          onClearShortlist={clearShortlist}
          onSwitchToInternal={() => switchMode('internal')}
          onOpenAgentAssessment={() => switchMode('assessment')}
          onOpenReportsLibrary={() => switchMode('client-reports')}
          initialSection={pendingClientSection}
          onClearInitialNavigation={() => setPendingClientSection(null)}
        />
      </ErrorBoundary>
    );
  }

  if (!authToken) {
    return (
      <ErrorBoundary
        resetKey="auth-gate"
        title="Unable to Display Sign-In"
        onBackToClient={() => switchMode('client')}
      >
        <Suspense fallback={<PageLoadingFallback />}>
          <InternalAuthGate
            onAuthenticated={(token, username) => {
              setAuthToken(token);
              setAuthUser(username);
            }}
            onBackToClient={() => switchMode('client')}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

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
            <div className="text-xs text-[#9cb4cc] mt-1">CBa Consult · Internal Explorer</div>
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

          <div className="pt-4 mt-4 border-t border-[#1e3b5c] space-y-1">
            <button
              type="button"
              onClick={() => switchMode('client')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-md text-[#48c5b2] hover:bg-[#1e3b5c] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              <Presentation className="w-4 h-4 shrink-0" />
              <span>Client Showcase</span>
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-md text-[#c4d1df] hover:bg-[#1e3b5c] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>

        <div className="px-6 py-4 border-t border-[#1e3b5c] text-xs text-[#9cb4cc] space-y-1">
          <div className="text-white font-medium">{authUser || 'Menno Drescher'}</div>
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
              <div className="pt-3 mt-3 border-t border-[#1e3b5c] space-y-1">
                <button
                  type="button"
                  onClick={() => switchMode('client')}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-md text-[#48c5b2] hover:bg-[#1e3b5c] hover:text-white whitespace-nowrap cursor-pointer"
                >
                  <Presentation className="w-4 h-4 shrink-0" />
                  <span>Client Showcase</span>
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-md text-[#c4d1df] hover:bg-[#1e3b5c] hover:text-white whitespace-nowrap cursor-pointer"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar — Clean Breadcrumb + Primary Actions */}
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

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => loadPortfolio(authToken)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#40536b] hover:text-[#10253f] bg-[#f5f8fa] hover:bg-[#eef5f7] border border-[#dae3e9] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => switchMode('client')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#0c8b82] hover:bg-[#075d68] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Presentation className="w-3.5 h-3.5" />
              Client Showcase
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#40536b] hover:text-[#10253f] bg-white hover:bg-[#f5f8fa] border border-[#dae3e9] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
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
                onClick={() => loadPortfolio(authToken)}
                className="mt-4 px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : data ? (
            <ErrorBoundary resetKey={activeTab} title="Unable to Display View">
              <Suspense
                fallback={
                  <div className="h-64 bg-white border border-[#dae3e9] rounded-md animate-pulse" />
                }
              >
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
                    authToken={authToken}
                    onUnauthorized={handleUnauthorized}
                    initialReportSlug={pendingReportSlug}
                    initialDocPath={pendingDocPath}
                    onClearInitial={() => {
                      setPendingReportSlug(null);
                      setPendingDocPath(null);
                    }}
                  />
                )}
                {activeTab === 'inquiries' && (
                  <ScopingRequestsView
                    authToken={authToken}
                    onUnauthorized={handleUnauthorized}
                  />
                )}
              </Suspense>
            </ErrorBoundary>
          ) : null}
        </main>
      </div>

      {/* Opportunity Detail Slide-Over */}
      {selectedOpportunity && (
        <Suspense fallback={null}>
          <OpportunityDrawer
            opportunity={selectedOpportunity}
            clientPortfolio={clientPortfolio}
            authToken={authToken}
            onUnauthorized={handleUnauthorized}
            onClose={() => setSelectedOpportunity(null)}
            onOpenReportSlug={handleOpenReportSlug}
            onOpenClientShowcase={() => {
              setSelectedOpportunity(null);
              switchMode('client');
            }}
            onOpenClientReports={() => {
              setSelectedOpportunity(null);
              switchMode('client-reports');
            }}
          />
        </Suspense>
      )}
    </div>
  );
}
