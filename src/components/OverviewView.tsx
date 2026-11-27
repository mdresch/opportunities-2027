import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { Opportunity, PortfolioData } from '../types';

interface OverviewViewProps {
  data: PortfolioData;
  onSelectOpportunity: (opp: Opportunity) => void;
  onNavigateTab: (tab: 'overview' | 'inventory' | 'hypotheses' | 'reports') => void;
  onOpenDocument: (path: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  data,
  onSelectOpportunity,
  onNavigateTab,
  onOpenDocument,
}) => {
  const { summary, coreFlagships, waves, graduatedRepos, baselineFeedback, opportunities } = data;

  const findOpportunity = (id: string) => opportunities.find((o) => o.id === id);

  return (
    <div className="space-y-8">
      {/* Executive Lead */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-[#dae3e9]">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-[#0c8b82] mb-1.5">
            CBa Consult · 2027–2030 Consulting Portfolio Architecture
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#10253f] tracking-tight">
            Truth Production Governance — Core 5 Flagships
          </h1>
          <p className="text-[15px] text-[#40536b] mt-2 leading-relaxed">
            {summary.currentPhase}. Concentrated on 5 Core Active Tier A flagships across CFO and
            CIO/CISO buyers to protect the weekly capacity cap while keeping zero-working-capital
            discipline.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenDocument('Tier_A_Executive_Summary_2027.md')}
            className="px-4 py-2 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Read Executive Brief
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('inventory')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Browse All {summary.totalOpportunities} Ideas
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Strip — 4-Column Flat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#dae3e9] rounded-md p-5">
          <div className="text-xs text-[#52647a] mb-2">Portfolio Inventory</div>
          <div className="text-3xl font-bold font-mono tabular-nums text-[#10253f]">
            {summary.totalOpportunities}
          </div>
          <div className="text-xs text-[#52647a] mt-2">
            {summary.totalFolders} Spark folders · {data.pillars.length} pillars
          </div>
        </div>

        <div className="bg-white border border-[#dae3e9] rounded-md p-5">
          <div className="text-xs text-[#52647a] mb-2">Core Active Tier A</div>
          <div className="text-3xl font-bold font-mono tabular-nums text-[#0c8b82]">
            {summary.tierACount}
          </div>
          <div className="text-xs text-[#52647a] mt-2">
            {summary.tierBCount} Tier B · {summary.tierCCount} Tier C · {summary.tierDCount} Tier D
          </div>
        </div>

        <div className="bg-white border border-[#dae3e9] rounded-md p-5">
          <div className="text-xs text-[#52647a] mb-2">Stage 2 Hypotheses</div>
          <div className="text-3xl font-bold font-mono tabular-nums text-[#10253f]">
            {summary.testingHypotheses}
            <span className="text-lg font-normal text-[#52647a]"> / {summary.totalHypotheses}</span>
          </div>
          <div className="text-xs text-[#52647a] mt-2">
            Actively testing · {summary.activePilots} live commercial pilots
          </div>
        </div>

        <div className="bg-white border border-[#dae3e9] rounded-md p-5">
          <div className="text-xs text-[#52647a] mb-2">Operating Constraint</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#10253f] pt-0.5">
            10–15 hrs/wk
          </div>
          <div className="text-xs text-[#52647a] mt-2.5">
            $0 initial working capital · Updated {summary.lastUpdated}
          </div>
        </div>
      </div>

      {/* Core 5 Active Tier A Flagships */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#142a48]">
              01. Core 5 Active Tier A Flagships
            </h2>
            <p className="text-sm text-[#52647a] mt-0.5">
              Four fixed-scope assessments feeding the recurring Managed Intelligence Provider (MIP) umbrella retainer.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('inventory')}
            className="text-xs font-medium text-[#0c8b82] hover:text-[#075d68] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Full priority inventory →
          </button>
        </div>

        <div className="bg-white border border-[#dae3e9] rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#10253f] text-white text-xs">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">ID</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Strategic Asset</th>
                  <th className="px-4 py-3 font-semibold">Active Flagship Offering</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Economic Buyers</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap text-right">Scope & Anchor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dae3e9] text-sm">
                {coreFlagships.map((item) => {
                  const matched = findOpportunity(item.id);
                  return (
                    <tr
                      key={item.id}
                      onClick={() => matched && onSelectOpportunity(matched)}
                      className={`transition-colors ${
                        matched ? 'hover:bg-[#eef5f7]/70 cursor-pointer' : ''
                      }`}
                    >
                      <td className="px-4 py-3.5 font-mono text-xs font-semibold text-[#075d68] whitespace-nowrap">
                        {item.id}
                      </td>
                      <td className="px-4 py-3.5 text-xs font-medium text-[#40536b] whitespace-nowrap">
                        {item.strategicAsset}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-[#10253f]">{item.offering}</div>
                        <div className="text-xs text-[#52647a] mt-0.5">{item.triggerIp}</div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-[#40536b] whitespace-nowrap">
                        {item.buyers}
                      </td>
                      <td className="px-4 py-3.5 text-xs font-mono tabular-nums text-[#10253f] text-right whitespace-nowrap">
                        {item.scopeAnchor}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Execution Waves & Graduated Track B Repos */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#142a48]">
              02. Q1–Q4 2027 Priority Wave Sequence
            </h2>
            <p className="text-sm text-[#52647a] mt-0.5">
              Live portfolio funnel position from Portfolio-Status-Register.md (Tailored Hybrid SIDPA).
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('hypotheses')}
            className="text-xs font-medium text-[#0c8b82] hover:text-[#075d68] whitespace-nowrap shrink-0 cursor-pointer"
          >
            View Wave 1 hypotheses →
          </button>
        </div>

        <div className="bg-white border border-[#dae3e9] rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#f5f8fa] border-b border-[#dae3e9] text-xs text-[#40536b]">
                  <th className="px-4 py-2.5 font-semibold whitespace-nowrap">Wave</th>
                  <th className="px-4 py-2.5 font-semibold whitespace-nowrap">Window</th>
                  <th className="px-4 py-2.5 font-semibold whitespace-nowrap">Lead Opportunities</th>
                  <th className="px-4 py-2.5 font-semibold">Current Stage & Next Gate</th>
                  <th className="px-4 py-2.5 font-semibold whitespace-nowrap">Track</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dae3e9] text-[13.5px]">
                {waves.map((w, idx) => (
                  <tr key={`${w.wave}-${idx}`} className="hover:bg-[#f8fbfc]">
                    <td className="px-4 py-3 font-semibold text-[#10253f] whitespace-nowrap">
                      {w.wave}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#40536b] whitespace-nowrap">
                      {w.targetWindow}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs font-medium text-[#075d68] whitespace-nowrap">
                      {w.leadIds}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[#17243a]">{w.currentStage}</div>
                      <div className="text-xs text-[#52647a] mt-0.5">Next gate: {w.nextGate}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#40536b] whitespace-nowrap">
                      {w.track}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Two-column lower section: Graduated Track B & Baseline Feedback */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Graduated Track B Repos */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#142a48]">
            03. Graduated Standalone Track B Repositories
          </h2>
          <div className="bg-white border border-[#dae3e9] rounded-md divide-y divide-[#dae3e9]">
            {graduatedRepos.map((repo) => (
              <div key={repo.opportunityId} className="p-4 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-semibold text-[#075d68]">
                      {repo.opportunityId}
                    </span>
                    <span aria-hidden="true" className="text-[#52647a]">·</span>
                    <span className="font-medium text-[#10253f]">{repo.stage}</span>
                  </div>
                  <span className="text-xs font-mono text-[#52647a] tabular-nums">
                    As of {repo.asOf}
                  </span>
                </div>
                <p className="text-sm text-[#17243a] leading-relaxed">{repo.progress}</p>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-[#52647a]">
                  <span>{repo.commercialStatus}</span>
                  {repo.repoUrl && (
                    <a
                      href={repo.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#0c8b82] hover:text-[#075d68] font-medium whitespace-nowrap"
                    >
                      {repo.repoName}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Baseline Feedback Register */}
        <section className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-base font-bold text-[#142a48]">
              04. Design-Time Baseline Feedback ({summary.openFeedbackCount} Open)
            </h2>
            <button
              type="button"
              onClick={() => onOpenDocument('docs/registers/Portfolio-Status-Register.md')}
              className="text-xs font-medium text-[#0c8b82] hover:text-[#075d68] cursor-pointer"
            >
              Open register →
            </button>
          </div>
          <div className="bg-white border border-[#dae3e9] rounded-md divide-y divide-[#dae3e9]">
            {baselineFeedback.map((bfi) => {
              const isOpen = bfi.status.toLowerCase().includes('open');
              return (
                <div key={bfi.id} className="p-4 space-y-1">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono font-semibold text-[#10253f]">{bfi.id}</span>
                    <span
                      className={`font-medium ${
                        isOpen ? 'text-[#b45309]' : 'text-[#0c8b82]'
                      }`}
                    >
                      {bfi.status}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#40536b] leading-relaxed line-clamp-3">
                    {bfi.finding}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
