import React, { useMemo, useState } from 'react';
import { BookOpen } from 'lucide-react';
import type { Hypothesis } from '../types';

interface HypothesesViewProps {
  hypotheses: Hypothesis[];
  onOpenDocument: (path: string) => void;
}

const STATUS_FILTERS = ['All', 'Testing', 'Formulated', 'Formulated/Blocked'] as const;

export const HypothesesView: React.FC<HypothesesViewProps> = ({
  hypotheses,
  onOpenDocument,
}) => {
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>('All');

  const filtered = useMemo(() => {
    if (statusFilter === 'All') return hypotheses;
    return hypotheses.filter((h) => h.status.toLowerCase() === statusFilter.toLowerCase());
  }, [hypotheses, statusFilter]);

  const counts = useMemo(() => {
    return {
      total: hypotheses.length,
      testing: hypotheses.filter((h) => h.status.toLowerCase() === 'testing').length,
      formulated: hypotheses.filter((h) => h.status.toLowerCase() === 'formulated').length,
      blocked: hypotheses.filter((h) => h.status.toLowerCase() === 'formulated/blocked').length,
    };
  }, [hypotheses]);

  const statusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'testing') return 'text-[#0c8b82] font-semibold';
    if (s === 'validated') return 'text-[#16a34a] font-semibold';
    if (s.includes('blocked')) return 'text-[#b45309] font-medium';
    if (s === 'invalidated') return 'text-[#dc2626] font-semibold';
    return 'text-[#40536b] font-medium';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#dae3e9]">
        <div>
          <h1 className="text-2xl font-bold text-[#10253f] tracking-tight">
            Stage 2 Hypothesis Register & Wave 1 Playbook
          </h1>
          <p className="text-sm text-[#52647a] mt-1 max-w-2xl">
            Falsifiable buyer, pricing, feasibility, and IP-reuse assumptions tracked before
            committing commercial pilot hours. All outcomes maintain an honest evidence baseline.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenDocument('docs/registers/Wave-1-Execution-Playbook.md')}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Open Wave 1 Playbook
        </button>
      </div>

      {/* Summary Metrics + Segmented Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#52647a] tabular-nums">
          <span>
            <strong className="font-mono text-[#10253f]">{counts.total}</strong> total
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <strong className="font-mono text-[#0c8b82]">{counts.testing}</strong> actively testing
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <strong className="font-mono text-[#40536b]">{counts.formulated}</strong> formulated
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <strong className="font-mono text-[#b45309]">{counts.blocked}</strong> blocked on prior gate
          </span>
        </div>

        <div className="flex items-center gap-1 p-1 bg-white border border-[#dae3e9] rounded-md overflow-x-auto">
          {STATUS_FILTERS.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#10253f] text-white'
                  : 'text-[#52647a] hover:text-[#10253f]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Hypothesis List */}
      <div className="space-y-4">
        {filtered.map((hyp) => (
          <article
            key={hyp.id}
            className="bg-white border border-[#dae3e9] rounded-md p-5 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#dae3e9]">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#52647a]">
                <span className="font-mono font-semibold text-[#10253f]">{hyp.id}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono font-medium text-[#075d68]">{hyp.opportunity}</span>
                <span aria-hidden="true">·</span>
                <span>{hyp.type}</span>
                <span aria-hidden="true">·</span>
                <span>{hyp.wave}</span>
              </div>
              <span className={`text-xs whitespace-nowrap ${statusColor(hyp.status)}`}>
                Status: {hyp.status}
              </span>
            </div>

            <div>
              <div className="text-xs font-semibold text-[#52647a] mb-1">Hypothesis Statement</div>
              <p className="text-[14.5px] leading-relaxed text-[#10253f] font-medium">
                {hyp.statement}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1 text-[13px] leading-relaxed">
              <div>
                <div className="text-xs font-semibold text-[#52647a] mb-1">Test Plan & Sample</div>
                <p className="text-[#40536b]">{hyp.testPlan}</p>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#075d68] mb-1">Success Threshold</div>
                <p className="text-[#17243a]">{hyp.successThreshold}</p>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#b45309] mb-1">
                  Falsification Criteria
                </div>
                <p className="text-[#40536b]">{hyp.falsificationCriteria}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#dae3e9] text-xs text-[#52647a]">
              <span className="font-semibold text-[#40536b]">Evidence / Updates: </span>
              <span>{hyp.evidence}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
