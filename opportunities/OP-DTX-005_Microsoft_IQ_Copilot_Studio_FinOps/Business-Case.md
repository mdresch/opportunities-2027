---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-DTX-005"
execution_track: "Tier B — Growth (Pillar 9: Digital Transformation)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "MS Ignite 2026 (Microsoft IQ, Copilot Studio, Azure Catalyst); inventory-of-ideas.md §9"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — OP-DTX-005: Microsoft IQ & Copilot Studio FinOps Rollout

> **Governance & SSOT Callout:** This Stage 3 Business Case is governed under the [Tailored Hybrid SIDPA Governance](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) framework. Commercial bounds and portfolio alignment trace to [inventory-of-ideas.md](../../inventory-of-ideas.md), [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md), [Ideation-Spark.md](Ideation-Spark.md), [BD-Quick-Reference.md](BD-Quick-Reference.md), [Ideation-Document.md](Ideation-Document.md), and [Source-Documents.md](Source-Documents.md).

## 1. Executive Summary

| Dimension | Stage 3 Baseline |
| --- | --- |
| **Opportunity ID & Tier** | `OP-DTX-005` — Tier B Growth (Pillar 9: Digital Transformation) |
| **Offer Type & Segment** | Advisory / Starter Kit for Medium & Large Microsoft-centric enterprises |
| **Target Buyers** | CIOs, CTOs, and Digital Transformation Leaders |
| **Delivery Horizon & Effort** | 6–8 weeks (6–10 hrs/week) · Medium effort |
| **Expected Commercial Range** | €2,500–€8,000 initial starter engagement · Target Launch: Q2 2027 |
| **Working-Capital Requirement** | $0 initial working capital (sweat-equity advisory + client-owned licenses) |
| **Approval Status** | `PENDING_DIRECTOR_SIGNOFF` (Pre-Pilot G4 Gate) |

## 2. Business Need & Cost of Inaction

Enterprises adopting Copilot Studio and Microsoft AI agents face simultaneous context sprawl and unpredictable consumption-based billing. Without structured context boundaries and FinOps guardrails, organizations incur three compounding costs of inaction:

- **Unplanned AI "Bill Shock" & Initiative Cancellation:** Macro industry baselines cited in [Ideation-Spark.md](Ideation-Spark.md) (Forrester and Gartner 2027 projections) indicate usage-based AI pricing could force enterprises to cut roughly one-third of unmeasured AI initiatives while >40% of agentic AI projects risk cancellation by 2027 without cost and accountability controls.
- **Data Exposure Across Ungoverned Context:** Connecting Copilot Studio bots directly to unlabelled SharePoint sites or legacy databases risks oversharing sensitive commercial and HR data.
- **Stalled Legacy Modernization:** Without scoping legacy blockers via **Azure Catalyst**, high-value agent workflows stall in disconnected proof-of-concept silos.

*(Note: No legacy ADPA `.docx` financial model is assigned in [Source-Documents.md](Source-Documents.md); no unverified client ROI actuals are claimed prior to Pilot 1.)*

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Pros | Cons / Risks | Verdict |
| --- | --- | --- | --- | --- |
| **Option 0: Do Nothing** | Defer Microsoft IQ & FinOps packaging; focus only on Tier A offers. | Zero prep time in Q1 2027. | Misses immediate MS Ignite 2026 buyer urgency in Microsoft accounts. | **Reject** |
| **Option 1: Generic Power Platform CoE Audit** | Deliver standard `OP-ITG-007` Power Apps CoE review without IQ/FinOps scope. | Reuses existing templates with minimal prep. | Fails to address Ignite 2026 `Work/Fabric/Foundry IQ` and Copilot Studio spend caps. | **Reject** |
| **Option 2: Fixed-Scope Starter Kit (Recommended)** | 6–8 week advisory blueprint covering `Microsoft IQ` boundaries, Copilot Studio throttling, and Azure Catalyst scoping. | High 2027 buyer relevance; €2,500–€8,000 wedge; $0 working capital. | Requires continuous tracking of Microsoft Ignite 2026 licensing updates. | **Recommended** |
| **Option 3: Full Managed AI FinOps & App Re-Architecture** | Multi-quarter custom engineering and ongoing consumption management. | Higher theoretical ACV per account. | Breaks $0 working-capital discipline and overextends solo/boutique capacity. | **Defer** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Fixed-Scope Engagement (€2,500–€8,000):** Priced as a bounded 6–8 week starter kit (6–10 hrs/week) paid on milestone/upfront retainer terms so CBa Consult operates with $0 working capital. All Microsoft 365, Fabric, Foundry, and Copilot Studio licenses sit on the client's tenant.
- **Portfolio Compounding Path:** `OP-DTX-005` bridges `OP-ITG-007` (Power Apps CoE) and `OP-DTX-003` (Power Platform Solutions) into agentic FinOps governance, while serving as a practical implementation follow-on to `OP-ITG-013` (Enterprise AI Agent Governance Assessment) and generating referenceable proof (`OP-X-004`).

## 5. Risk Register & Compensating Controls

| Risk | Likelihood / Impact | Compensating Control |
| --- | --- | --- |
| **Consumption-based AI pricing surprises** | High / High | Enforce Copilot Studio environment spending caps, throttling alerts, and showback tagging in Week 5 before broad rollout. |
| **Rapidly evolving Microsoft IQ / Catalyst GA dates** | Medium / Medium | Anchor deliverables in tenant-verified capabilities available during discovery; isolate preview features in Phase 2 backlog. |
| **Scope creep into legacy app refactoring** | Medium / High | Restrict Azure Catalyst work to architectural scoping and effort sizing; route code remediation to separate SOWs. |
| **Client data-governance stakeholder bottlenecks** | Medium / Medium | Require named IT Security and Power Platform CoE owners at kickoff before context mapping begins. |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Current Readiness | Required Action for G4 Approval |
| --- | --- | --- |
| **Stage 1b Framing & Comparables** | Complete ([Ideation-Document.md](Ideation-Document.md)) | Verified against Ignite 2026 triggers and [BD-Quick-Reference.md](BD-Quick-Reference.md). |
| **Stage 2 Hypotheses & Discovery Script** | Pending (`Pre-Stage 2`) | Formulate testable FinOps/IQ pricing and buyer-pain hypotheses prior to Wave 1 outreach. |
| **Pilot 1 Target & Milestone Terms** | Pending | Identify 2–3 Microsoft-stack mid/large prospects for Q2 2027 validation. |
| **Director Sign-Off Status** | **`PENDING_DIRECTOR_SIGNOFF`** | Menno Drescher (Director, CBa Consult) to approve Stage 2 hypothesis sprint or park until Tier A Wave 1 stabilizes. |
