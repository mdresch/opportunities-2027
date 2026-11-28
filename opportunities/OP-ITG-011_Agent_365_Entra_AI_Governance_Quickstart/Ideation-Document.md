---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-011"
execution_track: "Tier B Growth — IT & Technology (Microsoft Ecosystem)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "inventory-of-ideas.md §6 IT & Technology (MS Ignite 2026 Spark)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-011`: Agent 365 & Entra AI-Agent Governance Quick-Start

> **Governance & SSOT Callout:** This Stage 1b Ideation Document is governed by the [Tailored Hybrid SIDPA Governance](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) framework and anchored to the [Inventory of Ideas](../../inventory-of-ideas.md) and [Tier A Executive Summary](../../Tier_A_Executive_Summary_2027.md). Supporting artifacts: [Ideation-Spark.md](Ideation-Spark.md), [BD-Quick-Reference.md](BD-Quick-Reference.md), and [Source-Documents.md](Source-Documents.md).

## 1. Problem Context & 2027 Market Trigger

Following Microsoft Ignite 2026 (November 2026), enterprises accelerated adoption of Copilot Studio, Copilot Autopilot, and Windows 365 for Agents. Most mid-to-large Microsoft tenants are deploying autonomous and semi-autonomous agents using legacy human service accounts, broad SharePoint permissions, and uncapped consumption meters. This creates immediate oversharing, shadow-agent sprawl, and FinOps cost-spike exposure.

Microsoft introduced *Agent 365* observability/FinOps controls, *Entra for AI Agents* just-in-time identity governance, *Project Perception* guardrails, and *Baseline Security Mode (BSM) 2026* hardening—yet CIOs, CISOs, and M365 Security Leads lack practical, vendor-neutral implementation blueprints to operationalize these controls before agent proliferation outpaces governance.

## 2. Solution Architecture & Delivery Workflow

`OP-ITG-011` delivers a hardened, cost-capped Microsoft AI-agent baseline in 4–6 weeks (6–8 hrs/wk) without upfront capital:

1. **Agent Estate Discovery & Risk Triage:** Inventory active Copilot Studio bots, Autopilot workflows, and citizen-built agents across M365 environments; classify data sensitivity and permission blast radius.
2. **Entra AI-Agent Identity & JIT Hardening:** Transition agents off shared human credentials onto dedicated Entra Agent Identities with least-privilege, just-in-time access policies and conditional boundaries.
3. **Agent 365 FinOps & Project Perception Guardrails:** Configure observability telemetry, consumption quotas/alerts, and prompt/action guardrails aligned with BSM 2026 security baselines.
4. **Governance Charter & Scale Handover:** Establish approval gates for disposable apps and agent promotion, creating a natural bridge into full ICT Governance (`OP-ITG-002`) and Power Platform/Copilot CoE (`OP-ITG-007`).

## 3. Market Comparables & CBa Consult Differentiation

| Comparable / Alternative | Typical Buyer Fit | Strengths | Gaps / Limitations | CBa Consult Differentiation |
| --- | --- | --- | --- | --- |
| Global Microsoft GSIs (Accenture, Avanade) | Fortune 500 enterprises | Deep multi-cloud engineering benches | €75k+ minimums, slow mobilization, incentivized to sell broad license expansions | Fixed-scope 4–6 week Quick-Start focused strictly on hardening and FinOps caps |
| Microsoft Unified Support / FastTrack | Large EA Microsoft accounts | Direct product-group visibility | Advisory guidance only; limited hands-on governance policy tailoring | Hands-on policy configuration, governance charter, and conflict-free FinOps advocacy |
| Point Security Vendors (CASB / DSPM) | Security-heavy enterprises | Automated SaaS/data posture scanning | Adds new licensing overhead; does not configure native Entra Agent ID or Agent 365 | Maximizes native Microsoft Ignite 2026 controls already included or accessible in-tenant |
| Internal M365 Admins (DIY) | Lean IT teams | Knows tenant history | Overloaded with BAU tickets; limited time to track fast-moving Ignite 2026 previews | Curated, repeatable Digital Transformation & ICT Governance playbook |

## 4. Internal IP & Source Provenance Crosswalk

| Source / Asset | Role in `OP-ITG-011` | Provenance Status | Reuse & Adaptation Notes |
| --- | --- | --- | --- |
| [inventory-of-ideas.md](../../inventory-of-ideas.md) (§6 IT & Technology) | Canonical Tier B Growth backlog entry | Verified SSOT | Anchors scope, 4–6 wk horizon, Medium & Large buyer fit, and compounding path |
| [Ideation-Spark.md](Ideation-Spark.md) | Ignite 2026 positioning and Gartner trigger framing | Verified sibling file | Captures Agent 365, Entra for AI Agents, Project Perception, and BSM 2026 |
| [BD-Quick-Reference.md](BD-Quick-Reference.md) | Commercial discovery and objection-handling script | Verified sibling file | Supports rapid CIO/CISO qualification conversations |
| `ICT-Governance-Framework-Application` & DT Toolkit | Core governance architecture IP | Internal CBa Consult IP | Maps technical Entra/BSM controls to formal enterprise ICT governance gates |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

To avoid preview-feature instability and unbounded SI engineering, `OP-ITG-011` maintains clear boundaries:

- **No Custom Multi-Agent Application Engineering:** Building bespoke business agents or external LLM orchestrations (LangGraph/Foundry custom apps) is out of scope.
- **No Non-Microsoft Cloud Identity Re-Architecture:** Okta, AWS IAM, or GCP Agent governance migrations require separate scoped engagements.
- **No Unapproved Preview-Feature Production Dependencies:** Preview capabilities are clearly tagged with fallback native Entra/Purview controls if client policy restricts preview toggles.
- **No 24/7 SOC Monitoring:** Ongoing SIEM/SOAR alert triage remains with the client's existing security operations provider.

**Stage 1b Gate Readiness:** Strongly validated by November 2026 Microsoft Ignite releases and Tier B Growth priority. Ready for Director adjudication to proceed toward commercial pilot packaging.
