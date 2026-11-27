---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-024"
execution_track: "Track B — Enterprise / Governance Advisory"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "ADPA: Defense 24-7 SOCs Architecture cluster (7 .docx files)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-ITG-024`: Global 24/7 SOC Mesh & Continuous Monitoring Architecture Readiness

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), tracked in [inventory-of-ideas.md](../../inventory-of-ideas.md), and classified as **Tier B — Pull-Only 2027** alongside [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md).

## 1. Executive Summary

| Dimension | Assessment |
| :--- | :--- |
| **Opportunity ID & Title** | `OP-ITG-024` — Global 24/7 SOC Mesh & Continuous Monitoring Architecture Readiness |
| **Tier & Target Window** | Tier B (Defence / Alliance / Regulated Enterprise — Pull-Only) · Q3 2027–Q1 2028 |
| **Target Buyer** | CISOs, Defence-Alliance Programme Leads & Enterprise Security Architects |
| **Delivery Horizon & Effort** | 6–10 weeks (`8–12 hrs/wk`) · High effort |
| **Commercial Band & Working Capital** | €4,000–€12,000+ advisory band · **€0 upfront working capital** |
| **Gate Status** | **`PENDING_DIRECTOR_SIGNOFF`** — Pre-Stage 2; requires NIS2/defence buyer check & non-MSSP SOW lock |

## 2. Business Need & Cost of Inaction

Multi-region regulated enterprises and defence-alliance programmes risk major compliance breaches and blind spots when regional SOCs operate with incompatible escalation clocks, unclear sovereign log boundaries, and undocumented shift handoffs. Engaging an MSSP before locking architectural trust boundaries locks organizations into expensive, misaligned multi-year contracts.

- **Cost of Inaction:** Missed NIS2/DORA incident-reporting SLAs, cross-border data-residency violations, and wasted SIEM/MSSP procurement spend.
- *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals:* The assigned ADPA `Alliance_Resilience_Project.docx` source modeled a 24-month NATO/EU diplomatic aviation clearance and airstrip orchestration programme targeting 60% faster clearance processing, 90% threat-detection accuracy, and 50% faster 48-hour airstrip preparation, while `Ideation Document Defence SOC architecture.docx` framed a 1–3 year tri-node SOC rollout. All timelines, percentages, and investment figures in those ADPA `.docx` files represent *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals*; CBa's 2027 scope extracts only the non-MSSP SOC mesh architecture advisory layer.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Benefit / Cost Profile | Risk & Feasibility | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Option 0: Ad-Hoc Regional SOCs** | Leave regional teams on separate runbooks | €0 upfront; high incident-handoff failure risk | Fails NIS2/DORA & alliance auditability | Reject |
| **Option 1: Direct MSSP Outsourcing** | Outsource live 24/7 ops before architecture spec | High recurring OpEx (€250k+/yr) | Vendor lock-in; unaddressed sovereignty rules | Reject as First Step |
| **Option 2: CBa 6–10 Wk SOC Mesh Readiness** | Deliver DERA-aligned architecture, RACI & tabletop proof | €4k–€12k+ fixed fee; de-risks MSSP RFP | High feasibility under strict non-MSSP scope | **Recommended (Pull-Only)** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Packaging:** Fixed-scope 6–10 week architecture engagement yielding four core outputs: (1) Regional SOC Mesh & SABSA Trust Blueprint, (2) DERA-Aligned Continuous Monitoring Requirement Set, (3) Follow-the-Sun RACI & Escalation Clocks, and (4) Tabletop Handoff Evidence Pack.
- **Buyer Fit:** Ideal pre-procurement blueprint before an enterprise or alliance PMO issues an MSSP or SIEM integration RFP.
- **$0 Working-Capital Model:** Pure advisory and workshop synthesis delivered by the Director (`8–12 hrs/wk`); zero SIEM licensing, zero shift-analyst payroll, and zero hardware CapEx.
- **Compounding Path:** Pulls through `OP-RSK-007` (multi-regime incident triage), `OP-ITG-002` (ICT governance audit), `OP-ITG-018` (MIP governance retainer), and coordinates patterns with `OP-ITG-016` (EARN federation).

## 5. Risk Register & Compensating Controls

| Risk | Likelihood / Impact | Compensating Control |
| :--- | :--- | :--- |
| **Scope Creep into Managed SOC / MSSP Ops** | High / High | Embed explicit non-MSSP, non-24/7-staffing exclusion clause in SOW |
| **Conflation with `OP-ITG-016` EARN Aviation** | Medium / Medium | Separate generic SOC mesh collateral from aviation-specific EARN proposals |
| **Clearance / Sovereign Data Restrictions** | Medium / High | Work strictly on unclassified architecture patterns; client retains classified enclave control |
| **High Effort Displacing Tier A Q1–Q2 Delivery** | Medium / High | Gate as **Tier B pull-only** for Q3 2027–Q1 2028 unless sponsored |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Current Status | Required Pre-Pilot Action |
| :--- | :--- | :--- |
| **Approval Status** | **`PENDING_DIRECTOR_SIGNOFF`** | Hold in Tier B pull-only backlog until Q3 2027+ |
| **Proposal Boundary Split** | Pending | Separate generic SOC mesh scope from `OP-ITG-016` EARN narrative |
| **Tier 2 Market Validation** | Pending | Validate EU NIS2 / defence contractor buyer appetite for non-MSSP blueprint |
| **Non-MSSP SOW Exclusion** | Enforced | Embed explicit shift-operations exclusion before any proposal release |
| **Adjudication Owner** | Menno Drescher (Director, CBa Consult) | Review on inbound enterprise/defence pull |
