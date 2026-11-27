---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-025"
execution_track: "Track A — Audit / Architecture (Tier B Pull 2028)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Portfolio-Extension-Areas-2027.md; Consulting-Offerings-2027.md; inventory-of-ideas.md (§6 IT and Technology)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-ITG-025`: Enterprise Agent Orchestration Boundary Architecture

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Sibling workspace files: [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

## 1. Executive Summary

| Dimension | Assessment |
| --- | --- |
| **Opportunity ID & Title** | `OP-ITG-025` — Enterprise Agent Orchestration Boundary Architecture |
| **Portfolio Tier & Assets** | Tier B Pull (2028) · Strategic Asset 3: Digital Labor + Asset 4: Evidence & Governance |
| **Target Buyer & Segment** | CISOs, Enterprise Architects, and Platform Leads (Medium & Large) |
| **Commercial Band & Horizon** | €3,000–€8,000 · 4–6 weeks (`6–10 hrs/wk`) · Medium–High effort · Q3 2027–2028 |
| **Approval Status** | `PENDING_DIRECTOR_SIGNOFF` (Pull-only until two `OP-ITG-013` assessments complete) |

`OP-ITG-025` captures the high-value architectural white space left by SIs selling full AgenticOps builds: a 4–6 week, fixed-scope €3,000–€8,000 boundary architecture and ADR package delivered at `` `$0` `` working capital, sequenced behind `OP-ITG-013` to protect 2027 Tier A execution.

## 2. Business Need & Cost of Inaction

Organizations scaling MCP tools and autonomous agents without a deny-by-default boundary architecture risk unlogged data exfiltration via chained tool calls, ambiguous non-human identity accountability during audits, and expensive SI rework when early prototypes fail CISO security review. Establishing client-owned ADRs before platform build prevents vendor lock-in and shortens RFP/SI onboarding.

*Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals:* `OP-ITG-025` has `0` assigned ADPA `.docx` workbooks ([Source-Documents.md](Source-Documents.md)); it is derived from 2026–2027 competitive intelligence (Accenture AI Foundation / AgenticOps white space). Concrete client cost-avoidance and SI-rework-reduction metrics will be captured after Paid Pilot #1.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Effort & Capital | Strategic Fit | Recommendation |
| --- | --- | --- | --- | --- |
| **Option A: 2028 Tier B Pull Behind `OP-ITG-013`** | Sell exclusively as post-assessment pull (`OP-ITG-013` -> `OP-CHG-003` GO -> `OP-ITG-025`) once two `OP-ITG-013` engagements complete. | 4–6 wks (`6–10 hrs/wk`), `` `$0` `` outlay | Highest; maximizes attach rate without diluting Q1–Q2 2027 Tier A | **Recommended** |
| **Option B: Immediate Standalone Q1 2027 GTM** | Pitch MCP boundary architecture cold before `OP-ITG-013` pipeline exists. | High BD cost | Poor; premature buyer demand & crowds out Tier A | **Deferred** |
| **Option C: Build & Operate AgenticOps Runtime** | Implement custom MCP gateways and deploy agents directly. | High engineering & liability | Rejected; breaks non-build boundary and solo cap | **Rejected** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Commercial SKU & Fee Anchor:** Fixed-scope 4–6 week architecture sprint priced at **€3,000–€8,000**, producing the 5 core artifacts (Boundary Model, MCP/API Pattern, Entra/IAM Mapping, `OP-RSK-004`/`OP-RSK-007` Logging Hooks, and RFP-ready ADR Set).
- **`$0` Working-Capital Fit:** Delivered purely via architecture workshops and structured ADR/diagram templates (`6–10 hrs/wk`), requiring zero runtime licenses or engineering headcount.
- **SOW Acceptance Criteria:** Client CISO/EA sign-off on trust-zone boundaries, Entra identity mapping, and SI/platform-team RFP readiness.
- **Compounding Path:** Completes the full CBa Digital Labor value chain: **`OP-ITG-013`** (governance assessment) -> **`OP-CHG-003`** (readiness/GO) -> **`OP-ITG-025`** (boundary architecture) -> **`OP-ITG-016` / SI Implementation** (fleet-scale design/build), with optional separate-SOW expansion into **`OP-ITG-018` (MIP)**.

## 5. Risk Register & Compensating Controls

| Risk ID | Risk Description | Likelihood / Impact | Compensating Control |
| --- | --- | --- | --- |
| `R-01` | **Premature Bandwidth Drain:** Chasing 2028 architecture work derails Q1–Q2 2027 Tier A Flagships. | Medium / High | Enforce hard pull-only gate: no outbound GTM until two `OP-ITG-013` assessments complete. |
| `R-02` | **Scope Creep into Agent Coding:** Client asks CBa to implement MCP servers or OpenShell policies. | High / Medium | Lock explicit "CBa does / CBa does not" table in SOW; hand implementation to `OP-ITG-016` or client SI. |
| `R-03` | **Rapid MCP Protocol Churn:** Fast-evolving MCP/agent standards render static patterns obsolete. | Medium / Medium | Anchor ADRs on timeless vendor-neutral security primitives (deny-by-default, least privilege, session auditability). |
| `R-04` | **Unowned Logging & Incident Triage:** Boundary design lacks operational escalation owner. | Medium / Medium | Require explicit handoff mapping into `OP-RSK-004` and `OP-RSK-007` incident workflows prior to closeout. |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Current Status | Required Action Before `Idea` -> `Pilot` |
| --- | --- | --- |
| **Director Approval Status** | `PENDING_DIRECTOR_SIGNOFF` | Requires explicit `requires_human_approval: true` sign-off in [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md). |
| **Precursor Pipeline Gate** | Pending | Complete at least two `OP-ITG-013` assessments before triggering active pull. |
| **IP Linkages** | Pending | Link standardized ADR template set from `OP-ITG-002` methodology. |
| **Pilot Charter Gate (`G4`)** | Locked | Confirm fixed €3,000–€8,000 scope, non-build SOW clause, and SI-handoff acceptance criteria. |
