---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-013"
execution_track: "Tier A — Core 5 Active Flagship (GTM Priority #5; Pillar 17 Priority #1)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "HYP-2027-003 (Formulated), HYP-2027-013 (Formulated), HYP-2027-014 (Formulated), HYP-2027-015 (Testing)"
primary_source: "Tier-2-Market-Research.md; One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md; ADPA ICT Governance Framework"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — OP-ITG-013: Enterprise AI Agent Governance Assessment

> **Governance & SSOT Callout:** This Stage 3 Business Case is governed under the [Tailored Hybrid SIDPA Governance](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) framework. Flagship Tier A priority, commercial packaging, and pilot readiness trace to [inventory-of-ideas.md](../../inventory-of-ideas.md), [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md), [Ideation-Spark.md](Ideation-Spark.md), [Tier-2-Market-Research.md](Tier-2-Market-Research.md), [Pilot-Charter.md](Pilot-Charter.md), and [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md).

## 1. Executive Summary

| Dimension | Stage 3 Baseline |
| --- | --- |
| **Opportunity ID & Tier** | `OP-ITG-013` — Tier A Core 5 Active Flagship (GTM Priority #5; Pillar 17 Priority #1) |
| **Offer Type & Segment** | Audit / Diagnostic for Medium & Large enterprises |
| **Target Buyers** | CIOs, CISOs, and Chief AI Officers (CAIOs) |
| **Delivery Horizon & Effort** | 6–10 weeks (8–12 hrs/week) · High effort |
| **Expected Commercial Range** | €4,000–€12,000+ per diagnostic · Target Launch: Q1–Q2 2027 |
| **Working-Capital Requirement** | $0 initial working capital (sweat-equity + graduated `mdresch/agent-governance-onboarding` portal) |
| **Approval Status** | `PENDING_DIRECTOR_SIGNOFF` (Pre-Pilot G4 Gate for Pilot 1 Commercial Execution) |

## 2. Business Need & Cost of Inaction

Medium and large enterprises are scaling autonomous and semi-autonomous agents faster than IAM, SecOps, and FinOps controls can adapt. Cost of inaction includes unowned "shadow agents" holding over-privileged OBO/service tokens, uncontrolled token consumption across Copilot Studio and Foundry workloads, and non-compliance with EU AI Act and NIS2/DORA accountability requirements.

The assigned ADPA cluster (`ADPA - ICT Governance Framework`, shared with `OP-RSK-001`) models enterprise-wide runtime policy-as-code and telemetry bypass tracking to eliminate manual COBIT spreadsheet latency *(Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals)*. `OP-ITG-013` translates those architectural principles into an actionable 6–10 week diagnostic with **zero performance overhead claims or unverified client ROI actuals** prior to Pilot 1 completion.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Pros | Cons / Risks | Verdict |
| --- | --- | --- | --- | --- |
| **Option 0: Do Nothing** | Restrict ICT governance offers to legacy COBIT/ITIL reviews (`OP-ITG-002`). | Familiar templates. | Misses 2027 Pillar 17 flagship window around Entra Agent Identity & Agent 365. | **Reject** |
| **Option 1: Pure Policy Advisory Deck** | Deliver static PDF policies without questionnaire, portal intake, or FinOps mapping. | Lower upfront prep. | Undifferentiated vs. Big Four; fails to solve real agent inventory blind spots. | **Reject** |
| **Option 2: Portal-Assisted Diagnostic Flagship (Recommended)** | Execute 6–10 week Audit / Diagnostic using the onboarding portal, ownership matrix, Entra Agent Identity, Agent 365 & FinOps scorecard. | Tier A flagship ACV (€4k–€12k+); IP already built; $0 working capital. | Requires continuous tracking of fast-moving vendor agent APIs and CISO/CIO alignment. | **Recommended** |
| **Option 3: Full Runtime Enforcement SaaS Build** | Commercialize an inline runtime governance proxy before validating enterprise demand. | High SaaS multiple if adopted. | High engineering burn, security liability, and breaks $0 working-capital discipline. | **Defer** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Fixed-Fee Diagnostic (€4,000–€12,000+):** Tiered by enterprise size and agent estate complexity ([Tier-1-vs-Tier-2-Cut-Sheet.md](Tier-1-vs-Tier-2-Cut-Sheet.md)), billed on milestone/upfront terms so CBa Consult maintains $0 working-capital exposure.
- **Ready-to-Deploy GTM & Delivery Assets:** [One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md), [Wave-0-Outreach-Playbook.md](Wave-0-Outreach-Playbook.md), [GTM-Prospect-Tracker.md](GTM-Prospect-Tracker.md), [Workshop-Agenda.md](Workshop-Agenda.md), and [Executive-Readout-Template.md](Executive-Readout-Template.md) are already staged.
- **Compounding Path:** Extends `OP-ITG-002` and `OP-ITG-011` into enterprise agent governance, feeds implementation retainers (`OP-DTX-005` FinOps rollout), and graduates into `PR-ITG-013` via [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md).

## 5. Risk Register & Compensating Controls

| Risk | Likelihood / Impact | Compensating Control |
| --- | --- | --- |
| **Fast-evolving agent platforms (Agent 365 / Entra)** | High / Medium | Maintain modular [Agent-Governance-Assessment-Questionnaire.md](Agent-Governance-Assessment-Questionnaire.md) decoupled from single-vendor beta APIs. |
| **Cross-functional CIO/CISO/CAIO sponsorship lag** | Medium / High | Use [Assessment-Delegation-and-Ownership-Matrix.md](Assessment-Delegation-and-Ownership-Matrix.md) and executive one-pager to lock co-sponsorship at Week 0. |
| **Client reluctance to share sensitive agent logs** | Medium / Medium | Enforce metadata-only intake per [Assessment-Intake-Privacy-Model.md](Assessment-Intake-Privacy-Model.md). |
| **Portal engineering distraction** | Low / Medium | Gate portal backlog items strictly to Pilot 1 needs via [PR-ITG-013-Preparation-Checklist.md](PR-ITG-013-Preparation-Checklist.md). |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Current Readiness | Required Action for G4 Approval |
| --- | --- | --- |
| **Stage 1b Market Research & Collateral** | Complete ([Tier-2-Market-Research.md](Tier-2-Market-Research.md)) | Verified; one-pager and outreach playbook ready. |
| **Stage 2 Hypotheses (`HYP-2027-003`, `013`–`015`)** | Formulated / Testing | Continue `HYP-2027-015` validation through Wave 0 outreach ([Wave-0-Outreach-Playbook.md](Wave-0-Outreach-Playbook.md)). |
| **Pilot 1 Readiness & Privacy Model** | Complete ([Pilot-Charter.md](Pilot-Charter.md)) | Execute Pilot 1 under [Pilot-1-Delivery-Log-Template.md](Pilot-1-Delivery-Log-Template.md). |
| **Director Sign-Off Status** | **`PENDING_DIRECTOR_SIGNOFF`** | Menno Drescher (Director, CBa Consult) to authorize Wave 0 / Pilot 1 commercial launch and G4 graduation. |
