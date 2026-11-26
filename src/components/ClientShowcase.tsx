import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  Download,
  FileDown,
  FileText,
  Lock,
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
import { saveScopingInquiryToFirestore } from '../firebase';
import heroBoardroomImg from '../assets/images/hero_cba_boardroom_1795700418173.jpg';
import governanceArchImg from '../assets/images/showcase_governance_architecture_1795700420378.jpg';

interface ClientShowcaseProps {
  onSwitchToInternal: () => void;
  onOpenAgentAssessment: () => void;
  onOpenReportsLibrary: () => void;
  initialSection?: string | null;
  initialShortlistItem?: string | null;
  onClearInitialNavigation?: () => void;
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
  onSwitchToInternal,
  onOpenAgentAssessment,
  onOpenReportsLibrary,
  initialSection,
  initialShortlistItem,
  onClearInitialNavigation,
}) => {
  const [data, setData] = useState<ClientPortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [archImgFailed, setArchImgFailed] = useState(false);

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
  const [shortlist, setShortlist] = useState<string[]>([]);

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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (loading || !data) return;
    if (!initialSection && !initialShortlistItem) return;
    if (initialShortlistItem) {
      setShortlist((prev) =>
        prev.includes(initialShortlistItem) ? prev : [...prev, initialShortlistItem]
      );
    }
    if (initialSection) {
      setTimeout(() => {
        const el = document.getElementById(initialSection);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
    onClearInitialNavigation?.();
  }, [loading, data, initialSection, initialShortlistItem, onClearInitialNavigation]);

  const featuredReports = useMemo(() => {
    if (!data) return [];
    return data.clientReports
      .filter((rep) => rep.featuredOnHome !== false)
      .slice(0, 4);
  }, [data]);

  const toggleShortlist = (label: string) => {
    setShortlist((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  const handleRequestScoping = (label: string) => {
    setShortlist((prev) => (prev.includes(label) ? prev : [...prev, label]));
    setActiveBrief(null);
    setActiveReport(null);
    setTimeout(() => scrollToSection('inquire'), 60);
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
      await saveScopingInquiryToFirestore(
        confirmed.referenceId,
        confirmed.inquiry,
        confirmed.emailDeliveryStatus
      );
      setConfirmation(confirmed);
    } catch {
      setFormError('Unable to save your scoping request right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopySummary = () => {
    if (!confirmation) return;
    const { referenceId, inquiry } = confirmation;
    const text = [
      `CBa Consult — Assignment Scoping Brief (${referenceId})`,
      `Client: ${inquiry.fullName} (${inquiry.role}), ${inquiry.organization}`,
      `Email: ${inquiry.email}`,
      `Target Window: ${inquiry.targetWindow}`,
      `Shortlisted Engagements: ${
        inquiry.selectedServices.length > 0
          ? inquiry.selectedServices.join('; ')
          : 'Executive Discovery & Wedge Selection'
      }`,
      inquiry.notes ? `Objectives: ${inquiry.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    navigator.clipboard?.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f5f8fa] text-[#17243a] flex flex-col">
      {/* Top Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-[#dae3e9]">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single clean text wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-lg font-bold tracking-tight text-[#10253f] whitespace-nowrap shrink-0"
          >
            CBa Consult
          </a>

          {/* Zone 2: 5 concise single-line text nav links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#40536b]"
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
            <button
              type="button"
              onClick={() => scrollToSection('inquire')}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Scope Assignment
            </button>
          </nav>

          {/* Zone 3: 1 primary CTA */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('inquire')}
              className="px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Request Scoping Call
              {shortlist.length > 0 ? ` (${shortlist.length})` : ''}
            </button>
          </div>
        </div>
      </header>

      {/* Main Presentation Content */}
      <main id="top" className="flex-1">
        {/* Hero Split */}
        <section className="bg-white border-b border-[#dae3e9]">
          <div className="max-w-[1280px] mx-auto px-6 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center py-2">
                <div className="text-xs font-semibold text-[#0c8b82] mb-3">
                  Independent Management & Governance Advisory · Conflict-Free Pre-Assurance
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
                      onClick={() => setActiveReport(data.clientReports[0])}
                      className="text-sm font-medium text-[#0c8b82] hover:text-[#075d68] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Executive Summary
                    </button>
                  )}
                  {data && data.clientReports.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setActiveReport(data.clientReports[1])}
                      className="text-sm font-medium text-[#40536b] hover:text-[#10253f] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Priority Report
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
                      referrerPolicy="no-referrer"
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
            <section id="flagships" className="max-w-[1280px] mx-auto px-6 py-16 space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="text-xs font-semibold text-[#0c8b82] mb-1.5">
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
                <div className="flex items-center gap-1 p-1 bg-white border border-[#dae3e9] rounded-md overflow-x-auto shrink-0">
                  {AUDIENCE_FILTERS.map((aud) => (
                    <button
                      key={aud}
                      type="button"
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
                          <span className="font-semibold text-[#0c8b82]">
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

                        <p className="text-[14.5px] leading-relaxed text-[#40536b]">
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
                                  className="text-[#0c8b82] font-bold select-none mt-0.5"
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
                                setActiveBrief({
                                  title: service.title,
                                  subtitle: `${service.strategicAsset} · ${service.buyerLine}`,
                                  serviceLabel: service.title,
                                  duration: service.duration,
                                  investmentRange: service.investmentRange,
                                  onePagerPath: service.onePagerPath,
                                })
                              }
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0c8b82] hover:text-[#075d68] whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              Read Client One-Pager
                            </button>
                            {service.id === 'OP-ITG-013' && (
                              <button
                                type="button"
                                onClick={onOpenAgentAssessment}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#10253f] hover:text-[#0c8b82] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                Launch Self-Assessment
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleShortlist(service.title)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              isAdded
                                ? 'bg-[#eef5f7] border-[#0c8b82] text-[#075d68]'
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

              {/* OP-ITG-013 Interactive Self-Assessment Spotlight Band */}
              <div className="bg-[#10253f] text-white rounded-md p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="text-xs font-semibold text-[#48c5b2]">
                    Interactive Diagnostic · OP-ITG-013 · 5-Minute Triage or Full 40-Control Audit
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Benchmark your Enterprise AI Agent Governance before December 2027
                  </h3>
                  <p className="text-sm text-[#d8e4f0] leading-relaxed">
                    Evaluate shadow Copilot sprawl, Entra Agent ID boundaries, FinOps spend limits,
                    and EU AI Act Annex III readiness to generate an instant executive PDF scorecard
                    and tailored Tier 1 / Tier 2 scoping path.
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
                      <div className="text-xs font-semibold text-[#0c8b82] mb-1">
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
                          setActiveBrief({
                            title: 'Flagship Opportunities Overview (2027–2030)',
                            subtitle: 'CBa Consult · Executive Client Brief',
                            serviceLabel: 'Executive Portfolio Scoping Call',
                            duration: '3–10 weeks fixed scope',
                            investmentRange: '€1,500 – €18,000+',
                            onePagerPath: data.flagshipOverviewPath,
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#40536b] hover:text-[#10253f] whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Unified Flagship One-Pager
                      </button>
                      <button
                        type="button"
                        onClick={onOpenReportsLibrary}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0c8b82] hover:text-[#075d68] bg-white hover:bg-[#eef5f7] border border-[#dae3e9] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        All Reports &amp; Briefs ({data.clientReports.length})
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {reportExportError && (
                    <div className="px-4 py-2.5 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs font-medium text-[#b91c1c]">
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
                              <span className="font-semibold text-[#0c8b82]">
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
                              onClick={() => setActiveReport(rep)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0c8b82] hover:text-[#075d68] whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              Read Formatted Report
                            </button>
                            <div className="flex items-center gap-2 shrink-0">
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
              <div className="max-w-[1280px] mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                  <div className="lg:col-span-5">
                    <div className="w-full h-[280px] lg:h-full min-h-[320px] rounded-md overflow-hidden border border-[#dae3e9] bg-[#10253f]">
                      {archImgFailed ? (
                        <div className="w-full h-full flex items-end p-8 bg-gradient-to-br from-[#10253f] to-[#0c8b82] text-white">
                          <div className="text-lg font-semibold">
                            Observe · Measure · Govern · Trace · Certify · Improve
                          </div>
                        </div>
                      ) : (
                        <img
                          src={ARCH_IMAGE}
                          alt="Minimalist limestone and glass architectural pavilion representing clarity and structural governance"
                          referrerPolicy="no-referrer"
                          onError={() => setArchImgFailed(true)}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                    <div>
                      <div className="text-xs font-semibold text-[#0c8b82] mb-1.5">
                        02. Engagement Architecture
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#10253f] tracking-tight">
                        Start with a bounded entry wedge, scale only on verified proof
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
                            01. Phase 0 Entry Wedge
                          </div>
                          <div className="text-xs font-mono text-[#0c8b82] tabular-nums mt-0.5">
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
                          <div className="text-xs font-mono text-[#0c8b82] tabular-nums mt-0.5">
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
                          <div className="text-xs font-mono text-[#0c8b82] tabular-nums mt-0.5">
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

            {/* Section 03: Managed Intelligence Provider (MIP) */}
            <section id="mip" className="max-w-[1280px] mx-auto px-6 py-16 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="text-xs font-semibold text-[#0c8b82] mb-1.5">
                    03. Ongoing Retainer Model
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
                    setActiveBrief({
                      title: 'Managed Intelligence Provider / Professional (MIP)',
                      subtitle: 'Ongoing Governance Stewardship · CEO, CIO, CFO, CISO & PE',
                      serviceLabel: 'Managed Intelligence Provider (MIP) Retainer',
                      duration: 'Monthly retainer',
                      investmentRange: '€2,500 – €12,000+ / mo',
                      onePagerPath: data.mipOnePagerPath,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0c8b82]" />
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
                        <th className="px-5 py-3 font-semibold whitespace-nowrap bg-[#0c8b82]">
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
                        <div className="text-xs font-medium text-[#0c8b82]">{tier.audience}</div>
                        <h3 className="text-lg font-bold text-[#10253f]">{tier.name}</h3>
                        <div className="text-xl font-bold font-mono tabular-nums text-[#10253f]">
                          {tier.price}
                        </div>
                        <p className="text-sm text-[#40536b] leading-relaxed">{tier.cadence}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRequestScoping(tier.serviceLabel)}
                        className={`w-full py-2 px-4 text-xs font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                          selected
                            ? 'bg-[#eef5f7] border-[#0c8b82] text-[#075d68]'
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

            {/* Section 04: Full Advisory Service Catalog */}
            <section id="catalog" className="bg-white border-y border-[#dae3e9]">
              <div className="max-w-[1280px] mx-auto px-6 py-16 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <div className="text-xs font-semibold text-[#0c8b82] mb-1.5">
                      04. Full Advisory Service Catalog
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
                    <Search className="w-4 h-4 text-[#52647a] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={catalogSearch}
                      onChange={(e) => {
                        setCatalogSearch(e.target.value);
                        setShowAllCatalog(false);
                      }}
                      placeholder="Search capabilities, outcomes, or methodologies..."
                      className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-[#dae3e9] rounded-md text-[#10253f] placeholder:text-[#52647a] focus:outline-none focus:border-[#0c8b82]"
                    />
                    {catalogSearch && (
                      <button
                        type="button"
                        onClick={() => setCatalogSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#52647a] hover:text-[#10253f] cursor-pointer"
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
                      className="py-2 px-3 text-xs bg-white border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:border-[#0c8b82]"
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
                      className="py-2 px-3 text-xs bg-white border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:border-[#0c8b82]"
                    >
                      <option value="ALL">All Organization Sizes</option>
                      <option value="small">Small & Growth</option>
                      <option value="medium">Mid-Market & Enterprise</option>
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
                                <td className="px-4 py-3.5 text-xs font-medium text-[#0c8b82] whitespace-nowrap align-top">
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
                                        setActiveBrief({
                                          title: item.title,
                                          subtitle: `${item.practice} · ${item.category}`,
                                          serviceLabel: item.title,
                                          duration: item.duration,
                                          investmentRange: item.investmentRange,
                                          onePagerPath: item.onePagerPath,
                                          description: item.description,
                                          toolkit: item.toolkit,
                                        })
                                      }
                                      className="text-xs font-medium text-[#0c8b82] hover:text-[#075d68] cursor-pointer"
                                    >
                                      {item.onePagerPath ? 'One-Pager' : 'Details'}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => toggleShortlist(item.title)}
                                      className={`px-2.5 py-1 text-xs font-medium rounded border transition-colors cursor-pointer ${
                                        added
                                          ? 'bg-[#eef5f7] border-[#0c8b82] text-[#075d68]'
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

            {/* Section 05: Scope an Assignment / Inquiry Form */}
            <section id="inquire" className="max-w-[1280px] mx-auto px-6 py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-5 space-y-5">
                  <div>
                    <div className="text-xs font-semibold text-[#0c8b82] mb-1.5">
                      05. Assignment Scoping
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
                          onClick={() => setShortlist([])}
                          className="text-xs text-[#52647a] hover:text-[#10253f] cursor-pointer"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {shortlist.length === 0 ? (
                      <p className="text-xs text-[#52647a] leading-relaxed">
                        No offerings shortlisted yet. Select any flagship, MIP tier, or catalog item
                        above — or submit a general scoping request to select the right entry wedge
                        together.
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
                              onClick={() => toggleShortlist(item)}
                              className="text-[#52647a] hover:text-[#dc2626] p-1 cursor-pointer"
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
                      <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#dae3e9]">
                        <div>
                          <div className="text-xs font-semibold text-[#0c8b82]">
                            Scoping Request Recorded
                          </div>
                          <h3 className="text-xl font-bold text-[#10253f] mt-0.5">
                            Reference {confirmation.referenceId}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopySummary}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#10253f] bg-[#f5f8fa] hover:bg-[#eef5f7] border border-[#dae3e9] rounded-md cursor-pointer"
                        >
                          {copiedSummary ? (
                            <Check className="w-3.5 h-3.5 text-[#0c8b82]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          {copiedSummary ? 'Copied Summary' : 'Copy Brief Summary'}
                        </button>
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
                            : 'Executive Discovery & Entry Wedge Selection'}
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
                        className="text-xs font-medium text-[#0c8b82] hover:text-[#075d68] cursor-pointer"
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
                        <div className="text-xs font-medium text-[#dc2626]">{formError}</div>
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
              className="inline-flex items-center gap-1.5 text-[#48c5b2] hover:text-white transition-colors font-medium cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              Internal Portfolio Explorer
            </button>
          </div>
        </div>
      </footer>

      {/* Client Brief Drawer */}
      <ClientServiceDrawer
        selection={activeBrief}
        isShortlisted={activeBrief ? shortlist.includes(activeBrief.serviceLabel) : false}
        onToggleShortlist={toggleShortlist}
        onRequestScoping={handleRequestScoping}
        onClose={() => setActiveBrief(null)}
      />

      {/* Client Executive Report Drawer */}
      <ClientReportDrawer
        report={activeReport}
        onRequestScoping={handleRequestScoping}
        onClose={() => setActiveReport(null)}
      />
    </div>
  );
};
