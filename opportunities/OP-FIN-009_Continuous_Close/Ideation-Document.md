---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-FIN-009"
execution_track: "Track A — Lightweight Advisory"
linked_hypotheses: "HYP-2027-002, HYP-2027-007, HYP-2027-008, HYP-2027-009"
primary_source: "2007-2008 RGP Baseline P&L/BS & Payroll Closure IP; inventory-of-ideas.md"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-FIN-009`: Continuous Close & Real-Time Reconciliation Bridge

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), tracked in [inventory-of-ideas.md](../../inventory-of-ideas.md), and prioritized in [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) as **Tier A Flagship (GTM Priority #2, Q1–Q2 2027)**.

## 1. Problem Context & 2027 Market Trigger

Mid-market CFOs and Corporate Controllers operate with an operational blind spot between the **23rd payroll lock** (when real-time payroll data becomes available) and the **monthly financial close after the 3rd** of the following month. During this 23rd-to-3rd window, mobility/fuel/lease invoices, Concur expenses, WIP/subcontractor accruals, and GL clearing reconciliations accumulate until month-end, causing accountants to spend roughly 80% of close week checking zero-variance accounts while provisional flash dashboards diverge from official GL figures.

- **Target Buyer:** CFOs and Corporate Controllers at small and mid-market enterprises (especially multi-unit, project, or recurring-billing firms).
- **2027 Regulatory & Market Trigger:** **IFRS 18** (effective January 1, 2027) tightens P&L presentation, subtotal consistency, and disclosure discipline right as Gartner FCCS and BlackLine Agentic Financial Operations elevate continuous close to a board-level priority—yet 1 in 3 mid-market finance teams allocate under 10% of budget to modernization and cannot justify €50k–€150k+/year enterprise close software.
- **Proprietary Edge (`🟢🟢`):** Anchored in Menno Drescher's 2007–2008 RGP (Resources Global Professionals) baseline P&L & Balance Sheet specification and payroll-closure methodology, rather than generic survey theory.

## 2. Solution Architecture & Delivery Workflow

Built as a 6–8 week fixed-scope sprint (`6–10 hrs/wk`, zero new software licenses), documented in [Delivery-Playbook-and-SOW.md](Delivery-Playbook-and-SOW.md), [Continuous_Close_Enhanced_Activity_Guide.md](Continuous_Close_Enhanced_Activity_Guide.md), and [Continuous_Close_Monthly_Gantt_Chart.md](Continuous_Close_Monthly_Gantt_Chart.md):

1. **Weeks 1–2 — Baseline & 23rd-to-3rd Bottleneck Map:**
   - Execute the 25-control [Continuous-Close-Diagnostic-Questionnaire.md](Continuous-Close-Diagnostic-Questionnaire.md).
   - Map the critical path from 23rd payroll lock to post-3rd publication and inventory manual JEs and open clearing items.
2. **Weeks 3–4 — Accrual, `4-4-5` & CoS Matching Rules:**
   - Configure 10 deterministic guardrails (`FIN-CC-01`–`10`) covering 23rd-to-cutoff delta rules, Day-1 auto-reversals, and working-day normalized `>5%` MRC variance alerts.
   - Implement 24th–25th HRIS-to-GL sync, dual-calendar (`01-01` vs. `01-07`) proration, simultaneous WIP + subcontractor CoS cutoff, and `1,500`-hr absorption tie-out.
3. **Weeks 5–6 — Exception Queue & IFRS 18 Alignment:**
   - Route clean zero-variance items to auto-clear queues, isolate true exceptions, and align P&L mapping with [IFRS-18-Close-Relevance-Notes.md](IFRS-18-Close-Relevance-Notes.md).
4. **Weeks 7–8 — Parallel Close Verification & Handover:**
   - Run one live 23rd-to-3rd close cycle, verify post-3rd close compression toward ≤2–3 business days, and sign off controller runbooks.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable / Alternative | Typical Cost & Model | Strengths | Differentiation of CBa `OP-FIN-009` |
| :--- | :--- | :--- | :--- |
| **BlackLine / FloQast / Oracle FCCS** | €50k–€150k+/yr SaaS + SI fees | Enterprise automation & workflow suite | Unaffordable for budget-constrained mid-market; CBa delivers **€0 new software** |
| **Big Four Close Transformation** | €60k–€200k+ multi-month team | Brand scale and ERP capacity | Heavy overhead; CBa provides conflict-free solo-director speed |
| **Manual Controller Checklists** | Internal labor only | Zero external spend | Perpetuates 80% manual ticking and 23rd-to-3rd accrual surprises |
| **CBa `OP-FIN-009` Bridge** | 6–8 wk fixed-scope advisory | Proprietary 2007–2008 RGP methodology | Deterministic cut-off rules + IFRS 18 readiness without rip-and-replace |

## 4. Internal IP & Source Provenance Crosswalk

| Source Asset | Role in `OP-FIN-009` | Provenance / Location |
| :--- | :--- | :--- |
| [RGP-23rd-to-3rd-Playbook-Internal.md](RGP-23rd-to-3rd-Playbook-Internal.md) | Proprietary 2007–2008 RGP P&L/BS & payroll-closure methodology (`HYP-2027-007`) | Sibling workspace file |
| [One_Pager_OP-FIN-009_Continuous_Close.md](One_Pager_OP-FIN-009_Continuous_Close.md) | Client-facing summary & commercial wedge | Sibling workspace file |
| [Client_Proposal_and_SOW_Continuous_Close_Bridge.md](Client_Proposal_and_SOW_Continuous_Close_Bridge.md) | Ready-to-tailor proposal and SOW baseline | Sibling workspace file |
| [Tier-2-Market-Research.md](Tier-2-Market-Research.md) & [Wave-1-Discovery-Evidence-Log.md](Wave-1-Discovery-Evidence-Log.md) | Mid-market close demand & discovery evidence (`HYP-2027-002`) | Sibling workspace files |
| [CFO-Controller-Outreach-and-Discovery-Script.md](CFO-Controller-Outreach-and-Discovery-Script.md) | Structured buyer qualification & discovery calls | Sibling workspace file |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **No Enterprise FCCS/BlackLine Pitch:** Explicitly avoid pitching expensive SaaS close platforms to mid-market firms with <10% modernization budgets.
- **No Statutory Audit Sign-Off:** CBa designs controls, cut-off rules, and reconciliation evidence; the client's statutory auditor retains audit opinion authority.
- **Prerequisite Cut-Off Discipline:** Reliable bridge execution requires client agreement on payroll-to-GL cut-off ownership across Finance and HR.

### Stage 1b Readiness & Pre-Pilot Handoff

| Criterion | Current State | Next Action Toward Pilot |
| :--- | :--- | :--- |
| **Stage 1b Framing** | Complete (Tier A Priority #2) | Lock into [Pilot-Charter.md](Pilot-Charter.md) |
| **Internal IP Write-Up (`HYP-2027-007`)** | Active Sprint (≤15 hrs) | Finalize [RGP-23rd-to-3rd-Playbook-Internal.md](RGP-23rd-to-3rd-Playbook-Internal.md) |
| **IFRS 18 Validation** | Pending Primary Check | Complete [IFRS-18-Close-Relevance-Notes.md](IFRS-18-Close-Relevance-Notes.md) |
| **Pilot Discovery (`HYP-2027-002`)** | Active Outreach | Log named CFO/Controller pilot in [Wave-1-Discovery-Evidence-Log.md](Wave-1-Discovery-Evidence-Log.md) |
