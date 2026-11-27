---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-005"
execution_track: "Track A (Client Advisory — CIO / CTO AI Infrastructure Architecture)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Opportunities to Publish/AI Infrastructure Consultancy.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-005`: AI Infrastructure Consultancy

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Local source framing is tracked in [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

## 1. Problem Context & 2027 Market Trigger

Medium and large enterprises moving AI pilots into production in 2027 face escalating cloud inference bills, fragmented model-hosting choices (sovereign EU cloud vs. hyperscaler APIs vs. self-hosted weights), unclear data-residency boundaries, and rising compliance pressure under GDPR, DORA/NIS2, and the EU AI Act. Internal IT teams often inherit shadow GPU clusters or unmonitored API keys with no unified architecture review.

`OP-ITG-005` addresses this pain as a 6–8 week, conflict-free **Advisory / Starter Kit** anchored in CBa Consult's **Digital Transformation** Signature Toolkit. Unlike cloud resellers or GPU vendors incentivized to expand consumption, CBa Consult gives CIOs, CTOs, and Enterprise Architecture leads an independent blueprint covering compute/hosting topology, FinOps guardrails, latency/scalability trade-offs, and security boundaries.

Three market dynamics intensify CIO/CTO demand in Q2–Q3 2027:

- **Inference Cost Shock:** Production RAG and agentic workflows rapidly outgrow pilot budgets without model-routing, caching, and token caps.
- **EU Data Residency & Sovereignty:** DORA/NIS2 and GDPR enforcement compel clear network isolation and EU-region hosting proofs.
- **Vendor Lock-In Fatigue:** Hard-coding applications to a single hyperscaler model endpoint leaves firms exposed to pricing shifts and outages.

## 2. Solution Architecture & Delivery Workflow

Executed across 6–8 weeks as a structured architectural advisory sprint:

1. **Weeks 1–2 — AI Workload & Risk Discovery:** Catalog active and planned AI workloads (RAG, fine-tuning, agentic orchestration, batch inference), classify data sensitivity and EU residency constraints, and baseline current cloud/API spend.
2. **Weeks 3–5 — Reference Architecture, Hosting & FinOps Design:** Evaluate build-vs-buy hosting patterns (managed API endpoints, private VPC endpoints, quantized/open-weight hosting), define multi-provider portability to curb vendor lock-in, and establish token/GPU quotas, caching, and model-routing cost controls.
3. **Weeks 6–8 — Security Boundary Hardening & Capability Handover:** Lock identity/network isolation, prompt/output logging, and compliance mappings (GDPR, DORA/NIS2); deliver the target AI Infrastructure Blueprint, vendor decision matrix, and internal Ops runbook.

Core tangible deliverables produced across the sprint:

- **AI Hosting & Topology Blueprint:** Reference architecture with EU residency zones, VPC isolation, and model-gateway abstraction.
- **AI FinOps & Quota Guardrails:** Model-routing policy (small vs. frontier models), token-budget caps, and unit-cost baseline workbook.
- **Security & ICT Governance Handover Pack:** DORA/GDPR boundary checklist and internal platform-team operating runbook.

## 3. Market Comparables & CBa Consult Differentiation

| Market Comparable | Typical Positioning & Pricing | Structural Gap in 2027 | CBa Consult Differentiation (`OP-ITG-005`) |
| :--- | :--- | :--- | :--- |
| Hyperscaler ProServe / Cloud SIs | €50k–€250k+ migration & consumption builds | Commercial bias toward single-cloud lock-in and high-tier GPU/managed services | Vendor-neutral hosting & model-routing architecture designed for portability and cost caps |
| Boutique MLOps Agencies | €30k–€100k custom Kubernetes / pipeline builds | Heavy engineering focus; weak executive FinOps, GDPR, and ICT governance alignment | Pairs cloud/AI architecture directly with FinOps controls and `OP-ITG-002` ICT governance |
| Big Four Tech Risk Practices | €60k+ policy & compliance memos | Abstract governance frameworks with no actionable compute, latency, or hosting blueprint | Concrete 6–8 week architectural + FinOps + security deliverable (€2,000–€8,000 band) |

## 4. Internal IP & Source Provenance Crosswalk

| Source Artifact | Provenance Status | Core Contribution to `OP-ITG-005` | Disposition for 2027 Offer |
| :--- | :--- | :--- | :--- |
| `Opportunities to Publish/AI Infrastructure Consultancy.docx` | Assigned ADPA source ([Source-Documents.md](Source-Documents.md)) | PMBOK 7 charter, 4 core objectives (Safe AI, Operational Efficiency, Business Value, Internal Capability), Q4 2026 baseline framing | Refreshed for 2027 EU regulatory triggers (DORA/NIS2, EU AI Act) and €2,000–€8,000 studio band |
| Digital Transformation Signature Toolkit | Internal CBa Signature Toolkit | Enterprise architecture assessment, cloud FinOps, and operating-model handover templates | Core diagnostic and blueprint methodology for Weeks 1–8 |
| [Ideation-Spark.md](Ideation-Spark.md) | Workspace Spark | CIO/CTO/EA buyer profile, 6–8 wk High-effort profile, `OP-ITG-002` pairing path | Locks Stage 1b scoping and pre-pilot gate parameters |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **No hardware procurement, colocation brokering, or cloud reselling:** CBa Consult remains strictly independent of cloud/GPU vendor commissions.
- **No 24/7 managed MLOps or SRE operations:** We architect the infrastructure and hand over runbooks to client platform teams rather than staffing ongoing L1/L2 ops.
- **No unvalidated custom foundation-model pre-training:** Scope covers enterprise inference, RAG, and practical hosting architectures, not speculative frontier-model training clusters.

| Stage 1b Criterion | Status | Readiness Note |
| :--- | :--- | :--- |
| Problem & 2027 Buyer Trigger Defined | Complete | CIOs / CTOs / EA Leads needing vendor-neutral AI compute, FinOps, and security boundaries |
| Negative Scope & Independence Locked | Complete | Excludes cloud reselling, 24/7 SRE ops, and custom model pre-training |
| Stage 2 Hypothesis Formulation | Pending | Validate standalone blueprint demand vs. bundled delivery with `OP-ITG-002` / `OP-ITG-013` |
