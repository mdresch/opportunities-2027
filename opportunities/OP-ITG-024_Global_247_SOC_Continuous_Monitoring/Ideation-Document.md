---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-024"
execution_track: "Track B — Enterprise / Governance Advisory"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "ADPA: Defense 24-7 SOCs Architecture cluster (7 .docx files)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-024`: Global 24/7 SOC Mesh & Continuous Monitoring Architecture Readiness

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), tracked in [inventory-of-ideas.md](../../inventory-of-ideas.md), and scoped as a **Tier B (Pull-Only 2027)** enterprise/defence architecture offer alongside [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md).

## 1. Problem Context & 2027 Market Trigger

Multi-region enterprises, critical-infrastructure operators, and defence-alliance programmes face fragmented regional Security Operations Centers (SOCs) without standardized follow-the-sun handoffs, sovereign log-residency boundaries, or continuous monitoring evidence chains. Buyers need an investment-grade operating architecture before committing millions to SIEM/SOAR integration or Managed Security Service Provider (MSSP) contracts.

- **Target Buyer:** CISOs, Defence-Alliance Programme Leads (e.g., NATO DIANA / EU resilience contexts), and Enterprise Security Architects (Medium & Large).
- **The Wedge (Pain):** Regional SOCs operate with incompatible escalation clocks, unclear sovereign data borders, and monitoring blind spots across OT/IT and multi-tenant alliance environments.
- **2027 Trigger:** **NIS2 / DORA** incident-reporting clocks, NATO/EU cross-border resilience programmes, and OT/IT convergence require documented 24/7 monitoring coverage and verifiable regional handoff accountability.

## 2. Solution Architecture & Delivery Workflow

Delivered as a 6–10 week advisory & architecture sprint (`8–12 hrs/wk`, `High` effort, strictly non-MSSP) grounded in TOGAF/SABSA trust boundaries and the ADPA **DERA** / Defence 24-7 SOC reference material:

1. **Weeks 1–2 — Sovereignty & Regional Mesh Baseline:**
   - Map regional SOC nodes (e.g., Netherlands, Singapore/APAC, Americas), SABSA trust boundaries, and cross-border log-retention rules.
2. **Weeks 3–5 — Follow-the-Sun Handoff & Monitoring Requirements:**
   - Define DERA-aligned continuous monitoring controls, incident escalation clocks (linking to `OP-RSK-007`), and SIEM/EDR ingestion specs.
3. **Weeks 6–8 — RACI, Runbooks & Investment-Grade Outline:**
   - Author cross-node RACI matrices, analyst workbench requirements, and programme-level cost/phasing roadmaps.
4. **Weeks 9–10 — Tabletop Handoff Verification:**
   - Conduct one simulated regional shift-handoff tabletop exercise with evidence checklist and deliver the signed Architecture Readiness Baseline.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable / Alternative | Typical Model | Strengths | Differentiation of CBa `OP-ITG-024` |
| :--- | :--- | :--- | :--- |
| **Global MSSPs (Accenture, IBM, Orange Cyberdefense)** | Multi-year managed SOC retainer | 24/7 staffing & SIEM operations | Vendor lock-in; sells managed shifts before client sovereignty rules are defined |
| **Big Four Cyber Architecture** | Large advisory programme team | Executive brand & multi-country footprint | High rate cards (€100k+); slow mobilization |
| **SIEM Vendor Professional Services** | Tool-bound implementation SOW | Deep product configuration | Biased toward single-vendor licensing rather than sovereign mesh governance |
| **CBa `OP-ITG-024` Readiness** | 6–10 wk conflict-free architecture sprint | DERA + TOGAF/SABSA + non-MSSP independence | Produces **vendor-neutral requirements, RACI & tabletop proof** before MSSP spend |

## 4. Internal IP & Source Provenance Crosswalk

| Source Asset | Role in `OP-ITG-024` | Provenance / Location |
| :--- | :--- | :--- |
| `Ideation Document Defence SOC architecture.docx` | TOGAF/SABSA 3-node SOC mesh, WBS & RACI baseline | Listed in [Source-Documents.md](Source-Documents.md) |
| `The Defence Enterprise Reference Architecture (DERA).docx` | Reference architecture control alignment | Listed in [Source-Documents.md](Source-Documents.md) |
| `Alliance_Resilience_Project.docx` & `Investment-Grade Strategic Programme Proposal.docx` | Business case structure & programme investment framing | Listed in [Source-Documents.md](Source-Documents.md) |
| `The Spark Capture` files (3 `.docx`) | Early SOC architecture ideation & OpenAI synthesis captures | Listed in [Source-Documents.md](Source-Documents.md) |
| [Ideation-Spark.md](Ideation-Spark.md) | Non-MSSP boundaries & separation from `OP-ITG-016` (EARN) | Sibling workspace file |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **Strictly Non-MSSP / No Live SOC Staffing:** CBa Consult designs architecture, requirements, RACI, and tabletop handoff scripts; the client or a contracted MSSP operates live shifts and SIEM consoles.
- **No Classified Enclave Re-Architecture or Kinetic C2:** National classified enclave engineering, kinetic response forces, and classified release authority remain exclusively with client programme offices.
- **Distinct from `OP-ITG-016` (EARN Aviation):** Generic SOC mesh delivery is strictly separated from aviation-specific EARN federation (`OP-ITG-016`) in client proposals.

### Stage 1b Readiness & Pre-Pilot Handoff

| Criterion | Current State | Next Action Toward Pilot |
| :--- | :--- | :--- |
| **Stage 1b Framing** | Complete (Tier B — Pull-Only) | Hold for Q3 2027–Q1 2028 enterprise/defence pull |
| **EARN Narrative Separation** | Pending | Separate `OP-ITG-016` aviation deck from generic SOC mesh deck |
| **NIS2 / Non-MSSP Validation** | Pending | Confirm buyer willingness for vendor-neutral pre-MSSP blueprint |
| **Cross-Portfolio Pairing** | Defined | Feeds `OP-RSK-007` triage clocks, `OP-ITG-002` & `OP-ITG-018` |
