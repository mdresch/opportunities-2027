---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-SLS-003"
execution_track: "Tier C - Supporting (Small)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "inventory-of-ideas.md (adapted from 2026 OP-IE-003; 0 ADPA .docx)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — OP-SLS-003: AI Email Reply & CRM Intake Assistant Setup

> **Governance & SSOT:** Governed under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) (PMBOK 8 Initiating, Stage 3). Portfolio alignment references [inventory-of-ideas.md](../../inventory-of-ideas.md), [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md), [Ideation-Spark.md](./Ideation-Spark.md), and [Source-Documents.md](./Source-Documents.md).

## 1. Executive Summary

| Dimension | Commercial Baseline |
| --- | --- |
| **Target Buyer & Segment** | Founders, CROs & Sales/RevOps Leads (Small segment) |
| **Offer Type & Toolkit** | AI Micro-Service backed by Digital Transformation toolkit |
| **Engagement Horizon & Effort** | 6 weeks (Medium effort; Q2 2027 target) |
| **Working Capital & Fee Band** | $0 initial working capital; €800–€3,000 fixed-scope setup |
| **Primary Strategic Value** | Cash-generative quick win; productizable into partner playbook pack |

## 2. Business Need & Cost of Inaction

Small sales and customer-operations teams lose qualified leads and operational hours when inbound inquiries sit uncategorized in shared inboxes or require manual copy-pasting into CRM pipelines. In 2027, hiring a dedicated sales-ops coordinator is cost-prohibitive for small firms, while deploying unsupervised AI bots risks off-brand or inaccurate customer replies. Because `OP-SLS-003` is a Tier C adaptation of 2026 `OP-IE-003` with 0 assigned ADPA `.docx` files and no Stage 2 pilot metrics yet, no unverified response-time or revenue-lift percentages are asserted; value rests on eliminating repetitive manual triage inside existing paid tools.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Estimated Effort & Risk | Strategic Fit | Recommendation |
| --- | --- | --- | --- | --- |
| **Option A: Status Quo Manual Triage** | Reps continue manual inbox sorting and ad-hoc CRM entry | Zero fee; ongoing lead leakage and rep time drain | Poor: misses 2027 efficiency expectations | Reject |
| **Option B: Fixed-Scope CRM/Email AI Setup** | 6-wk setup of human-in-the-loop reply templates & no-code intake | Medium effort, $0 working capital; €800–€3,000 fee | Strong: fast ROI in client's existing stack | **Select** |
| **Option C: Custom Coded AI Agent Platform** | Build bespoke backend integrations and proprietary UI | High engineering risk, maintenance liability, scope creep | Poor: incompatible with €800–€3,000 micro-service | Reject |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Fixed-Scope Micro-Service:** Priced at €800–€1,500 for single-inbox prompt + template setup and €1,800–€3,000 for multi-channel intake + CRM routing + team training, billed 50% upfront / 50% at live handover.
- **$0 Working-Capital Model:** Client covers all native email/CRM/no-code subscriptions directly; CBa Consult contributes process mapping, prompt engineering, and workflow configuration only.
- **Compounding Path:** Distill recurring patterns into a repeatable "Playbook + Template Pack" licenseable to boutique agencies or managed IT providers, while generating `OP-X-004` proof.

## 5. Risk Register & Compensating Controls

| Risk ID | Risk Description | Likelihood / Impact | Compensating Control |
| --- | --- | --- | --- |
| **R-SLS-01** | Client's legacy email/CRM tier lacks API or native AI hooks | Medium / High | Verify tool tier & API prerequisites during pre-sale intake before SOW |
| **R-SLS-02** | GDPR / data-privacy non-compliance with third-party LLM endpoints | Medium / High | Enforce zero-retention enterprise API settings and human-approval send gate |
| **R-SLS-03** | Post-handover maintenance requests exceed 6-week setup fee | Medium / Medium | Define 14-day warranty window and exclude ongoing automation support |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Current Status | Required Pre-Pilot Action | Decision Owner |
| --- | --- | --- | --- |
| **Stage 4 (G4) Approval Status** | `PENDING_DIRECTOR_SIGNOFF` | Approve Q2 2027 micro-service pricing (€800–€3,000) and supported CRM list | Menno Drescher (Director) |
| **Stage 2 Market Validation** | Pending | Validate demand and tool stack mix with 5 small B2B founders/RevOps leads | Menno Drescher (Director) |
| **Privacy & Stack Checklist** | Pending | Finalize GDPR intake checklist and human-in-the-loop SOW clause | Menno Drescher (Director) |
