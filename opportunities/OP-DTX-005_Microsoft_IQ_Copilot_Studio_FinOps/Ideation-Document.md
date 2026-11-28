---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-DTX-005"
execution_track: "Tier B — Growth (Pillar 9: Digital Transformation)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "MS Ignite 2026 (Microsoft IQ, Copilot Studio, Azure Catalyst); inventory-of-ideas.md §9"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — OP-DTX-005: Microsoft IQ & Copilot Studio FinOps Rollout

> **Governance & SSOT Callout:** This Stage 1b artifact is governed under the [Tailored Hybrid SIDPA Governance](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) framework. Strategic priority, target sizing, and working-capital constraints trace to [inventory-of-ideas.md](../../inventory-of-ideas.md), [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md), [Ideation-Spark.md](Ideation-Spark.md), [BD-Quick-Reference.md](BD-Quick-Reference.md), and [Source-Documents.md](Source-Documents.md).

## 1. Problem Context & 2027 Market Trigger

Medium and large Microsoft-centric enterprises are rapidly deploying Copilot Studio agents and generative AI extensions without unified context governance or consumption guardrails. While teams experiment with autonomous workflows, enterprise knowledge remains fragmented across SharePoint, Fabric lakes, and legacy line-of-business systems, producing inconsistent answers and shadow data exposure.

Two converging 2027 market triggers elevate this into an urgent CIO/CTO mandate:

- **Microsoft Ignite 2026 Platform Shift (Nov 2026):** Microsoft introduced the **Microsoft IQ** context layer (`Work IQ`, `Fabric IQ`, `Foundry IQ`), **Copilot Workspaces**, **Azure Catalyst** for legacy application modernization, and flexible **Copilot Studio** admin spending/throttling controls. Enterprises need an actionable architecture to adopt these controls safely rather than leaving default tenant settings open.
- **Usage-Based AI "Bill Shock" & Cancellation Risk:** As documented in [Ideation-Spark.md](Ideation-Spark.md) (citing Forrester and Gartner 2027 projections), usage-based AI pricing threatens to force enterprises to cut roughly one-third of unmeasured AI initiatives in 2027, while >40% of agentic AI projects face cancellation if cost and accountability controls are absent.

CBa Consult targets CIOs, CTOs, and Digital Transformation Leaders who require a conflict-free, fixed-scope blueprint that establishes safe context grounding and hard FinOps spending caps before scaling agentic workloads.

## 2. Solution Architecture & Delivery Workflow

The engagement is packaged as a fixed-scope **Advisory / Starter Kit** delivered over 6–8 weeks (6–10 hrs/week) using CBa Consult's Digital Transformation signature toolkit:

1. **Week 1–2 — Context & Consumption Baseline:** Audit active Copilot Studio agents, message/capacity consumption patterns, Power Platform environments, and ungoverned enterprise data connectors feeding AI prompts.
2. **Week 3–4 — Microsoft IQ Grounding Design:** Map proprietary data domains onto `Work IQ`, `Fabric IQ`, and `Foundry IQ` boundaries, enforcing sensitivity labels, least-privilege RBAC, and tenant isolation so agents access only vetted enterprise context.
3. **Week 5 — Copilot Studio FinOps & Throttling Guardrails:** Configure flexible Copilot Studio spending caps, environment-level capacity quotas, alert thresholds, and chargeback/showback tagging aligned to business units.
4. **Week 6–8 — Azure Catalyst Modernization Roadmap & Handover:** Scope legacy applications blocking agentic integration using **Azure Catalyst** assessment patterns, and deliver an executive governance playbook linking into existing Power Apps CoE operations.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable / Alternative | Typical Positioning & Limitations | CBa Consult Differentiation (`OP-DTX-005`) |
| --- | --- | --- |
| **Global System Integrators (Big Four / SI)** | Multi-quarter transformation programs with high day rates and upsell pressure toward managed services. | Conflict-free, 6–8 week fixed-scope blueprint built for rapid internal team enablement without lock-in. |
| **Microsoft Default Admin Templates** | Generic tenant checklists lacking FinOps chargeback models, Power Platform CoE alignment, and legacy scoping. | Combines `Work/Fabric/Foundry IQ` context boundaries with concrete Copilot Studio throttling and CoE workflows. |
| **Standalone Cloud FinOps Vendors** | Focus on raw Azure IaaS/PaaS spend; blind to Copilot Studio message packs and Power Platform maker sprawl. | Targets agent-layer consumption economics directly alongside Power Platform and Azure Catalyst modernization paths. |
| **Internal IT Ad-Hoc Rollout** | Siloed experimentation by makers leading to unexpected overages, stalled approvals, and audit gaps. | Provides a repeatable governance starter kit with clear executive sign-off gates and $0 initial working capital. |

## 4. Internal IP & Source Provenance Crosswalk

| Source / Sibling Artifact | Provenance Status | Reusable IP & Governance Mapping |
| --- | --- | --- |
| [Ideation-Spark.md](Ideation-Spark.md) | Active workspace spark (Tier B) | Positioning statement, 7 Pivotal Questions, and Ignite 2026 macro signal grounding (`Work/Fabric/Foundry IQ`, Azure Catalyst). |
| [BD-Quick-Reference.md](BD-Quick-Reference.md) | Active companion asset | Commercial pitch framing, buyer objection handling, and rapid outreach alignment. |
| [Source-Documents.md](Source-Documents.md) | 0 assigned `.docx` files | Confirms pure Ignite 2026 / internal toolkit origin without legacy ADPA `.docx` dependency. |
| [inventory-of-ideas.md](../../inventory-of-ideas.md) | SSOT Master Inventory (§9) | Defines Tier B status, 6–8 week horizon, €2,500–€8,000 expected capital range, Q2 2027 target, and links to `OP-ITG-007` and `OP-DTX-003`. |
| `market-analysis-2027.md` (§9 & §17) | Portfolio macro baseline | Grounds 2027 usage-based AI cost discipline and agentic cancellation triggers. |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

To protect margin, delivery velocity, and $0 working-capital discipline, the following exclusions apply strictly:

- **No Custom Software or Full Legacy Rebuilds:** `OP-DTX-005` scopes legacy app modernization via Azure Catalyst; actual code refactoring, custom LLM fine-tuning, or multi-year ERP migration falls outside scope.
- **No Uncapped Production Agent Sprawl:** CBa Consult configures FinOps guardrails and pilot patterns, not ongoing 24/7 L1/L2 managed operations for unlimited maker bots.
- **No Unlicensed Microsoft SKUs:** The client procures and holds all Microsoft 365, Copilot Studio, Fabric, and Azure subscriptions directly.
- **Stage 1b Gate Status:** Capability framing and comparable positioning are complete. Progression to Stage 2/3 validation requires confirmation of target pilot prospect outreach and Stage 3 Business Case sign-off by the Director.
