import React, { useMemo, useState } from 'react';
import { FileText, Search, X } from 'lucide-react';
import type { Opportunity, PortfolioTier, ValidationLevel } from '../types';

interface InventoryViewProps {
  opportunities: Opportunity[];
  pillars: string[];
  onSelectOpportunity: (opp: Opportunity) => void;
}

const TIER_FILTERS: Array<{ value: 'ALL' | PortfolioTier; label: string }> = [
  { value: 'ALL', label: 'All Tiers' },
  { value: 'Tier A', label: 'Tier A (Core 5)' },
  { value: 'Tier B', label: 'Tier B' },
  { value: 'Tier C', label: 'Tier C' },
  { value: 'Tier D', label: 'Tier D' },
];

export const InventoryView: React.FC<InventoryViewProps> = ({
  opportunities,
  pillars,
  onSelectOpportunity,
}) => {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<'ALL' | PortfolioTier>('ALL');
  const [pillarFilter, setPillarFilter] = useState<string>('ALL');
  const [validationFilter, setValidationFilter] = useState<'ALL' | ValidationLevel>('ALL');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return opportunities.filter((opp) => {
      if (tierFilter !== 'ALL' && opp.tier !== tierFilter) return false;
      if (pillarFilter !== 'ALL' && opp.pillar !== pillarFilter) return false;
      if (validationFilter !== 'ALL' && opp.validationLevel !== validationFilter) return false;
      if (!q) return true;
      return (
        opp.id.toLowerCase().includes(q) ||
        opp.title.toLowerCase().includes(q) ||
        opp.description.toLowerCase().includes(q) ||
        opp.pillar.toLowerCase().includes(q) ||
        opp.signatureToolkit.toLowerCase().includes(q) ||
        opp.primarySkills.toLowerCase().includes(q) ||
        opp.targetQuarter.toLowerCase().includes(q)
      );
    });
  }, [opportunities, search, tierFilter, pillarFilter, validationFilter]);

  const hasActiveFilters =
    search.trim() !== '' ||
    tierFilter !== 'ALL' ||
    pillarFilter !== 'ALL' ||
    validationFilter !== 'ALL';

  const resetFilters = () => {
    setSearch('');
    setTierFilter('ALL');
    setPillarFilter('ALL');
    setValidationFilter('ALL');
  };

  const formatValidationText = (level: ValidationLevel) => {
    switch (level) {
      case 'strong':
        return { label: 'Strong', cls: 'text-[#075d68] font-semibold' };
      case 'validated':
        return { label: 'Validated', cls: 'text-[#0c8b82] font-medium' };
      case 'emerging':
        return { label: 'Emerging', cls: 'text-[#b45309] font-medium' };
      default:
        return { label: 'Pending', cls: 'text-[#52647a]' };
    }
  };

  return (
    <div className="space-y-5">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#10253f] tracking-tight">
            Opportunity Inventory
          </h1>
          <p className="text-sm text-[#52647a] mt-1">
            Live parsed view of <span className="font-mono text-xs">inventory-of-ideas.md</span>{' '}
            linked to each opportunity folder in <span className="font-mono text-xs">opportunities/</span>.
            Click any row to open its Ideation Spark and workspace documents.
          </p>
        </div>
        <div className="text-xs font-mono tabular-nums text-[#40536b] whitespace-nowrap shrink-0">
          Showing {filtered.length} of {opportunities.length} opportunities
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#dae3e9] rounded-md p-4 space-y-3">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#52647a] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID, offering, toolkit, skills, or quarter..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] placeholder:text-[#52647a] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#52647a] hover:text-[#10253f] cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Segmented Tier Filter */}
          <div className="flex items-center gap-1 p-1 bg-[#f5f8fa] border border-[#dae3e9] rounded-md overflow-x-auto">
            {TIER_FILTERS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTierFilter(t.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  tierFilter === t.value
                    ? 'bg-white text-[#10253f] shadow-xs'
                    : 'text-[#52647a] hover:text-[#10253f]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <label className="flex items-center gap-2 text-xs text-[#52647a]">
            <span>Pillar:</span>
            <select
              value={pillarFilter}
              onChange={(e) => setPillarFilter(e.target.value)}
              className="py-1.5 px-2.5 text-xs bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:border-[#0c8b82]"
            >
              <option value="ALL">All Pillars ({pillars.length})</option>
              {pillars.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-xs text-[#52647a]">
            <span>Validation:</span>
            <select
              value={validationFilter}
              onChange={(e) => setValidationFilter(e.target.value as 'ALL' | ValidationLevel)}
              className="py-1.5 px-2.5 text-xs bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:border-[#0c8b82]"
            >
              <option value="ALL">All Signals</option>
              <option value="strong">Strong Validation</option>
              <option value="validated">Validated</option>
              <option value="emerging">Emerging</option>
              <option value="unvalidated">Pending</option>
            </select>
          </label>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-medium text-[#0c8b82] hover:text-[#075d68] ml-auto cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-[#dae3e9] rounded-md overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-14 px-6 text-center">
            <p className="text-sm font-medium text-[#10253f]">No opportunities match these filters.</p>
            <p className="text-xs text-[#52647a] mt-1">
              Clear the search query or widen the tier and pillar selection.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#10253f] text-white text-xs">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">ID</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Tier</th>
                  <th className="px-4 py-3 font-semibold">Opportunity & Pillar</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Target Qtr</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Validation</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap text-right">
                    Expected Capital
                  </th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap text-right">Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dae3e9] text-[13.5px]">
                {filtered.map((opp) => {
                  const val = formatValidationText(opp.validationLevel);
                  return (
                    <tr
                      key={opp.id}
                      onClick={() => onSelectOpportunity(opp)}
                      className="hover:bg-[#eef5f7]/70 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-[#075d68] whitespace-nowrap align-top">
                        {opp.id}
                      </td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap align-top">
                        <span
                          className={
                            opp.tier === 'Tier A'
                              ? 'font-bold text-[#10253f]'
                              : opp.tier === 'Tier B'
                              ? 'font-semibold text-[#40536b]'
                              : 'text-[#52647a]'
                          }
                        >
                          {opp.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-top max-w-xl">
                        <div className="font-semibold text-[#10253f] leading-snug">
                          {opp.title}
                        </div>
                        <div className="text-xs text-[#52647a] mt-0.5 truncate">
                          {opp.pillar} · {opp.category} · {opp.size || 'All'}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-[#40536b] whitespace-nowrap align-top">
                        {opp.targetQuarter || '—'}
                      </td>
                      <td className={`px-4 py-3 text-xs whitespace-nowrap align-top ${val.cls}`}>
                        {val.label}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs tabular-nums text-[#10253f] text-right whitespace-nowrap align-top">
                        {opp.expectedCapital || '—'}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs tabular-nums text-[#52647a] text-right whitespace-nowrap align-top">
                        <span className="inline-flex items-center gap-1 justify-end">
                          <FileText className="w-3.5 h-3.5 text-[#0c8b82]" />
                          {opp.artifacts.length}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
