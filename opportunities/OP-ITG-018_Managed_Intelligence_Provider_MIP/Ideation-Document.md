---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-018"
execution_track: "Track A (Client Advisory Retainer — Umbrella Conversion Engine)"
linked_hypotheses: "HYP-2027-004 (Formulated/Blocked)"
primary_source: "ADPA Playbook.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-018`: Managed Intelligence Provider / Professional (MIP)

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), anchored in [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md), and cataloged in [inventory-of-ideas.md](../../inventory-of-ideas.md). Local workspace baseline: [Ideation-Spark.md](Ideation-Spark.md), [One_Pager_OP-ITG-018_Managed_Intelligence_Provider_MIP.md](One_Pager_OP-ITG-018_Managed_Intelligence_Provider_MIP.md), [Tier-2-Market-Research.md](Tier-2-Market-Research.md), [Delivery-Playbook-and-SOW.md](Delivery-Playbook-and-SOW.md), [Source-Documents.md](Source-Documents.md), and [BD-Quick-Reference.md](BD-Quick-Reference.md).

## 1. Problem Context & 2027 Market Trigger

Mid-market and regulated enterprises (50–2,500 seats) already contract an **MSP** for infrastructure uptime and an **MSSP** for 24/7 security monitoring. Yet 60–90 days after deploying Copilot, custom AI agents, and RAG pipelines, prompts drift, SharePoint/ERP context decays, token bills spike without owners, and compliance evidence goes stale—leaving an unaccounted third layer: **Enterprise Intelligence Operations**.

- **Target Buyers:** CEOs, CIOs, CFOs, CISOs, and PE Operating Partners lacking budget or desire for a €250k+ full-time Chief AI Officer + governance team.
- **2027 Market Trigger:** Three converging deadlines: (a) **Agent Sprawl & FinOps Shock**, (b) **Live Regulatory Enforcement** (IFRS 18 Jan 2027, EC ESG Assurance Jul 2027, EU AI Act Annex III Dec 2027, DORA/NIS2), and (c) **Auditor Independence Restrictions** barring Big Four audit firms from operating ongoing management controls.
- **Core Pain (The Wedge):** Clients buy one-off AI pilots or compliance diagnostics that decay within one quarter because neither their MSP nor their MSSP owns AI truth, agent FinOps, or continuous audit evidence.

## 2. Solution Architecture & Delivery Workflow

`OP-ITG-018` establishes the **Managed Intelligence Provider / Professional (MIP)** category above MSPs and MSSPs, executing CBa Consult's **6-Stage Truth Production Governance** (`Observe -> Measure -> Govern -> Trace -> Certify -> Improve`) across five Intelligence Stack pillars in a recurring 4-week monthly cadence (detailed in [Delivery-Playbook-and-SOW.md](Delivery-Playbook-and-SOW.md)):

1. **Week 1 (Observe & Measure) — Digital Labor & Agent FinOps:** Reconcile Entra Agent ID / Copilot Studio / custom agent inventory, track token spend vs. FinOps ceilings, and catch orphan/leaver agent triggers (`OP-ITG-013`, `OP-ITG-016`, `OP-HR-009`).
2. **Week 2 (Govern) — Knowledge & Context Hygiene:** Audit RAG sources, SharePoint/Fabric/ADPA ontology quality, Purview sensitivity labels, and oversharing exceptions (`OP-ITG-014`, `OP-DTX-005`).
3. **Week 3 (Trace & Certify) — Continuous Compliance & Sovereign Execution:** Refresh EU AI Act Annex III / ISO 42001 / NIST AI RMF evidence packs, verify WORM logs, and validate MXC Hyper-V `<500ms` JIT / cryptographic trust boundaries (`OP-RSK-004`, `OP-RSK-005`, `OP-ITG-015`, `OP-ITG-017`).
4. **Week 4 (Improve) — Financial Truth & Board Intelligence Capital Brief:** Align Continuous Close reconciliation oversight and deliver the quarterly Board Intelligence Capital ROI Brief (`OP-FIN-009`, `OP-FIN-010`, `OP-FIN-011`, SIDPA).

### Recurring Client Outputs & Service Tiers

- **Monthly Intelligence Health & Governance Scorecard:** Tracks Agent FinOps spend vs. ceiling, RAG quality index, EU AI Act / ISO 42001 zero-drift evidence, and sovereign pool health.
- **Three-Tier Service Catalog:** **MIP Essentials** (€2,500/mo), **MIP Core** (€5,500/mo), and **MIP Enterprise / Fractional CAIO** (€10,000–€12,000+/mo).
- **Quarterly Board Intelligence Capital Brief:** Executive synthesis tying agent ROI, compliance posture, and context quality directly to SIDPA strategic value.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable Category | Primary Mandate | Structural Blind Spot in 2027 | CBa Consult (`OP-ITG-018` MIP) Differentiation |
| --- | --- | --- | --- |
| **Traditional MSP** | Endpoints, M365 licensing, L1/L2 helpdesk tickets | No ontology/RAG curation, EU AI Act Annex III evidence, or Continuous Close logic | Operates *above* the MSP on AI fleet governance, context hygiene, and ROI telemetry |
| **Managed Security (MSSP)** | 24/7 SIEM/SOC alerts, endpoint EDR, perimeter firewall | Monitors network threats, not agent prompt drift, FinOps ceilings, or statutory financial truth | Complements SOC with AI safety, WORM decision logs, and sovereign runtime governance |
| **Big Four / Audit Firms** | Statutory audit and one-off advisory frameworks | Barred by PCAOB/AICPA & EU PIE NAS rules from operating ongoing client controls | 100% conflict-free pre-assurance operator generating auditor-ready evidence packs |

## 4. Internal IP & Source Provenance Crosswalk

| Asset / Source | Provenance Location | Role in `OP-ITG-018` | Reuse Readiness |
| --- | --- | --- | --- |
| **ADPA Playbooks** | `ADPA Playbook.docx`, `ADPA_Playbook_Lifecycle_Management.docx` | Standardizes semantic document processing, ontology governance, and maturity cadence | Extracted in [Source-Documents.md](Source-Documents.md) |
| **SIDPA & `sidpa-template`** | [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) | Powers 18-stage closed-loop audit, lessons, governance change, and adaptation (Stages 11–18) | Live operational scaffold |
| **Proprietary Engineering & Method IP** | `ICT-Governance-Framework-Application`, `ECS`, `repos/mxc`, `AI Purpose Clause.docx`, `HR Transformation Toolkit (2027)`, Continuous Close (2005–2008) | Unifies all 5 CBa Strategic Assets into one recurring operating system | Production-ready internal IP |
| **Workspace Conversion Kit** | [MIP-Readiness-Assessment-Questionnaire.md](MIP-Readiness-Assessment-Questionnaire.md), [Pilot-Charter.md](Pilot-Charter.md), [One_Pager_OP-ITG-018_Managed_Intelligence_Provider_MIP.md](One_Pager_OP-ITG-018_Managed_Intelligence_Provider_MIP.md) | Provides discovery scoring, SOW boundaries, and pre-pilot gate controls | Ready for client outreach |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

To avoid eroding margins into low-value IT operations or violating independence rules, `OP-ITG-018` enforces strict exclusions:

- **Out of Scope:** L1/L2 IT helpdesk ticket resolution, laptop imaging/patching (MSP scope), 24/7 SOC/SIEM alert triage (MSSP scope), statutory external audit sign-off, and custom SaaS/LLM foundation model training.
- **Client Prerequisites:** Existing MSP/IT admin counterpart for infrastructure execution, executive sponsor (CIO/CFO/CEO/Operating Partner), and tenant read/telemetry access.
- **Accountable Ownership:** CBa Consult owns the 6-Stage Truth Production cadence, FinOps/RAG/compliance scorecards, and Board Briefs; the client's MSP/MSSP retains L1 helpdesk, patching, and 24/7 SOC execution.
- **Stage 1b Review Outcome:** Complete and elevated to Track A Umbrella Retainer status, pending `HYP-2027-004` discovery conversion and G4 Director approval.

| Stage 1b–2 Gate Check | Status | Next Gate Action |
| --- | --- | --- |
| **Category Framing & Playbook SOW** | Complete | Attach graduation clause to Q1–Q2 2027 Tier A proposals |
| **Hypothesis Validation (`HYP-2027-004`)** | Blocked / Pending | Run >=5 discovery calls or convert >=1 Tier A pilot |
| **Commercial Case & G4 Sign-Off** | Linked | Tracked in [Business-Case.md](Business-Case.md) (`PENDING_DIRECTOR_SIGNOFF`) |
