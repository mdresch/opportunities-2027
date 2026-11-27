import React, { useEffect, useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { MarkdownView } from './MarkdownView';
import { useAccessibleDialog } from '../utils/useAccessibleDialog';

export interface ClientBriefSelection {
  title: string;
  subtitle: string;
  serviceLabel: string;
  duration?: string;
  investmentRange?: string;
  onePagerPath?: string;
  description?: string;
  toolkit?: string;
}

interface ClientServiceDrawerProps {
  selection: ClientBriefSelection | null;
  isShortlisted: boolean;
  onToggleShortlist: (serviceLabel: string) => void;
  onRequestScoping: (serviceLabel: string) => void;
  onClose: () => void;
}

export const ClientServiceDrawer: React.FC<ClientServiceDrawerProps> = ({
  selection,
  isShortlisted,
  onToggleShortlist,
  onRequestScoping,
  onClose,
}) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useAccessibleDialog(Boolean(selection), onClose);

  useEffect(() => {
    if (!selection?.onePagerPath) {
      setContent('');
      setLoading(false);
      setError(null);
      return;
    }
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/document?path=${encodeURIComponent(selection.onePagerPath!)}`
        );
        if (!res.ok) throw new Error('Unable to load brief');
        const data = await res.json();
        if (!cancelled) setContent(data.content);
      } catch {
        if (!cancelled) {
          setError('The detailed service brief is currently unavailable.');
          setContent('');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [selection]);

  if (!selection) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#10253f]/40"
      role="dialog"
      aria-modal="true"
      aria-label={`${selection.title} service brief`}
    >
      <div className="flex-1" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="w-full max-w-3xl bg-white h-full border-l border-[#dae3e9] flex flex-col overflow-hidden focus:outline-none"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 bg-[#f5f8fa] border-b border-[#dae3e9] flex items-start justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <div className="text-xs font-semibold text-[#075d68] mb-1">{selection.subtitle}</div>
            <h2 className="text-xl font-bold text-[#10253f] leading-snug">{selection.title}</h2>
            {(selection.duration || selection.investmentRange) && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#52647a] mt-2 font-mono tabular-nums">
                {selection.duration && <span>Duration: {selection.duration}</span>}
                {selection.duration && selection.investmentRange && (
                  <span aria-hidden="true">·</span>
                )}
                {selection.investmentRange && <span>Anchor: {selection.investmentRange}</span>}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#52647a] hover:text-[#10253f] hover:bg-[#eef5f7] rounded-md transition-colors shrink-0 cursor-pointer"
            aria-label="Close service brief"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          {selection.onePagerPath ? (
            loading ? (
              <div className="space-y-3 py-4">
                <div className="h-6 w-2/5 bg-[#eef5f7] rounded animate-pulse" />
                <div className="h-4 w-full bg-[#f5f8fa] rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-[#f5f8fa] rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-[#f5f8fa] rounded animate-pulse" />
              </div>
            ) : error ? (
              <div role="alert" className="text-sm text-[#dc2626]">{error}</div>
            ) : (
              <MarkdownView content={content} currentPath={selection.onePagerPath} />
            )
          ) : (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-[#075d68] mb-2">Engagement Overview</h3>
                <p className="text-[15px] leading-relaxed text-[#17243a]">
                  {selection.description}
                </p>
              </div>
              {selection.toolkit && (
                <div className="p-4 bg-[#f5f8fa] border border-[#dae3e9] rounded-md">
                  <div className="text-xs font-semibold text-[#52647a] mb-1">
                    CBa Consult Signature Methodology
                  </div>
                  <div className="text-sm font-medium text-[#10253f]">{selection.toolkit}</div>
                </div>
              )}
              <div className="p-4 bg-[#eef5f7] border border-[#dae3e9] rounded-md text-sm text-[#40536b] leading-relaxed">
                Every assignment is delivered on a fixed-scope basis using your existing systems and
                operates 100% independent of your statutory auditor. Add this offering to your
                scoping shortlist to request a tailored statement of work.
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-4 sm:px-6 py-4 bg-[#f5f8fa] border-t border-[#dae3e9] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            aria-pressed={isShortlisted}
            onClick={() => onToggleShortlist(selection.serviceLabel)}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 sm:py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isShortlisted
                ? 'bg-[#eef5f7] border-[#075d68] text-[#075d68]'
                : 'bg-white border-[#dae3e9] text-[#10253f] hover:bg-[#eef5f7]'
            }`}
          >
            {isShortlisted ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {isShortlisted ? 'Added to Shortlist' : 'Add to Shortlist'}
          </button>

          <button
            type="button"
            onClick={() => onRequestScoping(selection.serviceLabel)}
            className="px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Scope This Assignment
          </button>
        </div>
      </div>
    </div>
  );
};
