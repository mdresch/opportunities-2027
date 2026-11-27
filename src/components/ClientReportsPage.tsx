import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Download,
  FileDown,
  FileText,
  Link2,
  Menu,
  Search,
  X,
} from 'lucide-react';
import type {
  ClientPortfolioData,
  ClientReportCategory,
  ClientReportEntry,
} from '../types';
import { ClientReportDrawer } from './ClientReportDrawer';
import {
  ClientServiceDrawer,
  type ClientBriefSelection,
} from './ClientServiceDrawer';
import { exportHtmlStringToPdf } from '../utils/pdfExport';

interface ClientReportsPageProps {
  shortlist: string[];
  onToggleShortlist: (serviceLabel: string) => void;
  onBackToShowcase: (targetSection?: string, shortlistItem?: string) => void;
  onOpenAgentAssessment: () => void;
  onSwitchToInternal: () => void;
}

const CATEGORY_FILTERS: Array<'All Briefs' | ClientReportCategory> = [
  'All Briefs',
  'Executive Reports',
  'Flagship One-Pagers',
  'Executive Briefs',
  'Market Development',
];

export const ClientReportsPage: React.FC<ClientReportsPageProps> = ({
  shortlist,
  onToggleShortlist,
  onBackToShowcase,
  onOpenAgentAssessment,
  onSwitchToInternal,
}) => {
  const [data, setData] = useState<ClientPortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState<
    'All Briefs' | ClientReportCategory
  >('All Briefs');
  const [searchQuery, setSearchQuery] = useState('');

  const [activeReport, setActiveReport] = useState<ClientReportEntry | null>(null);
  const [activeBrief, setActiveBrief] = useState<ClientBriefSelection | null>(null);
  const [exportingReportSlug, setExportingReportSlug] = useState<string | null>(null);
  const [reportExportError, setReportExportError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const syncReportParam = useCallback((slug: string | null) => {
    const url = new URL(window.location.href);
    url.searchParams.delete('assessment');
    if (url.pathname === '/reports' || url.pathname.startsWith('/reports/')) {
      url.pathname = '/';
    }
    url.searchParams.set('view', 'reports');
    if (slug) {
      url.searchParams.set('report', slug);
    } else {
      url.searchParams.delete('report');
    }
    if (url.toString() !== window.location.href) {
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const openReport = useCallback(
    (rep: ClientReportEntry) => {
      setActiveBrief(null);
      setActiveReport(rep);
      syncReportParam(rep.slug);
    },
    [syncReportParam]
  );

  const closeReport = useCallback(() => {
    setActiveReport(null);
    syncReportParam(null);
  }, [syncReportParam]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/client-portfolio');
        if (!res.ok) throw new Error('Unable to load publications');
        const json: ClientPortfolioData = await res.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) {
          setError('Unable to load CBa Consult executive reports and priority briefs.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const allReports = useMemo(() => data?.clientReports ?? [], [data]);

  useEffect(() => {
    if (loading || allReports.length === 0) return;
    const params = new URLSearchParams(window.location.search);
    const reportSlug = params.get('report');
    if (reportSlug) {
      const matched = allReports.find((r) => r.slug === reportSlug);
      if (matched) setActiveReport(matched);
    }
  }, [loading, allReports]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Briefs': allReports.length,
      'Executive Reports': 0,
      'Flagship One-Pagers': 0,
      'Executive Briefs': 0,
      'Market Development': 0,
    };
    for (const report of allReports) {
      const cat = report.category ?? 'Executive Reports';
      counts[cat] = (counts[cat] ?? 0) + 1;
    }
    return counts;
  }, [allReports]);

  const filteredReports = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allReports.filter((rep) => {
      const cat = rep.category ?? 'Executive Reports';
      if (categoryFilter !== 'All Briefs' && cat !== categoryFilter) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        rep.title,
        rep.subtitle,
        rep.editionLabel,
        rep.pagesLabel,
        rep.category ?? '',
        rep.opportunityId ?? '',
        rep.audience ?? '',
        rep.duration ?? '',
        rep.investmentAnchor ?? '',
        ...(rep.keyHighlights ?? []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [allReports, categoryFilter, searchQuery]);

  const handleDownloadHtml = async (report: ClientReportEntry) => {
    setReportExportError(null);
    try {
      const res = await fetch(report.url);
      if (!res.ok) throw new Error('Failed to fetch report HTML');
      const html = await res.text();
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${report.slug}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      setReportExportError('Unable to download this report right now. Please try again.');
    }
  };

  const handleDownloadPdf = async (report: ClientReportEntry) => {
    if (exportingReportSlug) return;
    setExportingReportSlug(report.slug);
    setReportExportError(null);
    try {
      const res = await fetch(report.url);
      if (!res.ok) throw new Error('Failed to fetch report HTML');
      const html = await res.text();
      await exportHtmlStringToPdf(html, report.slug);
    } catch {
      setReportExportError(
        'Unable to export PDF right now. Open the report and retry PDF export.'
      );
    } finally {
      setExportingReportSlug(null);
    }
  };

  const handleCopyLibraryLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('assessment');
    url.searchParams.set('view', 'reports');
    navigator.clipboard?.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2400);
  };

  const handleRequestScopingFromReport = (serviceLabel: string) => {
    closeReport();
    setActiveBrief(null);
    onBackToShowcase('inquire', serviceLabel);
  };

  return (
    <div className="min-h-screen bg-[#f5f8fa] text-[#17243a] flex flex-col">
      {/* Top Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-[#dae3e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-8">
          {/* Zone 1: Clean wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="md:hidden min-h-[44px] min-w-[44px] -ml-2 flex items-center justify-center text-[#10253f] hover:bg-[#eef5f7] rounded-md cursor-pointer"
              aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileNavOpen}
              aria-controls="client-reports-mobile-nav"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={() => onBackToShowcase()}
              className="font-display text-lg font-bold tracking-tight text-[#10253f] hover:text-[#075d68] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              CBa Consult
            </button>
          </div>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#40536b]"
            aria-label="Client publications navigation"
          >
            <button
              type="button"
              onClick={() => onBackToShowcase()}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Client Showcase
            </button>
            <button
              type="button"
              onClick={() => {
                const prefersReducedMotion = window.matchMedia(
                  '(prefers-reduced-motion: reduce)'
                ).matches;
                window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
              }}
              className="text-[#10253f] font-semibold whitespace-nowrap shrink-0 cursor-pointer"
              aria-current="page"
            >
              Reports &amp; Briefs
            </button>
            <button
              type="button"
              onClick={onOpenAgentAssessment}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              AI Agent Benchmark
            </button>
            <button
              type="button"
              onClick={() => onBackToShowcase('inquire')}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Scope Assignment
            </button>
          </nav>

          {/* Zone 3: Single primary CTA */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => onBackToShowcase('inquire')}
              className="px-3.5 sm:px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="sm:hidden">Scope Call</span>
              <span className="hidden sm:inline">Request Scoping Call</span>
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <nav
            id="client-reports-mobile-nav"
            aria-label="Mobile publications navigation"
            className="md:hidden bg-white border-t border-[#dae3e9] px-4 py-3 space-y-1"
          >
            <button
              type="button"
              onClick={() => {
                setMobileNavOpen(false);
                onBackToShowcase();
              }}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-[#10253f] hover:bg-[#eef5f7] rounded-md cursor-pointer"
            >
              Client Showcase
            </button>
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className="w-full text-left px-3 py-2.5 text-sm font-semibold text-[#075d68] bg-[#eef5f7] rounded-md cursor-pointer"
            >
              Reports &amp; Briefs
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileNavOpen(false);
                onOpenAgentAssessment();
              }}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-[#10253f] hover:bg-[#eef5f7] rounded-md cursor-pointer"
            >
              AI Agent Governance Benchmark
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileNavOpen(false);
                onBackToShowcase('inquire');
              }}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-[#10253f] hover:bg-[#eef5f7] rounded-md cursor-pointer"
            >
              Scope Assignment
            </button>
          </nav>
        )}
      </header>

      <main className="flex-1">
        {/* Editorial Page Header */}
        <section className="bg-white border-b border-[#dae3e9]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 lg:py-12">
            <div className="mb-5">
              <button
                type="button"
                onClick={() => onBackToShowcase()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#075d68] hover:text-[#10253f] whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Client Showcase
              </button>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-semibold text-[#075d68]">
                  CBa Consult · Client Publications &amp; Board Briefs
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#10253f] tracking-tight leading-tight">
                  Executive Reports &amp; Priority Briefs
                </h1>
                <p className="text-[15px] leading-relaxed text-[#40536b] max-w-[66ch]">
                  Complete library of shareable, client-facing executive reports, diagnostic
                  one-pagers, product architecture briefs, and market development publications for
                  board and leadership review. Every brief can be read inline or exported cleanly to
                  HTML and A4 PDF.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyLibraryLink}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#10253f] bg-white hover:bg-[#f5f8fa] border border-[#dae3e9] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#075d68]" />
                      Library Link Copied
                    </>
                  ) : (
                    <>
                      <Link2 className="w-3.5 h-3.5 text-[#075d68]" />
                      Copy Shareable Link
                    </>
                  )}
                </button>
                {data && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveBrief({
                        title: 'Flagship Opportunities Overview (2027–2030)',
                        subtitle: 'CBa Consult · Executive Client Brief',
                        serviceLabel: 'Executive Portfolio Scoping Call',
                        duration: '3–10 weeks fixed scope',
                        investmentRange: '€1,500 – €18,000+',
                        onePagerPath: data.flagshipOverviewPath,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#075d68] hover:text-[#10253f] bg-[#f5f8fa] hover:bg-[#eef5f7] border border-[#dae3e9] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Unified Flagship One-Pager
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Library Filter Bar & Report Grid */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 space-y-8">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="h-56 bg-white border border-[#dae3e9] rounded-md animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <div className="bg-white border border-[#dae3e9] rounded-md p-8 text-center max-w-lg mx-auto my-8">
              <h2 className="text-base font-semibold text-[#10253f]">
                Publications Unavailable
              </h2>
              <p className="text-sm text-[#52647a] mt-2">{error}</p>
            </div>
          ) : (
            <>
              {/* Filter Controls + Search */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div
                  className="flex flex-wrap items-center gap-2"
                  role="tablist"
                  aria-label="Filter publications by category"
                >
                  {CATEGORY_FILTERS.map((cat) => {
                    const active = categoryFilter === cat;
                    const count = categoryCounts[cat] ?? 0;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#10253f] border-[#10253f] text-white'
                            : 'bg-white border-[#dae3e9] text-[#40536b] hover:text-[#10253f] hover:bg-[#eef5f7]'
                        }`}
                      >
                        {cat}
                        <span
                          className={`ml-1.5 font-mono tabular-nums ${
                            active ? 'text-[#48c5b2]' : 'text-[#52647a]'
                          }`}
                        >
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full lg:w-72">
                  <label htmlFor="reports-search" className="sr-only">
                    Search client reports
                  </label>
                  <Search className="w-4 h-4 text-[#52647a] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="reports-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search reports, topics, or audiences..."
                    className="w-full pl-9 pr-9 py-2 text-xs bg-white border border-[#dae3e9] rounded-md text-[#10253f] placeholder:text-[#52647a] focus:border-[#075d68]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[36px] min-w-[36px] flex items-center justify-center text-[#52647a] hover:text-[#10253f] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {reportExportError && (
                <div
                  role="alert"
                  className="px-4 py-2.5 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs font-medium text-[#b91c1c]"
                >
                  {reportExportError}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-[#52647a]">
                <span className="font-mono tabular-nums">
                  Showing {filteredReports.length} of {allReports.length} published client briefs
                </span>
                {(categoryFilter !== 'All Briefs' || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setCategoryFilter('All Briefs');
                      setSearchQuery('');
                    }}
                    className="text-[#075d68] hover:text-[#10253f] font-semibold cursor-pointer"
                  >
                    Reset filters
                  </button>
                )}
              </div>

              {/* Publications Grid */}
              {filteredReports.length === 0 ? (
                <div className="bg-white border border-[#dae3e9] rounded-md p-10 text-center space-y-2">
                  <h2 className="text-base font-semibold text-[#10253f]">
                    No matching publications found
                  </h2>
                  <p className="text-sm text-[#52647a]">
                    Try another keyword or switch back to all published briefs.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredReports.map((rep) => {
                    const isExporting = exportingReportSlug === rep.slug;
                    const categoryLabel = rep.category ?? 'Executive Reports';
                    return (
                      <article
                        key={rep.slug}
                        className="bg-white border border-[#dae3e9] rounded-md p-6 flex flex-col justify-between gap-5"
                      >
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#52647a]">
                            <span className="font-semibold text-[#075d68]">
                              {categoryLabel}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{rep.editionLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">{rep.pagesLabel}</span>
                          </div>

                          <h2 className="text-lg font-bold text-[#10253f] leading-snug">
                            {rep.title}
                          </h2>

                          {rep.audience && (
                            <div className="text-xs text-[#52647a]">
                              <span className="font-semibold text-[#10253f]">Audience: </span>
                              {rep.audience}
                            </div>
                          )}

                          <p className="text-sm text-[#40536b] leading-relaxed">
                            {rep.subtitle}
                          </p>

                          {rep.keyHighlights && rep.keyHighlights.length > 0 && (
                            <ul className="pt-2.5 border-t border-[#eef5f7] space-y-1.5 text-xs text-[#2c3e54]">
                              {rep.keyHighlights.map((point) => (
                                <li key={point} className="flex items-start gap-2 leading-relaxed">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full bg-[#075d68] mt-1.5 shrink-0"
                                    aria-hidden="true"
                                  />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="space-y-3 pt-4 border-t border-[#dae3e9]">
                          {(rep.duration || rep.investmentAnchor) && (
                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs pb-2.5 border-b border-[#eef5f7]">
                              {rep.duration && (
                                <div className="text-[#52647a]">
                                  Scope:{' '}
                                  <span className="font-mono font-medium text-[#10253f] tabular-nums">
                                    {rep.duration}
                                  </span>
                                </div>
                              )}
                              {rep.investmentAnchor && (
                                <div className="text-[#52647a]">
                                  Anchor:{' '}
                                  <span className="font-mono font-semibold text-[#10253f] tabular-nums">
                                    {rep.investmentAnchor}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-4">
                              <button
                                type="button"
                                onClick={() => openReport(rep)}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#075d68] hover:text-[#10253f] whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                Read Formatted Report
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRequestScopingFromReport(rep.title)}
                                className="text-xs font-medium text-[#40536b] hover:text-[#10253f] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                Scope This Brief
                              </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleDownloadHtml(rep)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5" />
                                Download HTML
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDownloadPdf(rep)}
                                disabled={Boolean(exportingReportSlug)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] disabled:opacity-50 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                <FileDown className="w-3.5 h-3.5" />
                                {isExporting ? 'Exporting...' : 'Download PDF'}
                              </button>
                            </div>
                          </div>

                          {rep.referencePdfUrl && (
                            <div className="pt-2.5 border-t border-[#eef5f7] flex flex-wrap items-center justify-between gap-3 text-xs">
                              <span className="text-[#52647a]">Companion reference document</span>
                              <a
                                href={rep.referencePdfUrl}
                                download
                                className="inline-flex items-center gap-1.5 font-semibold text-[#075d68] hover:text-[#10253f] whitespace-nowrap"
                              >
                                <FileDown className="w-3.5 h-3.5" />
                                {rep.referencePdfLabel || 'Download Reference PDF'}
                              </a>
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Bottom Scoping & Assessment Callout */}
              <div className="bg-[#10253f] text-white rounded-md p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="text-xs font-semibold text-[#48c5b2]">
                    Board &amp; Executive Briefing Support
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white">
                    Need a tailored scoping brief or interactive AI Agent Governance diagnostic?
                  </h2>
                  <p className="text-sm text-[#d8e4f0] leading-relaxed">
                    Every published brief maps directly to a fixed-scope Phase 0 diagnostic
                    delivered inside your existing ERP, cloud, and Microsoft 365 estate with zero
                    statutory auditor conflicts.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={onOpenAgentAssessment}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#10253f] bg-[#48c5b2] hover:bg-[#64d4c4] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    AI Agent Self-Assessment
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onBackToShowcase('inquire')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#1e3b5c] hover:bg-[#274c77] border border-[#2d537e] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Request Scoping Call
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#10253f] text-[#c4d1df] border-t border-[#1e3b5c]">
        <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs">
          <div className="space-y-1">
            <div className="font-display text-base font-bold text-white">CBa Consult</div>
            <div>Menno Drescher · Independent Management &amp; Governance Advisory</div>
            <div className="text-[#9cb4cc]">
              Conflict-free pre-assurance, operational governance, and Managed Intelligence
              retainers.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={() => onBackToShowcase()}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Client Showcase
            </button>
            <button
              type="button"
              onClick={onOpenAgentAssessment}
              className="hover:text-white transition-colors cursor-pointer"
            >
              AI Agent Benchmark
            </button>
            <button
              type="button"
              onClick={() => onBackToShowcase('inquire')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Scope Assignment
            </button>
            <button
              type="button"
              onClick={onSwitchToInternal}
              className="text-[#9cb4cc] hover:text-white transition-colors cursor-pointer"
            >
              Advisor Login
            </button>
          </div>
        </div>
      </footer>

      {/* Client Executive Report Drawer */}
      <ClientReportDrawer
        report={activeReport}
        onRequestScoping={handleRequestScopingFromReport}
        onClose={closeReport}
      />

      {/* Unified Flagship One-Pager Drawer */}
      <ClientServiceDrawer
        selection={activeBrief}
        isShortlisted={activeBrief ? shortlist.includes(activeBrief.serviceLabel) : false}
        onToggleShortlist={onToggleShortlist}
        onRequestScoping={handleRequestScopingFromReport}
        onClose={() => setActiveBrief(null)}
      />
    </div>
  );
};
