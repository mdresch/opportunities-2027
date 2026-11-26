import React, { useEffect, useState } from 'react';
import { ExternalLink, FileText, LayoutTemplate } from 'lucide-react';
import type { CoreDocumentEntry, HtmlReportEntry } from '../types';
import { MarkdownView } from './MarkdownView';

interface ReportsViewProps {
  htmlReports: HtmlReportEntry[];
  coreDocuments: CoreDocumentEntry[];
  initialReportSlug?: string | null;
  initialDocPath?: string | null;
  onClearInitial?: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  htmlReports,
  coreDocuments,
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
      try {
        const res = await fetch(`/api/document?path=${encodeURIComponent(selectedDocPath)}`);
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
  }, [mode, selectedDocPath]);

  const activeReport = htmlReports.find((r) => r.slug === selectedSlug) ?? htmlReports[0];
  const activeDocMeta = coreDocuments.find((d) => d.path === selectedDocPath);

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
          <div className="xl:col-span-4 space-y-2">
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
                <div className="px-4 py-3 bg-[#f5f8fa] border-b border-[#dae3e9] flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[#10253f] truncate">
                      {activeReport.title}
                    </div>
                    <div className="text-xs font-mono text-[#52647a] truncate">
                      {activeReport.sourcePath}
                    </div>
                  </div>
                  <a
                    href={activeReport.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] rounded-md whitespace-nowrap shrink-0"
                  >
                    Open Standalone
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <iframe
                  title={activeReport.title}
                  src={activeReport.url}
                  className="w-full h-[760px] bg-white border-0"
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-4 bg-white border border-[#dae3e9] rounded-md divide-y divide-[#dae3e9]">
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
            <div className="px-6 py-3.5 bg-[#f5f8fa] border-b border-[#dae3e9] flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#10253f] truncate">
                  {activeDocMeta?.title || selectedDocPath}
                </div>
                <div className="text-xs font-mono text-[#52647a] truncate">{selectedDocPath}</div>
              </div>
            </div>
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
