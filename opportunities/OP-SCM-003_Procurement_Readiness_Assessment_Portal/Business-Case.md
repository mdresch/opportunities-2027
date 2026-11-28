---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-SCM-003"
execution_track: "Tier B — Growth (Pillar 11: Supply Chain Commercial Platform)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "HYP-2027-016 (Formulated)"
primary_source: "Portal-Product-Requirements.md & Procurement-Portal-Build-Requirements.md"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-SCM-003`: Procurement Readiness & Pre-Sales Assessment Portal (PRMAP)

> **Governance & SSOT Callout:** This Stage 3 Business Case operates under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) and aligns with [inventory-of-ideas.md](../../inventory-of-ideas.md) and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Detailed specifications reside in [Portal-Product-Requirements.md](Portal-Product-Requirements.md), [Procurement-Portal-Build-Requirements.md](Procurement-Portal-Build-Requirements.md), [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md), and [Ideation-Spark.md](Ideation-Spark.md).

## 1. Executive Summary

| Dimension | Specification |
| --- | --- |
| **Opportunity ID & Title** | `OP-SCM-003` — Procurement Readiness & Pre-Sales Assessment Portal (PRMAP) |
| **Target Buyer & Segment** | CPOs, Procurement Category Managers & Business Sponsors (Medium & Large) |
| **Commercial Category** | Tier B Growth — Platform-Backed Assessment (Supply Chain Strategy) |
| **Delivery Horizon & Effort** | 12–16 weeks (MVP build) + ongoing catalog · High effort · Q2–Q3 2027 |
| **Working Capital & Commercial Pull** | Platform IP ($0 client GRC purchase); attached services €2,000–€15,000+ per SKU |
| **Gate Status** | `PENDING_DIRECTOR_SIGNOFF` (Stage 3 Commercial Viability / `HYP-2027-016`) |

## 2. Business Need & Cost of Inaction

Multinational procurement cycles for external advisory and governance services have lengthened sharply due to EU AI Act, DORA, and internal budget-governance controls. Buyers must document internal current-state maturity before releasing POs or RFPs, yet manual Word/Excel questionnaires stall across distributed specialists without sponsor visibility or CBa Account Manager orchestration.

- **Cost of Inaction:** Extended pre-sales friction across CBa Consult's entire Tier A/B catalog (`OP-ITG-013`, `OP-FIN-009`, `OP-RSK-004`), lost deals due to incomplete internal business-case packs, and unscalable manual pre-sales triage.
- **Quantitative Evidence Baseline:** *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals:* No standalone ADPA `.docx` is assigned (per [Source-Documents.md](Source-Documents.md)); `HYP-2027-016` is formulated and pilot validation is anchored on [Procurement-Pilot-Example-OP-ITG-013.md](Procurement-Pilot-Example-OP-ITG-013.md) rather than realized portal production metrics.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Expected Benefit | Feasibility & Risk | Verdict |
| --- | --- | --- | --- | --- |
| **Option A — Do Nothing** | Continue emailed PDF/Excel pre-sales maturity questionnaires | Zero build effort | Preserves procurement cycle drag and fragmented sponsor handoffs | Reject |
| **Option B — License Enterprise Third-Party GRC Portal** | Require clients or CBa to buy external GRC assessment software | Out-of-the-box tooling | Breaks "$0 new client GRC software" wedge and creates vendor lock-in | Reject |
| **Option C — Phased PRMAP MVP Funnel** | Build 12–16 wk multi-tenant portal mapped to CBa SKUs, deferring SSO to Phase 2 | Horizontal funnel for €2k–€15k+ SKUs; reuses `OP-ITG-013` pattern | High 12–16 wk build effort; requires strict MVP scope freeze | **Recommended** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

PRMAP monetizes as a **horizontal commercial funnel** rather than a standalone client software license: procurement teams adopt the portal with $0 new GRC software spend, accelerating conversion into CBa Consult's €2,000–€15,000+ attached diagnostic and advisory SKUs. Internal MVP development uses founder/internal build sweat equity per [Procurement-Portal-Build-Requirements.md](Procurement-Portal-Build-Requirements.md).

- **Packaging Structure:** SKU-selected readiness workspace ([Service-Catalog-Questionnaire-Map.md](Service-Catalog-Questionnaire-Map.md)), dual-sponsor delegation ([Approval-Path-and-Cycle-Fields.md](Approval-Path-and-Cycle-Fields.md)), Account Manager redistribution, and exportable PO/RFP pack governed by [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md).
- **Compounding Path:** Every completed assessment enriches Strategic Asset 2 (Organizational Intelligence) and Strategic Asset 4 (Evidence & Governance), scaling conversion across all Tier A/B `OP-*` offerings.

## 5. Risk Register & Compensating Controls

| Risk ID | Risk Description | Likelihood / Impact | Compensating Control |
| --- | --- | --- | --- |
| **R-01** | Scope creep into CLM, e-procurement, or ERP PO-routing features | Medium / High | Freeze MVP strictly to readiness assessment, delegation, and PO-pack export |
| **R-02** | Enterprise security objections before Phase 2 SSO & regional residency | High / Medium | Document Phase 1 tenant isolation controls and target initial pilots via low-PII metadata |
| **R-03** | 12–16 week build competes with revenue-generating Tier A audits | High / High | Gate MVP build behind `HYP-2027-016` validation and `OP-ITG-013` pilot proof |
| **R-04** | Catalog questionnaire drift across evolving `OP-*` offerings | Medium / Medium | Govern SKU mappings via single canonical [Service-Catalog-Questionnaire-Map.md](Service-Catalog-Questionnaire-Map.md) |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Current Readiness | Adjudication Status |
| --- | --- | --- |
| **Product, Build & Graduation Specs** | Sibling product, build, cycle-field, and graduation specs complete | Complete |
| **Stage 2 Hypothesis Status** | `HYP-2027-016` formulated; requires pilot test validation with `OP-ITG-013` | In Progress |
| **MVP Scope & Phase 2 Deferral Check** | CLM excluded; Enterprise SSO & residency cleanly deferred to Phase 2 | Verified |
| **Director Sign-Off Decision** | Awaiting Director adjudication to authorize MVP build commitment | `PENDING_DIRECTOR_SIGNOFF` |
