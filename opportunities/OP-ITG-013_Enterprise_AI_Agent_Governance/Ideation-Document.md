---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-013"
execution_track: "Tier A — Core 5 Active Flagship (GTM Priority #5; Pillar 17 Priority #1)"
linked_hypotheses: "HYP-2027-003 (Formulated), HYP-2027-013 (Formulated), HYP-2027-014 (Formulated), HYP-2027-015 (Testing)"
primary_source: "Tier-2-Market-Research.md; One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md; ADPA ICT Governance Framework"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — OP-ITG-013: Enterprise AI Agent Governance Assessment

> **Governance & SSOT Callout:** This Stage 1b artifact consolidates `OP-ITG-013` under the [Tailored Hybrid SIDPA Governance](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) framework. Strategic priority and flagship linkage trace to [inventory-of-ideas.md](../../inventory-of-ideas.md), [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md), [Ideation-Spark.md](Ideation-Spark.md), [Tier-2-Market-Research.md](Tier-2-Market-Research.md), and [Source-Documents.md](Source-Documents.md).

## 1. Problem Context & 2027 Market Trigger

Medium and large enterprises are deploying autonomous and semi-autonomous AI agents across Copilot Studio, Microsoft Foundry, ServiceNow, Salesforce, and custom APIs—yet most CIOs, CISOs, and Chief AI Officers cannot answer four foundational governance questions: *Which AI agents exist in the tenant? Who is the accountable human owner? What identities and tool permissions do those agents hold? What is their true consumption cost?*

Three converging 2027 triggers drive immediate executive urgency:

- **Platform & Identity Inflection (MS Ignite 2026 & Gartner 2027):** Microsoft introduced **Agent 365** observability and **Entra Agent Identity** (per-instance agent identities and token exchange), while Gartner Top Tech Trends 2027 highlight AI Agent Identity and Disposable Apps as top board-level control gaps.
- **Shadow Agent & Permission Sprawl:** Makers provision agents using shared service principals or broad user OBO tokens, creating unmonitored data exfiltration paths and zero-trust blind spots.
- **FinOps & Regulatory Exposure:** Without lifecycle retirement rules and per-agent FinOps telemetry, enterprises face runaway token bills alongside EU AI Act and NIS2/DORA accountability mandates.

## 2. Solution Architecture & Delivery Workflow

`OP-ITG-013` is delivered as a 6–10 week (8–12 hrs/week) **Audit / Diagnostic** backed by CBa Consult's `ICT-Governance-Framework-Application` architecture and standalone onboarding portal (`mdresch/agent-governance-onboarding`):

1. **Phase 1 — Discovery & Agent Intake:** Deploy the [Agent-Governance-Assessment-Questionnaire.md](Agent-Governance-Assessment-Questionnaire.md) and [Assessment-Intake-Privacy-Model.md](Assessment-Intake-Privacy-Model.md) via the delegated intake workflow ([Workshop-Agenda.md](Workshop-Agenda.md)) to inventory known and shadow agents across business units.
2. **Phase 2 — Ownership, Identity & Permission Mapping:** Map human accountability via [Assessment-Delegation-and-Ownership-Matrix.md](Assessment-Delegation-and-Ownership-Matrix.md), audit service-principal vs. **Entra Agent Identity** posture, and classify tool/API blast radius.
3. **Phase 3 — Observability, Lifecycle & Agent FinOps Assessment:** Evaluate telemetry against **Agent 365** standards, define birth-to-retirement lifecycle gates, and establish per-agent FinOps throttling and cost-attribution baselines.
4. **Phase 4 — Executive Readout & Remediation Roadmap:** Deliver the board-ready assessment using [Executive-Readout-Template.md](Executive-Readout-Template.md) and scoped pilot governance charter ([Pilot-Charter.md](Pilot-Charter.md)).

## 3. Market Comparables & CBa Consult Differentiation

| Comparable / Alternative | Typical Positioning & Limitations | CBa Consult Differentiation (`OP-ITG-013`) |
| --- | --- | --- |
| **Big Four AI Governance Practices** | High-cost, policy-heavy advisory decks detached from Entra ID, Agent 365, and engineering telemetry. | Practitioner diagnostic combining executive governance with concrete Entra Agent Identity, permission, and FinOps controls. |
| **Cloud / Security Point Vendors (CNAPP / DSPM)** | Detect infrastructure or SaaS misconfigurations but lack human-accountability matrices, lifecycle policy, and FinOps ROI framing. | Bridges technical telemetry with business ownership, EU AI Act/DORA alignment, and actionable remediation priorities. |
| **Native Vendor Dashboards (Agent 365 / M365 Admin)** | Provide raw tenant metrics without cross-platform inventory, delegated intake, or executive risk scoring. | Wraps native controls inside a structured assessment methodology, delegated portal, and [Executive-Readout-Template.md](Executive-Readout-Template.md). |
| **Internal Security / Architecture Teams** | Fragmented across IAM, SecOps, and Business IT with no unified agent assessment playbook. | Pre-built questionnaire, privacy intake model, and [Tier-1-vs-Tier-2-Cut-Sheet.md](Tier-1-vs-Tier-2-Cut-Sheet.md) for fast alignment. |

## 4. Internal IP & Source Provenance Crosswalk

| Source / Sibling Artifact | Provenance Status | Reusable IP & Governance Mapping |
| --- | --- | --- |
| [Tier-2-Market-Research.md](Tier-2-Market-Research.md) & [Ideation-Spark.md](Ideation-Spark.md) | Stage 1b Complete | Full competitive landscape, macro triggers, and Pillar 17 Priority #1 positioning. |
| [One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md) | Client-ready collateral | Executive one-pager (`.md` and `.docx`) plus [LinkedIn-GTM-Copy.md](LinkedIn-GTM-Copy.md) and [Wave-0-Outreach-Playbook.md](Wave-0-Outreach-Playbook.md). |
| [Agent-Governance-Assessment-Questionnaire.md](Agent-Governance-Assessment-Questionnaire.md) & Portal Specs | Delivery IP & SIDPA repo | Core diagnostic instrument, [Portal-Delegation-Dashboard-Spec.md](Portal-Delegation-Dashboard-Spec.md), and graduated `mdresch/agent-governance-onboarding` portal. |
| [Source-Documents.md](Source-Documents.md) (`ADPA - ICT Governance Framework`) | 39 assigned ADPA `.docx` files | Grounds runtime policy-as-code, telemetry bypass tracking, TOGAF/SABSA/COBIT/PMBOK alignment (shared cluster with `OP-RSK-001`). |
| [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md) & [Pilot-Charter.md](Pilot-Charter.md) | Pilot readiness IP | Defines transition to Pilot 1 delivery ([Pilot-1-Delivery-Log-Template.md](Pilot-1-Delivery-Log-Template.md)) and `PR-ITG-013`. |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

To keep `OP-ITG-013` tightly scoped as a fixed-time diagnostic rather than an open-ended implementation project:

- **Diagnostic & Roadmap Only (Not Managed SOC/IAM Operations):** CBa Consult assesses posture, designs target guardrails, and delivers the remediation roadmap; 24/7 SOC monitoring or full enterprise IAM re-engineering is scoped separately.
- **Metadata-First Privacy Posture:** In accordance with [Assessment-Intake-Privacy-Model.md](Assessment-Intake-Privacy-Model.md), the assessment avoids ingesting sensitive prompt payloads or customer PII.
- **No Unfunded Custom Software Builds:** Any engineering beyond the existing onboarding portal follows separate Stage 4/Pilot commercial authorization.
- **Stage 1b Gate Status:** Stage 1b research, collateral, and Stage 2 hypotheses (`HYP-2027-003`, `HYP-2027-013`–`015`) are already formulated; Stage 3 Business Case requires formal Director sign-off for Pilot 1 commercial launch.
