import React, { useEffect, useRef, useState } from 'react';
import { Download, FileDown, FileText, LayoutTemplate } from 'lucide-react';
import type { CoreDocumentEntry, HtmlReportEntry } from '../types';
import { MarkdownView } from './MarkdownView';
import { exportHtmlElementToPdf, exportMarkdownToPdf } from '../utils/pdfExport';

interface ReportsViewProps {
  htmlReports: HtmlReportEntry[];
  coreDocuments: CoreDocumentEntry[];
  authToken: string;
  onUnauthorized?: () => void;
  initialReportSlug?: string | null;
  initialDocPath?: string | null;
  onClearInitial?: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  htmlReports,
  coreDocuments,
  authToken,
  onUnauthorized,
  initialReportSlug,
  initialDocPath,
  onClearInitial,
}) => {
  const [mode, setMode] = useState<'html' | 'markdown'>(initialDocPath ? 'markdown' : 'html');
  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialReportSlug || htmlReports[0]?.slug || ''
  );
  const [selectedDocPath, setSelectedDocPath] = useState<string>(
    initialDocPath || coreDocuments[0]?.path || ''
  );
  const [docContent, setDocContent] = useState<string>('');
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [docError, setDocError] = useState<string | null>(null);

  const [reportHtml, setReportHtml] = useState<string>('');
  const [loadingReport, setLoadingReport] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (initialReportSlug) {
      setMode('html');
      setSelectedSlug(initialReportSlug);
      onClearInitial?.();
    } else if (initialDocPath) {
      setMode('markdown');
      setSelectedDocPath(initialDocPath);
      onClearInitial?.();
    }
  }, [initialReportSlug, initialDocPath, onClearInitial]);

  useEffect(() => {
    if (mode !== 'markdown' || !selectedDocPath) return;
    let cancelled = false;
    const run = async () => {
      setLoadingDoc(true);
      setDocError(null);
      setExportError(null);
      try {
        const res = await fetch(`/api/document?path=${encodeURIComponent(selectedDocPath)}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.status === 401) {
          onUnauthorized?.();
          return;
        }
        if (!res.ok) throw new Error('Failed to load document');
        const data = await res.json();
        if (!cancelled) setDocContent(data.content);
      } catch {
        if (!cancelled) {
          setDocError('Unable to load the requested Markdown document.');
          setDocContent('');
        }
      } finally {
        if (!cancelled) setLoadingDoc(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [mode, selectedDocPath, authToken, onUnauthorized]);

  const activeReport = htmlReports.find((r) => r.slug === selectedSlug) ?? htmlReports[0];
  const activeDocMeta = coreDocuments.find((d) => d.path === selectedDocPath);

  useEffect(() => {
    if (mode !== 'html' || !activeReport) return;
    let cancelled = false;
    const loadHtmlReport = async () => {
      setLoadingReport(true);
      setReportError(null);
      setExportError(null);
      try {
        const res = await fetch(activeReport.url, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.status === 401) {
          onUnauthorized?.();
          return;
        }
        if (!res.ok) throw new Error('Failed to load HTML report');
        const html = await res.text();
        if (!cancelled) setReportHtml(html);
      } catch {
        if (!cancelled) {
          setReportError('Unable to load the selected HTML report.');
          setReportHtml('');
        }
      } finally {
        if (!cancelled) setLoadingReport(false);
      }
    };
    loadHtmlReport();
    return () => {
      cancelled = true;
    };
  }, [mode, activeReport, authToken, onUnauthorized]);

  const triggerBlobDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadReportHtml = () => {
    if (!activeReport || !reportHtml) return;
    const blob = new Blob([reportHtml], { type: 'text/html;charset=utf-8' });
    triggerBlobDownload(blob, `${activeReport.slug}.html`);
  };

  const handleDownloadReportPdf = async () => {
    if (!activeReport || exportingPdf) return;
    setExportingPdf(true);
    setExportError(null);
    try {
      if (activeReport.pdfUrl) {
        const res = await fetch(activeReport.pdfUrl, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.status === 401) {
          onUnauthorized?.();
          return;
        }
        if (!res.ok) throw new Error('Could not download PDF');
        const blob = await res.blob();
        const fileName = activeReport.pdfSourcePath
          ? activeReport.pdfSourcePath.split('/').pop() || `${activeReport.slug}.pdf`
          : `${activeReport.slug}.pdf`;
        triggerBlobDownload(blob, fileName);
      } else {
        const iframeBody = iframeRef.current?.contentDocument?.body;
        if (!iframeBody) {
          throw new Error('Report preview is not ready yet.');
        }
        await exportHtmlElementToPdf(iframeBody, activeReport.slug);
      }
    } catch {
      setExportError('Unable to export PDF for this report. Please try again.');
    } finally {
      setExportingPdf(false);
    }
  };

  const handleDownloadBriefPdf = async () => {
    if (!docContent || exportingPdf) return;
    setExportingPdf(true);
    setExportError(null);
    try {
      const baseName = selectedDocPath.split('/').pop()?.replace(/\.md$/i, '') || 'portfolio-brief';
      await exportMarkdownToPdf(
        activeDocMeta?.title || baseName,
        selectedDocPath,
        docContent,
        baseName
      );
    } catch {
      setExportError('Unable to export PDF for this brief.');
    } finally {
      setExportingPdf(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#dae3e9]">
        <div>
          <h1 className="text-2xl font-bold text-[#10253f] tracking-tight">
            Reports, Governance Registers & Briefs
          </h1>
          <p className="text-sm text-[#52647a] mt-1">
            View the repository&apos;s formatted HTML executive reports or inspect any core Markdown
            portfolio brief directly.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-white border border-[#dae3e9] rounded-md shrink-0">
          <button
            type="button"
            onClick={() => setMode('html')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'html'
                ? 'bg-[#10253f] text-white'
                : 'text-[#52647a] hover:text-[#10253f]'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            HTML Reports ({htmlReports.length})
          </button>
          <button
            type="button"
            onClick={() => setMode('markdown')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'markdown'
                ? 'bg-[#10253f] text-white'
                : 'text-[#52647a] hover:text-[#10253f]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Core Briefs ({coreDocuments.length})
          </button>
        </div>
      </div>

      {mode === 'html' ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-4 max-h-[820px] overflow-y-auto pr-1.5 space-y-2">
            {htmlReports.map((rep) => {
              const active = activeReport?.slug === rep.slug;
              return (
                <button
                  key={rep.slug}
                  type="button"
                  onClick={() => setSelectedSlug(rep.slug)}
                  className={`w-full text-left p-4 rounded-md border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#eef5f7] border-[#0c8b82]'
                      : 'bg-white border-[#dae3e9] hover:bg-[#f8fbfc]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] mb-1">
                    <span
                      className={
                        rep.audience === 'client'
                          ? 'font-semibold text-[#0c8b82]'
                          : 'font-medium text-[#52647a]'
                      }
                    >
                      {rep.audience === 'client' ? 'Client-Facing Edition' : 'Internal Review'}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-[#10253f]">{rep.title}</div>
                  <div className="text-xs text-[#52647a] mt-1 leading-relaxed">{rep.subtitle}</div>
                  <div className="text-[11px] font-mono text-[#075d68] mt-2 truncate">
                    {rep.sourcePath}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="xl:col-span-8 bg-white border border-[#dae3e9] rounded-md overflow-hidden">
            {activeReport && (
              <>
                <div className="px-4 py-3 bg-[#f5f8fa] border-b border-[#dae3e9] flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold text-[#10253f] truncate">
                        {activeReport.title}
                      </div>
                      <span
                        className={`text-[11px] whitespace-nowrap shrink-0 ${
                          activeReport.audience === 'client'
                            ? 'font-semibold text-[#0c8b82]'
                            : 'text-[#52647a]'
                        }`}
                      >
                        · {activeReport.audience === 'client' ? 'Client-Facing' : 'Internal'}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#52647a] truncate">
                      {activeReport.sourcePath}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {activeReport.referencePdfUrl && (
                      <a
                        href={activeReport.referencePdfUrl}
                        download="Scenario-Planning-Step-by-Step-Guide.pdf"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#075d68] bg-[#eef5f7] border border-[#0c8b82]/30 hover:bg-[#dff3f0] rounded-md whitespace-nowrap shrink-0"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        {activeReport.referencePdfLabel || 'Source PDF'}
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={handleDownloadReportHtml}
                      disabled={!reportHtml || loadingReport}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] disabled:opacity-50 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download HTML
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadReportPdf}
                      disabled={!reportHtml || loadingReport || exportingPdf}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] disabled:opacity-50 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      {exportingPdf ? 'Exporting PDF...' : 'Download PDF'}
                    </button>
                  </div>
                </div>
                {exportError && (
                  <div className="px-4 py-2 bg-[#fef2f2] border-b border-[#fecaca] text-xs font-medium text-[#b91c1c]">
                    {exportError}
                  </div>
                )}
                {loadingReport ? (
                  <div className="p-8 space-y-3 h-[760px]">
                    <div className="h-6 w-1/3 bg-[#eef5f7] rounded animate-pulse" />
                    <div className="h-4 w-full bg-[#f5f8fa] rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-[#f5f8fa] rounded animate-pulse" />
                    <div className="h-64 w-full bg-[#f5f8fa] rounded animate-pulse mt-4" />
                  </div>
                ) : reportError ? (
                  <div className="p-8 text-sm text-[#dc2626]">{reportError}</div>
                ) : (
                  <iframe
                    ref={iframeRef}
                    title={activeReport.title}
                    srcDoc={reportHtml}
                    sandbox="allow-same-origin"
                    className="w-full h-[760px] bg-white border-0"
                  />
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-4 max-h-[820px] overflow-y-auto bg-white border border-[#dae3e9] rounded-md divide-y divide-[#dae3e9]">
            {coreDocuments.map((doc) => {
              const active = selectedDocPath === doc.path;
              return (
                <button
                  key={doc.path}
                  type="button"
                  onClick={() => setSelectedDocPath(doc.path)}
                  className={`w-full text-left p-4 transition-colors cursor-pointer ${
                    active ? 'bg-[#eef5f7]' : 'hover:bg-[#f8fbfc]'
                  }`}
                >
                  <div className="text-[11px] font-medium text-[#0c8b82] mb-0.5">
                    {doc.category}
                  </div>
                  <div className="text-sm font-semibold text-[#10253f]">{doc.title}</div>
                  <div className="text-xs text-[#52647a] mt-1 leading-relaxed">
                    {doc.description}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="xl:col-span-8 bg-white border border-[#dae3e9] rounded-md overflow-hidden">
            <div className="px-6 py-3.5 bg-[#f5f8fa] border-b border-[#dae3e9] flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#10253f] truncate">
                  {activeDocMeta?.title || selectedDocPath}
                </div>
                <div className="text-xs font-mono text-[#52647a] truncate">{selectedDocPath}</div>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {activeDocMeta?.referencePdfUrl && (
                  <a
                    href={activeDocMeta.referencePdfUrl}
                    download="Scenario-Planning-Step-by-Step-Guide.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#075d68] bg-[#eef5f7] border border-[#0c8b82]/30 hover:bg-[#dff3f0] rounded-md whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {activeDocMeta.referencePdfLabel || 'Source PDF'}
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleDownloadBriefPdf}
                  disabled={!docContent || loadingDoc || exportingPdf}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] disabled:opacity-50 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  {exportingPdf ? 'Exporting PDF...' : 'Download PDF'}
                </button>
              </div>
            </div>
            {exportError && (
              <div className="px-6 py-2 bg-[#fef2f2] border-b border-[#fecaca] text-xs font-medium text-[#b91c1c]">
                {exportError}
              </div>
            )}
            <div className="p-6 max-h-[780px] overflow-y-auto">
              {loadingDoc ? (
                <div className="space-y-3 py-4">
                  <div className="h-6 w-1/3 bg-[#eef5f7] rounded animate-pulse" />
                  <div className="h-4 w-full bg-[#f5f8fa] rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-[#f5f8fa] rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-[#f5f8fa] rounded animate-pulse" />
                </div>
              ) : docError ? (
                <div className="text-sm text-[#dc2626]">{docError}</div>
              ) : (
                <MarkdownView
                  content={docContent}
                  currentPath={selectedDocPath}
                  onNavigateMarkdown={(nextPath) => setSelectedDocPath(nextPath)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
