import type { Opportunity, PortfolioTier, ValidationLevel } from '../types';

export type InventorySortMode = 'priority' | 'urgency' | 'validation' | 'id';

export const TIER_PRIORITY: Record<PortfolioTier, number> = {
  'Tier A': 0,
  'Tier B': 1,
  'Tier C': 2,
  'Tier D': 3,
  Backlog: 4,
};

export const VALIDATION_PRIORITY: Record<ValidationLevel, number> = {
  strong: 0,
  validated: 1,
  emerging: 2,
  unvalidated: 3,
};

/**
 * Converts a targetQuarter label (e.g. "Q1 2027", "Q1–Q2 2027", "Q3 2027+")
 * into a sortable ascending rank where earlier/more urgent windows sort first.
 */
export function getUrgencyRank(targetQuarter: string): number {
  const raw = (targetQuarter ?? '').trim();
  if (!raw || raw === '—' || /^tbd$/i.test(raw)) {
    return Number.MAX_SAFE_INTEGER;
  }

  const qtrMatch = raw.match(/\bQ([1-4])(?:\s*[–-]\s*Q([1-4]))?\s*(20\d{2})(\+)?/i);
  if (qtrMatch) {
    const startQuarter = Number(qtrMatch[1]);
    const isRange = Boolean(qtrMatch[2]);
    const year = Number(qtrMatch[3]);
    const hasPlus = Boolean(qtrMatch[4]);
    return year * 100 + startQuarter * 10 + (isRange ? 2 : 0) + (hasPlus ? 5 : 0);
  }

  const yearOnly = raw.match(/\b(20\d{2})\b/);
  if (yearOnly) {
    return Number(yearOnly[1]) * 100 + 50;
  }

  return Number.MAX_SAFE_INTEGER;
}

/**
 * Default priority comparator: Tier (A → B → C → D → Backlog), then earliest
 * target quarter (urgency), then strongest market validation, then ID.
 */
export function compareOpportunitiesByPriority(a: Opportunity, b: Opportunity): number {
  const tierDiff = (TIER_PRIORITY[a.tier] ?? 99) - (TIER_PRIORITY[b.tier] ?? 99);
  if (tierDiff !== 0) return tierDiff;

  const urgencyDiff = getUrgencyRank(a.targetQuarter) - getUrgencyRank(b.targetQuarter);
  if (urgencyDiff !== 0) return urgencyDiff;

  const valDiff =
    (VALIDATION_PRIORITY[a.validationLevel] ?? 99) -
    (VALIDATION_PRIORITY[b.validationLevel] ?? 99);
  if (valDiff !== 0) return valDiff;

  return a.id.localeCompare(b.id);
}

/** Returns a new sorted copy of opportunities for the selected sort mode. */
export function sortOpportunities(
  list: Opportunity[],
  mode: InventorySortMode = 'priority',
): Opportunity[] {
  return [...list].sort((a, b) => {
    switch (mode) {
      case 'urgency': {
        const urgencyDiff = getUrgencyRank(a.targetQuarter) - getUrgencyRank(b.targetQuarter);
        if (urgencyDiff !== 0) return urgencyDiff;
        return compareOpportunitiesByPriority(a, b);
      }
      case 'validation': {
        const valDiff =
          (VALIDATION_PRIORITY[a.validationLevel] ?? 99) -
          (VALIDATION_PRIORITY[b.validationLevel] ?? 99);
        if (valDiff !== 0) return valDiff;
        return compareOpportunitiesByPriority(a, b);
      }
      case 'id':
        return a.id.localeCompare(b.id);
      case 'priority':
      default:
        return compareOpportunitiesByPriority(a, b);
    }
  });
}
