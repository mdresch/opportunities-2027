import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  Download,
  FileDown,
  FileText,
  Menu,
  Plus,
  Search,
  X,
} from 'lucide-react';
import type {
  ClientPortfolioData,
  ClientReportEntry,
  ExecutiveAudience,
  ScopingInquiryResponse,
} from '../types';
import {
  ClientServiceDrawer,
  type ClientBriefSelection,
} from './ClientServiceDrawer';
import { ClientReportDrawer } from './ClientReportDrawer';
import { exportHtmlStringToPdf } from '../utils/pdfExport';
import heroBoardroomImg from '../assets/images/hero_cba_boardroom_1795700418173.jpg';
import governanceArchImg from '../assets/images/showcase_governance_architecture_1795700420378.jpg';

interface ClientShowcaseProps {
  shortlist: string[];
  onToggleShortlist: (serviceLabel: string) => void;
  onAddToShortlist: (serviceLabel: string) => void;
  onClearShortlist: () => void;
  onSwitchToInternal: () => void;
  onOpenAgentAssessment: () => void;
  onOpenReportsLibrary: () => void;
  initialSection?: string | null;
  onClearInitialNavigation?: () => void;
}

function slugifyBriefKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const HERO_IMAGE = heroBoardroomImg;
const ARCH_IMAGE = governanceArchImg;

const AUDIENCE_FILTERS: Array<'All Executives' | ExecutiveAudience> = [
  'All Executives',
  'CFO & Finance',
  'CIO & CISO',
  'COO & Commercial',
  'Board & PE',
];

const MIP_TIERS = [
  {
    name: 'MIP Essentials',
    audience: 'For mid-market teams scaling Copilot and initial AI workflows',
    cadence: 'Monthly Governance Scorecard, Agent Registry & FinOps check, policy drift review',
    price: '€2,500 – €4,000 / mo',
    serviceLabel: 'Managed Intelligence Provider — MIP Essentials',
  },
  {
    name: 'MIP Core',
    audience: 'For regulated enterprises operating active AI agents and RAG pipelines',
    cadence: 'Essentials + Knowledge/RAG stewardship, continuous ISO 42001 / EU AI Act evidence pack & quarterly Board brief',
    price: '€5,000 – €7,500 / mo',
    serviceLabel: 'Managed Intelligence Provider — MIP Core',
  },
  {
    name: 'MIP Enterprise (Fractional CAIO)',
    audience: 'For multi-entity, PE-backed, or sovereign-cloud organizations',
    cadence: 'Full 5-Asset stewardship, Agent Architecture oversight, Hyper-V / sovereign runtime governance & executive committee seat',
    price: '€8,500 – €12,000+ / mo',
    serviceLabel: 'Managed Intelligence Provider — MIP Enterprise',
  },
];

export const ClientShowcase: React.FC<ClientShowcaseProps> = ({
  shortlist,
  onToggleShortlist,
  onAddToShortlist,
  onClearShortlist,
  onSwitchToInternal,
  onOpenAgentAssessment,
  onOpenReportsLibrary,
  initialSection,
  onClearInitialNavigation,
}) => {
  const [data, setData] = useState<ClientPortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [archImgFailed, setArchImgFailed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [audienceFilter, setAudienceFilter] = useState<'All Executives' | ExecutiveAudience>(
    'All Executives'
  );
  const [catalogSearch, setCatalogSearch] = useState('');
  const [practiceFilter, setPracticeFilter] = useState('ALL');
  const [sizeFilter, setSizeFilter] = useState('ALL');
  const [showAllCatalog, setShowAllCatalog] = useState(false);

  const [activeBrief, setActiveBrief] = useState<ClientBriefSelection | null>(null);
  const [activeReport, setActiveReport] = useState<ClientReportEntry | null>(null);
  const [exportingReportSlug, setExportingReportSlug] = useState<string | null>(null);
  const [reportExportError, setReportExportError] = useState<string | null>(null);

  // Scoping form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [targetWindow, setTargetWindow] = useState('Q1 2027');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<ScopingInquiryResponse | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const syncDrawerParams = useCallback((briefKey: string | null, reportSlug: string | null) => {
    const url = new URL(window.location.href);
    url.searchParams.delete('brief');
    url.searchParams.delete('report');
    if (briefKey) url.searchParams.set('brief', briefKey);
    if (reportSlug) url.searchParams.set('report', reportSlug);
    if (url.toString() !== window.location.href) {
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const openBrief = useCallback(
    (brief: ClientBriefSelection, keyOverride?: string) => {
      setActiveReport(null);
      setActiveBrief(brief);
      syncDrawerParams(keyOverride || slugifyBriefKey(brief.title), null);
    },
    [syncDrawerParams]
  );

  const openReport = useCallback(
    (rep: ClientReportEntry) => {
      setActiveBrief(null);
      setActiveReport(rep);
      syncDrawerParams(null, rep.slug);
    },
    [syncDrawerParams]
  );

  const closeBrief = useCallback(() => {
    setActiveBrief(null);
    syncDrawerParams(null, null);
  }, [syncDrawerParams]);

  const closeReport = useCallback(() => {
    setActiveReport(null);
    syncDrawerParams(null, null);
  }, [syncDrawerParams]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/client-portfolio');
        if (!res.ok) throw new Error('Unable to load portfolio');
        const json: ClientPortfolioData = await res.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError('Unable to load CBa Consult advisory catalog.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setMobileNavOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    if (loading || !data) return;
    const params = new URLSearchParams(window.location.search);
    const reportParam = params.get('report');
    const briefParam = params.get('brief');
    if (reportParam) {
      const matchedReport = data.clientReports.find((r) => r.slug === reportParam);
      if (matchedReport) setActiveReport(matchedReport);
    } else if (briefParam) {
      const targetKey = slugifyBriefKey(briefParam);
      if (targetKey === 'mip') {
        setActiveBrief({
          title: 'Managed Intelligence Provider (MIP)',
          subtitle: 'Ongoing Governance Stewardship · CEO, CIO, CFO, CISO & PE',
          serviceLabel: 'Managed Intelligence Provider (MIP) Retainer',
          duration: 'Monthly retainer',
          investmentRange: '€2,500 – €12,000+ / mo',
          onePagerPath: data.mipOnePagerPath,
        });
      } else if (targetKey === 'flagship-overview') {
        setActiveBrief({
          title: 'Flagship Opportunities Overview (2027–2030)',
          subtitle: 'CBa Consult · Executive Client Brief',
          serviceLabel: 'Executive Portfolio Scoping Call',
          duration: '3–10 weeks fixed scope',
          investmentRange: '€1,500 – €18,000+',
          onePagerPath: data.flagshipOverviewPath,
        });
      } else {
        const flagship = data.flagships.find(
          (f) => f.id.toLowerCase() === briefParam.toLowerCase() || slugifyBriefKey(f.title) === targetKey
        );
        if (flagship) {
          setActiveBrief({
            title: flagship.title,
            subtitle: `${flagship.strategicAsset} · ${flagship.buyerLine}`,
            serviceLabel: flagship.title,
            duration: flagship.duration,
            investmentRange: flagship.investmentRange,
            onePagerPath: flagship.onePagerPath,
          });
        } else {
          const catalogItem = data.catalog.find(
            (c) => c.id.toLowerCase() === briefParam.toLowerCase() || slugifyBriefKey(c.title) === targetKey
          );
          if (catalogItem) {
            setActiveBrief({
              title: catalogItem.title,
              subtitle: `${catalogItem.practice} · ${catalogItem.category}`,
              serviceLabel: catalogItem.title,
              duration: catalogItem.duration,
              investmentRange: catalogItem.investmentRange,
              onePagerPath: catalogItem.onePagerPath,
              description: catalogItem.description,
              toolkit: catalogItem.toolkit,
            });
          }
        }
      }
    }
  }, [loading, data]);

  useEffect(() => {
    if (loading || !data || !initialSection) return;
    const timer = window.setTimeout(() => {
      scrollToSection(initialSection);
      onClearInitialNavigation?.();
    }, 60);
    return () => window.clearTimeout(timer);
  }, [loading, data, initialSection, onClearInitialNavigation, scrollToSection]);

  const featuredReports = useMemo(() => {
    if (!data) return [];
    return data.clientReports
      .filter((rep) => rep.featuredOnHome !== false)
      .slice(0, 4);
  }, [data]);

  const handleRequestScoping = (label: string) => {
    onAddToShortlist(label);
    closeBrief();
    closeReport();
    window.setTimeout(() => scrollToSection('inquire'), 60);
  };

  const handleDownloadClientReportHtml = async (report: ClientReportEntry) => {
    setReportExportError(null);
    try {
      const res = await fetch(report.url);
      if (!res.ok) throw new Error('Unable to download report');
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
      setReportExportError('Unable to download the selected report right now.');
    }
  };

  const handleDownloadClientReportPdf = async (report: ClientReportEntry) => {
    if (exportingReportSlug) return;
    setExportingReportSlug(report.slug);
    setReportExportError(null);
    try {
      const res = await fetch(report.url);
      if (!res.ok) throw new Error('Unable to load report');
      const html = await res.text();
      await exportHtmlStringToPdf(html, report.slug);
    } catch {
      setReportExportError('Unable to export PDF right now. Please try again.');
    } finally {
      setExportingReportSlug(null);
    }
  };

  const filteredFlagships = useMemo(() => {
    if (!data) return [];
    if (audienceFilter === 'All Executives') return data.flagships;
    return data.flagships.filter((f) => f.audiences.includes(audienceFilter));
  }, [data, audienceFilter]);

  const filteredCatalog = useMemo(() => {
    if (!data) return [];
    const q = catalogSearch.trim().toLowerCase();
    return data.catalog.filter((item) => {
      if (practiceFilter !== 'ALL' && item.practice !== practiceFilter) return false;
      if (sizeFilter !== 'ALL' && !item.organizationSize.toLowerCase().includes(sizeFilter)) {
        return false;
      }
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.practice.toLowerCase().includes(q) ||
        item.toolkit.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [data, catalogSearch, practiceFilter, sizeFilter]);

  const visibleCatalog = showAllCatalog ? filteredCatalog : filteredCatalog.slice(0, 12);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const cleanName = fullName.trim().slice(0, 120);
    const cleanOrg = organization.trim().slice(0, 160);
    const cleanEmail = email.trim().slice(0, 160);
    const cleanRole = (role.trim() || 'Executive Sponsor').slice(0, 120);
    const cleanNotes = notes.trim().slice(0, 2000);
    const cleanServices = shortlist
      .map((s) => s.trim().slice(0, 160))
      .filter((s) => s.length > 0)
      .slice(0, 12);

    if (cleanName.length < 2 || cleanOrg.length < 2) {
      setFormError('Please enter your full name and organization (at least 2 characters).');
      return;
    }
    if (cleanEmail.length < 5 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setFormError('Please enter a valid work email address.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: cleanName,
          email: cleanEmail,
          organization: cleanOrg,
          role: cleanRole,
          targetWindow,
          selectedServices: cleanServices,
          notes: cleanNotes,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setFormError(json.error || 'Could not submit scoping request.');
        return;
      }

      const confirmed = json as ScopingInquiryResponse;
      try {
        const { saveScopingInquiryToFirestore } = await import('../firebase');
        await saveScopingInquiryToFirestore(
          confirmed.referenceId,
          confirmed.inquiry,
          confirmed.emailDeliveryStatus
        );
      } catch (firestoreErr) {
        console.warn('Client Firestore mirror skipped:', firestoreErr);
      }
      setConfirmation(confirmed);
    } catch {
      setFormError('Unable to submit your scoping request right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const buildSummaryText = (resp: ScopingInquiryResponse) => {
    const { referenceId, inquiry } = resp;
    return [
      `CBa Consult — Assignment Scoping Brief (${referenceId})`,
      `Client: ${inquiry.fullName} (${inquiry.role}), ${inquiry.organization}`,
      `Email: ${inquiry.email}`,
      `Target Window: ${inquiry.targetWindow}`,
      `Shortlisted Engagements: ${
        inquiry.selectedServices.length > 0
          ? inquiry.selectedServices.join('; ')
          : 'Executive Discovery & Initial Scope Selection'
      }`,
      inquiry.notes ? `Objectives: ${inquiry.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleCopySummary = () => {
    if (!confirmation) return;
    navigator.clipboard?.writeText(buildSummaryText(confirmation));
    setCopiedSummary(true);
    window.setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleDownloadSummaryMarkdown = () => {
    if (!confirmation) return;
    const { referenceId, inquiry } = confirmation;
    const md = [
      `# CBa Consult — Assignment Scoping Brief (${referenceId})`,
      '',
      `- **Client:** ${inquiry.fullName} (${inquiry.role})`,
      `- **Organization:** ${inquiry.organization}`,
      `- **Work Email:** ${inquiry.email}`,
      `- **Target Window:** ${inquiry.targetWindow}`,
      `- **Shortlisted Scope:** ${
        inquiry.selectedServices.length > 0
          ? inquiry.selectedServices.join('; ')
          : 'Executive Discovery & Initial Scope Selection'
      }`,
      inquiry.notes ? `\n## Context & Objectives\n${inquiry.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CBa-Consult-Scoping-Brief-${referenceId}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f5f8fa] text-[#17243a] flex flex-col">
      {/* Top Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-[#dae3e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-8">
          {/* Zone 1: Single clean text wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="md:hidden min-h-[44px] min-w-[44px] -ml-2 flex items-center justify-center text-[#10253f] hover:bg-[#eef5f7] rounded-md cursor-pointer"
              aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileNavOpen}
              aria-controls="client-showcase-mobile-nav"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setMobileNavOpen(false);
                const prefersReducedMotion = window.matchMedia(
                  '(prefers-reduced-motion: reduce)'
                ).matches;
                window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
              }}
              className="font-display text-lg font-bold tracking-tight text-[#10253f] whitespace-nowrap shrink-0"
            >
              CBa Consult
            </a>
          </div>

          {/* Zone 2: Concise single-line text nav links */}
          <nav
            className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-[#40536b]"
            aria-label="Client showcase navigation"
          >
            <button
              type="button"
              onClick={() => scrollToSection('flagships')}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Flagships
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('engagement')}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              How We Engage
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('proof')}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Proof
            </button>
            <button
              type="button"
              onClick={onOpenReportsLibrary}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Reports
            </button>
            <button
              type="button"
              onClick={onOpenAgentAssessment}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              AI Benchmark
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('catalog')}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Service Catalog
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('mip')}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Managed Intelligence
            </button>
          </nav>

          {/* Zone 3: 1 primary CTA */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('inquire')}
              className="px-3.5 sm:px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="sm:hidden">Scope Call{shortlist.length > 0 ? ` (${shortlist.length})` : ''}</span>
              <span className="hidden sm:inline">
                Request Scoping Call{shortlist.length > 0 ? ` (${shortlist.length})` : ''}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileNavOpen && (
          <nav
            id="client-showcase-mobile-nav"
            aria-label="Mobile client navigation"
            className="md:hidden bg-white border-t border-[#dae3e9] px-4 py-3 space-y-1"
          >
            <button
              type="button"
              onClick={() => scrollToSection('flagships')}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-[#10253f] hover:bg-[#eef5f7] rounded-md cursor-pointer"
            >
              Flagship Engagements
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('engagement')}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-[#10253f] hover:bg-[#eef5f7] rounded-md cursor-pointer"
            >
              How We Engage
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('proof')}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-[#10253f] hover:bg-[#eef5f7] rounded-md cursor-pointer"
            >
              Proof &amp; Benchmarks
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileNavOpen(false);
                onOpenReportsLibrary();
              }}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-[#075d68] hover:bg-[#eef5f7] rounded-md cursor-pointer"
            >
              Executive Reports &amp; Briefs
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileNavOpen(false);
                onOpenAgentAssessment();
              }}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-[#075d68] hover:bg-[#eef5f7] rounded-md cursor-pointer"
            >
              AI Agent Governance Benchmark
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('catalog')}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-[#10253f] hover:bg-[#eef5f7] rounded-md cursor-pointer"
            >
              Service Catalog
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('mip')}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-[#10253f] hover:bg-[#eef5f7] rounded-md cursor-pointer"
            >
              Managed Intelligence (MIP)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('inquire')}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-[#10253f] hover:bg-[#eef5f7] rounded-md cursor-pointer"
            >
              Scope Assignment
            </button>
          </nav>
        )}
      </header>

      {/* Main Presentation Content */}
      <main id="top" className="flex-1">
        {/* Hero Split */}
        <section className="bg-white border-b border-[#dae3e9]">
          <div className="max-w-[1280px] mx-auto px-6 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center py-2">
                <div className="text-xs font-semibold text-[#075d68] mb-3">
                  Independent Management &amp; Governance Advisory · Conflict-Free Pre-Assurance
                </div>
                <h1 className="font-display text-[clamp(2.25rem,3.6vw,3.25rem)] font-bold text-[#10253f] leading-[1.1] tracking-tight">
                  Verifiable operational truth across finance, AI agents, and enterprise governance
                </h1>
                <p className="text-[16px] leading-[1.65] text-[#40536b] mt-5 max-w-[58ch]">
                  CBa Consult delivers fixed-scope assessments, operational blueprints, and
                  recurring Managed Intelligence retainers for mid-market and regulated enterprises
                  — using your existing ERP, cloud, and Microsoft 365 estate with zero statutory
                  auditor conflicts.
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-8">
                  <button
                    type="button"
                    onClick={() => scrollToSection('flagships')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Explore Flagship Engagements
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  {data && data.clientReports.length > 0 && (
                    <button
                      type="button"
                      onClick={() => openReport(data.clientReports[0])}
                      className="text-sm font-semibold text-[#075d68] hover:text-[#10253f] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Executive Summary
                    </button>
                  )}
                  {data && data.clientReports.length > 1 && (
                    <button
                      type="button"
                      onClick={() => openReport(data.clientReports[1])}
                      className="text-sm font-medium text-[#40536b] hover:text-[#10253f] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {data.clientReports[1].title}
                    </button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="w-full h-[300px] sm:h-[360px] lg:h-full min-h-[340px] rounded-md overflow-hidden border border-[#dae3e9] bg-[#10253f]">
                  {heroImgFailed ? (
                    <div className="w-full h-full flex flex-col justify-end p-8 bg-gradient-to-br from-[#10253f] via-[#142a48] to-[#075d68] text-white">
                      <div className="text-xs font-mono text-[#48c5b2]">CBa Consult</div>
                      <div className="text-xl font-semibold mt-1">
                        Truth Production Governance Architecture
                      </div>
                    </div>
                  ) : (
                    <img
                      src={HERO_IMAGE}
                      alt="Modern European executive advisory boardroom with minimalist oak conference table and city skyline"
                      width={1376}
                      height={768}
                      fetchPriority="high"
                      decoding="sync"
                      onError={() => setHeroImgFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* 4-Column Executive Proof Strip below hero split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#dae3e9] border border-[#dae3e9] rounded-md overflow-hidden mt-12">
              <div className="bg-[#f5f8fa] p-5">
                <div className="text-xs text-[#52647a] mb-1">Fixed-Scope Delivery</div>
                <div className="text-xl font-bold font-mono tabular-nums text-[#10253f]">
                  3–10 Weeks
                </div>
                <div className="text-xs text-[#40536b] mt-1">
                  Bounded diagnostics, blueprints & live pilots
                </div>
              </div>
              <div className="bg-[#f5f8fa] p-5">
                <div className="text-xs text-[#52647a] mb-1">Independence Guarantee</div>
                <div className="text-xl font-bold font-mono tabular-nums text-[#0c8b82]">
                  100% Conflict-Free
                </div>
                <div className="text-xs text-[#40536b] mt-1">
                  Zero PCAOB or EU PIE statutory-audit conflicts
                </div>
              </div>
              <div className="bg-[#f5f8fa] p-5">
                <div className="text-xs text-[#52647a] mb-1">Software Neutrality</div>
                <div className="text-xl font-bold font-mono tabular-nums text-[#10253f]">
                  €0 New Licenses
                </div>
                <div className="text-xs text-[#40536b] mt-1">
                  Built on your existing ERP, M365 & cloud stack
                </div>
              </div>
              <div className="bg-[#f5f8fa] p-5">
                <div className="text-xs text-[#52647a] mb-1">Advisory Coverage</div>
                <div className="text-xl font-bold font-mono tabular-nums text-[#10253f]">
                  5 Strategic Assets
                </div>
                <div className="text-xs text-[#40536b] mt-1">
                  Finance, Knowledge, Agents, Evidence & Sovereignty
                </div>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="max-w-[1280px] mx-auto px-6 py-16 space-y-6">
            <div className="h-8 w-72 bg-[#dae3e9] rounded animate-pulse" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-64 bg-white border border-[#dae3e9] rounded-md animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="max-w-lg mx-auto px-6 py-16 text-center">
            <p className="text-sm text-[#dc2626]">{error}</p>
          </div>
        ) : data ? (
          <>
            {/* Section 01: Flagship Engagements */}
            <section id="flagships" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="text-xs font-semibold text-[#075d68] mb-1.5">
                    01. Flagship Advisory Engagements
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#10253f] tracking-tight">
                    Fixed-scope engagements built for measurable business outcomes
                  </h2>
                  <p className="text-[15px] text-[#40536b] mt-2 leading-relaxed">
                    Select your executive mandate to review relevant flagship assessments, concrete
                    deliverables, and client service briefs.
                  </p>
                </div>

                {/* Role Filter Segmented Control */}
                <div
                  className="flex items-center gap-1 p-1 bg-white border border-[#dae3e9] rounded-md overflow-x-auto shrink-0"
                  role="group"
                  aria-label="Filter flagships by executive mandate"
                >
                  {AUDIENCE_FILTERS.map((aud) => (
                    <button
                      key={aud}
                      type="button"
                      aria-pressed={audienceFilter === aud}
                      onClick={() => setAudienceFilter(aud)}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        audienceFilter === aud
                          ? 'bg-[#10253f] text-white'
                          : 'text-[#52647a] hover:text-[#10253f]'
                      }`}
                    >
                      {aud}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredFlagships.map((service, index) => {
                  const isAdded = shortlist.includes(service.title);
                  const isWide =
                    audienceFilter === 'All Executives' &&
                    filteredFlagships.length % 2 === 1 &&
                    index === 0;
                  return (
                    <article
                      key={service.id}
                      className={`bg-white border border-[#dae3e9] rounded-md p-6 flex flex-col justify-between gap-6 ${
                        isWide ? 'lg:col-span-2' : ''
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#52647a]">
                          <span className="font-semibold text-[#075d68]">
                            {service.strategicAsset}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{service.buyerLine}</span>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-[#10253f] leading-snug">
                            {service.title}
                          </h3>
                          <p className="text-sm font-medium text-[#142a48] mt-1">
                            {service.headline}
                          </p>
                        </div>

                        <p className="text-[14.5px] leading-relaxed text-[#40536b] max-w-[70ch]">
                          {service.summary}
                        </p>

                        <div className="pt-2 border-t border-[#dae3e9]">
                          <div className="text-xs font-semibold text-[#52647a] mb-2">
                            Key Engagement Deliverables
                          </div>
                          <ul className="space-y-1.5 text-[13.5px] text-[#17243a]">
                            {service.outcomes.map((out) => (
                              <li key={out} className="flex items-start gap-2">
                                <span
                                  className="text-[#075d68] font-bold select-none mt-0.5"
                                  aria-hidden="true"
                                >
                                  —
                                </span>
                                <span>{out}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-[#dae3e9]">
                        <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
                          <div className="text-[#52647a]">
                            Duration:{' '}
                            <span className="font-mono font-medium text-[#10253f] tabular-nums">
                              {service.duration}
                            </span>
                          </div>
                          <div className="text-[#52647a]">
                            Investment Anchor:{' '}
                            <span className="font-mono font-semibold text-[#10253f] tabular-nums">
                              {service.investmentRange}
                            </span>
                          </div>
                        </div>

                        {service.entryWedge && (
                          <div className="text-xs text-[#40536b] bg-[#f5f8fa] px-3 py-2 rounded border border-[#dae3e9]">
                            <span className="font-semibold text-[#075d68]">Entry option: </span>
                            {service.entryWedge}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          <div className="flex flex-wrap items-center gap-4">
                            <button
                              type="button"
                              onClick={() =>
                                openBrief(
                                  {
                                    title: service.title,
                                    subtitle: `${service.strategicAsset} · ${service.buyerLine}`,
                                    serviceLabel: service.title,
                                    duration: service.duration,
                                    investmentRange: service.investmentRange,
                                    onePagerPath: service.onePagerPath,
                                  },
                                  service.id
                                )
                              }
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#075d68] hover:text-[#10253f] whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              Read Client One-Pager
                            </button>
                            {service.id === 'OP-ITG-013' && (
                              <button
                                type="button"
                                onClick={onOpenAgentAssessment}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#10253f] hover:text-[#075d68] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                Launch Self-Assessment
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          <button
                            type="button"
                            aria-pressed={isAdded}
                            onClick={() => onToggleShortlist(service.title)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              isAdded
                                ? 'bg-[#eef5f7] border-[#075d68] text-[#075d68]'
                                : 'bg-white border-[#dae3e9] text-[#10253f] hover:bg-[#f5f8fa]'
                            }`}
                          >
                            {isAdded ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" />
                            )}
                            {isAdded ? 'Shortlisted' : 'Add to Scoping'}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Interactive Self-Assessment Spotlight Band */}
              <div className="bg-[#10253f] text-white rounded-md p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="text-xs font-semibold text-[#48c5b2]">
                    Interactive Diagnostic · 5-Minute Triage or Full 40-Control Audit
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Benchmark your Enterprise AI Agent Governance before December 2027
                  </h3>
                  <p className="text-sm text-[#d8e4f0] leading-relaxed">
                    Evaluate shadow Copilot sprawl, Entra Agent ID boundaries, FinOps spend limits,
                    and EU AI Act Annex III readiness to generate an instant executive PDF scorecard
                    and tailored Phase 0 or full 8-pillar scoping path.
                  </p>
                </div>
                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={onOpenAgentAssessment}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#10253f] bg-[#48c5b2] hover:bg-[#64d4c4] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Start AI Agent Self-Assessment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Client Executive Reports & Priority Briefs Band (Curated 4-Item Front Page) */}
              {featuredReports.length > 0 && (
                <div
                  id="executive-reports"
                  className="pt-8 border-t border-[#dae3e9] space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="max-w-2xl">
                      <div className="text-xs font-semibold text-[#075d68] mb-1">
                        Executive Reports &amp; Priority Briefs
                      </div>
                      <h3 className="text-xl font-bold text-[#10253f] tracking-tight">
                        Shareable client-facing briefs for board &amp; leadership review
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          openBrief(
                            {
                              title: 'Flagship Opportunities Overview (2027–2030)',
                              subtitle: 'CBa Consult · Executive Client Brief',
                              serviceLabel: 'Executive Portfolio Scoping Call',
                              duration: '3–10 weeks fixed scope',
                              investmentRange: '€1,500 – €18,000+',
                              onePagerPath: data.flagshipOverviewPath,
                            },
                            'flagship-overview'
                          )
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#40536b] hover:text-[#10253f] whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Unified Flagship One-Pager
                      </button>
                      <button
                        type="button"
                        onClick={onOpenReportsLibrary}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#075d68] hover:text-[#10253f] bg-white hover:bg-[#eef5f7] border border-[#dae3e9] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        All Reports &amp; Briefs ({data.clientReports.length})
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
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

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {featuredReports.map((rep) => {
                      const isExporting = exportingReportSlug === rep.slug;
                      return (
                        <div
                          key={rep.slug}
                          className="bg-white border border-[#dae3e9] rounded-md p-6 flex flex-col justify-between gap-5"
                        >
                          <div className="space-y-2.5">
                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#52647a]">
                              <span className="font-semibold text-[#075d68]">
                                {rep.editionLabel}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">{rep.pagesLabel}</span>
                            </div>
                            <h4 className="text-lg font-bold text-[#10253f] leading-snug">
                              {rep.title}
                            </h4>
                            <p className="text-sm text-[#40536b] leading-relaxed">
                              {rep.subtitle}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#dae3e9]">
                            <button
                              type="button"
                              onClick={() => openReport(rep)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#075d68] hover:text-[#10253f] whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              Read Formatted Report
                            </button>
                            <div className="flex flex-wrap items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleDownloadClientReportHtml(rep)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5" />
                                Download HTML
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDownloadClientReportPdf(rep)}
                                disabled={Boolean(exportingReportSlug)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] disabled:opacity-50 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                <FileDown className="w-3.5 h-3.5" />
                                {isExporting ? 'Exporting...' : 'Download PDF'}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>

            {/* Section 02: How Clients Engage */}
            <section id="engagement" className="bg-white border-y border-[#dae3e9]">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                  <div className="lg:col-span-5">
                    <div className="w-full h-[280px] lg:h-full min-h-[320px] rounded-md overflow-hidden border border-[#dae3e9] bg-[#10253f]">
                      {archImgFailed ? (
                        <div className="w-full h-full flex items-end p-8 bg-gradient-to-br from-[#10253f] to-[#075d68] text-white">
                          <div className="text-lg font-semibold">
                            Observe · Measure · Govern · Trace · Certify · Improve
                          </div>
                        </div>
                      ) : (
                        <img
                          src={ARCH_IMAGE}
                          alt="Minimalist limestone and glass architectural pavilion representing clarity and structural governance"
                          width={1200}
                          height={896}
                          loading="lazy"
                          decoding="async"
                          onError={() => setArchImgFailed(true)}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                    <div>
                      <div className="text-xs font-semibold text-[#075d68] mb-1.5">
                        02. Engagement Architecture
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#10253f] tracking-tight">
                        Start with a bounded Phase 0 diagnostic, scale only on verified proof
                      </h2>
                      <p className="text-[15px] text-[#40536b] mt-2 leading-relaxed">
                        Every assignment follows our 6-stage Truth Production Governance operating
                        model — <strong>Observe → Measure → Govern → Trace → Certify → Improve</strong>{' '}
                        — so leadership gains concrete operational controls rather than static slide
                        decks.
                      </p>
                    </div>

                    <div className="divide-y divide-[#dae3e9] border-y border-[#dae3e9]">
                      <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <div className="sm:col-span-4">
                          <div className="text-sm font-bold text-[#10253f]">
                            01. Phase 0 Diagnostic
                          </div>
                          <div className="text-xs font-mono text-[#075d68] tabular-nums mt-0.5">
                            2–4 weeks · €500 – €5,000
                          </div>
                        </div>
                        <p className="sm:col-span-8 text-sm text-[#40536b] leading-relaxed">
                          Targeted diagnostic on your existing estate — such as Agent Sprawl Triage,
                          Quote-to-Delivery Handoff Mapping, or an Information Quality Baseline —
                          to quantify exposure and build an internal business case before larger
                          commitments.
                        </p>
                      </div>

                      <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <div className="sm:col-span-4">
                          <div className="text-sm font-bold text-[#10253f]">
                            02. Fixed-Scope Flagship
                          </div>
                          <div className="text-xs font-mono text-[#075d68] tabular-nums mt-0.5">
                            6–10 weeks · €3,000 – €18,000+
                          </div>
                        </div>
                        <p className="sm:col-span-8 text-sm text-[#40536b] leading-relaxed">
                          Full assessment, control architecture, remediation roadmap, and live dry-run
                          validation across Finance, Knowledge/RAG, AI Agents, ISO 42001 / EU AI Act
                          readiness, or Hyper-V sandbox deployment.
                        </p>
                      </div>

                      <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <div className="sm:col-span-4">
                          <div className="text-sm font-bold text-[#10253f]">
                            03. Managed Intelligence
                          </div>
                          <div className="text-xs font-mono text-[#075d68] tabular-nums mt-0.5">
                            Ongoing · €2,500 – €12,000+/mo
                          </div>
                        </div>
                        <p className="sm:col-span-8 text-sm text-[#40536b] leading-relaxed">
                          Continuous stewardship operating cleanly above your MSP and MSSP —
                          keeping agent inventories, RAG quality, FinOps ceilings, and regulatory
                          evidence packs audit-ready every quarter.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 03: Proof Architecture & Engineering Benchmarks (OP-X-004 × OP-X-006) */}
            <section id="proof" className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-16 pb-4 space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="text-xs font-semibold text-[#075d68] mb-1.5">
                    03. Proof Architecture &amp; Benchmarks
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#10253f] tracking-tight">
                    Transparent engineering provenance now — audit-safe client proof from Day 1
                  </h2>
                  <p className="text-[15px] text-[#40536b] mt-2 leading-relaxed">
                    We strictly separate inspectable engineering and methodology provenance from
                    2027 client pilot results — zero fabricated quotes, zero selection-bias fluff,
                    and mandatory client redaction control.
                  </p>
                </div>
                {(() => {
                  const proofReport = data.clientReports.find(
                    (r) => r.slug === 'op-x-004-proof-architecture'
                  );
                  return proofReport ? (
                    <button
                      type="button"
                      onClick={() => openReport(proofReport)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#075d68]" />
                      Read Proof &amp; GEO Brief (A4 / PDF)
                    </button>
                  ) : null;
                })()}
              </div>

              {/* Honest Evidence Baseline Notice */}
              <div className="bg-[#eef5f7] border border-[#b8d8d6] border-l-4 border-l-[#0c8b82] rounded-md p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#075d68]">
                    Two-Class Honest Evidence Standard (OP-X-004)
                  </div>
                  <p className="text-sm text-[#17243a] leading-relaxed max-w-3xl">
                    <strong>Class B (Live Today):</strong> Inspectable runtime benchmarks, contract
                    test suites, and 65-control diagnostic rubrics below.{' '}
                    <strong>Class A (2027 Client Pilot Briefs · 0 Published):</strong> Populated
                    strictly as Wave 1–2 engagements complete with Week-1 baseline telemetry,
                    disclosed pitfalls, and client-approved redaction.
                  </p>
                </div>
                <span className="font-mono text-xs font-semibold text-[#075d68] bg-white border border-[#b8d8d6] px-3 py-1.5 rounded whitespace-nowrap shrink-0">
                  3 Live Benchmarks · 0 Synthetic Quotes
                </span>
              </div>

              {/* 3 Live Engineering & Provenance Benchmark Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <article className="bg-white border border-[#dae3e9] rounded-md p-6 flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-mono font-semibold text-[#075d68]">REF-ITG-017</span>
                      <span className="px-2 py-0.5 rounded bg-[#eef5f7] text-[#075d68] font-medium">
                        Engineering Provenance
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#10253f]">
                      MXC Hyper-V &lt;300ms JIT Micro-Isolation
                    </h3>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="bg-[#f5f8fa] border border-[#dae3e9] rounded p-2.5">
                        <div className="font-mono text-base font-bold text-[#10253f] tabular-nums">
                          &lt;300ms
                        </div>
                        <div className="text-[11px] text-[#52647a]">Warm wake vs 14–45s boot</div>
                      </div>
                      <div className="bg-[#f5f8fa] border border-[#dae3e9] rounded p-2.5">
                        <div className="font-mono text-base font-bold text-[#0c8b82] tabular-nums">
                          271 / 271
                        </div>
                        <div className="text-[11px] text-[#52647a]">Contract tests &amp; 0.0% idle</div>
                      </div>
                    </div>
                    <p className="text-xs text-[#40536b] leading-relaxed">
                      Built and verified in <code className="font-mono">mdresch/mxc</code> (Stage
                      18) with sterile <code className="font-mono">.avhdx</code> differential
                      resets and Win11 Lean Agent VM checks. Client silicon benchmark sprint scoped
                      over 4–8 weeks.
                    </p>
                  </div>
                  {(() => {
                    const rep = data.clientReports.find(
                      (r) => r.slug === 'op-itg-017-mxc-one-pager'
                    );
                    return rep ? (
                      <button
                        type="button"
                        onClick={() => openReport(rep)}
                        className="w-full py-2 px-3 text-xs font-medium text-[#075d68] bg-[#f5f8fa] hover:bg-[#eef5f7] border border-[#dae3e9] rounded-md text-center cursor-pointer"
                      >
                        Inspect MXC Technical Brief
                      </button>
                    ) : null;
                  })()}
                </article>

                <article className="bg-white border border-[#dae3e9] rounded-md p-6 flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-mono font-semibold text-[#075d68]">REF-FIN-009</span>
                      <span className="px-2 py-0.5 rounded bg-[#eef5f7] text-[#075d68] font-medium">
                        Methodology Provenance
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#10253f]">
                      23rd → Post-3rd Continuous Close Bridge
                    </h3>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="bg-[#f5f8fa] border border-[#dae3e9] rounded p-2.5">
                        <div className="font-mono text-base font-bold text-[#10253f] tabular-nums">
                          10 Controls
                        </div>
                        <div className="text-[11px] text-[#52647a]">Accrual, 4-4-5 &amp; IFRS 18</div>
                      </div>
                      <div className="bg-[#f5f8fa] border border-[#dae3e9] rounded p-2.5">
                        <div className="font-mono text-base font-bold text-[#0c8b82] tabular-nums">
                          €0 Software
                        </div>
                        <div className="text-[11px] text-[#52647a]">Existing ERP &amp; BI stack</div>
                      </div>
                    </div>
                    <p className="text-xs text-[#40536b] leading-relaxed">
                      Originated in RGP (2007–2008) 23rd-payroll close practice and updated for
                      2027 IFRS 18 ¶117 / ¶78–83 and SoD controls. Targets ≤2–3 business days
                      post-3rd close on one live dry-run cycle.
                    </p>
                  </div>
                  {(() => {
                    const rep = data.clientReports.find(
                      (r) => r.slug === 'op-fin-009-continuous-close-one-pager'
                    );
                    return rep ? (
                      <button
                        type="button"
                        onClick={() => openReport(rep)}
                        className="w-full py-2 px-3 text-xs font-medium text-[#075d68] bg-[#f5f8fa] hover:bg-[#eef5f7] border border-[#dae3e9] rounded-md text-center cursor-pointer"
                      >
                        Inspect Continuous Close Brief
                      </button>
                    ) : null;
                  })()}
                </article>

                <article className="bg-white border border-[#dae3e9] rounded-md p-6 flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-mono font-semibold text-[#075d68]">
                        REF-ITG-013/14
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#eef5f7] text-[#075d68] font-medium">
                        Diagnostic IP Live
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#10253f]">
                      65-Control Agent &amp; Context Governance Stack
                    </h3>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="bg-[#f5f8fa] border border-[#dae3e9] rounded p-2.5">
                        <div className="font-mono text-base font-bold text-[#10253f] tabular-nums">
                          40 + 25
                        </div>
                        <div className="text-[11px] text-[#52647a]">Agent + Context controls</div>
                      </div>
                      <div className="bg-[#f5f8fa] border border-[#dae3e9] rounded p-2.5">
                        <div className="font-mono text-base font-bold text-[#0c8b82] tabular-nums">
                          Dec 2027
                        </div>
                        <div className="text-[11px] text-[#52647a]">EU AI Act &amp; ISO 42001</div>
                      </div>
                    </div>
                    <p className="text-xs text-[#40536b] leading-relaxed">
                      Operationalizes ADPA, ECS, and Microsoft Entra Agent ID / Work IQ readiness
                      into a deterministic maturity baseline — inspectable right now via our live
                      executive benchmark tool.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenAgentAssessment}
                    className="w-full py-2 px-3 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md text-center cursor-pointer"
                  >
                    Launch 5-Min AI Benchmark
                  </button>
                </article>
              </div>

              {/* 3-Tier Privacy & Early-Adopter Co-Design Panel */}
              <div className="bg-white border border-[#dae3e9] rounded-md p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="text-xs font-semibold text-[#075d68]">
                    Early-Adopter Co-Design Program (OP-X-004 × OP-X-006)
                  </div>
                  <h3 className="text-xl font-bold text-[#10253f]">
                    Audit-safe Day-1 baseline capture with a 10–15% Co-Design pilot credit
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="bg-[#f5f8fa] border border-[#dae3e9] rounded p-3">
                      <div className="text-xs font-bold text-[#10253f]">Tier 1 · Blind Telemetry</div>
                      <p className="text-xs text-[#40536b] mt-1 leading-relaxed">
                        Industry &amp; FTE band + verified KPI delta only. Zero narrative or brand
                        exposure.
                      </p>
                    </div>
                    <div className="bg-[#eef5f7] border border-[#b8d8d6] rounded p-3">
                      <div className="text-xs font-bold text-[#075d68]">
                        Tier 2 · Sanitized Archetype
                      </div>
                      <p className="text-xs text-[#40536b] mt-1 leading-relaxed">
                        De-identified 6-Block brief + <strong>5-day redaction veto</strong> +{' '}
                        <strong>10–15% pilot credit</strong>.
                      </p>
                    </div>
                    <div className="bg-[#f5f8fa] border border-[#dae3e9] rounded p-3">
                      <div className="text-xs font-bold text-[#10253f]">
                        Tier 3 · Named Peer Call
                      </div>
                      <p className="text-xs text-[#40536b] mt-1 leading-relaxed">
                        Written text sign-off + max 2 × 15-min peer calls/qtr +{' '}
                        <strong>15% credit</strong>.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleRequestScoping('Early-Adopter Co-Design Pilot (OP-X-006 / OP-X-004)')
                    }
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md cursor-pointer"
                  >
                    Request Co-Design Pilot Credit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      openBrief(
                        {
                          title: 'Operating-Model Pilot Case Study Series (OP-X-004)',
                          subtitle: 'Proof & GEO Architecture · All Segments',
                          serviceLabel: 'Early-Adopter Co-Design Pilot (OP-X-006 / OP-X-004)',
                          duration: 'Day-1 Co-Design · Q3 Series',
                          investmentRange: '10–15% Pilot Credit · €500–€2,000 Pack',
                          onePagerPath:
                            'opportunities/OP-X-004_Case_study_series_on_2027/One_Pager_OP-X-004_Case_Study_Series.md',
                        },
                        'op-x-004'
                      )
                    }
                    className="w-full py-2 px-4 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] rounded-md cursor-pointer"
                  >
                    Read OP-X-004 Program One-Pager
                  </button>
                </div>
              </div>
            </section>

            {/* Section 04: Managed Intelligence Provider (MIP) */}
            <section id="mip" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="text-xs font-semibold text-[#075d68] mb-1.5">
                    04. Ongoing Retainer Model
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#10253f] tracking-tight">
                    Managed Intelligence Provider (MIP) — Beyond MSP and MSSP
                  </h2>
                  <p className="text-[15px] text-[#40536b] mt-2 leading-relaxed">
                    Your MSP keeps infrastructure online and your MSSP monitors security alerts. CBa
                    Consult fills the governance gap between them on a predictable monthly retainer
                    with zero helpdesk overlap and zero auditor conflicts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    openBrief(
                      {
                        title: 'Managed Intelligence Provider (MIP)',
                        subtitle: 'Ongoing Governance Stewardship · CEO, CIO, CFO, CISO & PE',
                        serviceLabel: 'Managed Intelligence Provider (MIP) Retainer',
                        duration: 'Monthly retainer',
                        investmentRange: '€2,500 – €12,000+ / mo',
                        onePagerPath: data.mipOnePagerPath,
                      },
                      'mip'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#075d68]" />
                  Read Full MIP Brief
                </button>
              </div>

              {/* Comparison Table */}
              <div className="bg-white border border-[#dae3e9] rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-[#10253f] text-white text-xs">
                        <th className="px-5 py-3 font-semibold whitespace-nowrap">Dimension</th>
                        <th className="px-5 py-3 font-semibold whitespace-nowrap">
                          MSP (Infrastructure)
                        </th>
                        <th className="px-5 py-3 font-semibold whitespace-nowrap">
                          MSSP (Cybersecurity)
                        </th>
                        <th className="px-5 py-3 font-semibold whitespace-nowrap bg-[#075d68]">
                          MIP (CBa Consult)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dae3e9] text-[13.5px]">
                      <tr>
                        <td className="px-5 py-3 font-semibold text-[#10253f]">Core Mandate</td>
                        <td className="px-5 py-3 text-[#52647a]">Uptime, patching, helpdesk</td>
                        <td className="px-5 py-3 text-[#52647a]">Threat detection, 24/7 SOC</td>
                        <td className="px-5 py-3 font-medium text-[#10253f] bg-[#eef5f7]/60">
                          Governed AI agents, trusted context & audit-ready truth
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3 font-semibold text-[#10253f]">
                          Primary Assets Managed
                        </td>
                        <td className="px-5 py-3 text-[#52647a]">Servers, endpoints, M365 seats</td>
                        <td className="px-5 py-3 text-[#52647a]">Firewalls, SIEM, EDR</td>
                        <td className="px-5 py-3 font-medium text-[#10253f] bg-[#eef5f7]/60">
                          Agent fleets, ontologies/RAG, compliance evidence, sovereign runtimes
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3 font-semibold text-[#10253f]">Governance Scope</td>
                        <td className="px-5 py-3 text-[#52647a]">ITIL tickets & SLAs</td>
                        <td className="px-5 py-3 text-[#52647a]">Incident containment</td>
                        <td className="px-5 py-3 font-medium text-[#10253f] bg-[#eef5f7]/60">
                          ISO 42001, EU AI Act, DORA/NIS2, Agent FinOps & Board ROI
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3 Retainer Tiers */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {MIP_TIERS.map((tier) => {
                  const selected = shortlist.includes(tier.serviceLabel);
                  return (
                    <div
                      key={tier.name}
                      className="bg-white border border-[#dae3e9] rounded-md p-6 flex flex-col justify-between gap-5"
                    >
                      <div className="space-y-3">
                        <div className="text-xs font-semibold text-[#075d68]">{tier.audience}</div>
                        <h3 className="text-lg font-bold text-[#10253f]">{tier.name}</h3>
                        <div className="text-xl font-bold font-mono tabular-nums text-[#10253f]">
                          {tier.price}
                        </div>
                        <p className="text-sm text-[#40536b] leading-relaxed">{tier.cadence}</p>
                      </div>
                      <button
                        type="button"
                        aria-pressed={selected}
                        onClick={() => handleRequestScoping(tier.serviceLabel)}
                        className={`w-full py-2 px-4 text-xs font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                          selected
                            ? 'bg-[#eef5f7] border-[#075d68] text-[#075d68]'
                            : 'bg-white border-[#dae3e9] text-[#10253f] hover:bg-[#10253f] hover:text-white hover:border-[#10253f]'
                        }`}
                      >
                        {selected ? 'Selected for Scoping' : `Scope ${tier.name}`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 05: Full Advisory Service Catalog */}
            <section id="catalog" className="bg-white border-y border-[#dae3e9]">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <div className="text-xs font-semibold text-[#075d68] mb-1.5">
                      05. Full Advisory Service Catalog
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#10253f] tracking-tight">
                      Capabilities across {data.practices.length} management consulting practices
                    </h2>
                    <p className="text-[15px] text-[#40536b] mt-2">
                      Explore specialized diagnostics, starter kits, and transformation sprints
                      available for tailored assignment scoping.
                    </p>
                  </div>
                  <div className="text-xs font-mono tabular-nums text-[#52647a] whitespace-nowrap shrink-0">
                    {filteredCatalog.length} offerings available
                  </div>
                </div>

                {/* Search & Practice Filter */}
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between p-4 bg-[#f5f8fa] border border-[#dae3e9] rounded-md">
                  <div className="relative flex-1 max-w-md">
                    <label htmlFor="catalog-search" className="sr-only">
                      Search advisory offerings
                    </label>
                    <Search className="w-4 h-4 text-[#52647a] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="catalog-search"
                      type="text"
                      value={catalogSearch}
                      onChange={(e) => {
                        setCatalogSearch(e.target.value);
                        setShowAllCatalog(false);
                      }}
                      placeholder="Search capabilities, outcomes, or methodologies..."
                      className="w-full pl-9 pr-9 py-2 text-sm bg-white border border-[#dae3e9] rounded-md text-[#10253f] placeholder:text-[#52647a] focus:border-[#075d68]"
                    />
                    {catalogSearch && (
                      <button
                        type="button"
                        onClick={() => setCatalogSearch('')}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[36px] min-w-[36px] flex items-center justify-center text-[#52647a] hover:text-[#10253f] cursor-pointer"
                        aria-label="Clear search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={practiceFilter}
                      onChange={(e) => {
                        setPracticeFilter(e.target.value);
                        setShowAllCatalog(false);
                      }}
                      aria-label="Filter by practice area"
                      className="py-2 px-3 text-xs bg-white border border-[#dae3e9] rounded-md text-[#10253f] focus:border-[#075d68]"
                    >
                      <option value="ALL">All Practices ({data.practices.length})</option>
                      {data.practices.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>

                    <select
                      value={sizeFilter}
                      onChange={(e) => {
                        setSizeFilter(e.target.value);
                        setShowAllCatalog(false);
                      }}
                      aria-label="Filter by organization size"
                      className="py-2 px-3 text-xs bg-white border border-[#dae3e9] rounded-md text-[#10253f] focus:border-[#075d68]"
                    >
                      <option value="ALL">All Organization Sizes</option>
                      <option value="small">Small &amp; Growth</option>
                      <option value="medium">Mid-Market &amp; Enterprise</option>
                    </select>
                  </div>
                </div>

                {/* Catalog Table */}
                <div className="border border-[#dae3e9] rounded-md overflow-hidden">
                  {filteredCatalog.length === 0 ? (
                    <div className="py-12 px-6 text-center">
                      <p className="text-sm font-medium text-[#10253f]">
                        No offerings match your current filter.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setCatalogSearch('');
                          setPracticeFilter('ALL');
                          setSizeFilter('ALL');
                        }}
                        className="mt-3 px-4 py-2 text-xs font-medium text-white bg-[#10253f] rounded-md cursor-pointer"
                      >
                        Reset Catalog Filters
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left">
                        <thead>
                          <tr className="bg-[#f5f8fa] border-b border-[#dae3e9] text-xs text-[#40536b]">
                            <th className="px-4 py-3 font-semibold whitespace-nowrap">Practice</th>
                            <th className="px-4 py-3 font-semibold">Advisory Offering</th>
                            <th className="px-4 py-3 font-semibold whitespace-nowrap">Duration</th>
                            <th className="px-4 py-3 font-semibold whitespace-nowrap text-right">
                              Indicative Anchor
                            </th>
                            <th className="px-4 py-3 font-semibold whitespace-nowrap text-right">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dae3e9] text-[13.5px]">
                          {visibleCatalog.map((item) => {
                            const added = shortlist.includes(item.title);
                            return (
                              <tr key={item.id} className="hover:bg-[#f8fbfc] transition-colors">
                                <td className="px-4 py-3.5 text-xs font-semibold text-[#075d68] whitespace-nowrap align-top">
                                  {item.practice}
                                </td>
                                <td className="px-4 py-3.5 align-top max-w-xl">
                                  <div className="font-semibold text-[#10253f]">{item.title}</div>
                                  <div className="text-xs text-[#52647a] mt-0.5 line-clamp-2 leading-relaxed">
                                    {item.description}
                                  </div>
                                  <div className="text-[11px] text-[#52647a] mt-1">
                                    {item.category} · {item.organizationSize}
                                  </div>
                                </td>
                                <td className="px-4 py-3.5 font-mono text-xs text-[#40536b] whitespace-nowrap align-top tabular-nums">
                                  {item.duration}
                                </td>
                                <td className="px-4 py-3.5 font-mono text-xs text-[#10253f] text-right whitespace-nowrap align-top tabular-nums">
                                  {item.investmentRange}
                                </td>
                                <td className="px-4 py-3.5 text-right whitespace-nowrap align-top">
                                  <div className="inline-flex items-center gap-3">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        openBrief(
                                          {
                                            title: item.title,
                                            subtitle: `${item.practice} · ${item.category}`,
                                            serviceLabel: item.title,
                                            duration: item.duration,
                                            investmentRange: item.investmentRange,
                                            onePagerPath: item.onePagerPath,
                                            description: item.description,
                                            toolkit: item.toolkit,
                                          },
                                          item.id
                                        )
                                      }
                                      className="text-xs font-semibold text-[#075d68] hover:text-[#10253f] cursor-pointer"
                                    >
                                      {item.onePagerPath ? 'One-Pager' : 'Details'}
                                    </button>
                                    <button
                                      type="button"
                                      aria-pressed={added}
                                      onClick={() => onToggleShortlist(item.title)}
                                      className={`px-2.5 py-1 text-xs font-medium rounded border transition-colors cursor-pointer ${
                                        added
                                          ? 'bg-[#eef5f7] border-[#075d68] text-[#075d68]'
                                          : 'bg-white border-[#dae3e9] text-[#10253f] hover:bg-[#f5f8fa]'
                                      }`}
                                    >
                                      {added ? 'Added' : 'Shortlist'}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {filteredCatalog.length > 12 && (
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      aria-expanded={showAllCatalog}
                      onClick={() => setShowAllCatalog((v) => !v)}
                      className="px-4 py-2 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] rounded-md transition-colors cursor-pointer"
                    >
                      {showAllCatalog
                        ? 'Show Fewer Offerings'
                        : `View All ${filteredCatalog.length} Offerings`}
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Section 06: Scope an Assignment / Inquiry Form */}
            <section id="inquire" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-5 space-y-5">
                  <div>
                    <div className="text-xs font-semibold text-[#075d68] mb-1.5">
                      06. Assignment Scoping
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#10253f] tracking-tight">
                      Schedule a 30-minute Executive Scoping Call
                    </h2>
                    <p className="text-[15px] text-[#40536b] mt-3 leading-relaxed">
                      Share your shortlisted engagements and target timing. Menno Drescher will
                      prepare a focused briefing covering scope boundaries, deliverables, and a
                      fixed-fee Phase 0 option tailored to your stack.
                    </p>
                  </div>

                  {/* Active Shortlist Panel */}
                  <div className="bg-white border border-[#dae3e9] rounded-md p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-[#10253f]">
                        Your Assignment Shortlist ({shortlist.length})
                      </div>
                      {shortlist.length > 0 && (
                        <button
                          type="button"
                          onClick={onClearShortlist}
                          className="text-xs text-[#52647a] hover:text-[#10253f] cursor-pointer"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {shortlist.length === 0 ? (
                      <p className="text-xs text-[#52647a] leading-relaxed">
                        No offerings shortlisted yet. Select any flagship, MIP tier, or catalog item
                        above — or submit a general scoping request to select the right Phase 0
                        diagnostic together.
                      </p>
                    ) : (
                      <ul className="divide-y divide-[#dae3e9] text-sm">
                        {shortlist.map((item) => (
                          <li
                            key={item}
                            className="py-2 flex items-center justify-between gap-3 text-[#10253f]"
                          >
                            <span className="text-[13px] font-medium">{item}</span>
                            <button
                              type="button"
                              onClick={() => onToggleShortlist(item)}
                              className="min-h-[36px] min-w-[36px] flex items-center justify-center text-[#52647a] hover:text-[#dc2626] cursor-pointer"
                              aria-label={`Remove ${item}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="text-xs text-[#52647a] space-y-1">
                    <div className="font-semibold text-[#10253f]">Principal Contact</div>
                    <div>Menno Drescher · Director, CBa Consult</div>
                    <div>Independent, conflict-free advisory · Fixed-scope SOW</div>
                  </div>
                </div>

                {/* Form / Confirmation Column */}
                <div className="lg:col-span-7 bg-white border border-[#dae3e9] rounded-md p-6 sm:p-8">
                  {confirmation ? (
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#dae3e9]">
                        <div>
                          <div className="text-xs font-semibold text-[#075d68]">
                            Scoping Request Recorded
                          </div>
                          <h3 className="text-xl font-bold text-[#10253f] mt-0.5">
                            Reference {confirmation.referenceId}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={handleCopySummary}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#10253f] bg-[#f5f8fa] hover:bg-[#eef5f7] border border-[#dae3e9] rounded-md cursor-pointer"
                          >
                            {copiedSummary ? (
                              <Check className="w-3.5 h-3.5 text-[#075d68]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            {copiedSummary ? 'Copied Summary' : 'Copy Brief Summary'}
                          </button>
                          <button
                            type="button"
                            onClick={handleDownloadSummaryMarkdown}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download Brief (.md)
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-[#40536b] leading-relaxed">
                        Thank you, <strong>{confirmation.inquiry.fullName}</strong>. Your scoping
                        brief for <strong>{confirmation.inquiry.organization}</strong> has been
                        prepared for review ahead of a 30-minute discovery call with Menno Drescher.
                      </p>

                      <div className="p-4 bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-xs space-y-1.5 text-[#40536b]">
                        <div>
                          <strong className="text-[#10253f]">Work Email:</strong>{' '}
                          {confirmation.inquiry.email}
                        </div>
                        <div>
                          <strong className="text-[#10253f]">Role:</strong>{' '}
                          {confirmation.inquiry.role}
                        </div>
                        <div>
                          <strong className="text-[#10253f]">Target Window:</strong>{' '}
                          {confirmation.inquiry.targetWindow}
                        </div>
                        <div>
                          <strong className="text-[#10253f]">Shortlisted Scope:</strong>{' '}
                          {confirmation.inquiry.selectedServices.length > 0
                            ? confirmation.inquiry.selectedServices.join(' · ')
                            : 'Executive Discovery & Initial Scope Selection'}
                        </div>
                        <div>
                          <strong className="text-[#10253f]">Advisory Notification:</strong>{' '}
                          {confirmation.emailDeliveryStatus === 'sent'
                            ? 'Dispatched to Menno Drescher · fixed-scope proposal within 5 business days.'
                            : 'Logged under your Reference ID · copy or download your brief above for direct sharing.'}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setConfirmation(null);
                          setFullName('');
                          setEmail('');
                          setOrganization('');
                          setRole('');
                          setNotes('');
                        }}
                        className="text-xs font-semibold text-[#075d68] hover:text-[#10253f] cursor-pointer"
                      >
                        Prepare another scoping inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitInquiry} className="space-y-5" noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="client-name"
                            className="block text-xs font-semibold text-[#10253f] mb-1.5"
                          >
                            Full Name *
                          </label>
                          <input
                            id="client-name"
                            type="text"
                            required
                            maxLength={120}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Elena van Dijk"
                            className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="client-email"
                            className="block text-xs font-semibold text-[#10253f] mb-1.5"
                          >
                            Work Email *
                          </label>
                          <input
                            id="client-email"
                            type="email"
                            required
                            maxLength={160}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="client-org"
                            className="block text-xs font-semibold text-[#10253f] mb-1.5"
                          >
                            Organization *
                          </label>
                          <input
                            id="client-org"
                            type="text"
                            required
                            maxLength={160}
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            placeholder="Company or Group name"
                            className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="client-role"
                            className="block text-xs font-semibold text-[#10253f] mb-1.5"
                          >
                            Executive Role
                          </label>
                          <input
                            id="client-role"
                            type="text"
                            maxLength={120}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="CFO, CIO, CISO, COO, Partner..."
                            className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="client-window"
                          className="block text-xs font-semibold text-[#10253f] mb-1.5"
                        >
                          Target Assignment Window
                        </label>
                        <select
                          id="client-window"
                          value={targetWindow}
                          onChange={(e) => setTargetWindow(e.target.value)}
                          className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                        >
                          <option value="Immediate / Exploratory">Immediate / Exploratory</option>
                          <option value="Q1 2027">Q1 2027</option>
                          <option value="Q2 2027">Q2 2027</option>
                          <option value="H2 2027">H2 2027</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="client-notes"
                          className="block text-xs font-semibold text-[#10253f] mb-1.5"
                        >
                          Context, Regulatory Triggers & Desired Outcomes
                        </label>
                        <textarea
                          id="client-notes"
                          rows={4}
                          maxLength={2000}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Share key bottlenecks, upcoming audit/IFRS 18/EU AI Act deadlines, or existing ERP/M365 environment..."
                          className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                        />
                      </div>

                      {formError && (
                        <div role="alert" className="text-xs font-medium text-[#dc2626]">
                          {formError}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <span className="text-xs text-[#52647a]">
                          Confidential · No obligation · Fixed-scope proposal within 5 business days
                        </span>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="px-5 py-2.5 text-sm font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] disabled:opacity-60 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {submitting ? 'Submitting...' : 'Submit Scoping Request'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </>
        ) : null}
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#10253f] text-[#c4d1df] border-t border-[#1e3b5c]">
        <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs">
          <div className="space-y-1">
            <div className="font-display text-base font-bold text-white">CBa Consult</div>
            <div>Menno Drescher · Independent Management & Governance Advisory</div>
            <div className="text-[#9cb4cc]">
              Conflict-free pre-assurance, operational governance, and Managed Intelligence retainers.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={() => scrollToSection('flagships')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Flagships
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('catalog')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Service Catalog
            </button>
            <button
              type="button"
              onClick={onOpenReportsLibrary}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Reports &amp; Briefs
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('mip')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Managed Intelligence
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

      {/* Client Brief Drawer */}
      <ClientServiceDrawer
        selection={activeBrief}
        isShortlisted={activeBrief ? shortlist.includes(activeBrief.serviceLabel) : false}
        onToggleShortlist={onToggleShortlist}
        onRequestScoping={handleRequestScoping}
        onClose={closeBrief}
      />

      {/* Client Executive Report Drawer */}
      <ClientReportDrawer
        report={activeReport}
        onRequestScoping={handleRequestScoping}
        onClose={closeReport}
      />
    </div>
  );
};
