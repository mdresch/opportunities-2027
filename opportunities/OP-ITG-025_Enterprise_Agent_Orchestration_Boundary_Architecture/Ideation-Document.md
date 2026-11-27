---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-025"
execution_track: "Track A — Audit / Architecture (Tier B Pull 2028)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Portfolio-Extension-Areas-2027.md; Consulting-Offerings-2027.md; inventory-of-ideas.md (§6 IT and Technology)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-025`: Enterprise Agent Orchestration Boundary Architecture

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Sibling workspace files: [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

## 1. Problem Context & 2027 Market Trigger

Medium and Large enterprises deploying AI agents are granting Model Context Protocol (MCP) servers, internal APIs, and enterprise data stores to autonomous workflows faster than security and enterprise architecture record permissions. Meanwhile, auditors and AI-risk buyers (`OP-RSK-004`, `OP-RSK-007`) increasingly demand technical proof of **what agents can touch**, rather than static policy PDFs.

Major Systems Integrators (e.g., Accenture AI Foundation / AgenticOps) bundle heavy platform implementation, hyperscaler lock-in, and multi-quarter build teams. Mid-market and large enterprise CISOs and platform leads need a conflict-free, **decision-quality reference architecture and Architecture Decision Record (ADR) set** first — defining deny-by-default trust boundaries before handing off to internal platform teams or an SI.

### Buyer & Positioning Snapshot

- **Target Buyers:** CISOs, Enterprise Architects, and Platform Engineering Leads (Medium & Large enterprises).
- **Strategic Assets & Tier:** Tier B Pull *(2028)* · Strategic Asset 3: **Digital Labor** + Asset 4: **Evidence & Governance**.
- **Signature Toolkit & Commercial Band:** `Digital Transformation` · €3,000–€8,000 · 4–6 weeks (`6–10 hrs/wk`).
- **Trigger Sequence:** Follow-on pull after `OP-ITG-013` assessment and `OP-CHG-003` readiness GO decision.

## 2. Solution Architecture & Delivery Workflow

`OP-ITG-025` delivers five client-owned architectural artifacts over a focused 4–6 week engagement:

1. **Boundary & Trust-Zone Model:** Map all agents, MCP servers, APIs, enterprise data stores, and human approvers into explicit trust zones using deny-by-default isolation principles.
2. **Vendor-Neutral MCP / API Governance Pattern:** Specify tool allowlists, parameter validation, audit trails, and escalation gates on sensitive tool calls (inspired by OpenShell-style boundary patterns without locking into a single hyperscaler).
3. **Identity & Accountability Mapping:** Bind non-human agent IDs, session linkage, and delegated scopes into Entra/IAM directories aligned with `OP-ITG-013`.
4. **Logging & Escalation Retention Hooks:** Design immutable telemetry and incident-escalation hooks feeding `OP-RSK-004` and `OP-RSK-007`.
5. **Client-Owned ADR Set & SI Handoff:** Deliver an RFP-ready Architecture Decision Record package for internal engineering or SI execution (`OP-ITG-016` / SI build).

## 3. Market Comparables & CBa Consult Differentiation

| Comparable Archetype | Typical Packaging & Pricing | Target Buyer | CBa Consult Differentiation |
| --- | --- | --- | --- |
| **Global SIs (Accenture AI Foundation / AgenticOps)** | Multi-month platform implementation (€100k–€500k+) | Enterprise CIO / CDO | SIs sell NVIDIA/OpenAI/hyperscaler build P&L; CBa sells vendor-neutral boundary architecture and ADRs for €3,000–€8,000 before SI lock-in. |
| **Agent Gateway / Security Startups** | Annual SaaS/proxy subscription | CISO / Platform Lead | Software vendors push proprietary runtime proxies; CBa delivers client-owned trust-zone ADRs independent of vendor tooling. |
| **High-Level AI Governance Frameworks** | Policy PDFs & board checklists | Risk / Legal | Policies state intent; `OP-ITG-025` translates intent into concrete MCP allowlists, Entra IAM mapping, and tool-call escalation architecture. |

## 4. Internal IP & Source Provenance Crosswalk

| Asset / Source | Provenance & Availability | Coverage Role | Gaps Requiring Work Before Pilot |
| --- | --- | --- | --- |
| **`Ideation-Spark.md` & Competitive Roll-Up** | Repo competitive intelligence (2026-11-26) | Defines 5 client deliverables, €3k–€8k fee band, and `OP-ITG-013` -> `OP-CHG-003` -> `OP-ITG-025` sequence | Link ADR template set directly from `OP-ITG-002` methodology before 2028 pull. |
| **`OP-ITG-002` & `OP-ITG-013` Frameworks** | Related CBa ICT/Agent Governance IP | Provides ICT governance structure, Entra/Agent 365 taxonomy (~70% foundation) | Needs standardized MCP allowlist and deny-by-default trust-zone ADR templates. |
| **`Source-Documents.md`** | Sibling manifest (`0` ADPA `.docx` assigned) | Portfolio-derived from competitive intelligence | Keep synchronized if ADPA specs are added later. |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **No Agent Development or Deployment:** CBa Consult delivers workshops, boundary architecture, and client-owned ADRs; CBa does not code agents, MCP servers, or runtime guardrails.
- **No Single-Hyperscaler Mandate or Auto-MIP:** Remains vendor-neutral and does not automatically initiate `OP-ITG-018` Managed Intelligence Provider (MIP) retainers (only via separate SOW).
- **2028 Capacity Protection Gate:** Held as **pull-only** until at least two `OP-ITG-013` assessments complete, protecting Q1–Q2 2027 Tier A solo bandwidth.

### Stage 1b Gate (`G1b`) Checklist

- [x] Five client-owned deliverables and CBa-does/does-not boundaries defined in [Ideation-Spark.md](Ideation-Spark.md).
- [ ] Link reusable ADR template set from `OP-ITG-002` ICT Governance methodology.
- [ ] Hold active outbound sales until two `OP-ITG-013` assessments complete (2028 Tier B pull).
