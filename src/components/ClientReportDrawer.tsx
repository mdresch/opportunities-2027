import React, { useEffect, useRef, useState } from 'react';
import { Download, FileDown, X } from 'lucide-react';
import type { ClientReportEntry } from '../types';
import { exportHtmlElementToPdf } from '../utils/pdfExport';

interface ClientReportDrawerProps {
  report: ClientReportEntry | null;
  onRequestScoping: (serviceLabel: string) => void;
  onClose: () => void;
}

export const ClientReportDrawer: React.FC<ClientReportDrawerProps> = ({
  report,
  onRequestScoping,
  onClose,
}) => {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!report) {
      setHtml('');
      setLoading(false);
      setError(null);
      setExportError(null);
      return;
    }
    let cancelled = false;
    const loadReport = async () => {
      setLoading(true);
      setError(null);
      setExportError(null);
      try {
        const res = await fetch(report.url);
        if (!res.ok) throw new Error('Unable to load report');
        const text = await res.text();
        if (!cancelled) setHtml(text);
      } catch {
        if (!cancelled) {
          setError('Unable to load this executive report right now.');
          setHtml('');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadReport();
    return () => {
      cancelled = true;
    };
  }, [report]);

  if (!report) return null;

  const handleDownloadHtml = () => {
    if (!html) return;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.slug}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    if (exportingPdf) return;
    setExportingPdf(true);
    setExportError(null);
    try {
      const iframeBody = iframeRef.current?.contentDocument?.body;
      if (!iframeBody) {
        throw new Error('Report preview is not ready yet.');
      }
      await exportHtmlElementToPdf(iframeBody, report.slug);
    } catch {
      setExportError('Unable to export PDF right now. Please try again.');
    } finally {
      setExportingPdf(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#10253f]/45"
      role="dialog"
      aria-modal="true"
      aria-label={report.title}
    >
      <div className="flex-1" onClick={onClose} />
      <div className="w-full max-w-4xl bg-white h-full border-l border-[#dae3e9] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#f5f8fa] border-b border-[#dae3e9] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <div className="text-xs font-medium text-[#0c8b82]">
              {report.editionLabel} · {report.pagesLabel}
            </div>
            <h2 className="text-lg font-bold text-[#10253f] leading-snug truncate mt-0.5">
              {report.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadHtml}
              disabled={!html || loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] disabled:opacity-50 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download HTML
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={!html || loading || exportingPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] disabled:opacity-50 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              {exportingPdf ? 'Exporting PDF...' : 'Download PDF'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#52647a] hover:text-[#10253f] hover:bg-[#eef5f7] rounded-md transition-colors shrink-0 cursor-pointer"
              aria-label="Close executive report"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {exportError && (
          <div className="px-6 py-2 bg-[#fef2f2] border-b border-[#fecaca] text-xs font-medium text-[#b91c1c] shrink-0">
            {exportError}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 bg-[#e9eef2] overflow-hidden">
          {loading ? (
            <div className="p-8 space-y-4 bg-white h-full">
              <div className="h-7 w-1/3 bg-[#eef5f7] rounded animate-pulse" />
              <div className="h-4 w-full bg-[#f5f8fa] rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-[#f5f8fa] rounded animate-pulse" />
              <div className="h-72 w-full bg-[#f5f8fa] rounded animate-pulse mt-4" />
            </div>
          ) : error ? (
            <div className="p-8 text-sm text-[#dc2626] bg-white h-full">{error}</div>
          ) : (
            <iframe
              ref={iframeRef}
              title={report.title}
              srcDoc={html}
              sandbox="allow-same-origin"
              className="w-full h-full bg-white border-0"
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#f5f8fa] border-t border-[#dae3e9] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-[#52647a]">
            CBa Consult · Independent &amp; Conflict-Free Advisory · Fixed-Scope SOW
          </span>
          <button
            type="button"
            onClick={() => onRequestScoping(`Executive Briefing — ${report.title}`)}
            className="px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Scoping Call
          </button>
        </div>
      </div>
    </div>
  );
};
