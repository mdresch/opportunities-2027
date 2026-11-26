# Tier 1 vs Tier 2 cut sheet — `OP-ITG-013`

**Source instrument:** [Agent-Governance-Assessment-Questionnaire.md](Agent-Governance-Assessment-Questionnaire.md) (40 questions · 8 pillars)

| Package | Duration | Hours | Price anchor | Primary outcome |
| --- | --- | --- | --- | --- |
| **Tier 1 — Agent Sprawl & Identity Triage** | 2–3 weeks | 15–30 | €2,500–€5,000 | P0 register + shadow snapshot + Tier 2 business case |
| **Tier 2 — Full 8-Pillar Assessment** | 6–10 weeks | 45–100+ | €6,000–€18,000+ | 40-point scorecard + inventory + 90-day roadmap |

---

## Tier 1 scope (what we actually do)

### Pillars in scope (deep)

| Pillar | Tier 1 depth | Questions used |
| --- | --- | --- |
| **1 — Inventory & Discovery** | Full | **1.1–1.5** |
| **2 — Owners & Accountability** | Full | **2.1–2.5** |
| **3 — Agent Identity (NHI)** | Full | **3.1–3.5** |
| **4 — Tool/API & SoD** | Full | **4.1–4.5** |

### Pillars in scope (screen only)

| Pillar | Tier 1 depth | Questions used |
| --- | --- | --- |
| **5 — Lifecycle** | Screen | **5.1**, **5.3** (promotion gate + TTL) |
| **6 — Observability** | Screen | **6.1**, **6.4** (logging exists? alerts?) |
| **7 — FinOps** | Screen | **7.1**, **7.2** (attribution + ceilings) |
| **8 — Regulatory** | Screen | **8.1**, **8.4** (DLP + Annex III mapping) |

**Total Tier 1 diagnostic touches:** **26 question areas** (20 full + 6 screen) + mandatory **Top-10 P0 Red-Flag Triage** (Section 4 of questionnaire).

### Tier 1 deliverables

1. **Shadow Agent Snapshot** (top platforms only: M365, Power, top 3 SaaS).  
2. **Top-10 P0 Risk Register** (severity, owner, remediation owner = client).  
3. **Lite 12-field inventory** (template Section 3 — partial population, min. 10 rows or “none found”).  
4. **Phase 2 business case** — recommend Tier 2 or MIP if P0 ≥ 3.

### Explicitly excluded in Tier 1

- Full 40-question scoring with weighted index  
- Mock audit reconstruction drill (6.5)  
- Full FinOps-to-GL reconciliation (7.5)  
- Split-clock retention architecture design (8.5)

---

## Tier 2 scope (full assessment)

- **All 40 questions** scored with evidence (no verbal-only).  
- **Weighted Agent Governance Index** (pillars 1, 3, 4, 6 at **1.25×**).  
- **Complete 12-field Enterprise Agent Inventory Register** (all prod + pilot agents).  
- **Entra Agent ID & SoD blueprint** (target state, not production config).  
- **Agent 365 / FinOps ceiling framework** (policy + metrics — client implements).  
- **90-day remediation roadmap** (prioritized by P0 → P1 → P2).  
- Optional executive readout using [Executive-Readout-Template.md](Executive-Readout-Template.md).

---

## Upgrade path

| Signal | Action |
| --- | --- |
| Tier 1 finds **≥3 P0** flags | Offer Tier 2 within 14 days; credit **€1,500** against Tier 2 if signed within 30 days *(optional commercial — set in proposal)* |
| Tier 1 finds **0–1 P0** | Offer quarterly **MIP Lite** or close with monitoring checklist |
| Tier 2 index **&lt; 2.5** | Bundle `OP-ITG-011` quick-start + `OP-RSK-004` readiness narrative |

---

## Portal self-assessment mapping

| Portal section | Maps to |
| --- | --- |
| P0 checklist (10) | Tier 1 mandatory output |
| Short pillar quiz (≈12 items) | Tier 1 screen + sample full questions |
| Full export | Sales handoff artifact for Tier 2 proposal |