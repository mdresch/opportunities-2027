---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-SUS-005"
execution_track: "Core & Specialty Backlog — Sustainability (Medium & Large)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Sustainability Data-as-a-Service.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-SUS-005`: Sustainability Data-as-a-Service (SDaaS)

> **Governance & SSOT Callout:** This Stage 3 Business Case is governed by [Tailored Hybrid SIDPA Governance](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) and linked to [inventory-of-ideas.md](../../inventory-of-ideas.md) and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Sibling artifacts: [Ideation-Spark.md](Ideation-Spark.md), [Source-Documents.md](Source-Documents.md), and `Ideation-Document.md`.

## 1. Executive Summary

| Dimension | Stage 3 Baseline |
| --- | --- |
| **Opportunity ID & Title** | `OP-SUS-005` — Sustainability Data-as-a-Service (SDaaS) *(Digital Product / Toolkit)* |
| **Target Buyer & Segment** | CFOs, Chief Sustainability Officers & ESG/CSRD Leads (Medium & Large tier) |
| **Delivery Horizon & Effort** | 8–10 weeks · High effort · Target Q3 2027 |
| **Working-Capital Model** | $0 initial working capital (client-hosted BI; €2,000–€7,500 indicative setup band) |
| **Compounding Path** | Recurring data/dashboard refresh subscription; pairs with `OP-SCM-002` & `OP-SUS-002` |
| **Gate Status** | `PENDING_DIRECTOR_SIGNOFF` — pivoted from SaaS platform to client-hosted BI service |

## 2. Business Need & Cost of Inaction

Mid-market and large enterprises face recurring 2027 ESG disclosure obligations (CSRD, GRI, TCFD, SDG reporting), yet rely on fragile manual spreadsheets to consolidate energy, workforce, and supplier metrics. Manual reporting drives high reconciliation labor, inconsistent audit trails, and elevated compliance-delay risk.

At the same time, many mid-market CFOs resist €30k–€120k+/year enterprise ESG SaaS subscriptions. *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals*: the source ADPA `.docx` frames a subscription-based compliance analytics service aligned to GRI/TCFD/SDGs; any financial ROI projections remain illustrative pre-pilot modeling pending Stage 2/3 client validation.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Capital / Effort | Strategic Fit & Risk | Recommendation |
| --- | --- | --- | --- | --- |
| **Option A: Status Quo (Do Nothing)** | Deliver only static ESG advisory reports without BI pipelines | €0 / None | Misses recurring data-ops retainer potential | **Reject** |
| **Option B: Client-Hosted ESG Pipeline & BI Kit + Light Subscription** | Deploy automated ETL/BI ESG dashboards in client's stack (8–10 wks) + refresh retainer | $0 upfront (€2,000–€7,500 setup band) | Honors $0 capital limit; leverages Data Analytics Strategy IP | **Recommended** |
| **Option C: Build Multi-Tenant Cloud SDaaS Platform** | Engineer, host, and maintain proprietary cloud ESG SaaS (literal ADPA draft) | High cloud/dev capex | Violates $0 working-capital mandate and creates software maintenance debt | **Reject** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

`OP-SUS-005` achieves subscription economics without software-hosting capex by deploying reusable pipelines inside the client's existing Power BI / M365 / analytics environment:

- **Phase 1 Setup Sprint (8–10 wks):** ESG indicator dictionary, standardized supplier/internal data-intake templates, automated ETL pipelines, and audit-lineage BI dashboard suite.
- **Phase 2 Recurring Data-Ops Subscription:** Quarterly/monthly schema updates, supplier-data normalization checks, and disclosure-pack refreshes, compounding cleanly alongside `OP-SCM-002` and `OP-SUS-002`.

## 5. Risk Register & Compensating Controls

| Risk ID | Risk Description | Likelihood / Impact | Compensating Control |
| --- | --- | --- | --- |
| **R-01** | Non-standardized supplier and subsidiary data breaks ingestion pipelines | High / High | Enforce standardized CSV/form intake schema and validation rules in Week 2 |
| **R-02** | High setup effort (8–10 wks) compresses margin if client BI stack is immature | Medium / High | Pre-qualify client BI readiness (Power BI / M365 baseline) before fixed-fee quote |
| **R-03** | Shifting CSRD/ESRS reporting details require rework | Medium / Medium | Modularize indicator mapping tables separate from core ingestion pipelines |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Required Evidence / Decision | Status |
| --- | --- | --- |
| **ESG Schema & BI Blueprint Standardization** | Finalize core GRI/TCFD/CSRD metric dictionary and Power BI template | **PENDING** |
| **Subscription Refresh SLA Definition** | Define quarterly data-ops scope boundaries and exclusions | **PENDING** |
| **Director Sign-Off (`OP-SUS-005`)** | Formal adjudication by Menno Drescher to authorize Q3 2027 pilot outreach | **PENDING_DIRECTOR_SIGNOFF** |
