# Ideation Document — `OP-SCM-003`

**Generated:** 2026-11-26 (from ADPA Projects Lists source assignment script)
**Stage:** Tier 2 — Ideation / Benefit framing (see [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md))

> Canonical paths remain on OneDrive; this markdown is an extracted working copy.
## Portfolio-derived ideation (no dedicated .docx assigned)

**Inventory description:** Procurement-facing web portal: select CBa catalog SKU → auto-load maturity questionnaire → **Client Sponsor** + **Executive Sponsor** delegate to staff → **CBa Account Manager** tracks progress and redistributes questions → export for PO / RFP pack.

### From Ideation-Spark.md

# Ideation Spark — `OP-SCM-003`: Procurement Readiness & Pre-Sales Assessment Portal (PRMAP)

**Status:** 🔥 Spark — workspace opened · Tier 2 product spec in progress  
**Tier:** B — Growth *(commercial platform; multi-offering funnel)*  
**Strategic Asset:** 4. Evidence & Governance · 2. Organizational Intelligence *(assessment reuse)*  
**Functional Area:** 11. Supply Chain · **Signature Toolkit:** Supply Chain Strategy *(procurement / vendor governance)*  
**Category:** Platform-Backed Assessment · **Size:** Medium & Large  
**Source:** [inventory-of-ideas.md §11 Supply Chain](../../inventory-of-ideas.md) · pattern from [`OP-ITG-013`](../OP-ITG-013_Enterprise_AI_Agent_Governance/Ideation-Spark.md) delegation portal

## Positioning

> For **CPOs, procurement category managers, and business sponsors** who must **prove organizational readiness** before buying CBa Consult advisory, diagnostics, or governance offerings, **PRMAP** is a **procurement-facing web portal** that **selects the right maturity questionnaire per catalog SKU**, lets **executives delegate evidence gathering** to specialists, and gives the assigned **CBa Account Manager** a live view to **redistribute work and unblock assessments** — with **$0 new GRC software** on the client side.

## What it is

A multi-tenant **buyer readiness portal**: procurement initiates an assessment for a specific service/product; the platform loads the matching question set from the 2027 opportunity catalog; **Client Sponsor** + **Executive Sponsor** orchestrate completion; **CBa Account Manager** monitors and reassigns. Output: exportable readiness pack for internal approval + scoped CBa proposal.

## 7 Pivotal Questions

1. **Buyer & 2027 Trigger** — CPO / Head of Procurement, category managers, and BU sponsors buying advisory (not only IT). Trigger: longer procurement cycles, EU AI Act / DORA vendor diligence, and need to **document current-state maturity** before PO release.
2. **The Wedge (Pain)** — Procurement receives generic vendor PDFs; internal SMEs answer the same questions by email; no single dashboard; CBa cannot see progress until kickoff.
3. **Deliverable & Existing IP** — Portal platform + **catalog-driven questionnaires** mapped to `OP-*` offerings; reuse delegation model from [`OP-ITG-013`](../OP-ITG-013_Enterprise_AI_Agent_Governance/Assessment-Delegation-and-Ownership-Matrix.md) and [`data/agent-governance-question-ownership.json`](../OP-ITG-013_Enterprise_AI_Agent_Governance/data/agent-governance-question-ownership.json) as reference pattern (not duplicate content).
4. **Sweat-Equity Feasibility** — MVP: 1 catalog, 3 SKUs (e.g. `OP-ITG-013`, `OP-FIN-009`, `OP-RSK-004`), RBAC for 5 roles, hosted static/web app + lightweight API; **12–16 wks** build at **$0** infra tier (Azure Static Web Apps / Cloudflare) before enterprise SSO.
5. **Outcome & Proof** — Time from RFP / intake to **≥80% assessment complete** drops; ≥1 paid engagement per portal workspace with export attached to PO pack.
6. **Boundaries & Risk** — Not a full CLM or e-procurement system; no legal advice; client data stays in tenant-isolated store; CBa AM actions are **reassignment and nudges**, not answering on behalf of client.
7. **Compounding / Scale Path** — Every new `OP-*` with a scored diagnostic adds a **SKU row** + JSON template; feeds `OP-OPS-003`, `OP-CX-002`, Tier A assessments.

## Effort, Capital & Timeline

| Phase | Effort | Expected Capital | Target Qtr |
| --- | --- | --- | --- |
| MVP portal (3 SKUs) | High | Platform IP; services €2,000–€15,000+ via catalog | Q2–Q3 2027 |
| Catalog expansion | Medium | Incremental per `OP-*` | Q3–Q4 2027 |

## Market Validation

🟡 Procurement wants **evidence packs**, not slide decks — validate with 5 CPO/category-manager interviews in Q1 2027. Pairs with `OP-SCM-001` / `OP-LEG-002` vendor diligence narrative.

## Related Opportunities

`OP-SCM-001`, `OP-CX-002` (COAS pattern), `OP-OPS-003`, `OP-ITG-013`, `OP-ITG-018` (MIP), `OP-X-004` (case stud
