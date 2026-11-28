---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-SCM-003"
execution_track: "Tier B — Growth (Pillar 11: Supply Chain Commercial Platform)"
linked_hypotheses: "HYP-2027-016 (Formulated)"
primary_source: "Portal-Product-Requirements.md & Procurement-Portal-Build-Requirements.md"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-SCM-003`: Procurement Readiness & Pre-Sales Assessment Portal (PRMAP)

> **Governance & SSOT Callout:** This Stage 1b ideation document operates under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) and connects [inventory-of-ideas.md](../../inventory-of-ideas.md) and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) with the workspace product specifications in [Portal-Product-Requirements.md](Portal-Product-Requirements.md) and [Procurement-Portal-Build-Requirements.md](Procurement-Portal-Build-Requirements.md).

## 1. Problem Context & 2027 Market Trigger

Enterprise procurement teams and business sponsors face longer approval cycles when purchasing external advisory, diagnostic, or governance engagements. Before releasing a purchase order (PO) or issuing an RFP, procurement category managers and executive sponsors increasingly require documented proof of internal organizational readiness and current-state maturity across EU AI Act, DORA, and vendor diligence dimensions.

- **2027 Market Trigger:** Tightened multinational IT and advisory budget governance requires structured pre-PO readiness evidence without forcing clients to purchase heavy new GRC platforms.
- **Core Buyer Pain:** Pre-sales maturity gathering currently relies on static spreadsheets and fragmented email threads, stalling PO approval when specialists fail to complete sections on time.
- **Target Buyer Profile:** CPOs, Heads of Procurement, category managers, and business unit sponsors at Medium & Large enterprises buying CBa Consult catalog offerings.

## 2. Solution Architecture & Delivery Workflow

`OP-SCM-003` (PRMAP) is a multi-tenant, procurement-facing web portal built over a 12–16 week MVP horizon (High effort, Platform IP) that serves as a horizontal commercial funnel for CBa Consult's catalog SKUs (`€2,000–€15,000+` attached services per SKU).

1. **Catalog SKU Selection & Questionnaire Load:** Procurement or the Client Sponsor selects a target CBa catalog offering (e.g., `OP-ITG-013`, `OP-FIN-009`, `OP-RSK-004`), automatically loading the mapped maturity questionnaire per [Service-Catalog-Questionnaire-Map.md](Service-Catalog-Questionnaire-Map.md).
2. **Dual-Sponsor Delegation:** Client Sponsor and Executive Sponsor delegate specific sections to internal specialists, following the proven delegation pattern from [Procurement-Pilot-Example-OP-ITG-013.md](Procurement-Pilot-Example-OP-ITG-013.md) and [Approval-Path-and-Cycle-Fields.md](Approval-Path-and-Cycle-Fields.md).
3. **CBa Account Manager Orchestration:** The assigned CBa Account Manager monitors live completion progress, unblocks stalled contributors, and redistributes questions to preserve cycle velocity.
4. **Export & Graduation Gate:** Generates an exportable readiness pack for internal PO/RFP justification and a pre-scoped CBa proposal governed by [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md).

## 3. Market Comparables & CBa Consult Differentiation

| Comparable Category | Typical Market Offering | Common Buyer Gap | CBa Consult Differentiation (`OP-SCM-003`) |
| --- | --- | --- | --- |
| Enterprise CLM / e-Procurement Suites | Ariba/Coupa intake & PO routing | Manage commercial contracting, not pre-PO domain maturity or advisory readiness | Purpose-built pre-sales maturity portal tailored to CBa catalog SKUs |
| GRC & Vendor Risk Platforms | Heavy multi-module compliance suites | Require six-figure licenses and lengthy IT onboarding before one assessment | Zero new GRC software on the client side; instant SKU-linked onboarding |
| Static PDF / Excel Questionnaires | Emailed Word/Excel intake forms | Zero delegation tracking, version chaos, high abandonment before PO release | Live dual-sponsor delegation and Account Manager redistribution controls |
| Generic Survey Tools | Typeform / Microsoft Forms | No SKU-to-maturity mapping, no enterprise sponsor hierarchy, no PO pack export | Structured approval path, cycle fields, and RFP/PO export pack |

## 4. Internal IP & Source Provenance Crosswalk

| Artifact / IP Asset | Location / Reference | Role in `OP-SCM-003` Delivery | Verification Status |
| --- | --- | --- | --- |
| Product & Build Specs | [Portal-Product-Requirements.md](Portal-Product-Requirements.md) & [Procurement-Portal-Build-Requirements.md](Procurement-Portal-Build-Requirements.md) | Defines multi-tenant portal architecture, RBAC, and MVP build scope | Active sibling specs |
| Workflow & Catalog Maps | [Service-Catalog-Questionnaire-Map.md](Service-Catalog-Questionnaire-Map.md) & [Approval-Path-and-Cycle-Fields.md](Approval-Path-and-Cycle-Fields.md) | Maps catalog SKUs to questionnaires and tracks sponsor approval cycle fields | Active sibling specs |
| Pilot & Graduation Gates | [Procurement-Pilot-Example-OP-ITG-013.md](Procurement-Pilot-Example-OP-ITG-013.md) & [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md) | Reuses `OP-ITG-013` delegation pattern and defines OP-to-PR graduation criteria | Active sibling specs |
| Spark & Source Registry | [Ideation-Spark.md](Ideation-Spark.md) & [Source-Documents.md](Source-Documents.md) | Establishes Tier B Growth status and linked hypothesis `HYP-2027-016` | Formulated (`HYP-2027-016`) |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

To keep MVP scope achievable within 12–16 weeks without duplicating enterprise ERP systems, `OP-SCM-003` enforces strict boundaries:

- **Not a CLM or e-Procurement System:** PRMAP does not handle contract redlining, invoice matching, supplier payment processing, or ERP PO issuance.
- **Phase 2 Enterprise SSO & Custom Data Residency:** MVP ships with secure tenant isolation; custom SAML/OIDC enterprise SSO federation and regional pinning sit in Phase 2.
- **No Uncoupled SaaS Standalone Sales Initially:** Portal operates primarily as a commercial readiness funnel attached to CBa Consult advisory SKUs rather than an unassisted self-serve SaaS product.
- **Stage 1b Gate Readiness:** Extensive sibling specs and `HYP-2027-016` are already formulated. Pending Director adjudication on the Business Case to authorize build prioritization.
