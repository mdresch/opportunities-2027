---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-012"
execution_track: "Tier B — Growth (Pillar 6: IT and Technology)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Microsoft Ignite 2026 Portfolio Analysis via inventory-of-ideas.md"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-012`: Purview-to-Fabric/OneLake & Sovereign Control Panel Readiness

> **Governance & SSOT Callout:** This Stage 1b ideation document adheres to [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) and aligns with [inventory-of-ideas.md](../../inventory-of-ideas.md) and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Canonical positioning sits in [Ideation-Spark.md](Ideation-Spark.md); source status is recorded in [Source-Documents.md](Source-Documents.md).

## 1. Problem Context & 2027 Market Trigger

At Microsoft Ignite 2026, Microsoft clarified a major architectural split in its governance ecosystem: standalone Purview Data Map/Catalog capabilities are transitioning into Microsoft Fabric and the OneLake catalog, while Purview Data Security & Compliance remains the core engine for M365 and AI sensitivity labeling and retention. Simultaneously, Microsoft introduced the Sovereign Control Panel (Public Preview) amid surging European demand for SovereignTech data residency.

- **2027 Market Trigger:** Medium and large European Microsoft enterprises face overlapping Purview vs. Fabric licensing and roadmap confusion right as they activate Microsoft 365 Copilot and OneLake workloads under strict EU data-residency expectations.
- **Core Buyer Pain:** Organizations risk breaking sensitivity labels, corrupting retention clocks, or violating regional data-residency commitments during uncoordinated Purview-to-OneLake transitions.
- **Target Buyer Profile:** CIOs, CDOs, and DPOs in Medium & Large European Microsoft enterprises seeking an independent governance, labeling, and sovereign-residency roadmap.

## 2. Solution Architecture & Delivery Workflow

`OP-ITG-012` is a fixed-scope 6–8 week Audit / Diagnostic engagement (6–10 hours/week, Medium effort, $0 working capital) grounded in CBa Consult's Digital Transformation toolkit, DMBOK lifecycle specs, and Split-Clock retention architecture.

1. **Tenant & Catalog Discovery (Weeks 1–2):** Inventory existing Purview Data Map, M365 sensitivity labels, retention policies, and current Fabric/OneLake workspace footprint.
2. **Purview-vs-Fabric Boundary Mapping (Weeks 3–4):** Reconcile which governance controls stay in Purview Data Security & Compliance versus which catalog/lineage controls migrate to Fabric OneLake, aligning DMBOK lifecycle specs and Split-Clock retention rules.
3. **Sovereign Control Panel & Residency Assessment (Weeks 5–6):** Evaluate EU data-residency requirements, Copilot grounding boundaries, and Sovereign Control Panel readiness (noting Public Preview status constraints).
4. **Target Architecture & Migration Roadmap (Weeks 7–8):** Deliver executive-ready labeling, retention, licensing-clarity, and residency remediation plan, with optional handoff to `OP-ITG-010` or `OP-ITG-004`.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable Category | Typical Market Offering | Common Buyer Gap | CBa Consult Differentiation (`OP-ITG-012`) |
| --- | --- | --- | --- |
| Microsoft Licensing Resellers | SKU uplift & Copilot seat sales | Incentivized to sell E5/Fabric capacity rather than resolve control overlap | Vendor-neutral architectural clarity before new license spend |
| Global System Integrators | Large Fabric lakehouse migrations | Focus on data engineering pipelines while neglecting Purview retention & DPO risk | Jointly bridges DMBOK governance, Split-Clock retention, and OneLake |
| Niche Legal/Privacy Boutiques | GDPR policy memos | Lack hands-on M365 Purview, OneLake, and Sovereign Control Panel mechanics | Translates EU sovereignty and DPO controls into concrete Microsoft tenant architecture |
| Internal IT Admin Teams | Ad-hoc Purview portal tweaks | Overwhelmed by Ignite 2026 product shifts and preview feature caveats | Structured 6–8 week diagnostic with clear Preview-vs-GA risk separation |

## 4. Internal IP & Source Provenance Crosswalk

| Artifact / IP Asset | Location / Reference | Role in `OP-ITG-012` Delivery | Verification Status |
| --- | --- | --- | --- |
| Stage 1a Spark & Positioning | [Ideation-Spark.md](Ideation-Spark.md) | Anchors Ignite 2026 Purview-to-OneLake shift, SovereignTech trigger, and buyer roles | Complete (`Idea` status) |
| Portfolio Master Registry | [inventory-of-ideas.md](../../inventory-of-ideas.md) | Defines Tier B Growth, €2,500–€8,000 capital/fee context, and Q2 2027 target | Canonical SSOT |
| CBa Retention & Lifecycle IP | DMBOK lifecycle specs & Split-Clock retention architecture | Provides proven retention-clock and evidence-governance framework | Referenced in Spark positioning |
| ADPA Assignment Manifest | [Source-Documents.md](Source-Documents.md) | Confirms 0 ADPA `.docx` files; portfolio-originated from Ignite 2026 analysis | Verified |
| Adjacent Delivery Pairings | `OP-ITG-010` & `OP-ITG-004` | Creates natural expansion path into Retention/Recovery and M365 Migration | Portfolio cross-reference |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

Given that Sovereign Control Panel is in Public Preview and Fabric licensing evolves rapidly, `OP-ITG-012` sets clear boundaries:

- **No Production Preview Deployment Guarantees:** Assessments evaluate Sovereign Control Panel readiness and architectural fit, but CBa Consult does not warrant Microsoft Public Preview SLAs or GA timelines.
- **No Full Lakehouse Data Engineering Build:** Scope covers governance, catalog transition, labeling, and residency roadmapping—not building ETL/ELT pipelines in Fabric.
- **No Legal Sovereignty Certification:** Residency findings support DPO/CIO governance decisions and do not constitute formal legal certification.
- **Stage 1b Gate Readiness:** Strategic alignment with Strategic Asset 4 (bridging Asset 5) is validated. Ready for Director adjudication of the companion Business Case and Stage 2 hypothesis design.
