import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Globe,
  Lock,
  ShieldCheck,
  X,
} from 'lucide-react';
import type { ArtifactFile, ClientPortfolioData, Opportunity } from '../types';
import { MarkdownView } from './MarkdownView';

interface OpportunityDrawerProps {
  opportunity: Opportunity | null;
  clientPortfolio: ClientPortfolioData | null;
  authToken: string;
  onUnauthorized?: () => void;
  onClose: () => void;
  onOpenReportSlug: (slug: string) => void;
  onOpenClientShowcase: () => void;
  onOpenClientReports: () => void;
}

type DrawerTab = 'internal' | 'client';

export const OpportunityDrawer: React.FC<OpportunityDrawerProps> = ({
  opportunity,
  clientPortfolio,
  authToken,
  onUnauthorized,
  onClose,
  onOpenReportSlug,
  onOpenClientShowcase,
  onOpenClientReports,
}) => {
  const [drawerTab, setDrawerTab] = useState<DrawerTab>('internal');
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactFile | null>(null);
  const [docContent, setDocContent] = useState<string>('');
  const [docPath, setDocPath] = useState<string>('');
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [docError, setDocError] = useState<string | null>(null);

  const [clientOnePagerContent, setClientOnePagerContent] = useState<string>('');
  const [loadingClientOnePager, setLoadingClientOnePager] = useState(false);
  const [clientOnePagerError, setClientOnePagerError] = useState<string | null>(null);

  useEffect(() => {
    if (!opportunity) {
      setDrawerTab('internal');
      setSelectedArtifact(null);
      setDocContent('');
      setDocPath('');
      setClientOnePagerContent('');
      setClientOnePagerError(null);
      return;
    }
    const defaultMd = opportunity.artifacts.find((a) => a.isMarkdown) ?? null;
    setSelectedArtifact(defaultMd);
    if (defaultMd) {
      loadDocument(defaultMd.path);
    } else {
      setDocContent('');
      setDocPath('');
    }
  }, [opportunity, authToken]);

  const catalogMatch =
    opportunity && clientPortfolio
      ? clientPortfolio.catalog.find((c) => c.id === opportunity.id) ?? null
      : null;

  const flagshipMatch =
    opportunity && clientPortfolio
      ? clientPortfolio.flagships.find((f) => f.id === opportunity.id) ?? null
      : null;

  const matchingReports =
    opportunity && clientPortfolio
      ? clientPortfolio.clientReports.filter((r) => r.opportunityId === opportunity.id)
      : [];

  const isMipOpportunity = opportunity?.id === 'OP-ITG-018';
  const isAssessmentOpportunity = opportunity?.id === 'OP-ITG-013';

  const publicOnePagerPath =
    flagshipMatch?.onePagerPath ||
    catalogMatch?.onePagerPath ||
    (isMipOpportunity ? clientPortfolio?.mipOnePagerPath : undefined);

  useEffect(() => {
    if (drawerTab !== 'client' || !publicOnePagerPath) {
      setClientOnePagerContent('');
      setLoadingClientOnePager(false);
      setClientOnePagerError(null);
      return;
    }
    let cancelled = false;
    const loadPublicBrief = async () => {
      setLoadingClientOnePager(true);
      setClientOnePagerError(null);
      try {
        const res = await fetch(
          `/api/document?path=${encodeURIComponent(publicOnePagerPath)}`
        );
        if (!res.ok) throw new Error('Unavailable');
        const data = await res.json();
        if (!cancelled) setClientOnePagerContent(data.content);
      } catch {
        if (!cancelled) {
          setClientOnePagerError('Public one-pager markdown is currently unavailable.');
          setClientOnePagerContent('');
        }
      } finally {
        if (!cancelled) setLoadingClientOnePager(false);
      }
    };
    loadPublicBrief();
    return () => {
      cancelled = true;
    };
  }, [drawerTab, publicOnePagerPath]);

  const loadDocument = async (path: string) => {
    setLoadingDoc(true);
    setDocError(null);
    setDocPath(path);
    try {
      const res = await fetch(`/api/document?path=${encodeURIComponent(path)}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.status === 401) {
        onUnauthorized?.();
        return;
      }
      if (!res.ok) throw new Error('Could not load document');
      const data = await res.json();
      setDocContent(data.content);
    } catch {
      setDocError('Unable to load the selected repository document.');
      setDocContent('');
    } finally {
      setLoadingDoc(false);
    }
  };

  if (!opportunity) return null;

  const mdArtifacts = opportunity.artifacts.filter((a) => a.isMarkdown);
  const htmlArtifacts = opportunity.artifacts.filter((a) => a.isHtml);
  const binaryArtifacts = opportunity.artifacts.filter((a) => !a.isMarkdown && !a.isHtml);

  const isPublicOnWebsite = Boolean(
    catalogMatch || flagshipMatch || matchingReports.length > 0 || isMipOpportunity
  );

  const hiddenReason = (() => {
    const st = opportunity.status.toLowerCase();
    if (st === 'parked' || st === 'retired' || st === 'killed') {
      return `Status is "${opportunity.status}" — excluded from the public Advisory Catalog.`;
    }
    if (opportunity.tier === 'Tier D') {
      return 'Classified as Tier D (Thought Leadership / Internal) — excluded from the public Advisory Catalog.';
    }
    return 'Not currently listed in the public client catalog.';
  })();

  const publicSurfaces: string[] = [];
  if (flagshipMatch) publicSurfaces.push('Flagship Advisory Card');
  if (isMipOpportunity) publicSurfaces.push('MIP Ongoing Retainer Section');
  if (catalogMatch) publicSurfaces.push('Advisory Practice Catalog');
  if (isAssessmentOpportunity) publicSurfaces.push('Interactive Self-Assessment Portal');
  if (matchingReports.length > 0) {
    const featuredCount = matchingReports.filter((r) => r.featuredOnHome).length;
    publicSurfaces.push(
      featuredCount > 0
        ? `Client Reports (${matchingReports.length} · ${featuredCount} Front Page)`
        : `Reports Library (${matchingReports.length})`
    );
  }

  const sanitizationDiffs: Array<{ field: string; internalVal: string; publicVal: string }> = [];
  if (catalogMatch) {
    if (catalogMatch.title !== opportunity.title) {
      sanitizationDiffs.push({
        field: 'Title',
        internalVal: opportunity.title,
        publicVal: catalogMatch.title,
      });
    }
    if (catalogMatch.duration !== (opportunity.timeHorizon || '')) {
      sanitizationDiffs.push({
        field: 'Duration',
        internalVal: opportunity.timeHorizon || '—',
        publicVal: catalogMatch.duration,
      });
    }
    if (catalogMatch.investmentRange !== (opportunity.expectedCapital || '')) {
      sanitizationDiffs.push({
        field: 'Indicative Anchor',
        internalVal: opportunity.expectedCapital || '—',
        publicVal: catalogMatch.investmentRange,
      });
    }
  }

  const validationLabel =
    opportunity.validationLevel === 'strong'
      ? 'Strong market validation'
      : opportunity.validationLevel === 'validated'
      ? 'Market validated'
      : opportunity.validationLevel === 'emerging'
      ? 'Emerging signal'
      : 'Unvalidated / research pending';

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#10253f]/35"
      role="dialog"
      aria-modal="true"
      aria-label={`${opportunity.id} workspace`}
    >
      <div className="flex-1" onClick={onClose} />
      <div className="w-full max-w-4xl bg-white h-full border-l border-[#dae3e9] flex flex-col overflow-hidden">
        {/* Drawer Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[#dae3e9] bg-[#f5f8fa] shrink-0 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#52647a] mb-1.5">
                <span className="font-mono font-semibold text-[#075d68]">{opportunity.id}</span>
                <span aria-hidden="true">·</span>
                <span>{opportunity.pillar}</span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-[#10253f]">{opportunity.tier}</span>
                <span aria-hidden="true">·</span>
                <span>{opportunity.targetQuarter || 'Unscheduled'}</span>
                <span aria-hidden="true">·</span>
                <span>Status: {opportunity.status}</span>
              </div>
              <h2 className="text-xl font-bold text-[#10253f] leading-snug">{opportunity.title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#52647a] hover:text-[#10253f] hover:bg-[#eef5f7] rounded-md transition-colors shrink-0 cursor-pointer"
              aria-label="Close workspace"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Internal vs. Client Website View Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1 p-1 bg-white border border-[#dae3e9] rounded-md">
              <button
                type="button"
                onClick={() => setDrawerTab('internal')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  drawerTab === 'internal'
                    ? 'bg-[#10253f] text-white'
                    : 'text-[#52647a] hover:text-[#10253f]'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                Internal Workspace
              </button>
              <button
                type="button"
                onClick={() => setDrawerTab('client')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  drawerTab === 'client'
                    ? 'bg-[#0c8b82] text-white'
                    : 'text-[#52647a] hover:text-[#10253f]'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                Client Website View
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {isPublicOnWebsite ? (
                <span className="inline-flex items-center gap-1.5 font-medium text-[#075d68]">
                  <Eye className="w-3.5 h-3.5 text-[#0c8b82]" />
                  Live on client website
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 font-medium text-[#52647a]">
                  <EyeOff className="w-3.5 h-3.5 text-[#7c8ea2]" />
                  Internal only (hidden from clients)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        {drawerTab === 'internal' ? (
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* Summary Description */}
            <div>
              <p className="text-[15px] leading-relaxed text-[#17243a]">
                {opportunity.description}
              </p>
            </div>

            {/* Structured Attributes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#dae3e9] border border-[#dae3e9] rounded-md overflow-hidden">
              <div className="bg-white p-3.5">
                <div className="text-xs text-[#52647a] mb-1">Expected Capital</div>
                <div className="text-sm font-semibold font-mono tabular-nums text-[#10253f]">
                  {opportunity.expectedCapital || '—'}
                </div>
              </div>
              <div className="bg-white p-3.5">
                <div className="text-xs text-[#52647a] mb-1">Time Horizon</div>
                <div className="text-sm font-semibold font-mono tabular-nums text-[#10253f]">
                  {opportunity.timeHorizon || '—'}
                </div>
              </div>
              <div className="bg-white p-3.5">
                <div className="text-xs text-[#52647a] mb-1">Effort & Size</div>
                <div className="text-sm font-semibold text-[#10253f]">
                  {opportunity.effort || '—'} · {opportunity.size || 'All'}
                </div>
              </div>
              <div className="bg-white p-3.5">
                <div className="text-xs text-[#52647a] mb-1">Validation Signal</div>
                <div
                  className={`text-sm font-semibold ${
                    opportunity.validationLevel === 'strong' ||
                    opportunity.validationLevel === 'validated'
                      ? 'text-[#0c8b82]'
                      : opportunity.validationLevel === 'emerging'
                      ? 'text-[#b45309]'
                      : 'text-[#52647a]'
                  }`}
                >
                  {validationLabel}
                </div>
              </div>
            </div>

            {/* Operational Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1 text-sm">
              <div>
                <div className="text-xs font-semibold text-[#52647a] mb-1">
                  Signature Toolkit & Category
                </div>
                <p className="text-[#17243a]">
                  {opportunity.signatureToolkit} · {opportunity.category}
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#52647a] mb-1">Primary Skills</div>
                <p className="text-[#17243a]">{opportunity.primarySkills || '—'}</p>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#52647a] mb-1">Scalability Path</div>
                <p className="text-[#40536b] leading-relaxed">
                  {opportunity.scalabilityPath || '—'}
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#52647a] mb-1">
                  Risks & Constraints
                </div>
                <p className="text-[#40536b] leading-relaxed">{opportunity.risks || '—'}</p>
              </div>
            </div>

            {opportunity.marketValidation && (
              <div className="p-4 bg-[#eef5f7] border border-[#dae3e9] rounded-md">
                <div className="text-xs font-semibold text-[#075d68] mb-1">
                  2027 Market Validation & Notes
                </div>
                <p className="text-sm text-[#17243a] leading-relaxed">
                  {opportunity.marketValidation}
                </p>
              </div>
            )}

            {/* Workspace Artifacts Section */}
            <div className="pt-2 border-t border-[#dae3e9]">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-semibold text-[#10253f]">
                    Opportunity Workspace Artifacts
                  </h3>
                  <p className="text-xs text-[#52647a] mt-0.5 font-mono">
                    {opportunity.folder || 'No dedicated folder found'}
                  </p>
                </div>
                {htmlArtifacts.length > 0 && (
                  <div className="flex items-center gap-2">
                    {htmlArtifacts.map((art) => (
                      <button
                        key={art.path}
                        type="button"
                        onClick={() => art.reportSlug && onOpenReportSlug(art.reportSlug)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Open {art.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {mdArtifacts.length > 0 ? (
                <>
                  <div className="flex flex-wrap items-center gap-1 p-1 bg-[#f5f8fa] border border-[#dae3e9] rounded-md mb-5">
                    {mdArtifacts.map((art) => {
                      const active = selectedArtifact?.path === art.path && docPath === art.path;
                      return (
                        <button
                          key={art.path}
                          type="button"
                          onClick={() => {
                            setSelectedArtifact(art);
                            loadDocument(art.path);
                          }}
                          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            active
                              ? 'bg-white text-[#10253f] shadow-xs border border-[#dae3e9]'
                              : 'text-[#52647a] hover:text-[#10253f]'
                          }`}
                        >
                          {art.label}
                        </button>
                      );
                    })}
                  </div>

                  {binaryArtifacts.length > 0 && (
                    <div className="mb-4 text-xs text-[#52647a] flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-medium text-[#40536b]">Exported files in folder:</span>
                      {binaryArtifacts.map((art, i) => (
                        <React.Fragment key={art.path}>
                          {i > 0 && <span aria-hidden="true">·</span>}
                          <span className="font-mono">{art.name}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  <div className="border border-[#dae3e9] rounded-md p-6 bg-white">
                    {loadingDoc ? (
                      <div className="space-y-3 py-4">
                        <div className="h-5 w-1/3 bg-[#eef5f7] rounded animate-pulse" />
                        <div className="h-3.5 w-full bg-[#f5f8fa] rounded animate-pulse" />
                        <div className="h-3.5 w-5/6 bg-[#f5f8fa] rounded animate-pulse" />
                        <div className="h-3.5 w-2/3 bg-[#f5f8fa] rounded animate-pulse" />
                      </div>
                    ) : docError ? (
                      <div className="text-sm text-[#dc2626] py-4">{docError}</div>
                    ) : (
                      <MarkdownView
                        content={docContent}
                        currentPath={docPath}
                        onNavigateMarkdown={(nextPath) => loadDocument(nextPath)}
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className="border border-[#dae3e9] rounded-md p-6 text-center bg-[#f5f8fa]">
                  <FileText className="w-6 h-6 text-[#52647a] mx-auto mb-2" />
                  <p className="text-sm text-[#40536b]">
                    No Markdown artifacts found inside this opportunity folder yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Client Website View Tab */
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-[#f8fbfc]">
            {/* Publication Status Banner */}
            <div
              className={`p-4 rounded-md border flex flex-wrap items-start justify-between gap-4 ${
                isPublicOnWebsite
                  ? 'bg-[#eef5f7] border-[#0c8b82]/35'
                  : 'bg-white border-[#dae3e9]'
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#10253f]">
                  {isPublicOnWebsite ? (
                    <ShieldCheck className="w-4 h-4 text-[#0c8b82] shrink-0" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-[#52647a] shrink-0" />
                  )}
                  <span>
                    {isPublicOnWebsite
                      ? 'Published on the Public Client Website'
                      : 'Hidden from Public Client Website'}
                  </span>
                </div>
                {isPublicOnWebsite ? (
                  <p className="text-xs text-[#40536b] leading-relaxed">
                    Visible placements:{' '}
                    <span className="font-medium text-[#10253f]">
                      {publicSurfaces.join(' · ')}
                    </span>
                  </p>
                ) : (
                  <p className="text-xs text-[#52647a] leading-relaxed">{hiddenReason}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={onOpenClientShowcase}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Client Showcase
                </button>
                {matchingReports.length > 0 && (
                  <button
                    type="button"
                    onClick={onOpenClientReports}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#10253f] bg-white hover:bg-[#eef5f7] border border-[#dae3e9] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#0c8b82]" />
                    Open Reports Library
                  </button>
                )}
              </div>
            </div>

            {!clientPortfolio ? (
              <div className="p-6 bg-white border border-[#dae3e9] rounded-md text-sm text-[#52647a]">
                Loading live client website snapshot…
              </div>
            ) : !isPublicOnWebsite ? (
              <div className="p-8 bg-white border border-[#dae3e9] rounded-md text-center space-y-2">
                <EyeOff className="w-7 h-7 text-[#7c8ea2] mx-auto" />
                <h3 className="text-sm font-semibold text-[#10253f]">
                  Clients cannot see {opportunity.id} on the public site
                </h3>
                <p className="text-xs text-[#52647a] max-w-md mx-auto leading-relaxed">
                  {hiddenReason} Only active non-Tier-D opportunities, curated flagship cards, and
                  published client briefs are exposed on the public showcase.
                </p>
              </div>
            ) : (
              <>
                {/* 1. Flagship Service Card Preview (if Flagship) */}
                {flagshipMatch && (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#52647a]">
                      Section 01 · Flagship Advisory Card (Front Page)
                    </div>
                    <div className="bg-white border border-[#dae3e9] rounded-md p-5 space-y-4">
                      <div>
                        <div className="text-xs font-semibold text-[#0c8b82] mb-1">
                          {flagshipMatch.strategicAsset} · {flagshipMatch.buyerLine}
                        </div>
                        <h3 className="text-lg font-bold text-[#10253f] leading-snug">
                          {flagshipMatch.title}
                        </h3>
                        <p className="text-sm font-medium text-[#40536b] mt-1">
                          {flagshipMatch.headline}
                        </p>
                        <p className="text-[13.5px] text-[#52647a] mt-2 leading-relaxed">
                          {flagshipMatch.summary}
                        </p>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-[#10253f] mb-1.5">
                          Key Engagement Deliverables
                        </div>
                        <ul className="space-y-1 text-[13px] text-[#17243a]">
                          {flagshipMatch.outcomes.map((out) => (
                            <li key={out} className="flex items-start gap-2">
                              <span className="text-[#0c8b82] font-bold select-none">—</span>
                              <span>{out}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-[#dae3e9] space-y-2.5">
                        <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
                          <div className="text-[#52647a]">
                            Duration:{' '}
                            <span className="font-mono font-medium text-[#10253f] tabular-nums">
                              {flagshipMatch.duration}
                            </span>
                          </div>
                          <div className="text-[#52647a]">
                            Investment Anchor:{' '}
                            <span className="font-mono font-semibold text-[#10253f] tabular-nums">
                              {flagshipMatch.investmentRange}
                            </span>
                          </div>
                        </div>
                        {flagshipMatch.entryWedge && (
                          <div className="text-xs text-[#40536b] bg-[#f5f8fa] px-3 py-2 rounded border border-[#dae3e9]">
                            <span className="font-semibold text-[#075d68]">Entry option: </span>
                            {flagshipMatch.entryWedge}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Advisory Catalog Table Row Preview */}
                {catalogMatch && (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#52647a]">
                      Section 04 · Advisory Practice Catalog Row (Public Table)
                    </div>
                    <div className="bg-white border border-[#dae3e9] rounded-md overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                          <thead>
                            <tr className="bg-[#f5f8fa] border-b border-[#dae3e9] text-xs text-[#40536b]">
                              <th className="px-4 py-2.5 font-semibold whitespace-nowrap">
                                Practice
                              </th>
                              <th className="px-4 py-2.5 font-semibold">Advisory Offering</th>
                              <th className="px-4 py-2.5 font-semibold whitespace-nowrap">
                                Duration
                              </th>
                              <th className="px-4 py-2.5 font-semibold whitespace-nowrap text-right">
                                Indicative Anchor
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-[13.5px]">
                            <tr>
                              <td className="px-4 py-3.5 text-xs font-medium text-[#0c8b82] whitespace-nowrap align-top">
                                {catalogMatch.practice}
                              </td>
                              <td className="px-4 py-3.5 align-top">
                                <div className="font-semibold text-[#10253f]">
                                  {catalogMatch.title}
                                </div>
                                <div className="text-xs text-[#52647a] mt-0.5 leading-relaxed">
                                  {catalogMatch.description}
                                </div>
                                <div className="text-[11px] text-[#52647a] mt-1">
                                  {catalogMatch.category} · {catalogMatch.organizationSize}
                                </div>
                              </td>
                              <td className="px-4 py-3.5 font-mono text-xs text-[#40536b] whitespace-nowrap align-top tabular-nums">
                                {catalogMatch.duration}
                              </td>
                              <td className="px-4 py-3.5 font-mono text-xs text-[#10253f] text-right whitespace-nowrap align-top tabular-nums">
                                {catalogMatch.investmentRange}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {sanitizationDiffs.length > 0 && (
                        <div className="px-4 py-3 bg-[#f5f8fa] border-t border-[#dae3e9] space-y-1.5">
                          <div className="text-[11px] font-semibold text-[#075d68]">
                            Auto-sanitized between Internal Inventory and Public Website:
                          </div>
                          <div className="space-y-1 text-xs">
                            {sanitizationDiffs.map((diff) => (
                              <div
                                key={diff.field}
                                className="flex flex-wrap items-baseline gap-x-2 text-[#40536b]"
                              >
                                <span className="font-semibold text-[#10253f]">{diff.field}:</span>
                                <span className="line-through text-[#7c8ea2] font-mono text-[11px]">
                                  {diff.internalVal}
                                </span>
                                <span aria-hidden="true">→</span>
                                <span className="font-mono font-medium text-[#075d68] text-[11px]">
                                  {diff.publicVal}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. Linked Client Reports & Briefs */}
                {matchingReports.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#52647a]">
                      Published Client Reports & Briefs Linked to {opportunity.id}
                    </div>
                    <div className="space-y-2">
                      {matchingReports.map((rep) => (
                        <div
                          key={rep.slug}
                          className="bg-white border border-[#dae3e9] rounded-md p-4 flex flex-wrap items-start justify-between gap-3"
                        >
                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex flex-wrap items-center gap-x-2 text-[11px]">
                              <span className="font-semibold text-[#0c8b82]">{rep.category}</span>
                              <span className="text-[#dae3e9]" aria-hidden="true">
                                ·
                              </span>
                              <span className="font-medium text-[#10253f]">
                                {rep.featuredOnHome
                                  ? 'Featured on Front Page + Reports Library'
                                  : 'Published in Reports Library (?view=reports)'}
                              </span>
                              {rep.investmentAnchor && (
                                <>
                                  <span className="text-[#dae3e9]" aria-hidden="true">
                                    ·
                                  </span>
                                  <span className="font-mono text-[#52647a]">
                                    {rep.investmentAnchor}
                                  </span>
                                </>
                              )}
                            </div>
                            <div className="text-sm font-semibold text-[#10253f]">{rep.title}</div>
                            <p className="text-xs text-[#52647a] leading-relaxed">{rep.subtitle}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onOpenReportSlug(rep.slug)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#10253f] bg-[#f5f8fa] hover:bg-[#eef5f7] border border-[#dae3e9] rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-[#0c8b82]" />
                            Inspect Report
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Exact Client Drawer Preview ("One-Pager" / "Details" Click) */}
                {(catalogMatch || flagshipMatch || isMipOpportunity) && (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#52647a]">
                      Client Detail Drawer Preview (When a Client Clicks &ldquo;
                      {publicOnePagerPath ? 'One-Pager' : 'Details'}&rdquo;)
                    </div>
                    <div className="bg-white border border-[#dae3e9] rounded-md overflow-hidden">
                      <div className="px-5 py-4 bg-[#f5f8fa] border-b border-[#dae3e9]">
                        <div className="text-xs font-medium text-[#0c8b82] mb-0.5">
                          {flagshipMatch
                            ? `${flagshipMatch.strategicAsset} · ${flagshipMatch.buyerLine}`
                            : `${catalogMatch?.practice || opportunity.pillar} · ${
                                catalogMatch?.category || opportunity.category
                              }`}
                        </div>
                        <div className="text-base font-bold text-[#10253f]">
                          {flagshipMatch?.title || catalogMatch?.title || opportunity.title}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 text-xs text-[#52647a] mt-1 font-mono tabular-nums">
                          <span>
                            Duration:{' '}
                            {flagshipMatch?.duration ||
                              catalogMatch?.duration ||
                              opportunity.timeHorizon}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>
                            Anchor:{' '}
                            {flagshipMatch?.investmentRange ||
                              catalogMatch?.investmentRange ||
                              'Scoped on request'}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        {publicOnePagerPath ? (
                          loadingClientOnePager ? (
                            <div className="space-y-2.5 py-2">
                              <div className="h-5 w-1/3 bg-[#eef5f7] rounded animate-pulse" />
                              <div className="h-3.5 w-full bg-[#f5f8fa] rounded animate-pulse" />
                              <div className="h-3.5 w-5/6 bg-[#f5f8fa] rounded animate-pulse" />
                            </div>
                          ) : clientOnePagerError ? (
                            <div className="text-xs text-[#dc2626]">{clientOnePagerError}</div>
                          ) : (
                            <MarkdownView
                              content={clientOnePagerContent}
                              currentPath={publicOnePagerPath}
                            />
                          )
                        ) : (
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-xs font-semibold text-[#075d68] mb-1.5">
                                Engagement Overview
                              </h4>
                              <p className="text-sm leading-relaxed text-[#17243a]">
                                {catalogMatch?.description || opportunity.description}
                              </p>
                            </div>
                            {(catalogMatch?.toolkit || opportunity.signatureToolkit) && (
                              <div className="p-3.5 bg-[#f5f8fa] border border-[#dae3e9] rounded-md">
                                <div className="text-[11px] font-semibold text-[#52647a] mb-0.5">
                                  CBa Consult Signature Methodology
                                </div>
                                <div className="text-sm font-medium text-[#10253f]">
                                  {catalogMatch?.toolkit || opportunity.signatureToolkit}
                                </div>
                              </div>
                            )}
                            <div className="p-3.5 bg-[#eef5f7] border border-[#dae3e9] rounded-md text-xs text-[#40536b] leading-relaxed">
                              Every assignment is delivered on a fixed-scope basis using your
                              existing systems and operates 100% independent of your statutory
                              auditor. Add this offering to your scoping shortlist to request a
                              tailored statement of work.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
