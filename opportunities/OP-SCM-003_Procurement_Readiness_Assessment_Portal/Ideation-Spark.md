# Ideation Spark — `OP-SCM-003`: Procurement Readiness & Pre-Sales Assessment Portal (PRMAP)

**Status:** 🔥 Spark — workspace opened · Tier 2 product spec in progress  
**Tier:** B — Growth *(commercial platform; multi-offering funnel)*  
**Strategic Asset:** 4. Evidence & Governance · 2. Organizational Intelligence *(assessment reuse)*  
**Functional Area:** 11. Supply Chain · **Signature Toolkit:** Supply Chain Strategy *(procurement / vendor governance)*  
**Category:** Platform-Backed Assessment · **Size:** Medium & Large  
**Source:** [inventory-of-ideas.md §11 Supply Chain](../../inventory-of-ideas.md) · pattern from [`OP-ITG-013`](../OP-ITG-013_Enterprise_AI_Agent_Governance/Ideation-Spark.md) delegation portal · buyer mechanics [Enterprise-IT-Budget-Governance-Multinational.md](../../docs/research/Enterprise-IT-Budget-Governance-Multinational.md)

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
6. **Boundaries & Risk** — Not a full CLM or e-procurement system; no legal advice; client data stays in tenant-isolated store; CBa AM actions are **reassignment and nudges**, not answering on behalf of client. **Rules of engagement:** no billable work **inside** a client without [multiparty approved engagement](../../docs/governance/Rules-of-Engagement.md) (PO + invoice basis: [Commercial-Engagement-Invoicing-and-Procurement-Policy.md](../../docs/research/Commercial-Engagement-Invoicing-and-Procurement-Policy.md)).
7. **Compounding / Scale Path** — Every new `OP-*` with a scored diagnostic adds a **SKU row** + JSON template; feeds `OP-OPS-003`, `OP-CX-002`, Tier A assessments.

## Effort, Capital & Timeline

| Phase | Effort | Expected Capital | Target Qtr |
| --- | --- | --- | --- |
| MVP portal (3 SKUs) | High | Platform IP; services €2,000–€15,000+ via catalog | Q2–Q3 2027 |
| Catalog expansion | Medium | Incremental per `OP-*` | Q3–Q4 2027 |

## Market Validation

🟡 Procurement wants **evidence packs**, not slide decks — validate with 5 CPO/category-manager interviews in Q1 2027. Pairs with `OP-SCM-001` / `OP-LEG-002` vendor diligence narrative.

## Related Opportunities

`OP-SCM-001`, `OP-CX-002` (COAS pattern), `OP-OPS-003`, `OP-ITG-013`, `OP-ITG-018` (MIP), `OP-X-004` (case studies)

## Architecture pointers

| Doc | Purpose |
| --- | --- |
| [Approval-Path-and-Cycle-Fields.md](Approval-Path-and-Cycle-Fields.md) | Layers touched, vendor status, forum date; §12 cycle bands |
| [Commercial-Engagement-Invoicing-and-Procurement-Policy.md](../../docs/research/Commercial-Engagement-Invoicing-and-Procurement-Policy.md) | PO + invoice; no card checkout |
| [Procurement-Portal-Build-Requirements.md](Procurement-Portal-Build-Requirements.md) | Requirements assessment to build the portal |
| [Portal-Product-Requirements.md](Portal-Product-Requirements.md) | Roles, journeys, CBa AM console |
| [Service-Catalog-Questionnaire-Map.md](Service-Catalog-Questionnaire-Map.md) | SKU → questionnaire source |
| [data/portal-rbac-and-workflows.json](data/portal-rbac-and-workflows.json) | Machine-readable RBAC + states |
| [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md) | When to create **`mdresch/cba-procurement-readiness-portal`** |
| [Procurement-Pilot-Example-OP-ITG-013.md](Procurement-Pilot-Example-OP-ITG-013.md) | **Interim:** procure `OP-ITG-013` using onboarding portal lessons |

## Repo strategy

| Phase | Repository |
| --- | --- |
| **Now (OP `OP-SCM-003`)** | Spec only in `oppurtunities-2027`; pilot SKU via [`agent-governance-onboarding`](https://github.com/mdresch/agent-governance-onboarding) |
| **After OP → PR approval** | Create and build [`mdresch/cba-procurement-readiness-portal`](https://github.com/mdresch/cba-procurement-readiness-portal) — **do not scaffold until [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md) criteria met** |

## Next Steps (Tier 2 → Pilot Gate)

- [x] Document interim procurement pilot for **`OP-ITG-013`** ([Procurement-Pilot-Example-OP-ITG-013.md](Procurement-Pilot-Example-OP-ITG-013.md)).
- [ ] Lock MVP SKU list (3 offerings) and executive/delegate role model.
- [ ] Run 1 procurement-led workspace using interim portal + manual AM tracking.
- [ ] Add `HYP-2027-016` evidence when interviews / design partner complete.
- [ ] Director sign-off on [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md) → then create `cba-procurement-readiness-portal` repo.

## Assigned Source Documents (ADPA)

*(None auto-assigned yet — refresh after `python scripts/assign_adpa_source_documents.py` if procurement ADPA folders are mapped.)*