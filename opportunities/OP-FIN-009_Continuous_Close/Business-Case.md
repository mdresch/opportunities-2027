---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-FIN-009"
execution_track: "Track A — Lightweight Advisory"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "HYP-2027-002, HYP-2027-007, HYP-2027-008, HYP-2027-009"
primary_source: "2007-2008 RGP Baseline P&L/BS & Payroll Closure IP; inventory-of-ideas.md"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-FIN-009`: Continuous Close & Real-Time Reconciliation Bridge

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), tracked in [inventory-of-ideas.md](../../inventory-of-ideas.md), and aligned with [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) (Strategic Asset 1: Financial Truth). Status remains `Idea` pending [Pilot-Charter.md](Pilot-Charter.md) Director sign-off.

## 1. Executive Summary

| Dimension | Assessment |
| :--- | :--- |
| **Opportunity ID & Title** | `OP-FIN-009` — Continuous Close & Real-Time Reconciliation Bridge |
| **Tier & Target Window** | Tier A Flagship (GTM Priority #2) · Q1–Q2 2027 |
| **Target Buyer** | CFOs and Corporate Controllers (Small & Mid market) |
| **Delivery Horizon & Effort** | 6–8 weeks (`6–10 hrs/wk`) · Medium effort |
| **Commercial Band & Working Capital** | €1,500–€5,000 pilot band (expandable to enterprise diagnostic) · **€0 upfront working capital** |
| **Gate Status** | **`PENDING_DIRECTOR_SIGNOFF`** — internal IP (`HYP-2027-007`) & pilot client (`HYP-2027-002`) in active validation |

## 2. Business Need & Cost of Inaction

Mid-market finance teams lose decision agility every month between the **23rd payroll lock** and **post-3rd close publication**. Without deterministic pre-close accrual and cut-off rules, controllers face recurring late adjustments, manual reconciliation bottlenecks (~80% of close effort spent checking clean accounts), and provisional-vs.-official BI reporting divergence—just as **IFRS 18 (Jan 2027)** increases scrutiny on P&L categorization and audit trail integrity.

- **Cost of Inaction:** Persistent 7–12+ day close cycles, delayed margin visibility for executive decisions, higher year-end audit rework fees, and wasted senior controller hours.
- **Target Pre-Pilot Outcome (Hypothesized — Not Yet Realized Client Actuals):** Compress post-3rd close cycle to ≤2–3 business days with zero new software licensing cost, establishing referenceable Case Study #1 proof (`OP-X-004`).

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Benefit / Cost Profile | Risk & Feasibility | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Option 0: Status Quo (Manual Close)** | Retain post-3rd batch reconciliations & manual JEs | €0 fee; high recurring controller rework | High IFRS 18 & margin-blindness risk | Reject |
| **Option 1: Enterprise Close SaaS (BlackLine / FCCS)** | Procure & implement €50k–€150k+/yr close suite | High automation ceiling; unaffordable CapEx/OpEx | Poor fit for <10% modernization budgets | Reject for Mid-Market |
| **Option 2: CBa 6–8 Wk Continuous Close Bridge** | Deploy RGP 23rd-to-3rd rules + 10 guardrails on existing ERP/Excel | ≤2–3 day target close; €1.5k–€5k pilot; €0 SaaS spend | High feasibility; solo-deliverable | **Recommended** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Packaging:** Fixed-scope 6–8 week engagement backed by [Client_Proposal_and_SOW_Continuous_Close_Bridge.md](Client_Proposal_and_SOW_Continuous_Close_Bridge.md), [CFO-Controller-Outreach-and-Discovery-Script.md](CFO-Controller-Outreach-and-Discovery-Script.md), and [Continuous_Close_Monthly_Gantt_Chart.md](Continuous_Close_Monthly_Gantt_Chart.md).
- **Deliverable Anchor:** 25-control diagnostic baseline, 10 deterministic `FIN-CC` accrual/cut-off guardrails, IFRS 18 close-mapping notes, and one verified live close run.
- **$0 Working-Capital Model:** Delivered entirely on CBa Consult sweat-equity (`6–10 hrs/wk`) using the client's existing ERP, HRIS, and spreadsheet/BI stack—no software reselling, no contractor payroll float.
- **Compounding Path:** Absorbs `OP-FIN-001` (close checklist), `OP-FIN-002` (multi-unit close audit), and `OP-FIN-008` (payroll/client funds), then compounds directly into `OP-FIN-010` (Rate Engine for P&L margin truth) and `OP-STR-004` / `OP-STR-005` (M&A/PMI financial harmonization).

## 5. Risk Register & Compensating Controls

| Risk | Likelihood / Impact | Compensating Control |
| :--- | :--- | :--- |
| **Unclean Payroll-to-GL Cut-Off Rules** | Medium / High | Lock `FIN-CC-01`–`10` guardrails and 24th–25th HRIS-GL sync sign-off in Weeks 3–4 |
| **Scope Creep into ERP Re-Implementation** | Medium / High | Enforce non-SaaS, non-ERP-replacement boundary in [Delivery-Playbook-and-SOW.md](Delivery-Playbook-and-SOW.md) |
| **IFRS 18 Interpretation Ambiguity** | Medium / Medium | Validate [IFRS-18-Close-Relevance-Notes.md](IFRS-18-Close-Relevance-Notes.md) against primary standard; defer audit opinion to client auditor |
| **Delayed Pilot Client Conversion** | Medium / High | Run structured CFO outreach via [BD-Quick-Reference.md](BD-Quick-Reference.md) and log in [Wave-1-Discovery-Evidence-Log.md](Wave-1-Discovery-Evidence-Log.md) |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Current Status | Evidence / Next Action |
| :--- | :--- | :--- |
| **Approval Status** | **`PENDING_DIRECTOR_SIGNOFF`** | Formalize sign-off in [Pilot-Charter.md](Pilot-Charter.md) |
| **Internal IP Sprint (`HYP-2027-007`)** | Testing (Active) | Complete [RGP-23rd-to-3rd-Playbook-Internal.md](RGP-23rd-to-3rd-Playbook-Internal.md) (≤15 hrs) |
| **Pilot Client Discovery (`HYP-2027-002`)** | Testing (Active) | Secure 1 named mid-market pilot CFO/Controller in [Wave-1-Discovery-Evidence-Log.md](Wave-1-Discovery-Evidence-Log.md) |
| **IFRS 18 Primary Standard Check** | Pending | Complete read-through in [IFRS-18-Close-Relevance-Notes.md](IFRS-18-Close-Relevance-Notes.md) |
| **Adjudication Owner** | Menno Drescher (Director, CBa Consult) | Target Pilot #1 launch Q1–Q2 2027 |
