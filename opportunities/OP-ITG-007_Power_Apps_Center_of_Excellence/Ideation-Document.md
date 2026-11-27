---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-007"
execution_track: "Track A — Advisory / Starter Kit (Core & Specialty Backlog)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "inventory-of-ideas.md (§6 IT and Technology); Ideation-Spark.md (ADPA .docx anomaly flagged)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-007`: Power Apps Center of Excellence

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Sibling workspace files: [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

## 1. Problem Context & 2027 Market Trigger

Medium and Large enterprises running Microsoft 365 rapidly accumulate unmanaged citizen-built Power Apps, Power Automate flows, and Copilot Studio extensions across business units. Without a structured Center of Excellence (CoE), IT and Security teams face shadow-IT sprawl: broken business-critical automations owned by departed staff, unapproved Data Loss Prevention (DLP) connectors leaking internal data to external SaaS endpoints, and runaway premium-licensing costs.

In 2027, tighter IT cost discipline, NIS2/DORA operational-resilience audits, and enterprise Microsoft Copilot/Agent rollouts force CIOs and Enterprise Architects to bring citizen development under deterministic environment, DLP, and lifecycle guardrails without killing business agility.

### Buyer & Tier Snapshot

- **Target Buyers:** CIOs, CTOs, Enterprise Architects, and M365 Platform Leads (Medium & Large enterprises).
- **Portfolio Tier & Toolkit:** Core & Specialty Backlog · `Digital Transformation` (€2,500–€8,000 · 6–10 wks · Target Q2–Q3 2027).

## 2. Solution Architecture & Delivery Workflow

`OP-ITG-007` is a 6–10 week Advisory / Starter Kit built on CBa Consult's `Digital Transformation` toolkit. It establishes a right-sized Microsoft Power Platform CoE operating model across five steps:

1. **Tenant Discovery & Risk Triage:** Audit existing Power Platform environments, makers, connectors, and business-critical shadow apps using Microsoft's native CoE Starter Kit telemetry (zero third-party license spend).
2. **Environment & DLP Guardrail Architecture:** Define Default, Sandbox, Dev/Test, and Production environment boundaries alongside tiered DLP connector policies aligned to M365 security (`OP-ITG-004`).
3. **App-Tiering & Ownership Lifecycle:** Classify solutions into Personal, Team, and Mission-Critical tiers with mandatory dual-ownership, ALM/solution packaging, and orphan-app retirement rules.
4. **Reusable App & Governance Templates:** Deliver maker onboarding checklists, intake forms, and starter UX/governance templates to accelerate compliant citizen delivery (`OP-DTX-003`).
5. **CoE Operating Cadence & Handover:** Train internal IT/EA leads and citizen-developer champions on ongoing maker support, telemetry review, and license governance.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable Archetype | Typical Packaging & Pricing | Target Buyer | CBa Consult Differentiation |
| --- | --- | --- | --- |
| **Microsoft Gold / SI Partners** | Full CoE Starter Kit deployment + app factory (€25k–€100k+) | Large enterprise IT | SIs bundle heavy Power BI/Dataverse customization and developer retainers; CBa delivers a lean €2.5k–€8k governance & guardrail kit first. |
| **Third-Party SaaS Governance Tools** | Annual per-user SaaS governance add-ons | CIO / Cloud Ops | Adds recurring software spend; CBa configures guardrails on native Microsoft M365/Power Platform capabilities at `` `$0` `` incremental tool cost. |
| **Raw Microsoft Docs / Free CoE Kit** | Unconfigured open-source starter kit (€0) | Internal admins | Native kit gives telemetry, not organizational policy, DLP tiering, maker accountability, or executive governance. |

## 4. Internal IP & Source Provenance Crosswalk

| Asset / Source | Provenance & Availability | Coverage Role | Provenance Audit Note / Action |
| --- | --- | --- | --- |
| **`inventory-of-ideas.md` (§6) & `Ideation-Spark.md`** | Portfolio SSOT | Defines Microsoft Power Platform CoE scope, DLP/M365 guardrails, €2.5k–€8k band | Authoritative scope baseline for `OP-ITG-007`. |
| **`Digital Transformation` Toolkit** | CBa Signature Toolkit | Governance frameworks, environment tiering, operating-model templates (~70% IP coverage) | Add standardized Power Platform DLP matrix and maker-tiering checklist. |
| **`Power Apps Center of Excellence.docx`** | ADPA (`Source-Documents.md`) | **Provenance Mismatch Flagged:** File text describes "SES O3b mPower Apps Center of Excellence" (satellite MEO network), not MS Power Platform | **Do not use** `.docx` text for `OP-ITG-007` client materials; exclude or replace ADPA mapping in future hygiene pass. |
| **Synergy Offers (`OP-DTX-003`, `OP-ITG-004`)** | Related Backlog | Power Platform Solutions (`OP-DTX-003`) & M365 Governance (`OP-ITG-004`) | Package as pre-build governance gate before `OP-DTX-003` delivery. |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **Not a Custom App-Factory or Staff-Augmentation Contract:** CBa Consult establishes the CoE governance model, DLP policy structure, and reusable templates; CBa does not build dozens of business apps under this SKU (custom builds route separately to `OP-DTX-003`).
- **Not Unrelated Satellite/Telecom CoE Advisory:** Explicitly excludes the mismatched "SES O3b mPower" text found in the legacy ADPA `.docx` file.
- **No Third-Party Governance SaaS Reselling:** Uses native Microsoft Power Platform / M365 governance controls under CBa's `` `$0` `` working-capital constraint.

### Stage 1b Gate (`G1b`) Checklist

- [ ] Quarantine/unlink mismatched ADPA `.docx` reference in portfolio hygiene pass.
- [ ] Verify ≥70% template coverage for Power Platform DLP tiering and maker governance.
- [ ] Confirm bundling structure with `OP-ITG-004` (M365) and `OP-DTX-003` before Stage 2.

### Core Starter-Kit Deliverables

- **Tenant Shadow-IT & Connector Risk Summary:** Snapshot of Default-environment apps, high-risk connectors, and single-owner bottlenecks.
- **Environment & DLP Policy Blueprint:** Prescriptive rules separating Personal Productivity, Departmental, and Enterprise Production tiers.
- **Maker Onboarding & App-Retirement SOP:** Lightweight governance workflow tying maker training and quarterly orphan-app cleanup to M365 owners.
- **Executive CoE Charter:** 1-page governance mandate aligning CIO, CISO, and business-unit champions without blocking low-risk citizen innovation.
