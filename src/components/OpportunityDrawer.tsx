import React, { useEffect, useState } from 'react';
import { ExternalLink, FileText, X } from 'lucide-react';
import type { ArtifactFile, Opportunity } from '../types';
import { MarkdownView } from './MarkdownView';

interface OpportunityDrawerProps {
  opportunity: Opportunity | null;
  authToken: string;
  onUnauthorized?: () => void;
  onClose: () => void;
  onOpenReportSlug: (slug: string) => void;
}

export const OpportunityDrawer: React.FC<OpportunityDrawerProps> = ({
  opportunity,
  authToken,
  onUnauthorized,
  onClose,
  onOpenReportSlug,
}) => {
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactFile | null>(null);
  const [docContent, setDocContent] = useState<string>('');
  const [docPath, setDocPath] = useState<string>('');
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [docError, setDocError] = useState<string | null>(null);

  useEffect(() => {
    if (!opportunity) {
      setSelectedArtifact(null);
      setDocContent('');
      setDocPath('');
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
        <div className="px-6 py-5 border-b border-[#dae3e9] bg-[#f5f8fa] flex items-start justify-between gap-4 shrink-0">
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Summary Description */}
          <div>
            <p className="text-[15px] leading-relaxed text-[#17243a]">{opportunity.description}</p>
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
              <div className="text-xs font-semibold text-[#52647a] mb-1">Signature Toolkit & Category</div>
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
              <p className="text-[#40536b] leading-relaxed">{opportunity.scalabilityPath || '—'}</p>
            </div>
            <div>
              <div className="text-xs font-semibold text-[#52647a] mb-1">Risks & Constraints</div>
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
      </div>
    </div>
  );
};
